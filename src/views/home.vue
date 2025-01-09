<template>
  <main class="flex flex-col justify-center items-center h-screen bg-gray-100">
    <div class="flex justify-center items-center w-full mb-48">
      <div ref="lottieContainer" class="w-3/4 h-auto sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4 mx-auto"></div>
    </div>

    <div class="absolute top-4 left-4">
      <img :src="erwanImage" alt="Flèche vers le bas" class="w-9 h-9"/>
    </div>

    <div class="text-center mt-[-12rem]">
      <h1 class="bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-teal-500 via-purple-500 to-red-500 text-transparent bg-clip-text text-5xl leading-normal">
        Erwan Marega
      </h1>
      <h1 class="text-2xl">Développeur back-end</h1>
    </div>

    <div class="fixed bottom-4 right-4">
      <a href="#about" class="cursor-pointer">
      <img :src="flecheImage" alt="Flèche vers le bas" class="w-12 h-12 animate-bounce mx-auto">
      </a>
    </div>
  </main>
</template>

<script>
import lottie from 'lottie-web';
import animationData from '@/assets/Animation.json'; 
import ErwanImage from '../assets/Erwan.png'; 
import FlecheImage from '../assets/flèche.svg'; 

export default {
  name: 'LottieAnimation',
  data() {
    return {
      erwanImage: ErwanImage,  
      flecheImage: FlecheImage 
    };
  },
  mounted() {
    this.loadAnimation();  
  },
  methods: {
    loadAnimation() {
      lottie.loadAnimation({
        container: this.$refs.lottieContainer,  
        renderer: 'svg',  
        loop: true,       
        autoplay: true,   
        animationData: animationData,  
      });
    }
  }
};
</script>

<style scoped>

</style>
