/**
 * Hand-written translations of the text on a university card and in its "Batafsil" (details) window.
 *
 * These strings are finite and known in advance (labels, study fields, countries, the checklist, the
 * sentences that explain a match), so they are translated here instead of by the AI translator. That
 * way they appear at once, cost nothing and keep working when the AI service is slow or unavailable.
 *
 * `tt()` in `src/lib/i18n.tsx` asks `staticTranslate()` first and only queues a string for the AI
 * translator when it is not found here. Each row is [English, then the eight languages in ORDER].
 * Add a row here when you add a new fixed string to the university screens.
 */

export const STATIC_LANGS = ["uz", "ru", "zh", "tr", "ar", "es", "fr", "de"] as const;
export type StaticLang = (typeof STATIC_LANGS)[number];

type Row = readonly [
  en: string,
  uz: string,
  ru: string,
  zh: string,
  tr: string,
  ar: string,
  es: string,
  fr: string,
  de: string,
];

/** Buttons, headings and labels in the details window and on the cards. */
const UI_ROWS: readonly Row[] = [
  ["Link copied", "Havola nusxalandi", "Ссылка скопирована", "链接已复制", "Bağlantı kopyalandı", "تم نسخ الرابط", "Enlace copiado", "Lien copié", "Link kopiert"],
  ["You can compare up to", "Solishtirish chegarasi:", "Лимит сравнения:", "最多可对比", "Karşılaştırma sınırı:", "الحد الأقصى للمقارنة:", "Límite de comparación:", "Limite de comparaison :", "Vergleichslimit:"],
  ["Added to compare", "Solishtirishga qo'shildi", "Добавлено к сравнению", "已加入对比", "Karşılaştırmaya eklendi", "أُضيفت إلى المقارنة", "Añadida a la comparación", "Ajoutée à la comparaison", "Zum Vergleich hinzugefügt"],
  ["Removed from compare", "Solishtirishdan olib tashlandi", "Удалено из сравнения", "已从对比中移除", "Karşılaştırmadan çıkarıldı", "أُزيلت من المقارنة", "Eliminada de la comparación", "Retirée de la comparaison", "Aus dem Vergleich entfernt"],
  ["Founded", "Tashkil etilgan", "Основан", "创立于", "Kuruluş", "تأسست", "Fundada", "Fondée", "Gegründet"],
  ["Close", "Yopish", "Закрыть", "关闭", "Kapat", "إغلاق", "Cerrar", "Fermer", "Schließen"],
  ["Saved", "Saqlandi", "Сохранено", "已保存", "Kaydedildi", "تم الحفظ", "Guardado", "Enregistré", "Gespeichert"],
  ["Save", "Saqlash", "Сохранить", "保存", "Kaydet", "حفظ", "Guardar", "Enregistrer", "Speichern"],
  ["In compare", "Solishtirishda", "В сравнении", "已在对比中", "Karşılaştırmada", "في المقارنة", "En comparación", "En comparaison", "Im Vergleich"],
  ["Compare", "Solishtirish", "Сравнить", "对比", "Karşılaştır", "قارن", "Comparar", "Comparer", "Vergleichen"],
  ["Share", "Ulashish", "Поделиться", "分享", "Paylaş", "مشاركة", "Compartir", "Partager", "Teilen"],
  ["Photos from Wikipedia and Wikimedia Commons", "Suratlar Vikipediya va Wikimedia Commons'dan", "Фотографии из Википедии и Wikimedia Commons", "图片来自维基百科和维基共享资源", "Fotoğraflar Vikipedi ve Wikimedia Commons'tan", "الصور من ويكيبيديا وويكيميديا كومنز", "Fotos de Wikipedia y Wikimedia Commons", "Photos de Wikipédia et Wikimedia Commons", "Fotos von Wikipedia und Wikimedia Commons"],
  ["Source article", "Manba maqola", "Статья-источник", "来源文章", "Kaynak makale", "المقالة المصدر", "Artículo de origen", "Article source", "Quellartikel"],
  ["Notable alumni", "Taniqli bitiruvchilar", "Известные выпускники", "知名校友", "Tanınmış mezunlar", "خريجون بارزون", "Exalumnos destacados", "Anciens élèves célèbres", "Bekannte Absolventen"],
  ["Aid for internationals", "Xalqaro talabalar uchun yordam", "Помощь иностранным студентам", "国际学生资助", "Uluslararası öğrenciler için destek", "دعم للطلاب الدوليين", "Ayuda para estudiantes internacionales", "Aide pour les étudiants internationaux", "Förderung für internationale Studierende"],
  ["Official website", "Rasmiy veb-sayt", "Официальный сайт", "官方网站", "Resmî web sitesi", "الموقع الرسمي", "Sitio web oficial", "Site officiel", "Offizielle Website"],

  ["How well you fit", "Siz qanchalik mos kelasiz", "Насколько вы подходите", "你的匹配程度", "Ne kadar uyumlusunuz", "مدى ملاءمتك", "Qué tan bien encajas", "Votre adéquation", "Wie gut Sie passen"],
  ["Reach: ambitious, so strengthen tests and essays.", "Reach: o'ta qiyin, shuning uchun testlar va esselarni kuchaytiring.", "Reach: амбициозный вариант, поэтому усильте тесты и эссе.", "冲刺院校：目标较高，请加强考试成绩和文书。", "Reach: iddialı bir hedef, bu yüzden sınav puanlarınızı ve denemelerinizi güçlendirin.", "طموح (Reach): هدف صعب، لذا قوِّ نتائج الاختبارات والمقالات.", "Reach: ambicioso, así que refuerza los exámenes y los ensayos.", "Reach : ambitieux, renforcez donc vos tests et vos essais.", "Reach: ehrgeizig, stärken Sie daher Tests und Essays."],
  ["Target: your profile is close to this school's typical admit.", "Target: profilingiz bu universitetning odatdagi qabul qilinganlariga yaqin.", "Target: ваш профиль близок к типичному принятому студенту этого вуза.", "匹配院校：你的背景接近该校通常录取的学生。", "Target: profiliniz bu okulun tipik kabul ettiği öğrencilere yakın.", "مناسب (Target): ملفك قريب من الطالب المقبول عادةً في هذه الجامعة.", "Target: tu perfil se acerca al de los admitidos habituales de esta universidad.", "Target : votre profil est proche de celui des admis habituels de cette université.", "Target: Ihr Profil liegt nah an dem typischer Zugelassener dieser Hochschule."],
  ["Safety: your profile is above this school's typical admit.", "Safety: profilingiz bu universitetning odatdagi qabul qilinganlaridan yuqori.", "Safety: ваш профиль выше типичного принятого студента этого вуза.", "保底院校：你的背景高于该校通常录取的水平。", "Safety: profiliniz bu okulun tipik kabul ettiği öğrencilerin üzerinde.", "آمن (Safety): ملفك أعلى من الطالب المقبول عادةً في هذه الجامعة.", "Safety: tu perfil supera al de los admitidos habituales de esta universidad.", "Safety : votre profil est supérieur à celui des admis habituels de cette université.", "Safety: Ihr Profil liegt über dem typischer Zugelassener dieser Hochschule."],
  ["Grades", "Baholar", "Оценки", "成绩", "Notlar", "الدرجات", "Calificaciones", "Notes", "Noten"],
  ["Test scores", "Test natijalari", "Результаты тестов", "考试成绩", "Sınav puanları", "درجات الاختبارات", "Puntuaciones de exámenes", "Résultats aux tests", "Testergebnisse"],
  ["Major strength", "Yo'nalish kuchi", "Сила направления", "专业实力", "Bölüm gücü", "قوة التخصص", "Fortaleza de la carrera", "Force de la filière", "Stärke des Fachs"],
  ["Target region", "Maqsadli hudud", "Целевой регион", "目标地区", "Hedef bölge", "المنطقة المستهدفة", "Región objetivo", "Région ciblée", "Zielregion"],
  ["Selectivity", "Tanlovlilik", "Селективность", "录取难度", "Seçicilik", "درجة الانتقائية", "Selectividad", "Sélectivité", "Selektivität"],
  ["Funding", "Moliyalashtirish", "Финансирование", "资助", "Finansman", "التمويل", "Financiación", "Financement", "Finanzierung"],
  // Short factor names shown on the match cards (the keys of `UniversityMatch.factors`).
  ["gpa", "GPA", "GPA", "GPA", "GPA", "المعدل", "GPA", "GPA", "GPA"],
  ["tests", "Testlar", "Тесты", "考试", "Sınavlar", "الاختبارات", "Exámenes", "Tests", "Tests"],
  ["major", "Yo'nalish", "Направление", "专业", "Bölüm", "التخصص", "Carrera", "Filière", "Fach"],
  ["region", "Hudud", "Регион", "地区", "Bölge", "المنطقة", "Región", "Région", "Region"],
  ["difficulty", "Qiyinlik", "Сложность", "难度", "Zorluk", "الصعوبة", "Dificultad", "Difficulté", "Schwierigkeit"],
  ["funding", "Moliyalashtirish", "Финансирование", "资助", "Finansman", "التمويل", "Financiación", "Financement", "Finanzierung"],

  ["Cost estimate", "Xarajat hisob-kitobi", "Оценка стоимости", "费用估算", "Maliyet tahmini", "تقدير التكاليف", "Estimación de costos", "Estimation des coûts", "Kostenschätzung"],
  ["Tuition per year", "O'qish narxi (yiliga)", "Стоимость обучения в год", "每年学费", "Yıllık öğrenim ücreti", "الرسوم الدراسية سنويًا", "Matrícula por año", "Frais de scolarité par an", "Studiengebühren pro Jahr"],
  ["Living per year (estimate)", "Yashash xarajati (yiliga, taxminan)", "Проживание в год (оценка)", "每年生活费（估算）", "Yıllık yaşam gideri (tahmini)", "تكاليف المعيشة سنويًا (تقديري)", "Manutención por año (estimado)", "Coût de la vie par an (estimation)", "Lebenshaltung pro Jahr (geschätzt)"],
  ["Four years in total", "To'rt yil jami", "Всего за четыре года", "四年合计", "Dört yılın toplamı", "المجموع لأربع سنوات", "Total en cuatro años", "Total sur quatre ans", "Insgesamt vier Jahre"],
  ["If a scholarship covers this share of tuition", "Agar stipendiya o'qish narxining shu ulushini qoplasa", "Если стипендия покрывает такую долю стоимости обучения", "如果奖学金覆盖这一比例的学费", "Burs öğrenim ücretinin bu kadarını karşılarsa", "إذا غطّت المنحة هذه النسبة من الرسوم الدراسية", "Si una beca cubre esta parte de la matrícula", "Si une bourse couvre cette part des frais de scolarité", "Wenn ein Stipendium diesen Anteil der Studiengebühren abdeckt"],
  ["Per year with this scholarship", "Shu stipendiya bilan yiliga", "В год с этой стипендией", "有此奖学金后每年费用", "Bu bursla yıllık", "سنويًا مع هذه المنحة", "Por año con esta beca", "Par an avec cette bourse", "Pro Jahr mit diesem Stipendium"],
  ["Living costs are rough regional averages, not quotes from the university.", "Yashash xarajatlari hududlar bo'yicha taxminiy o'rtacha qiymatlar bo'lib, universitet bergan narxlar emas.", "Расходы на проживание — это примерные средние значения по региону, а не цены от университета.", "生活费用为各地区的大致平均值，并非大学的报价。", "Yaşam giderleri bölgesel yaklaşık ortalamalardır, üniversitenin verdiği fiyatlar değildir.", "تكاليف المعيشة متوسطات إقليمية تقريبية وليست أسعارًا مقدّمة من الجامعة.", "Los costos de vida son promedios regionales aproximados, no cotizaciones de la universidad.", "Les coûts de la vie sont des moyennes régionales approximatives, et non des tarifs de l'université.", "Die Lebenshaltungskosten sind grobe regionale Durchschnittswerte, keine Angaben der Universität."],

  ["Application checklist", "Hujjat topshirish ro'yxati", "Чек-лист подачи документов", "申请清单", "Başvuru kontrol listesi", "قائمة مراجعة التقديم", "Lista de verificación de la solicitud", "Liste de contrôle de candidature", "Bewerbungs-Checkliste"],
  ["Transcript and grade translation", "Transkript va baholar tarjimasi", "Транскрипт и перевод оценок", "成绩单及成绩翻译", "Transkript ve not çevirisi", "كشف الدرجات وترجمته", "Expediente académico y su traducción", "Relevé de notes et sa traduction", "Notenspiegel und Übersetzung"],
  ["English test score report", "Ingliz tili test natijasi", "Результаты теста по английскому", "英语考试成绩单", "İngilizce sınav sonuç belgesi", "تقرير نتيجة اختبار اللغة الإنجليزية", "Informe de puntuación del examen de inglés", "Relevé de score au test d'anglais", "Englisch-Testergebnis"],
  ["Personal statement / essays", "Shaxsiy bayonot / esselar", "Личное эссе / эссе", "个人陈述 / 文书", "Kişisel beyan / denemeler", "البيان الشخصي / المقالات", "Declaración personal / ensayos", "Lettre de motivation / essais", "Persönliches Statement / Essays"],
  ["Recommendation letters", "Tavsiya xatlari", "Рекомендательные письма", "推荐信", "Tavsiye mektupları", "رسائل التوصية", "Cartas de recomendación", "Lettres de recommandation", "Empfehlungsschreiben"],
  ["Passport copy", "Pasport nusxasi", "Копия паспорта", "护照复印件", "Pasaport kopyası", "نسخة من جواز السفر", "Copia del pasaporte", "Copie du passeport", "Passkopie"],
  ["Proof of funds / financial documents", "Mablag' mavjudligini tasdiqlovchi / moliyaviy hujjatlar", "Подтверждение финансов / финансовые документы", "资金证明 / 财务文件", "Mali yeterlilik belgesi / finansal belgeler", "إثبات القدرة المالية / المستندات المالية", "Prueba de fondos / documentos financieros", "Justificatif de ressources / documents financiers", "Finanzierungsnachweis / Finanzunterlagen"],
  ["Application fee or fee waiver", "Ariza to'lovi yoki to'lovdan ozod qilish", "Взнос за подачу или освобождение от взноса", "申请费或费用减免", "Başvuru ücreti veya ücret muafiyeti", "رسوم التقديم أو طلب الإعفاء منها", "Tasa de solicitud o exención de tasa", "Frais de dossier ou exonération", "Bewerbungsgebühr oder Gebührenerlass"],
  ["Check the deadline on the official site", "Muddatni rasmiy saytda tekshiring", "Проверьте дедлайн на официальном сайте", "在官网上确认截止日期", "Son tarihi resmî sitede kontrol edin", "تحقق من الموعد النهائي على الموقع الرسمي", "Consulta la fecha límite en el sitio oficial", "Vérifiez la date limite sur le site officiel", "Frist auf der offiziellen Website prüfen"],
  ["Requirements differ by university and program. Confirm them on the official website.", "Talablar universitet va dasturga qarab farq qiladi. Ularni rasmiy veb-saytda tekshirib oling.", "Требования различаются в зависимости от университета и программы. Уточняйте их на официальном сайте.", "各大学和专业的要求不同，请在官方网站上确认。", "Gereksinimler üniversiteye ve programa göre değişir. Resmî web sitesinden doğrulayın.", "تختلف المتطلبات حسب الجامعة والبرنامج. تأكد منها على الموقع الرسمي.", "Los requisitos varían según la universidad y el programa. Confírmalos en el sitio web oficial.", "Les exigences varient selon l'université et le programme. Confirmez-les sur le site officiel.", "Die Anforderungen unterscheiden sich je nach Universität und Studiengang. Bestätigen Sie sie auf der offiziellen Website."],

  // University card.
  ["Acceptance", "Qabul foizi", "Приём", "录取率", "Kabul oranı", "نسبة القبول", "Admisión", "Admission", "Zulassung"],
  ["Tuition / yr", "O'qish narxi / yil", "Обучение / год", "学费 / 年", "Öğrenim ücreti / yıl", "الرسوم / سنة", "Matrícula / año", "Scolarité / an", "Gebühren / Jahr"],
  ["Int'l aid", "Xalqaro yordam", "Помощь иностранцам", "国际生资助", "Uluslararası destek", "دعم دولي", "Ayuda internacional", "Aide internationale", "Intl. Förderung"],
  ["Available", "Mavjud", "Доступна", "有", "Mevcut", "متاح", "Disponible", "Disponible", "Verfügbar"],
  ["Limited", "Cheklangan", "Ограничена", "有限", "Sınırlı", "محدود", "Limitada", "Limitée", "Begrenzt"],
  ["Estimated figures. Confirm with the institution.", "Taxminiy raqamlar. Universitetdan tasdiqlab oling.", "Приблизительные данные. Уточняйте в университете.", "数据为估算值，请向学校确认。", "Tahmini rakamlardır. Kurumdan doğrulayın.", "الأرقام تقديرية. تأكد من الجامعة.", "Cifras estimadas. Confírmalas con la institución.", "Chiffres estimatifs. Confirmez-les auprès de l'établissement.", "Geschätzte Werte. Bitte bei der Hochschule bestätigen."],
  ["Match fit", "Moslik darajasi", "Соответствие", "匹配度", "Uyum", "نسبة التوافق", "Compatibilidad", "Compatibilité", "Passgenauigkeit"],
  ["Key strengths", "Asosiy kuchli tomonlar", "Сильные стороны", "主要优势", "Öne çıkan güçlü yönler", "أبرز نقاط القوة", "Fortalezas clave", "Points forts", "Wichtigste Stärken"],
  ["World", "Dunyo", "В мире", "全球", "Dünya", "عالميًا", "Mundial", "Monde", "Welt"],
  ["Reach", "Reach", "Reach", "冲刺", "Reach", "طموح", "Reach", "Reach", "Reach"],
  ["Target", "Target", "Target", "匹配", "Target", "مناسب", "Target", "Target", "Target"],
  ["Safety", "Safety", "Safety", "保底", "Safety", "آمن", "Safety", "Safety", "Safety"],
  ["Top 25", "Top 25", "Топ-25", "前25", "İlk 25", "أفضل 25", "Top 25", "Top 25", "Top 25"],
  ["GPA aligns with this university’s selectivity", "Baholaringiz bu universitetning tanlov darajasiga mos", "Ваш GPA соответствует селективности этого университета", "你的GPA与这所大学的录取门槛相符", "GPA'niz bu üniversitenin seçiciliğiyle uyumlu", "معدلك التراكمي يتوافق مع انتقائية هذه الجامعة", "Tu GPA se ajusta a la selectividad de esta universidad", "Votre GPA correspond à la sélectivité de cette université", "Ihr GPA passt zur Selektivität dieser Universität"],
  ["Test score strengthens admission fit", "Test natijasi qabul imkoniyatini kuchaytiradi", "Результат теста повышает шансы на поступление", "考试成绩提升了录取匹配度", "Sınav puanı kabul uyumunu güçlendiriyor", "درجة الاختبار تعزز فرص قبولك", "Tu puntuación del examen refuerza tu encaje de admisión", "Votre score au test renforce vos chances d'admission", "Das Testergebnis stärkt Ihre Zulassungschancen"],
  ["Offers aid to international students", "Xalqaro talabalarga yordam taklif qiladi", "Предлагает помощь иностранным студентам", "为国际学生提供资助", "Uluslararası öğrencilere destek sunuyor", "تقدم دعمًا للطلاب الدوليين", "Ofrece ayuda a estudiantes internacionales", "Propose une aide aux étudiants internationaux", "Bietet internationalen Studierenden Förderung"],
  ["Tuition within your stated budget band", "O'qish narxi ko'rsatgan byudjetingiz doirasida", "Стоимость обучения укладывается в ваш бюджет", "学费在你设定的预算范围内", "Öğrenim ücreti belirttiğiniz bütçe aralığında", "الرسوم الدراسية ضمن نطاق ميزانيتك المحدد", "La matrícula está dentro de tu rango de presupuesto", "Les frais de scolarité sont dans votre budget", "Studiengebühren liegen in Ihrem Budgetrahmen"],
  ["Matches your chosen admissions difficulty tier", "Tanlagan qabul qiyinlik darajangizga mos", "Соответствует выбранному вами уровню сложности поступления", "符合你选择的录取难度等级", "Seçtiğiniz kabul zorluk düzeyiyle eşleşiyor", "يطابق مستوى صعوبة القبول الذي اخترته", "Coincide con el nivel de dificultad de admisión que elegiste", "Correspond au niveau de difficulté d'admission choisi", "Entspricht der von Ihnen gewählten Zulassungsschwierigkeit"],
  ["Ambitious pick — strengthen testing and essays", "Yuqori maqsadli tanlov — testlar va esselarni kuchaytiring", "Амбициозный выбор — усильте тесты и эссе", "目标较高的选择——请加强考试和文书", "İddialı bir seçim — sınavlarınızı ve denemelerinizi güçlendirin", "خيار طموح — قوِّ الاختبارات والمقالات", "Opción ambiciosa: refuerza exámenes y ensayos", "Choix ambitieux — renforcez tests et essais", "Ehrgeizige Wahl – stärken Sie Tests und Essays"],
  ["Balanced pick for your current profile", "Hozirgi profilingiz uchun muvozanatli tanlov", "Сбалансированный выбор для вашего текущего профиля", "适合你当前背景的均衡选择", "Mevcut profiliniz için dengeli bir seçim", "خيار متوازن لملفك الحالي", "Opción equilibrada para tu perfil actual", "Choix équilibré pour votre profil actuel", "Ausgewogene Wahl für Ihr aktuelles Profil"],

  // Student stories: the review panel that only admins see.
  ["Review submitted stories", "Yuborilgan hikoyalarni ko'rib chiqish", "Проверка отправленных историй", "审核提交的故事", "Gönderilen hikâyeleri incele", "مراجعة القصص المرسلة", "Revisar historias enviadas", "Examiner les histoires envoyées", "Eingereichte Geschichten prüfen"],
  ["Only admins can see this panel.", "Bu panelni faqat adminlar ko'radi.", "Эту панель видят только администраторы.", "只有管理员能看到此面板。", "Bu paneli yalnızca yöneticiler görür.", "هذه اللوحة تظهر للمشرفين فقط.", "Solo los administradores ven este panel.", "Seuls les administrateurs voient ce panneau.", "Nur Administratoren sehen dieses Panel."],
  ["Waiting for review", "Ko'rib chiqishni kutmoqda", "Ожидают проверки", "待审核", "İnceleme bekliyor", "بانتظار المراجعة", "Pendientes de revisión", "En attente de validation", "Wartet auf Prüfung"],
  ["No stories are waiting for review.", "Ko'rib chiqishni kutayotgan hikoya yo'q.", "Нет историй, ожидающих проверки.", "没有待审核的故事。", "İncelemeyi bekleyen hikâye yok.", "لا توجد قصص بانتظار المراجعة.", "No hay historias pendientes de revisión.", "Aucune histoire en attente de validation.", "Keine Geschichten warten auf Prüfung."],
  ["Approve", "Tasdiqlash", "Одобрить", "通过", "Onayla", "اعتماد", "Aprobar", "Approuver", "Freigeben"],
  ["Reject", "Rad etish", "Отклонить", "拒绝", "Reddet", "رفض", "Rechazar", "Refuser", "Ablehnen"],
  ["Story published.", "Hikoya e'lon qilindi.", "История опубликована.", "故事已发布。", "Hikâye yayınlandı.", "تم نشر القصة.", "Historia publicada.", "Histoire publiée.", "Geschichte veröffentlicht."],
  ["Story rejected.", "Hikoya rad etildi.", "История отклонена.", "故事已被拒绝。", "Hikâye reddedildi.", "تم رفض القصة.", "Historia rechazada.", "Histoire refusée.", "Geschichte abgelehnt."],
  ["Could not update the story. Try again.", "Hikoyani yangilab bo'lmadi. Qayta urinib ko'ring.", "Не удалось обновить историю. Попробуйте ещё раз.", "无法更新故事，请重试。", "Hikâye güncellenemedi. Tekrar deneyin.", "تعذّر تحديث القصة. حاول مرة أخرى.", "No se pudo actualizar la historia. Inténtalo de nuevo.", "Impossible de mettre à jour l'histoire. Réessayez.", "Die Geschichte konnte nicht aktualisiert werden. Bitte erneut versuchen."],
  ["Could not load the stories to review.", "Ko'rib chiqiladigan hikoyalarni yuklab bo'lmadi.", "Не удалось загрузить истории для проверки.", "无法加载待审核的故事。", "İncelenecek hikâyeler yüklenemedi.", "تعذّر تحميل القصص للمراجعة.", "No se pudieron cargar las historias para revisar.", "Impossible de charger les histoires à examiner.", "Die zu prüfenden Geschichten konnten nicht geladen werden."],
  ["Anonymous student", "Anonim talaba", "Анонимный студент", "匿名学生", "Anonim öğrenci", "طالب مجهول", "Estudiante anónimo", "Étudiant anonyme", "Anonyme Studierende"],
  ["Activities", "Faoliyatlar", "Деятельность", "课外活动", "Etkinlikler", "الأنشطة", "Actividades", "Activités", "Aktivitäten"],
  ["Essay", "Esse", "Эссе", "文书", "Deneme", "المقال", "Ensayo", "Essai", "Essay"],

  // Statistics shown for the handful of universities with curated campus data.
  ["Students", "Talabalar", "Студентов", "学生人数", "Öğrenci", "الطلاب", "Estudiantes", "Étudiants", "Studierende"],
  ["Endowment", "Jamg'arma (endowment)", "Эндаумент", "捐赠基金", "Bağış fonu", "الوقف", "Fondo patrimonial", "Dotation", "Stiftungsvermögen"],
  ["Nobel laureates", "Nobel laureatlari", "Нобелевские лауреаты", "诺贝尔奖得主", "Nobel ödüllüleri", "حائزو نوبل", "Premios Nobel", "Prix Nobel", "Nobelpreisträger"],
  ["Startups by alumni", "Bitiruvchilar startaplari", "Стартапы выпускников", "校友创办的初创公司", "Mezunların girişimleri", "شركات ناشئة أسسها الخريجون", "Startups de exalumnos", "Startups d'anciens élèves", "Start-ups von Absolventen"],
  ["Campus size", "Kampus maydoni", "Площадь кампуса", "校园面积", "Kampüs alanı", "مساحة الحرم الجامعي", "Tamaño del campus", "Taille du campus", "Campusgröße"],
  ["Colleges", "Kollejlar", "Колледжи", "学院数", "Kolejler", "الكليات", "Colegios", "Collèges", "Colleges"],
  ["Tuition", "O'qish narxi", "Стоимость обучения", "学费", "Öğrenim ücreti", "الرسوم الدراسية", "Matrícula", "Frais de scolarité", "Studiengebühren"],
  ["CSC funded seats", "CSC moliyalashtiradigan o'rinlar", "Места с финансированием CSC", "CSC资助名额", "CSC destekli kontenjan", "مقاعد ممولة من CSC", "Plazas financiadas por el CSC", "Places financées par le CSC", "CSC-geförderte Plätze"],
  ["MEXT scholars", "MEXT stipendiatlari", "Стипендиаты MEXT", "MEXT奖学金学生", "MEXT bursiyerleri", "منحة MEXT", "Becarios MEXT", "Boursiers MEXT", "MEXT-Stipendiaten"],

  // Notice on the roadmap when the application date is close.
  ["Short on time: your plan is compressed", "Vaqt kam: rejangiz qisqartirildi", "Времени мало: план сжат", "时间紧迫：计划已压缩", "Zaman az: planınız sıkıştırıldı", "الوقت ضيق: تم ضغط خطتك", "Poco tiempo: tu plan se ha comprimido", "Peu de temps : votre plan a été condensé", "Wenig Zeit: Ihr Plan wurde verdichtet"],
  ["Months until your application date", "Ariza topshirish sanasigacha qolgan oylar", "Месяцев до даты подачи документов", "距离申请日期的月数", "Başvuru tarihine kalan ay", "الأشهر المتبقية حتى موعد التقديم", "Meses hasta tu fecha de solicitud", "Mois avant votre date de candidature", "Monate bis zu Ihrem Bewerbungstermin"],
  ["This is less time than the plan normally needs, so the steps are moved closer together. A university's own deadline does not move, so check each one on the official site first.", "Bu reja odatda talab qiladigan vaqtdan kam, shuning uchun qadamlar bir-biriga yaqinlashtirildi. Universitetning o'z muddati o'zgarmaydi, shuning uchun avval har birini rasmiy saytdan tekshiring.", "Это меньше времени, чем обычно нужно для этого плана, поэтому шаги сдвинуты ближе друг к другу. Собственный дедлайн университета не сдвигается, поэтому сначала проверьте каждый на официальном сайте.", "这比计划通常需要的时间更短，因此各步骤的间隔已被缩短。大学自己的截止日期不会改变，请先在官方网站上逐一核对。", "Bu süre planın normalde ihtiyaç duyduğundan kısa, bu yüzden adımlar birbirine yaklaştırıldı. Üniversitenin kendi son tarihi değişmez, bu yüzden önce her birini resmî web sitesinden kontrol edin.", "هذا وقت أقل مما تحتاجه الخطة عادةً، لذلك قُرّبت الخطوات من بعضها. موعد الجامعة النهائي لا يتغيّر، فتحقق من كل موعد في الموقع الرسمي أولاً.", "Es menos tiempo del que este plan suele necesitar, así que los pasos se han acercado entre sí. El plazo de cada universidad no se mueve, así que primero comprueba cada uno en el sitio oficial.", "C'est moins de temps que ce plan n'en demande normalement, donc les étapes ont été rapprochées. La date limite propre à chaque université ne bouge pas : vérifiez d'abord chacune sur le site officiel.", "Das ist weniger Zeit, als dieser Plan normalerweise braucht, daher liegen die Schritte näher beieinander. Die Frist einer Universität verschiebt sich nicht, prüfen Sie deshalb zuerst jede auf der offiziellen Website."],
  ["With this little time, start with your essay, recommendation letters and documents, and book an English test if you still need one. Leave the SAT and extra activities for later unless a school requires them.", "Vaqt shunchalik kam bo'lsa, esse, tavsiyanomalar va hujjatlardan boshlang, agar hali ingliz tili imtihonini topshirmagan bo'lsangiz, unga yoziling. SAT va qo'shimcha faoliyatlarni, universitet talab qilmasa, keyinroqqa qoldiring.", "Когда времени так мало, начните с эссе, рекомендательных писем и документов и запишитесь на экзамен по английскому, если он ещё нужен. SAT и дополнительные активности отложите, если их не требует университет.", "时间这么紧，请先从文书、推荐信和材料入手；如果还需要英语考试，请尽快报名。除非学校要求，否则 SAT 和额外活动可以先放一放。", "Bu kadar az zamanla önce kompozisyonunuza, tavsiye mektuplarına ve belgelere başlayın; hâlâ gerekiyorsa bir İngilizce sınavına kaydolun. Okul istemedikçe SAT'ı ve ek etkinlikleri sonraya bırakın.", "مع هذا الوقت القصير، ابدأ بالمقال وخطابات التوصية والمستندات، واحجز اختبار اللغة الإنجليزية إن كنت ما زلت بحاجة إليه. أجّل SAT والأنشطة الإضافية ما لم تشترطها الجامعة.", "Con tan poco tiempo, empieza por el ensayo, las cartas de recomendación y los documentos, y reserva un examen de inglés si aún lo necesitas. Deja el SAT y las actividades extra para después, salvo que una universidad los exija.", "Avec si peu de temps, commencez par votre dissertation, les lettres de recommandation et les documents, et inscrivez-vous à un test d'anglais si vous en avez encore besoin. Gardez le SAT et les activités supplémentaires pour plus tard, sauf si une université les exige.", "Bei so wenig Zeit beginnen Sie mit Ihrem Essay, den Empfehlungsschreiben und den Unterlagen und melden Sie sich zu einem Englischtest an, falls Sie noch keinen haben. Verschieben Sie SAT und zusätzliche Aktivitäten, außer eine Hochschule verlangt sie."],
];

