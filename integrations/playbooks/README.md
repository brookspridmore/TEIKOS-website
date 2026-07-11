# TEIKOS integration playbooks

These files are **step-by-step guides** for connecting TEIKOS to voice and automation tools. The same text is shown inside the TEIKOS app under **Docs** (Vapi, Retell, n8n, Webhook / HTTP), so you can follow along in the product or read them here in Git.

## What is in this folder

| File | Who it is for |
|------|----------------|
| `vapi-playbook.md` | [Vapi](https://docs.vapi.ai/quickstart/introduction) — Server URL + tools + what Vapi sends and what comes back |
| `retell-playbook.md` | [Retell](https://www.retellai.com/glossary/api-integration) — Custom function URL + body shape + signature |
| `n8n-playbook.md` | [n8n](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/) — HTTP Request node fields and example JSON bodies |
| `webhook-and-http-playbook.md` | Any app that can POST JSON (Zapier, Make, your own server) — same request/response as n8n, two URL options |
| `vapi-tools-happy-path.json` | Ready-to-copy OpenAI-style **tool definitions** for Vapi (function names and parameters) |
| `system-prompt-happy-path.md` | Short scheduling instructions you can paste into your assistant |
| `curl-examples.sh` | Minimal `curl` lines for quick tests |

## URL pattern (all integrations)

Every integration uses your **Integration Public ID** in the path and your **secret** for auth (except Retell, which signs the body automatically).

```
POST https://YOUR_PROJECT.supabase.co/functions/v1/tool-router/tool/{provider}/{integration_public_id}
```

Replace `{provider}` with: `vapi`, `retell`, `webhook`, or `http`.

In the live app **Docs → Overview**, TEIKOS fills in your real project URL automatically.
