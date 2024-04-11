import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  return NextResponse.json({ message: "Hello, World!" });
}

export async function POST(req: NextRequest, res: NextResponse) {
  const user = await prisma.posts.create({
    data: {
      title: "Hello, World!",
      author: "Next.js",
      content: "This is a blog post created by Next.js.",
      category: ["Tech"],
      date: new Date(),
      published: true,
    }
  })

  return NextResponse.json(user);

}