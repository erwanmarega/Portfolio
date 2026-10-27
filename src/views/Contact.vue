<template>
  <section
    ref="el"
    aria-labelledby="contact-title"
    class="contact-section bg-white p-3 sm:p-6"
  >
    <div
      class="term-window rounded-2xl bg-white border border-gray-100 overflow-hidden flex flex-col"
      style="box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.04), 0 24px 80px rgba(0, 0, 0, 0.1)"
    >
      <div
        class="h-10 shrink-0 bg-gray-50/80 border-b border-gray-100 flex items-center gap-2 px-4"
      >
        <span class="w-3 h-3 rounded-full bg-[#ff5f57]" aria-hidden="true" />
        <span class="w-3 h-3 rounded-full bg-[#febc2e]" aria-hidden="true" />
        <span class="w-3 h-3 rounded-full bg-[#28c840]" aria-hidden="true" />
        <span class="ml-auto font-mono text-xs text-gray-400" aria-hidden="true">
          erwan@portfolio — contact
        </span>
      </div>

      <div
        ref="termEl"
        class="flex-1 px-5 py-8 sm:px-10 sm:py-12 lg:px-16 font-mono text-[13px] sm:text-sm leading-relaxed text-gray-500"
      >
        <div class="max-w-3xl space-y-6">
          <div class="term-line">
            <p class="prompt">
              <span class="text-emerald-500">erwan@portfolio</span><span class="text-gray-400">:~$ </span>
              <span class="text-gray-800">cat bienvenue.txt</span>
            </p>
            <h2
              id="contact-title"
              class="mt-2 text-base sm:text-lg font-bold text-gray-800"
            >
              Parlons de votre prochain projet.
            </h2>
            <p class="mt-1">
              Vous avez une idée, une question ou un projet en tête ? Je vous
              réponds sous 24h.
            </p>
          </div>

          <div class="term-line">
            <p class="prompt">
              <span class="text-emerald-500">erwan@portfolio</span><span class="text-gray-400">:~$ </span>
              <span class="text-gray-800">ls liens/</span>
            </p>
            <ul class="mt-2 space-y-1">
              <li class="link-row">
                <span class="link-key">email</span>
                <a href="mailto:maregaerwan@gmail.com" class="term-link">
                  maregaerwan@gmail.com
                </a>
              </li>
              <li class="link-row">
                <span class="link-key">linkedin</span>
                <a
                  href="https://www.linkedin.com/in/erwan-marega/"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="term-link"
                >
                  Erwan Marega
                </a>
              </li>
              <li class="link-row">
                <span class="link-key">github</span>
                <a
                  href="https://github.com/erwanmarega"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="term-link"
                >
                  @erwanmarega
                </a>
              </li>
            </ul>
          </div>

          <form novalidate @submit.prevent="submitForm" class="term-line">
            <p class="prompt">
              <span class="text-emerald-500">erwan@portfolio</span><span class="text-gray-400">:~$ </span>
              <span class="text-gray-800">./contact</span>
            </p>
            <p class="mt-2 mb-3 text-gray-400">
              # Remplissez les champs puis envoyez, je vous réponds sous 24h.
            </p>

            <div class="space-y-1">
              <div class="term-row">
                <label for="prenom" class="term-label">--prenom</label>
                <input
                  id="prenom"
                  name="prenom"
                  type="text"
                  v-model="prenom"
                  autocomplete="given-name"
                  placeholder="Votre prénom"
                  required
                  class="term-input"
                />
              </div>

              <div class="term-row">
                <label for="nom" class="term-label">--nom</label>
                <input
                  id="nom"
                  name="nom"
                  type="text"
                  v-model="nom"
                  autocomplete="family-name"
                  placeholder="Votre nom"
                  required
                  class="term-input"
                />
              </div>

              <div class="term-row">
                <label for="email" class="term-label">--email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  v-model="email"
                  autocomplete="email"
                  placeholder="vous@exemple.fr"
                  required
                  class="term-input"
                />
              </div>

              <div class="term-row">
                <label for="message" class="term-label">--message</label>
                <textarea
                  id="message"
                  name="message"
                  v-model="message"
                  rows="4"
                  placeholder="Décrivez votre projet…"
                  required
                  class="term-input resize-none"
                ></textarea>
              </div>
            </div>

            <button type="submit" :disabled="isLoading" class="term-submit">
              <span class="text-emerald-500" aria-hidden="true">❯</span>
              {{ isLoading ? "envoi…" : "Envoyer" }}
              <span aria-hidden="true">⏎</span>
            </button>

            <div
              role="status"
              aria-live="polite"
              class="min-h-[1.5rem] pt-2 break-words"
            >
              <p v-if="isLoading" class="text-gray-500">
                <span class="term-spinner" aria-hidden="true">⠋</span>
                envoi en cours…
              </p>
              <p v-else-if="messageError" class="text-red-500">
                ✗ {{ errorMessage }}
              </p>
              <p v-else-if="messageSent" class="text-emerald-500">
                ✓ message envoyé — je vous réponds vite
              </p>
            </div>
          </form>

          <div class="term-line">
            <p class="prompt" aria-hidden="true">
              <span class="text-emerald-500">erwan@portfolio</span><span class="text-gray-400">:~$ </span>
              <span class="term-cursor" />
            </p>
            <p class="mt-3 text-xs text-gray-400">
              # &copy; {{ year }} Erwan Marega — Tous droits réservés
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onUnmounted } from "vue";
import gsap from "gsap";
import { useEnterAnimation } from "../composables/useEnterAnimation.js";

