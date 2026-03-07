const cardContainer = document.getElementById("card-container");
const totalCount = document.getElementById("total-count");
const openBtn = document.getElementById("open-btn");
const closedBtn = document.getElementById("closed-btn");
const allBtn = document.getElementById("all-btn");



function loadAllCard(){
   allBtn.classList.add("btn-primary") ;
   closedBtn.classList.remove("btn-primary");
   openBtn.classList.remove("btn-primary");
   
   

    fetch(" https://phi-lab-server.vercel.app/api/v1/lab/issues ")
    .then(res=>res.json())
    .then(data=>{
       displayCard(data.data);
    })
}

loadAllCard()


function loadOpenCard(){
   let cards = [];
   openBtn.classList.add("btn-primary");
   closedBtn.classList.remove("btn-primary");
   allBtn.classList.remove("btn-primary") ;
   
   fetch(" https://phi-lab-server.vercel.app/api/v1/lab/issues ")
    .then(res=>res.json())
    .then(data=>{
       cards = data.data;
       const openCard = cards.filter(card=> card.status ==="open")
       displayCard(openCard)
    })

}

function loadClosedCard(){
   let cards = [];
   closedBtn.classList.add("btn-primary");
   openBtn.classList.remove("btn-primary");
   allBtn.classList.remove("btn-primary") ;
   
   fetch(" https://phi-lab-server.vercel.app/api/v1/lab/issues ")
    .then(res=>res.json())
    .then(data=>{
       cards = data.data;
       const closedCard = cards.filter(card=> card.status ==="closed")
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
                <h5 class="font-bold text-[16px] min-h-[42px] ">${item.title}</h5>
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
}






function priority(id){
   const priorityBtn = document.createElement("div")
   if(id==="high"){
      return `<span class ="badge text-red-500 bg-red-100 rounded-2xl  text-[12px]">HIGH<span>`
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
   highlight += `<span class ="badge bg-lime-100">${arr[i]}</span>`;
}
   return highlight ;
}