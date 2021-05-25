
let addboardlist = document.createElement("div");
addboardlist.id = "add-boardlist"

let text = document.createElement("div");
text.id = "text";
text.innerText = "+Add a list..."
addboardlist.appendChild(text)

addboardlist.onclick = createBoardLists;
function createBoardLists() {
  if (document.querySelector("#text").innerHTML === "+Add a list...") {
    addboardlist.removeChild(text)
  }
  let input = document.createElement("input");
  input.id = "input";
  input.onkeydown = () => {
    if (event.keyCode === 13) {
      addBoardLists(input.value);
      deleteBoardList();
    }
  }

  let add = document.createElement("button");
  add.id = "add";
  add.innerText = "add";
  add.onclick = function () {
    addBoardLists(input.value);
    deleteBoardList();
  }

  let cancel = document.createElement("button");
  cancel.id = "cancel";
  cancel.innerText = "X";
  cancel.onclick = function () {
    deleteBoardList();
  }; 



  addboardlist.appendChild(input);
  addboardlist.appendChild(add);
  addboardlist.appendChild(cancel);
}
document.querySelector(".board-lists").appendChild(addboardlist);

function addBoardLists (value) {
  if (value === "") { return; }
  
  
  
  let boardlist = document.createElement("div");
  boardlist.className = `board-list`;
  
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
      id++;
    }
  }  

  // ADDS ELEMENTS IN BOARD LISTS
  let addElementDiv = document.createElement('div')
  addElementDiv.id = "addElement"

  let textarea = document.createElement("textarea");
  textarea.className = "textArea"

  let add = document.createElement('button')
  add.id = "add";
  add.innerText = "add";
  add.onclick = function () {
    if(textarea.value === "" || textarea.value === null) {
      document.querySelector("#addElement").remove()
      textarea.value = null
      boardlist.appendChild(addcard)
    }
    let card = document.createElement("div")
    card.className = "card";

    document.querySelector("#addElement").remove()
    
    let text = document.createTextNode(textarea.value)
    card.appendChild(text)

    boardlist.appendChild(card)
    boardlist.appendChild(addcard)
    textarea.value = null
  }

  
  let cancel = document.createElement("button");
  cancel.id = "cancel";
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
    addElementDiv.appendChild(add)
    addElementDiv.appendChild(cancel)

    boardlist.appendChild(addElementDiv)
  }

  boardlist.draggable = true;

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
  document.querySelector("#add-boardlist").removeChild(document.querySelector("#input"));
  document.querySelector("#add-boardlist").removeChild(document.querySelector("#add"));
  document.querySelector("#add-boardlist").removeChild(document.querySelector("#cancel"));
  addboardlist.onclick = setText;
}



document.addEventListener('change', (event) => {

  let dragSrcEl = null;

  function handleDragStart(e) {
    this.style.opacity = '1';

    dragSrcEl = this;

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
  }

  function handleDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }

    e.dataTransfer.dropEffect = 'move';

    return false;
  }

  function handleDragEnter(e) {
    this.classList.add('over');
  }

  function handleDragLeave(e) {
    this.classList.remove('over');
  }

  function handleDrop(e) {
    if (e.stopPropagation) {
      e.stopPropagation(); // stops the browser from redirecting.
    }

    if (dragSrcEl != this) {
      dragSrcEl.innerHTML = this.innerHTML;
      this.innerHTML = e.dataTransfer.getData('text/html');
    }

    return false;
  }

  function handleDragEnd(e) {
    this.style.opacity = '1';
  }


  let boardlist = document.querySelectorAll(`.board-list`);
  console.log(boardlist);
  boardlist.forEach(function(item) {
      item.addEventListener('dragstart', handleDragStart, false);
      item.addEventListener('dragenter', handleDragEnter, false);
      item.addEventListener('dragover', handleDragOver, false);
      item.addEventListener('dragleave', handleDragLeave, false);
      item.addEventListener('drop', handleDrop, false);
      item.addEventListener('dragend', handleDragEnd, false);
  });
});