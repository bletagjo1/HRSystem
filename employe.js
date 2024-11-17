let container = document.getElementById('container');
let navBar = document.getElementById('nav-bar');
let menu = document.getElementById('menu');
let menuIcon = document.getElementById('menuIcon'); 
let removeMenu = document.getElementById('x');
let yourName = document.getElementById('yourName');
let firstName = localStorage.getItem('name');
let lastName = localStorage.getItem('surname');
let form = document.getElementById('form');
let employe = document.getElementById('employe');
let firstNameId = document.getElementById('firstName');
let lastNameId = document.getElementById('lastName');
let birthDateId = document.getElementById('birthdate');
let positionId = document.getElementById('position');
let submit = document.getElementById('submit');
let table = document.getElementById('tablee');
let errorMessage = document.querySelectorAll('small');
let addEmploye = document.getElementById('addEmploye');
let deleteBtn = document.getElementById("delete");
let isEditMode = false;
let employes = [];
const formData = {};
yourName.innerHTML = `${firstName} ${lastName}`;
let profileImg = document.getElementById('profileImg');
    
function displayItems() {
    let itemsFromStorage = getFromStorage();
    itemsFromStorage.forEach(item => {
        createEmploye(item);
    });
}

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

function renderEmploye() {
    table.innerHTML = '';
    let tableContent = document.createElement('table');
    let tableHead = document.createElement('thead');
    let tableBody = document.createElement('tbody');
    let headerRow = document.createElement('tr');

    headerRow.innerHTML = `
                <th>First name</th>
                <th>Last Name</th>
                <th>Birthdate</th>
                <th>Position</th>
                <th>Actions</th>
                `;
    employes.forEach(formdata => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${formdata.$firstName}</td>
        <td>${formdata.$lastName}</td>
        <td>${formdata.$birthdate}</td>
        <td>${formdata.$position}</td>
        <td><button class="active1" id="one"><i class="fa-solid fa-edit"></i></button>
        <button class="active" id="two"><i class="fa-solid fa-trash-can id="delete"></i></button></td>
        `;
        tableBody.appendChild(row);
    });
    tableHead.appendChild(headerRow);
    tableContent.appendChild(tableHead);
    table.appendChild(tableContent);
    tableContent.appendChild(tableBody);
};

function createEmploye(item) {
    if (!item) {
        form.style.display = 'none';
        addEmploye.style.display = 'block';
        submit.innerHTML = 'Submit';
        submit.style.backgroundColor = 'black';
        submit.style.border = 'none';
        const $firstName = firstNameId.value;
        const $lastName = lastNameId.value;
        const $birthdate = birthDateId.value;
        const $position = positionId.value;
        let formDataObj = {
            id: employes.length + 1,
            $firstName,
            $lastName,
            $birthdate,
            $position
        }

        employes.push(formDataObj);
        addItemToStorage(formDataObj);
        firstNameId.value = '';
        lastNameId.value = '';
        birthDateId.value = '';
        positionId.value = '';
    } else {
        employes.push(item);
    }

    renderEmploye();
};

function addItemToStorage(item) {
    let itemsToStorage;
    if (localStorage.getItem('employeItems') === null) {
        itemsToStorage = [];
    } else {
        itemsToStorage = JSON.parse(localStorage.getItem('employeItems'));
    }

    itemsToStorage.push(item);
    localStorage.setItem('employeItems', JSON.stringify(itemsToStorage));
}

function getFromStorage() {
    let itemsToStorage;
    if (localStorage.getItem('employeItems') === null) {
        itemsToStorage = [];
    } else {
        itemsToStorage = JSON.parse(localStorage.getItem('employeItems'));
    }

    return itemsToStorage;
}

addEmploye.addEventListener('click', function () {
    form.style.display = 'block';
    addEmploye.style.display = 'none';
});

form.addEventListener('submit', function (e) {
    console.log('test');
    e.preventDefault();
    if (isEditMode) {
        // formData.employe = employe.value;
        // formData.firstNameId = firstNameId.value;
        // formData.lastNameId = lastNameId.value;
        // formData.positionId = positionId.value;
        // console.log(formData);
        // addItemToStorage(formData);
        form.style.display = 'none';
        addEmploye.style.display = 'block';
    } else {
        createEmploye();
    }
    
})


function onClickItem(e) {
    if (e.target.parentElement.classList.contains('active')) {
        clearItem(e.target.parentElement.parentElement.parentElement);
    }
    if (e.target.parentElement.classList.contains('active1')) {
        setEditMode(e.target.parentElement.parentElement.parentElement);
    }
}

function clearItem(item) {
    if (confirm('Are you sure to delete?')) {
        item.remove();
        removeFromStorage(item);
    }
}

function removeFromStorage(item) {
    //let itemFromStorage = getFromStorage();
    let itemFromStorage = JSON.parse(localStorage.getItem("employeItems"));
    itemFromStorage = itemFromStorage.filter((i) => i !== item);
    localStorage.setItem('employeItems', JSON.stringify(itemFromStorage));
    console.log(item)
}

function setEditMode(item) {
    isEditMode = true;
    table.querySelectorAll('td').forEach(i => {
        i.classList.remove('edit-mode');
    });
    item.classList.add('edit-mode');
    submit.innerHTML = '<i class="fa-solid fa-pen"></i> Update';
    submit.style.backgroundColor = 'green';
    submit.style.border = 'none';
    firstNameId.value = item.childNodes[1].textContent;
    lastNameId.value = item.childNodes[3].textContent;
    birthDateId.value = item.childNodes[5].textContent;
    positionId.value = item.childNodes[7].textContent;
    form.style.display = 'block';
    addEmploye.style.display = 'none';
    submit.addEventListener('click', function () {
        item.childNodes[1].textContent = firstNameId.value;
        item.childNodes[3].textContent = lastNameId.value;
        item.childNodes[5].textContent = birthDateId.value;
        item.childNodes[7].textContent = positionId.value;
        form.style.display = 'none';
        addEmploye.style.display = 'block';
    });
}

table.addEventListener('click', onClickItem);
document.addEventListener('DOMContentLoaded', function () {
    let itemsFromStorage = getFromStorage();
    itemsFromStorage.forEach(item => {
        createEmploye(item);
    });
    renderEmploye();
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
  };