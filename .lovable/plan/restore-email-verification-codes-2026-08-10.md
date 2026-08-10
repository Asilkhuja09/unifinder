# Restore email verification codes

## Confirmed diagnosis

- The app correctly requests an email OTP and verifies the six-digit code.
- The hosted backend is healthy.
- No sender domain or managed email setup is configured for this project.
- No recent email delivery event or OTP request appears in the available logs.
- Connecting Resend alone does not configure the authentication system to send verification codes through it.

## Plan

1. Set up a sender domain owned by the project owner through the built-in email setup.
2. Add the project's authentication email templates and sending hook so signup, magic-link, recovery, and verification emails use that sender configuration.
3. Confirm the sender domain reaches an active state; if DNS is pending, keep the implementation ready and note that sending starts after verification.
4. Trigger one real code request from the login drawer and inspect the auth and delivery logs.
5. If that recipient is still blocked, check its suppression status and surface the exact provider or rate-limit reason instead of changing the UI blindly.

## Technical notes

- Keep the current browser auth call; no API key belongs in client code.
- Use Lovable's managed authentication email path rather than wiring the Resend connector directly into the OTP button.
- No database migration or email queue is needed.