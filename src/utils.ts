export const waitForTimeout = async (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms))
