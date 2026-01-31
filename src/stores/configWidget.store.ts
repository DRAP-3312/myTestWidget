import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useLocalStorage } from "@vueuse/core";
import type { WidgetConfig } from "../composables/useWidgetConfig";

const STORAGE_KEY = "vue-chat-widget-config";

export const useConfigWidgetStore = defineStore("config-widget", () => {
  const widgetConfig = useLocalStorage<WidgetConfig | null>(STORAGE_KEY, null);
  const modalOpen = ref(false);

  const showModal = computed(
    () => widgetConfig.value === null || modalOpen.value,
  );
  const hasConfig = computed(() => widgetConfig.value !== null);

  function saveConfig(config: WidgetConfig) {
    widgetConfig.value = config;
    modalOpen.value = false;
  }

  function openConfigModal() {
    modalOpen.value = true;
  }

  function closeConfigModal() {
    modalOpen.value = false;
  }

  function clearConfig() {
    widgetConfig.value = null;
    modalOpen.value = false;
  }

  return {
    widgetConfig,
    showModal,
    hasConfig,
    saveConfig,
    openConfigModal,
    closeConfigModal,
    clearConfig,
  };
});
