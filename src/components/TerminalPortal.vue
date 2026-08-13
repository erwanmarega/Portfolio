<template>
  <section
    ref="portalSection"
    class="relative h-screen w-full overflow-hidden bg-white"
  >
    <!-- Monde intérieur : la page Parcours révélée après le zoom -->
    <div
      ref="innerWorld"
      class="absolute left-1/2 top-1/2 z-20 h-screen w-screen -translate-x-1/2 -translate-y-1/2 overflow-y-auto bg-white opacity-0"
      style="transform: translate(-50%, -50%) scale(0.05)"
    >
      <Education />
    </div>

    <!-- Terminal visuel -->
    <div
      ref="terminalWrapper"
      class="absolute left-1/2 top-1/2 z-10 w-[min(900px,85vw)] -translate-x-1/2 -translate-y-1/2"
      style="transform-origin: center center"
    >
      <div
        class="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl"
        style="box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.04), 0 24px 80px rgba(0, 0, 0, 0.1)"
      >
        <!-- Header style macOS -->
        <div
          class="flex h-10 items-center gap-2 border-b border-gray-100 bg-gray-50/80 px-4 backdrop-blur-sm"
        >
          <div class="h-2.5 w-2.5 rounded-full bg-[#ff5f57]"></div>
          <div class="h-2.5 w-2.5 rounded-full bg-[#febc2e]"></div>
          <div class="h-2.5 w-2.5 rounded-full bg-[#28c840]"></div>
          <span class="ml-auto font-mono text-[11px] font-medium text-gray-400">
            standardcode — ~/app
          </span>
        </div>

        <!-- Body du terminal -->
        <div
          class="p-4 font-mono text-[11px] leading-relaxed text-gray-500 md:p-6 md:text-[13px]"
        >
          <div>
            <span class="text-emerald-500">❯</span>
            <span class="text-gray-800"> migrate REST to tRPC</span>
          </div>
          <div class="mt-2 opacity-70">
            ✓ code_explorer_agent · 214 files mapped
          </div>
          <div class="opacity-70">✓ research_agent · findings delivered</div>
          <div class="opacity-70">✓ edit src/server/router.ts</div>
          <div class="mt-3 text-xs text-gray-400">session 1 of 1 · unlimited usage</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Education from "@/views/Education.vue";

gsap.registerPlugin(ScrollTrigger);

const portalSection = ref(null);
const terminalWrapper = ref(null);
const innerWorld = ref(null);

let trigger = null;

onMounted(() => {
  const terminal = terminalWrapper.value;
  const inner = innerWorld.value;

  gsap.set([terminal, inner], { willChange: "transform, opacity" });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: portalSection.value,
      start: "top top",
      end: "+=200%",
      pin: true,
      scrub: true,
      anticipatePin: 1,
      onLeaveBack: () => {
        gsap.set(terminal, { scale: 1, opacity: 1, pointerEvents: "auto" });
        gsap.set(inner, { scale: 0.05, opacity: 0 });
      },
      onLeave: () => {
        gsap.set([terminal, inner], { willChange: "auto" });
      },
    },
  });

  trigger = tl.scrollTrigger;

  // Zoom du terminal : scale jusqu'à couvrir l'écran, puis fade out
  tl.fromTo(
    terminal,
    { scale: 1, opacity: 1, pointerEvents: "auto" },
    { scale: 30, opacity: 0, pointerEvents: "none", ease: "power2.inOut" },
    0
  );

  // Apparition du monde intérieur
  tl.fromTo(
    inner,
    { scale: 0.05, opacity: 0 },
    { scale: 1, opacity: 1, ease: "power2.out" },
    0.2
  );
});

onUnmounted(() => {
  if (trigger) {
    trigger.kill();
    trigger = null;
  }
});
</script>
