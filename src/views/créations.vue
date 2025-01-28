<template>
	<div class="relative">
	  <main :class="{ 'blur-background': isModalOpen }" class="min-h-[80vh] bg-gray-100 flex flex-col items-center p-4">
		<div
		  class="project-card"
		  ref="creationsSection"
		  :class="isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'"
		>
		  <div class="flex items-center"> 
			<img :src="api_pokemon" alt="API Pokemon" class="album-img" />
			<div class="flex flex-col justify-center ml-4 text-center sm:text-left"> 
			  <p class="font-bold text-lg md:text-xl">Voici un exercice pour tester et apprendre comment marche une API !</p>
			</div>
		  </div>
		  <div class="overlay">
			<span class="text-white text-xl font-bold">API Pokemon</span>
			<button
			  @click="openModal(api_pokemon, 'API Pokemon', 'Un projet pour tester et apprendre une API Développé en HTML, CSS et JAVASCRIPT !', 'https://erwanmarega.github.io/Api_exo/', 'Voir l\'API Pokémon')"
			  class="mt-4 btn-primary"
			>
			  Découvrir plus
			</button>
		  </div>
		</div>
  
		<div
		  class="project-card"
		  :class="isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'"
		>
		  <div class="flex items-center"> 
			<img :src="calculatrice_ios" alt="Calculatrice IOS" class="album-img" />
			<div class="flex flex-col justify-center ml-4 text-center sm:text-left"> 
			  <p class="font-bold text-lg md:text-xl">Voici un exercice pour reproduire une calculatrice IOS !</p>
			</div>
		  </div>
		  <div class="overlay">
			<span class="text-white text-xl font-bold">Calculatrice IOS</span>
			<button
			  @click="openModal(calculatrice_ios, 'Calculatrice IOS', 'Un projet pour refaire une calculatrice IOS ! Développé en HTML, CSS et JAVASCRIPT', 'https://erwanmarega.github.io/Calculatrice_ios/', 'Voir la Calculatrice IOS')"
			  class="mt-4 btn-primary"
			>
			  Découvrir plus
			</button>
		  </div>
		</div>
  
		<div
		  class="project-card"
		  :class="isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'"
		>
		  <div class="flex items-center"> 
			<img :src="figma_image" alt="Projet Figma" class="album-img figma-img" />
			<div class="flex flex-col justify-center ml-4 text-center sm:text-left"> 
			  <p class="font-bold text-lg md:text-xl">Voici un projet de design réalisé avec Figma !</p>
			</div>
		  </div>
		  <div class="overlay">
			<span class="text-white text-xl font-bold">Projet Figma</span>
			<button
			  @click="openModal(figma_image, 'Projet Figma', 'Un projet de design réalisé avec Figma !', 'https://www.figma.com/proto/wQ9lPQ2EJPcImz1pcZemxz/Untitled?node-id=2-2&p=f&t=bv86bR1iRDJ1X8bl-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=2%3A2', 'Voir le projet Figma')"
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
  import figma_image from '../assets/figma.svg';
  
  export default {
	data() {
	  return {
		api_pokemon,
		calculatrice_ios,
		figma_image,
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
	  }
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
	}
  };
  </script>
  
  <style scoped>
  .project-card {
    @apply relative text-center p-6 bg-white shadow-lg rounded-lg m-4 w-full max-w-screen-lg flex flex-col sm:flex-row sm:items-center transition-transform duration-500 ease-out transform;
}
  
  .album-img {
	@apply w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-xl object-cover;
  }
  
  @media (max-width: 639px) {
	.album-img {
	  @apply mx-auto mb-4;
	}
  }
  
  .overlay {
	@apply absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out rounded-xl opacity-0 hover:opacity-100;
  }
  
  .modal-overlay {
	@apply fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50;
  }
  
  .modal-content {
	@apply bg-white p-6 rounded-lg shadow-lg text-center;
  }
  
  .modal-img {
	@apply w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-xl object-cover;
  }
  
  .btn-primary {
	@apply bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200;
  }
  
  .btn-danger {
	@apply bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600 transition duration-200;
  }

  .album-img, .figma-img {
    @apply w-40 h-40 sm:w-48 sm:h-48 md:w-32 md:h-32  object-cover;
}

.text-container {
    @apply flex flex-col justify-center ml-4 text-center sm:text-left;
}

  
  .blur-background {
	filter: blur(8px);
	transition: filter 0.3s ease-in-out;
  }
  </style>