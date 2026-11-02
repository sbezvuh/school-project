// Описуємо характеристики кожної сутності
const schemas = {
    students: {
        title: "Додавання учня",
        bodyId: "studentsBody",
        fields: [
            { name: "Прізвище", type: "text" },
            { name: "Ім'я", type: "text" },
            { name: "Дата народження", type: "date" },
            { name: "Клас", type: "text" },
            { name: "Email", type: "email" },
            {
                name: "Середній бал",
                type: "number",
                min: 0,
                max: 12,
                step: 0.1
            }
        ]
    },

    teachers: {
        title: "Додавання вчителя",
        bodyId: "teachersBody",
        fields: [
            { name: "Прізвище", type: "text" },
            { name: "Ім'я", type: "text" },
            { name: "Предмет", type: "text" },
            { name: "Категорія", type: "text" },
            {
                name: "Стаж роботи (років)",
                type: "number",
                min: 0,
                step: 1
            },
            { name: "Email", type: "email" }
        ]
    },

    subjects: {
        title: "Додавання предмета",
        bodyId: "subjectsBody",
        fields: [
            { name: "Назва предмета", type: "text" },
            {
                name: "Годин на тиждень",
                type: "number",
                min: 1,
                step: 1
            },
            {
                name: "Кабінет",
                type: "number",
                min: 1,
                step: 1
            },
            { name: "Клас", type: "text" },
            {
                name: "ID учителя",
                type: "number",
                min: 1,
                step: 1
            },
            { name: "Тип оцінювання", type: "text" }
        ]
    }
};


// Отримуємо всі вкладки та секції
const tabs = document.querySelectorAll(".tab");
const sections = document.querySelectorAll(".table-section");


// Перемикання вкладок
tabs.forEach(function(tab) {
    tab.addEventListener("click", function() {

        tabs.forEach(function(item) {
            item.classList.remove("active");
        });

        sections.forEach(function(section) {
            section.classList.remove("active");
        });

        tab.classList.add("active");

        const tableId = tab.dataset.table;
        const selectedSection = document.getElementById(tableId);

        if (selectedSection) {
            selectedSection.classList.add("active");
        }
    });
});


// Створюємо форми для всіх трьох сутностей
sections.forEach(function(section) {

    const addButton = section.querySelector(".add-button");
    const formContainer = section.querySelector(".form-container");

    // Визначаємо тип сутності за ID секції
    const schema = schemas[section.id];

    // Обробляємо натискання кнопки додавання
    addButton.addEventListener("click", function() {

        // Якщо форма вже відкрита, повторно її не створюємо
        if (formContainer.querySelector("form")) {
            return;
        }

        // Створюємо форму
        const form = document.createElement("form");

        const title = document.createElement("h3");
        title.textContent = schema.title;

        form.appendChild(title);

        // Створюємо поля форми
        schema.fields.forEach(function(field, index) {

            const label = document.createElement("label");
            label.textContent = field.name;

            const input = document.createElement("input");
            input.type = field.type;
            input.name = "field" + index;
            input.required = true;

            // Додаткові обмеження для числових полів
            if (field.min !== undefined) {
                input.min = field.min;
            }

            if (field.max !== undefined) {
                input.max = field.max;
            }

            if (field.step !== undefined) {
                input.step = field.step;
            }

            label.appendChild(input);
            form.appendChild(label);
        });

        // Кнопка збереження
        const saveButton = document.createElement("button");
        saveButton.type = "submit";
        saveButton.textContent = "Зберегти";

        form.appendChild(saveButton);

        // Кнопка скасування
        const cancelButton = document.createElement("button");
        cancelButton.type = "button";
        cancelButton.textContent = "Скасувати";

        form.appendChild(cancelButton);

        // Додаємо форму на сторінку
        formContainer.appendChild(form);

        // Обробляємо скасування
        cancelButton.addEventListener("click", function() {
            form.remove();
        });

        // Обробляємо відправлення форми
        form.addEventListener("submit", function(event) {

            // Забороняємо перезавантаження сторінки
            event.preventDefault();

            // Перевіряємо правильність заповнення
            if (!form.reportValidity()) {
                return;
            }

            // Отримуємо всі введені значення
            const values = schema.fields.map(function(field, index) {
                return form.elements["field" + index].value.trim();
            });

            // Додатково перевіряємо, чи немає порожніх значень
            if (values.some(function(value) {
                return value === "";
            })) {
                alert("Заповніть усі поля!");
                return;
            }

            // Знаходимо таблицю, до якої додаємо запис
            const tbody = document.getElementById(schema.bodyId);

            // Створюємо новий рядок
            const row = document.createElement("tr");

            // Автоматично визначаємо наступний ID
            const idCell = document.createElement("td");
            idCell.textContent = getNextId(tbody);

            row.appendChild(idCell);

            // Додаємо введені дані до рядка
            values.forEach(function(value) {
                const cell = document.createElement("td");
                cell.textContent = value;

                row.appendChild(cell);
            });

            // Додаємо рядок у таблицю
            tbody.appendChild(row);

            // Очищаємо та закриваємо форму
            form.reset();
            form.remove();

            alert("Запис успішно додано!");
        });
    });
});


// Функція визначення наступного ID
function getNextId(tbody) {

    const rows = tbody.querySelectorAll("tr");

    let maxId = 0;

    rows.forEach(function(row) {

        const id = Number(row.cells[0].textContent);

        if (Number.isInteger(id) && id > maxId) {
            maxId = id;
        }
    });

    return maxId + 1;
}