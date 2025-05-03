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
			<button
			  type="submit"
			  class="w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm py-3 text-center flex items-center justify-center"
			>
			  <span v-if="!isLoading">Envoyer</span>
			  <svg v-if="isLoading" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
				<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
				<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
			  </svg>
			</button>
		  </form>
		</div>
	  </div>
  
	  <div class="absolute bottom-4 left-4 text-white text-sm font-light">
		<p>
		  &copy; 2025 Erwan Marega | Tous droits réservés
		</p>
	  </div>
	  <div class="absolute bottom-4 right-4 text-white text-xl font-bold">
		{{ currentTime }}
	  </div>
  
	  <div v-if="messageSent" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
		<div class="bg-white rounded-xl p-6 shadow-lg text-center space-y-4 max-w-md w-full">
		  <h3 class="text-xl font-bold text-gray-900">Message envoyé !</h3>
		  <p class="text-gray-700">Votre message a bien été envoyé. Vous aurez une réponse rapidement.</p>
		  <button
			@click="messageSent = false"
			class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg focus:ring focus:ring-blue-300"
		  >
			OK
		  </button>
		</div>
	  </div>
	</div>
  </template>
  
  <script>
  import logoGmail from "../assets/logo_gmail.webp";
  
  export default {
	data() {
	  return {
		prenom: "",
		nom: "",
		email: "",
		message: "",
		messageSent: false, 
		isLoading: false, 
		logoGmail,
	  };
	},
	methods: {
	  async submitForm() {
		const API_URL = import.meta.env.VITE_API_URL;
  
		if (!API_URL) {
		  alert("Erreur : L'URL de l'API n'est pas définie.");
		  return;
		}
  
		this.isLoading = true; 
  
		try {
		  const requestData = {
			prenom: this.prenom,
			nom: this.nom,
			email: this.email,
			message: this.message,
		  };
  
		  const response = await fetch("https://ewmnode.onrender.com/send-email", {
			method: "POST",
			headers: {
			  "Content-Type": "application/json",
			},
			body: JSON.stringify(requestData),
			credentials: "include",
		  });
  
		  if (!response.ok) {
			const errorDetails = await response.text();
			throw new Error(`Erreur HTTP : ${response.status} - ${errorDetails}`);
		  }
  
		  const result = await response.json();
		  console.log("Email envoyé avec succès :", result);
  
		  this.messageSent = true;
  
		  this.prenom = "";
		  this.nom = "";
		  this.email = "";
		  this.message = "";
		} catch (error) {
		  console.error("Erreur lors de l'envoi de l'email :", error);
		} finally {
		  this.isLoading = false; 
		}
	  },
	},
  };
  </script>
  
  <style scoped>
  .input-field {
	@apply bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500;
  }
  </style>
