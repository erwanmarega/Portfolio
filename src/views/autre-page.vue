<template>
	<main class="min-h-screen flex items-center justify-center bg-gray-100 relative ">
	  <div class="absolute sm:top-32 sm:left-14 md:top-14 md:left-22 lg:top-40 lg:left-22">
		<img :src="erwanImage" alt="Photo d'Erwan" class="w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full object-cover object-center shadow-lg border-4 border-white transition-transform duration-300 hover:scale-105">
	  </div>
	  
	  <div class="text-center p-8 bg-white shadow-lg rounded-lg absolute right-32 top-42">
		<h1 class="text-4xl font-bold text-gray-800 mb-6">PORTFOLIO</h1>
  
		<p class="text-lg text-gray-600 mb-8 leading-relaxed">
		  Développeur web en formation, <br />
		  passionné par la création de sites internet et la gestion de projets digitaux.<br/> 
		  Actuellement en BUT Métiers du Multimédia et de l'Internet,<br />
		  en alternance au sein de Présence Verte en tant qu’assistant communication.
		</p>
  
		
		<a :href="CV_Link" target="_blank" class="group relative inline-block overflow-hidden rounded border border-gray-100 bg-gray-200 px-12 py-3 text-sm font-medium text-slate-800 hover:text-violet-600 focus:outline-none focus:ring active:bg-indigo-600 active:text-white">
		  <span class="ease absolute left-0 top-0 h-0 w-0 border-t-2 border-violet-600 transition-all duration-200 group-hover:w-full"></span>
		  <span class="ease absolute right-0 top-0 h-0 w-0 border-r-2 border-violet-600 transition-all duration-200 group-hover:h-full"></span>
		  <span class="ease absolute bottom-0 right-0 h-0 w-0 border-b-2 border-violet-600 transition-all duration-200 group-hover:w-full"></span>
		  <span class="ease absolute bottom-0 left-0 h-0 w-0 border-l-2 border-violet-600 transition-all duration-200 group-hover:h-full"></span>
		  Téléchargez mon CV !
		</a>
		<a :href="Portfolio_Link" target="_blank" class="group relative inline-block overflow-hidden rounded border border-gray-100 bg-gray-200 px-12 py-3 text-sm font-medium text-slate-800 hover:text-violet-600 focus:outline-none focus:ring active:bg-indigo-600 active:text-white">
		  <span class="ease absolute left-0 top-0 h-0 w-0 border-t-2 border-violet-600 transition-all duration-200 group-hover:w-full"></span>
		  <span class="ease absolute right-0 top-0 h-0 w-0 border-r-2 border-violet-600 transition-all duration-200 group-hover:h-full"></span>
		  <span class="ease absolute bottom-0 right-0 h-0 w-0 border-b-2 border-violet-600 transition-all duration-200 group-hover:w-full"></span>
		  <span class="ease absolute bottom-0 left-0 h-0 w-0 border-l-2 border-violet-600 transition-all duration-200 group-hover:h-full"></span>
		  Téléchargez mon portfolio en design !
		</a>
	</div>
	  
	</main>
  </template>
  
  <script>
  import ErwanImage from '../assets/img_erwan.JPG';  
  
  
  export default {
	data() {
	  return {
		erwanImage: ErwanImage,  
		CV_Link: 'https://drive.google.com/file/d/1o0u6f1W0iew4LDbRSwhZF0FSfMco4yXt/view?usp=drive_link',
		Portfolio_Link: 'https://drive.google.com/file/d/1gbwL6-WvAEey_DaKdZSM0f64DIyAMvGa/view?usp=drive_link'
	  };
	}
  };
  </script>
  
  <style scoped>
  </style>
  