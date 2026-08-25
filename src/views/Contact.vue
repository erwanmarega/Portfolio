<template>
  <div
    ref="el"
    class="min-h-screen bg-[#f3f2ff] flex items-center justify-center px-6 py-20 relative overflow-hidden"
  >
    <div
      class="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-purple-200/40 blur-3xl pointer-events-none"
    />
    <div
      class="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-blue-200/40 blur-3xl pointer-events-none"
    />

    <div
      class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch w-full max-w-6xl relative z-10"
    >
      <div ref="leftCol" class="flex flex-col justify-center text-gray-900">
        <span
          class="inline-block w-fit px-3 py-1 rounded-full bg-white border border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-6"
        >
          Contact
        </span>

        <h1
          ref="titleEl"
          class="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight"
        >
          Parlons de votre
          <span
            class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
          >
            prochain projet
          </span>
        </h1>

        <p
          ref="subtitleEl"
          class="text-lg text-gray-600 leading-relaxed mb-10 max-w-md"
        >
          Vous avez une idée, une question ou un projet en tête ? Envoyez-moi un
          message, je vous réponds sous 24h.
        </p>

        <div ref="linksEl" class="space-y-5 mb-10">
          <a
            href="mailto:maregaerwan@gmail.com"
            class="group flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div
              class="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20"
            >
              <font-awesome-icon :icon="['fas', 'envelope']" class="w-5 h-5" />
            </div>
            <div>
              <p
                class="text-xs text-gray-500 font-medium uppercase tracking-wider"
              >
                Email
              </p>
              <p
                class="text-gray-900 font-semibold group-hover:text-blue-600 transition-colors"
              >
                maregaerwan@gmail.com
              </p>
            </div>
          </a>

          <a
            href="https://www.linkedin.com/in/erwan-marega/"
            target="_blank"
            rel="noopener noreferrer"
            class="group flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div
              class="w-12 h-12 rounded-xl bg-[#0a66c2] flex items-center justify-center text-white shadow-lg shadow-[#0a66c2]/20"
            >
              <font-awesome-icon
                :icon="['fab', 'linkedin-in']"
                class="w-5 h-5"
              />
            </div>
            <div>
              <p
                class="text-xs text-gray-500 font-medium uppercase tracking-wider"
              >
                LinkedIn
              </p>
              <p
                class="text-gray-900 font-semibold group-hover:text-[#0a66c2] transition-colors"
              >
                Erwan Marega
              </p>
            </div>
          </a>

          <a
            href="https://github.com/erwanmarega"
            target="_blank"
            rel="noopener noreferrer"
            class="group flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div
              class="w-12 h-12 rounded-xl bg-gray-900 flex items-center justify-center text-white shadow-lg shadow-gray-900/20"
            >
              <font-awesome-icon :icon="['fab', 'github']" class="w-5 h-5" />
            </div>
            <div>
              <p
                class="text-xs text-gray-500 font-medium uppercase tracking-wider"
              >
                GitHub
              </p>
              <p
                class="text-gray-900 font-semibold group-hover:text-gray-700 transition-colors"
              >
                @erwanmarega
              </p>
            </div>
          </a>
        </div>

        <p ref="footerLeft" class="text-sm text-gray-400 font-light">
          &copy; 2025 Erwan Marega | Tous droits réservés
        </p>
      </div>

      <!-- Colonne droite : formulaire -->
      <div
        ref="formCard"
        class="bg-white rounded-3xl border border-gray-100 shadow-[0_8px_40px_rgba(0,0,0,0.06)] p-8 lg:p-10 text-gray-900 flex flex-col justify-center"
      >
        <h2 ref="formTitle" class="text-3xl font-bold mb-2">
          Envoyez un message
        </h2>
        <p class="text-gray-500 mb-8">
          Remplissez le formulaire ci-dessous et je vous répondrai rapidement.
        </p>

        <form ref="formEl" @submit.prevent="submitForm" class="space-y-5">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="relative">
              <label
                for="prenom"
                class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5"
              >
                Prénom
              </label>
              <div class="relative">
                <font-awesome-icon
                  :icon="['fas', 'user']"
                  class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                />
                <input
                  id="prenom"
                  type="text"
                  v-model="prenom"
                  class="contact-input w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                  placeholder="Jean"
                  required
                />
              </div>
            </div>

            <div class="relative">
              <label
                for="nom"
                class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5"
              >
                Nom
              </label>
              <div class="relative">
                <font-awesome-icon
                  :icon="['fas', 'user']"
                  class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                />
                <input
                  id="nom"
                  type="text"
                  v-model="nom"
                  class="contact-input w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                  placeholder="Dupont"
                  required
                />
              </div>
            </div>
          </div>

          <div class="relative">
            <label
              for="email"
              class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5"
            >
              Email
            </label>
            <div class="relative">
              <font-awesome-icon
                :icon="['fas', 'envelope']"
                class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              />
              <input
                id="email"
                type="email"
                v-model="email"
                class="contact-input w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                placeholder="jean.dupont@exemple.fr"
                required
              />
            </div>
          </div>

          <div class="relative">
            <label
              for="message"
              class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5"
            >
              Message
            </label>
            <div class="relative">
              <font-awesome-icon
                :icon="['fas', 'comment']"
                class="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400"
              />
              <textarea
                id="message"
                v-model="message"
                class="contact-input w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none resize-none"
                placeholder="Décrivez votre projet..."
                rows="5"
                required
              ></textarea>
            </div>
          </div>

          <button
            ref="submitBtn"
            type="submit"
            :disabled="isLoading"
            class="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold rounded-xl text-sm py-3.5 text-center flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-0.5"
          >
            <span v-if="!isLoading">Envoyer le message</span>
            <font-awesome-icon
              v-if="!isLoading"
              :icon="['fas', 'paper-plane']"
              class="w-4 h-4"
            />
            <svg
              v-if="isLoading"
              class="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              ></path>
            </svg>
          </button>
        </form>
      </div>
    </div>

    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-4"
    >
      <div
        v-if="messageSent || messageError"
        class="fixed top-6 right-6 z-50 rounded-2xl border shadow-[0_8px_40px_rgba(0,0,0,0.12)] p-5 max-w-sm w-full"
        :class="
          messageError ? 'bg-white border-red-100' : 'bg-white border-gray-100'
        "
      >
        <div class="flex items-start gap-4">
          <div
            class="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
            :class="
              messageError
                ? 'bg-red-100 text-red-600'
                : 'bg-green-100 text-green-600'
            "
          >
            <font-awesome-icon
              :icon="[
                'fas',
                messageError ? 'circle-exclamation' : 'circle-check',
              ]"
              class="w-5 h-5"
            />
          </div>
          <div class="flex-1">
            <h3 class="text-base font-bold text-gray-900">
              {{ messageError ? "Erreur" : "Message envoyé !" }}
            </h3>
            <p class="text-sm text-gray-500 mt-1">
              {{
                messageError
                  ? errorMessage
                  : "Merci pour votre message. Je vous réponds dès que possible."
              }}
            </p>
          </div>
          <button
            @click="
              messageSent = false;
              messageError = false;
            "
            class="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Fermer"
          >
            <font-awesome-icon :icon="['fas', 'xmark']" class="w-5 h-5" />
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import gsap from "gsap";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faEnvelope,
  faUser,
  faComment,
  faPaperPlane,
  faCircleCheck,
  faCircleExclamation,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faLinkedinIn, faGithub } from "@fortawesome/free-brands-svg-icons";
