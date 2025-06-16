import FeedbackBubblesContainer from "@/components/feedback-bubbles-container"
import FeedbackForm from "@/components/feedback-form"
import { getFeedback } from "@/lib/actions"

export default async function FeedbackPage() {
  const feedbackItems = await getFeedback()

  return (
    <div className="relative min-h-screen bg-white dark:bg-gray-900 overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
          Anonymous Feedback
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
          See what others are saying! Click on any bubble to read the feedback, or add your own thoughts below.
        </p>

        <div className="relative h-[60vh] mb-12">
          <FeedbackBubblesContainer initialFeedback={feedbackItems} />
        </div>

        <div className="max-w-2xl mx-auto">
          <FeedbackForm />
        </div>
      </div>
    </div>
  )
}