/** Regions of the world used by the filters and the match explanations. */
const REGION_ROWS: readonly Row[] = [
  ["USA", "AQSH", "США", "美国", "ABD", "الولايات المتحدة", "EE. UU.", "États-Unis", "USA"],
  ["UK", "Buyuk Britaniya", "Великобритания", "英国", "Birleşik Krallık", "المملكة المتحدة", "Reino Unido", "Royaume-Uni", "Vereinigtes Königreich"],
  ["Europe", "Yevropa", "Европа", "欧洲", "Avrupa", "أوروبا", "Europa", "Europe", "Europa"],
  ["Asia", "Osiyo", "Азия", "亚洲", "Asya", "آسيا", "Asia", "Asie", "Asien"],
  ["Oceania", "Okeaniya", "Океания", "大洋洲", "Okyanusya", "أوقيانوسيا", "Oceanía", "Océanie", "Ozeanien"],
];

/** Every country that has a university in the directory. */
const COUNTRY_ROWS: readonly Row[] = [
  ["Azerbaijan", "Ozarbayjon", "Азербайджан", "阿塞拜疆", "Azerbaycan", "أذربيجان", "Azerbaiyán", "Azerbaïdjan", "Aserbaidschan"],
  ["Czechia", "Chexiya", "Чехия", "捷克", "Çekya", "التشيك", "Chequia", "Tchéquie", "Tschechien"],
  ["Georgia", "Gruziya", "Грузия", "格鲁吉亚", "Gürcistan", "جورجيا", "Georgia", "Géorgie", "Georgien"],
  ["Hungary", "Vengriya", "Венгрия", "匈牙利", "Macaristan", "المجر", "Hungría", "Hongrie", "Ungarn"],
  ["Kyrgyzstan", "Qirg'iziston", "Кыргызстан", "吉尔吉斯斯坦", "Kırgızistan", "قيرغيزستان", "Kirguistán", "Kirghizistan", "Kirgisistan"],
  ["Lithuania", "Litva", "Литва", "立陶宛", "Litvanya", "ليتوانيا", "Lituania", "Lituanie", "Litauen"],
  ["Portugal", "Portugaliya", "Португалия", "葡萄牙", "Portekiz", "البرتغال", "Portugal", "Portugal", "Portugal"],
  ["Russia", "Rossiya", "Россия", "俄罗斯", "Rusya", "روسيا", "Rusia", "Russie", "Russland"],
  ["Taiwan", "Tayvan", "Тайвань", "台湾", "Tayvan", "تايوان", "Taiwán", "Taïwan", "Taiwan"],
  ["Latvia", "Latviya", "Латвия", "拉脱维亚", "Letonya", "لاتفيا", "Letonia", "Lettonie", "Lettland"],
  ["Saudi Arabia", "Saudiya Arabistoni", "Саудовская Аравия", "沙特阿拉伯", "Suudi Arabistan", "المملكة العربية السعودية", "Arabia Saudí", "Arabie saoudite", "Saudi-Arabien"],
  ["United Arab Emirates", "Birlashgan Arab Amirliklari", "Объединённые Арабские Эмираты", "阿拉伯联合酋长国", "Birleşik Arap Emirlikleri", "الإمارات العربية المتحدة", "Emiratos Árabes Unidos", "Émirats arabes unis", "Vereinigte Arabische Emirate"],
  ["Vietnam", "Vetnam", "Вьетнам", "越南", "Vietnam", "فيتنام", "Vietnam", "Viêt Nam", "Vietnam"],
  ["Australia", "Avstraliya", "Австралия", "澳大利亚", "Avustralya", "أستراليا", "Australia", "Australie", "Australien"],
  ["Austria", "Avstriya", "Австрия", "奥地利", "Avusturya", "النمسا", "Austria", "Autriche", "Österreich"],
  ["Belgium", "Belgiya", "Бельгия", "比利时", "Belçika", "بلجيكا", "Bélgica", "Belgique", "Belgien"],
  ["Canada", "Kanada", "Канада", "加拿大", "Kanada", "كندا", "Canadá", "Canada", "Kanada"],
  ["China", "Xitoy", "Китай", "中国", "Çin", "الصين", "China", "Chine", "China"],
  ["Denmark", "Daniya", "Дания", "丹麦", "Danimarka", "الدنمارك", "Dinamarca", "Danemark", "Dänemark"],
  ["Estonia", "Estoniya", "Эстония", "爱沙尼亚", "Estonya", "إستونيا", "Estonia", "Estonie", "Estland"],
  ["Finland", "Finlyandiya", "Финляндия", "芬兰", "Finlandiya", "فنلندا", "Finlandia", "Finlande", "Finnland"],
  ["France", "Fransiya", "Франция", "法国", "Fransa", "فرنسا", "Francia", "France", "Frankreich"],
  ["Germany", "Germaniya", "Германия", "德国", "Almanya", "ألمانيا", "Alemania", "Allemagne", "Deutschland"],
  ["Hong Kong", "Gonkong", "Гонконг", "香港", "Hong Kong", "هونغ كونغ", "Hong Kong", "Hong Kong", "Hongkong"],
  ["India", "Hindiston", "Индия", "印度", "Hindistan", "الهند", "India", "Inde", "Indien"],
  ["Indonesia", "Indoneziya", "Индонезия", "印度尼西亚", "Endonezya", "إندونيسيا", "Indonesia", "Indonésie", "Indonesien"],
  ["Ireland", "Irlandiya", "Ирландия", "爱尔兰", "İrlanda", "أيرلندا", "Irlanda", "Irlande", "Irland"],
  ["Italy", "Italiya", "Италия", "意大利", "İtalya", "إيطاليا", "Italia", "Italie", "Italien"],
  ["Japan", "Yaponiya", "Япония", "日本", "Japonya", "اليابان", "Japón", "Japon", "Japan"],
  ["Kazakhstan", "Qozog'iston", "Казахстан", "哈萨克斯坦", "Kazakistan", "كازاخستان", "Kazajistán", "Kazakhstan", "Kasachstan"],
  ["Malaysia", "Malayziya", "Малайзия", "马来西亚", "Malezya", "ماليزيا", "Malasia", "Malaisie", "Malaysia"],
  ["Netherlands", "Niderlandiya", "Нидерланды", "荷兰", "Hollanda", "هولندا", "Países Bajos", "Pays-Bas", "Niederlande"],
  ["New Zealand", "Yangi Zelandiya", "Новая Зеландия", "新西兰", "Yeni Zelanda", "نيوزيلندا", "Nueva Zelanda", "Nouvelle-Zélande", "Neuseeland"],
  ["Norway", "Norvegiya", "Норвегия", "挪威", "Norveç", "النرويج", "Noruega", "Norvège", "Norwegen"],
  ["Poland", "Polsha", "Польша", "波兰", "Polonya", "بولندا", "Polonia", "Pologne", "Polen"],
  ["Singapore", "Singapur", "Сингапур", "新加坡", "Singapur", "سنغافورة", "Singapur", "Singapour", "Singapur"],
  ["South Korea", "Janubiy Koreya", "Южная Корея", "韩国", "Güney Kore", "كوريا الجنوبية", "Corea del Sur", "Corée du Sud", "Südkorea"],
  ["Spain", "Ispaniya", "Испания", "西班牙", "İspanya", "إسبانيا", "España", "Espagne", "Spanien"],
  ["Sweden", "Shvetsiya", "Швеция", "瑞典", "İsveç", "السويد", "Suecia", "Suède", "Schweden"],
  ["Switzerland", "Shveytsariya", "Швейцария", "瑞士", "İsviçre", "سويسرا", "Suiza", "Suisse", "Schweiz"],
  ["Thailand", "Tailand", "Таиланд", "泰国", "Tayland", "تايلاند", "Tailandia", "Thaïlande", "Thailand"],
  ["Türkiye", "Turkiya", "Турция", "土耳其", "Türkiye", "تركيا", "Turquía", "Turquie", "Türkei"],
  ["United Kingdom", "Buyuk Britaniya", "Великобритания", "英国", "Birleşik Krallık", "المملكة المتحدة", "Reino Unido", "Royaume-Uni", "Vereinigtes Königreich"],
  ["United States", "Qo'shma Shtatlar", "Соединённые Штаты", "美国", "Amerika Birleşik Devletleri", "الولايات المتحدة", "Estados Unidos", "États-Unis", "Vereinigte Staaten"],
  ["Uzbekistan", "O'zbekiston", "Узбекистан", "乌兹别克斯坦", "Özbekistan", "أوزبكستان", "Uzbekistán", "Ouzbékistan", "Usbekistan"],
];

