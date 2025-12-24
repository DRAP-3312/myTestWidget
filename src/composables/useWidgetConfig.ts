import { ref, onMounted } from "vue";
import type { WidgetConfig } from "../components/ConfigModal.vue";

const STORAGE_KEY = "vue-chat-widget-config";

export function useWidgetConfig() {
  const widgetConfig = ref<WidgetConfig | null>(null);
  const showModal = ref(true);

  const loadConfig = () => {
    const savedConfig = localStorage.getItem(STORAGE_KEY);
    if (savedConfig) {
      try {
        widgetConfig.value = JSON.parse(savedConfig);
        showModal.value = false;
        return true;
      } catch (error) {
        console.error("Error al cargar la configuración guardada:", error);
        localStorage.removeItem(STORAGE_KEY);
        return false;
      }
    }
    return false;
  };

  const saveConfig = (config: WidgetConfig) => {
    widgetConfig.value = config;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    showModal.value = false;
  };

  const openConfigModal = () => {
    showModal.value = true;
  };

  const clearConfig = () => {
    widgetConfig.value = null;
    localStorage.removeItem(STORAGE_KEY);
    showModal.value = true;
  };

  onMounted(() => {
    loadConfig();
  });

  return {
    widgetConfig,
    showModal,
    saveConfig,
    openConfigModal,
    clearConfig,
  };
}
