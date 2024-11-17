let container = document.getElementById('container');
let navBar = document.getElementById('nav-bar');
let menu = document.getElementById('menu');
let menuIcon = document.getElementById('menuIcon');
let removeMenu = document.getElementById('x');
let yourName = document.getElementById('yourName');
let firstName = localStorage.getItem('name');
let lastName = localStorage.getItem('surname');
yourName.innerHTML = `${firstName} ${lastName}`;
let projects = document.getElementById('projects');
let users = document.getElementById('users');
let leave = document.getElementById('leave');
let loan = document.getElementById('loan');
let notStarted = document.getElementById('notStarted');
let inProgress = document.getElementById('inProgress');
let completed = document.getElementById('completed');
let profileImg = document.getElementById('profileImg');
let inputBox = document.getElementById('inputBox');
let listContainer = document.getElementById('listContainer');
let errorMsg = document.getElementById('errorMsg');
 
let myData = JSON.parse(localStorage.getItem('employeItems'));
users.innerHTML = myData.length;
 
myData = JSON.parse(localStorage.getItem('leaveItems'));
leave.innerHTML = myData.length;

myData = JSON.parse(localStorage.getItem('projectsItem'));
projects.innerHTML = myData.length;

projectData = JSON.parse(localStorage.getItem('projectsItem'));
const total = projectData.reduce((accumulator, item) => {
    return accumulator + item["$price"];
}, 0);
loan.innerHTML = total;

let projectDataStatus = JSON.parse(localStorage.getItem('projectsItem'));
const notStartedStatus = "Not Started";
const countNotStarted = projectDataStatus.reduce((acc, item) => 
    item['$status'] === notStartedStatus ? ++acc : acc, 0);
notStarted.innerHTML = countNotStarted;

const inProgressStatus = "In Progress";
const countInProgress = projectDataStatus.reduce((acc, item) => 
    item['$status'] === inProgressStatus ? ++acc : acc, 0);
inProgress.innerHTML = countInProgress;

const completedStatus = "Completed";
const countCompleted = projectDataStatus.reduce((acc, item) => 
    item['$status'] === completedStatus ? ++acc : acc, 0);
completed.innerHTML = countCompleted;

menuIcon.addEventListener('click', function (e) {
    e.preventDefault();
    container.style.marginLeft = '20%';
    container.style.width = '80%';
    menu.style.display = 'block';
    menu.style.width = '20%';
});

removeMenu.addEventListener('click', function (e) {
    e.preventDefault();
    container.style.marginLeft = '0%';
    container.style.width = '100%';
    menu.style.display = 'none';
    menu.style.width = '0%';
});

//Project status Chart
const xValues = ["Not Started", "In Progress", "Completed"];
const yValues = [notStarted.innerHTML, inProgress.innerHTML, completed.innerHTML];
const barColors = [
  "#da3a64",
  "blueviolet",
  "#00aba9" 
];

new Chart("myChart", {
  type: "pie",
  data: {
    labels: xValues,
    datasets: [{
      backgroundColor: barColors,
      data: yValues
    }]
  }
});

//Profile pic
// Function to convert an image file to a Base64 string
function toBase64(file) {
  return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
  });
}

// Function to upload and store the image
async function uploadImage() {
  const fileInput = document.getElementById('fileInput');
  const profilePic = document.getElementById('profilePic');

  if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const base64Image = await toBase64(file);

      // Store the Base64 image string in local storage
      localStorage.setItem('profilePic', base64Image);

      // Set the image src to the Base64 string
      profilePic.src = base64Image;
      profileImg.src = base64Image;
  }
}

// Load the stored image when the page is loaded
window.onload = () => {
  const storedImage = localStorage.getItem('profilePic');
  let profileImage = localStorage.getItem('profilePic');
    if (profileImage) {
        profileImg.src = storedImage;
    }

  
  todos = JSON.parse(localStorage.getItem('todos')) || [];
  let input = document.getElementById('inputBox');
  let addItem = document.getElementById('addItem');
  addItem.addEventListener('click', e => {
    e.preventDefault();
    const todo = {
      content: input.value,
      done: false
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
    input.value = '';
    displayTodos();
  })
    displayTodos();
};

function displayTodos(){
  let todoList = document.getElementById('todo-list');
  todoList.innerHTML = '';

  todos.forEach(todo => {
    let nothingYet = document.getElementById('nothingYet');
    nothingYet.style.display = 'none';
    const todoItem = document.createElement('div');
    todoItem.classList.add('todo-item');

    const label = document.createElement('label');
    const input = document.createElement('input');
    const span = document.createElement('span');
    const content = document.createElement('div');
    const actions = document.createElement('div');
    const edit = document.createElement('i');
    edit.className = "fa-regular fa-pen-to-square";
    const deleteBtn = document.createElement('i');
    deleteBtn.className = "fa-solid fa-x";

    input.type = 'checkbox';
    input.checked = todo.done;
    span.classList.add('bubble');
    content.classList.add('todo-content');
    actions.classList.add('actions');
    content.innerHTML = `<input type='text' value="${todo.content}" readonly />`;

    label.appendChild(input);
    label.append(span);
    actions.appendChild(edit);
    actions.appendChild(deleteBtn);
    todoItem.appendChild(label);
    todoItem.appendChild(content);
    todoItem.appendChild(actions);
    todoList.appendChild(todoItem);

    if(todo.done){
      todoItem.classList.add('done');
    }

    input.addEventListener('click', e =>{ 
      todo.done = e.target.checked;
      localStorage.setItem('todos', JSON.stringify(todos));

      if(todo.done){
        todoItem.classList.add('done');
      }else {
        todoItem.classList.remove('done');
      }

      displayTodos(); 
    })

    edit.addEventListener('click', e=> {
      const input = content.querySelector('input');
      input.removeAttribute('readonly');
      input.focus();
      input.addEventListener('blur', e => {
        input.setAttribute('readonly', true);
        todo.content = e.target.value;
        localStorage.setItem('todos', JSON.stringify(todos));
        displayTodos();
      })
    })

    deleteBtn.addEventListener('click', e=>{
      todos = todos.filter(t => t != todo);
      localStorage.setItem('todos', JSON.stringify(todos));
      displayTodos();
    })
  })
}