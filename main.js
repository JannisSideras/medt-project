let id = 0;

document.querySelector("add-boardlist").addEventListener('click', function(){
  id++;
  let boardlist = document.createElement("div")
  boardlist.className = "board-list " + id;
  let listtitle = document.createElement("div")
  listtitle.className = "list-title";
  listtitle.innerText = "List title";
  let addcard = document.createElement("div");
  addcard.className = "add-card";
  addcard.innerText = "+ Add another card";

  boardlist.appendChild(listtitle);
  boardlist.appendChild(addcard);

  document.querySelector(".board-lists").appendChild(boardlist);
  
})