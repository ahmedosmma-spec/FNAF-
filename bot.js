async function sendMessage() {
    let input = document.getElementById('userInput');
    let messageText = input.value.trim();
    if (messageText === "") return;

    let chatBox = document.getElementById('chatBox');

    // 1. عرض رسالة المستخدم
    let userDiv = document.createElement('div');
    userDiv.className = 'message user-msg';
    userDiv.innerText = messageText;
    chatBox.appendChild(userDiv);

    input.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;

    // 2. عرض مؤشر "جاري البحث..."
    let loadingDiv = document.createElement('div');
    loadingDiv.className = 'message bot-msg typing-indicator';
    loadingDiv.innerHTML = "🔍 <i>فان تايم بوت يبحث في الويب والموسوعة الآن...</i>";
    chatBox.appendChild(loadingDiv);
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
        // تنظيف النص وتجهيز كلمات البحث
        let query = encodeURIComponent(messageText);
        
        // البحث في ويكيبيديا العربية أولاً للحصول على معلومات دقيقة
        let wikiResponse = await fetch(`https://ar.wikipedia.org/api/rest_v1/page/summary/خمس_ليال_في_فريدي`);
        let wikiData = await wikiResponse.json();

        // استدعاء بحث إضافي محلي ومفتوح
        let searchResponse = await fetch(`https://api.duckduckgo.com/?q=${query}&format=json&no_html=1`);
        let searchData = await searchResponse.json();

        chatBox.removeChild(loadingDiv);
        let botDiv = document.createElement('div');
        botDiv.className = 'message bot-msg';

        // معالجة الذكاء والتنفيذ
        if (searchData.AbstractText && searchData.AbstractText !== "") {
            botDiv.innerHTML = `<strong>🤖 إجابة فان تايم بوت:</strong><br>${searchData.AbstractText}`;
        } 
        else if (searchData.RelatedTopics && searchData.RelatedTopics.length > 0 && searchData.RelatedTopics[0].Text) {
            botDiv.innerHTML = `<strong>🤖 إجابة فان تايم بوت:</strong><br>${searchData.RelatedTopics[0].Text}`;
        } 
        else {
            // في حال كان السؤال عن شخصيات أو مقارنات (مثل وليام أفتون، فريدي، إلخ)
            botDiv.innerHTML = `<strong>🤖 إجابة فان تايم بوت:</strong><br>
            بناءً على معلومات FNaF:<br>
            سؤالك عن <strong>"${messageText}"</strong> يرتبط بأسرار المتجر وروايات Fazbear! <br><br>
            💡 <em>معلومة سريعة:</em> <strong>وليام أفتون (William Afton)</strong> هو القاتل الرئيسي ومؤسس Afton Robotics، وهو البشري المحرك للأحداث والمسيطر على تقنيات الأنيماترونكس! أما <strong>Funtime Freddy</strong> فهو أنيماترونكس مبرمج من صنع أفتون نفسه.`;
        }

        chatBox.appendChild(botDiv);

    } catch (error) {
        chatBox.removeChild(loadingDiv);
        let errorDiv = document.createElement('div');
        errorDiv.className = 'message bot-msg';
        errorDiv.innerText = "حدث خطأ أثناء جلب البيانات، حاول مجدداً!";
        chatBox.appendChild(errorDiv);
    }

    chatBox.scrollTop = chatBox.scrollHeight;
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}
