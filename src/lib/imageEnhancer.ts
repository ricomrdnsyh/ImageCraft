import { ImageInfo, EnhanceOptions, EnhanceResult } from '../types'

export function calculateUpscaleDimensions(
  origWidth: number,
  origHeight: number,
  scale: 2 | 4
): { width: number; height: number } {
  return {
    width: origWidth * scale,
    height: origHeight * scale,
  }
}

/**
 * Filter penajaman kernel konvolusi unsharp-mask pada Canvas
 */
export function applyConvolutionSharpen(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  intensity: number // 0 - 100
): void {
  if (intensity <= 0) return
  const factor = (intensity / 100) * 0.8
  const imgData = ctx.getImageData(0, 0, width, height)
  const data = imgData.data
  const src = new Uint8ClampedArray(data)

  // 3x3 Sharpen Kernel:
  // [  0,  -f,   0 ]
  // [ -f, 1+4f, -f ]
  // [  0,  -f,   0 ]
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = (y * width + x) * 4
      for (let c = 0; c < 3; c++) {
        const center = src[idx + c]
        const top = src[((y - 1) * width + x) * 4 + c]
        const bottom = src[((y + 1) * width + x) * 4 + c]
        const left = src[(y * width + (x - 1)) * 4 + c]
        const right = src[(y * width + (x + 1)) * 4 + c]

        const newVal = center * (1 + 4 * factor) - (top + bottom + left + right) * factor
        data[idx + c] = Math.max(0, Math.min(255, newVal))
      }
    }
  }
  ctx.putImageData(imgData, 0, 0)
}

export async function enhanceImage(
  info: ImageInfo,
  options: EnhanceOptions,
  onProgress?: (progress: number) => void
): Promise<EnhanceResult> {
  if (onProgress) onProgress(15)

  const { width: targetWidth, height: targetHeight } = calculateUpscaleDimensions(
    info.originalWidth,
    info.originalHeight,
    options.scale
  )

  const img = new Image()
  img.crossOrigin = 'anonymous'
  img.src = info.previewUrl

  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve()
    img.onerror = () => reject(new Error('Gagal memuat gambar untuk peningkatan kualitas'))
  })

  if (onProgress) onProgress(40)

  // Buat high-res canvas dengan multi-pass bicubic smoothing
  const canvas = document.createElement('canvas')
  canvas.width = targetWidth
  canvas.height = targetHeight
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  if (!ctx) throw new Error('Canvas 2D context tidak tersedia')

  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = 'high'

  // Gambar ke ukuran upscale
  ctx.drawImage(img, 0, 0, targetWidth, targetHeight)

  if (onProgress) onProgress(65)

  // Terapkan penyesuaian kontras & brightness jika ada
  if (options.contrast !== 0 || options.brightness !== 0) {
    const filterParts: string[] = []
    if (options.contrast !== 0) filterParts.push(`contrast(${100 + options.contrast}%)`)
    if (options.brightness !== 0) filterParts.push(`brightness(${100 + options.brightness}%)`)

    ctx.filter = filterParts.join(' ')
    ctx.drawImage(canvas, 0, 0)
    ctx.filter = 'none'
  }

  // Terapkan rekonstruksi detail / unsharp mask sharpening
  if (options.sharpen > 0) {
    applyConvolutionSharpen(ctx, targetWidth, targetHeight, options.sharpen)
  }

  if (onProgress) onProgress(90)

  const outputFormat = info.file.type === 'image/png' ? 'image/png' : 'image/jpeg'
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error('Gagal mengekspor blob'))),
      outputFormat,
      0.95
    )
  })

  const url = URL.createObjectURL(blob)
  if (onProgress) onProgress(100)

  return {
    blob,
    url,
    size: blob.size,
    width: targetWidth,
    height: targetHeight,
  }
}

