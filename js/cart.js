
const Cart = {
    getShopProduct: function getShopProduct() {
        const shop = JSON.parse(localStorage.getItem('nom'));
    
        const emptyShop = document.getElementById('panier');
        const displayProduct = document.getElementById('list__container');
    
        if (shop == null) {
            emptyShop.innerHTML = "Votre panier est vide";
        } else {
    
            for (i = 0; i < shop.length; i++) {
    
                /* Ajout de la structure HTML */
    
                const productContainer = document.createElement('div');
                const displayimg = document.createElement('img');
                const displayName = document.createElement('p');
                const displayPrice = document.createElement('p');
                const displayLense = document.createElement('p');
                const displayQuantity = document.createElement('p');
                const removeProduct = document.createElement('span');
    
                /* Ajout des éléments sur la page  */
    
                displayProduct.appendChild(productContainer);
                productContainer.appendChild(displayimg);
                productContainer.appendChild(displayName);
                productContainer.appendChild(displayPrice);
                productContainer.appendChild(displayLense);
                productContainer.appendChild(displayQuantity)
                productContainer.appendChild(removeProduct);
    
                /* Ajout des valeurs */

                productContainer.setAttribute("class", "product__container");
                displayimg.setAttribute("src", shop[i].img);
                displayName.innerHTML = shop[i].name;
                displayPrice.innerHTML = shop[i].price / 100 + '€';
                displayLense.innerHTML = shop[i].lense;
                displayQuantity.innerHTML = "x" + shop[i].quantity;
                removeProduct.innerHTML = "X";
                removeProduct.setAttribute("id", "removeProduct" + [i]);            
            }
        }
        return shop;
    },

    clearShop: function clearShop(shop){
        const clearShop = document.getElementById('clearShop');
        clearShop.addEventListener("click", function() {
            localStorage.clear();
            document.location.reload();
        })
    },

    removeProduct: function removeProduct(i){
        const removeProduct = document.getElementById("removeProduct1");
        const shop = JSON.parse(localStorage.getItem('nom'));
        removeProduct.addEventListener("click", function() {
            shop.splice(i, 1);
            localStorage.clear();
            localStorage.setItem("nom",JSON.stringify(shop));
            location.reload();
        })  
    },

    init: function init() {
        const shop = Cart.getShopProduct();
        Cart.clearShop(shop);
        Cart.removeProduct(shop);
    },
    
    
}

Cart.init();


