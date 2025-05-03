<template>
	<div class="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 text-gray-900 py-16 px-4 sm:px-6 lg:px-8">
	  <header class="mb-12 text-center">
		<h1 class="text-4xl sm:text-5xl font-extrabold text-gray-900 animate-fade-in">
		  Mes Créations
		</h1>
		<p class="mt-4 text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-delay">
		  Explorez mes projets, conçus avec créativité et expertise technique.
		</p>
	  </header>
  
	  <div class="relative max-w-6xl mx-auto">
		<div
		  ref="slider"
		  class="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-6"
		  role="region"
		  aria-label="Carrousel de projets"
		  @wheel.prevent="handleScroll"
		>
		  <transition-group name="card" tag="div" class="flex gap-6">
			<div
			  v-for="creation in creations"
			  :key="creation.id"
			  class="w-80 flex-shrink-0 snap-center"
			>
			  <div class="relative bg-white/70 backdrop-blur-md rounded-xl shadow-lg overflow-hidden border border-gray-200/50 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 hover:border-indigo-300 h-[22rem]">
				<img
				  :src="creation.image"
				  :alt="creation.title"
				  class="w-full h-40 object-cover transition-transform duration-700 hover:scale-105"
				/>
				<div class="p-4 flex flex-col h-[calc(100%-10rem)]">
				  <h2 class="text-lg font-semibold text-gray-900 truncate">{{ creation.title }}</h2>
				  <p class="mt-2 text-gray-600 text-sm line-clamp-3 flex-grow">{{ creation.description }}</p>
				  <a
					:href="creation.link"
					target="_blank"
					class="mt-2 inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-300"
					:aria-label="`Voir le projet ${creation.title}`"
				  >
					Voir Plus
					<svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
					</svg>
				  </a>
				</div>
			  </div>
			</div>
		  </transition-group>
		</div>
  
		<button
		  @click="scrollSlider(-1)"
		  class="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-md hover:bg-white transition transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-indigo-500"
		  aria-label="Projet précédent"
		>
		  <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
		  </svg>
		</button>
		<button
		  @click="scrollSlider(1)"
		  class="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-md hover:bg-white transition transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-indigo-500"
		  aria-label="Projet suivant"
		>
		  <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
		  </svg>
		</button>
  
		
	  </div>
	</div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  import figmaImage from '../assets/Figma.webp';
  import pokemonImage from '../assets/pokemon.webp';
  import spotifyImage from '../assets/spotify.webp';
  import calculatriceImage from '../assets/Calculatrice.webp';
  import adiImage from '../assets/AdiImage.webp';
  import React_nativeImage from '../assets/react_native.webp';
  import Symfony from '../assets/symfony.webp';
  
  const slider = ref(null);
  const currentIndex = ref(0);
  
  const creations = ref([
	{ id: 1, title: "Refonte ADI", description: "Refonte du site de la société ADI.", image: adiImage, link: "https://agencementimmo.vercel.app/" },
	{ id: 2, title: "Symfony Vsj_natation", description: "L'architecture de mon application back-end symfony", image: Symfony, link: "https://github.com/erwanmarega/Vsj_backend" },
	{ id: 3, title: "Calendrier Spotify", description: "Suivi des sorties musicales avec une interface moderne.", image: spotifyImage, link: "https://spotcalendar.vercel.app/" },
	{ id: 4, title: "Application Vsj_natation", description: "Application React native + back-end Symfony", image: React_nativeImage, link: "https://github.com/erwanmarega/Vsj_natation_app_new" },
	{ id: 5, title: "API Pokémon", description: "Exploration des APIs avec un projet Pokémon interactif.", image: pokemonImage, link: "https://erwanmarega.github.io/Api_exo/" },
	{ id: 6, title: "Calculatrice iOS", description: "Reproduction fidèle d'une calculatrice iOS.", image: calculatriceImage, link: "https://erwanmarega.github.io/Calculatrice_ios/" },
	{ id: 7, title: "Figma", description: "Maquette Figma avec animations fluides et interactives.", image: figmaImage, link: "https://www.figma.com/proto/wQ9lPQ2EJPcImz1pcZemxz/Untitled?node-id=2-2&starting-point-node-id=2%3A2&t=Nvfx0PEgLLcEeyQh-1" }
  ]);
  
  const handleScroll = (event) => {
	if (window.innerWidth >= 768 && slider.value) {
	  event.preventDefault();
	  const scrollAmount = 352 + 24;
	  const direction = event.deltaY > 0 ? 1 : -1;
	  scrollSlider(direction);
	}
  };
  
  const scrollSlider = (direction) => {
	if (slider.value) {
	  const scrollAmount = 352 + 24;
	  const newScrollLeft = slider.value.scrollLeft + direction * scrollAmount;
	  slider.value.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
	  updateCurrentIndex(newScrollLeft);
	}
  };
  
  const scrollToIndex = (index) => {
	if (slider.value) {
	  const scrollAmount = 352 + 24;
	  const newScrollLeft = index * scrollAmount;
	  slider.value.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
	  currentIndex.value = index;
	}
  };
  
  const updateCurrentIndex = (scrollLeft) => {
	const scrollAmount = 352 + 24;
	const index = Math.round(scrollLeft / scrollAmount);
	currentIndex.value = Math.max(0, Math.min(index, creations.value.length - 1));
  };
  
  const startAutoScroll = () => {
	setInterval(() => {
	  if (currentIndex.value < creations.value.length - 1) {
		scrollSlider(1);
	  } else {
		scrollToIndex(0);
	  }
	}, 5000);
  };
  
 
  
  onUnmounted(() => {
	clearInterval();
  });
  </script>
  
  <style scoped>
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
  
  @keyframes fade-in-delay {
	from {
	  opacity: 0;
	  transform: translateY(20px);
	}
	50% {
	  opacity: 0;
	  transform: translateY(20px);
	}
	to {
	  opacity: 1;
	  transform: translateY(0);
	}
  }
  
  .card-enter-active,
  .card-leave-active {
	transition: all 0.5s ease;
  }
  
  .card-enter-from,
  .card-leave-to {
	opacity: 0;
	transform: translateX(50px);
  }
  
  .animate-fade-in {
	animation: fade-in 0.8s ease-out;
  }
  
  .animate-fade-in-delay {
	animation: fade-in-delay 1.2s ease-out;
  }
  
  .scrollbar-hide::-webkit-scrollbar {
	display: none;
  }
  
  .scrollbar-hide {
	-ms-overflow-style: none;
	scrollbar-width: none;
  }
  </style>