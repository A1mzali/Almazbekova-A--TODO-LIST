//Находим элементы на странице

const form = document.querySelector('#form')
const taskInput = document.querySelector('#taskInput')
const tasksList = document.querySelector('#tasksList')
const emptylist = document.querySelector('#EmtyList')



form.addEventListener('submit', addTask)

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
 
 
 
 
     if(tasksList.children.length > 1) {
       emptylist.classList.add('none')
     }
 
 
}