/** Study fields listed as a university's strengths. */
const FIELD_ROWS: readonly Row[] = [
  ["Law", "Huquq", "Право", "法学", "Hukuk", "القانون", "Derecho", "Droit", "Rechtswissenschaft"],
  ["Economics", "Iqtisodiyot", "Экономика", "经济学", "Ekonomi", "الاقتصاد", "Economía", "Économie", "Wirtschaftswissenschaften"],
  ["Medicine", "Tibbiyot", "Медицина", "医学", "Tıp", "الطب", "Medicina", "Médecine", "Medizin"],
  ["Political Science", "Siyosatshunoslik", "Политология", "政治学", "Siyaset Bilimi", "العلوم السياسية", "Ciencias Políticas", "Sciences politiques", "Politikwissenschaft"],
  ["Engineering", "Muhandislik", "Инженерия", "工程学", "Mühendislik", "الهندسة", "Ingeniería", "Ingénierie", "Ingenieurwesen"],
  ["Computer Science", "Informatika", "Информатика", "计算机科学", "Bilgisayar Bilimi", "علوم الحاسوب", "Informática", "Informatique", "Informatik"],
  ["Physics", "Fizika", "Физика", "物理学", "Fizik", "الفيزياء", "Física", "Physique", "Physik"],
  ["Mathematics", "Matematika", "Математика", "数学", "Matematik", "الرياضيات", "Matemáticas", "Mathématiques", "Mathematik"],
  ["Business", "Biznes", "Бизнес", "商学", "İşletme", "إدارة الأعمال", "Negocios", "Gestion d'entreprise", "Betriebswirtschaft"],
  ["Entrepreneurship", "Tadbirkorlik", "Предпринимательство", "创业学", "Girişimcilik", "ريادة الأعمال", "Emprendimiento", "Entrepreneuriat", "Unternehmertum"],
  ["Philosophy", "Falsafa", "Философия", "哲学", "Felsefe", "الفلسفة", "Filosofía", "Philosophie", "Philosophie"],
  ["Politics", "Siyosat", "Политика", "政治", "Siyaset", "السياسة", "Política", "Politique", "Politik"],
  ["Architecture", "Arxitektura", "Архитектура", "建筑学", "Mimarlık", "الهندسة المعمارية", "Arquitectura", "Architecture", "Architektur"],
  ["Neuroscience", "Neyrobiologiya", "Нейронауки", "神经科学", "Sinirbilim", "علم الأعصاب", "Neurociencia", "Neurosciences", "Neurowissenschaften"],
  ["Education", "Ta'lim", "Образование", "教育学", "Eğitim", "التعليم", "Educación", "Éducation", "Bildungswissenschaften"],
  ["Artificial Intelligence", "Sun'iy intellekt", "Искусственный интеллект", "人工智能", "Yapay Zekâ", "الذكاء الاصطناعي", "Inteligencia artificial", "Intelligence artificielle", "Künstliche Intelligenz"],
  ["Forestry", "O'rmonchilik", "Лесоводство", "林学", "Ormancılık", "الحراجة", "Ciencias forestales", "Foresterie", "Forstwirtschaft"],
  ["Earth Sciences", "Yer haqidagi fanlar", "Науки о Земле", "地球科学", "Yer Bilimleri", "علوم الأرض", "Ciencias de la Tierra", "Sciences de la Terre", "Geowissenschaften"],
  ["Mechanical Engineering", "Mashinasozlik muhandisligi", "Машиностроение", "机械工程", "Makine Mühendisliği", "الهندسة الميكانيكية", "Ingeniería mecánica", "Génie mécanique", "Maschinenbau"],
  ["Informatics", "Informatika", "Информатика", "信息学", "Bilişim", "المعلوماتية", "Informática", "Informatique", "Informatik"],
  ["Life Sciences", "Hayot haqidagi fanlar", "Науки о жизни", "生命科学", "Yaşam Bilimleri", "علوم الحياة", "Ciencias de la vida", "Sciences de la vie", "Lebenswissenschaften"],
  ["Chemistry", "Kimyo", "Химия", "化学", "Kimya", "الكيمياء", "Química", "Chimie", "Chemie"],
  ["Finance", "Moliya", "Финансы", "金融学", "Finans", "المالية", "Finanzas", "Finance", "Finanzwesen"],
  ["Management", "Menejment", "Менеджмент", "管理学", "Yönetim", "الإدارة", "Gestión", "Management", "Management"],
  ["Data Science", "Ma'lumotlar fani", "Наука о данных", "数据科学", "Veri Bilimi", "علم البيانات", "Ciencia de datos", "Science des données", "Data Science"],
  ["Public Policy", "Davlat siyosati", "Государственная политика", "公共政策", "Kamu Politikası", "السياسات العامة", "Políticas públicas", "Politiques publiques", "Public Policy"],
  ["Chinese Studies", "Xitoyshunoslik", "Китаеведение", "汉学", "Çin Araştırmaları", "الدراسات الصينية", "Estudios chinos", "Études chinoises", "Sinologie"],
  ["Public Health", "Jamoat salomatligi", "Общественное здравоохранение", "公共卫生", "Halk Sağlığı", "الصحة العامة", "Salud pública", "Santé publique", "Public Health"],
  ["Korean Studies", "Koreyashunoslik", "Корееведение", "韩国学", "Kore Çalışmaları", "الدراسات الكورية", "Estudios coreanos", "Études coréennes", "Koreanistik"],
  ["Materials Science", "Materialshunoslik", "Материаловедение", "材料科学", "Malzeme Bilimi", "علم المواد", "Ciencia de materiales", "Science des matériaux", "Materialwissenschaft"],
  ["Arts", "San'at", "Искусства", "艺术", "Sanat", "الفنون", "Artes", "Arts", "Kunst"],
  ["Environmental Science", "Ekologiya fanlari", "Экологические науки", "环境科学", "Çevre Bilimi", "علوم البيئة", "Ciencias ambientales", "Sciences de l'environnement", "Umweltwissenschaften"],
  ["Marine Science", "Dengiz fanlari", "Морские науки", "海洋科学", "Deniz Bilimi", "علوم البحار", "Ciencias marinas", "Sciences marines", "Meereswissenschaften"],
  ["Sustainability", "Barqarorlik", "Устойчивое развитие", "可持续发展", "Sürdürülebilirlik", "الاستدامة", "Sostenibilidad", "Durabilité", "Nachhaltigkeit"],
  ["Journalism", "Jurnalistika", "Журналистика", "新闻学", "Gazetecilik", "الصحافة", "Periodismo", "Journalisme", "Journalismus"],
  ["Media Studies", "Media tadqiqotlari", "Медиаведение", "媒体研究", "Medya Çalışmaları", "دراسات الإعلام", "Estudios de medios", "Études des médias", "Medienwissenschaft"],
  ["Fine Arts", "Tasviriy san'at", "Изобразительное искусство", "美术", "Güzel Sanatlar", "الفنون الجميلة", "Bellas artes", "Beaux-arts", "Bildende Kunst"],
  ["Semiotics", "Semiotika", "Семиотика", "符号学", "Göstergebilim", "علم السيمياء", "Semiótica", "Sémiotique", "Semiotik"],
  ["Design", "Dizayn", "Дизайн", "设计学", "Tasarım", "التصميم", "Diseño", "Design", "Design"],
  ["Drama", "Dramaturgiya", "Драматическое искусство", "戏剧", "Drama", "الدراما", "Artes dramáticas", "Art dramatique", "Schauspiel"],
  ["History", "Tarix", "История", "历史学", "Tarih", "التاريخ", "Historia", "Histoire", "Geschichte"],
  ["International Affairs", "Xalqaro aloqalar", "Международные отношения", "国际事务", "Uluslararası İşler", "الشؤون الدولية", "Asuntos internacionales", "Affaires internationales", "Internationale Politik"],
  ["Nursing", "Hamshiralik ishi", "Сестринское дело", "护理学", "Hemşirelik", "التمريض", "Enfermería", "Soins infirmiers", "Pflegewissenschaft"],
  ["Agriculture", "Qishloq xo'jaligi", "Сельское хозяйство", "农学", "Tarım", "الزراعة", "Agricultura", "Agriculture", "Landwirtschaft"],
  ["Hotel Administration", "Mehmonxona boshqaruvi", "Гостиничный менеджмент", "酒店管理", "Otel Yönetimi", "إدارة الفنادق", "Administración hotelera", "Gestion hôtelière", "Hotelmanagement"],
  ["Liberal Arts", "Liberal san'at", "Свободные искусства", "博雅教育", "Liberal Sanatlar", "الفنون الحرة", "Artes liberales", "Arts libéraux", "Freie Künste"],
  ["Applied Mathematics", "Amaliy matematika", "Прикладная математика", "应用数学", "Uygulamalı Matematik", "الرياضيات التطبيقية", "Matemáticas aplicadas", "Mathématiques appliquées", "Angewandte Mathematik"],
  ["Literary Arts", "Adabiyot san'ati", "Литературное творчество", "文学艺术", "Edebî Sanatlar", "الفنون الأدبية", "Artes literarias", "Arts littéraires", "Literarische Künste"],
  ["Government", "Davlat boshqaruvi", "Государственное управление", "政府学", "Kamu Yönetimi", "الحكم", "Gobierno", "Gouvernement", "Regierungslehre"],
  ["Astronomy", "Astronomiya", "Астрономия", "天文学", "Astronomi", "علم الفلك", "Astronomía", "Astronomie", "Astronomie"],
  ["Sociology", "Sotsiologiya", "Социология", "社会学", "Sosyoloji", "علم الاجتماع", "Sociología", "Sociologie", "Soziologie"],
  ["Theatre", "Teatr", "Театр", "戏剧艺术", "Tiyatro", "المسرح", "Teatro", "Théâtre", "Theater"],
  ["Biomedical Engineering", "Biomeditsina muhandisligi", "Биомедицинская инженерия", "生物医学工程", "Biyomedikal Mühendislik", "الهندسة الطبية الحيوية", "Ingeniería biomédica", "Génie biomédical", "Biomedizintechnik"],
  ["Film", "Kino", "Кино", "电影学", "Film", "السينما", "Cine", "Cinéma", "Film"],
  ["Psychology", "Psixologiya", "Психология", "心理学", "Psikoloji", "علم النفس", "Psicología", "Psychologie", "Psychologie"],
  ["Bioengineering", "Bioinjeneriya", "Биоинженерия", "生物工程", "Biyomühendislik", "الهندسة الحيوية", "Bioingeniería", "Bio-ingénierie", "Bioingenieurwesen"],
  ["Oceanography", "Okeanografiya", "Океанография", "海洋学", "Oşinografi", "علم المحيطات", "Oceanografía", "Océanographie", "Ozeanographie"],
  ["Veterinary Medicine", "Veterinariya tibbiyoti", "Ветеринарная медицина", "兽医学", "Veteriner Hekimlik", "الطب البيطري", "Medicina veterinaria", "Médecine vétérinaire", "Veterinärmedizin"],
  ["Viticulture", "Uzumchilik", "Виноградарство", "葡萄栽培学", "Bağcılık", "زراعة العنب", "Viticultura", "Viticulture", "Weinbau"],
  ["Criminology", "Kriminologiya", "Криминология", "犯罪学", "Kriminoloji", "علم الجريمة", "Criminología", "Criminologie", "Kriminologie"],
  ["Accounting", "Buxgalteriya hisobi", "Бухгалтерский учёт", "会计学", "Muhasebe", "المحاسبة", "Contabilidad", "Comptabilité", "Rechnungswesen"],
  ["Industrial Engineering", "Sanoat muhandisligi", "Промышленная инженерия", "工业工程", "Endüstri Mühendisliği", "الهندسة الصناعية", "Ingeniería industrial", "Génie industriel", "Wirtschaftsingenieurwesen"],
  ["Petroleum Engineering", "Neft muhandisligi", "Нефтяная инженерия", "石油工程", "Petrol Mühendisliği", "هندسة البترول", "Ingeniería del petróleo", "Génie pétrolier", "Erdölingenieurwesen"],
  ["Global Health", "Global salomatlik", "Глобальное здравоохранение", "全球健康", "Küresel Sağlık", "الصحة العالمية", "Salud global", "Santé mondiale", "Globale Gesundheit"],
  ["Robotics", "Robototexnika", "Робототехника", "机器人学", "Robotik", "الروبوتات", "Robótica", "Robotique", "Robotik"],
  ["Cinematic Arts", "Kinematografiya san'ati", "Киноискусство", "电影艺术", "Sinema Sanatları", "فنون السينما", "Artes cinematográficas", "Arts cinématographiques", "Filmkunst"],
  ["Communications", "Kommunikatsiyalar", "Коммуникации", "传播学", "İletişim", "الاتصالات", "Comunicaciones", "Communications", "Kommunikationswissenschaft"],
  ["Co-op Engineering", "Amaliyotli muhandislik (co-op)", "Инженерия со стажировкой (co-op)", "合作教育工程", "Staj Programlı Mühendislik (Co-op)", "هندسة التعليم التعاوني (Co-op)", "Ingeniería con prácticas (co-op)", "Génie avec stages (co-op)", "Ingenieurwesen mit Praxisphasen (Co-op)"],
  ["Aerospace Engineering", "Aerokosmik muhandislik", "Аэрокосмическая инженерия", "航空航天工程", "Havacılık ve Uzay Mühendisliği", "هندسة الطيران والفضاء", "Ingeniería aeroespacial", "Génie aérospatial", "Luft- und Raumfahrttechnik"],
  ["Pharmacy", "Farmatsevtika", "Фармация", "药学", "Eczacılık", "الصيدلة", "Farmacia", "Pharmacie", "Pharmazie"],
  ["Meteorology", "Meteorologiya", "Метеорология", "气象学", "Meteoroloji", "الأرصاد الجوية", "Meteorología", "Météorologie", "Meteorologie"],
  ["Aerospace", "Aerokosmos", "Аэрокосмическая отрасль", "航空航天", "Havacılık ve Uzay", "الطيران والفضاء", "Aeroespacial", "Aérospatiale", "Luft- und Raumfahrt"],
  ["Supply Chain", "Ta'minot zanjiri", "Цепи поставок", "供应链管理", "Tedarik Zinciri", "سلسلة الإمداد", "Cadena de suministro", "Chaîne logistique", "Lieferkettenmanagement"],
  ["Optical Sciences", "Optika fanlari", "Оптические науки", "光学", "Optik Bilimler", "علوم البصريات", "Ciencias ópticas", "Sciences optiques", "Optische Wissenschaften"],
  ["Mining", "Konchilik", "Горное дело", "采矿学", "Madencilik", "التعدين", "Minería", "Exploitation minière", "Bergbau"],
  ["Computer Graphics", "Kompyuter grafikasi", "Компьютерная графика", "计算机图形学", "Bilgisayar Grafikleri", "رسومات الحاسوب", "Gráficos por computadora", "Infographie", "Computergrafik"],
  ["Agricultural Engineering", "Agroinjeneriya", "Агроинженерия", "农业工程", "Tarım Mühendisliği", "الهندسة الزراعية", "Ingeniería agrícola", "Génie agricole", "Agrartechnik"],
  ["Hospitality", "Mehmondo'stlik sohasi", "Гостиничное дело", "酒店业", "Konaklama ve Ağırlama", "الضيافة", "Hostelería", "Hôtellerie", "Gastgewerbe"],
  ["Computing", "Hisoblash texnikasi", "Вычислительная техника", "计算机学", "Bilgi İşlem", "الحوسبة", "Computación", "Informatique", "Informatik"],
  ["Natural Sciences", "Tabiiy fanlar", "Естественные науки", "自然科学", "Doğa Bilimleri", "العلوم الطبيعية", "Ciencias naturales", "Sciences naturelles", "Naturwissenschaften"],
  ["AI", "AI", "ИИ", "人工智能", "Yapay Zekâ", "الذكاء الاصطناعي", "IA", "IA", "KI"],
  ["Veterinary", "Veterinariya", "Ветеринария", "兽医", "Veterinerlik", "البيطرة", "Veterinaria", "Vétérinaire", "Tiermedizin"],
  ["War Studies", "Harbiy tadqiqotlar", "Военные исследования", "战争研究", "Savaş Çalışmaları", "دراسات الحرب", "Estudios de guerra", "Études de la guerre", "Kriegsstudien"],
  ["Theology", "Ilohiyot", "Теология", "神学", "İlahiyat", "اللاهوت", "Teología", "Théologie", "Theologie"],
  ["Geography", "Geografiya", "География", "地理学", "Coğrafya", "الجغرافيا", "Geografía", "Géographie", "Geographie"],
  ["International Relations", "Xalqaro munosabatlar", "Международные отношения", "国际关系", "Uluslararası İlişkiler", "العلاقات الدولية", "Relaciones internacionales", "Relations internationales", "Internationale Beziehungen"],
  ["Art History", "San'at tarixi", "История искусств", "艺术史", "Sanat Tarihi", "تاريخ الفن", "Historia del arte", "Histoire de l'art", "Kunstgeschichte"],
  ["Food Science", "Oziq-ovqat fani", "Пищевые науки", "食品科学", "Gıda Bilimi", "علوم الأغذية", "Ciencia de los alimentos", "Science alimentaire", "Lebensmittelwissenschaft"],
  ["Dentistry", "Stomatologiya", "Стоматология", "牙医学", "Diş Hekimliği", "طب الأسنان", "Odontología", "Médecine dentaire", "Zahnmedizin"],
  ["Audiology", "Audiologiya", "Аудиология", "听力学", "Odyoloji", "علم السمع", "Audiología", "Audiologie", "Audiologie"],
  ["Sport Science", "Sport fanlari", "Спортивные науки", "运动科学", "Spor Bilimleri", "علوم الرياضة", "Ciencias del deporte", "Sciences du sport", "Sportwissenschaft"],
  ["Health Sciences", "Sog'liqni saqlash fanlari", "Науки о здоровье", "健康科学", "Sağlık Bilimleri", "العلوم الصحية", "Ciencias de la salud", "Sciences de la santé", "Gesundheitswissenschaften"],
  ["Nanotechnology", "Nanotexnologiya", "Нанотехнологии", "纳米技术", "Nanoteknoloji", "تقنية النانو", "Nanotecnología", "Nanotechnologie", "Nanotechnologie"],
  ["Commerce", "Tijorat", "Коммерция", "商业", "Ticaret", "التجارة", "Comercio", "Commerce", "Handel"],
  ["Business (Ivey)", "Biznes (Ivey)", "Бизнес (Ivey)", "商学（Ivey）", "İşletme (Ivey)", "إدارة الأعمال (Ivey)", "Negocios (Ivey)", "Gestion d'entreprise (Ivey)", "Betriebswirtschaft (Ivey)"],
  ["Energy Engineering", "Energetika muhandisligi", "Энергетическая инженерия", "能源工程", "Enerji Mühendisliği", "هندسة الطاقة", "Ingeniería energética", "Génie énergétique", "Energietechnik"],
  ["Geology", "Geologiya", "Геология", "地质学", "Jeoloji", "الجيولوجيا", "Geología", "Géologie", "Geologie"],
  ["Computing Science", "Kompyuter fanlari", "Компьютерные науки", "计算科学", "Bilgi İşlem Bilimi", "علوم الحوسبة", "Ciencias de la computación", "Informatique", "Informatik"],
  ["Communication", "Aloqa va kommunikatsiya", "Коммуникация", "传播", "İletişim", "التواصل", "Comunicación", "Communication", "Kommunikation"],
  ["Marine Biology", "Dengiz biologiyasi", "Морская биология", "海洋生物学", "Deniz Biyolojisi", "علم الأحياء البحرية", "Biología marina", "Biologie marine", "Meeresbiologie"],
  ["Humanities", "Gumanitar fanlar", "Гуманитарные науки", "人文学科", "Beşeri Bilimler", "العلوم الإنسانية", "Humanidades", "Sciences humaines", "Geisteswissenschaften"],
  ["Civil Engineering", "Qurilish muhandisligi", "Строительная инженерия", "土木工程", "İnşaat Mühendisliği", "الهندسة المدنية", "Ingeniería civil", "Génie civil", "Bauingenieurwesen"],
  ["Archaeology", "Arxeologiya", "Археология", "考古学", "Arkeoloji", "علم الآثار", "Arqueología", "Archéologie", "Archäologie"],
  ["Geosciences", "Geofanlar", "Геонауки", "地球科学", "Yerbilimleri", "علوم الأرض", "Geociencias", "Géosciences", "Geowissenschaften"],
  ["Electrical Engineering", "Elektrotexnika", "Электротехника", "电气工程", "Elektrik Mühendisliği", "الهندسة الكهربائية", "Ingeniería eléctrica", "Génie électrique", "Elektrotechnik"],
  ["Industrial Design", "Sanoat dizayni", "Промышленный дизайн", "工业设计", "Endüstriyel Tasarım", "التصميم الصناعي", "Diseño industrial", "Design industriel", "Industriedesign"],
  ["Biomedical Science", "Biomeditsina fanlari", "Биомедицинские науки", "生物医学", "Biyomedikal Bilimler", "العلوم الطبية الحيوية", "Ciencias biomédicas", "Sciences biomédicales", "Biomedizinische Wissenschaften"],
  ["Bioscience Engineering", "Biologiya fanlari muhandisligi", "Инженерия биологических наук", "生物科学工程", "Biyobilim Mühendisliği", "هندسة العلوم الحيوية", "Ingeniería de biociencias", "Ingénierie des biosciences", "Bioingenieurwissenschaften"],
  ["Wind Energy", "Shamol energetikasi", "Ветроэнергетика", "风能", "Rüzgâr Enerjisi", "طاقة الرياح", "Energía eólica", "Énergie éolienne", "Windenergie"],
  ["Biotechnology", "Biotexnologiya", "Биотехнологии", "生物技术", "Biyoteknoloji", "التكنولوجيا الحيوية", "Biotecnología", "Biotechnologie", "Biotechnologie"],
  ["Automotive Engineering", "Avtomobilsozlik muhandisligi", "Автомобильная инженерия", "汽车工程", "Otomotiv Mühendisliği", "هندسة السيارات", "Ingeniería automotriz", "Génie automobile", "Fahrzeugtechnik"],
  ["Naval Architecture", "Kemasozlik", "Кораблестроение", "船舶工程", "Gemi İnşaatı", "هندسة السفن", "Arquitectura naval", "Architecture navale", "Schiffbau"],
  ["Peace Studies", "Tinchlik tadqiqotlari", "Исследования мира", "和平研究", "Barış Çalışmaları", "دراسات السلام", "Estudios de paz", "Études sur la paix", "Friedensforschung"],
  ["Marine Technology", "Dengiz texnologiyalari", "Морские технологии", "海洋技术", "Deniz Teknolojisi", "التكنولوجيا البحرية", "Tecnología marina", "Technologie marine", "Meerestechnik"],
  ["Energy", "Energetika", "Энергетика", "能源", "Enerji", "الطاقة", "Energía", "Énergie", "Energie"],
  ["Literature", "Adabiyot", "Литература", "文学", "Edebiyat", "الأدب", "Literatura", "Littérature", "Literatur"],
  ["Biology", "Biologiya", "Биология", "生物学", "Biyoloji", "علم الأحياء", "Biología", "Biologie", "Biologie"],
  ["Biosciences", "Biologiya fanlari", "Биологические науки", "生物科学", "Biyobilimler", "العلوم الحيوية", "Biociencias", "Biosciences", "Biowissenschaften"],
  ["Classics", "Klassik filologiya", "Классическая филология", "古典学", "Klasik Filoloji", "الدراسات الكلاسيكية", "Estudios clásicos", "Lettres classiques", "Klassische Altertumswissenschaft"],
  ["Materials", "Materiallar", "Материалы", "材料", "Malzemeler", "المواد", "Materiales", "Matériaux", "Werkstoffe"],
  ["Microsystems", "Mikrosistemalar", "Микросистемы", "微系统", "Mikrosistemler", "الأنظمة الدقيقة", "Microsistemas", "Microsystèmes", "Mikrosysteme"],
  ["Climate Science", "Iqlim fani", "Наука о климате", "气候科学", "İklim Bilimi", "علوم المناخ", "Ciencias del clima", "Sciences du climat", "Klimawissenschaft"],
  ["Microelectronics", "Mikroelektronika", "Микроэлектроника", "微电子学", "Mikroelektronik", "الإلكترونيات الدقيقة", "Microelectrónica", "Microélectronique", "Mikroelektronik"],
  ["Transport", "Transport", "Транспорт", "交通运输", "Ulaştırma", "النقل", "Transporte", "Transports", "Verkehrswesen"],
  ["Quantum Physics", "Kvant fizikasi", "Квантовая физика", "量子物理学", "Kuantum Fiziği", "فيزياء الكم", "Física cuántica", "Physique quantique", "Quantenphysik"],
  ["Translation", "Tarjimonlik", "Перевод", "翻译学", "Çeviribilim", "الترجمة", "Traducción", "Traduction", "Übersetzungswissenschaft"],
  ["Primatology", "Primatologiya", "Приматология", "灵长类动物学", "Primatoloji", "علم الرئيسيات", "Primatología", "Primatologie", "Primatologie"],
  ["Immunology", "Immunologiya", "Иммунология", "免疫学", "İmmünoloji", "علم المناعة", "Inmunología", "Immunologie", "Immunologie"],
  ["Disaster Science", "Ofatlar fani", "Наука о катастрофах", "灾害科学", "Afet Bilimi", "علوم الكوارث", "Ciencia de desastres", "Science des catastrophes", "Katastrophenforschung"],
  ["International Liberal Studies", "Xalqaro liberal tadqiqotlar", "Международные либеральные исследования", "国际教养学", "Uluslararası Liberal Çalışmalar", "الدراسات الليبرالية الدولية", "Estudios liberales internacionales", "Études libérales internationales", "Internationale Liberal Studies"],
  ["Bio Engineering", "Bioinjeneriya", "Биоинженерия", "生物工程", "Biyomühendislik", "الهندسة الحيوية", "Bioingeniería", "Bio-ingénierie", "Bioingenieurwesen"],
  ["International Studies", "Xalqaro tadqiqotlar", "Международные исследования", "国际研究", "Uluslararası Çalışmalar", "الدراسات الدولية", "Estudios internacionales", "Études internationales", "Internationale Studien"],
  ["Media", "Media", "Медиа", "媒体", "Medya", "الإعلام", "Medios", "Médias", "Medien"],
  ["Chemical Engineering", "Kimyo muhandisligi", "Химическая инженерия", "化学工程", "Kimya Mühendisliği", "الهندسة الكيميائية", "Ingeniería química", "Génie chimique", "Chemieingenieurwesen"],
  ["Textile Technology", "To'qimachilik texnologiyasi", "Текстильная технология", "纺织技术", "Tekstil Teknolojisi", "تكنولوجيا النسيج", "Tecnología textil", "Technologie textile", "Textiltechnik"],
  ["Islamic Studies", "Islomshunoslik", "Исламоведение", "伊斯兰研究", "İslam Araştırmaları", "الدراسات الإسلامية", "Estudios islámicos", "Études islamiques", "Islamwissenschaft"],
  ["Computer Engineering", "Kompyuter injiniringi", "Компьютерная инженерия", "计算机工程", "Bilgisayar Mühendisliği", "هندسة الحاسوب", "Ingeniería informática", "Génie informatique", "Technische Informatik"],
  ["Information Systems", "Axborot tizimlari", "Информационные системы", "信息系统", "Bilgi Sistemleri", "نظم المعلومات", "Sistemas de información", "Systèmes d'information", "Informationssysteme"],
  ["Logistics", "Logistika", "Логистика", "物流学", "Lojistik", "اللوجستيات", "Logística", "Logistique", "Logistik"],
  ["Commercial Law", "Tijorat huquqi", "Коммерческое право", "商法", "Ticaret Hukuku", "القانون التجاري", "Derecho comercial", "Droit commercial", "Handelsrecht"],
  ["IT", "IT", "ИТ", "信息技术", "Bilişim Teknolojileri", "تقنية المعلومات", "TI", "Informatique", "IT"],
  ["Solar Energy", "Quyosh energiyasi", "Солнечная энергетика", "太阳能", "Güneş Enerjisi", "الطاقة الشمسية", "Energía solar", "Énergie solaire", "Solarenergie"],
  ["Mining Engineering", "Konchilik muhandisligi", "Горная инженерия", "矿业工程", "Maden Mühendisliği", "هندسة التعدين", "Ingeniería de minas", "Génie minier", "Bergbauingenieurwesen"],
  ["Wine Science", "Vinochilik fani", "Энология", "葡萄酒学", "Şarap Bilimi", "علوم النبيذ", "Enología", "Œnologie", "Weinwissenschaft"],
  ["Zoology", "Zoologiya", "Зоология", "动物学", "Zooloji", "علم الحيوان", "Zoología", "Zoologie", "Zoologie"],
  ["Antarctic Studies", "Antarktika tadqiqotlari", "Антарктические исследования", "南极研究", "Antarktika Çalışmaları", "دراسات القارة القطبية الجنوبية", "Estudios antárticos", "Études antarctiques", "Antarktisforschung"],
];

