import React, { useState, useRef, useCallback } from 'react'
import { Sparkles, Image as ImageIcon } from 'lucide-react'

interface ComparisonSliderProps {
  originalUrl: string
  processedUrl: string
  originalLabel?: string
  processedLabel?: string
}

export const ComparisonSlider: React.FC<ComparisonSliderProps> = ({
  originalUrl,
  processedUrl,
  originalLabel = 'Sebelum',
  processedLabel = 'Sesudah',
}) => {
  const [sliderPosition, setSliderPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPosition(percent)
  }, [])

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) handleMove(e.touches[0].clientX)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons === 1) handleMove(e.clientX)
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onClick={(e) => handleMove(e.clientX)}
        className="relative w-full h-[450px] sm:h-[520px] rounded-3xl overflow-hidden select-none cursor-ew-resize bg-checkerboard border border-slate-800 shadow-2xl group"
      >
        {/* Gambar Hasil (Sesudah) - Full Background */}
        <img
          src={processedUrl}
          alt="Sesudah"
          className="absolute inset-0 w-full h-full object-contain pointer-events-none transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-md text-emerald-400 border border-emerald-500/30 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg z-10">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{processedLabel}</span>
        </div>

        {/* Gambar Asli (Sebelum) - Dibatasi dengan Clip Path */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
        >
          <img
            src={originalUrl}
            alt="Sebelum"
            className="absolute inset-0 w-full h-full object-contain pointer-events-none"
          />
          <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-md text-slate-300 border border-slate-700 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg z-10">
            <ImageIcon className="w-3.5 h-3.5 text-slate-400" />
            <span>{originalLabel}</span>
          </div>
        </div>

        {/* Garis Pemisah & Handle Slider */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_15px_rgba(255,255,255,0.7)] pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white text-slate-950 shadow-2xl flex items-center justify-center font-bold text-xs border-2 border-indigo-500 group-hover:scale-110 transition-transform">
            <span className="text-[10px] tracking-tighter">◀▶</span>
          </div>
        </div>

        {/* Petunjuk Interaktif di Bagian Bawah */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-slate-950/70 backdrop-blur-md text-slate-400 text-[11px] px-3 py-1 rounded-full border border-slate-800/80 pointer-events-none">
          Geser garis untuk melihat perbandingan detail
        </div>
      </div>
    </div>
  )
}
