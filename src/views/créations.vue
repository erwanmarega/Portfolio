<template>
	<div class="bg-gray-100 text-black min-h-screen p-6 relative overflow-hidden">
	  <header class="mb-12 text-center">
		<h1 class="text-5xl font-bold mb-4 animate-fadeIn">Mes Créations</h1>
		<p class="text-lg text-gray-600">Découvrez mes projets récents et mes idées innovantes.</p>
	  </header>
	  
	  <div 
		ref="slider" 
		class="flex gap-8 overflow-x-hidden"
		@wheel.prevent="handleScroll"
	  >
		<div 
		  v-for="creation in creations" 
		  :key="creation.id" 
		  class="min-w-[300px] md:min-w-[400px] flex-shrink-0 rounded-xl shadow-xl relative overflow-hidden group"
		>
		  <img 
			:src="creation.image" 
			:alt="creation.title" 
			class="w-full h-64 object-cover transform transition duration-500 group-hover:scale-110"
		  />
		  <div class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-500 flex flex-col justify-end p-4">
			<h2 class="text-xl text-white font-bold">{{ creation.title }}</h2>
			<p class="text-sm text-gray-200">{{ creation.description }}</p>
			<a 
			  :href="creation.link" 
			  target="_blank" 
			  class="mt-2 inline-block px-3 py-1 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700 transition"
			>
			  Voir Plus
			</a>
		  </div>
		</div>
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
	if (slider.value) {
	  slider.value.scrollLeft += event.deltaY * 0.5;
	}
  };
  
  const creations = ref([
	{
	  id: 1,
	  title: "Figma",
	  description: "Une Maquette figma afin d'apprendre à faire des animations et apprendre à faire des pages créatives et attractives.",
	  image: figma_image,
	  link: "https://www.figma.com/proto/wQ9lPQ2EJPcImz1pcZemxz/Untitled?node-id=2-2&starting-point-node-id=2%3A2&t=PP4n6QUkMOcHgwHO-1"
	},
	{
	  id: 2,
	  title: "Api Pokemon",
	  description: "Un projet pour tester et apprendre une API Développé en HTML, CSS et JavaScript !.",
	  image: pokemon,
	  link: "https://erwanmarega.github.io/Api_exo/"
	},
	{
	  id: 3,
	  title: "Calendrier Spotify",
	  description: "Un projet visant à offrir un récapitulatif des sorties musicales de la semaine en fonction des genres choisis.",
	  image: spotify,
	  link: "https://calendarspotify.vercel.app/"
	},
	{
	  id: 4,
	  title: "Calculatrice IOS",
	  description: "Un projet visant à reproduire une calculatrice IOS en HTML, CSS et JavaScript.",
	  image: calculatrice,
	  link: "https://erwanmarega.github.io/Calculatrice_ios/"
	}
  ]);
  </script>
  
  <style scoped>
  @keyframes fadeIn {
	from {
	  opacity: 0;
	  transform: translateY(-20px);
	}
	to {
	  opacity: 1;
	  transform: translateY(0);
	}
  }
  
  .animate-fadeIn {
	animation: fadeIn 1s ease-out;
  }
  </style>
  