/**
 * Descriptions of the best-known universities, written by hand. Uzbek is done; the other languages are left
 * empty on purpose (an empty cell is skipped), so those visitors still get the AI translation for now.
 * The descriptions of the other curated universities follow one template and are handled in `profileSentence`.
 */
const DESCRIPTION_ROWS: readonly Row[] = [
  ["The oldest institution of higher learning in the United States, founded in 1636. Harvard practises need-blind admission for international applicants and meets 100% of demonstrated financial need without loans.", "AQSHdagi eng qadimgi oliy ta'lim muassasasi, 1636-yilda tashkil etilgan. Harvard xalqaro abituriyentlarni qabul qilishda moliyaviy ahvolni hisobga olmaydi (need-blind) va talabaning aniqlangan moliyaviy ehtiyojining 100 foizini qarzsiz qoplaydi.", "", "", "", "", "", "", ""],
  ["A research university founded in 1861 and organised around five schools. MIT is need-blind for all applicants, including international students, and awards aid purely on demonstrated need.", "1861-yilda tashkil etilgan, beshta maktab (school) atrofida tuzilgan tadqiqot universiteti. MIT barcha abituriyentlar, jumladan xalqaro talabalar uchun ham moliyaviy ahvolni hisobga olmaydi (need-blind) va yordamni faqat aniqlangan ehtiyojga qarab beradi.", "", "", "", "", "", "", ""],
  ["Founded in 1885 in the heart of Silicon Valley, Stanford hosts the Knight-Hennessy Scholars programme and offers need-based aid to international undergraduates.", "1885-yilda Silikon vodiysi markazida tashkil etilgan Stanford Knight-Hennessy Scholars dasturiga mezbonlik qiladi va xalqaro bakalavr talabalariga ehtiyojga asoslangan yordam taklif qiladi.", "", "", "", "", "", "", ""],
  ["Teaching existed at Oxford in some form from 1096, making it the oldest university in the English-speaking world. Its collegiate tutorial system and the Rhodes and Clarendon scholarships serve international students.", "Oksfordda o'qitish qandaydir shaklda 1096-yildan beri mavjud, shu bois u ingliz tilida so'zlashuvchi dunyodagi eng qadimgi universitet hisoblanadi. Uning kollejlarga asoslangan tyutorlik tizimi hamda Rhodes va Clarendon stipendiyalari xalqaro talabalarga xizmat qiladi.", "", "", "", "", "", "", ""],
  ["Founded in 1826 as the first university in London and the first in England to admit students of any religion, UCL is a member of the Russell Group with strong global research output.", "1826-yilda Londondagi birinchi universitet va Angliyada har qanday din vakillarini qabul qilgan birinchi universitet sifatida tashkil etilgan UCL Russell Group a'zosi bo'lib, jahon miqyosida kuchli tadqiqot natijalariga ega.", "", "", "", "", "", "", ""],
  ["Established in 1827, U of T is Canada's largest research university and the birthplace of insulin and modern deep-learning research. The Lester B. Pearson Scholarship fully funds international undergraduates.", "1827-yilda tashkil etilgan U of T Kanadaning eng yirik tadqiqot universiteti, insulin va zamonaviy chuqur o'rganish (deep learning) tadqiqotlarining beshigi. Lester B. Pearson stipendiyasi xalqaro bakalavr talabalarining barcha xarajatlarini qoplaydi.", "", "", "", "", "", "", ""],
  ["Founded in 1908, UBC runs the International Scholars Programs, which include the Karen McKellin International Leader of Tomorrow Award covering full need for international undergraduates.", "1908-yilda tashkil etilgan UBC International Scholars Programs dasturlarini olib boradi; ular orasida Karen McKellin International Leader of Tomorrow Award xalqaro bakalavr talabalarining to'liq ehtiyojini qoplaydi.", "", "", "", "", "", "", ""],
  ["Founded in 1868, TUM is a German Universities of Excellence institution. Tuition for most programmes is limited to modest semester fees, with additional support available through DAAD.", "1868-yilda tashkil etilgan TUM Germaniyaning Universities of Excellence (ustunlik universitetlari) qatoridagi muassasa. Ko'pchilik dasturlarda o'qish uchun faqat arzimas semestr yig'imlari to'lanadi, qo'shimcha yordamni DAAD orqali olish mumkin.", "", "", "", "", "", "", ""],
  ["Germany's oldest university, founded in 1386. Baden-Württemberg charges a modest fee for non-EU students, and DAAD funding is widely used by international scholars here.", "Germaniyaning eng qadimgi universiteti, 1386-yilda tashkil etilgan. Baden-Württemberg Yevropa Ittifoqiga a'zo bo'lmagan davlatlarning talabalaridan arzimas yig'im oladi, bu yerdagi xalqaro talabalar orasida DAAD mablag'laridan keng foydalaniladi.", "", "", "", "", "", "", ""],
  ["Founded in 1855 as the Swiss Federal Polytechnic, ETH Zurich counts 20+ Nobel laureates among its affiliates and charges famously low public tuition.", "1855-yilda Shveytsariya federal politexnika instituti sifatida tashkil etilgan ETH Zurich bilan bog'liq 20 dan ortiq Nobel mukofoti sovrindori bor va u davlat o'qish haqining juda pastligi bilan mashhur.", "", "", "", "", "", "", ""],
  ["Founded in 1902 as Italy's first university to grant a degree in economics. Bocconi awards merit-based tuition waivers and full scholarships to top international applicants.", "1902-yilda Italiyada iqtisodiyot bo'yicha daraja bergan birinchi universitet sifatida tashkil etilgan. Bocconi eng yaxshi xalqaro abituriyentlarga akademik yutuqlarga asoslangan o'qish haqi chegirmalari va to'liq stipendiyalar beradi.", "", "", "", "", "", "", ""],
  ["Founded in 1911 on the former Qing dynasty royal gardens. Tsinghua hosts the Schwarzman Scholars programme and is a primary destination for Chinese Government Scholarship (CSC) recipients.", "1911-yilda Qing sulolasining sobiq qirollik bog'lari o'rnida tashkil etilgan. Tsinghua Schwarzman Scholars dasturiga mezbonlik qiladi va Xitoy hukumati stipendiyasi (CSC) sovrindorlarining asosiy yo'nalishlaridan biri.", "", "", "", "", "", "", ""],
  ["Established in 1898 as the Imperial University of Peking, it is China's first modern national university and a major CSC and Yenching Academy host institution.", "1898-yilda Pekin imperator universiteti sifatida tashkil etilgan; u Xitoyning birinchi zamonaviy milliy universiteti hamda CSC va Yenching Academy dasturlarining yirik mezbon muassasasi.", "", "", "", "", "", "", ""],
  ["Founded in 1877, the University of Tokyo is Japan's leading research university and the main destination for MEXT scholarship students in the PEAK and global programmes.", "1877-yilda tashkil etilgan Tokio universiteti Yaponiyaning yetakchi tadqiqot universiteti va PEAK hamda global dasturlardagi MEXT stipendiyasi talabalarining asosiy manzili.", "", "", "", "", "", "", ""],
  ["Founded in 1905 as a medical school, NUS is Singapore's flagship university and offers the ASEAN Undergraduate Scholarship and Science & Technology Undergraduate Scholarship to internationals.", "1905-yilda tibbiyot maktabi sifatida tashkil etilgan NUS Singapurning bosh universiteti bo'lib, xalqaro talabalarga ASEAN Undergraduate Scholarship va Science & Technology Undergraduate Scholarship stipendiyalarini taklif qiladi.", "", "", "", "", "", "", ""],
  ["Established in 1946 as Korea's first national university. SNU participates in the Global Korea Scholarship (GKS), which covers tuition, airfare and living stipends.", "1946-yilda Koreyaning birinchi milliy universiteti sifatida tashkil etilgan. SNU Global Korea Scholarship (GKS) dasturida ishtirok etadi; bu stipendiya o'qish haqi, aviachipta va yashash uchun oylik to'lovlarni qoplaydi.", "", "", "", "", "", "", ""],
  ["Founded in 1853, Melbourne is Australia's second-oldest university and offers the Melbourne International Undergraduate Scholarship as well as Australia Awards placements.", "1853-yilda tashkil etilgan Melburn universiteti Avstraliyaning ikkinchi eng qadimgi universiteti bo'lib, Melbourne International Undergraduate Scholarship hamda Australia Awards o'rinlarini taklif qiladi.", "", "", "", "", "", "", ""],
  ["Founded in 1883, Auckland is New Zealand's largest university and administers the University of Auckland International Student Excellence Scholarship.", "1883-yilda tashkil etilgan Oklend universiteti Yangi Zelandiyaning eng yirik universiteti bo'lib, University of Auckland International Student Excellence Scholarship stipendiyasini boshqaradi.", "", "", "", "", "", "", ""],
  ["Founded in 1885, ASU is one of the largest public universities in the United States and awards automatic merit scholarships to qualifying international freshmen.", "1885-yilda tashkil etilgan ASU AQSHdagi eng yirik davlat universitetlaridan biri bo'lib, talablarga javob beradigan xalqaro birinchi kurs talabalariga avtomatik akademik stipendiyalar beradi.", "", "", "", "", "", "", ""],
  ["Founded in 1816, the University of Warsaw is Poland's largest university, known for its world-champion competitive programming teams and low-cost English-taught programmes.", "1816-yilda tashkil etilgan Varshava universiteti Polshaning eng yirik universiteti; u dunyo chempioni bo'lgan sport dasturlash jamoalari va ingliz tilida o'qitiladigan arzon dasturlari bilan tanilgan.", "", "", "", "", "", "", ""],
  ["Türkiye's first private non-profit university, founded in 1984. Bilkent teaches entirely in English and awards comprehensive merit scholarships covering full tuition plus a monthly stipend to high-scoring international applicants.", "1984-yilda tashkil etilgan Turkiyaning birinchi xususiy notijorat universiteti. Bilkent butunlay ingliz tilida o'qitadi va yuqori ball to'plagan xalqaro abituriyentlarga to'liq o'qish haqi hamda oylik stipendiyani qoplaydigan keng qamrovli akademik stipendiyalar beradi.", "", "", "", "", "", "", ""],
  ["The Tashkent campus of Webster University (St. Louis, USA), offering fully accredited American degrees in Uzbekistan with transfer pathways to Webster's global campus network.", "Webster University (Sent-Luis, AQSH) ning Toshkent kampusi; O'zbekistonda to'liq akkreditatsiyadan o'tgan Amerika darajalarini taklif qiladi va Webster'ning global kampuslar tarmog'iga o'tish imkoniyatlarini beradi.", "", "", "", "", "", "", ""],
  ["A public research university in Berlin charging no tuition fees — only a semester contribution of roughly €350 — with a large catalogue of English-taught master's programmes in engineering and informatics.", "Berlindagi davlat tadqiqot universiteti; o'qish haqi olmaydi, faqat taxminan €350 semestr yig'imi to'lanadi, muhandislik va informatika bo'yicha ingliz tilidagi magistratura dasturlarining keng ro'yxatiga ega.", "", "", "", "", "", "", ""],
  ["A large public university in Montréal known for co-op placements, an internationally diverse student body and one of Canada's most affordable big-city cost bases.", "Monrealdagi yirik davlat universiteti; kooperativ (co-op) amaliyotlari, xalqaro jihatdan rang-barang talabalar jamoasi va Kanadaning yirik shaharlari orasida eng arzon yashash xarajatlaridan biri bilan tanilgan.", "", "", "", "", "", "", ""],
  ["Estonia's national university, founded in 1632, and the anchor of Europe's most digital society. Offers English-taught degrees with tuition waivers and stipends for top-ranked international applicants.", "Estoniyaning milliy universiteti, 1632-yilda tashkil etilgan va Yevropaning eng raqamlashgan jamiyati tayanchi. Ingliz tilidagi darajalarni taklif qiladi, eng yaxshi xalqaro abituriyentlarga o'qish haqidan ozod qilish va stipendiyalar beradi.", "", "", "", "", "", "", ""],
  ["A global technology and design university headquartered in central Melbourne, with industry-embedded programmes and international merit scholarships of 20–50% tuition.", "Melburn markazida joylashgan global texnologiya va dizayn universiteti; sanoat bilan chambarchas bog'liq dasturlari va o'qish haqining 20–50 foizini qoplaydigan xalqaro akademik stipendiyalari bor.", "", "", "", "", "", "", ""],
];

