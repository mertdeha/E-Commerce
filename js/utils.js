import elements from "./helpers.js"

const saveToLocalStorage = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart))
}

const getFromLocalStorage = ()=> {
    // cart keyindeki tüm elemanları localstorageden al
    const strData = localStorage.getItem("cart");


    // Eğer strData varsa bunu JSON.parse ile dönüştür ve return et eğer yoksa boş bir dizi return et
    return strData ? JSON.parse(strData) : [];
}

const calculateCartTotal = (cart) => {

    //Cart daki ürünlerin miktar ve fiyatını çarparak toplam sonucu elde et
   return cart.reduce((sum, item)=> sum + item.price * item.quantity, 0)

   //! reduce => Bir dizi üzerindeki tüm elemanları dönerek bir işleme tabi tutar. Bu metot belirtilen işlevi gerçekleştirdikten sonra geriye toplu bir sonuç döndürür

   // ! Bu metot diziAdı.reduce((1,2)=>{},3) şeklinde kullanılır Buradaki 1.değer toplam sonucun aktarılacağı bir değişkendir 2.değerse currentValue'ya karşılık gelir.Buda her dönülen elemanın değerini alır

  // ! reduce'un 3. parametresi bir başlangıç değeri vardır. Bu değer, reduce'un başladığında dizi elemanları dönmek için ilk değerdir. Bu değer varsayılan olarak 0'dır.
}

const updateCartIcon = (cart)=> {

     // Septteki toplam ürün miktarını hesapla
    let totalQuantity= cart.reduce((sum, item) => {
        return sum + item.quantity
    }, 0)

     // Septteki ürün miktarını dinamik şekilde render et
  elements.icon.setAttribute("data-quantity", totalQuantity);
}



export {saveToLocalStorage, getFromLocalStorage, calculateCartTotal, updateCartIcon}