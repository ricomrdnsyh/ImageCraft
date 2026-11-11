import { describe, it, expect } from 'vitest'
import { formatBytes, calculateDimensions } from '../src/lib/utils'

describe('utils', () => {
  it('formatBytes converts bytes to human-readable strings correctly', () => {
    expect(formatBytes(0)).toBe('0 B')
    expect(formatBytes(1024)).toBe('1 KB')
    expect(formatBytes(1024 * 1024)).toBe('1 MB')
    expect(formatBytes(2.5 * 1024 * 1024)).toBe('2.5 MB')
  })

  it('calculateDimensions computes scaled dimensions while preserving aspect ratio', () => {
    const orig = { width: 1920, height: 1080 }
    expect(calculateDimensions(orig.width, orig.height, 50)).toEqual({ width: 960, height: 540 })
    expect(calculateDimensions(orig.width, orig.height, 25)).toEqual({ width: 480, height: 270 })
    expect(calculateDimensions(orig.width, orig.height, 100)).toEqual({ width: 1920, height: 1080 })
  })
})

