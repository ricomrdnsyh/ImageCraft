import React from 'react'
import { Sparkles } from 'lucide-react'

export const Navbar: React.FC = () => {
  return (
    <header className="border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-xl blur opacity-60 group-hover:opacity-100 transition duration-300" />
            <div className="relative w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-white shadow-xl">
              <Sparkles className="w-5 h-5 text-indigo-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-200 bg-clip-text text-transparent">
                ImageCraft
              </h1>
            </div>
            <p className="text-xs text-slate-400">Kompresi Gambar & Penambah Kualitas</p>
          </div>
        </div>

        {/* Tagline Bersih (Tanpa Badge 100% Private / Tech Stack) */}
        <div className="text-xs text-slate-400 hidden sm:flex items-center gap-2">
          <span>Gratis</span>
          <span>&bull;</span>
          <span>Tanpa Batasan</span>
          <span>&bull;</span>
          <span>Langsung di Browser</span>
        </div>
      </div>
    </header>
  )
}
