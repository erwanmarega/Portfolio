<template>
	<main class="min-h-screen flex items-center justify-center bg-gray-100 flex-col p-4 relative">
	  <div class="relative overflow-hidden w-full max-w-4xl mx-auto p-6  rounded-lg shadow-md">
		<div class="text-center">
		  <h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
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
			class="min-w-full flex flex-col items-center justify-center p-6"
		  >
			<img
			  :src="skill.icon"
			  :alt="skill.name"
			  class="w-16 h-16 md:w-20 md:h-20 object-contain mb-4"
			/>
			<p class="text-base md:text-lg font-semibold text-gray-800">
			  {{ skill.name }}
			</p>
		  </div>
		</div>
  
		<button
		  @click="prevSlide"
		  class="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 p-2 bg-gray-700 text-white rounded-full hover:bg-gray-900"
		>
		  &#10094;
		</button>
		<button
		  @click="nextSlide"
		  class="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 p-2 bg-gray-700 text-white rounded-full hover:bg-gray-900"
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
 
  h1 {
	font-size: 2rem;
  }
  
  @media (min-width: 768px) {
	h1 {
	  font-size: 2.5rem;
	}
  }
  
  button {
	width: 40px;
	height: 40px;
	font-size: 1.25rem;
  }
  
  @media (min-width: 1024px) {
	button {
	  width: 50px;
	  height: 50px;
	  font-size: 1.5rem;
	}
  }
  
  img {
	max-width: 100%;
	height: auto;
  }
  
  @media (max-width: 640px) {
	p {
	  font-size: 0.875rem;
	}
  }
  
  @media (min-width: 768px) {
	p {
	  font-size: 1.125rem;
	}
  }
  </style>
  