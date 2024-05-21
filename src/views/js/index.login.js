


const signUp = document.getElementById('signUp');
let email = document.getElementById('email');
let password = document.getElementById('password');
let confirmPassword = document.getElementById('confirmPassword');
const loader = document.getElementById('loader');
const messageError = document.getElementById('messageError');

const sendMessageError = (message)=>{
    if(messageError.classList.contains('opacity-0')){
        messageError.classList.remove('opacity-0');
    }
    messageError.innerHTML = message;  
    setTimeout(()=>{
        messageError.classList.add('opacity-0')
    },1500);
}

const verifyPassword = ()=>{

    if(!password.value || !confirmPassword.value){
        sendMessageError('Completa los campos');
        throw new Error('No ha ingresado una contraseña');
    };

    if(password.value === confirmPassword.value){
        return true;
    }else{
        return false;
    };
};

const login = async(e)=>{
    e.preventDefault();
    const isCorrectPassword = verifyPassword();
    if(!isCorrectPassword){
        password.value = "";
        email.value = "";
        confirmPassword.value ="";
        sendMessageError('La contrasea no coinciden')
        throw new Error('Las contraseña que ha ingresado no coinsiden');
    }

    if(loader.classList.contains('hidden')){
        loader.classList.remove('hidden');
    }
    
    return fetch('api/auth',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
                email:email.value,
                password:password.value,
            })
    }).then(response=>{
            loader.classList.add('hidden')
            if(response.ok){
                email.value = "";
                password.value = "";
                confirmPassword.value = "";
                response.json().then(userData => {
                    localStorage.setItem('user', JSON.stringify(userData))
                } )
                window.location = 'profile'
            }

            if(response.status = 401){
                email.value = "";
                password.value = "";
                confirmPassword.value = "";
                sendMessageError('Ha ocurrido un error con la peticion')
            }


    });
}
signUp.addEventListener('click', login);