type Table = Record<StaticLang, Map<string, string>>;

function buildTable(...groups: (readonly Row[])[]): Table {
  const table = Object.fromEntries(STATIC_LANGS.map((l) => [l, new Map<string, string>()])) as Table;
  for (const rows of groups) {
    for (const row of rows) {
      STATIC_LANGS.forEach((lang, i) => {
        const value = row[i + 1];
        if (value) table[lang].set(row[0], value);
      });
    }
  }
  return table;
}

/**
 * Strings of the optional deeper analysis (hand-written; one row per sentence).
 */
const DEEP_ROWS: readonly Row[] = [
  ["Bachelor's degree", "Bakalavr darajasi", "Бакалавриат", "本科", "Lisans", "درجة البكالوريوس", "Grado universitario", "Licence (bachelor)", "Bachelorstudium"],
  ["Master's degree", "Magistr darajasi", "Магистратура", "硕士", "Yüksek lisans", "درجة الماجستير", "Máster", "Master", "Masterstudium"],
  ["Improving", "Yaxshilanmoqda", "Растут", "在提高", "Yükseliyor", "في تحسّن", "Mejorando", "En amélioration", "Verbessert sich"],
  ["Steady", "Barqaror", "Стабильны", "保持稳定", "Sabit", "مستقرة", "Estables", "Stables", "Konstant"],
  ["Declining", "Pasayib bormoqda", "Снижаются", "在下降", "Düşüyor", "في تراجع", "Bajando", "En baisse", "Sinkt"],
  ["None", "Yo'q", "Нет", "无", "Yok", "لا يوجد", "Ninguno", "Aucun", "Keine"],
  ["School level", "Maktab darajasida", "Уровень школы", "校级", "Okul düzeyi", "على مستوى المدرسة", "Nivel escolar", "Niveau scolaire", "Schulebene"],
  ["National level", "Milliy darajada", "Национальный уровень", "国家级", "Ulusal düzey", "على المستوى الوطني", "Nivel nacional", "Niveau national", "Nationale Ebene"],
  ["International level", "Xalqaro darajada", "Международный уровень", "国际级", "Uluslararası düzey", "على المستوى الدولي", "Nivel internacional", "Niveau international", "Internationale Ebene"],
  ["A project or lab work", "Loyiha yoki laboratoriya ishi", "Проект или лабораторная работа", "项目或实验室工作", "Bir proje veya laboratuvar çalışması", "مشروع أو عمل مخبري", "Un proyecto o trabajo de laboratorio", "Un projet ou un travail de laboratoire", "Ein Projekt oder Laborarbeit"],
  ["Published or presented work", "Nashr etilgan yoki taqdim etilgan ish", "Опубликованная или представленная работа", "已发表或已展示的成果", "Yayımlanmış veya sunulmuş çalışma", "عمل منشور أو مُقدَّم", "Trabajo publicado o presentado", "Travail publié ou présenté", "Veröffentlichte oder vorgestellte Arbeit"],
  ["Some", "Biroz", "Немного", "一些", "Biraz", "بعض الخبرة", "Algo", "Un peu", "Etwas"],
  ["Substantial", "Katta tajriba", "Значительный", "丰富", "Kapsamlı", "خبرة كبيرة", "Considerable", "Important", "Umfangreich"],
  ["None yet", "Hali yo'q", "Пока нет", "暂时没有", "Henüz yok", "لا شيء بعد", "Todavía ninguna", "Pas encore", "Noch keine"],
  ["One is ready", "Bittasi tayyor", "Одна готова", "已有一封", "Biri hazır", "واحدة جاهزة", "Una está lista", "Une est prête", "Eine ist fertig"],
  ["Two are ready", "Ikkitasi tayyor", "Две готовы", "已有两封", "İkisi hazır", "اثنتان جاهزتان", "Dos están listas", "Deux sont prêtes", "Zwei sind fertig"],
  ["Not started", "Boshlanmagan", "Не начато", "尚未开始", "Başlanmadı", "لم يبدأ", "Sin empezar", "Pas commencé", "Nicht begonnen"],
  ["Draft", "Qoralama", "Черновик", "草稿", "Taslak", "مسودة", "Borrador", "Brouillon", "Entwurf"],
  ["Polished", "Sayqallangan", "Отточено", "已打磨完善", "Cilalanmış", "مصقول", "Pulido", "Finalisé", "Ausgefeilt"],
  ["Scholarships", "Stipendiyalar", "Стипендии", "奖学金", "Burslar", "المنح الدراسية", "Becas", "Bourses", "Stipendien"],
  ["High ranking", "Yuqori reyting", "Высокий рейтинг", "高排名", "Yüksek sıralama", "تصنيف مرتفع", "Ranking alto", "Classement élevé", "Hohes Ranking"],
  ["Work after graduation", "Bitirgach ishlash", "Работа после выпуска", "毕业后工作", "Mezuniyet sonrası çalışma", "العمل بعد التخرج", "Trabajo tras graduarse", "Travail après les études", "Arbeit nach dem Abschluss"],
  ["Low cost", "Arzon narx", "Низкая стоимость", "低成本", "Düşük maliyet", "تكلفة منخفضة", "Bajo coste", "Faible coût", "Niedrige Kosten"],
  ["Set a budget to compare", "Solishtirish uchun byudjetni kiriting", "Укажите бюджет для сравнения", "设置预算以便比较", "Karşılaştırmak için bütçe girin", "حدّد ميزانية للمقارنة", "Indica un presupuesto para comparar", "Indiquez un budget pour comparer", "Budget angeben, um zu vergleichen"],
  ["Within your budget", "Byudjetingiz doirasida", "В пределах бюджета", "在预算范围内", "Bütçenizin içinde", "ضمن ميزانيتك", "Dentro de tu presupuesto", "Dans votre budget", "Innerhalb Ihres Budgets"],
  ["Slightly above your budget", "Byudjetdan biroz yuqori", "Немного выше бюджета", "略高于预算", "Bütçenizin biraz üzerinde", "أعلى قليلًا من ميزانيتك", "Algo por encima de tu presupuesto", "Légèrement au-dessus de votre budget", "Etwas über Ihrem Budget"],
  ["Above budget, but aid is offered", "Byudjetdan yuqori, lekin yordam taklif qilinadi", "Выше бюджета, но есть финансовая помощь", "超出预算，但提供资助", "Bütçenin üzerinde, ancak destek sunuluyor", "أعلى من الميزانية لكن تتوفر مساعدات", "Por encima del presupuesto, pero ofrece ayuda", "Au-dessus du budget, mais une aide est proposée", "Über dem Budget, aber Förderung wird angeboten"],
  ["Above your budget", "Byudjetingizdan yuqori", "Выше вашего бюджета", "超出预算", "Bütçenizin üzerinde", "أعلى من ميزانيتك", "Por encima de tu presupuesto", "Au-dessus de votre budget", "Über Ihrem Budget"],
  ["The advice could not be created. Please try again.", "Maslahatni yaratib bo'lmadi. Qayta urinib ko'ring.", "Не удалось создать совет. Попробуйте ещё раз.", "无法生成建议，请重试。", "Öneri oluşturulamadı. Lütfen tekrar deneyin.", "تعذّر إنشاء النصيحة. يُرجى المحاولة مرة أخرى.", "No se pudo crear el consejo. Inténtalo de nuevo.", "Le conseil n'a pas pu être créé. Veuillez réessayer.", "Der Rat konnte nicht erstellt werden. Bitte versuchen Sie es erneut."],
  ["Deeper analysis", "Chuqur tahlil", "Углублённый анализ", "深度分析", "Derin analiz", "تحليل أعمق", "Análisis más profundo", "Analyse approfondie", "Tiefere Analyse"],
  ["Optional. Answer a few more questions to get a readiness report, a personal to-do list and a budget check for your best matches.", "Ixtiyoriy. Yana bir nechta savolga javob bering: tayyorgarlik hisoboti, shaxsiy vazifalar ro'yxati va eng mos universitetlar uchun byudjet tekshiruvini olasiz.", "По желанию. Ответьте ещё на несколько вопросов и получите отчёт о готовности, личный список задач и проверку бюджета для лучших вариантов.", "可选。再回答几个问题，即可获得申请准备度报告、个人待办清单，以及最佳匹配院校的预算核对。", "İsteğe bağlı. Birkaç soruyu daha yanıtlayın; hazırlık raporu, kişisel yapılacaklar listesi ve en iyi eşleşmeleriniz için bütçe kontrolü alın.", "اختياري. أجب عن بضعة أسئلة إضافية لتحصل على تقرير الجاهزية وقائمة مهام شخصية وفحص للميزانية لأفضل الجامعات المطابقة.", "Opcional. Responde unas preguntas más y obtén un informe de preparación, una lista de tareas personal y una revisión de presupuesto para tus mejores opciones.", "Facultatif. Répondez à quelques questions de plus pour obtenir un bilan de préparation, une liste de tâches personnelle et une vérification du budget pour vos meilleures options.", "Optional. Beantworten Sie ein paar weitere Fragen und erhalten Sie einen Bereitschaftsbericht, eine persönliche To-do-Liste und einen Budgetcheck für Ihre besten Treffer."],
  ["Hide", "Yashirish", "Скрыть", "收起", "Gizle", "إخفاء", "Ocultar", "Masquer", "Ausblenden"],
  ["Start deeper analysis", "Chuqur tahlilni boshlash", "Начать углублённый анализ", "开始深度分析", "Derin analizi başlat", "ابدأ التحليل الأعمق", "Empezar el análisis profundo", "Commencer l'analyse approfondie", "Tiefere Analyse starten"],
  ["What are you applying for?", "Nimaga hujjat topshiryapsiz?", "На какую программу вы поступаете?", "你申请的是什么学位？", "Hangi programa başvuruyorsunuz?", "على أي برنامج تتقدّم؟", "¿A qué nivel te presentas?", "À quel niveau candidatez-vous ?", "Wofür bewerben Sie sich?"],
  ["How are your grades changing?", "Baholaringiz qanday o'zgarmoqda?", "Как меняются ваши оценки?", "你的成绩变化趋势如何？", "Notlarınız nasıl değişiyor?", "كيف تتغيّر درجاتك؟", "¿Cómo evolucionan tus notas?", "Comment évoluent vos notes ?", "Wie entwickeln sich Ihre Noten?"],
  ["Highest award or competition result", "Eng yuqori mukofot yoki tanlov natijasi", "Высшая награда или результат конкурса", "最高奖项或竞赛成绩", "En yüksek ödül veya yarışma sonucu", "أعلى جائزة أو نتيجة في مسابقة", "Mayor premio o resultado en concursos", "Meilleure récompense ou résultat de concours", "Höchste Auszeichnung oder Wettbewerbsplatzierung"],
  ["Research or project work", "Tadqiqot yoki loyiha ishi", "Исследования или проекты", "研究或项目经历", "Araştırma veya proje çalışması", "بحث أو أعمال مشاريع", "Investigación o proyectos", "Recherche ou projets", "Forschung oder Projektarbeit"],
  ["Internships, volunteering or work", "Stajirovka, volontyorlik yoki ish", "Стажировки, волонтёрство или работа", "实习、志愿服务或工作", "Staj, gönüllülük veya iş", "تدريب أو تطوّع أو عمل", "Prácticas, voluntariado o trabajo", "Stages, bénévolat ou emploi", "Praktika, Ehrenamt oder Arbeit"],
  ["Personal statement", "Shaxsiy bayonot (esse)", "Мотивационное эссе", "个人陈述", "Kişisel yazı (statement)", "البيان الشخصي", "Carta de motivación", "Lettre de motivation", "Persönliches Statement"],
  ["Yearly budget in USD, tuition and living together", "Yillik byudjet (USD), o'qish va yashash birga", "Годовой бюджет в USD: обучение и проживание вместе", "年度预算（美元），学费与生活费合计", "Yıllık bütçe (USD), öğrenim ve yaşam birlikte", "الميزانية السنوية بالدولار، الرسوم والمعيشة معًا", "Presupuesto anual en USD, matrícula y vida juntas", "Budget annuel en USD, frais de scolarité et vie réunis", "Jahresbudget in USD, Studiengebühren und Lebenshaltung zusammen"],
  ["What matters most? Pick up to two", "Nima eng muhim? Ikkitagacha tanlang", "Что важнее всего? Выберите до двух", "最看重什么？最多选两项", "En önemli olan ne? En fazla iki seçin", "ما الأهم لك؟ اختر حتى اثنين", "¿Qué es lo más importante? Elige hasta dos", "Qu'est-ce qui compte le plus ? Choisissez-en deux au maximum", "Was ist am wichtigsten? Wählen Sie bis zu zwei"],
  ["Anything else we should know? Only used for AI advice", "Yana bilishimiz kerak bo'lgan narsa bormi? Faqat AI maslahati uchun ishlatiladi", "Что ещё нам стоит знать? Используется только для совета ИИ", "还有什么需要我们了解的吗？仅用于AI建议", "Bilmemiz gereken başka bir şey var mı? Yalnızca yapay zekâ önerisi için kullanılır", "هل هناك ما يجب أن نعرفه؟ يُستخدم فقط لنصيحة الذكاء الاصطناعي", "¿Algo más que debamos saber? Solo se usa para el consejo de IA", "Autre chose à savoir ? Utilisé uniquement pour le conseil de l'IA", "Gibt es noch etwas, das wir wissen sollten? Nur für den KI-Rat verwendet"],
  ["Analyse my profile", "Profilimni tahlil qilish", "Проанализировать мой профиль", "分析我的档案", "Profilimi analiz et", "حلّل ملفي", "Analizar mi perfil", "Analyser mon profil", "Mein Profil analysieren"],
  ["Application readiness", "Hujjat topshirishga tayyorlik", "Готовность к подаче", "申请准备度", "Başvuru hazırlığı", "جاهزية التقديم", "Preparación de la solicitud", "Préparation de la candidature", "Bewerbungsreife"],
  ["Your strengths", "Kuchli tomonlaringiz", "Ваши сильные стороны", "你的优势", "Güçlü yönleriniz", "نقاط قوتك", "Tus puntos fuertes", "Vos points forts", "Ihre Stärken"],
  ["Answer more questions to see your strengths.", "Kuchli tomonlaringizni ko'rish uchun ko'proq savolga javob bering.", "Ответьте на больше вопросов, чтобы увидеть сильные стороны.", "回答更多问题即可查看你的优势。", "Güçlü yönlerinizi görmek için daha fazla soru yanıtlayın.", "أجب عن مزيد من الأسئلة لترى نقاط قوتك.", "Responde más preguntas para ver tus puntos fuertes.", "Répondez à plus de questions pour voir vos points forts.", "Beantworten Sie mehr Fragen, um Ihre Stärken zu sehen."],
  ["What to improve", "Nimani yaxshilash kerak", "Что стоит улучшить", "需要改进的地方", "Geliştirilecek noktalar", "ما يجب تحسينه", "Qué mejorar", "À améliorer", "Was zu verbessern ist"],
  ["No major gaps found.", "Jiddiy kamchiliklar topilmadi.", "Серьёзных пробелов не найдено.", "未发现明显不足。", "Önemli bir eksik bulunamadı.", "لم يتم العثور على ثغرات كبيرة.", "No se encontraron carencias importantes.", "Aucune lacune majeure détectée.", "Keine größeren Lücken gefunden."],
  ["Your to-do list", "Vazifalar ro'yxatingiz", "Ваш список задач", "你的待办清单", "Yapılacaklar listeniz", "قائمة مهامك", "Tu lista de tareas", "Votre liste de tâches", "Ihre To-do-Liste"],
  ["Best matches for your priorities and budget", "Ustuvorliklaringiz va byudjetingizga eng mos variantlar", "Лучшие варианты по вашим приоритетам и бюджету", "最符合你的优先事项和预算的院校", "Öncelikleriniz ve bütçenize en uygun eşleşmeler", "أفضل الجامعات المطابقة لأولوياتك وميزانيتك", "Mejores opciones según tus prioridades y presupuesto", "Meilleures options selon vos priorités et votre budget", "Beste Treffer für Ihre Prioritäten und Ihr Budget"],
  ["Costs are planning estimates: tuition plus typical living costs, before any aid. Confirm them on the official website.", "Narxlar taxminiy: o'qish haqi va odatdagi yashash xarajatlari, yordamdan oldin. Rasmiy saytda tasdiqlang.", "Стоимость — ориентировочная: обучение плюс типичные расходы на жизнь, до учёта помощи. Уточняйте на официальном сайте.", "费用为规划估算：学费加典型生活费，未计资助。请在官网核实。", "Maliyetler planlama tahminidir: öğrenim ücreti artı tipik yaşam giderleri, destek öncesi. Resmî web sitesinden doğrulayın.", "التكاليف تقديرات تخطيطية: الرسوم الدراسية مع تكاليف المعيشة المعتادة قبل أي دعم. تأكد منها على الموقع الرسمي.", "Los costes son estimaciones: matrícula más gastos de vida habituales, antes de ayudas. Confírmalos en el sitio oficial.", "Les coûts sont des estimations : frais de scolarité plus coût de la vie habituel, avant toute aide. Vérifiez-les sur le site officiel.", "Die Kosten sind Planungsschätzungen: Studiengebühren plus übliche Lebenshaltungskosten, vor jeder Förderung. Bitte auf der offiziellen Website prüfen."],
  ["Estimated yearly cost", "Taxminiy yillik xarajat", "Ориентировочные расходы в год", "预计年度费用", "Tahmini yıllık maliyet", "التكلفة السنوية التقديرية", "Coste anual estimado", "Coût annuel estimé", "Geschätzte Jahreskosten"],
  ["Personal AI advice", "Shaxsiy AI maslahati", "Персональный совет ИИ", "个性化AI建议", "Kişisel yapay zekâ önerisi", "نصيحة شخصية من الذكاء الاصطناعي", "Consejo personal de IA", "Conseil personnalisé de l'IA", "Persönlicher KI-Rat"],
  ["Optional. Your profile summary and answers are sent to an AI advisor. Your name is not sent. It needs you to sign in.", "Ixtiyoriy. Profil xulosangiz va javoblaringiz AI maslahatchiga yuboriladi. Ismingiz yuborilmaydi. Tizimga kirish kerak.", "По желанию. Сводка профиля и ответы отправляются ИИ-консультанту. Имя не передаётся. Нужен вход в аккаунт.", "可选。你的档案摘要和回答会发送给AI顾问，不会发送你的姓名。需要登录。", "İsteğe bağlı. Profil özetiniz ve yanıtlarınız bir yapay zekâ danışmanına gönderilir. Adınız gönderilmez. Giriş yapmanız gerekir.", "اختياري. يُرسل ملخص ملفك وإجاباتك إلى مستشار ذكاء اصطناعي. لا يُرسل اسمك. يتطلب تسجيل الدخول.", "Opcional. El resumen de tu perfil y tus respuestas se envían a un asesor de IA. Tu nombre no se envía. Requiere iniciar sesión.", "Facultatif. Le résumé de votre profil et vos réponses sont envoyés à un conseiller IA. Votre nom n'est pas envoyé. Connexion requise.", "Optional. Ihre Profilzusammenfassung und Antworten werden an einen KI-Berater gesendet. Ihr Name wird nicht gesendet. Anmeldung erforderlich."],
  ["Get AI advice", "AI maslahati olish", "Получить совет ИИ", "获取AI建议", "Yapay zekâ önerisi al", "احصل على نصيحة الذكاء الاصطناعي", "Obtener consejo de IA", "Obtenir un conseil de l'IA", "KI-Rat erhalten"],
  ["Sign in for AI advice", "AI maslahati uchun kiring", "Войдите, чтобы получить совет ИИ", "登录以获取AI建议", "Yapay zekâ önerisi için giriş yapın", "سجّل الدخول للحصول على نصيحة الذكاء الاصطناعي", "Inicia sesión para el consejo de IA", "Connectez-vous pour le conseil de l'IA", "Für KI-Rat anmelden"],
  ["answered", "javob berildi", "отвечено", "已回答", "yanıtlandı", "تمت الإجابة", "respondidas", "répondu", "beantwortet"],
  ["Academic record", "Akademik natijalar", "Успеваемость", "学业成绩", "Akademik geçmiş", "السجل الأكاديمي", "Expediente académico", "Dossier académique", "Akademische Leistungen"],
  ["Achievements and experience", "Yutuqlar va tajriba", "Достижения и опыт", "成就与经历", "Başarılar ve deneyim", "الإنجازات والخبرة", "Logros y experiencia", "Réalisations et expérience", "Erfolge und Erfahrung"],
  ["Application materials", "Hujjatlar to'plami", "Документы для подачи", "申请材料", "Başvuru materyalleri", "مواد التقديم", "Materiales de la solicitud", "Pièces du dossier", "Bewerbungsunterlagen"],
  ["Funding fit", "Moliyaviy mosligi", "Соответствие бюджету", "资金匹配度", "Finansal uyum", "ملاءمة التمويل", "Encaje financiero", "Adéquation financière", "Finanzielle Passung"],
  ["A strong academic record", "Kuchli akademik natijalar", "Сильная успеваемость", "学业成绩优秀", "Güçlü bir akademik geçmiş", "سجل أكاديمي قوي", "Un expediente académico sólido", "Un solide dossier académique", "Starke akademische Leistungen"],
  ["The academic record is below what most of your matches expect", "Akademik natijalar ko'p mos universitetlar kutganidan past", "Успеваемость ниже ожиданий большинства подходящих вузов", "学业成绩低于多数匹配院校的预期", "Akademik geçmiş, eşleşmelerinizin çoğunun beklentisinin altında", "السجل الأكاديمي أدنى مما تتوقعه معظم الجامعات المطابقة", "El expediente está por debajo de lo que esperan la mayoría de tus opciones", "Le dossier est en deçà des attentes de la plupart de vos options", "Die Leistungen liegen unter den Erwartungen der meisten Ihrer Treffer"],
  ["Your grades are improving, which admissions readers notice", "Baholaringiz yaxshilanmoqda, buni qabul komissiyasi sezadi", "Ваши оценки растут, и приёмная комиссия это замечает", "你的成绩在提高，招生官会注意到这一点", "Notlarınız yükseliyor ve kabul komiteleri bunu fark eder", "درجاتك في تحسّن وهذا يلفت انتباه لجان القبول", "Tus notas mejoran y los comités de admisión lo notan", "Vos notes progressent, ce que les jurys remarquent", "Ihre Noten verbessern sich, das fällt den Zulassungsstellen auf"],
  ["Your grades are trending down", "Baholaringiz pasayib bormoqda", "Ваши оценки снижаются", "你的成绩呈下降趋势", "Notlarınız düşüş eğiliminde", "درجاتك في تراجع", "Tus notas van a la baja", "Vos notes sont en baisse", "Ihre Noten sinken"],
  ["Add a short note in your application explaining the dip and what changed", "Arizangizga pasayish sababi va nima o'zgargani haqida qisqa izoh qo'shing", "Добавьте в заявку короткое пояснение, почему оценки снизились и что изменилось", "在申请中简要说明成绩下滑的原因以及后来的改变", "Başvurunuza düşüşün nedenini ve neyin değiştiğini açıklayan kısa bir not ekleyin", "أضف ملاحظة قصيرة في طلبك تشرح سبب التراجع وما الذي تغيّر", "Añade una nota breve en tu solicitud explicando el descenso y qué cambió", "Ajoutez une courte note à votre candidature expliquant la baisse et ce qui a changé", "Fügen Sie Ihrer Bewerbung eine kurze Erklärung hinzu, warum die Noten sanken und was sich geändert hat"],
  ["No test score yet", "Test natijasi hali yo'q", "Результатов тестов пока нет", "暂无考试成绩", "Henüz test puanı yok", "لا توجد نتيجة اختبار بعد", "Aún no hay resultado de pruebas", "Pas encore de résultat de test", "Noch kein Testergebnis"],
  ["Book an IELTS, TOEFL or Duolingo test, and the SAT if you apply for a bachelor's degree", "IELTS, TOEFL yoki Duolingo testiga yoziling, bakalavrga topshirsangiz SAT ham", "Запишитесь на IELTS, TOEFL или Duolingo, а для бакалавриата ещё и на SAT", "预约雅思、托福或多邻国考试；申请本科还需预约SAT", "IELTS, TOEFL veya Duolingo sınavına kaydolun; lisans için SAT de", "احجز اختبار IELTS أو TOEFL أو Duolingo، واختبار SAT إذا كنت تتقدّم للبكالوريوس", "Reserva IELTS, TOEFL o Duolingo, y el SAT si pides un grado", "Inscrivez-vous à l'IELTS, au TOEFL ou au Duolingo, et au SAT pour une licence", "Melden Sie sich für IELTS, TOEFL oder Duolingo an, und für den SAT bei einem Bachelor"],
  ["Your test scores are competitive", "Test ballaringiz raqobatbardosh", "Ваши баллы по тестам конкурентоспособны", "你的考试成绩有竞争力", "Test puanlarınız rekabetçi", "درجات اختباراتك تنافسية", "Tus puntuaciones son competitivas", "Vos résultats aux tests sont compétitifs", "Ihre Testergebnisse sind konkurrenzfähig"],
  ["Test scores are below the usual range", "Test ballari odatdagi diapazondan past", "Баллы по тестам ниже обычного диапазона", "考试成绩低于常见分数区间", "Test puanları olağan aralığın altında", "درجات الاختبارات أقل من النطاق المعتاد", "Las puntuaciones están por debajo del rango habitual", "Les résultats sont sous la fourchette habituelle", "Die Testergebnisse liegen unter dem üblichen Bereich"],
  ["Plan a retake after focused preparation", "Maqsadli tayyorgarlikdan keyin qayta topshirishni rejalashtiring", "Запланируйте пересдачу после целенаправленной подготовки", "经过针对性备考后计划重考", "Odaklı hazırlıktan sonra yeniden sınav planlayın", "خطّط لإعادة الاختبار بعد تحضير مركّز", "Planifica repetir la prueba tras una preparación enfocada", "Prévoyez de repasser le test après une préparation ciblée", "Planen Sie eine Wiederholung nach gezielter Vorbereitung"],
  ["Awards at national or international level", "Milliy yoki xalqaro darajadagi mukofotlar", "Награды национального или международного уровня", "国家级或国际级奖项", "Ulusal veya uluslararası düzeyde ödüller", "جوائز على المستوى الوطني أو الدولي", "Premios a nivel nacional o internacional", "Récompenses au niveau national ou international", "Auszeichnungen auf nationaler oder internationaler Ebene"],
  ["Published research", "Nashr etilgan tadqiqot", "Опубликованные исследования", "已发表的研究", "Yayımlanmış araştırma", "بحث منشور", "Investigación publicada", "Recherche publiée", "Veröffentlichte Forschung"],
  ["No research or project work yet", "Tadqiqot yoki loyiha ishi hali yo'q", "Исследований или проектов пока нет", "暂无研究或项目经历", "Henüz araştırma veya proje çalışması yok", "لا يوجد بحث أو مشروع بعد", "Aún no hay investigación ni proyectos", "Pas encore de recherche ni de projet", "Noch keine Forschungs- oder Projektarbeit"],
  ["Start one project or research task you can describe with results", "Natijalari bilan tasvirlay oladigan bitta loyiha yoki tadqiqotni boshlang", "Начните один проект или исследование, о котором можно рассказать с результатами", "开始一个能用成果来说明的项目或研究", "Sonuçlarıyla anlatabileceğiniz bir proje veya araştırma başlatın", "ابدأ مشروعًا أو بحثًا واحدًا يمكنك وصفه بنتائج", "Empieza un proyecto o investigación que puedas describir con resultados", "Lancez un projet ou une recherche que vous pourrez décrire avec des résultats", "Starten Sie ein Projekt oder eine Forschungsarbeit, die Sie mit Ergebnissen beschreiben können"],
  ["No internship, volunteering or work experience", "Stajirovka, volontyorlik yoki ish tajribasi yo'q", "Нет стажировок, волонтёрства или опыта работы", "没有实习、志愿服务或工作经历", "Staj, gönüllülük veya iş deneyimi yok", "لا توجد خبرة تدريب أو تطوّع أو عمل", "Sin prácticas, voluntariado ni experiencia laboral", "Aucun stage, bénévolat ni expérience professionnelle", "Keine Praktika, kein Ehrenamt und keine Berufserfahrung"],
  ["Join one volunteering role or internship before the deadline", "Muddatgacha bitta volontyorlik yoki stajirovkaga qo'shiling", "Найдите волонтёрскую роль или стажировку до дедлайна", "在截止日期前参加一项志愿服务或实习", "Son tarihten önce bir gönüllülük veya staj yapın", "انضم إلى عمل تطوعي أو تدريب قبل الموعد النهائي", "Consigue un voluntariado o unas prácticas antes del plazo", "Rejoignez un bénévolat ou un stage avant la date limite", "Übernehmen Sie vor der Frist eine ehrenamtliche Aufgabe oder ein Praktikum"],
  ["Solid practical experience", "Mustahkam amaliy tajriba", "Солидный практический опыт", "扎实的实践经验", "Sağlam pratik deneyim", "خبرة عملية قوية", "Experiencia práctica sólida", "Solide expérience pratique", "Solide praktische Erfahrung"],
  ["Two recommenders are ready", "Ikki tavsiyachi tayyor", "Два рекомендателя готовы", "已有两位推荐人", "İki referansınız hazır", "لديك موصيان جاهزان", "Tienes dos recomendadores listos", "Deux recommandeurs sont prêts", "Zwei Empfehlungsgeber stehen bereit"],
  ["Recommendation letters are not ready", "Tavsiyanomalar hali tayyor emas", "Рекомендательные письма пока не готовы", "推荐信尚未准备好", "Tavsiye mektupları henüz hazır değil", "خطابات التوصية غير جاهزة بعد", "Las cartas de recomendación no están listas", "Les lettres de recommandation ne sont pas prêtes", "Die Empfehlungsschreiben sind noch nicht fertig"],
  ["Ask two teachers or mentors for recommendation letters now", "Hozir ikki o'qituvchi yoki ustozdan tavsiyanoma so'rang", "Попросите двух учителей или наставников написать рекомендации уже сейчас", "现在就请两位老师或导师写推荐信", "Şimdi iki öğretmen veya mentordan tavsiye mektubu isteyin", "اطلب الآن خطاب توصية من معلمين أو مرشدين اثنين", "Pide ya cartas de recomendación a dos profesores o mentores", "Demandez dès maintenant une lettre de recommandation à deux enseignants ou mentors", "Bitten Sie jetzt zwei Lehrkräfte oder Mentoren um Empfehlungsschreiben"],
  ["Your personal statement is polished", "Shaxsiy bayonotingiz sayqallangan", "Ваше мотивационное эссе отточено", "你的个人陈述已打磨完善", "Kişisel yazınız cilalanmış", "بيانك الشخصي مصقول", "Tu carta de motivación está pulida", "Votre lettre de motivation est finalisée", "Ihr persönliches Statement ist ausgefeilt"],
  ["The personal statement is still a draft", "Shaxsiy bayonot hali qoralama", "Мотивационное эссе пока в виде черновика", "个人陈述仍是草稿", "Kişisel yazı hâlâ taslak", "البيان الشخصي ما زال مسودة", "La carta de motivación sigue en borrador", "La lettre de motivation est encore un brouillon", "Das persönliche Statement ist noch ein Entwurf"],
  ["The personal statement is not started", "Shaxsiy bayonot hali boshlanmagan", "Мотивационное эссе ещё не начато", "个人陈述尚未开始", "Kişisel yazıya henüz başlanmadı", "لم يبدأ البيان الشخصي بعد", "La carta de motivación no está empezada", "La lettre de motivation n'est pas commencée", "Das persönliche Statement ist noch nicht begonnen"],
  ["Write and refine your personal statement with the essay analyzer", "Shaxsiy bayonotingizni esse tahlilchi yordamida yozing va sayqallang", "Напишите и отточите мотивационное эссе с помощью анализатора эссе", "用文书分析工具撰写并打磨你的个人陈述", "Kişisel yazınızı essay analizörüyle yazın ve geliştirin", "اكتب بيانك الشخصي وحسّنه باستخدام محلل المقالات", "Escribe y pule tu carta de motivación con el analizador de ensayos", "Rédigez et peaufinez votre lettre de motivation avec l'analyseur d'essais", "Schreiben und verfeinern Sie Ihr Statement mit dem Essay-Analyzer"],
  ["Set a realistic yearly budget so costs can be checked", "Xarajatlarni tekshirish uchun real yillik byudjetni belgilang", "Укажите реалистичный годовой бюджет, чтобы можно было проверить расходы", "设定一个现实的年度预算，以便核对费用", "Maliyetlerin kontrol edilebilmesi için gerçekçi bir yıllık bütçe belirleyin", "حدّد ميزانية سنوية واقعية حتى يمكن فحص التكاليف", "Fija un presupuesto anual realista para poder comprobar los costes", "Fixez un budget annuel réaliste pour pouvoir vérifier les coûts", "Legen Sie ein realistisches Jahresbudget fest, damit die Kosten geprüft werden können"],
  ["Your budget is below the typical cost of your best matches", "Byudjetingiz eng mos universitetlarning odatdagi narxidan past", "Ваш бюджет ниже типичной стоимости лучших вариантов", "你的预算低于最佳匹配院校的一般费用", "Bütçeniz en iyi eşleşmelerinizin tipik maliyetinin altında", "ميزانيتك أقل من التكلفة المعتادة لأفضل الجامعات المطابقة", "Tu presupuesto está por debajo del coste habitual de tus mejores opciones", "Votre budget est inférieur au coût habituel de vos meilleures options", "Ihr Budget liegt unter den typischen Kosten Ihrer besten Treffer"],
  ["Look at scholarships and lower-cost destinations", "Stipendiyalar va arzonroq yo'nalishlarni ko'rib chiqing", "Рассмотрите стипендии и более дешёвые направления", "关注奖学金和成本更低的留学目的地", "Burslara ve daha düşük maliyetli ülkelere bakın", "اطّلع على المنح والوجهات الأقل تكلفة", "Mira becas y destinos más económicos", "Regardez les bourses et les destinations moins coûteuses", "Schauen Sie sich Stipendien und günstigere Zielländer an"],
  ["Your budget covers the typical cost of your best matches", "Byudjetingiz eng mos universitetlarning odatdagi narxini qoplaydi", "Ваш бюджет покрывает типичную стоимость лучших вариантов", "你的预算可以覆盖最佳匹配院校的一般费用", "Bütçeniz en iyi eşleşmelerinizin tipik maliyetini karşılıyor", "ميزانيتك تغطي التكلفة المعتادة لأفضل الجامعات المطابقة", "Tu presupuesto cubre el coste habitual de tus mejores opciones", "Votre budget couvre le coût habituel de vos meilleures options", "Ihr Budget deckt die typischen Kosten Ihrer besten Treffer"],
  ["Among the world's top 100", "Dunyoning eng yaxshi 100 talligi ichida", "Входит в мировой топ-100", "位列世界前100", "Dünyanın ilk 100'ü arasında", "ضمن أفضل 100 جامعة في العالم", "Entre las 100 mejores del mundo", "Parmi les 100 meilleures du monde", "Unter den weltweiten Top 100"],
  ["The country has a route to work after graduating", "Mamlakatda bitirgandan keyin ishlash yo'li mavjud", "В стране есть путь к работе после выпуска", "该国设有毕业后工作的途径", "Ülkede mezuniyet sonrası çalışma yolu var", "في البلد مسار للعمل بعد التخرج", "El país ofrece una vía para trabajar tras graduarse", "Le pays offre une voie pour travailler après les études", "Das Land bietet einen Weg, nach dem Abschluss zu arbeiten"],
  ["Low yearly cost", "Past yillik xarajat", "Низкая стоимость в год", "年度费用较低", "Düşük yıllık maliyet", "تكلفة سنوية منخفضة", "Coste anual bajo", "Coût annuel faible", "Niedrige Jahreskosten"],
  ["Your goal", "Maqsadingiz", "Ваша цель", "你的目标", "Hedefiniz", "هدفك", "Tu objetivo", "Votre objectif", "Ihr Ziel"],
  ["What you are applying for and what matters most.", "Nimaga topshirayotganingiz va sizga nima eng muhimligi.", "На что вы поступаете и что для вас важнее всего.", "你申请什么，以及你最看重什么。", "Neye başvurduğunuz ve sizin için en önemli olan.", "ما الذي تتقدّم إليه وما الأهم بالنسبة لك.", "A qué te presentas y qué es lo más importante para ti.", "Ce pour quoi vous candidatez et ce qui compte le plus pour vous.", "Wofür Sie sich bewerben und was Ihnen am wichtigsten ist."],
  ["Academics", "Akademik ko'rsatkichlar", "Учёба", "学业", "Akademik başarı", "الأداء الأكاديمي", "Rendimiento académico", "Parcours académique", "Akademisches"],
  ["How your grades and achievements look.", "Baholaringiz va yutuqlaringiz qanday ko'rinishda.", "Как выглядят ваши оценки и достижения.", "你的成绩与成就情况。", "Notlarınız ve başarılarınız nasıl görünüyor.", "كيف تبدو درجاتك وإنجازاتك.", "Cómo se ven tus notas y logros.", "À quoi ressemblent vos notes et réalisations.", "Wie Ihre Noten und Erfolge aussehen."],
  ["Experience", "Tajriba", "Опыт", "经历", "Deneyim", "الخبرة", "Experiencia", "Expérience", "Erfahrung"],
  ["What you have done beyond the classroom.", "Sinfdan tashqarida nimalar qilgansiz.", "Чем вы занимались за пределами класса.", "你在课堂之外做过什么。", "Sınıfın dışında neler yaptınız.", "ما فعلته خارج الفصل الدراسي.", "Lo que has hecho más allá del aula.", "Ce que vous avez fait en dehors de la classe.", "Was Sie über den Unterricht hinaus getan haben."],
  ["Documents", "Hujjatlar", "Документы", "材料", "Belgeler", "المستندات", "Documentos", "Documents", "Unterlagen"],
  ["What is ready for your application.", "Arizangiz uchun nima tayyor.", "Что уже готово для вашей заявки.", "你的申请中哪些已经准备好。", "Başvurunuz için nelerin hazır olduğu.", "ما الجاهز لطلبك.", "Qué está listo para tu solicitud.", "Ce qui est prêt pour votre candidature.", "Was für Ihre Bewerbung bereit ist."],
  ["Budget", "Byudjet", "Бюджет", "预算", "Bütçe", "الميزانية", "Presupuesto", "Budget", "Budget"],
  ["What you can spend each year.", "Yiliga qancha sarflay olasiz.", "Сколько вы можете тратить в год.", "你每年能负担多少。", "Yılda ne kadar harcayabileceğiniz.", "ما يمكنك إنفاقه كل عام.", "Cuánto puedes gastar cada año.", "Ce que vous pouvez dépenser chaque année.", "Was Sie pro Jahr ausgeben können."],
  ["Scoring your profile", "Profilingiz baholanmoqda", "Оцениваем ваш профиль", "正在为你的档案评分", "Profiliniz puanlanıyor", "جارٍ تقييم ملفك", "Puntuando tu perfil", "Évaluation de votre profil", "Ihr Profil wird bewertet"],
  ["Checking budgets against your matches", "Byudjet mos universitetlar bilan solishtirilmoqda", "Сверяем бюджет с подходящими вузами", "正在将预算与匹配院校对照", "Bütçe eşleşmelerle karşılaştırılıyor", "جارٍ مقارنة الميزانية بالجامعات المطابقة", "Comparando el presupuesto con tus opciones", "Comparaison du budget avec vos options", "Budget wird mit Ihren Treffern abgeglichen"],
  ["Building your plan", "Rejangiz tuzilmoqda", "Составляем ваш план", "正在制定你的计划", "Planınız hazırlanıyor", "جارٍ إعداد خطتك", "Preparando tu plan", "Construction de votre plan", "Ihr Plan wird erstellt"],
  ["Free readiness report", "Bepul tayyorlik hisoboti", "Бесплатный отчёт о готовности", "免费准备度报告", "Ücretsiz hazırlık raporu", "تقرير جاهزية مجاني", "Informe de preparación gratuito", "Bilan de préparation gratuit", "Kostenloser Bereitschaftsbericht"],
  ["Optional AI advice", "Ixtiyoriy AI maslahat", "AI-совет по желанию", "可选的AI建议", "İsteğe bağlı yapay zekâ önerisi", "نصيحة ذكاء اصطناعي اختيارية", "Consejo de IA opcional", "Conseil IA facultatif", "Optionaler KI-Rat"],
  ["5 short steps", "5 ta qisqa bosqich", "5 коротких шагов", "5个简短步骤", "5 kısa adım", "5 خطوات قصيرة", "5 pasos cortos", "5 étapes courtes", "5 kurze Schritte"],
  ["Deeper analysis progress", "Chuqur tahlil jarayoni", "Ход углублённого анализа", "深度分析进度", "Derin analiz ilerlemesi", "تقدّم التحليل الأعمق", "Progreso del análisis profundo", "Progression de l'analyse approfondie", "Fortschritt der tieferen Analyse"],
  ["Analysing your profile", "Profilingiz tahlil qilinmoqda", "Анализируем ваш профиль", "正在分析你的档案", "Profiliniz analiz ediliyor", "جارٍ تحليل ملفك", "Analizando tu perfil", "Analyse de votre profil", "Ihr Profil wird analysiert"],
  ["Strong profile", "Kuchli profil", "Сильный профиль", "优秀的档案", "Güçlü profil", "ملف قوي", "Perfil sólido", "Profil solide", "Starkes Profil"],
  ["Promising profile", "Umidli profil", "Перспективный профиль", "有潜力的档案", "Umut vadeden profil", "ملف واعد", "Perfil prometedor", "Profil prometteur", "Vielversprechendes Profil"],
  ["Room to grow", "O'sish uchun imkoniyat bor", "Есть куда расти", "仍有提升空间", "Gelişime açık", "هناك مجال للنمو", "Hay margen de mejora", "Marge de progression", "Noch Luft nach oben"],
  ["Your budget", "Sizning byudjetingiz", "Ваш бюджет", "你的预算", "Bütçeniz", "ميزانيتك", "Tu presupuesto", "Votre budget", "Ihr Budget"],
  ["Edit answers", "Javoblarni tahrirlash", "Изменить ответы", "修改回答", "Yanıtları düzenle", "تعديل الإجابات", "Editar respuestas", "Modifier les réponses", "Antworten bearbeiten"],
  ["Fit", "Moslik", "Соответствие", "匹配度", "Uyum", "الملاءمة", "Encaje", "Adéquation", "Passung"],
  ["done", "bajarildi", "выполнено", "已完成", "tamamlandı", "مكتمل", "hecho", "fait", "erledigt"],
];

