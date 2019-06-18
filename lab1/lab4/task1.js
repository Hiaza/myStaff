function changePic() {
    let widht = document.getElementById("pic-width").value
    let height = document.getElementById("pic-height").value
    let border = document.getElementById("border-width").value
    let colour = document.getElementById("border-colour").value
    let alt = document.getElementById("pic-alt").value

    resetBorders();

    let flag = true;

    isValidNumInput(flag,"pic-width","label-pic-width")
    isValidNumInput(flag,"pic-height","label-pic-width")
    isValidNumInput(flag,"border-width","label-pic-height")
    isValidColorInput(flag,"border-colour","label-border-colour")
    isValidTextInput(flag,"pic-alt","label-pic-alt")

    if(flag){
        document.getElementById("pic").width = widht;
        document.getElementById("pic").height = height;
        document.getElementById("pic").style.borderWidth = border+"px";
        document.getElementById("pic").style.borderColor = colour;   
        document.getElementById("pic").alt = alt;  
    } 
}

function validAlt(alt){
    if(alt.length==0 || alt.match(/[^a-z]/i)) return false
    else return true
}

function resetBorders(){
    let inv = "form-control is-invalid";
    let danger = "col-sm-2 col-form-label text-danger"
    document.getElementById("border-colour").className = inv;
    document.getElementById("border-width").className = inv;
    document.getElementById("pic-height").className = inv;
    document.getElementById("pic-width").className = inv;
    document.getElementById("pic-alt").className = inv;

    document.getElementById("label-border-colour").className = danger;
    document.getElementById("label-border-width").className = danger; 
    document.getElementById("label-pic-height").className = danger;
    document.getElementById("label-pic-width").className = danger;
    document.getElementById("label-pic-alt").className = danger;
}

function isValidNumInput(flag,element,label){
    if(checkValues(element.value)){
        element.className = "form-control is-valid";
        label.className = "col-sm-2 col-form-label text-success";
        return;
    }
    flag = false;
}

function isValidColorInput(flag,element,label){
    if(validTextColour(element.value)){
        element.className = "form-control is-valid";
        label.className = "col-sm-2 col-form-label text-success";    
        return;
    }
    flag = false;
}

function isValidTextInput(flag,element,label){
    if(validAlt(element.value)){
        element.className = "form-control is-valid";
        label.className = "col-sm-2 col-form-label text-success";    
        return;
    }
    flag = false;
}

function validTextColour(stringToTest) {
    //Alter the following conditions according to your need.
    if (stringToTest === "") { return false; }
    if (stringToTest === "inherit") { return false; }
    if (stringToTest === "transparent") { return false; }

    var image = document.createElement("img");
    image.style.color = "rgb(0, 0, 0)";
    image.style.color = stringToTest;
    if (image.style.color !== "rgb(0, 0, 0)") { return true; }
    image.style.color = "rgb(255, 255, 255)";
    image.style.color = stringToTest;
    return image.style.color !== "rgb(255, 255, 255)";
}

function checkValues(num){
    let result = Number(num)
    return result && result>0;
}

