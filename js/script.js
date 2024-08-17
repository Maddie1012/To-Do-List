let inputField = document.querySelector('.input-new-task');
let createTaskBtn = document.querySelector('.new-task-btn');
let taskCount1 = document.querySelector('[data-count="1"]');
let taskCount2 = document.querySelector('[data-count="2"]');
let tasksList = document.querySelector('.container__tasks');
const paginationElem = document.querySelector('.pagination');

const allTasks = [];
let currentPage = 1;
let rows = 5;

let isElementRemoved = false;

taskCount1.textContent = 0;
taskCount2.textContent = 0;

// очистка поля ввода
function clearInput() {
    inputField.value = ''
}

// проверка на пустое значение в поле ввода
function isEmptyInput(value) {
    return value.trim() === '';
}

//удаление начальной картинки и текста
function removeTaskListElements() {
    if(!(isElementRemoved)) {
        let image = document.querySelector('.tasks-notes-img')
        let text = document.querySelector('.tasks__text')
        if(image && text) {
            image.remove();
            text.remove();
            isElementRemoved = true;
        }
    }
}

// создание задачи
function createTask() {
    if(isEmptyInput(inputField.value)) {
        return;
    }

    let taskItem = {
        id: Date.now(),
        title: inputField.value,
        completed: false,
    }

    allTasks.push(taskItem);
    taskCount1.textContent = allTasks.length;
    clearInput();
    displayPaginationList(allTasks, rows, currentPage);
    displayPagination(allTasks, rows)
}

// отображение задач с пагинацией
function displayPaginationList(arrData, rowPerPage, page) {
    tasksList.innerHTML = '';
    const start = (page - 1) * rowPerPage;
    const end = start + rowPerPage; 
    const paginatedData = arrData.slice(start, end);
    
    removeTaskListElements();
    
    tasksList.style.padding = '0'

    paginatedData.forEach((element) => {
        let divTask = document.createElement('div');
        let textTask = document.createElement('p');
        let checkbox = document.createElement('input');
        let button = document.createElement('button');

        divTask.classList.add('task');
        textTask.classList.add('task-some-text');
        checkbox.classList.add('check-box');
        button.classList.add('button__delete')
        checkbox.setAttribute('type', 'checkbox');
        divTask.setAttribute('data-id', element.id)

        tasksList.append(divTask);
        divTask.append(checkbox);
        divTask.append(textTask);
        divTask.append(button);

        textTask.innerText = element.title;
    })

}

// 
function displayPagination(arrData, rowPerPage) {
    paginationElem.innerHTML = ''

    const pagesCount = Math.ceil(arrData.length / rowPerPage);
    const ulEl = document.createElement('ul');
    ulEl.classList.add('pagination__list')

    for(let i = 0; i < pagesCount; i++) {
        const liEl = displayPaginationBtn(i + 1);
        ulEl.appendChild(liEl);           
    }
    paginationElem.appendChild(ulEl);
}

// 
function displayPaginationBtn(page) {
    const liEl = document.createElement('li');
    liEl.classList.add('pagination__item');
    liEl.innerText = page

    liEl.addEventListener('click', () => {
        currentPage = page;
        displayPaginationList(allTasks, rows, currentPage);
    })
    return liEl;
}

// удаление задачи при нажатии на значок
function deleteTask(event) {
    if(event.target.closest('.button__delete')) {
        let task = event.target.closest('.task')
        let taskId = Number(task.getAttribute('data-id'))
        const taskIndex = allTasks.findIndex(task => task.id === taskId)
        
        console.log(task.id)
        console.log(taskId)

        if(taskIndex !== -1) {
            allTasks.splice(taskIndex, 1);
            taskCount1.textContent = allTasks.length;
        }
        displayPaginationList(allTasks, rows, currentPage);
        displayPagination(allTasks, rows);
    }
}

createTaskBtn.addEventListener('click', createTask)
tasksList.addEventListener('click', deleteTask)

