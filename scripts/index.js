let bagItems =[];

onLoad();

function onLoad(){
    let bagItemsStr = localStorage.getItem('bagItems');
    bagItems = bagItemsStr ? JSON.parse(bagItemsStr): [] ;
    displayItemsOnHomePage();

    displayBagIcon();
}




function addToBag(itemID){
bagItems.push(itemID);
localStorage.setItem('bagItems',JSON.stringify(bagItems))
displayBagIcon();

}

function displayBagIcon(){
  let bagItemCountElement = document.querySelector('.bag-item-count');
  if(bagItems.length>0){
    bagItemCountElement.style.visibility ='visible';

  bagItemCountElement.innerText= bagItems.length;
   
  }
  else{
    bagItemCountElement.style.visibility ='hidden';
  }
}



function displayItemsOnHomePage(){

let itemsContainerElement = document.querySelector('.items-container');

if(! itemsContainerElement ){
 return;
}

    let innerHtml='';
items.forEach(item =>{
   innerHtml+= `
   <div class="item-container">
                   <img class="item-image" src="${item.item_image}" alt="item image">
                   <div class="rating">
                   ${item.rating.stars} ⭐ | ${item.rating.reviews}
                   </div>
                   <div class="company-name">
                       ${item.company_name}
                   </div>
                   <div class="item-name">
                       ${item.item_name}
                   </div>
                   <div class="price">
                       <span class="current-price"> Rs ${item.price.current_price}</span>
                       <span class="original-price">Rs   ${item.price.orginal_price} </span>
                       <span class="discount">( ${item.price.discount}% OFF)</span>
                   </div>
                   <button class="button-add-bag" onclick="addToBag(${item.id}) ">Add to Bag</button>
               </div>
   `
   itemsContainerElement.innerHTML=innerHtml;

});

}



