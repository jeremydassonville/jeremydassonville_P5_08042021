
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
                
                Cart.removeProduct(i);
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
        const shop = JSON.parse(localStorage.getItem('nom'));
        const removeProduct = document.getElementById("removeProduct" + i);
            removeProduct.addEventListener("click", function() {
                shop.splice( i , 1);
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

        let targetTotal = document.getElementById('totalShop');
        const displayTotal = document.createElement('p');

            targetTotal.appendChild(displayTotal);  

            displayTotal.innerHTML = 'Total commande : ' + total + ' €';
    },

    /* -----------------FORMULAIRE---------------- */

    checkForm: function checkForm(shop, total) {

        let checkForm = document.getElementById('form');

        checkForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let errorForm = '0';

            /* Regex pour la vérification */
            const checkLetter = /[a-zA-Z-\s]/;
            const checkNumber = /[0-9]/;
            const checkMail = /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/;

            /* Erreur à afficher */
            let errorFirstName = document.getElementById('errorFirstName');
            let errorLastName= document.getElementById('errorLastName');
            let errorAdress = document.getElementById('errorAdress');
            let errorCity = document.getElementById('errorCity');
            let errorMail = document.getElementById('errorMail');

            /* Vérification du prénom */
            let checkFirstName = document.getElementById('prénom');
            if (checkFirstName.value == "" || checkLetter.test(checkFirstName.value) == false){
                errorFirstName.innerHTML = "le champ remplit n'est pas valide";
                errorFirstName.style.color = 'red';
                errorForm = '1';
            }

            /* Vérification du nom */
            let checkLastName = document.getElementById('nom');
            if (checkLastName.value == "" || checkLetter.test(checkLastName.value) == false){
                errorLastName.innerHTML = "le champ remplit n'est pas valide";
                errorLastName.style.color = 'red';
                errorForm = '1';
            }

            /* Vérification de l'adresse */
            let checkAdress = document.getElementById('adresse');
            if (checkAdress.value == "" || checkLetter.test(checkAdress.value) == false || checkNumber.test(checkAdress.value) == false){
                errorAdress.innerHTML = "le champ remplit n'est pas valide";
                errorAdress.style.color = 'red';
                errorForm = '1';
            }

            /* Vérifiaction de la Ville */
            let checkCity = document.getElementById('ville');
            if (checkCity.value == "" || checkLetter.test(checkCity.value) == false){
                errorCity.innerHTML = "le champ remplit n'est pas valide";
                errorCity.style.color = 'red';
                errorForm = '1';
            }

            /* Vérification de l'email */
            let mailValue = document.getElementById('e-mail');
            if (mailValue.value == "" || checkMail.test(mailValue.value) == false) {
                errorMail.innerHTML = "le champ remplit n'est pas valide";
                errorMail.style.color = 'red';
                errorForm = '1';
            }

            if ( errorForm == "1" ){
                
                alert("le formulaire n'est pas valide ")

            } else {
                Cart.onOrder(shop, total);
            }
        })
    },

    createContact: function createContact() {
    
    /* Création de l'object contact à envoyer au serveur */ 

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
        const contact = Cart.createContact();
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
        Cart.clearShop(shop);
        const total = Cart.totalShop(shop);
        Cart.displayTotalShop(total);
        Cart.checkForm(shop, total);
        
    },

}

Cart.init();


