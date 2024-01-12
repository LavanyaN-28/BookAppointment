const myForm = document.querySelector('#my-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const msg = document.querySelector('.msg');
const userList = document.querySelector('#users');
let userDetails=[]
// Listen for form submit
myForm.addEventListener('submit', onSubmit);
var count=0
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
    const liText=document.createTextNode(nameInput.value)
   
   // Append to ul
  
  

    const obj={
        name : nameInput.value,
        email : emailInput.value
    }

    showUsers(obj)
    //Clear Fields
    nameInput.value = '';
    emailInput.value = '';

    localStorage.setItem(obj.email, JSON.stringify(obj));


    axios.post('https://crudcrud.com/api/ed502b94419e4fd2a6c0fcbee7cdcdf7/appointmentData',obj)
    .then((response) => {
        console.log(response.data)
    })
    .catch((err ) => {
        document.body.innerHTML=document.body.innerHTML + "<h4>Something went wrong</h4>";
        console.log(err)
    });

    document.addEventListener("DOMContentLoaded",() => {
        axios.get('https://crudcrud.com/api/ed502b94419e4fd2a6c0fcbee7cdcdf7/appointmentData')
        .then(response => {
            for (var i=0;i<=response.data.length;i++){
                productDetails.push(response.data);
                showUsers(response.data[i])
                console.log(response.data)}
    })
        .catch((err) =>{
            document.body.innerHTML=document.body.innerHTML + "<h4> Cannot  get the details of the user";
            console.log(err)
        })
    })

}
}
function showUsers(user){

        const childElemnt=document.createElement('li')
    const edit=document.getElementById('edit')
    childElemnt.textContent=user.name + ' : ' + user.email
     //DELETE BUTTON
     var deleteBtn=document.createElement('button');
     deleteBtn.className="deleteBtn"
     deleteBtn.appendChild(document.createTextNode('Delete'));
     deleteBtn.addEventListener('click', () => deleteUser(user._id));
     childElemnt.appendChild(deleteBtn)
 
     //EDIT BUTTON
     var editBtn=document.createElement('button');
     editBtn.className="edit"
     editBtn.appendChild(document.createTextNode('Edit'));
     editBtn.addEventListener('click', () => updateUser(user._id));
     childElemnt.appendChild(editBtn)
    userList.appendChild(childElemnt)  
        
    }

function deleteUser(userId){
    {
            axios.delete(`https://crudcrud.com/api/ed502b94419e4fd2a6c0fcbee7cdcdf7/appointmentData/${userId}`)
            .then(response =>{ console.log(response)
                userDetails = userDetails.filter(user => user._id !== userId);
                showUsers(userDetails)
        })
            .catch(err => console.log(err))
        }
    }

function updateUser(userId){
    axios.put(`https://crudcrud.com/api/ed502b94419e4fd2a6c0fcbee7cdcdf7/appointmentData/${userId}`)
    .then(response => {
        nameInput.value=userDetails.name
        emailInput.value=userDetails.email       
        showUsers(response.data)
    })
    .catch(err => comsole.log(err))
}