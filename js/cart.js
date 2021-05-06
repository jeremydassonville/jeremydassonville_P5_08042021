
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
        const removeProduct = document.getElementById("removeProduct0");
        const shop = JSON.parse(localStorage.getItem('nom'));
        removeProduct.addEventListener("click", function() {
            shop.splice(i, 1);
            localStorage.clear();
            localStorage.setItem("nom",JSON.stringify(shop));
            location.reload();
        })  
    },

    totalShop: function totalShop(shop){

        let total = 0;

        for (i = 0; i < shop.length; i++){
            total += shop[i].price / 100;
        }   
        return total;     
    },

    displayTotalShop: function displayTotalShop(total) {
        console.log(total)

        let targetTotal = document.getElementById('totalShop');
        const displayTotal = document.createElement('p');

            targetTotal.appendChild(displayTotal);  

            displayTotal.innerHTML = 'Total commande : ' + total + ' €';
    },

    /* -----------------FORMULAIRE---------------- */

    checkForm: function checkForm() {
    
        let prenom = document.getElementById("prénom").value;
        let nom = document.getElementById("nom").value;
        let adresse = document.getElementById("adresse").value;
        let ville = document.getElementById("ville").value;
        let email = document.getElementById("e-mail").value;

       
        let contact = {
                firstName: prenom,
                lastName: nom,
                address: adresse,
                city: ville,
                email: email,
            };
            return contact;
    },

    
    onOrder: function onOrder(shop, total){
        const contact = Cart.checkForm();
        Cart.sendForm(contact, shop, total);
        
    },

    sendForm: function sendForm(contact, products, total) {
        let commande = {
            contact,
            products: products.map(function(product) {
                return product.id;
            }),
        };
        fetch( 'http://localhost:3000/api/cameras/order', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(commande)
        }).then(function(response) {
            return response.json()
        }).then(function(data) {
            let id = data.orderId;
            let name = data.contact.firstName;
            document.location.href='commande.html?id=' + id + '&name=' + name + '&total=' + total;
        })
        
    },

    init:function init() {
        const shop = Cart.getShopProduct();
        Cart.removeProduct();
        Cart.clearShop();
        const total = Cart.totalShop(shop);
        Cart.displayTotalShop(total);
        const confirmPurchase = document.getElementById('confirmPurchase');
        confirmPurchase.addEventListener("click", function(e) {
            e.preventDefault();
            Cart.onOrder(shop, total);
        })
        console.log(shop)
    },

}

Cart.init();


