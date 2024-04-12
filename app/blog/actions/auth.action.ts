"use server"

import { z } from "zod"
import { formSchema } from "../login/page"
import { Argon2id } from "oslo/password"
import { generateId } from "lucia"
import { client, lucia } from "@/auth"
import { cookies } from "next/headers"

export const signin = async (values: z.infer<typeof formSchema>) => {
    const hashedPassword = await new Argon2id().hash(values.password)
    const userId = generateId(12)
    try {
        await client.user.create({
            data: {
                id: userId,
                username: values.username,
                password: hashedPassword
            }
    
        })

        const session = await lucia.createSession(userId, {
            expiresAt: 60 * 60 * 24 * 30,
        })

        const sessionCookie = lucia.createSessionCookie(session.id)

        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

        return {
            success: true,
            data: {
                userId
            }
        }
    } catch (error: any) {
        return {
            error: error?.message
        }
    }
    
}


export const login = async (values: z.infer<typeof formSchema>) => {
    const user = await client.user.findUnique({
        where: {
            username: values.username
        },
        select: {
            id: true,
            username: true,
            password: true
        }
    })
    
    const usernameMatch = user?.username === values.username
    const passwordMatch = await new Argon2id().verify(user?.password as string, values.password)


    if (!usernameMatch || !passwordMatch) {
        return {
            error: "Invalid username or password"
        }
    }
    
    const session = await lucia.createSession(user?.id, {
        expiresAt: 60 * 60 * 24 * 30,
    })

    const sessionCookie = lucia.createSessionCookie(session.id)
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
    return {
        success: "Logged in successfully"
    }
}
