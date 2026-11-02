// Отримуємо всі кнопки вкладок
const tabs = document.querySelectorAll(".tab");

// Отримуємо всі секції з таблицями
const sections = document.querySelectorAll(".table-section");

// Додаємо обробник події для кожної кнопки
tabs.forEach(function(tab) {

    tab.addEventListener("click", function() {

        // Прибираємо активний клас у всіх кнопок
        tabs.forEach(function(item) {
            item.classList.remove("active");
        });

        // Прибираємо активний клас у всіх таблиць
        sections.forEach(function(section) {
            section.classList.remove("active");
        });

        // Активуємо натиснуту кнопку
        tab.classList.add("active");

        // Знаходимо ID таблиці, пов'язаної з кнопкою
        const tableId = tab.dataset.table;

        // Знаходимо потрібну секцію
        const selectedSection = document.getElementById(tableId);

        // Показуємо вибрану секцію
        if (selectedSection) {
            selectedSection.classList.add("active");
        }

    });

});