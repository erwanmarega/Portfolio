<template>
  <main class="relative min-h-screen bg-gray-100 flex flex-col font-sans overflow-hidden">
    <nav class="w-full flex justify-between items-center px-8 py-6 bg-gray-100 backdrop-blur-md ">
      <div class="flex items-center">
        <img :src="erwanImage" alt="Erwan Marega Logo" class="w-12 h-12 ring-gray-200/20 rounded-full transition-all hover:ring-2" />
      </div>
    </nav>

    <section class="flex flex-col lg:flex-row items-center justify-between px-8 py-20 lg:py-32 flex-1">
      <div class="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0 animate-fade-in">
        <h1 class="text-5xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-black leading-tight mb-8">
          Développeur Web Fullstack
        </h1>
        <p class="text-gray-600 text-xl mb-10 leading-relaxed">
          Je conçois des projets web modernes pour apprendre, créer et collaborer.
        </p>
      </div>

      <div class="lg:w-1/2 flex justify-center lg:justify-end">
        <div class="mockup-container relative">
          <img :src="IpadMockup" alt="Smartphone Mockup" class="mockup-image animate-float transition-transform duration-500 hover:scale-105" />
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import ErwanImage from "../assets/Erwan.webp";
import IpadMockup from "../assets/IpadMockup.webp";

export default {
  data() {
    return {
      erwanImage: ErwanImage,
      IpadMockup: IpadMockup,
    };
  },
};
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fadeIn 1s ease-out forwards;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px) ;
  }
}

.animate-float {
  animation: float 4s ease-in-out infinite;
}

.mockup-container {
  position: relative;
  perspective: 1000px;
}

.mockup-container::after {
  content: '';
  position: absolute;
  bottom: -25px;
  left: 50%;
  transform: translateX(-50%) rotate(12deg);
  width: 100%;
  height: 25px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.15);
  filter: blur(15px);
  z-index: -1;
}

.mockup-image {
  width: 18rem;
  height: 18rem;
  object-fit: contain;
  transform-style: preserve-3d;
 transform: none;
}
@media (min-width: 1024px) {
  .mockup-image {
    width: 34rem;
    height: 34rem;
  transform: none;
  }
}

</style>