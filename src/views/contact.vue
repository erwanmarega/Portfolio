<template>
	<div class="min-h-screen bg-gradient-to-r from-blue-400 to-purple-600 flex items-center justify-center px-6 relative">
	  <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full max-w-5xl">
		<div class="text-white">
		  <h1 class="text-5xl font-bold mb-6 leading-tight">Un projet ou une demande ?</h1>
		  <div class="flex items-center space-x-4 mt-4">
			<img :src="logoGmail" alt="Gmail" class="w-10" />
			<h3 class="text-lg">maregaerwan@gmail.com</h3>
		  </div>
		</div>
  
		<div class="backdrop-blur-lg bg-white/10 border border-white/30 rounded-xl shadow-lg p-8 text-white">
		  <h2 class="text-4xl font-bold mb-6">Contactez-moi !</h2>
		  <form @submit.prevent="submitForm" class="space-y-5">
			<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
  				<input type="text" v-model="prenom" class="input-field" placeholder="Prénom" required />
  				<input type="text" v-model="nom" class="input-field" placeholder="Nom" required />
			</div>
			<div>
			  <input type="email" v-model="email" class="input-field w-full" placeholder="Email" required />
			</div>
			<div>
			  <textarea v-model="message" class="input-field w-full h-24" placeholder="Message" required></textarea>
			</div>
			<button type="submit" class="w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm py-3 text-center">Envoyer</button>
		  </form>
		</div>
	  </div>
	</div>
  </template>
  
  <script>
  import axios from 'axios';
  import logoGmail from '../assets/logo_gmail.png'; 
  
  export default {
	data() {
	  return {
		prenom: '',
		nom: '',
		email: '',
		message: '',
		logoGmail 
	  };
	},
	methods: {
	  async submitForm() {
		try {
		  await axios.post('http://localhost:3000/send-email', {
			prenom: this.prenom,
			nom: this.nom,
			email: this.email,
			message: this.message
		  });
		  alert('Email envoyé avec succès !');
		  
		  this.prenom = '';
		  this.nom = '';
		  this.email = '';
		  this.message = '';
		} catch (error) {
		  alert('Erreur lors de l\'envoi de l\'email.');
		  console.error('Erreur:', error.response ? error.response.data : error.message); // Afficher l'erreur
		}
	  }
	}
  };
  </script>
  
  <style scoped>
  .input-field {
	@apply bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500;
  }
  </style>
  