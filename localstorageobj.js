const myForm = document.querySelector('#my-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const msg = document.querySelector('.msg');
const userList = document.querySelector('#users');

// Listen for form submit
myForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  
  if(nameInput.value === '' || emailInput.value === '') {
    // alert('Please enter all fields');
    msg.classList.add('error');
    msg.innerHTML = 'Please enter all fields';

    // Remove error after 3 seconds
    setTimeout(() => msg.remove(), 3000);
  } else {
    // Create new list item with user
    const li = document.createElement('li');

    // Add text node with input values
    li.appendChild(document.createTextNode(`${nameInput.value}: ${emailInput.value}`));

    // Add HTML
    li.innerHTML = `<strong>${nameInput.value}</strong> : ${emailInput.value}`;

    // Append to ul
    userList.appendChild(li);


var myObj={
  objName : nameInput.value ,
  objEmail:emailInput.value
}

var users=JSON.parse(localStorage.getItem("Users"))
if(users==null) users=[]
var myObj={
    name : nameInput.value ,
    email:emailInput.value
  }
  
  users.push(myObj)
  localStorage.setItem("Users",JSON.stringify(users))
  

// // Clear fields
    nameInput.value = '';
    emailInput.value = '';
  }
}