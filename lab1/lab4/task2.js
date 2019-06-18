function addRow(){
    let pos = document.getElementById("main-table").rows.length;
    let tableRef = document.getElementById('main-table').getElementsByTagName('tbody')[0];
    let newRow = tableRef.insertRow(tableRef.rows.length);
    let counter = document.getElementById("counter");
    counter.value = parseInt(counter.value) + 1;  
    console.log(counter.value);
    let newCell  = newRow.insertCell(0);
    let para = document.createElement("a");
    let node = document.createTextNode("Видалити");
    para.id = "r" + counter.value;
    para.href = "#";
    para.addEventListener( 'click', function(){
        deleteRow(para.id); 
        return false;
    })

    para.appendChild(node);
    newCell.appendChild(para);

    newCell = newRow.insertCell(1);
    newCell.id = "n" + counter.value;
    let newText = document.createTextNode('KP-'+ counter.value);
    newCell.appendChild(newText);
    newCell.contentEditable ="true";
    newCell.addEventListener( 'input', function(){

        let divID = "p"+newCell.id.slice(1);
        let nameToEdit = document.getElementById(divID).childNodes[1];
        let EditedName = document.getElementById("n"+newCell.id.slice(1));
        nameToEdit.textContent = EditedName.textContent; 
    
    })

    newCell = newRow.insertCell(2);
    newCell.id = "v" + counter.value;
    newText = document.createTextNode("350");
    newCell.appendChild(newText);
    newCell.contentEditable ="true";
    newCell.addEventListener( 'input', function(){
        let divID = "p"+newCell.id.slice(1);
        let valToEdit = document.getElementById(divID).firstChild.firstChild;
        let EditedVal = document.getElementById("v"+newCell.id.slice(1)).textContent;
        if(Number(EditedVal)) valToEdit.textContent = EditedVal;
        else valToEdit.textContent = EditedVal;
        correctDivs(document.getElementById('diagram'),document.getElementById("main-table").rows.length);
    })
    addBox(pos,'KP-'+ counter.value);
}

function deleteRow(clicked_id) {
    let index = document.getElementById(clicked_id).parentNode.parentNode.rowIndex;
    console.log(index);
    document.getElementById("main-table").deleteRow(parseInt(index));
    let diag = document.getElementById("diagram");
    diag.removeChild(document.getElementById("p"+clicked_id.slice(1)))
    correctDivs(diag,document.getElementById("main-table").rows.length);
} 

function addBox(pos,name){
    let diagRef = document.getElementById('diagram');
    let bigDiv = document.createElement("div");
    let smalldiv = document.createElement("div");
    bigDiv.id = "p" + document.getElementById("counter").value;

    bigDiv.style.minWidth = "" + parseInt(diagRef.style.minWidth)/(parseInt(pos)+1)+"px";
    smalldiv.style.minHeight = "350px";
    smalldiv.style.backgroundColor = getRandomColor();
    smalldiv.style.display = "flex";
    smalldiv.style.justifyContent = "center"; 
    smalldiv.style.alignItems = "center";
    let hiddenPara = document.createElement("p");
    let hiddenText = document.createTextNode(350);
    hiddenPara.style.visibility = "hidden";
    let para = document.createElement("p");
    let node = document.createTextNode(name);
    smalldiv.addEventListener( 'mouseover', function(){
        hiddenPara.style.visibility = "visible";
       
    },true)
    smalldiv.addEventListener("mouseout", function(){
        hiddenPara.style.visibility = "hidden";
    }, true)
    hiddenPara.appendChild(hiddenText);
    smalldiv.appendChild(hiddenPara);
    para.appendChild(node);
    bigDiv.style.display = "flex"; 
    bigDiv.style.flexDirection ="column";
    bigDiv.appendChild(smalldiv);
    bigDiv.appendChild(para);
    diagRef.appendChild(bigDiv);
    correctDivs(diagRef,pos);
}

function correctDivs(mainDiv,pos){
    let x = mainDiv.children;
    let max = getMax(document.getElementById('main-table'));
    for(let i = 0; i<mainDiv.children.length;i++){ 
        x[i].style.minWidth = ""+parseInt(mainDiv.style.minWidth)/(parseInt(pos)+1)+"px";
        x[i].style.maxWidth = ""+parseInt(mainDiv.style.minWidth)/(parseInt(pos)+1)+"px";
        let curVal = document.getElementById('main-table').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[i].cells[2].textContent;
        if(!Number(curVal)) curVal = 0;
        console.log(mainDiv.children[i].children[0]);
        console.log(curVal);
        let newVal = parseInt(curVal)*350/max;
        console.log(newVal);
        mainDiv.children[i].children[0].style.minHeight = ""+newVal+"px";          
        mainDiv.children[i].children[0].style.maxHeight = ""+newVal+"px";          
    }
}

function getMax(table) {
    var e, i = 0, m = Number.MIN_VALUE;
    let rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('TR');

	while (e = rows[i++]) {
        let curVal = e.cells[2].textContent; 
        if(!Number(curVal)) curVal = 0; 
        m = Math.max (m, parseInt(curVal));
    }
    return m;
}
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }