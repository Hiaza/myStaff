const urlParams = new URLSearchParams(window.location.search);
let page = urlParams.get('page');
if(page==null) page=0;
page=parseInt(page);

let search = urlParams.get('search');
if(search==null)search="";

Promise.all([
    fetch("/templates/test_list.mst").then(x => x.text()),
    fetch("/api/v1/tests?page="+page+"&search="+search).then(x => x.json()),
])
    .then(([templateStr, itemsData]) => {
        const dataObject = {all_items: itemsData.items,"err": itemsData.error};
        const renderedHtmlStr = Mustache.render(templateStr, dataObject);
        
        return {renderedHtmlStr,itemsData};
    })
    .then((result) => {
        let htmlStr = result.renderedHtmlStr;
        let items = result.itemsData;

        if(parseInt(items.pageCount)==items.curPage+1||items.pageCount==1){
            document.getElementById('next_tests').disabled = true;
        }else document.getElementById('next_tests').disabled = false;
        if(items.curPage==0){
            document.getElementById('prev_tests').disabled = true;
        }else document.getElementById('prev_tests').disabled = false;
        
        const appEl = document.getElementById('app');
        appEl.innerHTML = htmlStr;
        document.getElementById('myInput').value = search;
    
        if(items.pageCount>1){
            document.getElementById('cur').innerHTML = items.curPage+1;
            document.getElementById('all').innerHTML = items.pageCount; 
            document.getElementById('next_tests').style.visibility="visible";
            document.getElementById('prev_tests').style.visibility="visible"; 
            document.getElementById('showPages').style.visibility="visible";   
        }else {
            document.getElementById('showPages').style.visibility="hidden";
            document.getElementById('next_tests').style.visibility="hidden";
            document.getElementById('prev_tests').style.visibility="hidden";
        }
    })
.catch(err => console.error(err));