import { describe, it, expect } from 'vitest'
import { calculateUpscaleDimensions } from '../src/lib/imageEnhancer'

describe('imageEnhancer helpers', () => {
  it('calculateUpscaleDimensions correctly scales width and height', () => {
    expect(calculateUpscaleDimensions(400, 300, 2)).toEqual({ width: 800, height: 600 })
    expect(calculateUpscaleDimensions(400, 300, 4)).toEqual({ width: 1600, height: 1200 })
  })
})

