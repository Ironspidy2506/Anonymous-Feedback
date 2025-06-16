"use client"

import type React from "react"
import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { submitFeedback } from "@/lib/actions"
import { useToast } from "@/hooks/use-toast"

interface SubmitBubble {
  id: number
  x: number
  y: number
  color: string
}

export default function FeedbackForm() {
  const [feedback, setFeedback] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitBubbles, setSubmitBubbles] = useState<SubmitBubble[]>([])
  const { toast } = useToast()
  const buttonRef = useRef<HTMLButtonElement>(null)

  const createSubmitBubbles = () => {
    if (!buttonRef.current) return

    const buttonRect = buttonRef.current.getBoundingClientRect()
    const newBubbles: SubmitBubble[] = []

    // Create 5-8 bubbles
    const bubbleCount = Math.floor(Math.random() * 4) + 5

    for (let i = 0; i < bubbleCount; i++) {
      const hue = Math.floor(Math.random() * 360)
      newBubbles.push({
        id: Date.now() + i,
        x: Math.random() * 100 - 50, // -50 to 50
        y: Math.random() * 100 - 50, // -50 to 50
        color: `hsl(${hue}, 80%, 65%)`,
      })
    }

    setSubmitBubbles(newBubbles)

    // Clear bubbles after animation
    setTimeout(() => {
      setSubmitBubbles([])
    }, 2000)
  }

  const addNewBubbleToContainer = (feedbackText: string) => {
    if (!buttonRef.current) return

    const buttonRect = buttonRef.current.getBoundingClientRect()
    const position = {
      x: buttonRect.left + buttonRect.width / 2,
      y: buttonRect.top,
    }

    const newFeedback = {
      id: Date.now().toString(),
      message: feedbackText,
      createdAt: new Date().toISOString(),
    }

    // Dispatch custom event with the new feedback and button position
    const event = new CustomEvent("newFeedback", {
      detail: {
        feedback: newFeedback,
        position,
      },
    })

    window.dispatchEvent(event)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault() // Prevent default form submission

    if (!feedback.trim()) {
      toast({
        title: "Error",
        description: "Please enter some feedback",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      await submitFeedback(feedback)
      addNewBubbleToContainer(feedback)
      setFeedback("")
      createSubmitBubbles()
      toast({
        title: "Success! 🎉",
        description: "Your feedback is now floating with the others!",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit feedback. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      className="relative bg-gradient-to-r from-pink-100 via-purple-100 to-indigo-100 dark:from-pink-900/20 dark:via-purple-900/20 dark:to-indigo-900/20 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Share Your Thoughts</h2>

      <form onSubmit={handleSubmit} className="relative">
        <div className="flex gap-3 items-end">
          <div className="flex-1">
            <Input
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Enter your anonymous feedback here..."
              className="h-12 bg-white/80 dark:bg-gray-800/80 border-2 border-gray-200 dark:border-gray-600 focus:border-purple-400 dark:focus:border-purple-500 rounded-xl text-base"
              disabled={isSubmitting}
            />
          </div>

          <div className="relative">
            <Button
              ref={buttonRef}
              type="submit"
              className="h-12 px-6 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 transition-all rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105"
              disabled={isSubmitting || !feedback.trim()}
            >
              {isSubmitting ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <Send className="h-5 w-5 mr-2" />
                  Send
                </>
              )}
            </Button>

            {/* Submit Bubbles Animation */}
            <AnimatePresence>
              {submitBubbles.map((bubble) => (
                <motion.div
                  key={bubble.id}
                  className="absolute w-4 h-4 rounded-full pointer-events-none"
                  style={{
                    backgroundColor: bubble.color,
                    left: "50%",
                    top: "50%",
                  }}
                  initial={{
                    scale: 0,
                    x: 0,
                    y: 0,
                    opacity: 1,
                  }}
                  animate={{
                    scale: [0, 1, 0.8],
                    x: bubble.x,
                    y: bubble.y - 60,
                    opacity: [1, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    ease: "easeOut",
                  }}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 text-center">
          Your feedback will appear as a colorful bubble above! ✨
        </p>
      </form>
    </motion.div>
  )
}
