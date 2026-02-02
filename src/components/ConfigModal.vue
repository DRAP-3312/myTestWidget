<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { WidgetConfig } from "../interfaces/chat-widget.interfaces";
import {
  parseWidgetCodeUtil,
  placeholderExample,
} from "../utils/parseConfigWidget.util";
import { useConfigWidgetStore } from "../stores/configWidget.store";
import { storeToRefs } from "pinia";

const props = defineProps<{
  isDark: boolean;
  hasExistingConfig?: boolean;
}>();

const emit = defineEmits<{
  (e: "apply", config: WidgetConfig, obj: string): void;
  (e: "close"): void;
}>();

const widgetStore = useConfigWidgetStore();
const { objectLiteral } = storeToRefs(widgetStore);
const widgetCode = ref("");
const errorMessage = ref("");
const isSuccess = ref(false);
const isProcessing = ref(false);

const applyConfiguration = async () => {
  errorMessage.value = "";
  isProcessing.value = true;

  await new Promise((resolve) => setTimeout(resolve, 500));

  if (!widgetCode.value.trim()) {
    errorMessage.value = "Por favor, pega el código del widget";
    isProcessing.value = false;
    return;
  }

  const config = parseWidgetCodeUtil(widgetCode.value);

  if (!config) {
    errorMessage.value =
      "No se pudo procesar el código. Verifica que esté completo y sea válido.";
    isProcessing.value = false;
    return;
  }

  isSuccess.value = true;
  isProcessing.value = false;

  await new Promise((resolve) => setTimeout(resolve, 1000));

  emit("apply", config, widgetCode.value);
};

const handleBackdropClick = () => {
  if (props.hasExistingConfig) {
    emit("close");
  }
};

onMounted(() => {
  if (objectLiteral) {
    widgetCode.value = objectLiteral.value;
  }
});
</script>

<template>
  <div
    @click="handleBackdropClick"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
  >
    <div
      @click.stop
      :class="[
        'w-full max-w-2xl mx-4 rounded-2xl shadow-2xl p-8 animate-slide-up relative',
        isDark ? 'bg-gray-800' : 'bg-white',
      ]"
    >
      <!-- Botón de cerrar (solo si hay configuración existente) -->
      <button
        v-if="hasExistingConfig"
        @click="emit('close')"
        :class="[
          'absolute top-4 right-4 p-2 rounded-full transition-all hover:scale-110',
          isDark
            ? 'hover:bg-gray-700 text-gray-400 hover:text-white'
            : 'hover:bg-gray-200 text-gray-600 hover:text-gray-900',
        ]"
        title="Cerrar"
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
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <div v-if="isSuccess" class="text-center py-8">
        <div class="mb-6 flex justify-center">
          <svg
            class="w-20 h-20 text-green-500 animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-green-500 mb-2">
          ¡Configuración válida!
        </h3>
        <p class="opacity-80">Inicializando widget...</p>
      </div>

      <div v-else>
        <h2 class="text-3xl font-bold mb-6 text-center">
          Configuración del Widget
        </h2>
        <p class="text-center mb-4 opacity-80">
          Pega el código completo del widget para inicializarlo
        </p>

        <form @submit.prevent="applyConfiguration" class="space-y-5">
          <div>
            <label class="block text-sm font-semibold mb-2">
              Código del Widget <span class="text-red-500">*</span>
            </label>
            <textarea
              v-model="widgetCode"
              rows="12"
              :placeholder="placeholderExample"
              :class="[
                'w-full px-4 py-3 rounded-lg border-2 transition-all font-mono text-sm resize-none',
                isDark
                  ? 'bg-gray-700 border-gray-600 focus:border-blue-500 text-white placeholder-gray-400'
                  : 'bg-gray-50 border-gray-300 focus:border-blue-500 text-gray-900 placeholder-gray-500',
              ]"
              required
            ></textarea>
          </div>

          <div
            v-if="errorMessage"
            class="px-4 py-3 rounded-lg bg-red-500/20 border-2 border-red-500 text-red-300 text-sm"
          >
            {{ errorMessage }}
          </div>

          <button
            type="submit"
            :disabled="isProcessing"
            :class="[
              'w-full py-4 rounded-lg font-bold text-lg transition-all shadow-lg flex items-center justify-center gap-2',
              isProcessing ? 'opacity-70 cursor-wait' : 'hover:scale-105',
              isDark
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-blue-500 hover:bg-blue-600 text-white',
            ]"
          >
            <svg
              v-if="isProcessing"
              class="animate-spin h-5 w-5"
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
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span>{{ isProcessing ? "Validando..." : "Cargar Widget" }}</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
