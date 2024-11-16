<template>
	<main class="min-h-screen flex items-center justify-center bg-gray-100 flex-col p-4 relative">
	  <!-- Bloc pour l'API Pokemon -->
	  <div class="relative text-center p-8 bg-white shadow-lg rounded-lg m-12 w-full max-w-screen-lg flex flex-col sm:flex-row sm:justify-center">
		<img :src="api_pokemon" alt="API Pokemon" class="album-img sm:mr-8 mb-4 sm:mb-0" />
		<div class="flex flex-col justify-center mt-4 sm:mt-0">
		  <p class="font-bold text-lg">Voici un exercice pour tester et apprendre comment marche une API !</p>
		</div>
		<div class="overlay">
		  <span class="text-white text-xl font-bold">API Pokemon</span>
		  <button
			@click="openModal(api_pokemon, 'API Pokemon', 'Un projet pour tester et apprendre une API !', 'https://erwanmarega.github.io/Api_exo/', 'Voir l\'API Pokémon')"
			class="mt-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
		  >
			Découvrir plus
		  </button>
		</div>
	  </div>
  
	  <!-- Bloc pour la Calculatrice IOS -->
	  <div class="relative text-center p-8 bg-white shadow-lg rounded-lg m-12 w-full max-w-screen-lg flex flex-col sm:flex-row sm:justify-center">
		<!-- Applique une taille différente si la modale est ouverte -->
		<img :src="calculatrice_ios" alt="Calculatrice IOS" class="album-img sm:mr-8 mb-4 sm:mb-0" :class="{'small-img': isModalOpen}" />
		<div class="flex flex-col justify-center mt-4 sm:mt-0">
		  <p class="font-bold text-lg">Voici un exercice pour reproduire une calculatrice IOS !</p>
		</div>
		<div class="overlay">
		  <span class="text-white text-xl font-bold">Calculatrice IOS</span>
		  <button
			@click="openModal(calculatrice_ios, 'Calculatrice IOS', 'Un projet pour refaire une calculatrice IOS !', 'https://erwanmarega.github.io/Calculatrice_ios/', 'Voir la Calculatrice IOS')"
			class="mt-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
		  >
			Découvrir plus
		  </button>
		</div>
	  </div>
  
	  <!-- Fenêtre modale -->
	  <transition name="modal-fade">
		<div v-if="isModalOpen" class="modal-overlay" @click="closeModal">
		  <div class="modal-content" @click.stop>
			<img :src="modalImage" alt="Image dans la modale" class="w-full max-w-screen-sm mx-auto rounded" />
			<h2 class="text-2xl font-bold mt-4">{{ modalTitle }}</h2>
			<p class="text-gray-700 mt-2">{{ modalDescription }}</p>
			<!-- Lien spécifique pour chaque projet -->
			<p v-if="modalLink" class="mt-4 text-blue-600 hover:underline">
			  <a :href="modalLink" target="_blank" rel="noopener noreferrer">{{ modalLinkText }}</a>
			</p>
			<button
			  @click="closeModal"
			  class="mt-4 bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600 transition duration-200"
			>
			  Fermer
			</button>
		  </div>
		</div>
	  </transition>
	</main>
  </template>
  
  
  
  <script>
import api_pokemon from '../assets/api_pokemon.png';
import calculatrice_ios from '../assets/calculatrice_ios.png';

export default {
  data() {
    return {
      api_pokemon,
      calculatrice_ios,
      isModalOpen: false, 
      modalImage: '', 
      modalTitle: '',
      modalDescription: '', 
      modalLink: '', 
      modalLinkText: '',
    };
  },
  methods: {
    openModal(image, title, description, link = '', linkText = '') {
      this.modalImage = image;
      this.modalTitle = title;
      this.modalDescription = description;
      this.modalLink = link;
      this.modalLinkText = linkText; 
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
      this.modalImage = '';
      this.modalTitle = '';
      this.modalDescription = '';
      this.modalLink = '';
      this.modalLinkText = '';
    },
    handleKeydown(event) {
      if (event.key === 'Escape') {
        this.closeModal();
      }
    },
  },
  mounted() {
    document.addEventListener('keydown', this.handleKeydown);
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.handleKeydown);
  },
};
</script>


  
<style scoped>
.modal-overlay {
  @apply fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50;
}

.modal-content {
  @apply bg-white p-8 rounded-lg shadow-lg relative text-center;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s;
}
.modal-fade-enter, 
.modal-fade-leave-to {
  opacity: 0;
}

.album-img {
  @apply w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-xl transition-opacity duration-300 ease-in-out opacity-100 hover:opacity-30;
}

.small-img {
  @apply w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72;
}

.overlay {
  @apply absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out rounded-xl opacity-0 hover:opacity-100;
}
</style>
