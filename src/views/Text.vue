<template>
  <div
    class="relative min-h-screen bg-gray-100 flex items-center justify-center overflow-hidden"
  >
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        class="absolute top-20 left-10 w-72 h-72 bg-indigo-200/30 rounded-full blur-3xl animate-float-slow"
      ></div>
      <div
        class="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl animate-float-slow-reverse"
      ></div>
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-indigo-100/20 to-purple-100/20 rounded-full blur-3xl"
      ></div>
    </div>

    <div
      class="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none"
    ></div>

    <div class="relative z-10 text-center px-6 max-w-5xl mx-auto">
      <div
        class="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-gray-200/50 mb-8 animate-fade-down"
      >
        <span class="relative flex h-2 w-2">
          <span
            class="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"
          ></span>
          <span
            class="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"
          ></span>
        </span>
        <span class="text-sm font-medium text-gray-600"
          >Découvrez mon travail</span
        >
      </div>

      <h1 class="mb-6">
        <span
          class="block text-5xl sm:text-6xl lg:text-8xl font-bold text-gray-900 animate-fade-up tracking-tight"
        >
          Mes
        </span>
        <span
          class="block text-5xl sm:text-6xl lg:text-8xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-transparent bg-clip-text animate-fade-up-delay tracking-tight"
        >
          Projets
        </span>
      </h1>

      <p
        class="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto mb-12 animate-fade-up-delay-2 font-light leading-relaxed"
      >
        Une collection de réalisations web alliant design moderne, performance
        et expérience utilisateur.
      </p>

      <div class="animate-fade-up-delay-3">
        <a
          href="#creations"
          class="group inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-gray-900/20 hover:-translate-y-1"
        >
          <span>Explorer les créations</span>
          <svg
            class="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </a>
      </div>

      <div
        class="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto animate-fade-up-delay-4"
      >
        <div class="text-center">
          <div class="text-3xl sm:text-4xl font-bold text-gray-900">9+</div>
          <div class="text-sm text-gray-500 mt-1">Projets</div>
        </div>
        <div class="text-center">
          <div class="text-3xl sm:text-4xl font-bold text-gray-900">5+</div>
          <div class="text-sm text-gray-500 mt-1">Technologies</div>
        </div>
        <div class="text-center">
          <div class="text-3xl sm:text-4xl font-bold text-gray-900">2+</div>
          <div class="text-sm text-gray-500 mt-1">Années</div>
        </div>
      </div>
    </div>

    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
      <div
        class="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center"
      >
        <div
          class="w-1.5 h-3 bg-gray-400 rounded-full mt-2 animate-scroll-down"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
@keyframes fade-down {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float-slow {
  0%,
  100% {
    transform: translateY(0) translateX(0);
  }
  50% {
    transform: translateY(-30px) translateX(20px);
  }
}

@keyframes float-slow-reverse {
  0%,
  100% {
    transform: translateY(0) translateX(0);
  }
  50% {
    transform: translateY(30px) translateX(-20px);
  }
}

@keyframes scroll-down {
  0%,
  100% {
    opacity: 1;
    transform: translateY(0);
  }
  50% {
    opacity: 0.5;
    transform: translateY(8px);
  }
}

.animate-fade-down {
  animation: fade-down 0.8s ease-out forwards;
}

.animate-fade-up {
  animation: fade-up 0.8s ease-out forwards;
}

.animate-fade-up-delay {
  opacity: 0;
  animation: fade-up 0.8s ease-out 0.15s forwards;
}

.animate-fade-up-delay-2 {
  opacity: 0;
  animation: fade-up 0.8s ease-out 0.3s forwards;
}

.animate-fade-up-delay-3 {
  opacity: 0;
  animation: fade-up 0.8s ease-out 0.45s forwards;
}

.animate-fade-up-delay-4 {
  opacity: 0;
  animation: fade-up 0.8s ease-out 0.6s forwards;
}

.animate-float-slow {
  animation: float-slow 8s ease-in-out infinite;
}

.animate-float-slow-reverse {
  animation: float-slow-reverse 10s ease-in-out infinite;
}

.animate-scroll-down {
  animation: scroll-down 2s ease-in-out infinite;
}

.bg-grid-pattern {
  background-image: linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
}
</style>
