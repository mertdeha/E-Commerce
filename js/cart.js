import { getFromLocalStorage, saveToLocalStorage, calculateCartTotal, updateCartIcon } from "./utils.js";
import elements from "./helpers.js";

let cart = getFromLocalStorage()

//! Sepete ekleme yapan fonksiyon
const addToCart = (e, products) => {

  const productId = parseInt(e.target.dataset.id); // tıklanan elemanın id sine eriş (dataset metodu **)

  const product = products.find((product) => product.id === productId)

  if (product) {
    // Eğer ürün varsa cart dizisimi kontrol 
    const exitingItem = cart.find((item) => item.id === productId)

    if (exitingItem) {
      exitingItem.quantity++;
    } else {
      const cartItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      }
      // cart dizisine cartItem objesini ekle

      cart.push(cartItem);


    }
    saveToLocalStorage(cart)

    // Sepete ekle butonunun içeriğini güncelle
    e.target.textContent= 'Added'

    // 2sn sonra içeriği eski haline çevir
    setTimeout(()=> {
      e.target.textContent= "Add to cart"
    }, 2000)

    //Sepet ikonu güncelle
    updateCartIcon(cart)
  }
}

//! Sepetten ürün kaldıracak fonksiton
const removeFromCart = (e) => {
  const productId = parseInt(e.target.dataset.id); //tıklanan elemanın id ye eriş
  
  //id si bilinen elemanı sepette bul
  cart = cart.filter((item) => item.id != productId)


  //LocalStorage i güncelle
  saveToLocalStorage(cart)


  // Arayüzü tekrardan render et
  renderCartsItems()

  //Sepetteki toplamı render et
  displayCartTotal()

  //Sepet ikonu güncelle
  updateCartIcon(cart)

}

//! Sepetteki ürün miktarını güncelleyen fonksiyon

const onQuantityChange = (e) => {
 const productId = +e.target.dataset.id;
 const newQuantity = +e.target.value;

 if(newQuantity>0) {
 const cartItem= cart.find((item) => item.id === productId)

  // Bulunan elemanın miktarını güncelle
  cartItem.quantity= newQuantity

  // localStoragea güncelle
  saveToLocalStorage(cart)

  displayCartTotal()

  updateCartIcon(cart)
 } 
}


//! Sepetteki ürünleri render edecek fonksiyon
const renderCartsItems = () => {
  elements.cartItemsList.innerHTML = cart.map((item) => `
   <div class="cart-item">
      <img
          src="${item.image}"
                  alt=""
                />
  
                <div class="cart-item-info">
                  <h2 class="cart-item-title">${item.title}</h2>
                  <input type="number" min="1" class="cart-item-quantity" data-id='${item.id}' value="${item.quantity}" />
               </div>
  
                <h2 class="cart-item-price">$${item.price}</h2>
  
                <button class="remove-from-cart" data-id= '${item.id}'>Remove</button>
              </div>`).join("")

              // remove from carts işlemi
             const removeButtons = document.querySelectorAll(".remove-from-cart")

            //  removeButtons içerisindeki her bir butona ayrı ayrı eriş
      for( let i=0; i<removeButtons.length; i++) {
        const removeButton = removeButtons[i]

        // Bu butonlara tıklanma gerçekleştiğinde bir fonk. tetikle
        
        removeButton.addEventListener("click", removeFromCart)
    
        }

       const quantityInputs = document.querySelectorAll('.cart-item-quantity')

      //  quantityInputs içerisindeki herbir inputa ayrı ayrı eriş

      for(let i=0; i<quantityInputs.length; i++){
       const quantityInput = quantityInputs[i]
       quantityInput.addEventListener("change", onQuantityChange)
      }
}   

//! sepetteki toplam ürün miktarını render eden fonksiyon
const displayCartTotal = () => {

  // calculateCartTotal ile sepetteki toplam fiyatı hesapla
  const total = calculateCartTotal(cart)

  // Toplam değeri ekranda render et
  elements.cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}


export { addToCart, renderCartsItems, displayCartTotal, onQuantityChange, removeFromCart }