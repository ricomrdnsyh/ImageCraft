import React from 'react'

interface ProgressBarProps {
  progress: number
  label: string
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress, label }) => {
  return (
    <div className="w-full max-w-3xl mx-auto my-4 bg-slate-800/80 border border-slate-700 rounded-xl p-4">
      <div className="flex justify-between items-center text-sm font-medium mb-2">
        <span className="text-indigo-300">{label}</span>
        <span className="text-slate-400">{progress}%</span>
      </div>
      <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-300 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}

