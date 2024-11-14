<template>
	<main class="min-h-screen flex items-center justify-center bg-gray-100 flex-col p-4 relative">
	  
	  <div class="relative text-center p-8 bg-white shadow-lg rounded-lg m-12 w-full max-w-screen-lg flex flex-col sm:flex-row sm:justify-center">
		<img :src="albumCover" alt="Album_dinos" class="album-img sm:mr-8 mb-4 sm:mb-0"/>
  
		<div class="flex flex-col justify-center mt-4 sm:mt-0">
		  <p class="font-bold text-lg">Voici l'album Dinos, un projet de design graphique !</p>
		</div>
  
		<div class="overlay">
		  <span class="text-white text-xl font-bold">Album Dinos</span>
		  <span class="text-white text-lg mt-2">Design graphique</span>
  
		  <button @click="goToAbout" class="mt-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200">
			Découvrir plus
		  </button>
		</div>  
	  </div>
	  
	  <div class="relative text-center p-8 bg-white shadow-lg rounded-lg m-12 w-full max-w-screen-lg flex flex-col sm:flex-row sm:justify-center">
		<img :src="Calculatrice" alt="Calculatrice" class="Calculatrice sm:mr-8 mb-4 sm:mb-0"/>
  
		<div class="flex flex-col justify-center mt-4 sm:mt-0">
		  <p class="font-bold text-lg">Voici un projet de calculatrice interactif !</p>
		</div>
  
		<div class="overlay">
		  <span class="text-white text-xl font-bold">Calculatrice</span>
		  <span class="text-white text-lg mt-2">Application interactive</span>
  
		  <button @click="goToOtherPage" class="mt-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200">
			Découvrir plus
		  </button>
		</div>  
	  </div>
	  
	  <div class="relative text-center p-8 bg-white shadow-lg rounded-lg m-12 w-full max-w-screen-lg flex flex-col sm:flex-row sm:justify-center">
		<img :src="Heart" alt="Heart design" class="Heart sm:mr-8 mb-4 sm:mb-0"/>
  
		<div class="flex flex-col justify-center mt-4 sm:mt-0">
		  <p class="font-bold text-lg">Voici un projet sur l'illustration d'un cœur !</p>
		</div>
  
		<div class="overlay">
		  <span class="text-white text-xl font-bold">Heart Design</span>
		  <span class="text-white text-lg mt-2">Illustration</span>
  
		  <button @click="goToOtherPage" class="mt-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200">
			Découvrir plus
		  </button>
		</div>  
	  </div>
  
	</main>
  </template>
  
  <script>
  import albumCover from '../assets/Album_cover.png';
  import Calculatrice from '../assets/Calculatrice.png';
  import Heart from '../assets/Heart.png';
  
  export default {
	data() {
	  return {
		albumCover,
		Calculatrice,
		Heart,
	  };
	},
	methods: {
	  goToAbout() {
		this.$router.push('/about');
	  },
	  goToOtherPage() {
		this.$router.push('/autre-page');
	  }
	}
  };
  </script>
  
  <style scoped>
  .album-img {
	@apply w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-xl transition-opacity duration-300 ease-in-out opacity-100 hover:opacity-30;
  }
  
  .Calculatrice {
	@apply min-w-10 rounded-xl transition-opacity duration-300 ease-in-out opacity-100 hover:opacity-30;
  }
  
  .Heart {
	@apply w-32 h-32 rounded-xl transition-opacity duration-300 ease-in-out opacity-100 hover:opacity-30;
  }
  
  .hover-img {
	@apply w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-xl transition-opacity duration-300 ease-in-out opacity-100 hover:opacity-30;
  }
  
  .overlay {
	@apply absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out rounded-xl opacity-0 hover:opacity-100;
  }
  </style>
  