let id = 0;
document.querySelector("#add-boardlist").addEventListener('click', function(){
  id++;

  





  let boardlist = document.createElement("div");
  boardlist.className = `board-list ${id}`;

  let listtitle = document.createElement("div");
  listtitle.className = "list-title";
  listtitle.innerText = "List title";
  
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
  
});