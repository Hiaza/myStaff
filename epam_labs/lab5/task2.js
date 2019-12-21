function concat(a,b, ...others){
    let resultStr = "";
    resultStr+=a;
    resultStr+=b;
    for(let val of others){
        resultStr+=val;
    }
    return resultStr
}

console.log(concat("I ", "am ","Grood"," uuuuuuuu", "!"));