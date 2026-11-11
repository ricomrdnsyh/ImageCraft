import React from 'react'
import { CompressOptions } from '../../types'
import { Sliders, Sparkles, Globe, Share2, Zap } from 'lucide-react'

interface CompressControlsProps {
  options: CompressOptions
  onChange: (options: CompressOptions) => void
  disabled?: boolean
}

export const CompressControls: React.FC<CompressControlsProps> = ({
  options,
  onChange,
  disabled,
}) => {
  const applyPreset = (preset: 'seo' | 'social' | 'compact') => {
    if (preset === 'seo') {
      onChange({ quality: 80, scalePercent: 100, outputFormat: 'image/webp' })
    } else if (preset === 'social') {
      onChange({ quality: 85, scalePercent: 100, outputFormat: 'image/jpeg' })
    } else if (preset === 'compact') {
      onChange({ quality: 50, scalePercent: 75, outputFormat: 'image/webp' })
    }
  }

  return (
    <div className="bg-slate-900/80 border border-slate-800/90 rounded-3xl p-6 w-full max-w-4xl mx-auto backdrop-blur-xl shadow-2xl space-y-6">
      {/* Preset Cepat */}
      <div className="flex items-center justify-between flex-wrap gap-2 pb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
          <Sliders className="w-4 h-4 text-indigo-400" />
          <span>Preset Cepat:</span>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            disabled={disabled}
            onClick={() => applyPreset('seo')}
            className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-indigo-600/20 hover:text-indigo-300 border border-slate-700/80 transition"
          >
            <Globe className="w-3.5 h-3.5 text-indigo-400" /> Web & SEO
          </button>
          <button
            type="button"
            disabled={disabled}
            onClick={() => applyPreset('social')}
            className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-amber-600/20 hover:text-amber-300 border border-slate-700/80 transition"
          >
            <Share2 className="w-3.5 h-3.5 text-amber-400" /> Media Sosial
          </button>
          <button
            type="button"
            disabled={disabled}
            onClick={() => applyPreset('compact')}
            className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-emerald-600/20 hover:text-emerald-300 border border-slate-700/80 transition"
          >
            <Zap className="w-3.5 h-3.5 text-emerald-400" /> Super Hemat
          </button>
        </div>
      </div>

      {/* Grid Kontrol */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Slider Kualitas */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm font-semibold">
            <label className="text-slate-300">Tingkat Kualitas</label>
            <span className="text-indigo-400 font-bold bg-indigo-500/10 px-2 py-0.5 rounded-md border border-indigo-500/20">
              {options.quality}%
            </span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            step="5"
            value={options.quality}
            disabled={disabled}
            onChange={(e) => onChange({ ...options, quality: Number(e.target.value) })}
            className="w-full"
          />
          <div className="flex justify-between text-[11px] text-slate-500 font-medium pt-1">
            <span>Ringkas (10%)</span>
            <span>Seimbang (80%)</span>
            <span>HD (100%)</span>
          </div>
        </div>

        {/* Skala Resize */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-300">Skala Dimensi</label>
          <div className="grid grid-cols-4 gap-1.5">
            {[25, 50, 75, 100].map((scale) => (
              <button
                key={scale}
                type="button"
                disabled={disabled}
                onClick={() => onChange({ ...options, scalePercent: scale })}
                className={`py-2 text-xs font-bold rounded-xl border transition-all duration-200 ${
                  options.scalePercent === scale
                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 border-indigo-400 text-white shadow-lg shadow-indigo-500/20'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {scale}%
              </button>
            ))}
          </div>
          <span className="text-[11px] text-slate-500 block pt-1">
            {options.scalePercent === 100 ? 'Resolusi asli dipertahankan' : `Dikecilkan ke ${options.scalePercent}% dari ukuran asli`}
          </span>
        </div>

        {/* Format Output */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-300">Format Target</label>
          <select
            value={options.outputFormat}
            disabled={disabled}
            onChange={(e) =>
              onChange({
                ...options,
                outputFormat: e.target.value as CompressOptions['outputFormat'],
              })
            }
            className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 shadow-inner"
          >
            <option value="original">Pertahankan Format Asli</option>
            <option value="image/webp">WebP (Ukuran Paling Ringkas)</option>
            <option value="image/jpeg">JPEG / JPG Standar</option>
            <option value="image/png">PNG (Mendukung Transparan)</option>
          </select>
          <span className="text-[11px] text-indigo-400 flex items-center gap-1 pt-1">
            <Sparkles className="w-3 h-3" /> WebP menghemat ukuran hingga 30% lebih kecil dibanding JPG.
          </span>
        </div>
      </div>
    </div>
  )
}
