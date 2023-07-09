const taskList = [];

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
}


function displayList(){
  let accumHTML = ``;
  for(let i = 0; i < taskList.length; i++){
    const taskElement = taskList[i];
    //const input = taskElement.input;
    //const date = taskElement.date;
    const {input, date} = taskElement;
    const html = `
    <div>${input}</div>
    <div>${date}</div>
    <button
      class="css-delete-button" 
      onclick="
        taskList.splice(${i}, 1);
        displayList();"
        
      > Delete </button>
      `;
    accumHTML += html;
  }
  document.querySelector('.js-todo-list').innerHTML = accumHTML;
}

function enterKeyDown(event){
  if (event.key === 'Enter'){
    addTodoList();
  }
}
