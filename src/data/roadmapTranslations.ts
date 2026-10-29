import type { LangCode } from "@/lib/i18n";
import type { RoadmapTextId } from "@/lib/roadmap";

/**
 * Hand-written translations of every roadmap step (English source: `ROADMAP_EN` in lib/roadmap.ts).
 * They are static on purpose: long sentences sent to the runtime AI translator are the first thing to fail.
 * The type makes a missing language or id a compile error. `{major}` is replaced with the student's major.
 */
export type RoadmapTranslations = Record<Exclude<LangCode, "en">, Record<RoadmapTextId, string>>;

export const ROADMAP_TRANSLATIONS: RoadmapTranslations = {
  uz: {
    "shortlist.title.major": "{major} yo'nalishi bo'yicha 8–10 ta universitetdan iborat qisqa ro'yxat tuzing",
    "shortlist.title.open": "Mutaxassisligingizni tanlang va 8–10 ta universitetdan iborat qisqa ro'yxat tuzing",
    "shortlist.detail.tier":
      "Taxminan 2 ta qiyin (reach), 3 ta mos (target) va 2 ta ishonchli (safety) universitetni mo'ljallang, ularni tanlagan qiyinlik darajangiz atrofida oling. Narx va moliyaviy yordamni yonma-yon solishtiring.",
    "shortlist.detail.open":
      "Taxminan 2 ta qiyin (reach), 3 ta mos (target) va 2 ta ishonchli (safety) universitetni mo'ljallang. Baholash natijalari va solishtirish sahifasidan foydalaning.",
    "english.title": "Ingliz tili imtihoniga (IELTS, TOEFL yoki Duolingo) yoziling va topshiring",
    "english.detail":
      "Ko'pchilik universitetlar muddatdan oldin ball hisobotini talab qiladi. Imtihon kunlari tez band bo'lgani uchun oldindan yoziling va bir marta qayta topshirishga vaqt qoldiring.",
    "englishCheck.title": "Ingliz tili balingizni har bir universitetning minimal talabi bilan solishtiring",
    "englishCheck.detail":
      "Natijalar taxminan ikki yil amal qiladi. Agar universitet yuqoriroq ball talab qilsa, hozirdan bir marta qayta topshirishni rejalashtiring.",
    "sat.title": "SAT kerakligini hal qiling",
    "sat.detail":
      "Ko'p universitetlarda test majburiy emas, lekin ba'zi AQSH universitetlari va stipendiyalar baribir so'raydi. Ro'yxatingizdagi har bir universitetning qoidasini tekshiring.",
    "activities.title": "Bir-ikki faoliyatni aniq natija bilan chuqurlashtiring",
    "activities.detail":
      "Qabul komissiyasi uzun ro'yxatdan ko'ra o'lchanadigan natijali bitta loyihani afzal ko'radi. Raqamlar bilan tasvirlay oladigan biror ishni boshlang yoki boshqaring.",
    "scholarships.title": "Stipendiya arizalarini erta boshlang",
    "scholarships.detail":
      "Fulbright, DAAD, MEXT, CSC va Chevening kabi davlat stipendiyalari odatda o'qish boshlanishidan 9–12 oy oldin yopiladi. Har bir muddatni rasmiy saytda tekshiring.",
    "essay.title": "Asosiy essengizni yozing va fikr-mulohaza oling",
    "essay.detail":
      "Birinchi variantni yozing, esse tahlilchisidan o'tkazing, qayta yozing va ustozingizga o'qitib ko'ring. Kamida uchta variant rejalashtiring.",
    "recs.title": "Ustozlardan tavsiyanoma so'rang",
    "recs.detail":
      "Muddatdan kamida olti hafta oldin so'rang va har bir ustozga uning darsida nima qilganingiz haqida qisqa ro'yxat bering.",
    "docs.title": "Transkriptlar, tarjimalar va pasportingizni tayyorlang",
    "docs.detail": "Rasmiy tarjima va notarial tasdiqlash bir necha hafta olishi mumkin. Hammasini yaxshi sifatda skaner qiling.",
    "funds.title": "Mablag' borligini tasdiqlovchi hujjatlarni tayyorlang",
    "funds.detail": "Viza idoralari va ba'zi universitetlar birinchi yilni qoplaydigan bank ko'chirmalarini so'raydi.",
    "submit.title": "Barcha arizalarni topshiring va to'lovlarni to'lang yoki to'lovdan ozod qilishni so'rang",
    "submit.detail":
      "Bir necha kun oldin topshiring, tasdiqlovchi xatlarni saqlang va har bir universitet portalida yetishmayotgan hujjatlarni tekshiring.",
    "after.title": "Takliflardan keyin: qabul qiling, depozit to'lang, viza va turar joyga murojaat qiling",
    "after.detail":
      "Takliflarni narx va moliyaviy yordam bo'yicha solishtiring, bittasini qabul qiling va viza jarayonini darhol boshlang.",
    "usa.apply.title": "AQSH: Common App ni sozlang va har bir universitetning muddatlarini yozib oling",
    "usa.apply.detail":
      "Common App hisobini yarating, universitetlaringizni qo'shing va har bir qo'shimcha (supplement) talabni belgilang. Early Decision muddatlari ko'pincha 1-noyabr atrofida, Regular Decision esa yanvar boshida bo'ladi, lekin har bir universitet o'z muddatini belgilaydi.",
    "usa.aid.title": "AQSH: moliyaviy yordamni xuddi shu ariza bilan so'rang",
    "usa.aid.detail":
      "Ba'zi AQSH universitetlarida xalqaro talabalar yordamni ariza topshirish vaqtida so'rashi shart, keyinroq so'ray olmaydi. Har bir universitet CSS Profile yoki o'z shaklini talab qilishini tekshiring va oilangizning daromad hujjatlarini yig'ing.",
    "uk.ucas.title": "Buyuk Britaniya: UCAS arizasi va personal statement ni rejalashtiring",
    "uk.ucas.detail":
      "UCAS orqali besh tagacha tanlov bilan topshirasiz. Oxford, Cambridge, tibbiyot, stomatologiya va veterinariya yo'nalishlari oktyabr o'rtasida, boshqa ko'pchilik yo'nalishlar yanvar o'rtasida yopiladi. Personal statement ni erta boshlang.",
    "de.recognition.title": "Germaniya: maktab attestatingiz to'g'ridan-to'g'ri qabulga yetarliligini tekshiring",
    "de.recognition.detail":
      "Nemis universitetlari xorijiy maktab attestati to'g'ridan-to'g'ri qabulga yetarli yoki yetarli emasligini o'zlari hal qiladi. Yetmasa, Studienkolleg yili yoki o'z yurtingizdagi universitetda bir yil o'qish kerak bo'lishi mumkin. Mamlakatingiz uchun talablarni DAAD saytida va har bir universitet sahifasida tekshiring.",
    "de.uniassist.title": "Germaniya: hujjatlarni uni-assist ga kamida 8 hafta oldin yuboring",
    "de.uniassist.detail":
      "Ko'p nemis universitetlari xalqaro arizalarni uni-assist orqali qabul qiladi. Muddatlar ko'pincha qishki semestr uchun 15-iyul, yozgi semestr uchun 15-yanvar bo'ladi, baholash esa odatda 4–6 hafta oladi. Agar universitet dastlabki ko'rib chiqishni (VPD) so'rasa, avval shuni oling.",
    "ca.system.title": "Kanada: har bir universitet arizani qanday qabul qilishini tekshiring",
    "ca.system.detail":
      "Ba'zi Kanada universitetlari arizani to'g'ridan-to'g'ri qabul qiladi, boshqalari esa Ontarioda OUAC kabi viloyat tizimidan foydalanadi. Muddatlar va talab qilinadigan hujjatlar universitet va dasturga qarab farq qiladi, shuning uchun har birini tasdiqlab oling.",
    "ca.permit.title": "Kanada: attestation letter oling va o'qish ruxsatnomasiga (study permit) murojaat qiling",
    "ca.permit.detail":
      "Kanada qabul xati, mablag' borligi isboti va ko'p hollarda viloyat yoki hudud attestation letter ini so'raydi (Kvebekda uning o'rniga CAQ kerak). Attestation letter ni odatda taklifni qabul qilib, o'qish haqining bir qismini to'lagandan keyin olasiz. Summalar va bosqichlarni rasmiy IRCC saytida tekshiring.",
    "cn.docs.title": "Xitoy: Xitoy hukumati stipendiyasi hujjatlarini tayyorlang",
    "cn.docs.detail":
      "CSC onlayn tizimida ro'yxatdan o'ting, o'z yurtingizdagi tegishli idoradan nomzod qilib ko'rsatish yoki tavsiya xatini oling va o'qish rejangizni yozing. Foreigner Physical Examination Form (tibbiy ko'rik shakli) ni tayyorlang va pasportingiz o'qish boshlanish sanasidan keyin kamida 12 oy amal qilishini tekshiring.",
    "oc.visa.title": "Avstraliya: Confirmation of Enrolment oling va talaba vizasiga murojaat qiling",
    "oc.visa.detail":
      "Avstraliya Confirmation of Enrolment (CoE) ni taklifni qabul qilib, birinchi o'qish haqini to'laganingizdan keyin beradi. Talaba vizasi uchun CoE, Overseas Student Health Cover (OSHC) sug'urtasi, mablag' isboti va haqiqiy talaba ekanligingizni ko'rsatadigan javoblar kerak.",
  },
  ru: {
    "shortlist.title.major": "Составьте короткий список из 8–10 университетов по специальности «{major}»",
    "shortlist.title.open": "Выберите специальность и составьте короткий список из 8–10 университетов",
    "shortlist.detail.tier":
      "Ориентируйтесь примерно на 2 амбициозных (reach), 3 подходящих (target) и 2 надёжных (safety) вуза, исходя из выбранного вами уровня сложности. Сравните стоимость и помощь рядом друг с другом.",
    "shortlist.detail.open":
      "Ориентируйтесь примерно на 2 амбициозных (reach), 3 подходящих (target) и 2 надёжных (safety) вуза. Воспользуйтесь результатами оценки и страницей сравнения.",
    "english.title": "Запишитесь на тест по английскому (IELTS, TOEFL или Duolingo) и сдайте его",
    "english.detail":
      "Большинству вузов нужен отчёт о баллах до дедлайна. Записывайтесь заранее: даты тестов быстро заканчиваются, и оставьте время на одну пересдачу.",
    "englishCheck.title": "Сверьте свой балл по английскому с минимумом каждого вуза",
    "englishCheck.detail":
      "Результаты действительны около двух лет. Если вузу нужен более высокий балл, запланируйте пересдачу уже сейчас.",
    "sat.title": "Решите, нужен ли вам SAT",
    "sat.detail":
      "Многие вузы не требуют тест обязательно, но некоторые американские вузы и стипендии всё же его просят. Проверьте правила каждого вуза из списка.",
    "activities.title": "Углубите одно-два занятия и добейтесь конкретного результата",
    "activities.detail":
      "Приёмные комиссии предпочитают один проект с измеримым результатом длинному списку. Начните или возглавьте то, что можно описать цифрами.",
    "scholarships.title": "Начните подавать на стипендии заранее",
    "scholarships.detail":
      "Государственные стипендии, такие как Fulbright, DAAD, MEXT, CSC и Chevening, обычно закрываются за 9–12 месяцев до начала обучения. Проверьте каждый срок на официальном сайте.",
    "essay.title": "Напишите главное эссе и получите отзыв",
    "essay.detail":
      "Напишите первый черновик, пропустите его через анализатор эссе, перепишите и попросите прочитать учителя. Запланируйте не менее трёх версий.",
    "recs.title": "Попросите учителей написать рекомендательные письма",
    "recs.detail":
      "Просите минимум за шесть недель до дедлайна и дайте каждому учителю краткий список того, что вы сделали на его уроках.",
    "docs.title": "Подготовьте табель, переводы и загранпаспорт",
    "docs.detail": "Официальный перевод и нотариальное заверение могут занять недели. Отсканируйте всё в хорошем качестве.",
    "funds.title": "Подготовьте подтверждение наличия средств",
    "funds.detail": "Визовые центры и некоторые университеты просят выписки со счёта, покрывающие первый год.",
    "submit.title": "Подайте все заявки и оплатите сборы или запросите их отмену",
    "submit.detail":
      "Подавайте за несколько дней до срока, сохраняйте письма с подтверждением и проверяйте в портале каждого вуза, не осталось ли недостающих документов.",
    "after.title": "После предложений: примите одно, внесите депозит, оформите визу и жильё",
    "after.detail": "Сравните предложения по стоимости и помощи, примите одно и сразу начинайте оформление визы.",
    "usa.apply.title": "США: настройте Common App и запишите сроки каждого вуза",
    "usa.apply.detail":
      "Создайте аккаунт Common App, добавьте свои вузы и отметьте дополнительные материалы (supplements) каждого. Сроки Early Decision часто около 1 ноября, а Regular Decision — в начале января, но каждый вуз устанавливает свои.",
    "usa.aid.title": "США: запросите финансовую помощь в той же заявке",
    "usa.aid.detail":
      "В некоторых американских вузах иностранные студенты должны запросить помощь при подаче заявки и не могут сделать это позже. Выясните, нужен ли каждому вузу CSS Profile или собственная форма, и соберите документы о доходах семьи.",
    "uk.ucas.title": "Великобритания: спланируйте заявку в UCAS и personal statement",
    "uk.ucas.detail":
      "Вы подаёте заявку через UCAS, выбрав до пяти вариантов. Оксфорд, Кембридж, а также медицина, стоматология и ветеринария закрываются в середине октября, большинство остальных программ — в середине января. Начните personal statement заранее.",
    "de.recognition.title": "Германия: проверьте, даёт ли ваш аттестат право на прямое поступление",
    "de.recognition.detail":
      "Немецкие вузы сами решают, даёт ли иностранный аттестат право на прямое поступление. Если нет, может понадобиться год в Studienkolleg или первый курс университета у себя на родине. Проверьте требования для вашей страны на сайте DAAD и на странице каждого вуза.",
    "de.uniassist.title": "Германия: отправьте документы в uni-assist минимум за 8 недель",
    "de.uniassist.detail":
      "Многие немецкие вузы принимают международные заявки через uni-assist. Сроки часто 15 июля для зимнего семестра и 15 января для летнего, а проверка обычно занимает 4–6 недель. Если вуз просит предварительную проверку (VPD), запросите её первой.",
    "ca.system.title": "Канада: выясните, как каждый вуз принимает заявки",
    "ca.system.detail":
      "Одни канадские вузы принимают заявки напрямую, другие используют провинциальную систему, например OUAC в Онтарио. Сроки и документы зависят от университета и программы, поэтому уточняйте каждый.",
    "ca.permit.title": "Канада: получите attestation letter и подайте на разрешение на обучение (study permit)",
    "ca.permit.detail":
      "Канада требует письмо о зачислении, подтверждение средств и в большинстве случаев провинциальное или территориальное attestation letter (в Квебеке вместо него нужен CAQ). Обычно attestation letter выдают после принятия предложения и оплаты части обучения. Суммы и шаги смотрите на официальном сайте IRCC.",
    "cn.docs.title": "Китай: подготовьте документы на Стипендию правительства Китая",
    "cn.docs.detail":
      "Зарегистрируйтесь в онлайн-системе CSC, получите номинацию или рекомендацию в ведомстве вашей страны и напишите учебный план. Подготовьте Foreigner Physical Examination Form (медицинскую справку) и проверьте, что паспорт действителен не менее 12 месяцев после даты начала обучения.",
    "oc.visa.title": "Австралия: получите Confirmation of Enrolment и подайте на студенческую визу",
    "oc.visa.detail":
      "Австралия выдаёт Confirmation of Enrolment (CoE) после того, как вы принимаете предложение и оплачиваете первый взнос за обучение. Для студенческой визы нужны CoE, медицинская страховка Overseas Student Health Cover (OSHC), подтверждение средств и ответы, показывающие, что вы настоящий студент.",
  },
  zh: {
    "shortlist.title.major": "为“{major}”专业列出 8 到 10 所大学的候选名单",
    "shortlist.title.open": "确定专业，并列出 8 到 10 所大学的候选名单",
    "shortlist.detail.tier":
      "目标是大约 2 所冲刺校（reach）、3 所匹配校（target）和 2 所保底校（safety），以您选择的难度层级为中心。并排比较费用和资助。",
    "shortlist.detail.open":
      "目标是大约 2 所冲刺校（reach）、3 所匹配校（target）和 2 所保底校（safety）。请使用评估结果和对比页面。",
    "english.title": "预约并参加英语考试（雅思 IELTS、托福 TOEFL 或多邻国 Duolingo）",
    "english.detail": "大多数大学要求在截止日期前提交成绩单。请尽早预约，因为考位很快会满，并为一次重考留出时间。",
    "englishCheck.title": "对照每所大学的最低要求检查您的英语成绩",
    "englishCheck.detail": "成绩有效期约为两年。如果某所学校要求更高的分数，请现在就计划一次重考。",
    "sat.title": "决定是否需要参加 SAT",
    "sat.detail": "许多大学不强制要求考试成绩，但部分美国大学和奖学金仍然要求。请查看候选名单中每所学校的政策。",
    "activities.title": "深耕一两项活动，做出具体成果",
    "activities.detail": "招生官更看重一个有可衡量成果的项目，而不是一长串清单。发起或带领一件能用数字说明的事情。",
    "scholarships.title": "尽早开始申请奖学金",
    "scholarships.detail":
      "Fulbright、DAAD、MEXT、CSC 和 Chevening 等政府奖学金通常在开学前 9 至 12 个月截止。请在官方网站上确认每个截止日期。",
    "essay.title": "撰写主文书并获取反馈",
    "essay.detail": "写出初稿，用文书分析器检查，修改后请老师阅读。至少计划三个版本。",
    "recs.title": "请老师撰写推荐信",
    "recs.detail": "至少在截止日期前六周提出请求，并给每位老师一份简短清单，列出您在他们课上做过的事。",
    "docs.title": "准备成绩单、翻译件和护照",
    "docs.detail": "官方翻译和公证可能需要数周。请将所有文件高质量扫描。",
    "funds.title": "准备资金证明",
    "funds.detail": "签证机构和部分大学会要求提供覆盖第一年费用的银行流水。",
    "submit.title": "提交所有申请并缴费，或申请减免",
    "submit.detail": "提前几天提交，保存确认邮件，并在每所大学的申请系统里检查是否缺少材料。",
    "after.title": "收到录取后：接受录取、缴纳押金、申请签证和住宿",
    "after.detail": "从费用和资助方面比较各个录取，接受其中一个，并立即开始办理签证。",
    "usa.apply.title": "美国：设置 Common App 并列出每所学校的截止日期",
    "usa.apply.detail":
      "创建 Common App 账号，添加您的学校，并记下每所学校的补充材料（supplement）。提前决定（Early Decision）的截止日期通常在 11 月 1 日前后，常规决定（Regular Decision）在 1 月初前后，但每所学校自行设定。",
    "usa.aid.title": "美国：在同一份申请中申请助学金",
    "usa.aid.detail":
      "在部分美国大学，国际学生必须在申请时提出资助申请，之后不能再申请。请确认每所学校需要 CSS Profile 还是自己的表格，并准备好家庭收入证明。",
    "uk.ucas.title": "英国：规划 UCAS 申请和个人陈述",
    "uk.ucas.detail":
      "您通过 UCAS 申请，最多可选五个志愿。牛津、剑桥以及医学、牙医和兽医课程在 10 月中旬截止，大多数其他课程在 1 月中旬截止。请尽早开始写个人陈述（personal statement）。",
    "de.recognition.title": "德国：确认您的高中毕业证书是否可直接入学",
    "de.recognition.detail":
      "德国大学自行判断外国中学毕业证书是否符合直接入学条件。如果不符合，您可能需要读一年预科（Studienkolleg），或先在本国大学读完一年。请在 DAAD 网站和各大学页面上查看您所在国家的要求。",
    "de.uniassist.title": "德国：至少提前 8 周把材料寄给 uni-assist",
    "de.uniassist.detail":
      "许多德国大学通过 uni-assist 处理国际学生申请。截止日期通常是冬季学期 7 月 15 日、夏季学期 1 月 15 日，审核一般需要 4 至 6 周。如果大学要求预审文件（VPD），请先申请它。",
    "ca.system.title": "加拿大：确认每所大学的申请方式",
    "ca.system.detail":
      "一些加拿大大学直接受理申请，另一些则使用省级系统，例如安大略省的 OUAC。截止日期和所需材料因大学和专业而异，请逐一确认。",
    "ca.permit.title": "加拿大：获取省级担保函（attestation letter）并申请学习许可",
    "ca.permit.detail":
      "加拿大要求提供录取通知书、资金证明，大多数情况下还需要省或地区担保函（魁北克改用 CAQ）。担保函通常在您接受录取并缴纳部分学费后获得。具体金额和步骤请查看加拿大移民局（IRCC）官网。",
    "cn.docs.title": "中国：准备中国政府奖学金材料",
    "cn.docs.detail":
      "在 CSC 在线系统注册，从您本国的相关机构获得推荐或提名，并撰写学习计划。准备好《外国人体格检查表》（Foreigner Physical Examination Form），并确认护照在入学日期之后至少还有 12 个月有效期。",
    "oc.visa.title": "澳大利亚：获取录取确认函（CoE）并申请学生签证",
    "oc.visa.detail":
      "澳大利亚在您接受录取并缴纳第一笔学费后签发录取确认函（Confirmation of Enrolment，CoE）。申请学生签证需要 CoE、海外学生健康保险（OSHC）、资金证明，以及能证明您是真实学生的回答。",
  },
  tr: {
    "shortlist.title.major": "{major} için 8–10 üniversiteden oluşan kısa bir liste hazırlayın",
    "shortlist.title.open": "Bölümünüzü seçin ve 8–10 üniversiteden oluşan kısa bir liste hazırlayın",
    "shortlist.detail.tier":
      "Yaklaşık 2 iddialı (reach), 3 uygun (target) ve 2 güvenli (safety) okul hedefleyin; seçtiğiniz zorluk düzeyini merkeze alın. Maliyet ve burs bilgilerini yan yana karşılaştırın.",
    "shortlist.detail.open":
      "Yaklaşık 2 iddialı (reach), 3 uygun (target) ve 2 güvenli (safety) okul hedefleyin. Değerlendirme sonuçlarını ve karşılaştırma sayfasını kullanın.",
    "english.title": "Bir İngilizce sınavına (IELTS, TOEFL veya Duolingo) kayıt olun ve girin",
    "english.detail":
      "Çoğu üniversite son tarihten önce bir puan belgesi ister. Sınav tarihleri hızla dolduğu için erken kayıt olun ve bir tekrar sınavı için zaman bırakın.",
    "englishCheck.title": "İngilizce puanınızı her üniversitenin asgari şartıyla karşılaştırın",
    "englishCheck.detail":
      "Puanlar yaklaşık iki yıl geçerlidir. Bir okul daha yüksek puan istiyorsa tekrar sınavını şimdiden planlayın.",
    "sat.title": "SAT'a ihtiyacınız olup olmadığına karar verin",
    "sat.detail":
      "Birçok üniversite sınav şartı aramaz; ancak bazı ABD okulları ve burslar hâlâ ister. Listenizdeki her okulun politikasını kontrol edin.",
    "activities.title": "Bir iki etkinliği somut bir sonuçla derinleştirin",
    "activities.detail":
      "Kabul komiteleri uzun bir listeden çok ölçülebilir sonucu olan tek bir projeyi tercih eder. Rakamlarla anlatabileceğiniz bir şey başlatın veya yürütün.",
    "scholarships.title": "Burs başvurularına erken başlayın",
    "scholarships.detail":
      "Fulbright, DAAD, MEXT, CSC ve Chevening gibi devlet bursları genellikle eğitim başlangıcından 9–12 ay önce kapanır. Her son tarihi resmî sitede kontrol edin.",
    "essay.title": "Ana kompozisyonunuzu yazın ve geri bildirim alın",
    "essay.detail":
      "İlk taslağı yazın, kompozisyon analizöründen geçirin, yeniden yazın ve bir öğretmenden okumasını isteyin. En az üç sürüm planlayın.",
    "recs.title": "Öğretmenlerinizden tavsiye mektubu isteyin",
    "recs.detail":
      "Son tarihten en az altı hafta önce isteyin ve her öğretmene dersinde neler yaptığınızı gösteren kısa bir liste verin.",
    "docs.title": "Transkriptleri, tercümeleri ve pasaportunuzu hazırlayın",
    "docs.detail": "Resmî tercüme ve noter onayı haftalar sürebilir. Her şeyi yüksek kalitede tarayın.",
    "funds.title": "Mali yeterlilik belgelerinizi hazırlayın",
    "funds.detail": "Vize ofisleri ve bazı üniversiteler ilk yılı karşılayan banka hesap dökümü ister.",
    "submit.title": "Tüm başvuruları gönderin ve ücretleri ödeyin ya da muafiyet isteyin",
    "submit.detail":
      "Birkaç gün erken gönderin, onay e-postalarını saklayın ve her üniversitenin portalında eksik belge olup olmadığını kontrol edin.",
    "after.title": "Kabullerden sonra: birini kabul edin, depozito yatırın, vize ve konut için başvurun",
    "after.detail": "Kabulleri maliyet ve burs açısından karşılaştırın, birini kabul edin ve vize sürecini hemen başlatın.",
    "usa.apply.title": "ABD: Common App'inizi kurun ve her okulun son tarihlerini listeleyin",
    "usa.apply.detail":
      "Common App hesabınızı oluşturun, okullarınızı ekleyin ve her okulun ek (supplement) şartlarını not edin. Early Decision son tarihleri çoğunlukla 1 Kasım civarında, Regular Decision ise Ocak başı civarındadır; ancak her okul kendi tarihini belirler.",
    "usa.aid.title": "ABD: Mali yardımı aynı başvuruda isteyin",
    "usa.aid.detail":
      "Bazı ABD üniversitelerinde uluslararası öğrenciler mali yardımı başvuru sırasında istemek zorundadır, sonradan isteyemez. Her okulun CSS Profile mı yoksa kendi formunu mu istediğini kontrol edin ve ailenizin gelir belgelerini toplayın.",
    "uk.ucas.title": "Birleşik Krallık: UCAS başvurunuzu ve kişisel beyan yazınızı planlayın",
    "uk.ucas.detail":
      "UCAS üzerinden en fazla beş tercihle başvurursunuz. Oxford, Cambridge, tıp, diş hekimliği ve veterinerlik programları Ekim ortasında, diğer çoğu program Ocak ortasında kapanır. Kişisel beyan yazınıza (personal statement) erken başlayın.",
    "de.recognition.title": "Almanya: lise diplomanızın doğrudan kabul sağlayıp sağlamadığını kontrol edin",
    "de.recognition.detail":
      "Alman üniversiteleri yabancı bir lise diplomasının doğrudan kabule yetip yetmediğine kendileri karar verir. Yetmezse bir Studienkolleg yılı veya ülkenizde bir üniversitede bir yıl okumanız gerekebilir. Ülkenize ait şartları DAAD sitesinde ve her üniversitenin sayfasında kontrol edin.",
    "de.uniassist.title": "Almanya: belgelerinizi uni-assist'e en az 8 hafta önce gönderin",
    "de.uniassist.detail":
      "Birçok Alman üniversitesi uluslararası başvuruları uni-assist üzerinden işler. Son tarihler çoğunlukla kış dönemi için 15 Temmuz, yaz dönemi için 15 Ocak'tır; değerlendirme genellikle 4–6 hafta sürer. Üniversite ön değerlendirme belgesi (VPD) isterse önce onu talep edin.",
    "ca.system.title": "Kanada: her üniversitenin başvuruları nasıl aldığını kontrol edin",
    "ca.system.detail":
      "Bazı Kanada üniversiteleri başvuruları doğrudan alır, bazıları ise Ontario'daki OUAC gibi eyalet sistemlerini kullanır. Son tarihler ve gerekli belgeler üniversiteye ve programa göre değişir; her birini doğrulayın.",
    "ca.permit.title": "Kanada: attestation letter'ınızı alın ve öğrenim izni (study permit) için başvurun",
    "ca.permit.detail":
      "Kanada kabul mektubu, mali yeterlilik belgesi ve çoğu durumda eyalet veya bölge attestation letter'ı ister (Quebec'te bunun yerine CAQ gerekir). Attestation letter'ı genellikle teklifi kabul edip öğrenim ücretinin bir kısmını yatırdıktan sonra alırsınız. Tutarları ve adımları resmî IRCC sitesinde kontrol edin.",
    "cn.docs.title": "Çin: Çin Hükümeti Bursu belgelerinizi hazırlayın",
    "cn.docs.detail":
      "CSC çevrimiçi sistemine kaydolun, ülkenizdeki ilgili kurumdan aday gösterme veya tavsiye yazısı alın ve çalışma planınızı yazın. Foreigner Physical Examination Form'u (sağlık muayene formu) hazırlayın ve pasaportunuzun öğrenime başlama tarihinden sonra en az 12 ay geçerli olduğunu kontrol edin.",
    "oc.visa.title": "Avustralya: Confirmation of Enrolment alın ve öğrenci vizesi için başvurun",
    "oc.visa.detail":
      "Avustralya, teklifi kabul edip ilk dönem öğrenim ücretini ödedikten sonra Confirmation of Enrolment (CoE) verir. Öğrenci vizesi için CoE, Overseas Student Health Cover (OSHC) sağlık sigortası, mali yeterlilik belgesi ve gerçek bir öğrenci olduğunuzu gösteren cevaplar gerekir.",
  },
  ar: {
    "shortlist.title.major": "أعدّ قائمة مختصرة من 8 إلى 10 جامعات لتخصص {major}",
    "shortlist.title.open": "اختر تخصصك وأعدّ قائمة مختصرة من 8 إلى 10 جامعات",
    "shortlist.detail.tier":
      "استهدف نحو جامعتين طموحتين (reach) وثلاث جامعات مناسبة (target) وجامعتين مضمونتين (safety)، مع التركيز على مستوى الصعوبة الذي اخترته. قارن التكلفة والدعم المالي جنبًا إلى جنب.",
    "shortlist.detail.open":
      "استهدف نحو جامعتين طموحتين (reach) وثلاث جامعات مناسبة (target) وجامعتين مضمونتين (safety). استخدم نتائج التقييم وصفحة المقارنة.",
    "english.title": "احجز اختبار اللغة الإنجليزية (IELTS أو TOEFL أو Duolingo) وأدِّه",
    "english.detail":
      "تطلب معظم الجامعات تقرير الدرجات قبل الموعد النهائي. احجز مبكرًا لأن مواعيد الاختبار تمتلئ بسرعة، واترك وقتًا لإعادة الاختبار مرة واحدة.",
    "englishCheck.title": "قارن درجتك في اللغة الإنجليزية بالحد الأدنى لكل جامعة",
    "englishCheck.detail":
      "تظل الدرجات صالحة نحو سنتين. إذا طلبت جامعة درجة أعلى فخطّط لإعادة الاختبار مرة واحدة من الآن.",
    "sat.title": "قرّر ما إذا كنت بحاجة إلى اختبار SAT",
    "sat.detail":
      "كثير من الجامعات لا تشترط الاختبار، لكن بعض الجامعات الأمريكية والمنح ما زالت تطلبه. تحقق من سياسة كل جامعة في قائمتك.",
    "activities.title": "تعمّق في نشاط أو نشاطين بنتيجة ملموسة",
    "activities.detail":
      "يفضّل مسؤولو القبول مشروعًا واحدًا بنتيجة قابلة للقياس على قائمة طويلة. ابدأ أو قُد شيئًا يمكنك وصفه بالأرقام.",
    "scholarships.title": "ابدأ التقديم على المنح مبكرًا",
    "scholarships.detail":
      "تُغلق المنح الحكومية مثل Fulbright وDAAD وMEXT وCSC وChevening عادةً قبل بدء الدراسة بـ 9 إلى 12 شهرًا. تحقق من كل موعد في الموقع الرسمي.",
    "essay.title": "اكتب مقالك الرئيسي واحصل على ملاحظات",
    "essay.detail":
      "اكتب مسودة أولى، ومرّرها على محلل المقالات، ثم أعد كتابتها واطلب من أحد المعلمين قراءتها. خطّط لثلاث نسخ على الأقل.",
    "recs.title": "اطلب خطابات التوصية من معلميك",
    "recs.detail": "اطلبها قبل الموعد النهائي بستة أسابيع على الأقل، وأعطِ كل معلم قائمة قصيرة بما أنجزته في مادته.",
    "docs.title": "جهّز كشوف الدرجات والترجمات وجواز السفر",
    "docs.detail": "قد تستغرق الترجمة الرسمية والتوثيق أسابيع. امسح كل شيء ضوئيًا بجودة جيدة.",
    "funds.title": "جهّز إثبات القدرة المالية",
    "funds.detail": "تطلب مكاتب التأشيرات وبعض الجامعات كشوف حساب بنكية تغطي السنة الأولى.",
    "submit.title": "قدّم جميع الطلبات وادفع الرسوم أو اطلب الإعفاء منها",
    "submit.detail": "قدّم قبل الموعد بأيام، واحتفظ برسائل التأكيد، وتحقق في بوابة كل جامعة من وجود مستندات ناقصة.",
    "after.title": "بعد العروض: اقبل عرضًا، وادفع الوديعة، وقدّم على التأشيرة والسكن",
    "after.detail": "قارن عروضك من حيث التكلفة والدعم المالي، واقبل أحدها، وابدأ إجراءات التأشيرة فورًا.",
    "usa.apply.title": "الولايات المتحدة: جهّز حسابك في Common App ودوّن مواعيد كل جامعة",
    "usa.apply.detail":
      "أنشئ حسابك في Common App وأضف جامعاتك ودوّن المتطلبات الإضافية (supplement) لكل جامعة. تكون مواعيد Early Decision غالبًا حول 1 نوفمبر وRegular Decision حول بداية يناير، لكن كل جامعة تحدد موعدها.",
    "usa.aid.title": "الولايات المتحدة: اطلب الدعم المالي في الطلب نفسه",
    "usa.aid.detail":
      "في بعض الجامعات الأمريكية يجب على الطلاب الدوليين طلب الدعم عند التقديم ولا يمكنهم طلبه لاحقًا. تحقق مما إذا كانت كل جامعة تريد CSS Profile أو نموذجها الخاص، وجمّع مستندات دخل أسرتك.",
    "uk.ucas.title": "المملكة المتحدة: خطّط لطلب UCAS وللبيان الشخصي",
    "uk.ucas.detail":
      "تتقدم عبر UCAS بما يصل إلى خمسة خيارات. تُغلق برامج أكسفورد وكامبريدج والطب وطب الأسنان والطب البيطري في منتصف أكتوبر، ومعظم البرامج الأخرى في منتصف يناير. ابدأ كتابة البيان الشخصي (personal statement) مبكرًا.",
    "de.recognition.title": "ألمانيا: تحقق من أن شهادتك المدرسية تتيح القبول المباشر",
    "de.recognition.detail":
      "تقرر الجامعات الألمانية بنفسها ما إذا كانت الشهادة المدرسية الأجنبية تؤهل للقبول المباشر. وإن لم تكن كذلك فقد تحتاج إلى سنة في Studienkolleg أو إلى سنة دراسية أولى في جامعة ببلدك. راجع متطلبات بلدك على موقع DAAD وفي صفحة كل جامعة.",
    "de.uniassist.title": "ألمانيا: أرسل مستنداتك إلى uni-assist قبل 8 أسابيع على الأقل",
    "de.uniassist.detail":
      "تعالج كثير من الجامعات الألمانية الطلبات الدولية عبر uni-assist. تكون المواعيد غالبًا 15 يوليو للفصل الشتوي و15 يناير للفصل الصيفي، ويستغرق التقييم عادةً من 4 إلى 6 أسابيع. وإذا طلبت الجامعة مراجعة أولية (VPD) فاطلبها أولًا.",
    "ca.system.title": "كندا: تحقق من طريقة قبول كل جامعة للطلبات",
    "ca.system.detail":
      "تقبل بعض الجامعات الكندية الطلبات مباشرة، وتستخدم أخرى نظامًا إقليميًا مثل OUAC في أونتاريو. تختلف المواعيد والمستندات المطلوبة حسب الجامعة والبرنامج، لذا تأكد من كل واحدة.",
    "ca.permit.title": "كندا: احصل على خطاب التصديق (attestation letter) وقدّم على تصريح الدراسة",
    "ca.permit.detail":
      "تطلب كندا خطاب قبول وإثبات القدرة المالية، وفي معظم الحالات خطاب تصديق من المقاطعة أو الإقليم (وتستخدم كيبيك شهادة CAQ بدلًا منه). تحصل على خطاب التصديق عادةً بعد قبول العرض ودفع جزء من الرسوم الدراسية. راجع المبالغ والخطوات على موقع IRCC الرسمي.",
    "cn.docs.title": "الصين: جهّز مستندات المنحة الحكومية الصينية",
    "cn.docs.detail":
      "سجّل في نظام CSC الإلكتروني، واحصل على الترشيح أو التوصية من الجهة المختصة في بلدك، واكتب خطتك الدراسية. جهّز نموذج الفحص الطبي للأجانب (Foreigner Physical Examination Form)، وتأكد من أن جواز سفرك صالح لمدة 12 شهرًا على الأقل بعد تاريخ بدء الدراسة.",
    "oc.visa.title": "أستراليا: احصل على تأكيد القيد (CoE) وقدّم على تأشيرة الطالب",
    "oc.visa.detail":
      "تصدر أستراليا تأكيد القيد (Confirmation of Enrolment، CoE) بعد أن تقبل العرض وتدفع الرسوم الدراسية الأولى. وتحتاج لتأشيرة الطالب إلى CoE وتأمين Overseas Student Health Cover (OSHC) وإثبات القدرة المالية وإجابات تُظهر أنك طالب حقيقي.",
  },
  es: {
    "shortlist.title.major": "Prepara una lista corta de 8 a 10 universidades para {major}",
    "shortlist.title.open": "Elige tu carrera y prepara una lista corta de 8 a 10 universidades",
    "shortlist.detail.tier":
      "Apunta a unas 2 universidades ambiciosas (reach), 3 adecuadas (target) y 2 seguras (safety), centradas en el nivel de dificultad que elegiste. Compara el costo y las ayudas lado a lado.",
    "shortlist.detail.open":
      "Apunta a unas 2 universidades ambiciosas (reach), 3 adecuadas (target) y 2 seguras (safety). Usa los resultados de la evaluación y la página de comparación.",
    "english.title": "Reserva y haz un examen de inglés (IELTS, TOEFL o Duolingo)",
    "english.detail":
      "La mayoría de las universidades piden el informe de puntuación antes de la fecha límite. Reserva con tiempo, porque las fechas se llenan, y deja margen para repetirlo una vez.",
    "englishCheck.title": "Compara tu puntuación de inglés con el mínimo de cada universidad",
    "englishCheck.detail":
      "Las puntuaciones son válidas unos dos años. Si una universidad pide un nivel más alto, planifica ahora una repetición.",
    "sat.title": "Decide si necesitas el SAT",
    "sat.detail":
      "Muchas universidades no exigen examen, pero algunas de EE. UU. y varias becas todavía lo piden. Revisa la política de cada universidad de tu lista.",
    "activities.title": "Profundiza en una o dos actividades con un resultado concreto",
    "activities.detail":
      "Los comités de admisión prefieren un proyecto con un resultado medible a una lista larga. Empieza o lidera algo que puedas describir con números.",
    "scholarships.title": "Empieza pronto las solicitudes de becas",
    "scholarships.detail":
      "Las becas de gobierno como Fulbright, DAAD, MEXT, CSC y Chevening suelen cerrar de 9 a 12 meses antes del inicio de los estudios. Revisa cada fecha límite en el sitio oficial.",
    "essay.title": "Escribe tu ensayo principal y pide comentarios",
    "essay.detail":
      "Escribe un primer borrador, pásalo por el analizador de ensayos, reescríbelo y pide a un profesor que lo lea. Planifica al menos tres versiones.",
    "recs.title": "Pide cartas de recomendación a tus profesores",
    "recs.detail":
      "Pídelas al menos seis semanas antes de la fecha límite y entrega a cada profesor una lista breve de lo que hiciste en su clase.",
    "docs.title": "Prepara tus expedientes, traducciones y pasaporte",
    "docs.detail": "La traducción oficial y la legalización notarial pueden tardar semanas. Escanea todo con buena calidad.",
    "funds.title": "Prepara la prueba de fondos",
    "funds.detail": "Las oficinas de visado y algunas universidades piden extractos bancarios que cubran el primer año.",
    "submit.title": "Envía todas las solicitudes y paga las tasas o pide exenciones",
    "submit.detail":
      "Envíalas unos días antes, guarda los correos de confirmación y revisa en el portal de cada universidad si falta algún documento.",
    "after.title": "Tras las ofertas: acepta una, paga el depósito y solicita el visado y el alojamiento",
    "after.detail": "Compara tus ofertas por costo y ayudas, acepta una y empieza el trámite del visado de inmediato.",
    "usa.apply.title": "EE. UU.: configura tu Common App y anota las fechas límite de cada universidad",
    "usa.apply.detail":
      "Crea tu cuenta de Common App, añade tus universidades y anota los suplementos de cada una. Las fechas de Early Decision suelen rondar el 1 de noviembre y las de Regular Decision, principios de enero, pero cada universidad fija las suyas.",
    "usa.aid.title": "EE. UU.: pide la ayuda financiera en la misma solicitud",
    "usa.aid.detail":
      "En algunas universidades de EE. UU., los estudiantes internacionales deben pedir ayuda al solicitar y no pueden hacerlo después. Comprueba si cada universidad pide el CSS Profile o su propio formulario, y reúne los documentos de ingresos de tu familia.",
    "uk.ucas.title": "Reino Unido: planifica tu solicitud de UCAS y tu declaración personal",
    "uk.ucas.detail":
      "Solicitas a través de UCAS con hasta cinco opciones. Oxford, Cambridge, medicina, odontología y veterinaria cierran a mediados de octubre, y la mayoría de los demás cursos a mediados de enero. Empieza pronto tu declaración personal (personal statement).",
    "de.recognition.title": "Alemania: comprueba que tu título de secundaria da acceso directo",
    "de.recognition.detail":
      "Las universidades alemanas deciden si un título extranjero de secundaria da acceso directo. Si no, puede que necesites un año de Studienkolleg o un primer año universitario en tu país. Consulta los requisitos de tu país en el sitio del DAAD y en la página de cada universidad.",
    "de.uniassist.title": "Alemania: envía tus documentos a uni-assist al menos 8 semanas antes",
    "de.uniassist.detail":
      "Muchas universidades alemanas gestionan las solicitudes internacionales a través de uni-assist. Las fechas límite suelen ser el 15 de julio para el semestre de invierno y el 15 de enero para el de verano, y la evaluación suele tardar de 4 a 6 semanas. Si una universidad pide una revisión preliminar (VPD), solicítala primero.",
    "ca.system.title": "Canadá: comprueba cómo recibe las solicitudes cada universidad",
    "ca.system.detail":
      "Algunas universidades canadienses reciben las solicitudes directamente y otras usan un sistema provincial, como OUAC en Ontario. Las fechas límite y los documentos varían según la universidad y el programa, así que confirma cada una.",
    "ca.permit.title": "Canadá: consigue tu carta de atestación y solicita el permiso de estudio",
    "ca.permit.detail":
      "Canadá pide una carta de aceptación, prueba de fondos y, en la mayoría de los casos, una carta de atestación provincial o territorial (Quebec usa un CAQ en su lugar). Normalmente la carta de atestación se obtiene tras aceptar la oferta y pagar parte de la matrícula. Consulta los importes y pasos en el sitio oficial de IRCC.",
    "cn.docs.title": "China: prepara los documentos de la Beca del Gobierno Chino",
    "cn.docs.detail":
      "Regístrate en el sistema en línea del CSC, consigue la nominación o recomendación del organismo de tu país y escribe tu plan de estudios. Prepara el Foreigner Physical Examination Form (formulario de examen médico) y comprueba que tu pasaporte sea válido al menos 12 meses después del inicio de tus estudios.",
    "oc.visa.title": "Australia: consigue tu Confirmation of Enrolment y solicita el visado de estudiante",
    "oc.visa.detail":
      "Australia emite la Confirmation of Enrolment (CoE) cuando aceptas la oferta y pagas la primera matrícula. Para el visado de estudiante necesitas la CoE, el seguro médico Overseas Student Health Cover (OSHC), prueba de fondos y respuestas que demuestren que eres un estudiante genuino.",
  },
  fr: {
    "shortlist.title.major": "Dressez une liste restreinte de 8 à 10 universités pour {major}",
    "shortlist.title.open": "Choisissez votre filière et dressez une liste restreinte de 8 à 10 universités",
    "shortlist.detail.tier":
      "Visez environ 2 établissements ambitieux (reach), 3 adaptés (target) et 2 sûrs (safety), centrés sur le niveau de difficulté que vous avez choisi. Comparez le coût et les aides côte à côte.",
    "shortlist.detail.open":
      "Visez environ 2 établissements ambitieux (reach), 3 adaptés (target) et 2 sûrs (safety). Appuyez-vous sur les résultats de l'évaluation et sur la page de comparaison.",
    "english.title": "Réservez et passez un test d'anglais (IELTS, TOEFL ou Duolingo)",
    "english.detail":
      "La plupart des universités veulent un relevé de score avant la date limite. Réservez tôt, car les dates se remplissent vite, et gardez du temps pour repasser le test une fois.",
    "englishCheck.title": "Comparez votre score d'anglais au minimum de chaque université",
    "englishCheck.detail":
      "Les scores sont valables environ deux ans. Si un établissement exige un niveau plus élevé, prévoyez dès maintenant de repasser le test.",
    "sat.title": "Décidez si vous avez besoin du SAT",
    "sat.detail":
      "De nombreuses universités n'exigent pas de test, mais certaines universités américaines et certaines bourses le demandent encore. Vérifiez la politique de chaque établissement de votre liste.",
    "activities.title": "Approfondissez une ou deux activités avec un résultat concret",
    "activities.detail":
      "Les comités d'admission préfèrent un projet au résultat mesurable à une longue liste. Lancez ou dirigez quelque chose que vous pouvez décrire avec des chiffres.",
    "scholarships.title": "Commencez tôt vos candidatures aux bourses",
    "scholarships.detail":
      "Les bourses gouvernementales comme Fulbright, DAAD, MEXT, CSC et Chevening ferment généralement 9 à 12 mois avant le début des études. Vérifiez chaque date limite sur le site officiel.",
    "essay.title": "Rédigez votre essai principal et faites-le relire",
    "essay.detail":
      "Écrivez un premier jet, passez-le dans l'analyseur d'essais, réécrivez-le et demandez à un professeur de le lire. Prévoyez au moins trois versions.",
    "recs.title": "Demandez des lettres de recommandation à vos professeurs",
    "recs.detail":
      "Demandez-les au moins six semaines avant la date limite et donnez à chaque professeur une courte liste de ce que vous avez fait dans son cours.",
    "docs.title": "Préparez vos relevés de notes, traductions et votre passeport",
    "docs.detail": "La traduction officielle et la légalisation chez un notaire peuvent prendre des semaines. Numérisez tout en bonne qualité.",
    "funds.title": "Préparez la preuve de ressources financières",
    "funds.detail": "Les services de visas et certaines universités demandent des relevés bancaires couvrant la première année.",
    "submit.title": "Envoyez toutes vos candidatures et payez les frais ou demandez une exonération",
    "submit.detail":
      "Envoyez-les quelques jours à l'avance, gardez les e-mails de confirmation et vérifiez sur le portail de chaque université qu'il ne manque aucun document.",
    "after.title": "Après les offres : acceptez-en une, versez l'acompte, demandez votre visa et votre logement",
    "after.detail": "Comparez vos offres selon le coût et les aides, acceptez-en une et lancez la procédure de visa tout de suite.",
    "usa.apply.title": "États-Unis : configurez votre Common App et notez les dates limites de chaque université",
    "usa.apply.detail":
      "Créez votre compte Common App, ajoutez vos universités et notez les compléments (supplements) de chacune. Les dates limites Early Decision sont souvent autour du 1er novembre et celles de Regular Decision autour de début janvier, mais chaque université fixe les siennes.",
    "usa.aid.title": "États-Unis : demandez l'aide financière dans la même candidature",
    "usa.aid.detail":
      "Dans certaines universités américaines, les étudiants internationaux doivent demander une aide au moment de candidater et ne peuvent pas le faire plus tard. Vérifiez si chaque université veut le CSS Profile ou son propre formulaire, et réunissez les justificatifs de revenus de votre famille.",
    "uk.ucas.title": "Royaume-Uni : planifiez votre candidature UCAS et votre personal statement",
    "uk.ucas.detail":
      "Vous candidatez via UCAS avec jusqu'à cinq choix. Oxford, Cambridge, la médecine, la dentisterie et la médecine vétérinaire ferment à la mi-octobre, la plupart des autres cursus à la mi-janvier. Commencez tôt votre personal statement.",
    "de.recognition.title": "Allemagne : vérifiez que votre diplôme du secondaire donne un accès direct",
    "de.recognition.detail":
      "Les universités allemandes décident si un diplôme étranger de fin de secondaire donne accès directement. Sinon, il peut vous falloir une année de Studienkolleg ou une première année universitaire dans votre pays. Consultez les conditions pour votre pays sur le site du DAAD et sur la page de chaque université.",
    "de.uniassist.title": "Allemagne : envoyez vos documents à uni-assist au moins 8 semaines à l'avance",
    "de.uniassist.detail":
      "De nombreuses universités allemandes traitent les candidatures internationales via uni-assist. Les dates limites sont souvent le 15 juillet pour le semestre d'hiver et le 15 janvier pour le semestre d'été, et l'évaluation prend généralement 4 à 6 semaines. Si une université demande un examen préalable (VPD), demandez-le en premier.",
    "ca.system.title": "Canada : vérifiez comment chaque université reçoit les candidatures",
    "ca.system.detail":
      "Certaines universités canadiennes reçoivent les candidatures directement, d'autres passent par un système provincial, comme l'OUAC en Ontario. Les dates limites et les documents varient selon l'université et le programme : confirmez chacun.",
    "ca.permit.title": "Canada : obtenez votre lettre d'attestation et demandez un permis d'études",
    "ca.permit.detail":
      "Le Canada demande une lettre d'acceptation, une preuve de fonds et, dans la plupart des cas, une lettre d'attestation provinciale ou territoriale (le Québec exige un CAQ à la place). On obtient généralement la lettre d'attestation après avoir accepté l'offre et payé une partie des frais de scolarité. Vérifiez les montants et les étapes sur le site officiel d'IRCC.",
    "cn.docs.title": "Chine : préparez les documents de la Bourse du gouvernement chinois",
    "cn.docs.detail":
      "Inscrivez-vous sur le système en ligne du CSC, obtenez la nomination ou la recommandation de l'organisme de votre pays et rédigez votre plan d'études. Préparez le Foreigner Physical Examination Form (formulaire d'examen médical) et vérifiez que votre passeport est valable au moins 12 mois après la date de début de vos études.",
    "oc.visa.title": "Australie : obtenez votre Confirmation of Enrolment et demandez le visa étudiant",
    "oc.visa.detail":
      "L'Australie délivre la Confirmation of Enrolment (CoE) une fois que vous avez accepté l'offre et payé les premiers frais de scolarité. Pour le visa étudiant, il faut la CoE, l'assurance santé Overseas Student Health Cover (OSHC), une preuve de fonds et des réponses montrant que vous êtes un véritable étudiant.",
  },
  de: {
    "shortlist.title.major": "Stellen Sie eine Auswahlliste mit 8 bis 10 Hochschulen für {major} zusammen",
    "shortlist.title.open": "Wählen Sie Ihr Fach und stellen Sie eine Auswahlliste mit 8 bis 10 Hochschulen zusammen",
    "shortlist.detail.tier":
      "Planen Sie etwa 2 anspruchsvolle (Reach), 3 passende (Target) und 2 sichere (Safety) Hochschulen ein, orientiert an der von Ihnen gewählten Schwierigkeitsstufe. Vergleichen Sie Kosten und Förderung nebeneinander.",
    "shortlist.detail.open":
      "Planen Sie etwa 2 anspruchsvolle (Reach), 3 passende (Target) und 2 sichere (Safety) Hochschulen ein. Nutzen Sie die Ergebnisse des Assessments und die Vergleichsseite.",
    "english.title": "Melden Sie sich zu einem Englischtest (IELTS, TOEFL oder Duolingo) an und legen Sie ihn ab",
    "english.detail":
      "Die meisten Hochschulen verlangen vor der Frist einen Testnachweis. Buchen Sie früh, denn die Termine sind schnell vergeben, und lassen Sie Zeit für eine Wiederholung.",
    "englishCheck.title": "Vergleichen Sie Ihr Englischergebnis mit dem Mindestwert jeder Hochschule",
    "englishCheck.detail":
      "Ergebnisse gelten etwa zwei Jahre. Verlangt eine Hochschule einen höheren Wert, planen Sie jetzt eine Wiederholung ein.",
    "sat.title": "Entscheiden Sie, ob Sie den SAT brauchen",
    "sat.detail":
      "Viele Hochschulen verlangen keinen Test, aber manche US-Hochschulen und Stipendien fragen noch danach. Prüfen Sie die Regeln jeder Hochschule auf Ihrer Liste.",
    "activities.title": "Vertiefen Sie ein bis zwei Aktivitäten mit einem konkreten Ergebnis",
    "activities.detail":
      "Zulassungsstellen bevorzugen ein Projekt mit messbarem Ergebnis gegenüber einer langen Liste. Starten oder leiten Sie etwas, das sich mit Zahlen beschreiben lässt.",
    "scholarships.title": "Beginnen Sie früh mit den Stipendienbewerbungen",
    "scholarships.detail":
      "Staatliche Stipendien wie Fulbright, DAAD, MEXT, CSC und Chevening schließen meist 9 bis 12 Monate vor Studienbeginn. Prüfen Sie jede Frist auf der offiziellen Website.",
    "essay.title": "Schreiben Sie Ihr Hauptessay und holen Sie Feedback ein",
    "essay.detail":
      "Schreiben Sie einen ersten Entwurf, lassen Sie ihn vom Essay-Analyzer prüfen, überarbeiten Sie ihn und bitten Sie eine Lehrkraft, ihn zu lesen. Planen Sie mindestens drei Fassungen ein.",
    "recs.title": "Bitten Sie Lehrkräfte um Empfehlungsschreiben",
    "recs.detail":
      "Fragen Sie mindestens sechs Wochen vor der Frist und geben Sie jeder Lehrkraft eine kurze Liste, was Sie in ihrem Unterricht geleistet haben.",
    "docs.title": "Bereiten Sie Zeugnisse, Übersetzungen und Ihren Reisepass vor",
    "docs.detail": "Offizielle Übersetzungen und Beglaubigungen können Wochen dauern. Scannen Sie alles in guter Qualität.",
    "funds.title": "Bereiten Sie den Finanzierungsnachweis vor",
    "funds.detail": "Visastellen und manche Hochschulen verlangen Kontoauszüge, die das erste Jahr abdecken.",
    "submit.title": "Reichen Sie alle Bewerbungen ein und zahlen Sie die Gebühren oder beantragen Sie einen Erlass",
    "submit.detail":
      "Reichen Sie einige Tage vor der Frist ein, bewahren Sie die Bestätigungs-E-Mails auf und prüfen Sie im Portal jeder Hochschule, ob Unterlagen fehlen.",
    "after.title": "Nach den Zusagen: eine annehmen, Kaution zahlen, Visum und Unterkunft beantragen",
    "after.detail": "Vergleichen Sie Ihre Zusagen nach Kosten und Förderung, nehmen Sie eine an und starten Sie sofort das Visumverfahren.",
    "usa.apply.title": "USA: Richten Sie Ihre Common App ein und notieren Sie die Fristen jeder Hochschule",
    "usa.apply.detail":
      "Legen Sie Ihr Common-App-Konto an, fügen Sie Ihre Hochschulen hinzu und notieren Sie die Zusatzunterlagen (Supplements) jeder Hochschule. Die Fristen für Early Decision liegen oft um den 1. November und für Regular Decision Anfang Januar, aber jede Hochschule legt ihre eigenen fest.",
    "usa.aid.title": "USA: Beantragen Sie finanzielle Unterstützung in derselben Bewerbung",
    "usa.aid.detail":
      "An einigen US-Hochschulen müssen internationale Studierende die Unterstützung bei der Bewerbung beantragen und können das später nicht nachholen. Prüfen Sie, ob jede Hochschule das CSS Profile oder ein eigenes Formular verlangt, und sammeln Sie die Einkommensnachweise Ihrer Familie.",
    "uk.ucas.title": "Vereinigtes Königreich: Planen Sie Ihre UCAS-Bewerbung und das Personal Statement",
    "uk.ucas.detail":
      "Sie bewerben sich über UCAS mit bis zu fünf Wahlmöglichkeiten. Oxford, Cambridge sowie Medizin, Zahnmedizin und Tiermedizin schließen Mitte Oktober, die meisten anderen Studiengänge Mitte Januar. Beginnen Sie früh mit Ihrem Personal Statement.",
    "de.recognition.title": "Deutschland: Prüfen Sie, ob Ihr Schulabschluss den direkten Hochschulzugang ermöglicht",
    "de.recognition.detail":
      "Deutsche Hochschulen entscheiden selbst, ob ein ausländischer Schulabschluss zum direkten Zugang berechtigt. Falls nicht, brauchen Sie womöglich ein Studienkolleg-Jahr oder ein erstes Studienjahr an einer Hochschule in Ihrem Land. Prüfen Sie die Anforderungen für Ihr Land auf der DAAD-Website und auf der Seite jeder Hochschule.",
    "de.uniassist.title": "Deutschland: Senden Sie Ihre Unterlagen mindestens 8 Wochen früher an uni-assist",
    "de.uniassist.detail":
      "Viele deutsche Hochschulen bearbeiten internationale Bewerbungen über uni-assist. Die Fristen sind oft der 15. Juli für das Wintersemester und der 15. Januar für das Sommersemester, die Bearbeitung dauert in der Regel 4 bis 6 Wochen. Verlangt eine Hochschule eine Vorprüfungsdokumentation (VPD), beantragen Sie diese zuerst.",
    "ca.system.title": "Kanada: Prüfen Sie, wie jede Hochschule Bewerbungen annimmt",
    "ca.system.detail":
      "Manche kanadischen Hochschulen nehmen Bewerbungen direkt an, andere nutzen ein Provinzsystem wie OUAC in Ontario. Fristen und erforderliche Unterlagen unterscheiden sich je nach Hochschule und Programm, bestätigen Sie also jede einzelne.",
    "ca.permit.title": "Kanada: Holen Sie Ihr Attestation Letter und beantragen Sie die Studiengenehmigung",
    "ca.permit.detail":
      "Kanada verlangt ein Zulassungsschreiben, einen Finanzierungsnachweis und in den meisten Fällen ein Attestation Letter der Provinz oder des Territoriums (Québec verlangt stattdessen ein CAQ). Das Attestation Letter erhalten Sie in der Regel, nachdem Sie die Zusage angenommen und einen Teil der Studiengebühren bezahlt haben. Beträge und Schritte finden Sie auf der offiziellen IRCC-Website.",
    "cn.docs.title": "China: Bereiten Sie die Unterlagen für das Chinese Government Scholarship vor",
    "cn.docs.detail":
      "Registrieren Sie sich im CSC-Onlinesystem, holen Sie die Nominierung oder Empfehlung der zuständigen Stelle in Ihrem Land ein und schreiben Sie Ihren Studienplan. Bereiten Sie das Foreigner Physical Examination Form (ärztliches Untersuchungsformular) vor und prüfen Sie, dass Ihr Reisepass nach Studienbeginn noch mindestens 12 Monate gültig ist.",
    "oc.visa.title": "Australien: Holen Sie Ihre Confirmation of Enrolment und beantragen Sie das Studentenvisum",
    "oc.visa.detail":
      "Australien stellt die Confirmation of Enrolment (CoE) aus, nachdem Sie die Zusage angenommen und die erste Studiengebühr bezahlt haben. Für das Studentenvisum brauchen Sie die CoE, die Krankenversicherung Overseas Student Health Cover (OSHC), einen Finanzierungsnachweis und Antworten, die zeigen, dass Sie ein echter Student sind.",
  },
};