const TABLE: Table = buildTable(UI_ROWS, REGION_ROWS, COUNTRY_ROWS, FIELD_ROWS, DESCRIPTION_ROWS, DEEP_ROWS);

/**
 * Sentences with a part that changes. `{x}` / `{name}` marks the changing part; it is looked up in
 * the table above when it is a known word (a study field or a region) and kept as it is otherwise.
 */
type Pattern = {
  /** Matches the English sentence; group 1 is the changing part. */
  match: RegExp;
  /** The translation of the sentence in each language, with `{x}` where the changing part goes. */
  text: Record<StaticLang, string>;
  /** Whether the changing part is a name that must stay as it is (a university). */
  keepName?: boolean;
};

const PATTERNS: readonly Pattern[] = [
  {
    match: /^(.+) is listed in the public World Universities registry\. Its name, country, and official website are registry-backed; admissions rate, tuition, and ranking shown here are modeled planning estimates and should be confirmed with the institution\.$/,
    keepName: true,
    text: {
      uz: "{x} ommaviy Jahon universitetlari reyestrida ro'yxatga olingan. Uning nomi, mamlakati va rasmiy veb-sayti reyestr ma'lumotlariga asoslangan; bu yerda ko'rsatilgan qabul foizi, o'qish narxi va reyting esa taxminiy rejalashtirish ko'rsatkichlari bo'lib, universitetdan tasdiqlab olinishi kerak.",
      ru: "{x} входит в открытый реестр университетов мира. Название, страна и официальный сайт взяты из реестра; показатели приёма, стоимость обучения и рейтинг здесь — модельные оценки для планирования, их необходимо уточнить в университете.",
      zh: "{x}已列入公开的世界大学名录。其名称、国家和官方网站均来自名录；此处显示的录取率、学费和排名为用于规划的模型估算值，请向学校确认。",
      tr: "{x}, herkese açık Dünya Üniversiteleri kayıt listesinde yer alıyor. Adı, ülkesi ve resmî web sitesi bu kayda dayanır; burada gösterilen kabul oranı, öğrenim ücreti ve sıralama planlama amaçlı modelleme tahminleridir ve kurumdan doğrulanmalıdır.",
      ar: "{x} مدرجة في سجل الجامعات العالمية العام. اسمها وبلدها وموقعها الرسمي مستمدة من السجل؛ أما نسبة القبول والرسوم الدراسية والتصنيف المعروضة هنا فهي تقديرات تخطيطية نموذجية ويجب التأكد منها من الجامعة.",
      es: "{x} figura en el registro público de universidades del mundo. Su nombre, país y sitio web oficial provienen del registro; la tasa de admisión, la matrícula y el ranking que se muestran aquí son estimaciones de planificación basadas en modelos y deben confirmarse con la institución.",
      fr: "{x} figure dans le registre public des universités du monde. Son nom, son pays et son site officiel proviennent du registre ; le taux d'admission, les frais de scolarité et le classement affichés ici sont des estimations de planification issues d'un modèle et doivent être confirmés auprès de l'établissement.",
      de: "{x} ist im öffentlichen Verzeichnis der Universitäten der Welt aufgeführt. Name, Land und offizielle Website stammen aus dem Verzeichnis; die hier angezeigte Zulassungsquote, die Studiengebühren und das Ranking sind modellierte Planungsschätzungen und sollten bei der Hochschule bestätigt werden.",
    },
  },
  {
    match: /^(.+) is a recognised university\. Its admissions rate, tuition, and ranking shown here are approximate planning estimates and should be confirmed with the institution\.$/,
    keepName: true,
    text: {
      uz: "{x} — e'tirof etilgan universitet. Bu yerda ko'rsatilgan qabul foizi, o'qish narxi va reyting taxminiy rejalashtirish ko'rsatkichlari bo'lib, universitetdan tasdiqlab olinishi kerak.",
      ru: "{x} — признанный университет. Показатели приёма, стоимость обучения и рейтинг, указанные здесь, — приблизительные оценки для планирования; их необходимо уточнить в университете.",
      zh: "{x}是一所获得认可的大学。此处显示的录取率、学费和排名为用于规划的近似估算值，请向学校确认。",
      tr: "{x} tanınmış bir üniversitedir. Burada gösterilen kabul oranı, öğrenim ücreti ve sıralama planlama amaçlı yaklaşık tahminlerdir ve kurumdan doğrulanmalıdır.",
      ar: "{x} جامعة معترف بها. نسبة القبول والرسوم الدراسية والتصنيف المعروضة هنا تقديرات تخطيطية تقريبية ويجب التأكد منها من الجامعة.",
      es: "{x} es una universidad reconocida. La tasa de admisión, la matrícula y el ranking que se muestran aquí son estimaciones aproximadas de planificación y deben confirmarse con la institución.",
      fr: "{x} est une université reconnue. Le taux d'admission, les frais de scolarité et le classement affichés ici sont des estimations approximatives de planification et doivent être confirmés auprès de l'établissement.",
      de: "{x} ist eine anerkannte Universität. Die hier angezeigte Zulassungsquote, die Studiengebühren und das Ranking sind ungefähre Planungsschätzungen und sollten bei der Hochschule bestätigt werden.",
    },
  },
  {
    match: /^Departmental strength in (.+)$/,
    text: {
      uz: "{x} bo'yicha kuchli kafedra",
      ru: "Сильный факультет по направлению {x}",
      zh: "{x}专业实力突出",
      tr: "{x} alanında güçlü bölüm",
      ar: "قوة القسم في {x}",
      es: "Departamento fuerte en {x}",
      fr: "Département solide en {x}",
      de: "Starker Fachbereich in {x}",
    },
  },
  {
    match: /^Located in a target region \((.+)\)$/,
    text: {
      uz: "Maqsadli hududda joylashgan ({x})",
      ru: "Находится в целевом регионе ({x})",
      zh: "位于目标地区（{x}）",
      tr: "Hedef bölgede yer alıyor ({x})",
      ar: "تقع في منطقة مستهدفة ({x})",
      es: "Ubicada en una región objetivo ({x})",
      fr: "Située dans une région ciblée ({x})",
      de: "Liegt in einer Zielregion ({x})",
    },
  },
];

