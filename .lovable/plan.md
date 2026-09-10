# UniFinder dashboard and university card redesign

## Build
- Create a reusable university card matching the supplied navy, gold, and emerald reference, used by assessment results, profile matches, saved universities, and the directory.
- Show a campus thumbnail for universities with known media and a consistent university-branded image fallback for every other record.
- Preserve match labels, favorite controls, campus details, official-site links, and Google Maps actions.
- Add acceptance, deadline, and funding blocks plus an alumni or achievement panel derived from existing university data.
- Replace the homepage stats panel with the animated “JONLI RAZVEDKA OQIMI” feed and also surface it on the profile dashboard.
- Tune layouts for narrow phones and desktop without changing matching, profile, authentication, or data behavior.
- Verify Google sign-in from the public `unifinder-global.lovable.app` link with a fresh signed-out session; the private editor-preview link will not be presented as a shareable login URL.

## Technical details
- Add focused shared presentation components instead of duplicating card/feed markup.
- Extend semantic design tokens and motion utilities in the global stylesheet; respect reduced-motion preferences.
- Reuse the existing university modal and map helper so current actions remain intact.
- Verify the home page, assessment result flow, university directory, profile page, and public-domain Google return flow at desktop and mobile widths.
