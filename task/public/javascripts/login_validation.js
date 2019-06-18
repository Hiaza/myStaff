if (document.getElementById('inputLogin')) {
    document.getElementById('inputLogin').oninput = login_validation;
}

async function loginIsCorrect(login){
    if(login.length < 1)
        return {status:false,error:"login length must be more then 4 and less then 20"};
    if(/^[a-zA-Z1-9]+$/.test(login) === false)
        return {status:false,error:"only latin letters and numbers"};
    if(parseInt(login.substr(0, 1)))
        return {status:false,error:"login has to begin with letter"};
    if(login.length < 4 || login.length > 20)
        return {status:false,error:"login length must be more then 4 and less then 20"};
    
    let loginIsUsedJson = await fetch("/api/v1/register/"+login);
    let loginIsUsed = await loginIsUsedJson.json();
    
    if(!loginIsUsed.flag){
        return { status:false,error:"login exists"};
    }
    return {status:true};
}

async function login_validation() {
    let login = document.getElementById('inputLogin').value;

    let res = await loginIsCorrect(login);
    if(res.status) document.getElementById('err').innerHTML = "";
    else document.getElementById('err').innerHTML = res.error;
};