/**
 * Most curated universities share one description built from numbers: "X is an institution in
 * City, Country, founded in 1900. Recent cycles show an acceptance rate near 12.3% with published
 * international tuition around $45,000 per year; it ranks about #40 globally and is recognised for A, B."
 * The numbers and names stay as they are; the country and the study fields are looked up in the tables.
 */
const PROFILE_RE =
  /^(.+?) is an (internationally aid-friendly )?institution in (.+), founded in (\d{4})\. Recent cycles show an acceptance rate near ([\d.]+)% with published international tuition around \$([\d,]+) per year; it ranks about #(\d+) globally and is recognised for (.+)\.$/;

type ProfileText = {
  /** First sentence when the university offers aid to internationals, and when it does not. */
  aid: string;
  plain: string;
  /** Second sentence: acceptance rate, tuition, ranking and strengths. */
  rest: string;
  /** Between the two sentences, and between the study fields. */
  sep: string;
  join: string;
};

const PROFILE_TEXT: Record<StaticLang, ProfileText> = {
  uz: {
    aid: "{name} ({place}) — {year}-yilda tashkil etilgan, xalqaro talabalarga moliyaviy yordam beradigan universitet.",
    plain: "{name} ({place}) — {year}-yilda tashkil etilgan universitet.",
    rest: "So'nggi qabul davrlarida qabul foizi taxminan {rate}% atrofida bo'lgan, e'lon qilingan xalqaro o'qish narxi yiliga taxminan ${tuition}; jahon reytingida taxminan {rank}-o'rinda turadi va {fields} yo'nalishlari bilan tanilgan.",
    sep: " ",
    join: ", ",
  },
  ru: {
    aid: "{name} ({place}) — университет, основанный в {year} году, который оказывает финансовую помощь иностранным студентам.",
    plain: "{name} ({place}) — университет, основанный в {year} году.",
    rest: "В последние циклы приёма доля принятых составляла около {rate}%, опубликованная стоимость обучения для иностранцев — около ${tuition} в год; в мировом рейтинге вуз занимает примерно {rank}-е место и известен такими направлениями, как {fields}.",
    sep: " ",
    join: ", ",
  },
  zh: {
    aid: "{name}（{place}）创立于{year}年，为国际学生提供资助。",
    plain: "{name}（{place}）创立于{year}年。",
    rest: "近几个招生周期的录取率约为{rate}%，公布的国际学生学费约为每年${tuition}；全球排名约第{rank}位，在{fields}方面享有盛誉。",
    sep: "",
    join: "、",
  },
  tr: {
    aid: "{name} ({place}), {year} yılında kurulmuş ve uluslararası öğrencilere maddi destek sunan bir üniversitedir.",
    plain: "{name} ({place}), {year} yılında kurulmuş bir üniversitedir.",
    rest: "Son başvuru dönemlerinde kabul oranı yaklaşık %{rate}, açıklanan uluslararası öğrenim ücreti ise yıllık yaklaşık ${tuition} düzeyindedir; dünya sıralamasında yaklaşık {rank}. sıradadır ve {fields} alanlarında tanınır.",
    sep: " ",
    join: ", ",
  },
  ar: {
    aid: "{name} ({place}) جامعة تأسست عام {year} وتقدّم دعمًا ماليًا للطلاب الدوليين.",
    plain: "{name} ({place}) جامعة تأسست عام {year}.",
    rest: "أظهرت دورات القبول الأخيرة نسبة قبول تقارب {rate}% ورسومًا دراسية معلنة للطلاب الدوليين تبلغ نحو ${tuition} سنويًا؛ وتحتل المرتبة {rank} تقريبًا عالميًا وتشتهر في {fields}.",
    sep: " ",
    join: "، ",
  },
  es: {
    aid: "{name} ({place}) es una universidad fundada en {year} que ofrece ayuda económica a estudiantes internacionales.",
    plain: "{name} ({place}) es una universidad fundada en {year}.",
    rest: "En los últimos ciclos su tasa de admisión ronda el {rate}% y su matrícula internacional publicada es de unos ${tuition} al año; ocupa aproximadamente el puesto {rank} a nivel mundial y destaca en {fields}.",
    sep: " ",
    join: ", ",
  },
  fr: {
    aid: "{name} ({place}) est un établissement fondé en {year} qui propose une aide financière aux étudiants internationaux.",
    plain: "{name} ({place}) est un établissement fondé en {year}.",
    rest: "Lors des derniers cycles, son taux d'admission avoisine {rate} % et ses frais de scolarité internationaux publiés s'élèvent à environ {tuition} $ par an ; il se classe autour de la place n°{rank} mondiale et est reconnu pour {fields}.",
    sep: " ",
    join: ", ",
  },
  de: {
    aid: "{name} ({place}) ist eine {year} gegründete Hochschule, die internationale Studierende finanziell unterstützt.",
    plain: "{name} ({place}) ist eine {year} gegründete Hochschule.",
    rest: "In den letzten Zulassungsrunden lag die Zulassungsquote bei etwa {rate} %, die veröffentlichten Studiengebühren für internationale Studierende betragen rund ${tuition} pro Jahr; weltweit liegt sie etwa auf Platz {rank} und ist bekannt für {fields}.",
    sep: " ",
    join: ", ",
  },
};

