export function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  const value = parseFloat((bytes / Math.pow(k, i)).toFixed(dm))
  return `${value} ${sizes[i]}`
}

export function calculateDimensions(
  origWidth: number,
  origHeight: number,
  scalePercent: number
): { width: number; height: number } {
  const ratio = Math.max(0.01, Math.min(scalePercent, 100)) / 100
  return {
    width: Math.round(origWidth * ratio),
    height: Math.round(origHeight * ratio),
  }
}

export function downloadImage(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

