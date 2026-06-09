import { onMounted, onUnmounted } from 'vue'

export function useEnterAnimation(elRef, animateFn) {
  let observer = null

  onMounted(() => {
    const target = elRef.value?.closest('.section') || elRef.value
    if (!target) {
      animateFn()
      return
    }

    // fire once the section enters the viewport — works for scroll, fast scroll,
    // anchor jumps, and reloads landing mid-page
    observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animateFn()
          observer.disconnect()
          observer = null
        }
      },
      { threshold: 0, rootMargin: '0px 0px -15% 0px' }
    )
    observer.observe(target)
  })

  onUnmounted(() => observer?.disconnect())
}
