//upon loading the page, load from localStorage
//remember that lists in JavaScript are also objects !!!
const taskList = JSON.parse(localStorage.getItem('todo')) ||[{
  input: 'make dinner',
  date:'2022-12-22'}, 
  {
    input: 'wash dishes',
    date: '2022-12-22'
  }];

  console.log(typeof taskList);
  console.log(taskList);

 displayList();

 function displayList(){
  let accumHTML = ``;

  for (let i = 0; i < taskList.length; i++){
    const taskObject = taskList[i];
    const {input, date} = taskObject;
    const html = `
    <div>${input}</div>
    <div>${date}</div>

    <button
      class="css-delete-button" 
      onclick="
        taskList.splice(${i}, 1);
        updateInStorage();
        displayList();"
        
      > Delete </button>
      `;
    accumHTML += html;
  }
  document.querySelector('.js-todo-list').innerHTML = accumHTML;
}

function addTodoList(){
  let inputElement = document.querySelector('.js-input');
  let input = inputElement.value;
  
  let dateElement = document.querySelector('.js-date');
  let date = dateElement.value;

  taskObj = {
    input,
    date
  }
  taskList.push(taskObj); 
  //kept getting a bug for this because localStorage had a different array stored where input and date both had separate arrays

  //console.log(taskList);
  inputElement.value = '';
  //we want to clear the textbox after adding the task
  //value gives us the text inside the textbox
  displayList();
  updateInStorage();
}

function enterKeyDown(event){
  if (event.key === 'Enter'){
    addTodoList();
  }
}

function updateInStorage(){
  localStorage.setItem('todo', JSON.stringify(taskList));
}