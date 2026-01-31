import type { WidgetConfig } from "../interfaces/chat-widget.interfaces";

export const placeholderExample = `<vue-chat-widget
  .socketUrl="&apos;https://ejemplo.com&apos;"
  idAgent="abc123def456"
  api_key="tu_api_key_aqui"
  nameSpace="/chat"
  .gaTrackingId="&apos;&apos;"
  instanceName="Mi Empresa"
></vue-chat-widget>`;

export const parseWidgetCodeUtil = (code: string): WidgetConfig | null => {
  try {
    const socketUrlMatch = code.match(/\.socketUrl=["'](.+?)["']/);
    const socketUrl = socketUrlMatch
      ? socketUrlMatch[1]?.replace(/'/g, "")
      : "";

    const idAgentMatch = code.match(/idAgent=["'](.+?)["']/);
    const idAgent = idAgentMatch ? idAgentMatch[1] : "";

    const apiKeyMatch = code.match(/api_key=["'](.+?)["']/);
    const apiKey = apiKeyMatch ? apiKeyMatch[1] : "";

    const nameSpaceMatch = code.match(/nameSpace=["'](.+?)["']/);
    const nameSpace = nameSpaceMatch ? nameSpaceMatch[1] : "";

    const gaTrackingIdMatch = code.match(/\.gaTrackingId=["'](.+?)["']/);
    const gaTrackingId = gaTrackingIdMatch
      ? gaTrackingIdMatch[1]?.replace(/'/g, "")
      : "";

    const instanceNameMatch = code.match(/instanceName=["'](.+?)["']/);
    const instanceName = instanceNameMatch ? instanceNameMatch[1] : "";

    // Validar que se extrajeron los campos obligatorios
    if (!socketUrl || !idAgent || !apiKey || !nameSpace || !instanceName) {
      return null;
    }

    return {
      socketUrl,
      idAgent,
      apiKey,
      nameSpace,
      gaTrackingId: gaTrackingId || "",
      instanceName,
    };
  } catch (error) {
    return null;
  }
};
