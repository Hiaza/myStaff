if (document.getElementById('inputPassword1')) {
    document.getElementById('inputPassword1').oninput = password_validation;
}
if (document.getElementById('inputPassword2')) {
    document.getElementById('inputPassword2').oninput = password_validation;
}
   
function passIsCorrect(textPass,textPass2){
    
    var r=/[^A-Z-a-z-0-9]/g; 
    if (textPass.length<6){
    return {status:false,error:"password is too short"};
    }
    if(r.test(textPass)){
        return {status:false,error:"only latin letters and numbers"};
    }
    if (textPass.length>20){
        return {status:false,error:"password is too long"};
    }
    if(textPass != textPass2){
        return {status:false,error:"password1 not equal to password2"};
    }
    return {status:true,error:" "};
}

function password_validation() {
    let pass1 = document.getElementById('inputPassword1').value;
    let pass2 = document.getElementById('inputPassword2').value;
    let res = passIsCorrect(pass1,pass2);
    res.status ? document.getElementById('err_pass').innerHTML = ""
               : document.getElementById('err_pass').innerHTML = res.error;
};