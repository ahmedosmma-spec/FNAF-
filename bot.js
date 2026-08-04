// دالة التعامل مع زر Enter
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// دالة إرسال الرسائل وعرضها في الشاشة
async function sendMessage() {
    const inputField = document.getElementById('userInput');
    const messageContainer = document.getElementById('chatMessages');
    const userText = inputField.value.trim();

    if (userText === '') return;

    // عرض رسالة المستخدم
    const userMsgDiv = document.createElement('div');
    userMsgDiv.className = 'message user-message';
    userMsgDiv.textContent = userText;
    messageContainer.appendChild(userMsgDiv);

    inputField.value = '';
    messageContainer.scrollTop = messageContainer.scrollHeight;

    // مؤشر جاري الكتابة
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'message bot-message';
    loadingDiv.textContent = '🤖 جاري معالجة الرد الموسوعي...';
    messageContainer.appendChild(loadingDiv);
    messageContainer.scrollTop = messageContainer.scrollHeight;

    // استدعاء دالة البوت
    const botResponse = await generateUltraDetailedResponse(userText);

    // استبدال النص المؤقت بالرد النهائي
    loadingDiv.innerText = botResponse;
    messageContainer.scrollTop = messageContainer.scrollHeight;
}

// ----------------------------------------------------
// دالة البوت الرئيسية المحسّنة والمطورة
// ----------------------------------------------------
async function generateUltraDetailedResponse(q) {
    let text = q.toLowerCase().trim();

    // 1. التعامل مع التحيات والرسائل القصيرة (رد طبيعي ودود)
    if (text === "اهلا" || text === "أهلا" || text === "مرحبا" || text === "السلام عليكم" || text === "سلام" || text === "hi" || text === "hello" || text.length <= 4) {
        return `🤖 أهلاً بك يا صديقي! أنا فان تايم بوت (Funtime Bot). 🎪\n\nسعيد جداً بتواجدك معي اليوم. كيف يمكنني مساعدتك؟ هل تريد أن نتحدث عن أسرار وقصة فناف (FNaF) العميقة، أم تفضل أن نخوض معاً في دردشة موسوعية مفتوحة وطويلة؟ أخبرني بما يدور في ذهنك! ✨`;
    }

    // 2. طلب استكمال النص (الوصول لمستويات 4000 كلمة)
    if (text.includes("أكمل") || text.includes("اكمل") || text.includes("البقية") || text.includes("تابع")) {
        return `💬 **تقرير المحادثة والدردشة العامة الموسوعية (الجزء المكمل):**

---

### 📖 4. تحليل أدبي وفلسفي للسرد القصصي
* **رمزية الآلات والأرواح:** الدمج بين الميكانيكا الصماء (الأنيماترونكس) والأرواح البشرية المعذبة يعكس صراع الإنسان مع التكنولوجيا، وكيف يمكن للابتكار البشري الخروج عن السيطرة الأخلاقية والتحول إلى أداة احتجاز أبدية.
* **مفهوم الـ Agony:** الطاقة النفسية الشديدة الناتجة عن الصدمات والألم، والتي تترك أثراً حيوياً في الأماكن والأشياء المعدنية والبرمجية لسنوات طويلة.

---

### 💡 5. استراتيجيات تفكيك النصوص والألغاز
* **البحث في الملفات والتسريبات:** تحليل الملفات الصوتية (Audio Spectrograms) والأكواد المصدريّة للمواقع للكشف عن الشفرات المخفية.
* **المقارنة بين السلاسل:** ربط الأحداث الواردة في الكتب والروايات الرسمية بقوانين اللعبة البرمجية للوصول لحقائق النظريات.

🤝 **أنا جاهز دائماً لمواصلة النقاش حول أي موضوع آخر يخطر ببالك!**`;
    }

    // 3. قسم فناف (جلب بيانات حية من الويب + موسوعة شاملة)
    if (text.includes("فناف") || text.includes("fnaf") || text.includes("قصة") || text.includes("تايم لاين") || text.includes("احداث") || text.includes("افتون") || text.includes("سبرينج تراب") || text.includes("شخصيات")) {
        
        let webData = "";
        try {
            let response = await fetch("https://ar.wikipedia.org/api/rest_v1/page/summary/فايف_نايتس_أت_فريديز");
            let data = await response.json();
            if (data.extract) {
                webData = `🌐 **معلومات حية جُلبت من الويب حول السلسلة:**\n${data.extract}\n\n---\n`;
            }
        } catch (error) {
            webData = "";
        }

        return webData + `📚 **الموسوعة التاريخية الشاملة لقصة وعالم Five Nights at Freddy's (فناف):**

---

### 🏛️ الجزء الأول: المدخل الفلسفي والسرد البيئي
سلسلة Five Nights at Freddy's ليست مجرد ألعاب رعب تقليدية، بل هي ملحمة غموض معقدة تمتد لأكثر من خمسة عقود. تعتمد على السرد البيئي والألعاب المصغرة المخفية والروايات المكملة لاستكشاف تداعيات الطمع والتكنولوجيا المظلمة.

---

### ⏳ الجزء الثاني: التسلسل الزمني للأحداث (Timeline)
* **1983 - التأسيس وعضّة 83:** تأسيس Fredbear's Family Diner بواسطة هنري ووليام أفتون، ووقوع حادثة سحق جمجمة الطفل الباكي بواسطة فك فريدبير، والتي حولت وليام لشخصية سايكوباتية.
* **1985 - مجزرة الأطفال:** استدراج 5 أطفال وقتلهم بواسطة أفتون، ونقل أرواحهم للأنيماترونكس الكلاسيكية عبر الدمية Puppet.
* **1993 - تحول أفتون إلى Springtrap:** محاصرة أفتون من الأرواح ومحاولته التخفي بارتداء بدلة Spring Bonnie القديمة التي سحقت جسده بالكامل.
* **الحقبة الحديثة (Security Breach):** ظهور الذكاء الاصطناعي **The Mimic** وسيطرته على المجمع الترفيهي Mega Pizzaplex.`;
    }

    // 4. قسم الدردشة العامة الحرة
    return `💬 **تقرير المحادثة الموسوعية حول: "${q}"**

---

### 🌟 1. المدخل والتحليل العام
أهلاً بك! الموضوع الذي طرحته حول (${q}) يفتح الباب أمام نقاش تحليلي ممتع وعميق يشمل جوانب متعددة من علم النفس، وسلوك مجتمعات الألعاب، وفلسفة السرد القصصي.

---

### 🧠 2. الجانب النفسي والسلوكي
الانجذاب للمجهول والغموض هو طبيعة بشرية أصيلة. تجارب الرعب والتحليل تحول الشخص من مجرد متلقٍ عادي إلى باحث ومحقق يجمع الأدلة ويربط التفاصيل ببعضها.

---

*(يمكنك كتابة **"أكمل"** في أي وقت لاستعراض الجزء الموالي من التقرير الموسوعي!)*`;
}
