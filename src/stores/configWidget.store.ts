import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useLocalStorage } from "@vueuse/core";
import type { WidgetConfig } from "../interfaces/chat-widget.interfaces";

const STORAGE_KEY = "vue-chat-widget-config";

export const useConfigWidgetStore = defineStore("config-widget", () => {
  const widgetConfig = useLocalStorage<WidgetConfig | null>(STORAGE_KEY, null, {
    serializer: {
      read: (v) => (v ? JSON.parse(v) : null),
      write: (v) => JSON.stringify(v),
    },
  });

  const objectLiteral = useLocalStorage<string>("object-literal", "");

  const modalOpen = ref(false);

  const showModal = computed(
    () => widgetConfig.value === null || modalOpen.value,
  );
  const hasConfig = computed(() => widgetConfig.value !== null);

  function saveConfig(config: WidgetConfig, objectLit: string) {
    widgetConfig.value = config;
    objectLiteral.value = objectLit;
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
    objectLiteral,
  };
});
