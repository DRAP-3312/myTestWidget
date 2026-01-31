import { storeToRefs } from "pinia";
import { useConfigWidgetStore } from "../stores/configWidget.store";

export interface WidgetConfig {
  socketUrl: string;
  idAgent: string;
  apiKey: string;
  nameSpace: string;
  gaTrackingId: string;
  instanceName: string;
}

export function useWidgetConfig() {
  const store = useConfigWidgetStore();
  const { widgetConfig, showModal } = storeToRefs(store);

  return {
    widgetConfig,
    showModal,
    saveConfig: store.saveConfig,
    openConfigModal: store.openConfigModal,
    closeConfigModal: store.closeConfigModal,
    clearConfig: store.clearConfig,
  };
}
