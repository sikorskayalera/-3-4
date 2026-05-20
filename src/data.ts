import { Feature, MobileObject } from './types';

export const MOBILE_OBJECTS: MobileObject[] = [
  {
    id: 'apple',
    name: 'Apple iPhone',
    brand: 'Apple',
    color: '#000000',
    accentColor: 'indigo',
    description: 'Флагманський смартфон від компанії Apple на базі операційної системи iOS. Відомий своєю преміальною екосистемою, високою продуктивністю процесорів серії A/M, технологією TrueDepth Face ID та акцентом на конфіденційність.',
    tagline: 'Think Different. Працює як магія.',
    specifications: [
      'ОС: iOS',
      'Процесор: Apple A-series Bionic/Pro',
      'Екран: Super Retina XDR OLED',
      'Матеріали: Хірургічна сталь або Титан Grade 5',
      'Безпека: Face ID (TrueDepth)'
    ]
  },
  {
    id: 'samsung',
    name: 'Samsung Galaxy',
    brand: 'Samsung',
    color: '#0A5C99',
    accentColor: 'blue',
    description: 'Преміальна лінійка Android-смартфонів від лідера ринку Samsung. Відрізняється передовими технологіями екранів Dynamic AMOLED 2X, підтримкою пера S Pen, унікальним десктопним режимом DeX та інтелектуальною системою Galaxy AI.',
    tagline: 'Найкращі екрани та максимальна технологічність.',
    specifications: [
      'ОС: Android із фірмовою One UI',
      'Процесор: Exynos або Snapdragon for Galaxy',
      'Екран: Dynamic AMOLED 2X',
      'Камера: Space Zoom 100x (у моделях Ultra)',
      'Безпека: Samsung Knox апаратний чіп'
    ]
  },
  {
    id: 'google',
    name: 'Google Pixel',
    brand: 'Google',
    color: '#1A73E8',
    accentColor: 'rose',
    description: 'Еталонний Android-смартфон від розробника самої операційної системи. Має винятковий софт без зайвих надбудов, унікальні ШІ-алгоритми камери на базі процесора Google Tensor, вбудовану модель Gemini Nano та 7-річну підтримку.',
    tagline: 'Штучний інтелект від Google у вашій кишені.',
    specifications: [
      'ОС: Чистий Android з Pixel Launcher',
      'Процесор: Google Tensor G-series',
      'Екран: Actua / Super Actua OLED',
      'Камера: ШІ-опрацювання Real Tone та Magic Eraser',
      'Безпека: Співпроцесор Titan M2'
    ]
  },
  {
    id: 'xiaomi',
    name: 'Xiaomi Redmi',
    brand: 'Xiaomi',
    color: '#FF6700',
    accentColor: 'orange',
    description: 'Народний улюбленець від китайського технологічного гіганта в доступній ціновій категорії. Пропонує максимальне апаратне оснащення за демократичну ціну: батареї великої ємності, швидку зарядку HyperCharge та оболонку HyperOS.',
    tagline: 'Максимум характеристик за розумну вартість.',
    specifications: [
      'ОС: Android з оболонкою HyperOS / MIUI',
      'Процесор: MediaTek Dimensity або Snapdragon',
      'Екран: IPS або AMOLED (120Гц)',
      'Живлення: Швидка зарядка HyperCharge до 120 Вт',
      'Унікально: Вбудований інфрачервоний порт'
    ]
  },
  {
    id: 'oneplus',
    name: 'OnePlus',
    brand: 'OnePlus',
    color: '#EB0028',
    accentColor: 'emerald',
    description: 'Легендарний «вбивця флагманів», орієнтований на ентузіастів. Характеризується екстремальною швидкістю роботи завдяки OxygenOS, унікальним механічним перемикачем Alert Slider та співпрацею з Hasselblad для калібрування камер.',
    tagline: 'Never Settle. Плавність без компромісів.',
    specifications: [
      'ОС: Android з ультраплавною OxygenOS',
      'Процесор: Топовий Qualcomm Snapdragon',
      'Екран: Fluid AMOLED з технологією Aqua Touch',
      'Зарядка: Ультрашвидка SUPERVOOC до 100 Вт',
      'Камера: Калібрування кольорів від Hasselblad'
    ]
  }
];

