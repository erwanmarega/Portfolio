<template>
    <div class="bg-gray-100 text-black min-h-screen p-4">
      <div class="pt-20">
        <section class="max-w-4xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-5xl font-bold text-gray-900 animate-fadeIn">
              Mes Parcours &amp; Connaissances
            </h2>
            <p class="mt-4 text-lg italic text-gray-600">
              Découvrez mon parcours académique et mes compétences acquises.
            </p>
          </div>
  
          <div class="grid grid-cols-1 gap-8">
            <div
              v-for="(item, index) in educationList"
              :key="index"
              class="edu-card p-6 rounded-[25px] shadow-lg transition-transform duration-300 ease-in-out hover:shadow-2xl"
              :class="{ blur: focusedCardIndex !== null && focusedCardIndex !== index }"
              @mouseover="setFocusCard(index)"
              @mouseleave="resetFocusCard"
            >
              <h3 class="text-2xl font-semibold text-indigo-600">{{ item.title }}</h3>
              <p class="text-gray-700">{{ item.institution }} | {{ item.years }}</p>
              <p class="mt-2 text-gray-600">{{ item.description }}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "EducationPage",
    data() {
      return {
        educationList: [
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
        ],
        focusedCardIndex: null
      };
    },
    methods: {
      setFocusCard(index) {
        this.focusedCardIndex = index;
      },
      resetFocusCard() {
        this.focusedCardIndex = null;
      }
    }
  };
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