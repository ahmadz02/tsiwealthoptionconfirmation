# Phase 6 - Registration Confirmation + Send Closed PDF to AD

This phase adds two improvements to Phase 5:

1. New-user registration now requires **Password** and **Confirm Password** to match before Supabase sign-up is called.
2. Every **CLOSED** confirmation displays an AD email button in the adviser dashboard:
   - first successful send: **Send to AD**
   - after a successful send is recorded in the audit trail: **Resend to AD**

## What to replace

Replace these deployed web files:
- `login.html`
- `index.html`

`confirmation.html` and `supabase-config.js` are unchanged but included in the package.

## Supabase Edge Function update

Open the existing Edge Function named:

`send-confirmation-email`

Replace its existing `index.ts` with the Phase 6 version and redeploy it.

The same Edge Function now supports two modes:
- client confirmation-link email
- closed PDF email to AD

## Add one new Edge Function secret

In Supabase > Edge Functions > Secrets, add:

`AD_EMAIL`

Set its value to the Administration Department email address that should receive the final signed PDF, for example:

`admin@yourdomain.com`

Keep your existing secrets unchanged:
- `RESEND_API_KEY`
- `EMAIL_FROM`
- `APP_BASE_URL`
- `EMAIL_REPLY_TO` (optional)

## Database / SQL

No new SQL migration is required.

The app uses the existing `confirmation_audit_events` table. A successful AD send is stored as an existing `EMAIL_SENT` event with:

`metadata.purpose = AD_CLOSED_PDF`

That audit record is what changes the dashboard button from **Send to AD** to **Resend to AD**.

## Test

1. Register a test user with two different passwords. Registration must be stopped with a password-mismatch message.
2. Register with matching passwords. Registration should work as before.
3. Open a CLOSED confirmation in the dashboard. The button should say **Send to AD**.
4. Click the button. The Edge Function generates/sends the final PDF attachment to `AD_EMAIL`.
5. After a successful send, the dashboard refreshes and the button should say **Resend to AD**.
6. Click it again to verify a second PDF email can be sent.
