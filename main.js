let addboardlist = document.createElement("div");
addboardlist.id = "add-boardlist"

let text = document.createElement("div");
text.id = "text";
text.innerText = "+Add a list..."
addboardlist.appendChild(text)

let br = document.createElement("br")
br.id = "br"

addboardlist.onclick = createBoardLists;

function createBoardLists() {
  if (document.querySelector("#text").innerText === "+Add a list...") {
    addboardlist.removeChild(text)
  }
  let input = document.createElement("input");
  input.className = "input";
  input.onkeydown = () => {
    if (event.keyCode === 13) {
      addBoardLists(input.value);
      deleteBoardList();
    }
  }

  let add = document.createElement("button");
  add.className = "add";
  add.innerText = "Add list";
  add.onclick = function () {
    addBoardLists(input.value);
    deleteBoardList();
  }

  let cancel = document.createElement("button");
  cancel.className = "cancel";
  cancel.innerText = "X";
  cancel.onclick = function () {
    deleteBoardList();
  }; 

  addboardlist.style.height = "70px"
  addboardlist.style.opacity = "1"

  addboardlist.appendChild(input);
  addboardlist.appendChild(br);
  addboardlist.appendChild(add);
  addboardlist.appendChild(cancel);
}
document.querySelector(".board-lists").appendChild(addboardlist);
let id = 0;

function addBoardLists (value) {
  id++;
  if (value === "") { return }

  let boardlist = document.createElement("div");
  boardlist.className = `board-list`;
  boardlist.id = "ID"+id
  
  // TITLE
  let listtitle = document.createElement("div");
  function makeTitle(title){
    let listName = document.createTextNode(title);
    let editList = document.createElement("input")
    editList.id = "inputField"
    editList.setAttribute("type", "text")
    editList.setAttribute("value", "")
    listtitle.className = "list-title"
    listtitle.appendChild(listName)
    listtitle.onclick = editListName
    function editListName() {
      listtitle.removeChild(listName)
      editList.onkeydown = () => {
        if (event.keyCode == 13) {
          listtitle.removeChild(editList)
          makeTitle(editList.value)
        }
      }
      editList.addEventListener('blur', () => {
        if(editList.value === null || editList.value === ""){
          document.querySelector("#inputField").remove()
          listtitle.appendChild(listName)
        }else {
          makeTitle(editList.value)
          listtitle.removeChild(editList)
        }
      })
      listtitle.appendChild(editList);
    }
  }  

  // ADDS ELEMENTS IN BOARD LISTS
  let addElementDiv = document.createElement('div')
  addElementDiv.id = "addElement"

  let textarea = document.createElement("textarea");
  textarea.className = "textArea"

  let add = document.createElement('button')
  add.className = "add";
  add.innerText = "add";
  add.onclick = function () {
    if(textarea.value === "" || textarea.value === null) {
      document.querySelector("#addElement").remove()
      textarea.value = null
      boardlist.appendChild(addcard)
    }
    let card = document.createElement("div")
    card.className = "card";
    card.draggable = true;

    card.addEventListener('dragstart', handleDragStartCard);
    card.addEventListener('dragenter', handleDragEnterCard);
    card.addEventListener('dragover', handleDragOverCard);
    card.addEventListener('dragleave', handleDragLeaveCard);
    card.addEventListener('drop', handleDropCard);
    card.addEventListener('dragend', handleDragEndCard);
    
    document.querySelector("#addElement").remove()
    
    let text = document.createTextNode(textarea.value)
    card.appendChild(text)

    boardlist.appendChild(card)
    boardlist.appendChild(addcard)
    textarea.value = null
  }

  
  let cancel = document.createElement("button");
  cancel.className = "cancel";
  cancel.innerText = "X";
  cancel.onclick = function () {
    document.querySelector("#addElement").remove()
    textarea.value = null
    boardlist.appendChild(addcard)
  }


  let addcard = document.createElement("div");
  addcard.id = `add-card`;
  addcard.innerText = "+ Add another card";
  addcard.onclick = function () {
    boardlist.removeChild(addcard)
    addElementDiv.appendChild(textarea)
    addElementDiv.appendChild(br)
    addElementDiv.appendChild(add)
    addElementDiv.appendChild(cancel)
    boardlist.appendChild(addElementDiv)
  }

  boardlist.draggable = true;

  boardlist.addEventListener('dragstart', handleDragStart);
  boardlist.addEventListener('dragenter', handleDragEnter);
  boardlist.addEventListener('dragover', handleDragOver);
  boardlist.addEventListener('dragleave', handleDragLeave);
  boardlist.addEventListener('drop', handleDrop);
  boardlist.addEventListener('dragend', handleDragEnd);


  boardlist.appendChild(listtitle);
  boardlist.appendChild(addcard);
  boardlist.appendChild(addElementDiv)
  document.querySelector(".board-lists").insertBefore(boardlist, document.querySelector("#add-boardlist"))
  makeTitle(value)
}

function setText(){
  addboardlist.appendChild(text)
  addboardlist.onclick = createBoardLists;
}

function deleteBoardList () {
  document.querySelector("#add-boardlist").removeChild(document.querySelector("#br"));
  document.querySelector("#add-boardlist").removeChild(document.querySelector(".input"));
  document.querySelector("#add-boardlist").removeChild(document.querySelector(".add"));
  document.querySelector("#add-boardlist").removeChild(document.querySelector(".cancel"));
  addboardlist.style.height = "20px"
  addboardlist.onclick = setText;
}
let drag = true;


//DRAG AND DROP FUNCTIONS
let boardList;
let otherBoardList;
let card;
let otherCard;
function handleDragStart(event) {
  boardList = this.id;
}

function handleDragOver(event) {
  if(drag){
    event.dataTransfer.dropEffect = 'move';
    otherBoardList = this.id

    if(getChildNodeIndex(document.getElementById(boardList)) < getChildNodeIndex(document.getElementById(otherBoardList))) {
      document.querySelector(".board-lists").insertBefore(document.getElementById(otherBoardList), document.getElementById(boardList))
    }else if(getChildNodeIndex(document.getElementById(boardList)) > getChildNodeIndex(document.getElementById(otherBoardList))){
      document.querySelector(".board-lists").insertBefore(document.getElementById(boardList), document.getElementById(otherBoardList))
    }
    if (event.preventDefault) {
      event.preventDefault(); 
    }
  }
}

function handleDragEnter(event) {
  if(drag){
    this.style.opacity = "0.3"
  }
}  

function handleDragLeave(event) {
}

function handleDrop(event) {
  event.stopPropagation();
  event.preventDefault();
}

function handleDragEnd(event) {
  document.getElementById(boardList).style.opacity = "1"
}

function getChildNodeIndex(elem) {
     let position = 1;
     while ((elem = elem.previousSibling) != null) {
         if(elem.nodeType != Node.TEXT_NODE)
          position++;
     }
     return position;
}


let originalCard
function handleDragEnterCard(event) {
  
}  

function handleDragLeaveCard(event) {
}

function handleDropCard(event) {

}

function handleDragEndCard(event) {


  drag = true
}
function handleDragStartCard(event) {
  originalCard = this
  
  drag = false
}

function handleDragOverCard(event) {
  let otherCard = this
  if (event.preventDefault) {
    event.preventDefault(); 
  }



  if (getChildNodeIndex(originalCard) > getChildNodeIndex(otherCard)) {
    this.parentNode.insertBefore(originalCard, otherCard)
  } else {
    this.parentNode.insertBefore(otherCard, originalCard)
  }
}