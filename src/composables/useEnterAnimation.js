import { onMounted, onUnmounted } from 'vue'

export function useEnterAnimation(elRef, animateFn) {
  let animated = false
  let sectionIndex = 0

  const check = () => {
    const vh = window.innerHeight
    if (window.scrollY / vh >= sectionIndex - 0.15 && !animated) {
      animated = true
      animateFn()
      window.removeEventListener('scroll', check)
    }
  }

  onMounted(() => {
    const sectionEl = elRef.value?.closest('.section') || elRef.value
    const sections = document.querySelectorAll('.section')
    sectionIndex = Array.from(sections).indexOf(sectionEl)
    if (sectionIndex <= 0) {
      animateFn()
      return
    }
    check()
    window.addEventListener('scroll', check, { passive: true })
  })

  onUnmounted(() => window.removeEventListener('scroll', check))
}
