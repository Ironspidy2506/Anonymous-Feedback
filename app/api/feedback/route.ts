// File: app/api/feedback/route.ts
import { connectDB } from "@/lib/db"
import { Feedback } from "@/lib/models/feedback"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    await connectDB()
    const { message } = await req.json()
    if (!message) {
      return NextResponse.json({ success: false, error: "Message is required" }, { status: 400 })
    }
    const feedback = await Feedback.create({ message })
    return NextResponse.json({ success: true, feedback })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function GET() {
  try {
    await connectDB()
    const feedbacks = await Feedback.find().sort({ createdAt: -1 })
    return NextResponse.json({ success: true, feedbacks })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
