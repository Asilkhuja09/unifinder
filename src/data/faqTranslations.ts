import type { LangCode } from "@/lib/i18n";

/**
 * Hand-written translations of the home-page FAQ, in the same order as `FAQ` in `routes/index.tsx`.
 *
 * The FAQ is the one block of long text every visitor reads, so it must not depend on the runtime AI
 * translator succeeding. Languages missing here fall back to that translator.
 * If you change an English question or answer, update the matching entry in every language below.
 */
export type FaqTranslation = { readonly q: readonly string[]; readonly a: readonly string[] };

export const FAQ_TRANSLATIONS: Partial<Record<LangCode, FaqTranslation>> = {
  uz: {
    q: [
      "UniFinder universitet tanlashda umumiy AI chatbotdan nimasi bilan farq qiladi?",
      "Universitet reytinglari va moliyaviy yordam mosligi qanday hisoblanadi?",
      "Platformadan foydalanishni boshlash uchun rasmiy ingliz tili sertifikati kerakmi?",
      "Davlat moliyalashtirish yo'nalishlari (Fulbright, DAAD, MEXT, CSC) qanday ishlaydi?",
      "Ariza profilim ma'lumotlari xavfsiz saqlanadimi?",
    ],
    a: [
      "Umumiy chatbot har safar javobni xotirasidan yozadi, shuning uchun bir xil savolga har xil universitetlar chiqishi mumkin, u muddat, o'qish narxi yoki hatto mavjud bo'lmagan universitetni ham o'ylab topishi mumkin. UniFinder esa teskari ishlaydi: sizning 9 bosqichli profilingiz haqiqiy muassasalarning qat'iy ro'yxati bilan har safar bir xil qoidalar asosida solishtiriladi, shuning uchun ertaga ham xuddi shu tartiblangan ro'yxatni olasiz va har bir natija nima uchun mos kelishini ko'rsatadi (baholar, test ballari, hudud, tanlov qattiqligi, moliyaviy yordam siyosati). E'lon qilingan raqamlar emas, modellashtirilgan taxminlar bo'lgan ko'rsatkichlar «taxmin» deb belgilanadi, har bir universitet va stipendiya rasmiy saytiga havola qiladi, shuning uchun topshirishdan oldin tekshirib olasiz. Stipendiya yo'nalishlari, kampus suratlari va xarita marshrutlari bir joyda turadi, javobni bir nechta chat xabaridan yig'ib o'tirmaysiz.",
      "Ro'yxatdagi har bir muassasa umumiy jahon reytingi (QS/THE oralig'i), e'lon qilingan qabul foizi, xorijiy talabalar uchun o'qish narxi va xorijliklarga moliyaviy yordam belgisiga ega. Sizning baholash javoblaringiz — maqsadli hududlar, qiyinlik darajasi, mo'ljallangan mutaxassislik, daromad toifasi va moliyalashtirish ehtiyoji — shu ma'lumotlar to'plamiga filtr sifatida qo'llanadi, ya'ni moslik degani maktabning reyting darajasi, tanlov qattiqligi va yordam siyosati profilingizga mos kelishini bildiradi. Hech narsa tasodifiy tanlanmaydi.",
      "Yo'q. Test bosqichida «Yo'q / Hali standart test topshirmaganman» ni tanlab, baholashni to'xtovsiz davom ettirishingiz mumkin. Shunda moslashtirish o'qish natijalaringiz, moliyalashtirish ehtiyoji va maqsadli hududlarga tayanadi, natijalarda esa ballarni keyinroq topshirishga ruxsat beradigan muassasalar va tayyorlov dasturlari ajratib ko'rsatiladi.",
      "Bu bitta universitet emas, balki davlat tomonidan beriladigan, davlat mablag'i hisobidan to'lanadigan stipendiyalar. Ular uchun homiy tashkilot — milliy komissiya, elchixona yoki vazirlik — orqali, odatda qabul boshlanishidan 9–12 oy oldin murojaat qilinadi, stipendiya odatda o'qish haqi, oylik yashash nafaqasi, sug'urta va aviachiptani qoplaydi. UniFinder har bir yo'nalishning qamrovi, talablari va rasmiy portalini ko'rsatadi, shunda arizani to'g'ridan-to'g'ri hukumat saytida topshirasiz.",
      "Ha. Kirish boshqariladigan OAuth provayderlari orqali amalga oshadi, hisobingizga bog'langan hamma narsa — saqlangan universitetlar, esse baholari va profil ma'lumotlaringiz — himoyalangan, ularni faqat sizning tizimga kirgan sessiyangiz o'qiy yoki o'zgartira oladi. Tizimga kirmagan bo'lsangiz, baholash javoblari brauzeringizda qoladi; kirgan bo'lsangiz, oxirgi baholashingiz profilingizga saqlanadi va unga qaytishingiz mumkin. Ma'lumotlaringizni hech qachon sotmaymiz va boshqalarga bermaymiz.",
    ],
  },
  ru: {
    q: [
      "Чем UniFinder отличается от обычного ИИ-чат-бота, когда нужно подобрать университет?",
      "Как рассчитываются рейтинги вузов и подбор финансовой помощи?",
      "Нужен ли официальный сертификат по английскому, чтобы начать пользоваться платформой?",
      "Как работают государственные программы финансирования (Fulbright, DAAD, MEXT, CSC)?",
      "Надёжно ли хранятся данные моего профиля?",
    ],
    a: [
      "Обычный чат-бот каждый раз пишет ответ по памяти, поэтому на один и тот же вопрос он может назвать разные вузы, а также выдумать срок подачи, стоимость обучения или даже несуществующий университет. UniFinder работает наоборот: ваш профиль из 9 шагов сопоставляется с фиксированным справочником реальных учебных заведений по одним и тем же правилам, поэтому завтра вы получите тот же ранжированный список, а каждый результат показывает, почему он подходит (оценки, баллы тестов, регион, конкурс, политика финансовой помощи). Показатели, которые являются модельными оценками, а не опубликованными цифрами, помечены как оценки, а у каждого вуза и стипендии есть ссылка на официальный сайт, чтобы вы могли всё проверить перед подачей. Стипендиальные программы, фотографии кампусов и маршруты на карте собраны в одном месте, и вам не придётся собирать ответ из нескольких сообщений чата.",
      "У каждого вуза в справочнике есть сводный мировой рейтинг (диапазон QS/THE), опубликованный процент приёма, стоимость обучения для иностранцев и отметка о помощи иностранным студентам. Ваши ответы в оценке — целевые регионы, уровень сложности, желаемая специальность, группа дохода и потребность в финансировании — применяются как фильтры к этим данным, поэтому совпадение означает, что рейтинговая группа, конкурс и политика помощи вуза подходят вашему профилю. Ничего не выбирается случайно.",
      "Нет. На шаге с тестами можно выбрать «Нет / Стандартного теста пока нет» и сразу продолжить оценку. Тогда подбор опирается на вашу успеваемость, потребность в финансировании и целевые регионы, а в результатах будут выделены вузы и подготовительные программы, которые принимают баллы позже.",
      "Это стипендии, финансируемые государством: их присуждает страна, а не отдельный университет. Заявку подают через организатора программы — национальную комиссию, посольство или министерство — обычно за 9–12 месяцев до начала обучения, и стипендия, как правило, покрывает обучение, ежемесячное пособие на проживание, страховку и перелёты. UniFinder показывает для каждой программы, что она покрывает, требования и официальный портал, чтобы вы подавали заявку прямо на сайте государства.",
      "Да. Вход выполняется через управляемых OAuth-провайдеров, а всё, что связано с вашим аккаунтом, — сохранённые университеты, оценки эссе и данные профиля — защищено так, что читать и изменять это может только ваша авторизованная сессия. Если вы не вошли в аккаунт, ответы оценки остаются в вашем браузере; если вошли, последняя оценка сохраняется в профиле, чтобы вы могли к ней вернуться. Мы никогда не продаём и не передаём ваши данные.",
    ],
  },
  zh: {
    q: [
      "UniFinder 与向通用 AI 聊天机器人咨询大学有什么不同？",
      "大学排名和资助匹配是如何计算的？",
      "开始使用平台需要正式的英语证书吗？",
      "政府资助项目（Fulbright、DAAD、MEXT、CSC）是如何运作的？",
      "我的申请档案数据是否安全存储？",
    ],
    a: [
      "通用聊天机器人每次都凭记忆生成答案，所以同一个问题可能得到不同的学校，还可能编造截止日期、学费数字，甚至根本不存在的大学。UniFinder 的做法正好相反：您的 9 步档案会按照每次相同的规则，与一份固定的真实院校目录进行匹配，因此明天您会得到同样的排序列表，而且每条结果都会说明为什么适合您（成绩、考试分数、地区、录取难度、资助政策）。属于模型估算而非公开数据的数字会标注为估算，每所学校和每项奖学金都链接到其官方网站，方便您在申请前核实。奖学金通道、校园照片和地图路线都在同一个地方，您无需从多条聊天回复中拼凑答案。",
      "目录中的每所院校都有综合世界排名（QS/THE 区间）、已公布的录取率、国际学生学费，以及是否资助国际学生的标记。您在评估中的回答——目标地区、难度层级、意向专业、收入档位和资金需求——会作为筛选条件应用于这些数据，因此“匹配”意味着学校的排名层级、录取难度和资助政策都符合您的情况。其中没有任何随机成分。",
      "不需要。在考试步骤中，您可以选择“无 / 暂无标准化考试”，然后直接继续评估。此时匹配将依据您的学业成绩、资金需求和目标地区，结果中会突出显示允许日后补交成绩的院校和预科项目。",
      "这些是由政府出资、以国家名义而非单所大学颁发的奖学金。您需要通过主办机构——国家委员会、大使馆或部委——申请，通常在入学前 9 至 12 个月，奖学金一般涵盖学费以及每月生活补助、保险和机票。UniFinder 会列出每个项目的资助范围、申请资格和官方入口，方便您直接在政府网站上申请。",
      "是的。登录通过受管理的 OAuth 服务商完成，与您账户相关的一切——已保存的大学、文书评估和档案资料——都受到保护，只有您已验证的会话才能读取或修改。如果您未登录，评估答案只保留在您的浏览器中；如果已登录，您最近一次的评估会保存到您的档案，方便您随时回看。我们绝不会出售或分享您的数据。",
    ],
  },
  tr: {
    q: [
      "UniFinder, üniversite için genel bir yapay zekâ sohbet botuna sormaktan nasıl farklı?",
      "Üniversite sıralamaları ve burs eşleşmeleri nasıl hesaplanıyor?",
      "Platformu kullanmaya başlamak için resmî bir İngilizce sertifikası gerekli mi?",
      "Devlet burs programları (Fulbright, DAAD, MEXT, CSC) nasıl işliyor?",
      "Başvuru profili verilerim güvenli şekilde saklanıyor mu?",
    ],
    a: [
      "Genel bir sohbet botu cevabı her seferinde hafızasından yazar; bu yüzden aynı soru farklı okullar getirebilir, ayrıca bir son başvuru tarihini, bir harç rakamını ya da hiç var olmayan bir üniversiteyi uydurabilir. UniFinder ise tersine çalışır: 9 adımlı profiliniz, gerçek kurumlardan oluşan sabit bir rehberle her seferinde aynı kurallarla eşleştirilir; böylece yarın da aynı sıralı listeyi alırsınız ve her sonuç neden uygun olduğunu gösterir (notlar, sınav puanları, bölge, seçicilik, burs politikası). Yayımlanmış rakam değil de modellenmiş tahmin olan değerler tahmin olarak etiketlenir ve her okul ile burs resmî web sitesine bağlanır; başvurmadan önce doğrulayabilirsiniz. Burs yolları, kampüs fotoğrafları ve harita rotaları aynı yerde durur; yani cevabı birkaç sohbet mesajından birleştirmeniz gerekmez.",
      "Rehberdeki her kurumun bileşik bir dünya sıralaması (QS/THE aralığı), yayımlanmış bir kabul oranı, uluslararası öğrenci harcı ve uluslararası öğrencilere yardım bayrağı vardır. Değerlendirme yanıtlarınız — hedef bölgeler, zorluk düzeyi, düşündüğünüz bölüm, gelir dilimi ve finansman ihtiyacı — bu veri kümesine filtre olarak uygulanır; yani bir eşleşme, okulun sıralama kademesinin, seçiciliğinin ve yardım politikasının profilinize uyduğu anlamına gelir. Hiçbir şey rastgele seçilmez.",
      "Hayır. Sınav adımında “Yok / Henüz standart sınav yok” seçeneğini seçip değerlendirmeye doğrudan devam edebilirsiniz. Eşleştirme o zaman akademik başarınıza, finansman ihtiyacınıza ve hedef bölgelerinize dayanır; sonuçlarınızda puanın daha sonra teslim edilmesini kabul eden kurumlar ve hazırlık programları öne çıkarılır.",
      "Bunlar tek bir üniversite tarafından değil, bir ülke tarafından verilen, devlet destekli burslardır. Başvuruyu destekleyen kuruluş — ulusal bir komisyon, büyükelçilik ya da bakanlık — aracılığıyla, genellikle dönem başlangıcından 9–12 ay önce yaparsınız; burs genellikle öğrenim ücretini, aylık yaşam giderini, sigortayı ve uçuşları karşılar. UniFinder her programın kapsamını, uygunluk koşullarını ve resmî portalını listeler; böylece doğrudan devletin sitesinden başvurursunuz.",
      "Evet. Giriş, yönetilen OAuth sağlayıcıları üzerinden yapılır ve hesabınıza bağlı her şey — kayıtlı üniversiteler, kompozisyon değerlendirmeleri ve profil bilgileriniz — yalnızca kimliği doğrulanmış oturumunuzun okuyup değiştirebileceği şekilde korunur. Giriş yapmadıysanız değerlendirme yanıtlarınız tarayıcınızda kalır; giriş yaptıysanız son değerlendirmeniz profilinize kaydedilir ve ona geri dönebilirsiniz. Verilerinizi asla satmaz veya paylaşmayız.",
    ],
  },
  ar: {
    q: [
      "بماذا يختلف UniFinder عن سؤال روبوت دردشة ذكاء اصطناعي عام عن الجامعات؟",
      "كيف تُحسب تصنيفات الجامعات ومطابقات الدعم المالي؟",
      "هل أحتاج إلى شهادة إنجليزية رسمية لبدء استخدام المنصة؟",
      "كيف تعمل مسارات التمويل الحكومية (Fulbright وDAAD وMEXT وCSC)؟",
      "هل بيانات ملف التقديم الخاص بي مخزَّنة بأمان؟",
    ],
    a: [
      "يكتب روبوت الدردشة العام الإجابة من الذاكرة في كل مرة، لذلك قد يعطي السؤال نفسه جامعات مختلفة، وقد يختلق موعدًا نهائيًا أو رقمًا للرسوم الدراسية أو حتى جامعة غير موجودة. أما UniFinder فيعمل بالعكس: تتم مطابقة ملفك المكوّن من 9 خطوات مع دليل ثابت لمؤسسات حقيقية وفق القواعد نفسها في كل مرة، فتحصل غدًا على القائمة المرتبة نفسها، وتوضح كل نتيجة سبب ملاءمتها (الدرجات ودرجات الاختبارات والمنطقة ومستوى الانتقائية وسياسة الدعم المالي). وتُوسَم الأرقام التي هي تقديرات نموذجية لا بيانات منشورة بأنها تقديرات، وترتبط كل جامعة ومنحة بموقعها الرسمي لتتحقق قبل التقديم. وتوجد مسارات المنح وصور الحرم الجامعي ومسارات الخريطة في مكان واحد، فلا تحتاج إلى تجميع الإجابة من عدة رسائل دردشة.",
      "لكل مؤسسة في الدليل تصنيف عالمي مركّب (نطاق QS/THE) ونسبة قبول منشورة ورسوم دراسية للطلاب الدوليين وعلامة تدل على توفر دعم للطلاب الدوليين. وتُطبَّق إجاباتك في التقييم — المناطق المستهدفة ومستوى الصعوبة والتخصص المقصود وفئة الدخل واحتياج التمويل — كمرشحات على هذه البيانات، فالمطابقة تعني أن مستوى تصنيف الجامعة ومدى انتقائيتها وسياسة الدعم لديها كلها تناسب ملفك. لا شيء يتم عشوائيًا.",
      "لا. في خطوة الاختبارات يمكنك اختيار «لا يوجد / لا اختبار موحد حتى الآن» ومتابعة التقييم مباشرة. عندئذٍ تعتمد المطابقة على تحصيلك الأكاديمي واحتياجك التمويلي ومناطقك المستهدفة، وستبرز نتائجك المؤسسات والبرامج التمهيدية التي تقبل تقديم الدرجات لاحقًا.",
      "هي منح ممولة من الحكومات تمنحها دولة ما لا جامعة بعينها. تتقدم عبر الجهة الراعية — لجنة وطنية أو سفارة أو وزارة — عادةً قبل بدء الدراسة بـ 9 إلى 12 شهرًا، وتغطي المنحة عادةً الرسوم الدراسية إضافة إلى مخصص معيشة شهري والتأمين وتذاكر السفر. يعرض UniFinder تغطية كل مسار وشروط الأهلية والبوابة الرسمية ليتم التقديم مباشرة عبر الموقع الحكومي.",
      "نعم. يتم تسجيل الدخول عبر مزوّدي OAuth مُدارين، ويُحمى كل ما يرتبط بحسابك — الجامعات المحفوظة وتقييمات المقالات وبيانات ملفك — بحيث لا يستطيع قراءته أو تعديله سوى جلستك الموثّقة. إذا لم تكن قد سجلت الدخول فتبقى إجابات التقييم في متصفحك، وإذا كنت مسجلًا فيُحفظ آخر تقييم لك في ملفك الشخصي لتعود إليه. لا نبيع بياناتك ولا نشاركها أبدًا.",
    ],
  },
  es: {
    q: [
      "¿En qué se diferencia UniFinder de preguntar por universidades a un chatbot de IA general?",
      "¿Cómo se calculan los rankings universitarios y las coincidencias de ayudas?",
      "¿Necesito un certificado oficial de inglés para empezar a usar la plataforma?",
      "¿Cómo funcionan los programas de financiación estatales (Fulbright, DAAD, MEXT, CSC)?",
      "¿Mis datos de perfil de solicitud se guardan de forma segura?",
    ],
    a: [
      "Un chatbot general escribe la respuesta de memoria cada vez, así que la misma pregunta puede devolver universidades distintas y puede inventarse una fecha límite, una cifra de matrícula o incluso una universidad que no existe. UniFinder funciona al revés: tu perfil de 9 pasos se compara con un directorio fijo de instituciones reales con las mismas reglas siempre, de modo que mañana obtienes la misma lista ordenada, y cada resultado muestra por qué encaja (notas, puntuaciones, región, selectividad, política de ayudas). Las cifras que son estimaciones de un modelo y no datos publicados se marcan como estimaciones, y cada universidad y beca enlaza a su web oficial para que lo confirmes antes de postular. Las becas, las fotos de los campus y las rutas en el mapa están en el mismo lugar, así que no tienes que armar una respuesta a partir de varios mensajes de chat.",
      "Cada institución del directorio tiene un ranking mundial compuesto (banda QS/THE), una tasa de admisión publicada, la matrícula para estudiantes internacionales y un indicador de ayudas para internacionales. Tus respuestas de la evaluación —regiones objetivo, nivel de dificultad, carrera prevista, tramo de ingresos y necesidad de financiación— se aplican como filtros sobre esos datos, de modo que una coincidencia significa que el nivel de ranking, la selectividad y la política de ayudas de la institución encajan con tu perfil. Nada es aleatorio.",
      "No. En el paso de pruebas puedes elegir «Ninguna / Aún sin prueba estandarizada» y seguir directamente con la evaluación. La búsqueda se basa entonces en tu rendimiento académico, tus necesidades de financiación y tus regiones objetivo, y los resultados destacarán instituciones y programas puente que aceptan enviar las puntuaciones más tarde.",
      "Son becas financiadas por gobiernos que concede un país, no una sola universidad. Se solicitan a través del organismo patrocinador —una comisión nacional, una embajada o un ministerio—, normalmente entre 9 y 12 meses antes del inicio del curso, y la beca suele cubrir la matrícula más una asignación mensual de manutención, seguro y vuelos. UniFinder indica la cobertura, los requisitos y el portal oficial de cada programa para que solicites directamente en la web del gobierno.",
      "Sí. El inicio de sesión funciona con proveedores OAuth gestionados, y todo lo asociado a tu cuenta —universidades guardadas, evaluaciones de ensayos y datos de perfil— está protegido para que solo tu sesión autenticada pueda leerlo o modificarlo. Si no has iniciado sesión, las respuestas de la evaluación se quedan en tu navegador; si lo has hecho, tu última evaluación se guarda en tu perfil para que puedas volver a ella. Nunca vendemos ni compartimos tus datos.",
    ],
  },
  fr: {
    q: [
      "En quoi UniFinder diffère-t-il d'un chatbot d'IA généraliste pour choisir une université ?",
      "Comment sont calculés les classements des universités et les correspondances d'aides ?",
      "Ai-je besoin d'un certificat d'anglais officiel pour commencer à utiliser la plateforme ?",
      "Comment fonctionnent les programmes de financement d'État (Fulbright, DAAD, MEXT, CSC) ?",
      "Les données de mon profil de candidature sont-elles stockées de façon sécurisée ?",
    ],
    a: [
      "Un chatbot généraliste rédige chaque fois une réponse de mémoire : la même question peut donc renvoyer des établissements différents, et il peut inventer une date limite, un montant de frais de scolarité, voire une université qui n'existe pas. UniFinder fonctionne à l'inverse : votre profil en 9 étapes est comparé à un annuaire fixe d'établissements réels, avec les mêmes règles à chaque fois ; vous obtenez donc demain la même liste classée, et chaque résultat indique pourquoi il vous convient (notes, scores aux tests, région, sélectivité, politique d'aide). Les chiffres qui sont des estimations modélisées plutôt que des données publiées sont signalés comme des estimations, et chaque établissement et chaque bourse renvoie vers son site officiel pour que vous puissiez vérifier avant de candidater. Les bourses, les photos de campus et les itinéraires sur la carte se trouvent au même endroit : vous n'avez pas à reconstituer une réponse à partir de plusieurs messages de chat.",
      "Chaque établissement de l'annuaire possède un classement mondial composite (tranche QS/THE), un taux d'admission publié, des frais de scolarité pour les étudiants internationaux et un indicateur d'aide aux étudiants internationaux. Vos réponses à l'évaluation — régions visées, niveau de difficulté, filière envisagée, tranche de revenus et besoin de financement — sont appliquées comme des filtres sur ces données : une correspondance signifie donc que le niveau de classement, la sélectivité et la politique d'aide de l'établissement conviennent à votre profil. Rien n'est aléatoire.",
      "Non. À l'étape des tests, vous pouvez choisir « Aucun / Pas encore de test standardisé » et poursuivre directement l'évaluation. La mise en correspondance repose alors sur vos résultats scolaires, votre besoin de financement et vos régions visées, et vos résultats mettront en avant les établissements et les programmes passerelles qui acceptent l'envoi des scores plus tard.",
      "Ce sont des bourses financées par un gouvernement et attribuées par un pays, et non par une seule université. On candidate auprès de l'organisme qui les finance — une commission nationale, une ambassade ou un ministère —, généralement 9 à 12 mois avant la rentrée, et la bourse couvre en principe les frais de scolarité, une allocation mensuelle de subsistance, l'assurance et les vols. UniFinder indique pour chaque programme ce qui est couvert, les conditions d'éligibilité et le portail officiel, afin que vous candidatiez directement sur le site du gouvernement.",
      "Oui. La connexion passe par des fournisseurs OAuth gérés, et tout ce qui est lié à votre compte — universités enregistrées, évaluations d'essais et informations de profil — est protégé de sorte que seule votre session authentifiée puisse le lire ou le modifier. Si vous n'êtes pas connecté, les réponses de l'évaluation restent dans votre navigateur ; si vous l'êtes, votre dernière évaluation est enregistrée dans votre profil pour que vous puissiez y revenir. Nous ne vendons ni ne partageons jamais vos données.",
    ],
  },
  de: {
    q: [
      "Worin unterscheidet sich UniFinder davon, einen allgemeinen KI-Chatbot nach Universitäten zu fragen?",
      "Wie werden Hochschulrankings und Förderungs-Treffer berechnet?",
      "Brauche ich ein offizielles Englischzertifikat, um die Plattform zu nutzen?",
      "Wie funktionieren staatliche Förderprogramme (Fulbright, DAAD, MEXT, CSC)?",
      "Werden die Daten meines Bewerbungsprofils sicher gespeichert?",
    ],
    a: [
      "Ein allgemeiner Chatbot schreibt die Antwort jedes Mal aus dem Gedächtnis; dieselbe Frage kann daher unterschiedliche Hochschulen liefern, und er kann eine Frist, eine Studiengebühr oder sogar eine Universität erfinden, die es nicht gibt. UniFinder arbeitet umgekehrt: Ihr 9-Schritte-Profil wird jedes Mal nach denselben Regeln mit einem festen Verzeichnis realer Einrichtungen abgeglichen, sodass Sie morgen dieselbe Rangliste erhalten, und jedes Ergebnis zeigt, warum es passt (Noten, Testergebnisse, Region, Selektivität, Förderpolitik). Zahlen, die modellierte Schätzungen und keine veröffentlichten Angaben sind, werden als Schätzung gekennzeichnet, und jede Hochschule und jedes Stipendium verlinkt auf die offizielle Website, damit Sie es vor der Bewerbung prüfen können. Stipendienwege, Campusfotos und Kartenrouten finden Sie an einem Ort und müssen sich die Antwort nicht aus mehreren Chat-Nachrichten zusammensetzen.",
      "Jede Einrichtung im Verzeichnis hat ein zusammengesetztes Weltranking (QS/THE-Bereich), eine veröffentlichte Zulassungsquote, Studiengebühren für internationale Studierende und eine Kennzeichnung für Förderung internationaler Studierender. Ihre Antworten im Assessment — Zielregionen, Schwierigkeitsstufe, geplantes Fach, Einkommensgruppe und Finanzierungsbedarf — werden als Filter auf diesen Datensatz angewendet; ein Treffer bedeutet also, dass Rangstufe, Selektivität und Förderpolitik der Hochschule zu Ihrem Profil passen. Nichts ist zufällig.",
      "Nein. Im Testschritt können Sie „Keiner / Noch kein standardisierter Test“ wählen und das Assessment direkt fortsetzen. Das Matching stützt sich dann auf Ihre schulischen Leistungen, Ihren Finanzierungsbedarf und Ihre Zielregionen, und Ihre Ergebnisse heben Einrichtungen und Vorbereitungsprogramme hervor, die eine spätere Nachreichung der Testergebnisse akzeptieren.",
      "Das sind staatlich finanzierte Stipendien, die von einem Land und nicht von einer einzelnen Universität vergeben werden. Die Bewerbung läuft über die fördernde Stelle — eine nationale Kommission, Botschaft oder ein Ministerium —, in der Regel 9–12 Monate vor Studienbeginn, und das Stipendium deckt typischerweise Studiengebühren sowie einen monatlichen Lebensunterhalt, Versicherung und Flüge. UniFinder listet für jedes Programm Leistungen, Voraussetzungen und das offizielle Portal auf, sodass Sie sich direkt auf der Regierungsseite bewerben.",
      "Ja. Die Anmeldung läuft über verwaltete OAuth-Anbieter, und alles, was mit Ihrem Konto verknüpft ist — gespeicherte Universitäten, Essay-Bewertungen und Profilangaben —, ist so geschützt, dass nur Ihre angemeldete Sitzung es lesen oder ändern kann. Wenn Sie nicht angemeldet sind, bleiben die Assessment-Antworten in Ihrem Browser; sind Sie angemeldet, wird Ihr letztes Assessment in Ihrem Profil gespeichert, damit Sie darauf zurückkommen können. Wir verkaufen oder teilen Ihre Daten niemals.",
    ],
  },
};
