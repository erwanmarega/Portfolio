<template>
  <div class="bg-gray-100 text-black min-h-screen p-6">
    <div class="pt-20">
      <section class="max-w-4xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-5xl font-extrabold text-gray-900 animate-fadeIn">
            Mes Parcours &amp; Connaissances
          </h2>
          <p class="mt-4 text-lg italic text-gray-600">
            Découvrez mon parcours académique et mes compétences acquises.
          </p>
        </div>
        <!-- Timeline container avec flèches entre chaque formation -->
        <div class="flex flex-col items-center">
          <template v-for="(item, index) in educationList" :key="index">
            <div
              class="edu-card p-8 rounded-[25px] bg-white w-full transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl border border-transparent hover:border-indigo-500 mb-4"
              :class="{ blur: focusedCardIndex !== null && focusedCardIndex !== index }"
              @mouseover="() => focusedCardIndex = index"
              @mouseleave="() => focusedCardIndex = null"
            >
              <h3 class="text-3xl font-bold text-indigo-600 mb-2">{{ item.title }}</h3>
              <p class="text-gray-700 text-lg">
                <span class="font-medium">{{ item.institution }}</span>
                <span class="mx-2">|</span>
                <span>{{ item.years }}</span>
              </p>
              <p class="mt-3 text-gray-600 leading-relaxed">
                {{ item.description }}
              </p>
            </div>
            <!-- Affichage de la flèche si ce n'est pas la dernière carte -->
            <div v-if="index !== educationList.length - 1" class="arrow-container flex justify-center items-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </template>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const educationList = ref([
{
            title: "Baccalauréat sciences et technologies de l'industrie et du développement durable",
            institution: "Lycée Pierre de Coubertin",
            years: "2020 - 2022",
            description:
              "Formation technologique axée sur l'innovation, l'ingénierie et le développement durable."
          },
          {
            title: "BUT Métiers du Multimédia et de l'Internet",
            institution: "Université Gustave Eiffel",
            years: "2022 - 2025",
            description:
              "Formation polyvalente en multimédia, web, communication et développement web."
          },
          {
            title: "Mastère Dev Manager Full Stack",
            institution: "Efrei",
            years: "2025 - 2027",
            description:
              "Formation de haut niveau aux compétences multiples maitrisant les technologies back End et front End."
          }
]);

const focusedCardIndex = ref(null);
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 1s ease-out;
}

.blur {
  filter: blur(5px);
  transition: filter 0.3s ease;
}
</style>