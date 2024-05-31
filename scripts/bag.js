const CONVENIENCE_FEES= 99;
let bagItemObjects;
onLoad();

function onLoad(){
    loadBagItemsObjects();
    displayBagItems();
    displayBagSummary();
}

function displayBagSummary(){
    let bagSummaryElement = document.querySelector('.bag-summary');
    let  total_item =bagItemObjects.length;
    let  total_MRP =0;
    let total_discount =0;
   
    bagItemObjects.forEach(bagItem=> {
        total_MRP+=bagItem.price.orginal_price;
        total_discount+=(bagItem.price.orginal_price- bagItem.price.current_price)
    })
    
    let final_amount= total_MRP-total_discount+ CONVENIENCE_FEES;
    if(final_amount === -99){
        final_amount=0;
    }
    else{
        final_amount=final_amount;
    }

    bagSummaryElement.innerHTML= 
    `<div class="bag-details-container">
    <div class="price-header">PRICE DETAILS (${total_item} Items) </div>
    <div class="price-item">
      <span class="price-item-tag">Total MRP</span>
      <span class="price-item-value"> ₹${total_MRP}</span>
    </div>
    <div class="price-item">
      <span class="price-item-tag">Discount on MRP</span>
      <span class="price-item-value priceDetail-base-discount">- ₹${total_discount}</span>
    </div>
    <div class="price-item">
      <span class="price-item-tag">Convenience Fee</span>
      <span class="price-item-value"> ₹ 99</span>
    </div>
    <hr>
    <div class="price-footer">
      <span class="price-item-tag">Total Amount</span>
      <span class="price-item-value"> ₹ ${final_amount}</span>
    </div>
  </div>
  <button class="btn-place-order">
    <div class="css-xjhrni">PLACE ORDER</div>
  </button>
    `;

}

function loadBagItemsObjects(){

    bagItemObjects= bagItems.map(itemId => {
        for(let i=0;i<items.length;i++){
           if(itemId == items[i].id) {
              return items[i];
           }
        }
    });
    console.log(bagItemObjects);

}

function displayBagItems(){
    let ContainerElement =document.querySelector('.bag-items-container');
    let innerHtml='';
    bagItemObjects.forEach(bagItem => {
        innerHtml += generateItemHTML(bagItem);
    });
     ContainerElement.innerHTML =innerHtml;
}

function removeFromBag(itemId){
 bagItems=  bagItems.filter(bagItemId => bagItemId !== itemId);
 localStorage.setItem('bagItems',JSON.stringify(bagItems));

 loadBagItemsObjects();
 displayBagIcon();
 displayBagItems();
displayBagSummary();
}


function generateItemHTML(item){
 return `<div class="bag-item-container">
         <div class="item-left-part">
           <img class="bag-item-img" src="../${item.item_image}">
         </div>
         <div class="item-right-part">
           <div class="company">${item.company_name}</div>
           <div class="item-name">${item.item_name}</div>
           <div class="price-container">
             <span class="current-price">Rs ${item.price.current_price}</span>
             <span class="original-price">Rs ${item.price.orginal_price}</span>
             <span class="discount-percentage">(${item.price.discount}% OFF)</span>
           </div>
           <div class="return-period">
             <span class="return-period-days">${item.return_period} days</span> return available
           </div>
           <div class="delivery-details">
             Delivery by
             <span class="delivery-details-days">${item.delivery_date}</span>
           </div>
         </div>

         <div class="remove-from-cart" onclick="removeFromBag(${item.id})">X</div>
       </div>`;
}