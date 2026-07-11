# Custom HTTP / Webhook + TEIKOS playbook

This guide is for **any program** that can send an HTTP **POST** with JSON: your own server, Zapier, Make, a script, or a test tool. TEIKOS treats **`webhook`** and **`http`** the same way — only the **word in the URL** changes.

---

## Words you need first

- **POST** — A way to send data to a URL (like submitting a form).
- **JSON** — Text that looks like `{ "key": "value" }`. TEIKOS speaks JSON.
- **Integration Public ID** — From TEIKOS; part of the **URL**. Safe to embed in config files that are not public.
- **Secret** — Password-like; goes in a **header**, never in the URL query string if you can avoid it.

---

## Step 1 — Create the integration inside TEIKOS

1. TEIKOS → **Integrations** → **Autoprovision**.
2. Choose **Webhook** or **HTTP** (either is fine for this guide).
3. **Provision** → copy **Integration Public ID** and **Secret**.

---

## Step 2 — Pick your URL (webhook vs http)

Both URLs work the same. Swap only the **provider** segment:

**Option A — `webhook`**

```
https://YOUR_PROJECT.supabase.co/functions/v1/tool-router/tool/webhook/YOUR_INTEGRATION_PUBLIC_ID
```

**Option B — `http`**

```
https://YOUR_PROJECT.supabase.co/functions/v1/tool-router/tool/http/YOUR_INTEGRATION_PUBLIC_ID
```

Use **HTTPS** in production.

---

## Step 3 — Authentication (pick one)

**Option A — Bearer token (easiest to test)**

Header:

- `Authorization: Bearer YOUR_SECRET`

**Option B — HMAC header**

If your integration is set to **HMAC** mode in TEIKOS, compute **HMAC-SHA256** of the **raw request body bytes** using your secret, send hex (lowercase) in:

- `x-teikos-signature: <hex digest>`

Most users start with **Bearer** until they need HMAC.

---

## Step 4 — Request body (always this shape)

```json
{
  "tool_name": "the_tool_name",
  "tool_call_id": "optional-correlation-id",
  "args": { }
}
```

- **`tool_name`** — Exact TEIKOS tool name (`availability_check`, `appointment_hold`, …).
- **`args`** — Object with parameters for that tool (see **Tools Reference** in TEIKOS Docs).
- **`tool_call_id`** — Optional string returned in the response so you can match request/response in logs.

You may also put parameters under **`arguments`** instead of **`args`** — TEIKOS accepts both.

---

## Step 5 — One full example (hold a slot)

```json
{
  "tool_name": "appointment_hold",
  "tool_call_id": "my-server-uuid-123",
  "args": {
    "service_id": "00000000-0000-0000-0000-000000000000",
    "slot_id": "t1.paste-from-availability_check",
    "caller_phone": "+15551234567"
  }
}
```

Send with header `Content-Type: application/json`.

---

## Step 6 — Response body (outer wrapper)

TEIKOS responds with:

```json
{
  "ok": true,
  "data": [
    {
      "name": "appointment_hold",
      "toolCallId": "my-server-uuid-123",
      "result": "{\"ok\":true,\"data\":{\"hold_token\":\"...\",\"timezone\":\"...\",\"speakable_time\":\"...\",\"speakable_end\":\"...\"},\"error\":null,\"meta\":{...}}"
    }
  ]
}
```

**What to do in code:**

1. Read **`response.ok`** at the HTTP level (status 200).
2. Parse the outer JSON.
3. Take **`data[0].result`** (a string) and **`JSON.parse`** it again.
4. Inside that inner object, read **`ok`**, **`data`**, **`error`**.

That **inner** object is the same “envelope” shape Retell receives directly and Vapi returns inside `results[i].result`.

---

## Step 7 — Quick test with curl

A script with examples lives in this folder: `curl-examples.sh`.

Minimal one-liner pattern:

```bash
curl -sS -X POST "https://YOUR_PROJECT.supabase.co/functions/v1/tool-router/tool/webhook/YOUR_INTEGRATION_PUBLIC_ID" \
  -H "Authorization: Bearer YOUR_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"tool_name":"business_facts_get","args":{"include_facts":true}}'
```

---

## If something fails

- **401** — Secret wrong or HMAC mismatch.
- **400** — No **`tool_name`** in body.
- **404** — Public ID in URL does not match any integration.

See TEIKOS **Docs → Troubleshooting**.
