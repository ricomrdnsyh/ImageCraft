import React from 'react'
import { formatBytes } from '../../lib/utils'
import { ArrowRight, Flame, Layers } from 'lucide-react'

interface StatsBadgeProps {
  originalSize: number
  processedSize?: number
  originalDim: string
  processedDim?: string
  savingsPercent?: number
}

export const StatsBadge: React.FC<StatsBadgeProps> = ({
  originalSize,
  processedSize,
  originalDim,
  processedDim,
  savingsPercent,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-4xl mx-auto my-6">
      {/* Kartu Ukuran File */}
      <div className="relative group bg-slate-900/70 border border-slate-800 rounded-2xl p-5 backdrop-blur-xl shadow-lg flex items-center justify-between">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            Ukuran Berkas
          </span>
          <div className="flex items-center gap-2.5">
            <span className="text-slate-400 font-medium text-sm line-through">
              {formatBytes(originalSize)}
            </span>
            {processedSize !== undefined && (
              <>
                <ArrowRight className="w-4 h-4 text-slate-600" />
                <span className="text-emerald-400 font-extrabold text-lg">
                  {formatBytes(processedSize)}
                </span>
              </>
            )}
          </div>
        </div>

        {savingsPercent !== undefined && savingsPercent > 0 && (
          <div className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/40 text-emerald-300 font-extrabold text-sm px-3.5 py-2 rounded-xl shadow-inner">
            <Flame className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>Hemat {savingsPercent}%</span>
          </div>
        )}
      </div>

      {/* Kartu Resolusi Piksel */}
      <div className="relative group bg-slate-900/70 border border-slate-800 rounded-2xl p-5 backdrop-blur-xl shadow-lg flex items-center justify-between">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Dimensi Resolusi
          </span>
          <div className="flex items-center gap-2.5">
            <span className="text-slate-300 font-medium text-sm">{originalDim}</span>
            {processedDim && (
              <>
                <ArrowRight className="w-4 h-4 text-slate-600" />
                <span className="text-indigo-400 font-extrabold text-lg">{processedDim}</span>
              </>
            )}
          </div>
        </div>

        <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-center text-slate-400">
          <Layers className="w-5 h-5" />
        </div>
      </div>
    </div>
  )
}
