import { Instagram, Mail, Phone } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-border bg-background/70 backdrop-blur-xl">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2">
        <div>
          <h3 className="font-display text-2xl text-gilded">UniFinder Global</h3>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">{t("heroSubtitle")}</p>
        </div>
        <div className="space-y-3 text-sm">
          <p className="text-xs uppercase tracking-[0.3em] text-primary/80">{t("contact")}</p>
          <a
            href="mailto:asilxojaakromxojayev1@gmail.com"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary"
          >
            <Mail className="size-4" /> asilxojaakromxojayev1@gmail.com
          </a>
          <a
            href="https://instagram.com/as1l_khuja"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary"
          >
            <Instagram className="size-4" /> @as1l_khuja
          </a>
          <a
            href="tel:+998948331802"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary"
          >
            <Phone className="size-4" /> +998 94 833 18 02
          </a>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} UniFinder Global — Private Network
      </div>
    </footer>
  );
}