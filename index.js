let container = document.getElementById('container');
let navBar = document.getElementById('nav-bar');
let menu = document.getElementById('menu');
let menuIcon = document.getElementById('menuIcon');
let removeMenu = document.getElementById('x');
let yourName = document.getElementById('yourName');
let yourName2 = document.getElementById('yourName2');
let file = document.getElementById('file');
let profilePic = document.getElementById('profilePic');
let uploadBtn = document.getElementById('uploadBtn');
let name = document.getElementById('name');
let surname = document.getElementById('surname');
let email = document.getElementById('email');
let emailAddress = document.getElementById('emailAddress');
let gender = document.getElementById('gender');
let firstName = localStorage.getItem('name');
let lastName = localStorage.getItem('surname');
let email1 = localStorage.getItem('email');
let yourGender = localStorage.getItem('gender');
let profileImg = document.getElementById('profileImg');
let phoneNr = document.getElementById('phoneNr');
let phoneNumber = document.getElementById('phoneNumber');
let position = document.getElementById('position');
let birthdate = document.getElementById('birthdate');
let address = document.getElementById('address');
let address1 = document.getElementById('address1');
let save = document.getElementById('save');
name.setAttribute('value', firstName);
surname.setAttribute('value', lastName);
emailAddress.setAttribute('value', email1);
email.innerHTML = email1;
gender.setAttribute('value', yourGender);
yourName.innerHTML = `${firstName} ${lastName}`;
yourName2.innerHTML = `${firstName} ${lastName}`;

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
    if (storedImage) {
        document.getElementById('profilePic').src = storedImage;
    }
    let profileImage = localStorage.getItem('profilePic');
    if (profileImage) {
        profileImg.src = storedImage;
    }

    phoneNumber.innerHTML = localStorage.getItem('phoneNumber');
    address1.innerHTML = localStorage.getItem('address');
};

save.addEventListener('click', function(){
    let phoneNumber1 = phoneNr.value;
    localStorage.setItem('phoneNumber', phoneNumber1);
    localStorage.setItem('position', position.value);
    localStorage.setItem('birthdate', birthdate.value);
    localStorage.setItem('address', address.value);
    phoneNumber.innerHTML = localStorage.getItem('phoneNumber');
    address1.innerHTML = localStorage.getItem('address');
    localStorage.setItem('name', name.value);
    localStorage.setItem('surname', surname.value);
    localStorage.setItem('email', emailAddress.value);
    localStorage.setItem('gender', gender.value);
})

position.value = localStorage.getItem('position');
phoneNr.value = localStorage.getItem('phoneNumber');
birthdate.value = localStorage.getItem('birthdate');
address.value = localStorage.getItem('address');

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