const el = ref(null);
const termEl = ref(null);
const year = new Date().getFullYear();

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
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !termEl.value) return;

  gsap.fromTo(
    termEl.value.querySelectorAll(".term-line"),
    { opacity: 0, y: 8 },
    {
      opacity: 1,
      y: 0,
      duration: 0.4,
      stagger: 0.1,
      ease: "power2.out",
      clearProps: "opacity,transform",
    }
  );
});

const submitForm = async () => {
  if (!validateClient()) return;

  const API_URL = import.meta.env.VITE_API_URL;

  if (!API_URL) {
    showToast("error", "L'URL de l'API n'est pas définie.");
    return;
  }

  isLoading.value = true;
  messageSent.value = false;
  messageError.value = false;

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
      error instanceof TypeError || !error.message
        ? "Envoi impossible, vérifiez votre connexion et réessayez."
        : error.message
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
.term-window {
  min-height: calc(100vh - 1.5rem);
  min-height: calc(100svh - 1.5rem);
}
@media (min-width: 640px) {
  .term-window {
    min-height: calc(100vh - 3rem);
    min-height: calc(100svh - 3rem);
  }
}
.prompt {
  overflow-wrap: anywhere;
}

.link-row {
  display: flex;
  flex-wrap: wrap;
  column-gap: 1rem;
}
.link-key {
  width: 6rem;
  flex-shrink: 0;
}
.term-link {
  color: #059669;
  border-radius: 0.25rem;
  overflow-wrap: anywhere;
}
.term-link:hover,
.term-link:focus-visible {
  text-decoration: underline;
}
.term-link:focus-visible {
  outline: 2px solid #10b981;
  outline-offset: 2px;
}

.term-row {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}
.term-label {
  color: #6b7280;
  white-space: nowrap;
  padding-top: 0.5rem;
}
.term-input {
  width: 100%;
  min-width: 0;
  min-height: 2.5rem;
  padding: 0.5rem 0.625rem;
  background: transparent;
  border: 0;
  border-radius: 0.5rem;
  outline: none;
  font: inherit;
  color: #1f2937;
  caret-color: #10b981;
  transition: background-color 0.15s;
}
.term-input::placeholder {
  color: #9ca3af;
}
.term-input:focus-visible {
  background: rgba(16, 185, 129, 0.08);
  box-shadow: inset 0 -2px 0 #10b981;
}
@media (min-width: 640px) {
  .term-row {
    flex-direction: row;
    align-items: flex-start;
    gap: 0.75rem;
  }
  .term-label {
    width: 6rem;
    flex-shrink: 0;
  }
}
.term-submit {
  min-height: 2.5rem;
  padding: 0.5rem 0.75rem;
  margin: 0.75rem 0 0 -0.75rem;
  border-radius: 0.5rem;
  color: #1f2937;
  font: inherit;
  font-weight: 600;
  transition: background-color 0.15s;
}
.term-submit:hover:not(:disabled) {
  background: #f3f4f6;
}
.term-submit:focus-visible {
  outline: 2px solid #10b981;
  outline-offset: 2px;
}
.term-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.term-spinner {
  display: inline-block;
  animation: term-blink 1s steps(2, start) infinite;
}
.term-cursor {
  display: inline-block;
  width: 0.55em;
  height: 1.1em;
  vertical-align: text-bottom;
  background: #1f2937;
  animation: term-cursor 1.1s steps(1) infinite;
}
@keyframes term-blink {
  to {
    opacity: 0.2;
  }
}
@keyframes term-cursor {
  50% {
    opacity: 0;
  }
}
@media (prefers-reduced-motion: reduce) {
  .term-spinner,
  .term-cursor {
    animation: none;
  }
  .term-input,
  .term-submit {
    transition: none;
  }
}
</style>
