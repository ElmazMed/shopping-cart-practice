let cartIcon = document.getElementsByClassName('cart')[0]
let cartContainer = document.getElementsByClassName('cart-container')[0]

cartIcon.addEventListener('click', (e) => {
    e.preventDefault()
    cartContainer.classList.toggle('d-none')
})




let addToCart = document.getElementsByClassName('add-to-cart')

for(let i = 0; i < addToCart.length; i++) {
    let addCartBtn = addToCart[i]
    addCartBtn.addEventListener('click', addItem)
}


function addItem(e) {
    let addCartBtn = e.target
    let productDetails = addCartBtn.parentElement.parentElement.parentElement
    let cartProductTitle = productDetails.getElementsByClassName('product-title')[0].innerText
    let productImage = productDetails.getElementsByClassName('product-img')[0].src
    let productPrice = productDetails.getElementsByClassName('price')[0].innerText

    itemsAdded(cartProductTitle, productImage, productPrice)
    updateCartTotal()
}


function itemsAdded(cartProductTitle, productImage, productPrice) {
    let cartRow = document.createElement('div')
    cartRow.classList.add('cart-product')
    let addToCartContainer = document.getElementsByClassName('cart-container')[0]
    let productTitle = document.getElementsByClassName('cart-item-title')

    for(let i = 0; i < productTitle.length; i++) {
        
        if(productTitle[i].innerText == cartProductTitle) {
            
            alert('Item already in the cart')
            return
        }
    }
    let adeddProducts = `
        <svg class="remove-btn" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m7 7l10 10M7 17L17 7"/></svg>
        <div class="cart-items-info cart-item-img">
            <img src="${productImage}" alt="">
            <div class="d-flex items-flex-start direction-clmn gap-2">
                <h5 class="cart-item-title">${cartProductTitle}</h5>
                <div class="quantity-price d-flex justify-center gap-2">
                    <span class="cart-price">${productPrice}</span>
                    <input type="number" name="quantity" value="1" class="quantity">
                </div>
            </div>
        </div>
    `
    cartRow.innerHTML = adeddProducts;
    addToCartContainer.append(cartRow)
    
    let removeBtn = document.getElementsByClassName('remove-btn');

    for(let i = 0; i < removeBtn.length; i++) {
        let btn = removeBtn[i]

        btn.addEventListener('click', function removeItem() {
            btn.parentElement.remove()

            updateCartTotal()
        })
    }
    let inputQuantity = document.getElementsByClassName('quantity')

    for(let i = 0; i < inputQuantity.length; i++) {

    let quantityInput = inputQuantity[i]
    quantityInput.addEventListener('change', quantityChange)

}

}


function quantityChange(e) {
    let quantityInput = e.target
    if(isNaN(quantityInput.value) || quantityInput.value <= 0) {
        quantityInput.value = 1
    }
    updateCartTotal()
}

function updateCartTotal() {
    let cartContainer = document.getElementsByClassName('cart-container')[0]
    let cartProducts = cartContainer.getElementsByClassName('cart-product')
    let total = 0

    for(let i = 0; i < cartProducts.length; i++) {
        let cartProduct = cartProducts[i]

        let cartPrice = cartProduct.getElementsByClassName('cart-price')[0]
        let cartQuantity = cartProduct.getElementsByClassName('quantity')[0]

        let price = parseFloat(cartPrice.innerText.replace('$', ''))
        let quantity = cartQuantity.value

        total += (price * quantity)
    }

    document.getElementsByClassName('total')[0].innerText = '$ ' + total.toFixed(2)
}