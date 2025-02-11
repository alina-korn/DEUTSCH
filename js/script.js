async function loadLesson() {
    const urlParams = new URLSearchParams(window.location.search);
    const lessonId = urlParams.get('id');

    if (!lessonId) {
        document.getElementById('lesson-title').innerText = "Ошибка: урок не найден!";
        return;
    }

    try {
        const response = await fetch('lessons.json');
        const lessons = await response.json();

        const lesson = lessons.find(l => l.id == lessonId);

        if (!lesson) {
            document.getElementById('lesson-title').innerText = "Урок не найден!";
            return;
        }

        document.getElementById('lesson-title').innerText = lesson.title;
        document.getElementById('lesson-content').innerText = lesson.content;

        const phrasesContainer = document.getElementById('phrases');
        lesson.phrases.forEach(phrase => {
            const button = document.createElement('button');
            button.innerText = phrase.text;
            button.onclick = () => speak(phrase.audio);
            phrasesContainer.appendChild(button);
        });

    } catch (error) {
        console.error("Ошибка загрузки урока:", error);
    }
}

// Функция озвучивания текста
function speak(text) {
    var speech = new SpeechSynthesisUtterance(text);
    speech.lang = 'de-DE';
    window.speechSynthesis.speak(speech);
}

// Загружаем урок при открытии страницы
window.onload = loadLesson;
