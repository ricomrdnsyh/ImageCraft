import { describe, it, expect } from 'vitest'
import { getOutputFilename } from '../src/lib/imageCompressor'

describe('imageCompressor helpers', () => {
  it('getOutputFilename generates correct filenames based on format', () => {
    expect(getOutputFilename('photo.jpg', 'image/webp')).toBe('photo-compressed.webp')
    expect(getOutputFilename('image.png', 'image/jpeg')).toBe('image-compressed.jpg')
    expect(getOutputFilename('graphic.png', 'original')).toBe('graphic-compressed.png')
    expect(getOutputFilename('graphic.png', 'image/png')).toBe('graphic-compressed.png')
  })
})