import { useEnterAnimation } from "../composables/useEnterAnimation.js";

library.add(
  faEnvelope,
  faUser,
  faComment,
  faPaperPlane,
  faCircleCheck,
  faCircleExclamation,
  faXmark,
  faLinkedinIn,
  faGithub
);

const el = ref(null);
const leftCol = ref(null);
const titleEl = ref(null);
const subtitleEl = ref(null);
const emailEl = ref(null);
const linksEl = ref(null);
const formCard = ref(null);
const formTitle = ref(null);
const formEl = ref(null);
const submitBtn = ref(null);
const footerLeft = ref(null);

const prenom = ref("");
const nom = ref("");
const email = ref("");
const message = ref("");
const messageSent = ref(false);
const messageError = ref(false);
const errorMessage = ref("");
const isLoading = ref(false);

let autoCloseTimeout = null;

const showToast = (type, text, duration = 5000) => {
  if (type === "success") {
    messageSent.value = true;
    messageError.value = false;
  } else {
    messageSent.value = false;
    messageError.value = true;
    errorMessage.value = text;
  }

  if (autoCloseTimeout) clearTimeout(autoCloseTimeout);
  autoCloseTimeout = setTimeout(() => {
    messageSent.value = false;
    messageError.value = false;
  }, duration);
};

