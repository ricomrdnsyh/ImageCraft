import imageCompression from 'browser-image-compression'
import { ImageInfo, CompressOptions, CompressResult } from '../types'
import { calculateDimensions } from './utils'

export function getOutputFilename(
  originalName: string,
  targetFormat: CompressOptions['outputFormat']
): string {
  const dotIndex = originalName.lastIndexOf('.')
  const baseName = dotIndex !== -1 ? originalName.slice(0, dotIndex) : originalName
  const originalExt = dotIndex !== -1 ? originalName.slice(dotIndex + 1).toLowerCase() : 'jpg'

  let ext = originalExt
  if (targetFormat === 'image/webp') ext = 'webp'
  else if (targetFormat === 'image/jpeg') ext = 'jpg'
  else if (targetFormat === 'image/png') ext = 'png'

  return `${baseName}-compressed.${ext}`
}

export async function compressImage(
  info: ImageInfo,
  options: CompressOptions
): Promise<CompressResult> {
  const { width: targetWidth, height: targetHeight } = calculateDimensions(
    info.originalWidth,
    info.originalHeight,
    options.scalePercent
  )

  const fileType = options.outputFormat === 'original' ? info.file.type : options.outputFormat

  const compressionConfig = {
    maxSizeMB: 50,
    maxWidthOrHeight: Math.max(targetWidth, targetHeight),
    useWebWorker: true,
    fileType: fileType,
    initialQuality: Math.max(0.1, Math.min(options.quality / 100, 1)),
  }

  const compressedFile = await imageCompression(info.file, compressionConfig)
  const url = URL.createObjectURL(compressedFile)
  const size = compressedFile.size
  const savingsPercent = Math.max(
    0,
    Math.round(((info.originalSize - size) / info.originalSize) * 100)
  )

  return {
    blob: compressedFile,
    url,
    size,
    width: targetWidth,
    height: targetHeight,
    savingsPercent,
  }
}

