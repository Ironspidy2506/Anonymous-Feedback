"use client"

// @ts-nocheck


import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import FeedbackBubbles from "./feedback-bubbles"
import type { FeedbackItem } from "@/lib/types"

interface FeedbackBubblesContainerProps {
  initialFeedback: FeedbackItem[]
}

export default function FeedbackBubblesContainer({ initialFeedback }: FeedbackBubblesContainerProps) {
  const [feedbackItems, setFeedbackItems] = useState<FeedbackItem[]>(initialFeedback)
  const [newFeedback, setNewFeedback] = useState<FeedbackItem | null>(null)
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 })

  // Listen for new feedback events
  useEffect(() => {
    const handleNewFeedback = (event: CustomEvent) => {
      const feedback = event.detail.feedback
      const position = event.detail.position

      setNewFeedback(feedback)
      setButtonPosition(position)

      // After animation completes, add to regular feedback
      setTimeout(() => {
        setFeedbackItems((prev) => [feedback, ...prev])
        setNewFeedback(null)
      }, 2000)
    }

    window.addEventListener("newFeedback" as any, handleNewFeedback as any)

    return () => {
      window.removeEventListener("newFeedback" as any, handleNewFeedback as any)
    }
  }, [])

  return (
    <div className="relative w-full h-full">
      <FeedbackBubbles feedbackItems={feedbackItems} />

      <AnimatePresence>
        {newFeedback && (
          <motion.div
            className="absolute rounded-full flex items-center justify-center shadow-lg z-10"
            style={{
              left: buttonPosition.x,
              top: buttonPosition.y,
              width: 60,
              height: 60,
              backgroundColor: `hsl(${Math.floor(Math.random() * 360)}, 80%, 65%)`,
            }}
            initial={{
              scale: 0,
              x: 0,
              y: 0,
            }}
            animate={{
              scale: 1,
              x: `calc(${Math.random() * 80 + 10}% - ${buttonPosition.x}px)`,
              y: `calc(${Math.random() * 80 + 10}% - ${buttonPosition.y}px)`,
            }}
            transition={{
              duration: 2,
              ease: "easeOut",
            }}
          >
            <span className="text-white font-medium text-xs truncate max-w-[80%] text-center">
              {newFeedback.message.split(" ").slice(0, 2).join(" ")}...
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
