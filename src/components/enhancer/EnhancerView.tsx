import React, { useState } from 'react'
import { ImageInfo, EnhanceOptions, EnhanceResult } from '../../types'
import { enhanceImage } from '../../lib/imageEnhancer'
import { downloadImage } from '../../lib/utils'
import { Dropzone } from '../common/Dropzone'
import { ComparisonSlider } from '../common/ComparisonSlider'
import { StatsBadge } from '../common/StatsBadge'
import { ProgressBar } from '../common/ProgressBar'
import { EnhanceControls } from './EnhanceControls'
import { Download, RefreshCw, AlertTriangle, FileImage } from 'lucide-react'

export const EnhancerView: React.FC = () => {
  const [imageInfo, setImageInfo] = useState<ImageInfo | null>(null)
  const [options, setOptions] = useState<EnhanceOptions>({
    scale: 2,
    sharpen: 40,
    contrast: 5,
    brightness: 0,
  })
  const [result, setResult] = useState<EnhanceResult | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleEnhance = async () => {
    if (!imageInfo) return
    setIsProcessing(true)
    setProgress(10)
    try {
      const res = await enhanceImage(imageInfo, options, (p) => setProgress(p))
      setResult((prev) => {
        if (prev?.url) URL.revokeObjectURL(prev.url)
        return res
      })
    } catch (err) {
      console.error('Error saat meningkatkan kualitas gambar:', err)
      alert('Terjadi kesalahan saat memproses gambar')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleReset = () => {
    if (imageInfo?.previewUrl) URL.revokeObjectURL(imageInfo.previewUrl)
    if (result?.url) URL.revokeObjectURL(result.url)
    setImageInfo(null)
    setResult(null)
    setProgress(0)
  }

  const handleDownload = () => {
    if (!result || !imageInfo) return
    const dotIndex = imageInfo.name.lastIndexOf('.')
    const baseName = dotIndex !== -1 ? imageInfo.name.slice(0, dotIndex) : imageInfo.name
    const ext = imageInfo.file.type === 'image/png' ? 'png' : 'jpg'
    downloadImage(result.blob, `${baseName}-enhanced-${options.scale}x.${ext}`)
  }

  const isLargeImage =
    imageInfo && (imageInfo.originalWidth > 2000 || imageInfo.originalHeight > 2000)

  return (
    <div className="space-y-6">
      {!imageInfo ? (
        <Dropzone onImageSelected={setImageInfo} />
      ) : (
        <div className="space-y-6 animate-fadeIn">
          {/* Top Bar Informasi File */}
          <div className="flex flex-col sm:flex-row justify-between items-center max-w-4xl mx-auto gap-3 bg-slate-900/60 border border-slate-800/80 px-4 py-2.5 rounded-2xl backdrop-blur-md">
            <div className="flex items-center gap-2.5 text-sm text-slate-300 truncate max-w-md">
              <FileImage className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span className="truncate font-medium">{imageInfo.name}</span>
            </div>
            <button
              onClick={handleReset}
              className="text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-700/80 bg-slate-800/60 hover:bg-slate-700/80 transition shadow-sm"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Ganti Gambar
            </button>
          </div>

          {isLargeImage && options.scale === 4 && (
            <div className="max-w-4xl mx-auto bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs px-4 py-3 rounded-2xl flex items-center gap-2.5 backdrop-blur-md">
              <AlertTriangle className="w-4 h-4 flex-shrink-0 text-amber-400" />
              <span>
                Gambar awal berukuran cukup tinggi ({imageInfo.originalWidth}×{imageInfo.originalHeight} px).
                Skala 4x memerlukan waktu dan alokasi memori grafis lebih besar. Disarankan menggunakan 2x jika ingin hasil instan.
              </span>
            </div>
          )}

          <EnhanceControls
            options={options}
            onChange={setOptions}
            onEnhance={handleEnhance}
            disabled={isProcessing}
          />

          {isProcessing && (
            <ProgressBar
              progress={progress}
              label="Sedang merekonstruksi piksel & meningkatkan detail gambar..."
            />
          )}

          {result && (
            <>
              <ComparisonSlider
                originalUrl={imageInfo.previewUrl}
                processedUrl={result.url}
                originalLabel="Asli (Rendah)"
                processedLabel={`Hasil HD (${options.scale}x)`}
              />

              <StatsBadge
                originalSize={imageInfo.originalSize}
                processedSize={result.size}
                originalDim={`${imageInfo.originalWidth}×${imageInfo.originalHeight} px`}
                processedDim={`${result.width}×${result.height} px`}
              />

              {/* Tombol Aksi Download */}
              <div className="flex justify-center pt-2">
                <button
                  onClick={handleDownload}
                  className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-500 text-white font-bold px-9 py-3.5 rounded-2xl shadow-xl shadow-emerald-500/25 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
                  <span>Unduh Gambar HD ({options.scale}x)</span>
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
