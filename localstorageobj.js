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
    li.appendChild(document.createTextNode(`${nameInput.value}: ${emailInput.value}`))

    //DELETE BUTTON
    var deleteBtn=document.createElement('button');
    deleteBtn.className="deleteBtn"
    deleteBtn.appendChild(document.createTextNode('Delete'));
    li.appendChild(deleteBtn)

    //EDIT BUTTON
    var editBtn=document.createElement('button');
    editBtn.className="edit"
    editBtn.appendChild(document.createTextNode('Edit'));
    li.appendChild(editBtn)
   // Append to ul
    userList.appendChild(li);

    const obj={
        name : nameInput.value,
        email : emailInput.value
    }

    localStorage.setItem(obj.email,JSON.stringify(obj))

    //Clear Fields
    nameInput.value = '';
    emailInput.value = '';
    
    //Delete Functionality
    var ul=document.getElementById("users")
    deleteBtn.onclick=function(email){
        localStorage.removeItem(obj.email)
        ul.removeChild(li)
                
    }

    editBtn.onclick=function(email){
        localStorage.removeItem(obj.email)
        ul.removeChild(li)
        document.getElementById("name").focus()
    }
}
}