'use strict'
const Body = document.querySelector('body');
const login_panel = document.querySelector('.login-box');
const login_title = document.querySelector('.login-btn');
const main_box = document.querySelector('.main-box');
const sign_tilte = document.querySelector('.signUp-btn');
const login_box = document.querySelector('.login-content');
const sign_box = document.querySelector('.signUp-box');
const btn = document.querySelector('.btn');
const user_name_sign = document.querySelector('.user-name-sign');
const email = document.querySelector('.email');
const password_sign = document.querySelector('.password-sign');
const password_repet_sign =document.querySelector('.password-repet-sign');
const user_name_login = document.querySelector('.user-name-login');
const password_login = document.querySelector('.password-login');
const users_box = document.querySelector('.users-box');
const add_user = document.querySelector('.add-user');
const get_user = document.querySelector('.get-user');
const button_add = document.querySelector('.add');
const log_out_button = document.querySelector('.log-out')
const close_button = document.querySelector('img[alt="close"]');
const LocalStorage = window.localStorage;
const head_name = document.querySelector('header > div:nth-of-type(1) > span');
let name_for_delete = '';
let users = [{name:'حسن مرادی',email:'testemail@gmail.com'},{name:'hamed',email:'testemail@gmail.com'},{name:'sina karimi',email:'testemail@gmail.com'},{name:'محمد میرزایی',email:'testemail@gmail.com'}]


button_add.addEventListener('click',() => {
    const name = document.querySelector('.get-user > div:nth-of-type(1) > input').value;
    const email = document.querySelector('.get-user > div:nth-of-type(2) > input').value;
    const newUser = {name,email};
    
    if(users.length == 5)
    {
        showAlert('امکان اضافه کردن کاربر جدید نیست');

    }else if(name && email)
    {
        switch(true)
        {
            case ( !email.includes('@') || email.indexOf('@') == 0) : showAlert('لطفا ایمیل صحیح را وارد کنید');
            break;
            default : innerUsers(newUser);
        }

    }else
    {
        showAlert('لطفا مشخصات کاربر جدید را وارد کنید');
    }  
})







close_button.addEventListener('click',() => {
    get_user.style = 'display:none';
})





function innerUsers (newUser) {
    if(newUser)
    {
        users.push({name:newUser.name,email:newUser.email});
        users_box.innerHTML = '';

        users.forEach(user => {
            users_box.innerHTML += `<div class='user'>
                                    <span>${user.name}</span>
                                    <span>${user.email}</span>
                                   </div>`
        });
    }
    else
    {
        users.forEach(user => {
            users_box.innerHTML += `<div class='user'>
                                    <span>${user.name}</span>
                                    <span>${user.email}</span>
                                   </div>`
        })
        
    }
}
innerUsers();








login_title.addEventListener('click',function(){

    this.style = 'opacity:1;border-bottom:1px solid';
    sign_tilte.style = 'opacity:0.3;border:none !important';
    sign_box.style = 'display:none';
    login_box.style = 'display:flex';
    btn.setAttribute('value','login');
    btn.textContent = 'ورود';
});




sign_tilte.addEventListener('click',function(){

    this.style = 'opacity:1;border-bottom:1px solid';
    login_title.style = 'opacity:0.3;border:none !important';
    sign_box.style = 'display:flex';
    login_box.style = 'display:none';
    btn.setAttribute('value','join');
    btn.textContent = 'عضویت';
});




btn.addEventListener('click',function(){

    let btnValue = btn.getAttribute('value');
    btnValue === 'join' ? authentication_sign() : authentication_login()
})


const authentication_sign = () => {
    
    const user_name_sign_value = user_name_sign.value;
    const email_value = email.value;
    const password_sign_value = password_sign.value;
    const password_repet_sign_value = password_repet_sign.value;
    const email_text = 'لطفا ایمیل صحیح وارد کنید';
    const password_text = 'لطفا رمز کاربری مشابه وارد کنید';

    if(user_name_sign_value && email_value && password_repet_sign_value && password_sign_value){
        let user_information = {name:user_name_sign_value,email:email_value,password:password_sign_value}    

        switch(true)
        {
            case (email_value.indexOf('@') == 0 || !email_value.includes('@')) : showAlert(email_text);
            break;
            case (password_sign_value !== password_repet_sign_value) : showAlert(password_text)
            break;
            case (password_sign_value.length < 4) : showAlert('رمز کاربری باید حداقل 4 رقم باشد')
            break;
            case (user_name_sign_value.length < 5) : showAlert('نام کاربری باید حداقل 5 کاراکتر باشد')
            break;
            default : signAction(user_information) 

        }
    }
    else
    {
        let text = 'لطفا تمام فیلد ها را پر کنید'
        showAlert(text)
    }
};


const authentication_login = () => {
    let user_name_login_value = user_name_login.value;
    let password_login_value = password_login.value;
    const userInform = LocalStorage.getItem(user_name_login_value)
    const userObj = JSON.parse(LocalStorage.getItem(user_name_login_value));
    const sign_text = 'شما هنوز عضو نشده اید';
    const password_text = 'لطفا رمز کاربری صحیح را وارد کنید';

    if(user_name_login_value && password_login_value)
    {

       switch(true){
        case (userInform === null) : showAlert(sign_text); 
        break;
        case (userObj.password != password_login_value) : showAlert(password_text);
        break;
        default : loginAction(user_name_login_value)
       }

    }
    else
    {
        const text = 'لطقا تمام فیلد ها را پر کنید';
        showAlert(text);
    }
};


const signAction = obj => {
   const userInform =  LocalStorage.getItem(obj.name);
   
   if(userInform)
   {
    const text = 'شما قبلا عضو شده اید';
    showAlert(text);
   }
   else
   {
    LocalStorage.setItem(obj.name,JSON.stringify(obj));
    login_panel.style = 'display:none';
    main_box.style = 'display:block';
    innerName(obj.name);
   }

   
};

const loginAction = name => {
    login_panel.style = 'display:none';
    main_box.style = 'display:block';
    innerName(name)
};


add_user.addEventListener('click' , function(){
    if(users.length < 5)
    {
        get_user.style = 'display:flex';
    }
    else
    {
        showAlert('امکان اضافه کردن کاربر جدید نیست')
    }
});


const innerName = name => {
   head_name.textContent = name;
   name_for_delete = name;

};


const showAlert = text => {

    let alert_box = document.createElement('div');
    let alertImg = document.createElement('img');
    let alertText = document.createElement('span');
    const srcIMG = './assets/img/exclamation-mark.png';

    alertText.textContent = text;
    alertText.classList.add('alert-show')
    alertImg.setAttribute('src',srcIMG);
    alert_box.classList.add('alert-box');
    alert_box.appendChild(alertImg);
    alert_box.appendChild(alertText);
    Body.appendChild(alert_box)

    setTimeout(()=>{
        alert_box.remove()
    },3000)
};



log_out_button.addEventListener('click',() => {
    main_box.style = 'display:none';
    login_panel.style = 'display:flex';
    LocalStorage.removeItem(name_for_delete);
    user_name_sign.value = '';
    password_sign.value = '';
    password_repet_sign.value = '';
    email.value = '';
    user_name_login.value = '';
    password_login.value = '';
})


