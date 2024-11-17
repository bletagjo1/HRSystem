let container = document.getElementById('container');
let navBar = document.getElementById('nav-bar');
let menu = document.getElementById('menu');
let menuIcon = document.getElementById('menuIcon');
let removeMenu = document.getElementById('x');
let yourName = document.getElementById('yourName');
let firstName = localStorage.getItem('name');
let lastName = localStorage.getItem('surname');
let form = document.getElementById('form');
let leave = document.getElementById('leave');
let startDateId = document.getElementById('startDate');
let daysId = document.getElementById('days');
let endDateId = document.getElementById('endDate');
let submit = document.getElementById('submit');
let table = document.getElementById('tablee');
let errorMessage = document.querySelectorAll('small');
let addLeave = document.getElementById('addLeave');
let deleteBtn = document.getElementById("two");
let isEditMode = false;
let leaves = [];
const formData = {};
yourName.innerHTML = `${firstName} ${lastName}`;
let profileImg = document.getElementById('profileImg');

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

function renderLeave() {
    table.innerHTML = '';
    let tableContent = document.createElement('table');
    let tableHead = document.createElement('thead');
    let tableBody = document.createElement('tbody');
    let headerRow = document.createElement('tr');

    headerRow.innerHTML = `
                <th>Leave Type</th>
                <th>Start Date</th>
                <th>Days</th>
                <th>End Date</th>
                <th>Actions</th>
                `;
    leaves.forEach(formdata => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${formdata.$leave}</td>
        <td>${formdata.$startDate}</td>
        <td>${formdata.$days}</td>
        <td>${formdata.$endDate}</td>
        <td><button class="active1" id="one"><i class="fa-solid fa-edit"></i></button>
        <button class="active" id="two"><i class="fa-solid fa-trash-can id="delete"></i></button></td>
        `;
        tableBody.appendChild(row);
    });
    tableHead.appendChild(headerRow);
    tableContent.appendChild(tableHead);
    tableContent.appendChild(tableBody);
    table.appendChild(tableContent);
};

function createLeave(item) {
    if (!item) {
        form.style.display = 'none';
        addLeave.style.display = 'block';
        submit.innerHTML = 'Submit';
        submit.style.backgroundColor = 'black';
        submit.style.border = 'none';
        const $leave = leave.value;
        const $startDate = startDateId.value;
        const $days = daysId.value;
        const $endDate = endDateId.value;
        let formDataObj = {
            id: leaves.length + 1,
            $leave,
            $startDate,
            $days,
            $endDate
        }

        leaves.push(formDataObj);
        addItemToStorage(formDataObj);
        leave.value = '';
        startDateId.value = '';
        daysId.value = '';
        endDateId.value = '';
    } else {
        leaves.push(item);
    }

    renderLeave();
}


function addItemToStorage(item) {
    let itemsToStorage;
    if (localStorage.getItem('leaveItems') === null) {
        itemsToStorage = [];
    } else {
        itemsToStorage = JSON.parse(localStorage.getItem('leaveItems'));
    }

    itemsToStorage.push(item);
    localStorage.setItem('leaveItems', JSON.stringify(itemsToStorage));
}

function getFromStorage() {
    let itemsToStorage;
    if (localStorage.getItem('leaveItems') === null) {
        itemsToStorage = [];
    } else {
        itemsToStorage = JSON.parse(localStorage.getItem('leaveItems'));
    }

    return itemsToStorage;
}

addLeave.addEventListener('click', function () {
    form.style.display = 'block';
    addLeave.style.display = 'none';
});

form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (isEditMode) {
        // formData.leave = leave.value;
        // formData.startDateId = startDateId.value;
        // formData.daysId = daysId.value;
        // formData.endDateId = endDateId.value;
        // console.log(formData);
        // addItemToStorage(formData);
        form.style.display = 'none';
        addLeave.style.display = 'block';
    }else {
        createLeave();
    }

});

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
    let itemFromStorage = getFromStorage();
    itemFromStorage = itemFromStorage.filter((i) => i != item);
    localStorage.setItem('leaveItems', JSON.stringify(itemFromStorage));
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
    leave.value = item.childNodes[1].textContent;
    startDateId.value = item.childNodes[3].textContent;
    daysId.value = item.childNodes[5].textContent;
    endDateId.value = item.childNodes[7].textContent;
    form.style.display = 'block';
    addLeave.style.display = 'none';
    console.log(item.childNodes[1].innerHTML = leave.value);
    submit.addEventListener('click', function () {
        item.childNodes[1].innerHTML = leave.value;
        item.childNodes[3].innerHTML = startDateId.value;
        item.childNodes[5].innerHTML = daysId.value;
        item.childNodes[7].innerHTML = endDateId.value;
        form.style.display = 'none';
        addLeave.style.display = 'block';
    });
}

table.addEventListener('click', onClickItem);
document.addEventListener('DOMContentLoaded', function() {
    itemsFromStorage = getFromStorage();
    itemsFromStorage.forEach(item => {
        createLeave(item);
    });
    renderLeave();
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