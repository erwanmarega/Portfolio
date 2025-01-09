<template>
	<div class="bg-gray-100 text-black min-h-screen p-2 relative">
	  <div class="text-center">
		<h1 class="text-4xl font-bold text-gray-800 mb-6">
		  Compétences :
		</h1>
	  </div>
	  <div class="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
		<div v-for="competence in competences" :key="competence.title">
		  <h2 class="text-xl font-bold mb-2 border-b-2 border-black pb-1 uppercase">
			{{ competence.title }}
		  </h2>
		  <ul class="list-disc pl-5 text-black">
			<li v-for="item in competence.description" :key="item">{{ item }}</li>
		  </ul>
		</div>
	  </div>
	</div>
  </template>
  
  <script>
  export default {
	name: "Page",
	data() {
	  return {
		competences: [
		  {
			title: "Développement Front-End",
			description: [
			  "Création de sites statiques en HTML & CSS",
			  "Développement dynamique avec JavaScript",
			  "Maîtrise de frameworks front-end comme Vue.js et React, Nuxt.js et Next.js",
			  "Utilisation de préprocesseurs CSS",
			  "Création d’interfaces responsives et mobiles"
			]
		  },
		  {
			title: "Développement Back-End",
			description: [
			  "Création de serveurs avec Node.js et Express",
			  "Utilisation de Symfony pour des projets complexes",
			  "Gestion de bases de données relationnelles et non relationnelles (MySQL, PostgreSQL)",
			  "Mise en place d’API RESTful",
			  "Gestion de conteneurs avec Docker",
			]
		  },
		  {
			title: "Design Graphique",
			description: [
			  "Création de logos, chartes graphiques et illustrations",
			  "Pratique du dessin depuis 10 ans",
			  "Spécialisation en manga, portrait et illustrations",
			  "Utilisation de logiciels comme Adobe Photoshop, Illustrator, et Figma"
			]
		  },
		  {
			title: "Outils et Méthodologies",
			description: [
			  "Utilisation de Git et GitHub pour la gestion de version",
			  "Travail en méthodologies agiles (Scrum, Kanban)",
			  "Déploiement continu avec des outils tel que GitLab CI/CD"
			]
		  }
		]
	  };
	}
  };
  </script>
  
  <style scoped>

  </style>
  