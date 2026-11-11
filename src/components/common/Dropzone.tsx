import React, { useRef, useState, useEffect, useCallback } from 'react'
import { UploadCloud, Image as ImageIcon, Clipboard } from 'lucide-react'
import { ImageInfo } from '../../types'

interface DropzoneProps {
  onImageSelected: (info: ImageInfo) => void
}

export const Dropzone: React.FC<DropzoneProps> = ({ onImageSelected }) => {
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const processFile = useCallback(
    (file: File) => {
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        alert('Format gambar harus JPG, PNG, atau WebP')
        return
      }

      const previewUrl = URL.createObjectURL(file)
      const img = new Image()
      img.src = previewUrl
      img.onload = () => {
        onImageSelected({
          file,
          name: file.name || 'clipboard-image.png',
          originalSize: file.size,
          originalWidth: img.naturalWidth,
          originalHeight: img.naturalHeight,
          previewUrl,
        })
      }
    },
    [onImageSelected]
  )

  // Dukungan paste gambar dari clipboard (Ctrl+V)
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (e.clipboardData?.files && e.clipboardData.files.length > 0) {
        const file = e.clipboardData.files[0]
        if (file.type.startsWith('image/')) {
          processFile(file)
        }
      }
    }

    window.addEventListener('paste', handlePaste)
    return () => window.removeEventListener('paste', handlePaste)
  }, [processFile])

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0])
    }
  }

  return (
    <div className="relative group max-w-2xl mx-auto my-4">
      {/* Ambient Glow Backdrop */}
      <div
        className={`absolute -inset-1 rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 opacity-20 blur-xl transition-all duration-500 group-hover:opacity-40 ${
          isDragOver ? 'opacity-70 scale-105' : ''
        }`}
      />

      <div
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragOver(true)
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-3xl p-12 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 bg-slate-900/80 backdrop-blur-xl ${
          isDragOver
            ? 'border-indigo-400 bg-indigo-950/30 scale-[1.01] shadow-2xl shadow-indigo-500/20'
            : 'border-slate-800 hover:border-indigo-500/60 hover:bg-slate-900/90 shadow-xl'
        }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => e.target.files?.[0] && processFile(e.target.files[0])}
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
        />

        {/* Animated Icon Halo */}
        <div className="relative mb-6">
          <div className="absolute -inset-2 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full blur-md opacity-40 group-hover:opacity-75 transition-opacity" />
          <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700/80 flex items-center justify-center text-indigo-400 shadow-2xl group-hover:scale-110 transition-transform duration-300">
            {isDragOver ? (
              <UploadCloud className="w-10 h-10 animate-bounce text-indigo-300" />
            ) : (
              <ImageIcon className="w-10 h-10 group-hover:text-white transition-colors" />
            )}
          </div>
        </div>

        <h3 className="text-xl font-bold text-white mb-2 tracking-tight group-hover:text-indigo-200 transition-colors text-center">
          Tarik & Lepaskan Gambar di Sini
        </h3>

        <p className="text-sm text-slate-400 mb-6 text-center max-w-sm">
          atau klik untuk memilih dari perangkat Anda. Mendukung <span className="text-slate-200 font-medium">Ctrl + V</span> untuk paste langsung.
        </p>

        {/* Format Badge Chips */}
        <div className="flex items-center gap-2 flex-wrap justify-center">
          <span className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-amber-400" /> JPG / JPEG
          </span>
          <span className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-blue-400" /> PNG Transparan
          </span>
          <span className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400" /> WebP Modern
          </span>
          <span className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-indigo-950/60 border border-indigo-800/50 text-indigo-300">
            <Clipboard className="w-3 h-3" /> Paste Clipboard
          </span>
        </div>
      </div>
    </div>
  )
}
