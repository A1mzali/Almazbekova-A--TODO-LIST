//Находим элементы на странице

const form = document.querySelector('#form')
const taskInput = document.querySelector('#taskInput')
const tasksList = document.querySelector('#tasksList')
const emptyList = document.querySelector('#EmtyList')

//Добавление задачи

form.addEventListener('submit', addTask)


//удаление задачи

tasksList.addEventListener('click', deleteTask)

//Отмечаем задачу завершенной

tasksList.addEventListener('click', doneTask)



function addTask(event){
  //Отменяем отправку формы
   event.preventDefault()  

   //Достаем текст задачи из  поля ввода
 
    const taskText = taskInput.value;
 
   const taskHTML = `	<li class="list-group-item d-flex justify-content-between task-item">
             <span class="task-title">${taskText}</span>
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

  if (event.target.dataset.action === 'delete'){
     
    const parentNode = event.target.closest('.list-group-item')
    parentNode.remove()
  }

  if(tasksList.children.length === 1) {
    emptyList.classList.remove('none')
  }
}

function doneTask(event) {
  
  //проверяем что клик был по кнопке "Задача выполнена"

  if(event.target.dataset.action === 'done') {
    
    const parentNode =event.target.closest(".list-group-item");
    const taskTitle = parentNode.querySelector('.task-title');
    taskTitle.classList.toggle('task-title--done');
   
  }
}