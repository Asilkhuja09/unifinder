import type { ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";
import worldNight from "@/assets/world-night.asset.json";
import { AuthDrawer } from "@/components/unifinder/AuthDrawer";
import { ConstellationFX } from "@/components/unifinder/ConstellationFX";
import { Footer } from "@/components/unifinder/Footer";
import { LiveRefreshOverlay } from "@/components/unifinder/LiveRefreshOverlay";
import { Navbar } from "@/components/unifinder/Navbar";
import { WelcomeOverlay } from "@/components/unifinder/WelcomeOverlay";
import { AuthProvider, useAuth } from "@/lib/auth";
import { FavoritesProvider } from "@/lib/favorites";
import { I18nProvider } from "@/lib/i18n";

function Shell({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const { welcoming, dismissWelcome, user } = useAuth();
  return (
    <div id="top" className="relative min-h-screen overflow-x-hidden">
      <div
        aria-hidden
        className="fixed inset-0 -z-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${worldNight.url})` }}
      />
      <div aria-hidden className="fixed inset-0 -z-10 bg-background/[0.82]" />
      <div aria-hidden className="fixed inset-0 -z-10 bg-black/[0.18]" />
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <ConstellationFX />
      </div>

      <Navbar onStart={() => void navigate({ to: "/assessment" })} />
      <main>{children}</main>
      <Footer />
      <AuthDrawer />
      <LiveRefreshOverlay />
      {welcoming && (
        <WelcomeOverlay
          name={
            (user?.user_metadata?.["full_name"] as string | undefined)?.split(" ")[0] ??
            user?.email?.split("@")[0] ??
            ""
          }
          onDone={dismissWelcome}
        />
      )}
    </div>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <I18nProvider>
      <AuthProvider>
        <FavoritesProvider>
          <Shell>{children}</Shell>
        </FavoritesProvider>
      </AuthProvider>
    </I18nProvider>
  );
}