export const COMMON_FEATURES: Feature[] = [
  { id: 'c1', name: 'Наявність сенсорного дисплею', type: 'common', valueDescription: 'Так (всі пристрої)', priority: 'high' },
  { id: 'c2', name: 'Підтримка мобільного зв’язку 5G', type: 'common', valueDescription: 'Так (всі пристрої)', priority: 'high' },
  { id: 'c3', name: 'Модуль бездротового зв’язку Wi-Fi', type: 'common', valueDescription: 'Так (всі протоколи)', priority: 'high' },
  { id: 'c4', name: 'Модуль бездротового зв’язку Bluetooth', type: 'common', valueDescription: 'Так (5.0+)', priority: 'medium' },
  { id: 'c5', name: 'Супутникова навігація GPS/GLONASS', type: 'common', valueDescription: 'Так (всі пристрої)', priority: 'medium' },
  { id: 'c6', name: 'Порт підзарядки та даних USB Type-C', type: 'common', valueDescription: 'Так (стандарт)', priority: 'high' },
  { id: 'c7', name: 'Наявність безпровідної зарядки Qi', type: 'common', valueDescription: 'Так (всі флагмани)', priority: 'low' },
  { id: 'c8', name: 'Наявність NFC-чіпу для безконтактних оплат', type: 'common', valueDescription: 'Так (всі пристрої)', priority: 'high' },
  { id: 'c9', name: 'Вбудована фронтальна селфі-камера', type: 'common', valueDescription: 'Так (всі пристрої)', priority: 'medium' },
  { id: 'c10', name: 'Вбудована основна багатомодульна задня камера', type: 'common', valueDescription: 'Так (ширококутна + ультраширококутна)', priority: 'high' },
  { id: 'c11', name: 'Вбудований ліхтарик (спалах камери)', type: 'common', valueDescription: 'Так (Dual-LED)', priority: 'low' },
  { id: 'c12', name: 'Запис відео високої чіткості Full HD / 4K', type: 'common', valueDescription: 'Так (до 60 кадр/сек)', priority: 'medium' },
  { id: 'c13', name: 'Наявність апаратного датчика наближення', type: 'common', valueDescription: 'Так (інфрачервоний/ультразвуковий)', priority: 'low' },
  { id: 'c14', name: 'Наявність акселерометра та гіроскопа', type: 'common', valueDescription: 'Так (всі пристрої)', priority: 'medium' },
  { id: 'c15', name: 'Наявність слоту під SIM-карту / підтримка eSIM', type: 'common', valueDescription: 'Так (всі пристрої)', priority: 'medium' },
  { id: 'c16', name: 'Форм-фактор корпусу — моноблок', type: 'common', valueDescription: 'Так (класичний прямокутник)', priority: 'low' },
  { id: 'c17', name: 'Фізичні апаратні кнопки регулювання гучності', type: 'common', valueDescription: 'Так (на лівій/правій грані)', priority: 'low' },
  { id: 'c18', name: 'Сучасна мобільна операційна система', type: 'common', valueDescription: 'Так (на базі iOS або Android)', priority: 'high' }
];

