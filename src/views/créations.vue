<template>
	<div class="bg-gray-100 text-gray-900 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
	  <header class="mb-12 text-center">
		<h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-gray-900 animate-slideIn">
		  Mes Créations
		</h1>
		<p class="mt-4 text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto">
		  Découvrez mes projets récents, conçus avec passion et innovation.
		</p>
	  </header>
  
	  <div class="relative">
		<div 
		  ref="slider"
		  class="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide md:overflow-x-hidden"
		  @wheel.prevent="handleScroll"
		>
		  <div 
			v-for="creation in creations" 
			:key="creation.id" 
			class="w-80 sm:w-96 flex-shrink-0 snap-center"
		  >
			<div class="relative bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
			  <img 
				:src="creation.image" 
				:alt="creation.title" 
				class="w-full h-56 sm:h-64 object-cover transition-transform duration-700 hover:scale-105"
			  />
			  <div class="p-6">
				<h2 class="text-xl font-semibold text-gray-900">{{ creation.title }}</h2>
				<p class="mt-2 text-gray-600 text-sm line-clamp-2">{{ creation.description }}</p>
				<a 
				  :href="creation.link" 
				  target="_blank" 
				  class="mt-4 inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-300"
				>
				  Voir Plus
				  <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
				  </svg>
				</a>
			  </div>
			</div>
		  </div>
		</div>
  
		<button 
		  @click="scrollSlider(-1)" 
		  class="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
		>
		  <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
		  </svg>
		</button>
		<button 
		  @click="scrollSlider(1)" 
		  class="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
		>
		  <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
		  </svg>
		</button>
	  </div>
	</div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import figma_image from '../assets/Figma.png';
  import pokemon from '../assets/pokemon.png';
  import spotify from '../assets/spotify.png';
  import calculatrice from '../assets/Calculatrice.png';
  
  const slider = ref(null);
  
  const handleScroll = (event) => {
	if (window.innerWidth >= 768 && slider.value) {
	  event.preventDefault();
	  const scrollAmount = 384 + 24; 
	  slider.value.scrollLeft += event.deltaY > 0 ? scrollAmount : -scrollAmount;
	}
  };
  
  const scrollSlider = (direction) => {
	if (slider.value) {
	  const scrollAmount = 384 + 24; 
	  slider.value.scrollLeft += direction * scrollAmount;
	}
  };
  
  const creations = ref([
	{ id: 1, title: "Figma", description: "Maquette Figma avec animations.", image: figma_image, link: "https://www.figma.com/proto/wQ9lPQ2EJPcImz1pcZemxz/Untitled?node-id=2-2&starting-point-node-id=2%3A2&t=Nvfx0PEgLLcEeyQh-1" },
	{ id: 2, title: "API Pokémon", description: "Projet d’apprentissage d’API.", image: pokemon, link: "https://erwanmarega.github.io/Api_exo/" },
	{ id: 3, title: "Calendrier Spotify", description: "Suivi des sorties musicales.", image: spotify, link: "https://calendarspotify.vercel.app/" },
	{ id: 4, title: "Calculatrice iOS", description: "Reproduction d'une calculatrice iOS.", image: calculatrice, link: "https://erwanmarega.github.io/Calculatrice_ios/" }
  ]);
  </script>
  
  <style scoped>
  @keyframes slideIn {
	from {
	  opacity: 0;
	  transform: translateY(-20px);
	}
	to {
	  opacity: 1;
	  transform: translateY(0);
	}
  }
  
  .animate-slideIn {
	animation: slideIn 0.8s ease-out;
  }
  
  .scrollbar-hide::-webkit-scrollbar {
	display: none;
  }
  
  .scrollbar-hide {
	-ms-overflow-style: none;
	scrollbar-width: none;
  }
  
  .snap-x {
	scroll-behavior: smooth;
  }
  </style>