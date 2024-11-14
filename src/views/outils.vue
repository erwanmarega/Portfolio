<template>
	<main class="min-h-screen flex items-center justify-center bg-gray-100 relative">
	  <div class="relative overflow-hidden w-full max-w-4xl mx-auto p-6 bg-gray-100 relative">
		<div class="text-center">
		  <h1 class="text-4xl font-bold text-gray-800 mb-6">
			Outils
		  </h1>
		</div>
		<div
		  class="flex transition-transform duration-500 ease-in-out"
		  :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
		>
		  <div
			v-for="(skill, index) in skills"
			:key="index"
			class="min-w-full flex flex-col items-center justify-center p-4"
		  >
			<img
			  :src="skill.icon"
			  :alt="skill.name"
			  class="w-20 h-20 object-contain mb-4"
			/>
			<p class="text-lg font-semibold text-gray-800">{{ skill.name }}</p>
		  </div>
		</div>
  
		<button
		  @click="prevSlide"
		  class="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-gray-700 text-white rounded-full hover:bg-gray-900"
		>
		  &#10094;
		</button>
		<button
		  @click="nextSlide"
		  class="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-gray-700 text-white rounded-full hover:bg-gray-900"
		>
		  &#10095;
		</button>
  
		<div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
		  <span
			v-for="(skill, index) in skills"
			:key="index"
			class="cursor-pointer w-3 h-3 bg-gray-500 rounded-full"
			:class="{ 'bg-gray-900': currentSlide === index }"
			@click="goToSlide(index)"
		  ></span>
		</div>
	  </div>
	</main>
  </template>
  
  <script>
  export default {
	data() {
	  return {
		currentSlide: 0,
		interval: null, 
		skills: [
		  { name: "HTML", icon: "https://cdn-icons-png.flaticon.com/512/732/732212.png" },
		  { name: "CSS", icon: "https://cdn-icons-png.flaticon.com/512/732/732190.png" },
		  { name: "JavaScript", icon: "https://cdn-icons-png.flaticon.com/512/5968/5968292.png" },
		  { name: "Vue.js", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/640px-Vue.js_Logo_2.svg.png" },
		  { name: "Tailwind CSS", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/2560px-Tailwind_CSS_Logo.svg.png" },
		  { name: "Github", icon: "https://cdn-icons-png.flaticon.com/512/25/25231.png" },
		  { name: "Node.js", icon: "https://cdn-icons-png.flaticon.com/512/919/919825.png" },
		],
	  };
	},
	mounted() {
	  
	  this.startAutoSlide();
	},
	beforeDestroy() {
	  
	  clearInterval(this.interval);
	},
	methods: {
	  startAutoSlide() {
		this.interval = setInterval(() => {
		  this.nextSlide();
		}, 5000); 
	  },
	  nextSlide() {
		this.currentSlide = (this.currentSlide + 1) % this.skills.length;
	  },
	  prevSlide() {
		this.currentSlide =
		  (this.currentSlide - 1 + this.skills.length) % this.skills.length;
	  },
	  goToSlide(index) {
		this.currentSlide = index;
	  },
	},
  };
  </script>
  
  <style scoped>
  .carousel-container {
	height: 300px;
  }
  </style>
  