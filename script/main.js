// Ебані таби
const tabItems = document.querySelectorAll(".tab-header-item");
const slider = document.querySelector('.tab-content');

tabItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        const offset = index * -100;
        slider.style.transform = `translateX(${offset}%)`;

        tabItems.forEach((menuItem) => {
            menuItem.classList.remove('is-active');
        });

        item.classList.add('is-active');
    });
});

// changeLanguage
let translations;

fetch('script/content.json')
    .then(response => response.json())
    .then(data => {
        translations = data;
        // Изначально установите тексты на странице с учетом языка по умолчанию
        changeLanguage('ru');
    });

// Функция для изменения текста на странице в соответствии с выбранным языком
function changeLanguage(selectedLanguage) {
    // Установите новые тексты из JSON
    const languageTexts = translations[selectedLanguage];

    // Обновите тексты на странице
    const elementsToTranslate = document.querySelectorAll("[data-translate-key]");
    elementsToTranslate.forEach(element => {
        const key = element.getAttribute("data-translate-key");
        if (languageTexts.hasOwnProperty(key)) {
            element.textContent = languageTexts[key];
        }
    });

    // Установите класс "is-active" на активной кнопке и снимите его с остальных
    const buttons = document.querySelectorAll(".btn-lang");
    buttons.forEach(button => {
        button.classList.remove("is-active");
        if (button.getAttribute("data-lang") === selectedLanguage) {
            button.classList.add("is-active");
        }
    });
}

// Слушатель событий для кнопок переключения языка
const buttonsLang = document.querySelectorAll(".btn-lang");
buttonsLang.forEach(button => {
    button.addEventListener("click", function() {
        const selectedLanguage = this.getAttribute("data-lang");
        changeLanguage(selectedLanguage);
    });
});


// fullpage start
if (window.innerWidth > 728) {
    new fullpage('.wrapper', {
        licenseKey: 'gplv3-license',
        anchors: ['about1', 'pain1', 'services1', 'contacts1'],
        autoScrolling:true,
        menu: '.nav-container',
        fixedElements: '.header',
        scrollHorizontally: true,
        fitToSection: true,
        fitToSectionDelay: 600,
        scrollOverflow: true,
        animateAnchor: true,
        sectionSelector: '.section-content',
        verticalCentered: true,
        credits: { enabled: true, label: '', position: 'right'},
    });
}
