# n8n + TEIKOS playbook

This guide is for people using **n8n** (a workflow tool with boxes connected by lines) to call TEIKOS. You will add an **HTTP Request** node that sends JSON to TEIKOS.

**n8n Webhook node docs (for receiving webhooks later):** [n8n Webhook node](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/)

---

## Words you need first

- **Workflow** — A saved diagram in n8n. It runs when you click “Execute workflow” or when a trigger fires.
- **HTTP Request node** — A box in n8n that can **POST** data to a URL, like submitting a form to a website.
- **Integration Public ID** — From TEIKOS; goes in the **URL**. Not secret.
- **Secret** — From TEIKOS; goes in a **header** so TEIKOS knows the request is yours.

---

## Step 1 — Create the integration inside TEIKOS

1. TEIKOS → **Integrations** → **Autoprovision**.
2. Choose **n8n** (or **Webhook** — both use the same JSON body shape; see the Webhook / HTTP playbook for the tiny URL difference).
3. **Provision** and copy **Integration Public ID** and **Secret**.

---

## Step 2 — Build the URL for the HTTP Request node

Use the **webhook** provider segment in the path (this is what TEIKOS expects for n8n-style calls).

**Pattern:**

```
https://YOUR_PROJECT.supabase.co/functions/v1/tool-router/tool/webhook/YOUR_INTEGRATION_PUBLIC_ID
```

Paste that into the HTTP Request node field usually labeled **URL**.

Set **Method** to **POST**.

---

## Step 3 — Headers (two lines)

Add these **HTTP headers** on the same node:

1. **First header row:** Name = `Authorization`. Value = the word `Bearer`, a single space, then your **Secret** pasted right after (no quotation marks).
2. **Second header row:** Name = `Content-Type`. Value = `application/json` (exactly that spelling).

The Secret is the long password-like string from TEIKOS — **never** put it in the URL.

---

## Step 4 — Body: how TEIKOS wants the JSON

The body is always a JSON object with:

- **`tool_name`** — Which TEIKOS tool to run (exact spelling, like `availability_check`)
- **`args`** — A nested object with that tool’s inputs
- **`tool_call_id`** — Optional but useful: any string so you can match responses in logs (example: `n8n-step-1`)

**Smallest valid shape:**

```json
{
  "tool_name": "business_facts_get",
  "tool_call_id": "n8n-1",
  "args": {
    "include_facts": true
  }
}
```

---

## Step 5 — Example bodies you can copy

**Check open times**

```json
{
  "tool_name": "availability_check",
  "tool_call_id": "n8n-2",
  "args": {
    "service_id": "00000000-0000-0000-0000-000000000000",
    "range_start_date": "2026-04-07",
    "range_end_date": "2026-04-11"
  }
}
```

Replace `service_id` with a real value from **`business_facts_get`**.

**Hold a slot** (after you have a `slot_id` from availability)

```json
{
  "tool_name": "appointment_hold",
  "tool_call_id": "n8n-3",
  "args": {
    "service_id": "00000000-0000-0000-0000-000000000000",
    "slot_id": "t1.paste-exact-slot-id-from-teikos",
    "caller_phone": "+15551234567"
  }
}
```

**Confirm the hold**

```json
{
  "tool_name": "appointment_confirm",
  "tool_call_id": "n8n-4",
  "args": {
    "hold_token": "paste-hold-token-from-previous-step"
  }
}
```

In n8n, you normally replace the pasted values with **expressions** that pull from earlier nodes (for example `{{ $json.data.hold_token }}` after you parse JSON — exact expression depends on your workflow).

---

## Step 6 — What TEIKOS sends **back** to n8n

The HTTP response body looks like:

```json
{
  "ok": true,
  "data": [
    {
      "name": "availability_check",
      "toolCallId": "n8n-2",
      "result": "{\"ok\":true,\"data\":{\"timezone\":\"America/Chicago\",\"windows\":[...]},\"error\":null,\"meta\":{...}}"
    }
  ]
}
```

**Important:** `data[0].result` is a **string** that contains JSON. Your next n8n step should **parse JSON** on that string to read:

- Inner **`ok`**
- Inner **`data`** (windows, hold_token, speakable_time, appointment_id, …)
- Inner **`error`** when something failed

---

## Step 7 — Picture of the data flow

1. Your workflow builds one JSON body with **`tool_name`** + **`args`**.
2. TEIKOS runs the tool and wraps the answer in **`data[].result`** (as a string).
3. You parse that string to get the real **`data.windows`**, **`slot_id`**, **`speakable_time`**, etc.

---

## If something fails

- **401** — Wrong **Bearer** secret or missing header.
- **400** — Missing **`tool_name`** in the body.
- **404** — Wrong **Integration Public ID** in the URL.

Full list: TEIKOS **Docs → Troubleshooting**.

---

## Receiving calls *from* TEIKOS into n8n (future / advanced)

Today, appointment events live in TEIKOS’s database. A common pattern later is: n8n **Webhook trigger** node exposes a URL → TEIKOS (or another service) POSTs events there. That is separate from this playbook, which is about **n8n calling TEIKOS**. The official n8n Webhook node documentation is linked at the top.
