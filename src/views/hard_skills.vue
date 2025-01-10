<template>
	
	<div class="bg-gray-100 text-black min-h-screen p-2 relative">
	  <div class="text-center">
		<h1 class="text-4xl font-bold text-gray-800 mb-12"> 
		  Compétences
		</h1>
	  </div>
	  <div class="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6"> 
		<div 
		  v-for="(competence, index) in competences" 
		  :key="competence.title" 
		  class="mb-6"> 
		  <h2 
			class="text-xl font-bold mb-2 border-b-2 border-black pb-1 uppercase">
			<div :id="'title-' + index"></div>
		  </h2>
		  <ul class="list-disc pl-5 text-black">
			<li v-for="(item, itemIndex) in competence.description" :key="item">
			  <div :id="'desc-' + index + '-' + itemIndex"></div>
			</li>
		  </ul>
		</div>
	  </div>
	</div>
  </template>
  
  <script>
  import Typewriter from "typewriter-effect/dist/core";
  
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
	},
	mounted() {
	  this.animateText();
	},
	methods: {
	  animateText() {
		this.competences.forEach((competence, index) => {
		  new Typewriter(`#title-${index}`, {
			delay: 50,
		  })
			.typeString(competence.title)
			.start();
  
		  competence.description.forEach((item, itemIndex) => {
			new Typewriter(`#desc-${index}-${itemIndex}`, {
			  delay: 50,
			})
			  .typeString(item)
			  .start();
		  });
		});
	  }
	}
  };
  </script>
  
  <style scoped>
  main {
	margin-top: 150px; /* Ajustez cette valeur pour rapprocher la section */
  }
  </style>
  