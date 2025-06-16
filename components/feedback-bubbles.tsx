"use client"

// @ts-nocheck

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import type { FeedbackItem } from "@/lib/types"
import { useMediaQuery } from "@/hooks/use-media-query"

interface FeedbackBubblesProps {
  feedbackItems: FeedbackItem[]
}

export default function FeedbackBubbles({ feedbackItems }: FeedbackBubblesProps) {
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackItem | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery("(max-width: 640px)")

  // Generate random positions for bubbles
  const bubblePositions = feedbackItems.map((_, index) => {
    const randomX = Math.random() * 80 + 10 // 10% to 90% of container width
    const randomY = Math.random() * 80 + 10 // 10% to 90% of container height
    const size = Math.floor(Math.random() * 60) + 60 // 60px to 120px
    const hue = Math.floor(Math.random() * 360) // Random hue for HSL color
    const color = `hsl(${hue}, 80%, 65%)`
    const delay = Math.random() * 5 // Random delay for animation

    return { x: randomX, y: randomY, size, color, delay }
  })

  return (
    <div ref={containerRef} className="relative w-full h-full">
      {feedbackItems.map((feedback, index) => {
        const { x, y, size, color, delay } = bubblePositions[index]

        return (
          <motion.div
            key={feedback.id}
            className="absolute cursor-pointer rounded-full flex items-center justify-center shadow-lg"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              width: isMobile ? size * 0.7 : size,
              height: isMobile ? size * 0.7 : size,
              backgroundColor: color,
            }}
            initial={{ scale: 0 }}
            animate={{
              scale: 1,
              y: [0, -10, 0, 10, 0],
              transition: {
                scale: { duration: 0.5, delay: delay * 0.2 },
                y: {
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 5 + delay,
                  ease: "easeInOut",
                },
              },
            }}
            whileHover={{ scale: 1.1 }}
            onClick={() => setSelectedFeedback(feedback)}
          >
            <span className="text-white font-medium text-xs md:text-sm truncate max-w-[80%] text-center">
              {feedback.message.split(" ").slice(0, 2).join(" ")}...
            </span>
          </motion.div>
        )
      })}

      <AnimatePresence>
        {selectedFeedback && (
          <motion.div
            className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedFeedback(null)}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-lg w-full relative shadow-2xl border border-gray-200 dark:border-gray-700"
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                onClick={() => setSelectedFeedback(null)}
              >
                <X size={24} />
              </button>

              <div className="text-center">
                <motion.div
                  className="w-16 h-16 rounded-full mb-4 mx-auto shadow-lg"
                  style={{
                    backgroundColor:
                      bubblePositions[feedbackItems.findIndex((f) => f.id === selectedFeedback.id)]?.color,
                  }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                />

                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Anonymous Feedback</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
                    "{selectedFeedback.message}"
                  </p>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Submitted on {new Date(selectedFeedback.createdAt).toLocaleDateString()}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
