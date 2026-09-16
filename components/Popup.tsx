import React from 'react'
import type { PopupProps } from '@/app/utils/types'
const Popup = ({note,onGoback}:PopupProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-zinc-900 rounded-lg border border-zinc-800 w-[90%] max-w-2xl p-8 shadow-lg">
        
        {/* Header with Go Back Button */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-zinc-100">Note Details</h2>
          <button className="text-zinc-400 hover:text-zinc-200 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
        </div>

        {/* Title Display Area */}
        <div className="mb-8">
          <label className="block text-sm font-semibold text-zinc-400 mb-2">Title</label>
          <div className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-5 py-4 text-zinc-100 text-lg font-semibold">
          {note?.title}
          </div>
        </div>

        {/* Text Display Area */}
        <div className="mb-8">
          <label className="block text-sm font-semibold text-zinc-400 mb-2">Content</label>
          <div className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-5 py-4 text-zinc-100 text-base min-h-[300px]">
        {note?.text}
          </div>
        </div>

        {/* Go Back Button */}
        <div className="flex justify-start">

          <button  onClick={onGoback} className="rounded-lg border border-zinc-700 bg-zinc-900 px-6 py-3 text-sm font-semibold text-zinc-200 transition-colors hover:border-zinc-500 hover:bg-zinc-800 cursor-pointer">
            Go Back
          </button>
        </div>

      </div>
    </div>
  )
}

export default Popup
