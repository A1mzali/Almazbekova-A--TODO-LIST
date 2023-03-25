//Находим элементы на странице

const form = document.querySelector('#form')
const taskInput = document.querySelector('#taskInput')
const tasksList = document.querySelector('#tasksList')
const emptyList = document.querySelector('#EmtyList')

//Создаем пустой массив
let tasks = [];


//Добавление задачи

form.addEventListener('submit', addTask)
 
//удаление задачи

tasksList.addEventListener('click', deleteTask)

//Отмечаем задачу завершенной

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
 
 
 
 //Проверкаю Если в списке задач более 1-го элемента, скрываем блок
     if(tasksList.children.length > 1) {
       emptyList.classList.add('none')
     }

}

function deleteTask(event) {
  //проверяем если  клик был НЕ по кнопке "Удалить задачу"
   if (event.target.dataset.action !== 'delete')return;

  //проверяем что клик был по кнопке "Удалить задачу"
    const parentNode = event.target.closest('.list-group-item')

    //Определяем ID задачи
    const id = Number (parentNode.id )
  
    // 1 способ удаление---Находим индекс задачи в массиве
   const index = tasks.findIndex(function(task) {
        console.log(task);
        if( task.id === id){
          return true
        }
    })
    
    //удаляем задачу из массива с задачами
    tasks.splice(index, 1)

    //удаляем задачу из разметки
    parentNode.remove()

  //проверка. Если в списке задач 1-ин элемент, показывает блок"Удалить задачу"
     if(tasksList.children.length === 1) {
        emptyList.classList.remove('none')
  }

}

function doneTask(event) {
  
  //проверяем что клик был НЕ по кнопке "Задача выполнена"
  if(event.target.dataset.action !== 'done') return;
    
    const parentNode =event.target.closest(".list-group-item");
    const taskTitle = parentNode.querySelector('.task-title');
    taskTitle.classList.toggle('task-title--done');

}


function saveHTMLtoLS() {
  localStorage.setItem('tasksHTML', tasksList.innerHTML);
}