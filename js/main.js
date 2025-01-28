import { addToCart, renderCartsItems,  displayCartTotal } from "./cart.js";
import { fetchProducts, renderProducts, } from "./products.js";
import { getFromLocalStorage, saveToLocalStorage, calculateCartTotal, updateCartIcon } from "./utils.js";

const menuIcon = document.querySelector('#menu-icon')
const menu = document.querySelector(".navbar")

menuIcon.addEventListener("click", () => {
    menu.classList.toggle("open-menu")
});

//  window.location.pathname yazarak hangi sayfada olduğumuzu tespit edebiliriz
document.addEventListener('DOMContentLoaded', async () => {

    // Localstoragedan kart verisini al
    let cart = getFromLocalStorage()

    if (window.location.pathname.includes('/cart.html')) {

        renderCartsItems();
        
        displayCartTotal();

    } else {
        const products = await fetchProducts()
        console.log(products);
        //  Api'dan gelen verileri ekrana render et
        renderProducts(products, (e) => {

            addToCart(e, products)

        })
    }

    // Sepet ikonu güncelle
    updateCartIcon(cart)
})
