let newBoard = document.getElementById("add-Todo");

let text = document.createTextNode("Create Board")
newBoard.appendChild(text)

let inputButtonWrapper = document.createElement("div");
newBoard.onclick = createBoard

function createBoard () {
    newBoard.removeChild(text)

    inputButtonWrapper.id = "buttonWrapper"

    let input = document.createElement("input");
    input.className = "input";
    input.onkeydown = () => {
        if (event.keyCode === 13) {
        addBoard(input.value);
        deleteInputButtonWrapper();
        }
    }

    let add = document.createElement("button");
    add.className = "add";
    add.innerText = "Add list";
    add.onclick = function () {
        addBoard(input.value);
        newBoard.style.height = "4.6rem"
        deleteWrapper()
    }

    let cancel = document.createElement("button");
    cancel.className = "cancel";
    cancel.innerText = "X";
    cancel.onclick = function () {
        deleteWrapper()
    }; 

    inputButtonWrapper.appendChild(input)
    inputButtonWrapper.appendChild(add)
    inputButtonWrapper.appendChild(cancel)
    newBoard.style.height = "4.6rem"
    newBoard.appendChild(inputButtonWrapper)
}

let id = 0;
function addBoard(title) {
    if (title === "") { return }
    id++;

    let a = document.createElement("a")
    a.href = "./index.html"

    let board = document.createElement("div")
    board.className = "board"
    board.id = "boardID"+id;

    board.innerHTML = title

    a.appendChild(board)

    document.getElementById("boards").appendChild(a)
}

function setText() {
    newBoard.appendChild(text)
    newBoard.onclick = createBoard
}
function deleteWrapper () {
    document.getElementById("buttonWrapper").innerHTML = ""
    newBoard.removeChild(document.getElementById("buttonWrapper"))
    newBoard.style.height = "1.2rem"
    newBoard.onclick = setText
}