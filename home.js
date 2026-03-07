const cardContainer = document.getElementById("card-container");


function loadAllCard(){
    fetch(" https://phi-lab-server.vercel.app/api/v1/lab/issues ")
    .then(res=>res.json())
    .then(data=>{
       displayCard(data.data);
    })
}

function displayCard(items){
    cardContainer.innerHTML = "" ;
   for (let item of items){
    console.log(item);
    const div = document.createElement("div");
    div.className = "bg-white rounded-md border border-red-500 p-4 shadow-md";
    div.innerHTML = `
    <div class="flex justify-between">
                <img src="./assets - Copy/Open-Status.png";alt="">
                <div class="badge badge-soft badge-secondary">High</div>
             </div>
             <div class="pt-3 space-y- ">
                <h5 class="font-bold text-[14px] line-clamp-2">${item.title}</h5>
                <p class="text-[#64748B] text-[12px] line-clamp-2">${item.description}</p>
                <div class="flex gap-1 mt-2">
                     <div class="badge badge-soft badge-secondary">High</div>
                     <div class="badge badge-soft badge-secondary">High</div>
                </div>
             </div>
             <hr class="border-gray-200 mt-4 mb-4">
             <div class="text-[#64748B] space-y-2 text-[12px]">
                <p>#${item.id} by ${item.author}</p>
                <p>1/15/2024</p>
                      
             </div>  `
    cardContainer.append(div);
   }
}
loadAllCard()