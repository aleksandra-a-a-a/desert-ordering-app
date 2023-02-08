import { menuArray } from "/data.js"

const checkoutBox = document.getElementById('checkout-box')
const totalPriceBox = document.getElementById('total-price-box')
const payModal = document.getElementById('pay-modal')
const completeOrderBtn = document.getElementById('complete-order')
const payBtn = document.getElementById('pay-btn')
const completeOrderBox = document.getElementById('order-btn-box')
const thankYouModal = document.getElementById('thank-you-modal')
const closePaymentBtn = document.getElementById('close-payment-btn')
const closeAllBtn = document.getElementById('close-all-btn')
const payForm = document.getElementById('pay-form')

let purchasedItems = []

// Event listeners 

document.addEventListener('click', function(e) {
        if (e.target.dataset.add) {
            handleAddClick(e.target.dataset.add)
        } else if (e.target.dataset.remove) {
            handleRemoveClick(e.target.dataset.remove)
        } 
})

completeOrderBtn.addEventListener("click", handleOrderClick)
payBtn.addEventListener("click", handlePayClick)

closePaymentBtn.addEventListener("click", function(){
        payModal.style.display = "none"
})

closeAllBtn.addEventListener("click", handleCloseAllClick) 
payForm.addEventListener('submit', handleForm);

// Functions 
function handleForm(e){ 
        event.preventDefault();
}

function handleAddClick(itemId){
    const purchaseObject = menuArray.filter(function(item) {
        return item.id.toString() === itemId
    })[0]
        purchasedItems.push(purchaseObject)
        checkoutBox.style.display = "block"
        completeOrderBtn.style.display = "block"
        renderCheckout()
        renderMenu()
        renderTotalPrice()  
}

function handleRemoveClick(removedItemId){
    const existingItem = purchasedItems.filter(function(it) {
        return it.item === removedItemId
    })[0]
    const itemToRemove = purchasedItems.indexOf(existingItem)
    purchasedItems.splice(itemToRemove, 1)
        renderCheckout()
        renderTotalPrice()
        renderMenu()
}

function handleCloseAllClick() {
        thankYouModal.style.display ='none'
        clear()
}
    
function handleOrderClick(){
        payModal.style.display = "block"
}

function handlePayClick(){
        if ((document.getElementById('form-input-name').value) && (document.getElementById('form-input-card').value) && (document.getElementById('form-input-cvv').value)){
        payModal.style.display = "none"
        clear()  
    }   thankYouModal.style.display = "flex"
        
}

function getMenuHtml(){
        let menuHTML = ''
        menuArray.forEach(function(item) {
        menuHTML += `
            <div class='container' id='item-container'>
                 <div class='item'>
                     <h2 id='item-name'> <span id='emoji'>${item.emoji}</span>${item.name}</h2>
                     <p id='desc'>${item.ingredients}</p>
                     <p id='price'>${item.price}$</p>
                 </div>
                 <div class='button'>
                    <button id='add-btn' data-add=${item.id}> + </button>
                 </div>
            </div>
        `
    })
    return menuHTML 
}

function getCheckoutHtml() {
    let orderHtml = ''
    purchasedItems.forEach(function(it){
        orderHtml += `
            <div class="order-box" id="order-box">
                     <div class='ordered-items' id='ordered-items'>
                         <p>${it.name}<span class='remove' data-remove=${it.id}>remove</span></p>
                    </div>
                     <div id='price'>
                         <p>${it.price}$</p>
                    </div>
                    </div>`
           })
    checkoutBox.style.display = "block"
    completeOrderBox.style.display = "flex"
    return orderHtml
}       

function renderCheckout() {
    checkoutBox.innerHTML = `<h3>Your order: </h3>` + getCheckoutHtml()
}

function getTotal() {
    let totalBoxHtml = ''
    let priceSum = 0
    purchasedItems.forEach(function(item){
        priceSum += item.price
    })
    return totalBoxHtml = `
                     <div class='total' id='total'>
                         <h3>Total price: </h3>
                         <p id='total-price'>${priceSum}$</p>
                     </div>    
    `
}

function renderTotalPrice() {
    totalPriceBox.innerHTML = getTotal()
}

function clear() {
        checkoutBox.innerHTML = ''
        totalPriceBox.innerHTML = ''
        completeOrderBox.style.display = "none"
        completeOrderBtn.style.display = "none"
}

function renderMenu() {
    document.getElementById('menu').innerHTML = getMenuHtml()
}
renderMenu()