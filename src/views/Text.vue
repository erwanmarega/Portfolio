<template>
  <div class="relative min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 flex flex-col items-center justify-center overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
    <div class="w-full">
      <div
        class="flex animate-scroll-left whitespace-nowrap"
        @mouseover="pauseAnimation"
        @mouseleave="resumeAnimation"
      >
        <span
          v-for="i in 10"
          :key="'left-' + i"
          class="text-[18vw] sm:text-[10vw] lg:text-[7vw] font-extrabold bg-gradient-to-r from-indigo-600 to-purple-500 text-transparent bg-clip-text neon-stroke animate-fade-in"
          :style="{ animationDelay: `${i * 0.2}s` }"
          aria-hidden="true"
        >
          Projets
        </span>
      </div>
    </div>

    <div class="w-full mt-4 sm:mt-6 lg:mt-8">
      <div
        class="flex animate-scroll-right whitespace-nowrap"
        @mouseover="pauseAnimation"
        @mouseleave="resumeAnimation"
      >
        <span
          v-for="i in 10"
          :key="'right-' + i"
          class="text-[18vw] sm:text-[10vw] lg:text-[7vw] font-extrabold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text neon-stroke animate-fade-in"
          :style="{ animationDelay: `${i * 0.2 + 0.1}s` }"
          aria-hidden="true"
        >
          Projets
        </span>
      </div>
    </div>

    <div class="absolute inset-0 pointer-events-none">
      <div class="w-full h-full bg-gradient-to-br from-indigo-100/10 to-blue-100/10 transform -translate-y-10 animate-parallax"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isPaused = ref(false);

const pauseAnimation = (event) => {
  isPaused.value = true;
  event.currentTarget.style.animationPlayState = 'paused';
};

const resumeAnimation = (event) => {
  isPaused.value = false;
  event.currentTarget.style.animationPlayState = 'running';
};
</script>

<style scoped>
@keyframes scroll-left {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

@keyframes scroll-right {
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes parallax {
  0% {
    transform: translateY(-10px);
  }
  50% {
    transform: translateY(10px);
  }
  100% {
    transform: translateY(-10px);
  }
}

.animate-scroll-left {
  animation: scroll-left 20s linear infinite;
  width: 200%;
}

.animate-scroll-right {
  animation: scroll-right 20s linear infinite;
  width: 200%;
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out forwards;
}

.animate-parallax {
  animation: parallax 10s ease-in-out infinite;
}

.neon-stroke {
  text-shadow: 0 0 5px rgba(99, 102, 241, 0.5), 0 0 10px rgba(147, 51, 234, 0.4), 0 0 15px rgba(236, 72, 153, 0.3);
}

@media (max-width: 640px) {
  .animate-scroll-left,
  .animate-scroll-right {
    animation-duration: 15s;
  }
}
</style>