<template>
  <div class="fixed bottom-20 right-5 z-10 md:bottom-5"> 
    <div
      v-if="!isChatOpen"
      class="w-16 h-16 bg-black rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform duration-300"
      @click="toggleChat"
    >
      <font-awesome-icon :icon="['fab', 'bots']" class="text-white text-3xl" />
    </div>

    <div
      v-if="isChatOpen"
      class="w-full sm:w-96 md:w-96 lg:w-[400px] h-[32rem] bg-gray-100 border border-gray-300 rounded-2xl shadow-xl flex flex-col"
    >
      <div class="bg-black text-gray-100 p-4 flex items-center justify-between rounded-t-2xl">
        <h3 class="text-lg font-bold">Chatbot</h3>
        <button @click="toggleChat" class="text-2xl font-bold text-gray-100 cursor-pointer">×</button>
      </div>

      <div class="flex-grow overflow-y-auto p-4 space-y-4">
        <div
          v-for="(message, index) in messages"
          :key="index"
          :class="[
            'w-fit max-w-[80%] p-3 rounded-lg',
            message.sender === 'bot'
              ? 'bg-gray-300 text-black self-start'
              : 'bg-black text-white self-end'
          ]"
          v-html="message.text" 
        >
        </div>
      </div>

      <div class="p-4 bg-white border-t border-gray-300 rounded-b-2xl">
        <h4 class="text-black font-bold mb-2">Mots-clés :</h4>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="(keyword, index) in keywords"
            :key="index"
            @click="selectKeyword(keyword)"
            class="px-3 py-1 bg-black text-white rounded-lg hover:opacity-90 transition"
          >
            {{ keyword.label }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isChatOpen: false,
      messages: [
        {
          text: "Bonjour ! Je suis votre assistant virtuel. Cliquez sur un mot-clé ci-dessous ou écrivez votre message.",
          sender: "bot",
        },
      ],
      userInput: "",
      keywords: [
        { label: "Projets", response: "J'ai ajouté seulement deux projets sur ce portfolio car il y a des projets qui ne sont pas encore finalisés. Je mettrai cette section à jour au fur et à mesure !" },
        { label: "Compétences", response: "Je maîtrise Vue.js, JavaScript, HTML, CSS et bien plus encore." },
        {
          label: "CV",
          response: 'Téléchargez mon CV ici : <a href="https://drive.google.com/file/d/1jbPXZD6-mMvPCqerhvApvyMFWUY1alRb/view?usp=drive_link" target="_blank" class="text-blue-500 hover:underline">Lien vers le CV</a>.'
        },
        {
          label: "Email",
          response: 'Vous pouvez me contacter par email ici : <a href="mailto:maregaerwan@gmail.com" class="text-blue-500 hover:underline">maregaerwan@gmail.com</a>.'
        },
      ],
    };
  },
  methods: {
    toggleChat() {
      this.isChatOpen = !this.isChatOpen;
    },
    sendMessage() {
      if (this.userInput.trim() === "") return;

      this.messages.push({ text: this.userInput, sender: "user" });

      const response = this.getBotResponse(this.userInput);
      this.messages.push({ text: response, sender: "bot" });

      this.userInput = "";

      this.$nextTick(() => {
        const chatContainer = this.$el.querySelector(".flex-grow");
        chatContainer.scrollTop = chatContainer.scrollHeight;
      });
    },
    selectKeyword(keyword) {
      this.messages.push({ text: keyword.label, sender: "user" });

      this.messages.push({ text: keyword.response, sender: "bot" });

      this.$nextTick(() => {
        const chatContainer = this.$el.querySelector(".flex-grow");
        chatContainer.scrollTop = chatContainer.scrollHeight;
      });
    },
  },
};
</script>

<style>
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-thumb {
  background: #aaa;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #888;
}
</style>
