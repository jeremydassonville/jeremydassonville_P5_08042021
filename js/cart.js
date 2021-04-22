
function getShopProduct() {
    const test = JSON.parse(localStorage.getItem('nom'))
    console.log(test)

    const emptyShop = document.getElementById('panier');
    const displayProduct = document.getElementById('list__container')
    if (test == null) {
        emptyShop.innerHTML = "Votre panier est vide";
    } else {

        for (i = 0; i < test.length; i++) {

            /* Ajout de la structure HTML */

            const productContainer = document.createElement('div');
            const displayimg = document.createElement('img');
            const displayName = document.createElement('p');
            const displayPrice = document.createElement('p');
            const displayLense = document.createElement('p');
            const displayQuantity = document.createElement('p');

            /* Ajout des éléments sur la page  */

            displayProduct.appendChild(productContainer);
            productContainer.appendChild(displayimg);
            productContainer.appendChild(displayName);
            productContainer.appendChild(displayPrice);
            productContainer.appendChild(displayLense);
            productContainer.appendChild(displayQuantity);


            /* Ajout des valeurs */
            productContainer.setAttribute("class", "product__container");
            displayimg.setAttribute("src", test[i].img);
            displayimg.setAttribute("class", "w-25")
            displayName.innerHTML = test[i].name;
            displayPrice.innerHTML = test[i].price / 100 + '€';
            displayLense.innerHTML = test[i].lense
            displayQuantity.innerHTML = "x" + test[i].quantity
        }
    }  
}

getShopProduct()


