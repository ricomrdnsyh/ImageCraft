import React, { useState, useEffect, useCallback } from 'react'
import { ImageInfo, CompressOptions, CompressResult } from '../../types'
import { compressImage, getOutputFilename } from '../../lib/imageCompressor'
import { downloadImage } from '../../lib/utils'
import { Dropzone } from '../common/Dropzone'
import { ComparisonSlider } from '../common/ComparisonSlider'
import { StatsBadge } from '../common/StatsBadge'
import { CompressControls } from './CompressControls'
import { Download, RefreshCw, FileImage } from 'lucide-react'

export const CompressorView: React.FC = () => {
  const [imageInfo, setImageInfo] = useState<ImageInfo | null>(null)
  const [options, setOptions] = useState<CompressOptions>({
    quality: 80,
    scalePercent: 100,
    outputFormat: 'image/webp',
  })
  const [result, setResult] = useState<CompressResult | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const runCompression = useCallback(async () => {
    if (!imageInfo) return
    setIsProcessing(true)
    try {
      const res = await compressImage(imageInfo, options)
      setResult((prev) => {
        if (prev?.url) URL.revokeObjectURL(prev.url)
        return res
      })
    } catch (err) {
      console.error('Error saat kompresi gambar:', err)
      alert('Terjadi kesalahan saat mengompres gambar')
    } finally {
      setIsProcessing(false)
    }
  }, [imageInfo, options])

  useEffect(() => {
    if (imageInfo) {
      runCompression()
    }
  }, [imageInfo, options, runCompression])

  const handleReset = () => {
    if (imageInfo?.previewUrl) URL.revokeObjectURL(imageInfo.previewUrl)
    if (result?.url) URL.revokeObjectURL(result.url)
    setImageInfo(null)
    setResult(null)
  }

  const handleDownload = () => {
    if (!result || !imageInfo) return
    const filename = getOutputFilename(imageInfo.name, options.outputFormat)
    downloadImage(result.blob, filename)
  }

  return (
    <div className="space-y-6">
      {!imageInfo ? (
        <Dropzone onImageSelected={setImageInfo} />
      ) : (
        <div className="space-y-6 animate-fadeIn">
          {/* Top Bar Informasi File */}
          <div className="flex flex-col sm:flex-row justify-between items-center max-w-4xl mx-auto gap-3 bg-slate-900/60 border border-slate-800/80 px-4 py-2.5 rounded-2xl backdrop-blur-md">
            <div className="flex items-center gap-2.5 text-sm text-slate-300 truncate max-w-md">
              <FileImage className="w-4 h-4 text-indigo-400 flex-shrink-0" />
              <span className="truncate font-medium">{imageInfo.name}</span>
            </div>
            <button
              onClick={handleReset}
              className="text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-700/80 bg-slate-800/60 hover:bg-slate-700/80 transition shadow-sm"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Ganti Gambar
            </button>
          </div>

          <CompressControls options={options} onChange={setOptions} disabled={isProcessing} />

          {result && (
            <>
              <ComparisonSlider
                originalUrl={imageInfo.previewUrl}
                processedUrl={result.url}
                originalLabel="Asli"
                processedLabel="Hasil Kompresi"
              />

              <StatsBadge
                originalSize={imageInfo.originalSize}
                processedSize={result.size}
                originalDim={`${imageInfo.originalWidth}×${imageInfo.originalHeight} px`}
                processedDim={`${result.width}×${result.height} px`}
                savingsPercent={result.savingsPercent}
              />

              {/* Tombol Aksi Download */}
              <div className="flex justify-center pt-2">
                <button
                  onClick={handleDownload}
                  className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold px-9 py-3.5 rounded-2xl shadow-xl shadow-indigo-500/25 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
                  <span>Unduh Gambar Terkompresi</span>
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
