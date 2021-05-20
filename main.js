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
  }else {
    let input = document.createElement("input");
    input.id = "input";
    input.onkeydown = () => {
      if (event.keyCode == 13) {
        addBoardLists(input.value);
        remover();
      }
    }

    let add = document.createElement("button");
    add.id = "add";
    add.innerText = "add";
    add.onclick = function () {
      addBoardLists(input.value);
      remover();
    }

    let cancel = document.createElement("button");
    cancel.id = "cancel";
    cancel.innerText = "X";
    cancel.onclick = function () {
      remover();
    }; 

    addboardlist.appendChild(input);
    addboardlist.appendChild(add);
    addboardlist.appendChild(cancel);
  }
}
document.querySelector(".board-lists").appendChild(addboardlist);

let id = 0;
function addBoardLists (listName) {
  id++;
  
  let boardlist = document.createElement("div");
  boardlist.className = `board-list ${id}`;

  let listtitle = document.createElement("div");
  listtitle.className = "list-title";
  listtitle.innerText = listName;
  
  let editList = document.createElement("input");
  editList.setAttribute("type", "text");
  editList.setAttribute("value", ""); 
  editList.onkeydown = () => {
    if (event.keyCode == 13) {
      listtitle.innerText = editList.value;
    }
  }
  
  editList.style.display = "none";
  listtitle.appendChild(editList);
  
  listtitle.onclick = function(){
    editList.style.display = "block";
  };
  
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

}
function remover () {
  document.querySelector("#add-boardlist").removeChild(document.querySelector("#input"));
  document.querySelector("#add-boardlist").removeChild(document.querySelector("#add"));
  document.querySelector("#add-boardlist").removeChild(document.querySelector("#cancel"));
  addboardlist.onclick = createBoardLists;
}