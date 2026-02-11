'use client'

import * as Sentry from "@sentry/nextjs"
import { useState } from "react"

export function SentryTest() {
  const [eventId, setEventId] = useState<string | null>(null)

  const throwError = () => {
    throw new Error("Test Error: This is a Sentry test error!")
  }

  const captureException = () => {
    try {
      throw new Error("Captured Exception: Testing Sentry error capture")
    } catch (error) {
      const id = Sentry.captureException(error)
      setEventId(id)
    }
  }

  const captureMessage = () => {
    const id = Sentry.captureMessage("Test Message: Sentry is working!", "info")
    setEventId(id)
  }

  const triggerFeedback = () => {
    Sentry.showReportDialog({
      eventId: eventId || undefined,
    })
  }

  return (
    <div className="h-full w-full bg-[#1a1625] text-white p-6 font-mono overflow-auto">
      <h2 className="text-2xl font-bold mb-2 text-[#7553ff]">Sentry Test Console</h2>
      <p className="text-sm text-gray-400 mb-6">
        Test your Sentry integration with these buttons
      </p>

      <div className="space-y-4">
        <div className="border border-[#7553ff]/30 rounded p-4">
          <h3 className="text-lg font-semibold mb-2 text-[#ff45a8]">1. Unhandled Error</h3>
          <p className="text-sm text-gray-300 mb-3">
            Throws an uncaught error that will crash the component and be caught by Sentry
          </p>
          <button
            onClick={throwError}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded font-semibold transition-colors"
          >
            Throw Unhandled Error
          </button>
        </div>

        <div className="border border-[#7553ff]/30 rounded p-4">
          <h3 className="text-lg font-semibold mb-2 text-[#ff45a8]">2. Captured Exception</h3>
          <p className="text-sm text-gray-300 mb-3">
            Manually captures an exception and sends it to Sentry without crashing
          </p>
          <button
            onClick={captureException}
            className="px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded font-semibold transition-colors"
          >
            Capture Exception
          </button>
        </div>

        <div className="border border-[#7553ff]/30 rounded p-4">
          <h3 className="text-lg font-semibold mb-2 text-[#ff45a8]">3. Log Message</h3>
          <p className="text-sm text-gray-300 mb-3">
            Sends an informational message to Sentry (not an error)
          </p>
          <button
            onClick={captureMessage}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded font-semibold transition-colors"
          >
            Send Message
          </button>
        </div>

        <div className="border border-[#7553ff]/30 rounded p-4">
          <h3 className="text-lg font-semibold mb-2 text-[#ff45a8]">4. User Feedback</h3>
          <p className="text-sm text-gray-300 mb-3">
            Opens Sentry's feedback dialog (requires valid DSN)
          </p>
          <button
            onClick={triggerFeedback}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!eventId}
          >
            Show Feedback Dialog
          </button>
          {eventId && (
            <p className="text-xs text-green-400 mt-2">
              Last Event ID: {eventId}
            </p>
          )}
        </div>

        <div className="border border-[#7553ff]/30 rounded p-4 bg-[#0f0c14]">
          <h3 className="text-sm font-semibold mb-2">📝 Instructions</h3>
          <ol className="text-xs text-gray-400 space-y-1 list-decimal list-inside">
            <li>Make sure you've added your Sentry DSN to .env.local</li>
            <li>Click any test button above</li>
            <li>Check your Sentry dashboard for the captured event</li>
            <li>Verify source maps, stack traces, and context are correct</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