export const SPECIFIC_FEATURES: Feature[] = [
  // APPLE IPHONE SPECIFIC (15 features)
  { id: 's_apple_1', name: 'Операційна система iOS', type: 'specific', objectId: 'apple', valueDescription: 'Так (ексклюзивно)', priority: 'high' },
  { id: 's_apple_2', name: 'Процесор лінійки Apple A-Series / M-Series', type: 'specific', objectId: 'apple', valueDescription: 'Так (власний кремній Apple)', priority: 'high' },
  { id: 's_apple_3', name: 'Розпізнавання обличчя через 3D TrueDepth (Face ID)', type: 'specific', objectId: 'apple', valueDescription: 'Так (апаратні лазерні датчики)', priority: 'high' },
  { id: 's_apple_4', name: 'Інтерактивний динамічний виріз Dynamic Island', type: 'specific', objectId: 'apple', valueDescription: 'Так (інтегровано з ПЗ системи)', priority: 'medium' },
  { id: 's_apple_5', name: 'Підтримка магнітного інтерфейсу MagSafe', type: 'specific', objectId: 'apple', valueDescription: 'Так (аксесуари та зарядка)', priority: 'high' },
  { id: 's_apple_6', name: 'Інтелектуальний помічник Siri', type: 'specific', objectId: 'apple', valueDescription: 'Так (інтеграція в Apple OS)', priority: 'medium' },
  { id: 's_apple_7', name: 'Відеокодек надвисокої якості ProRes Video', type: 'specific', objectId: 'apple', valueDescription: 'Так (ексклюзив для кіноробів)', priority: 'medium' },
  { id: 's_apple_8', name: 'Зйомка фото в сирому форматі Apple ProRAW', type: 'specific', objectId: 'apple', valueDescription: 'Так (максимальний динамічний діапазон)', priority: 'medium' },
  { id: 's_apple_9', name: 'Міцний титановий корпус Grade 5 Pro-моделей', type: 'specific', objectId: 'apple', valueDescription: 'Так (матова титанова текстура)', priority: 'low' },
  { id: 's_apple_10', name: 'Супутниковий екстрений зв’язок Emergency SOS', type: 'specific', objectId: 'apple', valueDescription: 'Так (прямо на низькоорбітальні супутники)', priority: 'medium' },
  { id: 's_apple_11', name: 'Хмарна синхронізація iCloud та екосистема Apple', type: 'specific', objectId: 'apple', valueDescription: 'Так (Handoff, AirDrop, iMessage)', priority: 'high' },
  { id: 's_apple_12', name: 'Універсальна кнопка швидкої дії Action Button', type: 'specific', objectId: 'apple', valueDescription: 'Так (замість перемикача беззвучності)', priority: 'low' },
  { id: 's_apple_13', name: 'Офіційний магазин додатків Apple App Store', type: 'specific', objectId: 'apple', valueDescription: 'Так (сувора модерація безпеки)', priority: 'high' },
  { id: 's_apple_14', name: 'Ексклюзивні сервіси зв\'язку iMessage та FaceTime', type: 'specific', objectId: 'apple', valueDescription: 'Так (наскрізне шифрування)', priority: 'medium' },
  { id: 's_apple_15', name: 'Екрани надвисокої яскравості Super Retina XDR', type: 'specific', objectId: 'apple', valueDescription: 'Так (до 2000+ ніт яскравості)', priority: 'medium' },

  // SAMSUNG GALAXY SPECIFIC (15 features)
  { id: 's_samsung_1', name: 'Графічна оболонка Samsung One UI', type: 'specific', objectId: 'samsung', valueDescription: 'Так (максимально кастомізована)', priority: 'high' },
  { id: 's_samsung_2', name: 'Підтримка електронного фірмового пера S Pen', type: 'specific', objectId: 'samsung', valueDescription: 'Так (активне перо з Bluetooth)', priority: 'high' },
  { id: 's_samsung_3', name: 'Десктопний режим інтерфейсу Samsung DeX', type: 'specific', objectId: 'samsung', valueDescription: 'Так (дротовий та бездротовий)', priority: 'high' },
  { id: 's_samsung_4', name: 'Процесори серії Exynos або Snapdragon for Galaxy', type: 'specific', objectId: 'samsung', valueDescription: 'Так (оптимізовані частоти ядер)', priority: 'medium' },
  { id: 's_samsung_5', name: 'Апаратна безпека систем військового класу Samsung Knox', type: 'specific', objectId: 'samsung', valueDescription: 'Так (окремий криптопроцесор)', priority: 'high' },
  { id: 's_samsung_6', name: 'Фірмове середовище розумного дому SmartThings', type: 'specific', objectId: 'samsung', valueDescription: 'Так (підключення побутової техніки)', priority: 'medium' },
  { id: 's_samsung_7', name: 'Голосовий асистент Bixby з підтримкою сценаріїв', type: 'specific', objectId: 'samsung', valueDescription: 'Так (Bixby Routines)', priority: 'low' },
  { id: 's_samsung_8', name: 'Оптичний зум 100x Space Zoom (у серії Ultra)', type: 'specific', objectId: 'samsung', valueDescription: 'Так (перископічна камера 5x/10x)', priority: 'high' },
  { id: 's_samsung_9', name: 'Ультразвуковий сканер відбитків пальців в екрані', type: 'specific', objectId: 'samsung', valueDescription: 'Так (працює навіть з вологими пальцями)', priority: 'medium' },
  { id: 's_samsung_10', name: 'Фірмовий ШІ-пакет функцій Galaxy AI', type: 'specific', objectId: 'samsung', valueDescription: 'Так (Circle to Search, Live Translate)', priority: 'high' },
  { id: 's_samsung_11', name: 'Додаток міграції даних Samsung Smart Switch', type: 'specific', objectId: 'samsung', valueDescription: 'Так (з будь-якого смартфону)', priority: 'low' },
  { id: 's_samsung_12', name: 'Фірмові OLED панелі Dynamic AMOLED 2X', type: 'specific', objectId: 'samsung', valueDescription: 'Так (120 Гц LTPO, ідеальний чорний)', priority: 'medium' },
  { id: 's_samsung_13', name: 'Панелі швидкого доступу Edge Panels в екрані', type: 'specific', objectId: 'samsung', valueDescription: 'Так (висувні віджети збоку)', priority: 'low' },
  { id: 's_samsung_14', name: 'Магазин застосунків Samsung Galaxy Store', type: 'specific', objectId: 'samsung', valueDescription: 'Так (ексклюзивні теми та ігри)', priority: 'medium' },
  { id: 's_samsung_15', name: 'Антивідблискове захисне скло Gorilla Glass Armor', type: 'specific', objectId: 'samsung', valueDescription: 'Так (зменшує відблиски на 75%)', priority: 'medium' },

  // GOOGLE PIXEL SPECIFIC (15 features)
  { id: 's_google_1', name: 'Чистий Android від Google (Pixel Experience)', type: 'specific', objectId: 'google', valueDescription: 'Так (без стороннього софту)', priority: 'high' },
  { id: 's_google_2', name: 'ШІ-процесор власної розробки Google Tensor', type: 'specific', objectId: 'google', valueDescription: 'Так (орієнтований на нейромережі)', priority: 'high' },
  { id: 's_google_3', name: 'Функція Magic Eraser для видалення об\'єктів з фото', type: 'specific', objectId: 'google', valueDescription: 'Так (інтегрована в Google Фото)', priority: 'high' },
  { id: 's_google_4', name: 'Апаратний чіп захисту та шифрування Titan M2', type: 'specific', objectId: 'google', valueDescription: 'Так (безпека транзакцій та таємниць)', priority: 'high' },
  { id: 's_google_5', name: 'Автоіндикація музики Now Playing на заблокованому екрані', type: 'specific', objectId: 'google', valueDescription: 'Так (офлайн визначення пісень у фоні)', priority: 'medium' },
  { id: 's_google_6', name: 'Наступне покоління голосового асистента Google Assistant', type: 'specific', objectId: 'google', valueDescription: 'Так (інтегрований Gemini)', priority: 'medium' },
  { id: 's_google_7', name: 'Диктофон Recorder з автоматичною транскрипцією мови у текст', type: 'specific', objectId: 'google', valueDescription: 'Так (працює офлайн на пристрої)', priority: 'high' },
  { id: 's_google_8', name: 'Автофільтрація спаму та помічник дзвінків Call Screen', type: 'specific', objectId: 'google', valueDescription: 'Так (бот з\'ясовує мету дзвінка за вас)', priority: 'medium' },
  { id: 's_google_9', name: 'Першочергове право на оновлення Android (Day One)', type: 'specific', objectId: 'google', valueDescription: 'Так (та регулярні Pixel Feature Drops)', priority: 'high' },
  { id: 's_google_10', name: 'Рекордна гарантована підтримка ПЗ протягом 7 років', type: 'specific', objectId: 'google', valueDescription: 'Так (до 7 версій Android)', priority: 'high' },
  { id: 's_google_11', name: 'Унікальний режим астрофотографії Astrophotography', type: 'specific', objectId: 'google', valueDescription: 'Так (зйомка чумацького шляху на штативі)', priority: 'medium' },
  { id: 's_google_12', name: 'Інтегрована локальна нейромережа Gemini Nano', type: 'specific', objectId: 'google', valueDescription: 'Так (on-device AI без інтернету)', priority: 'high' },
  { id: 's_google_13', name: 'Початок впровадження жестів Circle to Search', type: 'specific', objectId: 'google', valueDescription: 'Так (глибокий пошук на екрані)', priority: 'medium' },
  { id: 's_google_14', name: 'Дизайн задньої камери у формі горизонтальної смуги Camera Bar', type: 'specific', objectId: 'google', valueDescription: 'Так (телефон не хитається на столі)', priority: 'low' },
  { id: 's_google_15', name: 'Технологія зйомки Real Tone для ідеального тону шкіри', type: 'specific', objectId: 'google', valueDescription: 'Так (протестовано на тисячах портретів)', priority: 'medium' },

  // XIAOMI REDMI SPECIFIC (15 features)
  { id: 's_xiaomi_1', name: 'Операційна система HyperOS (нова заміна MIUI)', type: 'specific', objectId: 'xiaomi', valueDescription: 'Так (анімація та швидкість роботи)', priority: 'high' },
  { id: 's_xiaomi_2', name: 'Вбудований інфрачервоний порт (ІЧ-порт) для побутової техніки', type: 'specific', objectId: 'xiaomi', valueDescription: 'Так (керування телевізорами, кондиціонерами)', priority: 'high' },
  { id: 's_xiaomi_3', name: 'Суббренд Redmi (оптимізовано під бюджетний сегмент)', type: 'specific', objectId: 'xiaomi', valueDescription: 'Так (ідеальний баланс ціна/якість)', priority: 'high' },
  { id: 's_xiaomi_4', name: 'Надшвидка фірмова зарядка HyperCharge до 120 Вт', type: 'specific', objectId: 'xiaomi', valueDescription: 'Так (від 0 до 100% за 19 хвилин)', priority: 'high' },
  { id: 's_xiaomi_5', name: 'Вбудована утиліта прискорення ігор Game Turbo', type: 'specific', objectId: 'xiaomi', valueDescription: 'Так (бокова панель, FPS бустер)', priority: 'medium' },
  { id: 's_xiaomi_6', name: 'Акумулятор підвищеної ємності за низьку ціну (5000+ мАг)', type: 'specific', objectId: 'xiaomi', valueDescription: 'Так (до 2 робочих днів автономності)', priority: 'medium' },
  { id: 's_xiaomi_7', name: 'Громадський додаток Mi Community', type: 'specific', objectId: 'xiaomi', valueDescription: 'Так (форум користувачів)', priority: 'low' },
  { id: 's_xiaomi_8', name: 'Вбудована реклама в системному ПЗ (з опцією відключення)', type: 'specific', objectId: 'xiaomi', valueDescription: 'Так (допомагає знизити вартість пристрою)', priority: 'medium' },
  { id: 's_xiaomi_9', name: 'Вбудоване аналогове FM-радіо з підтримкою запису', type: 'specific', objectId: 'xiaomi', valueDescription: 'Так (в більшості бюджетних моделей)', priority: 'medium' },
  { id: 's_xiaomi_10', name: 'Сканер відбитків пальців, суміщений з кнопкою живлення', type: 'specific', objectId: 'xiaomi', valueDescription: 'Так (на бічній грані пристрою)', priority: 'medium' },
  { id: 's_xiaomi_11', name: 'Багата комплектація (зарядний пристрій та чохол в коробці)', type: 'specific', objectId: 'xiaomi', valueDescription: 'Так (не потрібно докуповувати адаптер)', priority: 'high' },
  { id: 's_xiaomi_12', name: 'Функція клонування додатків Dual Apps', type: 'specific', objectId: 'xiaomi', valueDescription: 'Так (можна мати два акаунти Viber, Telegram)', priority: 'medium' },
  { id: 's_xiaomi_13', name: 'Паралельний ізольований профіль Second Space', type: 'specific', objectId: 'xiaomi', valueDescription: 'Так (другий робочий стіл під окремим паролем)', priority: 'medium' },
  { id: 's_xiaomi_14', name: 'Фірмове хмарне сховище Xiaomi Cloud для резервних копій', type: 'specific', objectId: 'xiaomi', valueDescription: 'Так (синхронізація галереї)', priority: 'low' },
  { id: 's_xiaomi_15', name: 'Альтернативний маркет додатків GetApps', type: 'specific', objectId: 'xiaomi', valueDescription: 'Так (встановлений виробником)', priority: 'low' },

  // ONEPLUS SPECIFIC (15 features)
  { id: 's_oneplus_1', name: 'Плавна операційна система OxygenOS', type: 'specific', objectId: 'oneplus', valueDescription: 'Так (дуже чиста та швидка відгуком)', priority: 'high' },
  { id: 's_oneplus_2', name: 'Механічний трипозиційний перемикач Alert Slider', type: 'specific', objectId: 'oneplus', valueDescription: 'Так (Дзвінок, Вібро, Беззвучно)', priority: 'high' },
  { id: 's_oneplus_3', name: 'Ультрашвидка зарядка SUPERVOOC фірмового протоколу', type: 'specific', objectId: 'oneplus', valueDescription: 'Так (до 100 Вт, безпечно для акумулятора)', priority: 'high' },
  { id: 's_oneplus_4', name: 'Партнерство з Hasselblad для калібрування камер', type: 'specific', objectId: 'oneplus', valueDescription: 'Так (природні кольори, стиль XPAN)', priority: 'high' },
  { id: 's_oneplus_5', name: 'Апаратний прискорювач плавності Trinity Engine', type: 'specific', objectId: 'oneplus', valueDescription: 'Так (оптимізація процесору, пам\'яті)', priority: 'medium' },
  { id: 's_oneplus_6', name: 'Надчутлива вібровіддача та технологія O-Haptics', type: 'specific', objectId: 'oneplus', valueDescription: 'Так (фізичний відгук на кожній кнопці)', priority: 'medium' },
  { id: 's_oneplus_7', name: 'Знаменитий червоно-білий кабель живлення в комплекті', type: 'specific', objectId: 'oneplus', valueDescription: 'Так (культовий дизайн OnePlus)', priority: 'low' },
  { id: 's_oneplus_8', name: 'Утиліта цифрового детоксу Zen Space (режим дзен)', type: 'specific', objectId: 'oneplus', valueDescription: 'Так (повне блокування відволікань)', priority: 'medium' },
  { id: 's_oneplus_9', name: 'Технологія екрану Aqua Touch для вологих рук', type: 'specific', objectId: 'oneplus', valueDescription: 'Так (екран не глючить під краплями дощу)', priority: 'high' },
  { id: 's_oneplus_10', name: 'Двокамерна графенова система охолодження Cryo-velocity VC', type: 'specific', objectId: 'oneplus', valueDescription: 'Так (для тривалих ігор без тротлінгу)', priority: 'medium' },
  { id: 's_oneplus_11', name: 'Повна інтеграція фірмового гасла «Never Settle»', type: 'specific', objectId: 'oneplus', valueDescription: 'Так (в анімаціях завантаження та філософії)', priority: 'low' },
  { id: 's_oneplus_12', name: 'Великий круглий блок камер («люк/ілюмінатор»)', type: 'specific', objectId: 'oneplus', valueDescription: 'Так (натхненний швейцарським годинником)', priority: 'low' },
  { id: 's_oneplus_13', name: 'Інтелектуальна система стиснення пам’яті RAM Vita', type: 'specific', objectId: 'oneplus', valueDescription: 'Так (тримає понад 44 додатки в фоні)', priority: 'medium' },
  { id: 's_oneplus_14', name: 'Спеціальна яскрава червона коробка посиленої щільності', type: 'specific', objectId: 'oneplus', valueDescription: 'Так (з наліпками Red Cable Club)', priority: 'low' },
  { id: 's_oneplus_15', name: 'Технологія оптимізації бездротового сигналу LinkBoost', type: 'specific', objectId: 'oneplus', valueDescription: 'Так (швидке перепідключення в тунелях)', priority: 'medium' }
];

