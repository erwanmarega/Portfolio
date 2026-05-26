<template>
  <main ref="el" class="relative min-h-screen bg-white flex flex-col font-sans overflow-hidden">
    <ParticleCanvas />
    <nav class="w-full flex justify-between items-center px-8 py-6 relative z-10">
      <img :src="erwanImage" alt="Erwan Marega Logo" class="w-12 h-12 rounded-full object-cover transition-all hover:ring-2 ring-gray-200/20" />
    </nav>

    <section class="flex flex-col lg:flex-row items-center justify-between px-8 py-20 lg:py-32 flex-1 relative z-10">
      <div ref="textBlock" class="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
        <h1 class="text-5xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-black leading-tight mb-8">
          Développeur Web Fullstack
        </h1>
        <p class="text-gray-600 text-xl leading-relaxed">
          Je conçois des projets web modernes pour apprendre, créer et collaborer.
        </p>
      </div>

      <div ref="mockupBlock" class="lg:w-1/2 flex justify-center lg:justify-end">
        <div class="mockup-container relative">
          <img :src="ipadMockup" alt="Smartphone Mockup" class="w-72 h-72 lg:w-[34rem] lg:h-[34rem] object-contain animate-float transition-transform duration-500 hover:scale-105" />
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import ParticleCanvas from '../components/ParticleCanvas.vue'
import erwanImage from '../assets/Erwan.webp'
import ipadMockup from '../assets/ipadMockup.webp'

const el = ref(null)
const textBlock = ref(null)
const mockupBlock = ref(null)

onMounted(() => {
  gsap.timeline({ defaults: { ease: 'power3.out' } })
    .from(textBlock.value.children, { y: 60, opacity: 0, duration: 0.9, stagger: 0.15 })
    .from(mockupBlock.value, { x: 80, opacity: 0, duration: 1 }, '-=0.6')
})
</script>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
}
.animate-float { animation: float 4s ease-in-out infinite; }

.mockup-container { position: relative; perspective: 1000px; }
.mockup-container::after {
  content: '';
  position: absolute;
  bottom: -25px;
  left: 50%;
  transform: translateX(-50%) rotate(12deg);
  width: 100%;
  height: 25px;
  border-radius: 50%;
  background: rgba(0,0,0,0.15);
  filter: blur(15px);
  z-index: -1;
}
</style>
