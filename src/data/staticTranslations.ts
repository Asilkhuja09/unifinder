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

const TABLE: Table = buildTable(UI_ROWS, REGION_ROWS, COUNTRY_ROWS, FIELD_ROWS);

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
  for (const rows of [UI_ROWS, REGION_ROWS, COUNTRY_ROWS, FIELD_ROWS]) for (const row of rows) keys.add(row[0]);
  return [...keys];
}
