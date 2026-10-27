<template>
  <section
    ref="portalSection"
    class="relative h-screen w-full overflow-hidden bg-white"
  >
    <div
      ref="innerWorld"
      class="absolute left-1/2 top-1/2 z-20 h-screen w-screen -translate-x-1/2 -translate-y-1/2 overflow-y-auto bg-white opacity-0"
      style="transform: translate(-50%, -50%) scale(0.05)"
    >
      <Education />
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Education from "@/views/Education.vue";
import { chase } from "@/lib/sharkChase";

gsap.registerPlugin(ScrollTrigger);

const portalSection = ref(null);
const innerWorld = ref(null);

let trigger = null;

onMounted(() => {
  const inner = innerWorld.value;

  gsap.set(inner, { willChange: "transform, opacity" });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: portalSection.value,
      start: "top top",
      end: "+=200%",
      pin: true,
      scrub: true,
      anticipatePin: 1,
      onLeaveBack: () => {
        gsap.set(inner, { scale: 0.05, opacity: 0 });
      },
      onLeave: () => {
        gsap.set(inner, { willChange: "auto" });
      },
    },
  });

  trigger = tl.scrollTrigger;
  chase.portal = { el: portalSection.value, trigger };

  tl.fromTo(
    inner,
    { scale: 0.05, opacity: 0 },
    { scale: 1, opacity: 1, ease: "power2.out" },
    0.2
  );
});

onUnmounted(() => {
  chase.portal = null;
  if (trigger) {
    trigger.kill();
    trigger = null;
  }
});
</script>
