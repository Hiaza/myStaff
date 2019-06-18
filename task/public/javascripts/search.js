if(document.getElementById('search_questions')){
    document.getElementById('search_questions').onclick=findQuest;        
}else if(document.getElementById('search_tests')){
    document.getElementById('search_tests').onclick=findTest;
}else if(document.getElementById('search_users')){
    document.getElementById('search_users').onclick=findUsers;
}

function updateURLParameter(url, param, paramVal){
    var newAdditionalURL = "";
    var tempArray = url.split("?");
    var baseURL = tempArray[0];
    var additionalURL = tempArray[1];
    var temp = "";
    if (additionalURL) {
        tempArray = additionalURL.split("&");
        for (var i=0; i<tempArray.length; i++){
            if(tempArray[i].split('=')[0] != param){
                newAdditionalURL += temp + tempArray[i];
                temp = "&";
            }
        }
    }
    var rows_txt = temp + "" + param + "=" + paramVal;
    return baseURL + "?" + newAdditionalURL + rows_txt;
};

function searchL(templateName,entetiesName){
    let search = document.getElementById('myInput').value;
    if(search==null)search="";
    Promise.all([
        fetch("/templates/"+templateName).then(x => x.text()),
        fetch("/api/v1/"+entetiesName+"?search="+search).then(x => x.json())
    ])
        .then(([templateStr, itemsData]) => {
            let showNumOfRes;
            if(search.length>0){
                showNumOfRes = "show"
            }
            const dataObject = {
                all_items: itemsData.items,
                curPage: itemsData.curPage,
                pageCount: parseInt(itemsData.pageCount),
                err: itemsData.error,
                numOfRes: itemsData.numOfRes,
                isSearch: showNumOfRes
            };
            const renderedHtmlStr = Mustache.render(templateStr, dataObject);
            return {renderedHtmlStr,itemsData};
        })
        .then((result) => {
            window.history.replaceState('', '', updateURLParameter(window.location.href, "search", search));
            window.history.replaceState('', '', updateURLParameter(window.location.href, "page", 0));
            let htmlStr = result.renderedHtmlStr;
            let items = result.itemsData;
            const appEl = document.getElementById('app');
            appEl.innerHTML = htmlStr;
              if(parseInt(items.pageCount)==items.curPage+1){
                document.getElementById('next_'+entetiesName).disabled = true;
            }else document.getElementById('next_'+entetiesName).disabled = false;
            if(items.curPage==0){
                document.getElementById('prev_'+entetiesName).disabled = true;
            }else document.getElementById('prev_'+entetiesName).disabled = false;

            if(items.pageCount>1){
                document.getElementById('cur').innerHTML = items.curPage+1;
                document.getElementById('all').innerHTML = items.pageCount;
                document.getElementById('next_'+entetiesName).style.visibility="visible";
                document.getElementById('prev_'+entetiesName).style.visibility="visible"; 
                document.getElementById('showPages').style.visibility="visible";   
            }else {
                document.getElementById('showPages').style.visibility="hidden";
                document.getElementById('next_'+entetiesName).style.visibility="hidden";
                document.getElementById('prev_'+entetiesName).style.visibility="hidden";
            }
        })
        .catch(err => console.error(err));
};

function findQuest(){
    searchL("quest_list.mst","questions");
};
function findTest(){
    searchL("test_list.mst","tests");
};
function findUsers(){
    searchL("users_list.mst","users");
};