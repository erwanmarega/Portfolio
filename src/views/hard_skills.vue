<template>
	<div class="bg-gray-100 text-black min-h-screen p-6 relative">
		<div class="text-center">
			<h1 class="text-4xl font-bold text-gray-800 mb-24">
			Compétences : 
			</h1>
		</div>
	  <div class="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-12">
		<div v-for="competence in competences" :key="competence.title">
		  <h2 class="text-xl font-bold mb-4 border-b-2 border-black pb-2 uppercase">{{ competence.title }}</h2>
		  <p class=" text-black">{{ competence.description }}</p>
		</div>
	  </div>
	</div>
  </template>
  
  <script>
  export default {
	name: 'Page',
	data() {
	  return {
		competences: [
		  {
			title: 'Design Graphique',
			description:
			  "Dans le cadre de mes projets tutorés, j'ai realisé plusieurs logos, charte graphique, illustration. Je dessine également depuis 10 ans. J'ai commencé par le manga et j'ai continué par du portrait et des illustrations."
		  },
		  {
			title: 'Développement Web',
			description:
			  "J'ai créé plusieurs sites statiques en HTML & CSS dans le cadre de mes cours et de mes projets personnels, j'ai réalisé également des sites dynamiques en intégrant de JavaScript, du PHP et du SQL pour la base de données dans le cadre de mes projets tutorés. J'utilise occasionnelement des CMS comme WordPress ou Wix."
		  },
		  
		  {
			title: 'Audiovisuel',
			description:
			  "Dans le cadre de mes projets tutorés, mes partenaires et moi avons réalisés un documentaire sur le festival du Brie de Meaux. Dans ce projet, je me suis occupé de la partie son, caméra et également une partie du montage."
		  }
		]
	  };
	}
  };
  </script>
  
  <style scoped>
  </style>
  