import { useEffect, useState } from "react";
import type { LangCode } from "@/lib/i18n";

/**
 * Text for the 404 and "this page didn't load" screens. They are rendered by the root route, outside
 * the page-level I18nProvider, so they read the language the visitor picked (`uf_lang`) themselves.
 * Static on purpose: an error page must not depend on the translation service.
 */
export type FallbackText = {
  notFoundTitle: string;
  notFoundBody: string;
  errorTitle: string;
  errorBody: string;
  goHome: string;
  tryAgain: string;
};

const FALLBACK_TEXT: Record<LangCode, FallbackText> = {
  en: {
    notFoundTitle: "Page not found",
    notFoundBody: "The page you're looking for doesn't exist or has been moved.",
    errorTitle: "This page didn't load",
    errorBody: "Something went wrong on our end. You can try refreshing or head back home.",
    goHome: "Go home",
    tryAgain: "Try again",
  },
  uz: {
    notFoundTitle: "Sahifa topilmadi",
    notFoundBody: "Siz izlayotgan sahifa mavjud emas yoki boshqa joyga ko'chirilgan.",
    errorTitle: "Sahifa yuklanmadi",
    errorBody: "Bizning tomonda xatolik yuz berdi. Sahifani yangilab ko'ring yoki bosh sahifaga qayting.",
    goHome: "Bosh sahifa",
    tryAgain: "Qayta urinish",
  },
  ru: {
    notFoundTitle: "Страница не найдена",
    notFoundBody: "Такой страницы не существует, либо она была перемещена.",
    errorTitle: "Страница не загрузилась",
    errorBody: "На нашей стороне произошла ошибка. Обновите страницу или вернитесь на главную.",
    goHome: "На главную",
    tryAgain: "Повторить",
  },
  zh: {
    notFoundTitle: "页面未找到",
    notFoundBody: "您访问的页面不存在，或已被移动。",
    errorTitle: "页面加载失败",
    errorBody: "我们这边出了点问题。您可以刷新页面，或返回首页。",
    goHome: "返回首页",
    tryAgain: "重试",
  },
  tr: {
    notFoundTitle: "Sayfa bulunamadı",
    notFoundBody: "Aradığınız sayfa mevcut değil veya taşınmış.",
    errorTitle: "Sayfa yüklenemedi",
    errorBody: "Bizim tarafımızda bir sorun oluştu. Sayfayı yenilemeyi deneyin veya ana sayfaya dönün.",
    goHome: "Ana sayfa",
    tryAgain: "Tekrar dene",
  },
  ar: {
    notFoundTitle: "الصفحة غير موجودة",
    notFoundBody: "الصفحة التي تبحث عنها غير موجودة أو تم نقلها.",
    errorTitle: "تعذّر تحميل الصفحة",
    errorBody: "حدث خطأ من جانبنا. يمكنك تحديث الصفحة أو العودة إلى الصفحة الرئيسية.",
    goHome: "الصفحة الرئيسية",
    tryAgain: "حاول مرة أخرى",
  },
  es: {
    notFoundTitle: "Página no encontrada",
    notFoundBody: "La página que buscas no existe o se ha movido.",
    errorTitle: "Esta página no se cargó",
    errorBody: "Algo salió mal por nuestra parte. Prueba a actualizar o vuelve al inicio.",
    goHome: "Ir al inicio",
    tryAgain: "Reintentar",
  },
  fr: {
    notFoundTitle: "Page introuvable",
    notFoundBody: "La page que vous cherchez n'existe pas ou a été déplacée.",
    errorTitle: "Cette page ne s'est pas chargée",
    errorBody: "Un problème est survenu de notre côté. Actualisez la page ou retournez à l'accueil.",
    goHome: "Retour à l'accueil",
    tryAgain: "Réessayer",
  },
  de: {
    notFoundTitle: "Seite nicht gefunden",
    notFoundBody: "Die gesuchte Seite existiert nicht oder wurde verschoben.",
    errorTitle: "Diese Seite wurde nicht geladen",
    errorBody: "Auf unserer Seite ist etwas schiefgelaufen. Laden Sie die Seite neu oder gehen Sie zurück zur Startseite.",
    goHome: "Zur Startseite",
    tryAgain: "Erneut versuchen",
  },
};

/** The fallback-page text in the visitor's saved language (English until the browser has loaded). */
export function useFallbackText(): { text: FallbackText; dir: "ltr" | "rtl" } {
  const [lang, setLang] = useState<LangCode>("en");
  useEffect(() => {
    try {
      const saved = localStorage.getItem("uf_lang");
      if (saved && saved in FALLBACK_TEXT) setLang(saved as LangCode);
    } catch {
      /* private mode – stay in English */
    }
  }, []);
  return { text: FALLBACK_TEXT[lang], dir: lang === "ar" ? "rtl" : "ltr" };
}
