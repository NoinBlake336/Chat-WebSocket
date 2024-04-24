const register = document.getElementById('register');
const name = document.getElementById('name');
const username = document.getElementById('username');
const loaderRegister = document.getElementById('loaderRegister');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const email = document.getElementById('email');
const messageErroRegister = document.getElementById('messageErrorRegister');

const sendMessageError = (message)=>{
    if(messageErroRegister.classList.contains('opacity-0')){
        messageErroRegister.classList.remove('opacity-0');
    }
    messageErroRegister.innerHTML = message;  
    setTimeout(()=>{
        messageErroRegister.classList.add('opacity-0');
    },1500);

    return false;
}

const verifyFields = ()=>{
    console.log(password.value, confirmPassword.value);
    if(name.value == '' || username.value == '' || password.value == '' || confirmPassword.value == '' || email.value == ''){
        sendMessageError('Complete los campos');
        new Error('Complete los campos');
    }
};


const verifyPassword = ()=>{
    const isCorrectPassword = password.value === confirmPassword.value ? true : false;

    return isCorrectPassword;
};

const newUser = (e)=>{
    e.preventDefault();
    verifyFields();
    const passwordVerificationResponse = verifyPassword();
    
    console.log(passwordVerificationResponse)
    if(!passwordVerificationResponse){
        name.value = "";
        username.value = "";
        password.value ="";
        confirmPassword.value = "";
        email.value = "";
        sendMessageError('Las contraseñas no coinciden')
        new Error('Las contraseñas no coinciden');
    }

    if(loaderRegister.classList.contains('hidden')){
        loaderRegister.classList.remove('hidden');
    }

    return fetch('api/user',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify({
            name:name.value,
            username:username.value,
            email:email.value,  
            password:password.value,
        })
    }).then(response=>{
        loaderRegister.classList.add('hidden');
        if(response.ok){
            email.value = "";
            password.value = "";
            confirmPassword.value = "";
            name.value = "";
            username.value = "";
            return response.json();
        }

        if(response.status = 400){
            email.value = "";
            password.value = "";
            confirmPassword.value = "";
            name.value = "";
            username.value = "";
            sendMessageError('Ha ocurrido un error con la peticion');
        }
    })

}

register.addEventListener('click', newUser, false);