<template>
	<div class="bg-gray-100 text-black min-h-screen p-4 relative">
	  <div class="text-center">
		<h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
		  Compétences
		</h1>
	  </div>
	  <div class="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 px-4">
		<div
		  v-for="(competence, index) in competences"
		  :key="competence.title"
		  class="bg-white rounded-lg shadow-md p-4 transition-transform transform hover:scale-105"
		>
		  <h2 class="text-xl font-bold mb-2 border-b-2 border-black pb-1 uppercase">
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
			  "Création d’interfaces responsives et mobiles",
			],
		  },
		  {
			title: "Développement Back-End",
			description: [
			  "Création de serveurs avec Node.js et Express",
			  "Utilisation de Symfony pour des projets complexes",
			  "Gestion de bases de données relationnelles et non relationnelles (MySQL, PostgreSQL)",
			  "Mise en place d’API RESTful",
			  "Gestion de conteneurs avec Docker",
			],
		  },
		  {
			title: "Outils et Méthodologies",
			description: [
			  "Utilisation de Git et GitHub pour la gestion de version",
			  "Travail en méthodologies agiles (Scrum, Kanban)",
			  "Déploiement continu avec des outils tel que GitLab CI/CD",
			],
		  },
		],
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
	  },
	},
  };
  </script>
  
  <style scoped>

  

  .bg-gray-100 {
	padding-bottom: 2rem;

  }
  
  h1 {
	margin-top: 2rem;
  }
  
  .container {
	max-width: 1200px;
  }
  
  @media (max-width: 640px) {
	h1 {
	  font-size: 2rem;
	}
  
	.p-4 {
	  padding: 1rem;
	}
  
	.text-xl {
	  font-size: 1rem;
	}
  }
  
  @media (min-width: 1024px) {
	.grid {
	  grid-template-columns: repeat(2, 1fr);
	}
  }
  
  @media (min-width: 1280px) {
	.grid {
	  grid-template-columns: repeat(3, 1fr);
	}
  }
  </style>
  