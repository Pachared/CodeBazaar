export const mockDelay = (duration: number, signal?: AbortSignal) =>
  new Promise<void>((resolve, reject) => {
    const timeoutId = window.setTimeout(resolve, duration)

    signal?.addEventListener(
      'abort',
      () => {
        window.clearTimeout(timeoutId)
        reject(new DOMException('The request was aborted.', 'AbortError'))
      },
      { once: true },
    )
  })
