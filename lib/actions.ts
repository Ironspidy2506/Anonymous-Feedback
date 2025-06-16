"use server"

import axios from "axios"

const baseUrl = process.env.NEXT_API_URL || "http://localhost:3000";

// Fetch from the DB using GET /api/feedback
export async function getFeedback() {
  const res = await axios.get(`${baseUrl}/api/feedback`)
  if (!res.data.success) throw new Error("Failed to fetch feedback")
  return res.data.feedbacks
}

// Submit to DB using POST /api/feedback
export async function submitFeedback(message: string) {
  const res = await axios.post(`${baseUrl}/api/feedback`, { message })
  if (!res.data.success) throw new Error("Failed to submit feedback")
}
