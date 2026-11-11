import React from 'react'
import { EnhanceOptions } from '../../types'
import { Wand2, Zap, Sparkles } from 'lucide-react'

interface EnhanceControlsProps {
  options: EnhanceOptions
  onChange: (options: EnhanceOptions) => void
  onEnhance: () => void
  disabled?: boolean
}

export const EnhanceControls: React.FC<EnhanceControlsProps> = ({
  options,
  onChange,
  onEnhance,
  disabled,
}) => {
  return (
    <div className="bg-slate-900/80 border border-slate-800/90 rounded-3xl p-6 w-full max-w-4xl mx-auto backdrop-blur-xl shadow-2xl space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Pilihan Skala AI */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-300">
            Faktor Skala Rekonstruksi
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[2, 4].map((scale) => (
              <button
                key={scale}
                type="button"
                disabled={disabled}
                onClick={() => onChange({ ...options, scale: scale as 2 | 4 })}
                className={`py-3 px-3 rounded-2xl border flex flex-col items-center justify-center gap-1 transition-all duration-200 ${
                  options.scale === scale
                    ? 'bg-gradient-to-b from-emerald-600 to-teal-600 border-emerald-400 text-white shadow-lg shadow-emerald-500/25 scale-[1.02]'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-1">
                  {scale === 4 ? <Sparkles className="w-3.5 h-3.5 text-amber-300" /> : <Zap className="w-3.5 h-3.5" />}
                  <span className="font-extrabold text-sm">{scale}x Upscale</span>
                </div>
                <span className="text-[10px] opacity-80">
                  {scale === 2 ? 'Cepat & Halus' : 'Ultra HD Rekonstruksi'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Slider Sharpening */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm font-semibold">
            <label className="text-slate-300">Penajaman Kontur (Sharpen)</label>
            <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
              {options.sharpen}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            step="5"
            value={options.sharpen}
            disabled={disabled}
            onChange={(e) => onChange({ ...options, sharpen: Number(e.target.value) })}
            className="w-full accent-emerald-range"
          />
          <div className="flex justify-between text-[11px] text-slate-500 font-medium pt-1">
            <span>Natural (0%)</span>
            <span>Rekomendasi (40%)</span>
            <span>Tajam (100%)</span>
          </div>
        </div>

        {/* Slider Kontras */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm font-semibold">
            <label className="text-slate-300">Penyeimbang Kontras</label>
            <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
              {options.contrast > 0 ? `+${options.contrast}` : options.contrast}
            </span>
          </div>
          <input
            type="range"
            min="-30"
            max="30"
            step="5"
            value={options.contrast}
            disabled={disabled}
            onChange={(e) => onChange({ ...options, contrast: Number(e.target.value) })}
            className="w-full accent-emerald-range"
          />
          <div className="flex justify-between text-[11px] text-slate-500 font-medium pt-1">
            <span>Redup (-30)</span>
            <span>Normal (0)</span>
            <span>Tegas (+30)</span>
          </div>
        </div>
      </div>

      {/* Tombol Proses CTA */}
      <div className="flex justify-center pt-2">
        <button
          onClick={onEnhance}
          disabled={disabled}
          className="group relative inline-flex items-center gap-2.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-50 text-white font-bold px-9 py-3.5 rounded-2xl shadow-xl shadow-emerald-500/25 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
        >
          <Wand2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          <span>Tingkatkan Kualitas Sekarang</span>
        </button>
      </div>
    </div>
  )
}
