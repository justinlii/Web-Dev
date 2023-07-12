const taskList = JSON.parse(localStorage.getItem('todo')) || [
  {
    input: 'make dinner',
    date: '2023-07-08'
  },
  {
    input: 'wash dishes',
    date: '2023-07-08'
  }
];

displayList();

function addTodoList(){
  let inputElement = document.querySelector('.js-input');
  let input = inputElement.value;

  let dateElement = document.querySelector('.js-date');
  let date = dateElement.value;

  const task = {
    input: input,
    date: date
    //name,
    //date
  }
  taskList.push(task);
  console.log(taskList);

  //we want to clear the textbox after adding the task
  //value gives us the text inside the textbox

  inputElement.value = '';
  displayList();
  updateStorage();

}


function displayList(){
  let accumHTML = ``;
  taskList.forEach((taskElement, index) => {
    const {input, date} = taskElement;
    const html = `
    <div>${input}</div>
    <div>${date}</div>
    <button
      class="css-delete-button js-delete-button" 
      > Delete </button>
      `;
      accumHTML += html;
  });

    // for(let i = 0; i < taskList.length; i++){
    //   const taskElement = taskList[i];
    //   //const input = taskElement.input;
    //   //const date = taskElement.date;
    //   const {input, date} = taskElement;
    //   const html = `
    //   <div>${input}</div>
    //   <div>${date}</div>
    //   <button
    //     class="css-delete-button" 
    //     onclick="
    //       taskList.splice(${i}, 1);
    //       updateStorage();
    //       displayList();"
          
    //     > Delete </button>
    //     `;
    //   accumHTML += html;
    // }
  document.querySelector('.js-todo-list').innerHTML = accumHTML;
  //HTML that goes on the page is added here, add the eventListener after this line so that the delete button exists.

  //delete button EventListener
  document.querySelectorAll('.js-delete-button')
    .forEach((delButtonElement, index)=>{
      //forEach loop gives us two parameters
      //1. value in the list (deleteButton element)
      //2. index
      delButtonElement.addEventListener('click', ()=> {
        taskList.splice(index, 1);
        updateStorage();
        displayList();
      })
    })
}

function enterKeyDown(event){
  if (event.key === 'Enter'){
    addTodoList();
  }
}

function updateStorage(){
  localStorage.setItem('todo', JSON.stringify(taskList));
}

//add button EventListener
document.querySelector('.js-add-button')
  .addEventListener('click', () => {
    addTodoList();
  })

