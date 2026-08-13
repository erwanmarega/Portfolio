<template>
  <div ref="el" class="min-h-screen bg-gradient-to-r from-blue-400 to-purple-600 flex items-center justify-center px-6 relative overflow-hidden">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full max-w-5xl relative z-10">
      <div ref="leftCol" class="text-white">
        <h1 ref="titleEl" class="text-5xl font-bold mb-6 leading-tight">Un projet ou une demande ?</h1>
        <div ref="emailEl" class="flex items-center space-x-4 mt-4">
          <img :src="logoGmail" alt="Gmail" class="w-10" />
          <h3 class="text-lg">maregaerwan@gmail.com</h3>
        </div>
      </div>

      <div ref="formCard" class="backdrop-blur-lg bg-white/10 border border-white/30 rounded-xl shadow-lg p-8 text-white">
        <h2 ref="formTitle" class="text-4xl font-bold mb-6">Contactez-moi !</h2>
        <form ref="formEl" @submit.prevent="submitForm" class="space-y-5">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="text" v-model="prenom" class="contact-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" placeholder="Prénom" required />
            <input type="text" v-model="nom" class="contact-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" placeholder="Nom" required />
          </div>
          <div>
            <input type="email" v-model="email" class="contact-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full" placeholder="Email" required />
          </div>
          <div>
            <textarea v-model="message" class="contact-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full h-24" placeholder="Message" required></textarea>
          </div>
          <button
            ref="submitBtn"
            type="submit"
            class="w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm py-3 text-center flex items-center justify-center transition-colors"
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

    <div ref="footerLeft" class="absolute bottom-4 left-4 text-white text-sm font-light">
      <p>&copy; 2025 Erwan Marega | Tous droits réservés</p>
    </div>

    <div v-if="messageSent" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div ref="modalEl" class="bg-white rounded-xl p-6 shadow-lg text-center space-y-4 max-w-md w-full">
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

<script setup>
import { ref, onMounted } from "vue";
import gsap from "gsap";
import { useEnterAnimation } from "../composables/useEnterAnimation.js";
import logoGmail from "../assets/logo-gmail.webp";

const el = ref(null);
const leftCol = ref(null);
const titleEl = ref(null);
const emailEl = ref(null);
const formCard = ref(null);
const formTitle = ref(null);
const formEl = ref(null);
const submitBtn = ref(null);
const footerLeft = ref(null);
const modalEl = ref(null);

const prenom = ref("");
const nom = ref("");
const email = ref("");
const message = ref("");
const messageSent = ref(false);
const isLoading = ref(false);

useEnterAnimation(el, () => {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  gsap.set([titleEl.value, emailEl.value], { opacity: 0, x: -50 });
  gsap.set([formCard.value], { opacity: 0, x: 50 });
  gsap.set(footerLeft.value, { opacity: 0, y: 20 });

  tl.to(titleEl.value, { opacity: 1, x: 0, duration: 0.8 })
    .to(emailEl.value, { opacity: 1, x: 0, duration: 0.7 }, "-=0.5")
    .to(formCard.value, { opacity: 1, x: 0, duration: 0.8 }, "-=0.6")
    .to(footerLeft.value, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4");

  // Micro-interaction sur le bouton d'envoi
  if (submitBtn.value) {
    submitBtn.value.addEventListener("mouseenter", () => {
      gsap.to(submitBtn.value, { scale: 1.02, duration: 0.25, ease: "power2.out" });
    });
    submitBtn.value.addEventListener("mouseleave", () => {
      gsap.to(submitBtn.value, { scale: 1, duration: 0.25, ease: "power2.out" });
    });
  }
});

const submitForm = async () => {
  const API_URL = import.meta.env.VITE_API_URL;

  if (!API_URL) {
    alert("Erreur : L'URL de l'API n'est pas définie.");
    return;
  }

  isLoading.value = true;

  try {
    const requestData = {
      prenom: prenom.value,
      nom: nom.value,
      email: email.value,
      message: message.value,
    };

    const response = await fetch(`${API_URL}/send-email`, {
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

    messageSent.value = true;

    prenom.value = "";
    nom.value = "";
    email.value = "";
    message.value = "";
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email :", error);
  } finally {
    isLoading.value = false;
  }
};
</script>
