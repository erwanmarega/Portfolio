import { onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useEnterAnimation(elRef, animateFn) {
  let trigger = null

  onMounted(() => {
    const target = elRef.value?.closest('.section') || elRef.value
    if (!target) {
      animateFn()
      return
    }

    // ScrollTrigger rather than IntersectionObserver: positions are recomputed
    // once images and pinned sections (SharkPortal, Creations) are laid out, so
    // the entrance doesn't fire on load while a section is briefly in view.
    // Still fires on fast scroll, anchor jumps and reloads landing mid-page.
    trigger = ScrollTrigger.create({
      trigger: target,
      start: 'top 85%',
      once: true,
      onEnter: () => animateFn(),
    })
  })

  onUnmounted(() => trigger?.kill())
}
