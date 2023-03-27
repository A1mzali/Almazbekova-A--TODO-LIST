//Находим элементы на странице

const form = document.querySelector('#form')
const taskInput = document.querySelector('#taskInput')
const tasksList = document.querySelector('#tasksList')
const emptyList = document.querySelector('#EmtyList')

//Создаем пустой массив
let tasks = [];

if(localStorage.getItem('tasks')){
 tasks = JSON.parse(localStorage.getItem('tasks'))

}

tasks.forEach(function(task){
    //Формируем сss класс
  const cssClass = task.done ? 'task-title task-title--done' : 'task-title';  //тернарный оператор


  //Формулируем разметку для новой задачи
   const taskHTML = `<li id='${task.id}' class="list-group-item d-flex justify-content-between task-item">
            <span class="${cssClass}">${task.text}</span>
            <div class="task-item__buttons">
              <button type="button" data-action="done" class="btn-action">
                <img src="./img/tick.svg" alt="Done" width="18" height="18">
              </button>
              <button type="button" data-action="delete" class="btn-action">
                <img src="./img/cross.svg" alt="Done" width="18" height="18">
              </button>
            </div>
          </li>`;

    //Добавляем задачу на страницу

  tasksList.insertAdjacentHTML('beforeend', taskHTML)  
})

checkEmptyList()


//Добавление задачи

form.addEventListener('submit', addTask)
tasksList.addEventListener('click', deleteTask)
tasksList.addEventListener('click', doneTask)


//Функции
function addTask(event){
  //Отменяем отправку формы
   event.preventDefault()  

   //Достаем текст задачи из  поля ввода
    const taskText = taskInput.value;
    
    //описываем разметку в виде объекта
    const newTask = {
      id: Date.now(),
      text: taskText,
      done: false
    }

    //добавляем задачу в массив с задачами
    tasks.push(newTask)

    //Сохраняем список задач в хранилище браузера lacalStrorage
    saveToLOcalStrorage()

 //Формируем сss класс
  const cssClass = newTask.done ? 'task-title task-title--done' : 'task-title';  //тернарный оператор


   //Формулируем разметку для новой задачи
    const taskHTML = `<li id='${newTask.id}' class="list-group-item d-flex justify-content-between task-item">
             <span class="${cssClass}">${newTask.text}</span>
             <div class="task-item__buttons">
               <button type="button" data-action="done" class="btn-action">
                 <img src="./img/tick.svg" alt="Done" width="18" height="18">
               </button>
               <button type="button" data-action="delete" class="btn-action">
                 <img src="./img/cross.svg" alt="Done" width="18" height="18">
               </button>
             </div>
           </li>`;
 
     //Добавляем задачу на страницу
 
   tasksList.insertAdjacentHTML('beforeend', taskHTML)  
   
     // Очищаем INPUT
     taskInput.value = " ";
     taskInput.focus()  //фокус возвращается к input

     checkEmptyList()
}

function deleteTask(event) {
  //проверяем если  клик был НЕ по кнопке "Удалить задачу"
   if (event.target.dataset.action !== 'delete')return;

  //проверяем что клик был по кнопке "Удалить задачу"
    const parentNode = event.target.closest('.list-group-item')

    //Определяем ID задачи
    const id = Number (parentNode.id )
  
  //  Удаление задача через фильтрацию массива
       tasks = tasks.filter(function(task){
        if(task.id === id){
          return false
        }else {
          return true
        }
        // return task.id !== id;
    })

    //Сохраняем список задач в хранилище браузера lacalStrorage
    saveToLOcalStrorage()

    //удаляем задачу из разметки
    parentNode.remove() 

    checkEmptyList()

}

function doneTask(event) {
  
  //проверяем что клик был НЕ по кнопке "Задача выполнена"
  if(event.target.dataset.action !== 'done') return;
    
    const parentNode =event.target.closest(".list-group-item");

    // определяем ID задачи
    const id = Number(parentNode.id);

   const task = tasks.find(function(task){
      if(task.id === id) {
        return true
      }
    })


    task.done = !task.done

    //Сохраняем список задач в хранилище браузера lacalStrorage
    saveToLOcalStrorage()

    const taskTitle = parentNode.querySelector('.task-title');
    taskTitle.classList.toggle('task-title--done');

}

function checkEmptyList() {
  if(tasks.length === 0) {
   const emptyListHTML = `<li id="emptyList" class="list-group-item empty-list">
					<img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
					<div class="empty-list__title">Список дел пуст</div>
				</li>`;

        tasksList.insertAdjacentHTML('afterbegin', emptyListHTML);
  }

  if (tasks.length > 0) {
    const emptyListEl = document.querySelector('#emtyList');
    emptyListEl ? emptyListEl.remove() : null;

  }
}

function saveToLOcalStrorage(){
  localStorage.setItem('tasks',JSON.stringify(tasks))
}