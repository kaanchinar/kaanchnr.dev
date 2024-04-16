import { validateSession } from "@/auth"
import { redirect } from "next/navigation"


const Create = async () => {
    const {user} = await validateSession()
  if (!user) {
    redirect("/blog/login")
  }

  return (
    <main className="min-h-screen relative z-20">Create</main>
  )
}

export default Create