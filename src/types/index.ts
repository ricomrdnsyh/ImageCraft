export type ActiveTab = 'compress' | 'enhance'

export interface ImageInfo {
  file: File
  name: string
  originalSize: number
  originalWidth: number
  originalHeight: number
  previewUrl: string
}

export interface CompressOptions {
  quality: number // 10 to 100
  scalePercent: number // 25, 50, 75, 100
  outputFormat: 'original' | 'image/jpeg' | 'image/png' | 'image/webp'
}

export interface CompressResult {
  blob: Blob
  url: string
  size: number
  width: number
  height: number
  savingsPercent: number
}

export interface EnhanceOptions {
  scale: 2 | 4
  sharpen: number // 0 to 100
  contrast: number // -30 to 30
  brightness: number // -30 to 30
}

export interface EnhanceResult {
  blob: Blob
  url: string
  size: number
  width: number
  height: number
}

