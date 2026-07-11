import vapiPlaybook from "../../integrations/playbooks/vapi-playbook.md?raw";
import retellPlaybook from "../../integrations/playbooks/retell-playbook.md?raw";
import n8nPlaybook from "../../integrations/playbooks/n8n-playbook.md?raw";
import webhookHttpPlaybook from "../../integrations/playbooks/webhook-and-http-playbook.md?raw";

export const integrationPlaybooks = {
  vapi: vapiPlaybook,
  retell: retellPlaybook,
  n8n: n8nPlaybook,
  webhookHttp: webhookHttpPlaybook,
} as const;

export type IntegrationPlaybookKey = keyof typeof integrationPlaybooks;

/** Swap placeholder host with the documented tool-router base URL pattern. */
export function personalizePlaybookMarkdown(markdown: string, toolRouterBase: string): string {
  return markdown.replace(
    /https:\/\/YOUR_PROJECT\.supabase\.co\/functions\/v1\/tool-router\/tool/g,
    toolRouterBase,
  );
}
