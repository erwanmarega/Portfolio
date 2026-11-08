import { onMounted, onUnmounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useEnterAnimation(elRef, animateFn) {
  let trigger = null;

  onMounted(() => {
    const target = elRef.value?.closest(".section") || elRef.value;
    if (!target) {
      animateFn();
      return;
    }

    trigger = ScrollTrigger.create({
      trigger: target,
      start: "top 85%",
      once: true,
      onEnter: () => animateFn(),
    });
  });

  onUnmounted(() => trigger?.kill());
}
