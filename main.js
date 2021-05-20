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

let id = 0;
function addBoardLists (value) {
  if(value === ""){ return; }
  id++;
  
  let boardlist = document.createElement("div");
  boardlist.className = `board-list ${id}`;
  
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
          makeTitle(editList.value)
          listtitle.removeChild(editList)
        }
      }
      listtitle.appendChild(editList);
    }
  }  

  let addcard = document.createElement("div");
  addcard.className = `add-card`;
  addcard.innerText = "+ Add another card";
  addcard.addEventListener('click', function(){
    let card = document.createElement("div");
    card.className = "card";
    card.innerText = "edit";
    boardlist.insertBefore(card, addcard)
  });
  
  boardlist.draggable = true;
  boardlist.appendChild(listtitle);
  boardlist.appendChild(addcard);
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