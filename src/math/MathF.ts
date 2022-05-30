

  /**
   * the math function that clamp a value
   * @param {number} value - the value to clamp
   * @param {number} min - the minimal clamp value
   * @param {number} max - the maximum value
   * @returns {number} - the clamped value
   */
  export function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
  }

  export function toGrad(): number {
    return 0;
  }
