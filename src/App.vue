<script setup lang="ts">
import { useTheme } from "./composables/useTheme";
import { useWidgetConfig } from "./composables/useWidgetConfig";
import ConfigModal from "./components/ConfigModal.vue";

const { isDark, toggleTheme } = useTheme();
const { widgetConfig, showModal, saveConfig, openConfigModal } =
  useWidgetConfig();
</script>

<template>
  <div
    :class="[
      'min-h-screen font-sans transition-colors duration-300',
      isDark
        ? 'bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-white'
        : 'bg-linear-to-br from-gray-50 via-gray-100 to-gray-200 text-gray-900',
    ]"
  >
    <ConfigModal v-if="showModal" :isDark="isDark" @apply="saveConfig" />

    <header
      :class="[
        'px-16 py-8 backdrop-blur-lg shadow-lg transition-colors duration-300',
        isDark ? 'bg-white/5' : 'bg-white/50 border-b border-gray-300',
        showModal ? 'pointer-events-none opacity-50' : '',
      ]"
    >
      <div class="flex items-center justify-between">
        <h1 class="text-3xl font-bold tracking-tight">
          INSTANCIA:
          {{ widgetConfig?.instanceName || "Entorno de pruebas" }}
        </h1>

        <div class="flex items-center gap-4">
          <button
            v-if="widgetConfig"
            @click="openConfigModal"
            :class="[
              'p-3 rounded-full transition-all duration-300 hover:scale-110',
              isDark
                ? 'bg-blue-500/20 hover:bg-blue-500/30 text-blue-300'
                : 'bg-blue-100 hover:bg-blue-200 text-blue-700',
            ]"
            title="Reconfigurar Widget"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>

          <button
            @click="toggleTheme"
            :class="[
              'p-3 rounded-full transition-all duration-300 hover:scale-110',
              isDark
                ? 'bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700',
            ]"
            aria-label="Toggle theme"
          >
            <svg
              v-if="isDark"
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>

            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>

    <main
      :class="[
        'flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-8 py-8',
        showModal ? 'pointer-events-none opacity-50' : '',
      ]"
    >
      <div class="text-center mb-12 animate-fade-in">
        <h2 class="text-5xl font-bold mb-4 drop-shadow-lg">Prueba tu Widget</h2>
        <p class="text-xl opacity-90 max-w-2xl mx-auto">
          Experimenta con diferentes configuraciones y visualiza los cambios al
          instante
        </p>
      </div>

      <div v-if="widgetConfig" class="w-full flex justify-center items-center">
        <vue-chat-widget
          :key="`${widgetConfig.socketUrl}-${widgetConfig.idAgent}`"
          :socketUrl="widgetConfig.socketUrl"
          :idAgent="widgetConfig.idAgent"
          :api_key="widgetConfig.apiKey"
          :nameSpace="widgetConfig.nameSpace"
          :gaTrackingId="widgetConfig.gaTrackingId"
          :instanceName="widgetConfig.instanceName"
        ></vue-chat-widget>
      </div>
    </main>
  </div>
</template>

<style>

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.8s ease-in;
}

.animate-slide-up {
  animation: slide-up 0.8s ease-out;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  header {
    padding: 1.5rem 2rem !important;
  }

  h1 {
    font-size: 1.5rem !important;
  }

  .text-5xl {
    font-size: 2rem !important;
  }

  .text-xl {
    font-size: 1.125rem !important;
  }

  .px-16 {
    padding-left: 2rem !important;
    padding-right: 2rem !important;
  }

  .text-3xl {
    font-size: 1.5rem !important;
  }

  .text-lg {
    font-size: 1rem !important;
  }
}
</style>
