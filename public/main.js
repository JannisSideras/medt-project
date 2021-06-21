const boardLists = document.createElement("div");
boardLists.className = "board-lists"
document.querySelector(".body").appendChild(boardLists);

let addboardlist = document.createElement("div");
addboardlist.id = "add-boardlist"

let text = document.createElement("div");
text.id = "text";
text.innerText = "+Add a list..."
addboardlist.appendChild(text)

let br = document.createElement("br")
br.id = "br"

let active = true
addboardlist.onclick = createBoardLists;
function createBoardLists() {
  addboardlist.removeChild(text)

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
boardLists.appendChild(addboardlist);

let elements = []
let target = "";
let id = 0;
let cardID = 0;
let drag = true
function addBoardLists (value) {
  id++;
  if (value === "") { return }

  let boardlist = document.createElement("div");
  boardlist.className = `board-list`;
  boardlist.id = "boardListID"+id
  
  // TITLE
  let listtitle = document.createElement("div");
  function makeTitle(title){
    event.preventDefault()
    let listName = document.createTextNode(title);
    let editList = document.createElement("input")
    editList.id = "inputField"
    editList.setAttribute("type", "text")
    editList.setAttribute("value", "")
    listtitle.className = "list-title"
    listtitle.id = "titleID"+id;
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
    cardID++
    if(textarea.value === "" || textarea.value === null) {
      document.querySelector("#addElement").remove()
      textarea.value = null
      boardlist.appendChild(addcard)
    }
    let card = document.createElement("div")
    card.className = "card";
    card.id = "cardID"+cardID
    card.draggable = true;
    card.onclick = cardClick;
    function cardClick() {
      card.removeChild(text)
      let input = document.createElement("input");
      input.id = "inputField"
      card.appendChild(input)
      card.onkeydown = () => {
        if (event.keyCode == 13) {
          let text = document.createTextNode(input.value)
          card.removeChild(input)
          card.appendChild(text)
          card.onclick = cardClick
        }
      }
      input.addEventListener('blur', () => {
        if(input.value === null || input.value === ""){
          card.removeChild(input)
          card.onclick = cardClick
        }else {
          let text = document.createTextNode(input.value)
          card.removeChild(input)
          card.appendChild(text)
          card.onclick = cardClick
        }
      })
    }

    document.querySelector("#addElement").remove()
    
    let text = document.createTextNode(textarea.value)
    card.appendChild(text)

    boardlist.appendChild(card)
    boardlist.appendChild(addcard)
    textarea.value = null
  }

  document.getElementById("dropzone").ondragover = function (event) {
    if(target !== null){
      document.getElementById(target).remove();
      target = null
    }
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
  
  new Sortable(boardlist, {
    group: 'sharedList', // set both lists to same group
    animation: 150, 
    draggable: ".card",
    onStart: function (event) {
      drag = false
      event.item.style.opacity = "0"
    },
    onEnd: function (event) {
      drag = true
      event.item.style.opacity = "1"
    },
    onAdd: function () {
      boardlist.removeChild(addcard)
      boardlist.appendChild(addcard)
    },
  });

  new Sortable(boardLists, {
    animation: 150, 
    draggable: ".board-list",
    onStart: function (event) {
      drag = false
      event.item.style.opacity = "0"
    },
    onEnd: function (event) {
      event.item.style.opacity = "1"
      drag = true
    },
    onAdd: function (event) {
      boardlist.removeChild(addcard)
      boardlist.appendChild(addcard)
    },
  });

  boardlist.ondragstart = function (event) {
    target = event.target.id
    document.getElementById("dropzone").style.display = "block"
  }
  boardlist.ondragend = function () {
    document.getElementById("dropzone").style.display = "none"
  }

  boardlist.ondragover = function () {
    boardlist.removeChild(addcard)
    boardlist.appendChild(addcard)
  }
  boardlist.appendChild(listtitle);
  boardlist.appendChild(addcard);
  boardLists.insertBefore(boardlist, document.querySelector("#add-boardlist"))
  makeTitle(value)
}

function setText(){
  active = true
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

// window.onerror = function () {
//   console.clear()
//   return true;
// }
