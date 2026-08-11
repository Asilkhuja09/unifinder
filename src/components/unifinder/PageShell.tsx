import type { ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";
import worldNight from "@/assets/world-night.asset.json";
import { AuthDrawer } from "@/components/unifinder/AuthDrawer";
import { ConstellationFX } from "@/components/unifinder/ConstellationFX";
import { Footer } from "@/components/unifinder/Footer";
import { LiveRefreshOverlay } from "@/components/unifinder/LiveRefreshOverlay";
import { Navbar } from "@/components/unifinder/Navbar";
import { AuthProvider } from "@/lib/auth";
import { I18nProvider } from "@/lib/i18n";

function Shell({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
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
    </div>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <I18nProvider>
      <AuthProvider>
        <Shell>{children}</Shell>
      </AuthProvider>
    </I18nProvider>
  );
}