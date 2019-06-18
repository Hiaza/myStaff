if (document.getElementById('signIn')) {
    document.getElementById('signIn').onclick = signIn;
}

function updateURLParameter(url, param, paramVal) {
    var newAdditionalURL = "";
    var tempArray = url.split("?");
    var baseURL = tempArray[0];
    var additionalURL = tempArray[1];
    var temp = "";
    if (additionalURL) {
        tempArray = additionalURL.split("&");
        for (var i = 0; i < tempArray.length; i++) {
            if (tempArray[i].split('=')[0] != param) {
                newAdditionalURL += temp + tempArray[i];
                temp = "&";
            }
        }
    }
    var rows_txt = temp + "" + param + "=" + paramVal;
    return baseURL + "?" + newAdditionalURL + rows_txt;
};

async function signIn() {
    try{
        let loginTemp = await fetch("/templates/registration.mst");
        let templateStr = await loginTemp.text();
        const renderedHtmlStr = Mustache.render(templateStr,{});
        const appEl = document.getElementById('app');
        appEl.innerHTML = renderedHtmlStr;
    }    
    catch (err){console.log(err);};
};