/** Study fields are listed capitalised; inside a sentence these languages write them in lower case (not acronyms). */
const LOWER_IN_SENTENCE: readonly StaticLang[] = ["uz", "ru", "tr", "es", "fr"];
function inSentence(lang: StaticLang, field: string): string {
  const second = field.charAt(1);
  if (!LOWER_IN_SENTENCE.includes(lang) || second === "" || second !== second.toLocaleLowerCase(lang)) return field;
  return field.charAt(0).toLocaleLowerCase(lang) + field.slice(1);
}

function profileSentence(lang: StaticLang, text: string): string | undefined {
  const m = PROFILE_RE.exec(text);
  if (!m) return undefined;
  const table = TABLE[lang];
  const t = PROFILE_TEXT[lang];
  const place = (m[3] ?? "").split(", ");
  const country = place.pop() ?? "";
  place.push(table.get(country) ?? country);
  const values: Record<string, string> = {
    name: m[1] ?? "",
    place: place.join(", "),
    year: m[4] ?? "",
    rate: m[5] ?? "",
    tuition: m[6] ?? "",
    rank: m[7] ?? "",
    fields: (m[8] ?? "").split(", ").map((f) => inSentence(lang, table.get(f) ?? f)).join(t.join),
  };
  const sentence = (m[2] ? t.aid : t.plain) + t.sep + t.rest;
  // A function keeps "$" in the values from being read as a replacement pattern.
  return sentence.replace(/\{(\w+)\}/g, (_all, key: string) => values[key] ?? "");
}

function isStaticLang(lang: string): lang is StaticLang {
  return (STATIC_LANGS as readonly string[]).includes(lang);
}

/**
 * The hand-written translation of `text`, or `undefined` when there is none and the AI translator
 * has to be asked. Never throws and never makes a request.
 */
export function staticTranslate(lang: string, text: string): string | undefined {
  if (!isStaticLang(lang)) return undefined;
  const table = TABLE[lang];
  const exact = table.get(text);
  if (exact !== undefined) return exact;
  if (text.length > 600) {
    // Long text: only the registry description is a known sentence.
    const long = PATTERNS[0];
    const m = long ? long.match.exec(text) : null;
    return m && long ? long.text[lang].replace("{x}", m[1] ?? "") : undefined;
  }
  const profile = profileSentence(lang, text);
  if (profile !== undefined) return profile;
  for (const pattern of PATTERNS) {
    const m = pattern.match.exec(text);
    if (!m) continue;
    const part = m[1] ?? "";
    const value = pattern.keepName ? part : (table.get(part) ?? part);
    return pattern.text[lang].replace("{x}", value);
  }
  return undefined;
}

/** For tests and tooling: every English string that has a hand-written translation. */
export function staticKeys(): string[] {
  const keys = new Set<string>();
  for (const rows of [UI_ROWS, REGION_ROWS, COUNTRY_ROWS, FIELD_ROWS, DESCRIPTION_ROWS, DEEP_ROWS]) for (const row of rows) keys.add(row[0]);
  return [...keys];
}
