"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { login } from "../actions/auth.action"
import { toast } from "@/components/ui/use-toast"
import { redirect, useRouter } from "next/navigation"


export const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
})
 
const Login = () => {

  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })
 

  async function onSubmit(values: z.infer<typeof formSchema>) {

    const res = await login(values)

    if (res.error){
      toast({
        variant: "destructive",
        description: res.error,
        duration: 5000
      })
    }
    if (res.success){
      toast({
        variant: "destructive",
        description: "You have successfully logged in",
        duration: 5000
      })
      router.push("/blog/create")
    }
  }
  return (
    <main className="min-h-screen relative z-10 flex justify-center">
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex justify-center px-2 items-center gap-4 flex-col ">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="w-full md:w-80">
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
                                        
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field}) => (
            <FormItem className="w-full md:w-80">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="pasword" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} 
        />
        <Button type="submit">Submit</Button>
    
      </form>
    </Form>
    
    </main>
  )
}

export default Login