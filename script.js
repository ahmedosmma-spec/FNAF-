// ==========================================
// 1. كود إخفاء القائمة عند النزول وإظهارها عند الصعود
// ==========================================
let lastScrollTop = 0;
const header = document.querySelector("header");

if (header) {
    window.addEventListener("scroll", function() {
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        if (currentScroll < 0) return;

        if (currentScroll > lastScrollTop && currentScroll > 80) {
            header.classList.add("nav-hidden");
        } else {
            header.classList.remove("nav-hidden");
        }
        lastScrollTop = currentScroll;
    });
}

// ==========================================
// 2. دالة البحث الفوري في قائمة الأنيماترونكس
// ==========================================
function searchAnimatronics() {
    let input = document.getElementById('searchInput').value.toLowerCase().trim();
    let cards = document.getElementsByClassName('animatronic-item');

    for (let i = 0; i < cards.length; i++) {
        let cardText = cards[i].innerText.toLowerCase();
        if (cardText.includes(input)) {
            cards[i].style.display = "block";
        } else {
            cards[i].style.display = "none";
        }
    }
}

// ==========================================
// 3. قاعدة البيانات الشاملة لجميع الشخصيات الـ 21
// ==========================================
const charactersDB = {
    "puppet": {
        name: "ذا بوبيت / الدمية (The Puppet)",
        role: "روح تشارلوت إميلي (Charlie)",
        bio: "ذا بوبيت هي الروح الأولى المسكونة في السلسلة، يسكنها طيف تشارلي ابنة هنري إميلي. تملك قوة خارقة لإعطاء الحياة للأرواح الأخرى ونقل Remnant للألعاب. تحتاج لموسيقى مستمرة في FNaF 2 لمنعها من الهجوم."
    },
    "golden_freddy": {
        name: "جولدن فريدي / فريدي الذهبي (Golden Freddy)",
        role: "طيف شبحي (روح كاسيدي والطفل الباكي)",
        bio: "كيان طيفي غامض يظهر بشكل بدلة فريدي صفراء متهالكة وبدون عيون. يمتلك القدرة على الانتقال اللحظي والظهور كرأس طائر. يرمز للانتقام المطلق من وليام أفتون."
    },
    "mimic": {
        name: "ذا ميميك / المقلد (The Mimic)",
        role: "ذكاء اصطناعي قديم عدواني",
        bio: "هيكل ميكانيكي قديم تم برمجة ذكائه الاصطناعي لتقليد سلوكيات البشر. بعد تعرضه للعنف، أصبح يقلد أبشع جريم أفتون ويستطيع التشكّل وتغيير أطرافه للدخول في أي بدلة."
    },
    "nightmare": {
        name: "نايتمار / الكابوس (Nightmare)",
        role: "تجسيد الرعب والموت",
        bio: "النسخة الأكثر رعباً وشفافية في FNaF 4. يمثل تجسيد الخوف العميق والموت في كوابيس الطفل الباكي، ويتميز بصوته المرعب وعينيه الصغيرتين الحمراوين."
    },
    "nightmarionne": {
        name: "نايتماريون (Nightmarionne)",
        role: "نسخة الكابوس للدمية",
        bio: "تجسيد كابوسي طواله فارعة وأصابعه ممتدة كمخالب حادة. يظهر في طور الكوابيس ويعتبر من أسرع وأخطر الكيانات المهاجمة."
    },
    "springtrap": {
        name: "سبرينج تراب / ويليام أفتون (Springtrap)",
        role: "الشرير الرئيسي (جثة أفتون بالبدلة)",
        bio: "بعد محاصرة أرواح الأطفال لـ ويليام أفتون، اختبأ في بدلة Spring Bonnie واحتجز داخلها بعد تفعيل الـ Springlocks. عاش 30 سنة بالداخل وعاد في FNaF 3 بشرور أقوى."
    },
    "ennard": {
        name: "إنارد (Ennard)",
        role: "اندماج جميع أنيماترونكس Sister Location",
        bio: "هيكل معدني يجمع جميع أسلاك وهياكل Funtime Freddy, Foxy, Ballora, و Circus Baby. صمم للهروب من المنشأة عن طريق استخدام جسد بشري (مايكل أفتون)."
    },
    "circus_baby": {
        name: "سيركس بيبي (Circus Baby)",
        role: "روح إليزابيث أفتون",
        bio: "صممها أفتون لاصطياد الأطفال، ولكنها ابتلعت ابنته إليزابيث بالخطأ. تتميز بذوق رائع وذكاء يتلاعب بالحراس من أجل التحرر."
    },
    "glamrock_freddy": {
        name: "جلام روك فريدي (Glamrock Freddy)",
        role: "حليف جريجوري الأصلي",
        bio: "الأنيماترونكس الوحيد الذي لم يتحكم به الفيروس في Security Breach. يمتلك تجويف بطن مخصص للكيك والهديا ويساعد جريجوري للهروب من البيتزا بليكس."
    },
    "monty": {
        name: "مونتجومري جيتار (Montgomery Gator)",
        role: "جلام روك عدواني",
        bio: "تمساح آلي يتميز بقوته البدنية الهائلة، مخالبه الفولاذية، وعدوانيته العالية. يحل محل بوني في الفرقة الموسيقية."
    },
    "roxy": {
        name: "روكسان ولف (Roxanne Wolf)",
        role: "جلام روك متطور الرؤية",
        bio: "ذئبة آلية تتصف بالنرجسية الشديدة. تمتلك عيوناً متطورة جداً تتيح لها الرؤية من خلال الجدران وتتبع الصبية."
    },
    "foxy": {
        name: "فوكسي القرصان (Foxy the Pirate)",
        role: "أنيماترونكس كلاسيكي سريع",
        bio: "قرصان آلي متهالك يقع في ستارة Pirate Cove. معروف بسرعته العالية في الركض عبر الممر الأيسر للوصول فوراً لغرفة الحارس."
    },
    "mangle": {
        name: "مانجل (Mangle)",
        role: "نسخة Toy Foxy التالفة",
        bio: "بعد تفكيك الأطفال لها باستمرار، أصبحت عبارة عن هيكل ميكانيكي متداخل. تملك القدرة على السير على الأسقف وإحداث تشويش راديوي."
    },
    "withered_bonnie": {
        name: "ويذرد بوني (Withered Bonnie)",
        role: "أنيماترونكس محطم بدون وجه",
        bio: "النسخة القديمة المحطمة من بوني. تفتقد للوجه بالكامل وللذراع الأيسر، وتعد واحدة من أكثر الشخصيات إخافة وعدوانية في FNaF 2."
    },
    "withered_freddy": {
        name: "ويذرد فريدي (Withered Freddy)",
        role: "أنيماترونكس محطم قائد",
        bio: "النسخة القديمة المتهالكة لفريدي فازبير. يتنقل في الظلام ويخرج من الخدمة للوصول إلى غرفة الصيانة والمكتب."
    },
    "freddy": {
        name: "فريدي فازبير (Freddy Fazbear)",
        role: "القائد الكلاسيكي (FNaF 1)",
        bio: "الدب الآلي قائد الفرقة الأصلية. ينشط في الليالي المتقدمة ويتخفى في ظلال الغرف، ويهجم دائماً عند انقطاع الكهرباء."
    },
    "bonnie": {
        name: "بوني الأرنب (Bonnie the Bunny)",
        role: "عازف الجيتار الكلاسيكي",
        bio: "أرنب أرجواني آلي، يمثل أول شخصية تترك المسرح وتبدأ الحركة. صرح مطور اللعبة Scott Cawthon بأنه الشخصية الأكثر إخافة له."
    },
    "chica": {
        name: "تشيكا الدجاجة (Chica the Chicken)",
        role: "طاهية الفرقة الكلاسيكية",
        bio: "دجاجة آلية تحب الطعام وتتجه نحو المطبخ لإحداث أصوات مع الأواني، قبل أن تتجه نحو النافذة اليمنى لغرفة الحارس."
    },
    "toy_bonnie": {
        name: "توي بوني (Toy Bonnie)",
        role: "نسخة الألعاب الحديثة",
        bio: "أرنب أزرق فاتح بلاستيكي مزود بتقنية التعرف على الوجوه ومسح قاعدة بيانات المجرمين. يتسلل دائماً عبر فتحات التهوية الجانبية."
    },
    "bb": {
        name: "بالون بوي (Balloon Boy - BB)",
        role: "طفل البالونات (تعطيل تقني)",
        bio: "أنيماترونكس على شكل طفل يدوي لا يملك Jumpscare مباشر، ولكنه يدخل المكتب لسرقة بطاريات الكشاف وإصدار ضحكات تجذب باقي الآليين."
    },
    "phantom_freddy": {
        name: "فانتوم فريدي (Phantom Freddy)",
        role: "طيف هلاوس (FNaF 3)",
        bio: "شبح على شكل فريدي المحرق. يظهر يسير ببطء أمام نافذة المكتب الرئيسية، ونظرتك المطولة إليه تسبب هلاوس وتعطيل نظام التهوية."
    }
};

// دالة تحميل التفاصيل في صفحة character.html
function loadCharacterDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const charId = urlParams.get('id');

    if (charId && charactersDB[charId]) {
        document.getElementById('charName').innerText = charactersDB[charId].name;
        document.getElementById('charRole').innerText = charactersDB[charId].role;
        document.getElementById('charBio').innerText = charactersDB[charId].bio;
        document.title = charactersDB[charId].name + " | FNaF Heba";
    }
}
