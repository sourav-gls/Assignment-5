const cardContainer = document.getElementById("card-container");
const totalCount = document.getElementById("total-count");
const openBtn = document.getElementById("open-btn");
const closedBtn = document.getElementById("closed-btn");
const allBtn = document.getElementById("all-btn");
const loadingDiv = document.getElementById("loading-spinner");
const search = document.getElementById("input-search");
const noMatch = document.getElementById("no-match");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const modalStatusDiv = document.getElementById("modal-status");
const modalCreate = document.getElementById("modal-create");
const modalAuthor = document.getElementById("modal-author");
const modalAssignee = document.getElementById("modal-assignee");
const modalBadgeDiv = document.getElementById("modal-badge");
const modalPriorityDiv = document.getElementById("modal-priority");
const cardDetailsModal = document.getElementById("card-details-modal");



function loadAllCard(){
   allBtn.classList.add("btn-primary") ;
   closedBtn.classList.remove("btn-primary");
   openBtn.classList.remove("btn-primary");
   
   addLoadingSpinner()

    fetch(" https://phi-lab-server.vercel.app/api/v1/lab/issues ")
    .then(res=>res.json())
    .then(data=>{
      removeLoadingSpinner()
       displayCard(data.data);
    })
}

loadAllCard()


function loadOpenCard(){
   let cards = [];
   openBtn.classList.add("btn-primary");
   closedBtn.classList.remove("btn-primary");
   allBtn.classList.remove("btn-primary") ;
   addLoadingSpinner()
   
   fetch(" https://phi-lab-server.vercel.app/api/v1/lab/issues ")
    .then(res=>res.json())
    .then(data=>{
       cards = data.data;
       const openCard = cards.filter(card=> card.status ==="open")
       removeLoadingSpinner()
       displayCard(openCard)
    })

}


function loadClosedCard(){
   let cards = [];
   closedBtn.classList.add("btn-primary");
   openBtn.classList.remove("btn-primary");
   allBtn.classList.remove("btn-primary") ;
   addLoadingSpinner()
   
   fetch(" https://phi-lab-server.vercel.app/api/v1/lab/issues ")
    .then(res=>res.json())
    .then(data=>{
       cards = data.data;
       const closedCard = cards.filter(card=> card.status ==="closed")
       removeLoadingSpinner()
       displayCard(closedCard)
    })

}



function displayCard(items){
    cardContainer.innerHTML = "" ;
   for (let item of items){
    const div = document.createElement("div");
    div.className = `bg-white rounded-md  p-4 shadow-md ${item.status === "open"? 'border-t-4 border-green-500':'border-t-4 border-purple-500'} `;
    div.innerHTML = `
    <div class="flex justify-between ">
                <div>
                <img src="${item.status === 'open'? './assets - Copy/Open-Status.png' : './assets - Copy/Closed- Status .png'}";alt="">
                </div>
                <div>${priority(item.priority)}</div>
             </div>
             <div class="pt-3 space-y-2 ">
                <h5 class="font-bold text-[16px] min-h-[42px]" onclick= "loadModal(${item.id})" >${item.title}</h5>
                <p class="text-[#64748B] text-[12px] line-clamp-2">${item.description}</p>
                <div class=" space-x-1 mt-2">
                     ${levels(item.labels)}
                </div>
             </div>
             <hr class="border-gray-200 mt-4 mb-4">
             <div class="text-[#64748B] space-y-2 text-[12px]">
                <p>#${item.id} by ${item.author}</p>
                <p>${item.createdAt}</p>
                      
             </div>  `
    cardContainer.append(div);
   }
   totalCount.innerText = cardContainer.children.length;
   if(totalCount.innerText=="0"){
      showNoMatch()
   
   }
   else{
      hideNoMatch()
   }
}






function priority(id){
   const priorityBtn = document.createElement("div")
   if(id==="high"){
      return `<span class ="badge text-red-500 bg-red-100 rounded-2xl text-[12px]">HIGH<span>`
   }
   else if(id==="medium"){
      return `<span class ="badge text-yellow-500 bg-yellow-100 rounded-2xl text-[12px]">MEDIUM<span>`
   }
   else{
      return `<span class ="badge bg-gray-100 text-[#64748B] rounded-2xl text-[12px]">LOW<span>`
   }
}



function levels(arr){
   let highlight = "";
for(let i=0 ; i<arr.length ; i++){
   highlight += `<span class ="badge bg-lime-100 text-[15px] rounded-full">${arr[i].toUpperCase()}</span>`;
}
   return highlight ;
}

function addLoadingSpinner(){
    loadingDiv.classList.remove("hidden");
    cardContainer.classList.add("hidden");
}

function removeLoadingSpinner(){
    loadingDiv.classList.add("hidden");
    cardContainer.classList.remove("hidden");
}

function showNoMatch(){
   noMatch.classList.remove("hidden");
}

function hideNoMatch(){
   noMatch.classList.add("hidden");
}


function loadSearch(){

   search.addEventListener("input",function(){
    const searchValue = search.value;
    fetch(` https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue} `)
    .then(res=>res.json())
    .then(data=>{
       openBtn.classList.remove("btn-primary");
       closedBtn.classList.remove("btn-primary");
       allBtn.classList.remove("btn-primary") ;
      displayCard(data.data)
      
})
})
}

loadSearch()


function loadModal(id){
   
  cardDetailsModal.showModal()

   fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
   .then(res=>res.json())
   .then(data=>{
   
    let obj = data.data;

      modalTitle.innerText = obj.title ;
      modalDescription.innerText = obj.description ;
      modalCreate.innerText = obj.createdAt ;
      modalBadgeDiv.innerHTML = levels(obj.labels) ;
      modalPriorityDiv.innerHTML = priority(obj.priority);
      modalStatusDiv.innerHTML = isOpen(obj.status);
      modalAuthor.innerText = obj.author ;
      modalAssignee.innerText = obj.assignee==="" ? "No Name" : obj.assignee ;


   })

}

function isOpen(id){
if(id==="open"){
   return `<span class="badge bg-green-400 text-white rounded-full">Opened</span>`
}
else{
   return `<span class="badge bg-purple-400 text-white rounded-full">Closed</span>`
}
}