export const ALL_FEATURES = [...COMMON_FEATURES, ...SPECIFIC_FEATURES];

// Calculates weights dynamically map based on WeightModel
export function calculateWeight(feature: Feature, model: 'model_a' | 'model_b' | 'model_c', totalCommonCount: number, totalSpecificCount: number, targetObjectId: string): number {
  if (model === 'model_a') {
    // 50% / n for common features
    // 50% / m for specific features
    if (feature.type === 'common') {
      return 0.50 / totalCommonCount;
    } else {
      return 0.50 / totalSpecificCount;
    }
  } else if (model === 'model_b') {
    // 100% / (n + m) for every single feature
    return 1.0 / (totalCommonCount + totalSpecificCount);
  } else {
    // Custom non-equal weights depending on priority
    // Let's set priority score: High = 3, Medium = 2, Low = 1
    const getPriorityScore = (p: string) => {
      if (p === 'high') return 3;
      if (p === 'medium') return 2;
      return 1;
    };

    if (feature.type === 'common') {
      // Sum of points for all common features
      const totalCommonPoints = COMMON_FEATURES.reduce((sum, f) => sum + getPriorityScore(f.priority), 0);
      const points = getPriorityScore(feature.priority);
      // Let's make common features take their proportional score from the n / (n+m) or 50% budget
      // Let's go with a 50% common budget to make it beautiful
      return 0.50 * (points / totalCommonPoints);
    } else {
      // Specific features for the target object
      const objectSpecifics = SPECIFIC_FEATURES.filter(f => f.objectId === targetObjectId);
      const totalSpecPoints = objectSpecifics.reduce((sum, f) => sum + getPriorityScore(f.priority), 0);
      const points = getPriorityScore(feature.priority);
      // Portion of 50% specific budget
      return 0.50 * (points / totalSpecPoints);
    }
  }
}
