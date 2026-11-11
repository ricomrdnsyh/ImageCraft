import React from 'react'
import { ActiveTab } from '../../types'
import { Minimize2, Wand2, Sparkles, Flame } from 'lucide-react'

interface TabNavProps {
  activeTab: ActiveTab
  onTabChange: (tab: ActiveTab) => void
}

export const TabNav: React.FC<TabNavProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex flex-col items-center justify-center my-8 gap-3">
      <div className="p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800/90 shadow-2xl backdrop-blur-xl flex gap-1.5 max-w-md w-full">
        {/* Tab 1: Kompres Gambar */}
        <button
          onClick={() => onTabChange('compress')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300 relative ${
            activeTab === 'compress'
              ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-500/25 border border-indigo-400/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <Minimize2 className={`w-4 h-4 ${activeTab === 'compress' ? 'text-white' : 'text-indigo-400'}`} />
          <span>Kompres Gambar</span>
          {activeTab === 'compress' && (
            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full font-bold">
              <Flame className="w-2.5 h-2.5" /> -90%
            </span>
          )}
        </button>

        {/* Tab 2: Tingkatkan Kualitas */}
        <button
          onClick={() => onTabChange('enhance')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300 relative ${
            activeTab === 'enhance'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-lg shadow-emerald-500/25 border border-emerald-400/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <Wand2 className={`w-4 h-4 ${activeTab === 'enhance' ? 'text-white' : 'text-emerald-400'}`} />
          <span>Tingkatkan Kualitas</span>
          {activeTab === 'enhance' && (
            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full font-bold">
              <Sparkles className="w-2.5 h-2.5" /> 4x HD
            </span>
          )}
        </button>
      </div>

      <p className="text-xs text-slate-400 text-center">
        {activeTab === 'compress'
          ? 'Kurangi ukuran file secara instan tanpa kehilangan kualitas kasat mata'
          : 'Perjelas gambar buram & perbesar resolusi hingga 4x dengan AI rekonstruksi'}
      </p>
    </div>
  )
}
