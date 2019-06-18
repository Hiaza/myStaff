if(document.getElementById('next_questions')){

    document.getElementById('next_questions').onclick=nextQuestPage;

    document.getElementById('prev_questions').onclick=prevQuestPage;

}
else if(document.getElementById('next_tests')){

    document.getElementById('next_tests').onclick=nextTestPage;

    document.getElementById('prev_tests').onclick=prevTestPage;

}
else if(document.getElementById('next_users')){
    
        document.getElementById('next_users').onclick=nextUserPage;
    
        document.getElementById('prev_users').onclick=prevUserPage;
    
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

function nextOrPrevPage (counter,templateName,entetiesName){
      counter=parseInt(counter);
      const urlParams = new URLSearchParams(window.location.search);
      let page = urlParams.get('page');
      if(page==null) page=0;
      page=parseInt(page)+counter;
      let search = urlParams.get('search');
      if(search==null)search="";
      Promise.all([
          fetch("/templates/"+templateName).then(x => x.text()),
          fetch("/api/v1/"+entetiesName+"?page="+page+"&search="+search).then(x => x.json()),
])
          .then(([templateStr, itemsData]) => {
            
            const dataObject = {
                  all_items: itemsData.items,
                  curPage: itemsData.curPage,
                  pageCount: parseInt(itemsData.pageCount)
            };
              
            const renderedHtmlStr = Mustache.render(templateStr, dataObject);
            return {renderedHtmlStr,itemsData};
          
        })
          .then((result) => {
              let htmlStr = result.renderedHtmlStr;
              let items = result.itemsData;
            
              window.history.replaceState('', '', updateURLParameter(window.location.href, "page", page));
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
              }else {
                  document.getElementById('showPages').style.visibility="hidden";
                  document.getElementById('next_'+entetiesName).style.visibility="hidden";
                  document.getElementById('prev_'+entetiesName).style.visibility="hidden";
              }
          })
          .catch(err => console.error(err));
};



function prevQuestPage(){
    nextOrPrevPage(-1,"quest_list.mst","questions");
};

function nextQuestPage(){
    nextOrPrevPage(1,"quest_list.mst","questions");
};

function prevTestPage(){
    nextOrPrevPage(-1,"test_list.mst","tests");
};

function nextTestPage(){
    nextOrPrevPage(1,"test_list.mst","tests");
};

function prevUserPage(){
    nextOrPrevPage(-1,"users_list.mst","users");
};

function nextUserPage(){
    nextOrPrevPage(1,"users_list.mst","users");
};