const validateClient = () => {
  if (
    !prenom.value.trim() ||
    !nom.value.trim() ||
    !email.value.trim() ||
    !message.value.trim()
  ) {
    showToast("error", "Veuillez remplir tous les champs.");
    return false;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value.trim())) {
    showToast("error", "Veuillez saisir une adresse email valide.");
    return false;
  }
  if (message.value.trim().length < 10) {
    showToast("error", "Votre message doit contenir au moins 10 caractères.");
    return false;
  }
  return true;
};

useEnterAnimation(el, () => {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  gsap.set([titleEl.value, subtitleEl.value, linksEl.value], {
    opacity: 0,
    x: -40,
  });
  gsap.set([formCard.value], { opacity: 0, x: 40 });
  gsap.set(footerLeft.value, { opacity: 0, y: 20 });

  tl.to(titleEl.value, { opacity: 1, x: 0, duration: 0.8 })
    .to(subtitleEl.value, { opacity: 1, x: 0, duration: 0.7 }, "-=0.55")
    .to(linksEl.value, { opacity: 1, x: 0, duration: 0.7 }, "-=0.55")
    .to(formCard.value, { opacity: 1, x: 0, duration: 0.8 }, "-=0.7")
    .to(footerLeft.value, { opacity: 1, y: 0, duration: 0.6 }, "-=0.5");

  // Micro-interaction sur le bouton d'envoi
  if (submitBtn.value) {
    submitBtn.value.addEventListener("mouseenter", () => {
      gsap.to(submitBtn.value, {
        scale: 1.01,
        duration: 0.25,
        ease: "power2.out",
      });
    });
    submitBtn.value.addEventListener("mouseleave", () => {
      gsap.to(submitBtn.value, {
        scale: 1,
        duration: 0.25,
        ease: "power2.out",
      });
    });
  }
});

const submitForm = async () => {
  if (!validateClient()) return;

  const API_URL = import.meta.env.VITE_API_URL;

  if (!API_URL) {
    showToast("error", "L'URL de l'API n'est pas définie.");
    return;
  }

  isLoading.value = true;

  try {
    const requestData = {
      prenom: prenom.value.trim(),
      nom: nom.value.trim(),
      email: email.value.trim(),
      message: message.value.trim(),
    };

    const response = await fetch(`${API_URL}/send-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
      credentials: "include",
    });

    let result = {};
    try {
      result = await response.json();
    } catch {
      result = { error: "Réponse serveur invalide." };
    }

    if (!response.ok) {
      throw new Error(result.error || `Erreur HTTP : ${response.status}`);
    }

    showToast(
      "success",
      "Merci pour votre message. Je vous réponds dès que possible."
    );

    prenom.value = "";
    nom.value = "";
    email.value = "";
    message.value = "";
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email :", error);
    showToast(
      "error",
      error.message || "Erreur lors de l'envoi. Veuillez réessayer plus tard."
    );
  } finally {
    isLoading.value = false;
  }
};

onUnmounted(() => {
  if (autoCloseTimeout) clearTimeout(autoCloseTimeout);
});
</script>

<style scoped>
.contact-input::placeholder {
  color: #9ca3af;
}
</style>
