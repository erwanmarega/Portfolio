<template>
  <div class="w-full h-[75vh] overflow-hidden relative bg-gray-100 flex flex-col items-center justify-center">
    <div class="w-full">
      <div class="flex animate-scroll-left whitespace-nowrap">
        <span 
          v-for="i in 10" 
          :key="'left-' + i" 
          class="text-[20vw] sm:text-[12vw] lg:text-[8vw] font-extrabold text-indigo-600 stroke-white">
          Projets
        </span>
      </div>
    </div>

    <div class="w-full mt-6 sm:mt-8 lg:mt-12">
      <div class="flex animate-scroll-right whitespace-nowrap">
        <span 
          v-for="i in 10" 
          :key="'right-' + i" 
          class="text-[20vw] sm:text-[12vw] lg:text-[8vw] font-extrabold text-white stroke-black">
          Projets
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Text",
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

.animate-scroll-left {
  animation: scroll-left 15s linear infinite;
  width: 200%; 
}

.animate-scroll-right {
  animation: scroll-right 15s linear infinite;
  width: 200%;
}

.stroke-white {
  -webkit-text-stroke: 2px white;
}

.stroke-black {
  -webkit-text-stroke: 2px black;
}
</style>
