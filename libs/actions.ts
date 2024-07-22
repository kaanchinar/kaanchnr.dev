"use server";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { PrismaClient } from "@prisma/client";

const messageSchema = z.object({
  name: z.string().min(3).max(255),
  email: z.string().email(),
  message: z.string().min(10).max(1000),
});

const prisma = new PrismaClient();

export async function createMessage(prevState: any ,form: FormData) {
  
  try {
    const data = Object.fromEntries(form.entries());
    const validatedData = messageSchema.parse(data);

    await prisma.contact.create({
      data: {
        email: validatedData.email,
        name: validatedData.name,
        message: validatedData.message,
        submittedAt: new Date(),
      },
    });
    revalidatePath("/contact");
    
    return { message: "Message sent successfully", success: true };
  } catch (err) {
    return { message: "Invalid input", success: false };
  }
}
