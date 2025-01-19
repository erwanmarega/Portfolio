<template>
	<div class="relative">
	  <main :class="{ 'blur-background': isModalOpen }" class="min-h-screen bg-gray-100 flex flex-col items-center p-4">
		<h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-8">Projets</h1>
  
		<!-- Section API Pokemon -->
		<div
		  class="project-card"
		  ref="creationsSection"
		  :class="isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'"
		>
		  <div class="flex items-center"> <!-- Flexbox pour aligner l'image et le texte -->
			<img :src="api_pokemon" alt="API Pokemon" class="album-img" />
			<div class="flex flex-col justify-center ml-4 text-center sm:text-left"> <!-- Aligner le texte au centre -->
			  <p class="font-bold text-lg md:text-xl">Voici un exercice pour tester et apprendre comment marche une API !</p>
			</div>
		  </div>
		  <div class="overlay">
			<span class="text-white text-xl font-bold">API Pokemon</span>
			<button
			  @click="openModal(api_pokemon, 'API Pokemon', 'Un projet pour tester et apprendre une API !', 'https://erwanmarega.github.io/Api_exo/', 'Voir l\'API Pokémon')"
			  class="mt-4 btn-primary"
			>
			  Découvrir plus
			</button>
		  </div>
		</div>
  
		<!-- Section Calculatrice IOS -->
		<div
		  class="project-card"
		  :class="isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'"
		>
		  <div class="flex items-center"> <!-- Flexbox pour aligner l'image et le texte -->
			<img :src="calculatrice_ios" alt="Calculatrice IOS" class="album-img" />
			<div class="flex flex-col justify-center ml-4 text-center sm:text-left"> <!-- Aligner le texte au centre -->
			  <p class="font-bold text-lg md:text-xl">Voici un exercice pour reproduire une calculatrice IOS !</p>
			</div>
		  </div>
		  <div class="overlay">
			<span class="text-white text-xl font-bold">Calculatrice IOS</span>
			<button
			  @click="openModal(calculatrice_ios, 'Calculatrice IOS', 'Un projet pour refaire une calculatrice IOS !', 'https://erwanmarega.github.io/Calculatrice_ios/', 'Voir la Calculatrice IOS')"
			  class="mt-4 btn-primary"
			>
			  Découvrir plus
			</button>
		  </div>
		</div>
	  </main>
  
	  <transition name="modal-fade">
		<div v-if="isModalOpen" class="modal-overlay" @click="closeModal">
		  <div class="modal-content" @click.stop>
			<img :src="modalImage" :alt="modalTitle" class="modal-img mx-auto" />
			<h2 class="text-2xl font-bold mt-4">{{ modalTitle }}</h2>
			<p class="text-gray-700 mt-2">{{ modalDescription }}</p>
			<p v-if="modalLink" class="mt-4">
			  <a :href="modalLink" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">{{ modalLinkText }}</a>
			</p>
			<button
			  @click="closeModal"
			  class="mt-4 btn-danger"
			>
			  Fermer
			</button>
		  </div>
		</div>
	  </transition>
	</div>
  </template>
  
  <script>
  import api_pokemon from '../assets/api_pokemon.png';
  import calculatrice_ios from '../assets/Calculatrice_ios.webp';
  
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
		isVisible: false
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
		document.body.classList.add('no-scroll');
	  },
	  closeModal() {
		this.isModalOpen = false;
		this.modalImage = '';
		this.modalTitle = '';
		this.modalDescription = '';
		this.modalLink = '';
		this.modalLinkText = '';
		document.body.classList.remove('no-scroll');
	  },
	  handleKeydown(event) {
		if (event.key === 'Escape') {
		  this.closeModal();
		}
	  },
	},
	mounted() {
	  document.addEventListener('keydown', this.handleKeydown);
  
	  const observer = new IntersectionObserver(
		([entry]) => {
		  if (entry.isIntersecting) {
			this.isVisible = true;
		  }
		},
		{
		  threshold: 0.1
		}
	  );
	  observer.observe(this.$refs.creationsSection);
	},
	beforeDestroy() {
	  document.removeEventListener('keydown', this.handleKeydown);
	},
  };
  </script>
  
  <style scoped>
  .project-card {
	@apply relative text-center p-8 bg-white shadow-lg rounded-lg m-4 w-full max-w-screen-lg flex flex-col sm:flex-row sm:justify-start sm:ml-12 transition-transform duration-500 ease-out transform;
  }
  
  .album-img {
	@apply w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-xl object-cover;
  }
  
  /* Centrer les images sur mobile et aligner à gauche sur des écrans plus larges */
  @media (max-width: 639px) {
	.album-img {
	  @apply mx-auto mb-4;
	}
  }
  
  .overlay {
	@apply absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out rounded-xl opacity-0 hover:opacity-100;
  }
  
  /* Modal Overlay */
  .modal-overlay {
	@apply fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50;
  }
  
  .modal-content {
	@apply bg-white p-8 rounded-lg shadow-lg text-center;
  }
  
  .modal-img {
	@apply w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-xl object-cover;
  }
  
  .btn-primary {
	@apply bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200;
  }
  
  .btn-danger {
	@apply bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600 transition duration-200;
  }
  
  .blur-background {
	filter: blur(8px);
	transition: filter 0.3s ease-in-out;
  }
  </style>
  