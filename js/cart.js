
const Cart = {
    getShopProduct: function getShopProduct() {
        const shop = JSON.parse(localStorage.getItem('nom'));
        return shop;
    },

    displayShopProduct: function displayShopProduct(shop) {
        const emptyShop = document.getElementById('panier');
        const displayProduct = document.getElementById('list__container');
    
        if (shop.length == 0) {
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
                displayProduct.appendChild(removeProduct);
    
                /* Ajout des valeurs */

                productContainer.setAttribute("class", "product__container");
                displayimg.setAttribute("src", shop[i].img);
                displayName.innerHTML = shop[i].name;
                displayPrice.innerHTML = shop[i].price / 100 + '€';
                displayLense.innerHTML = shop[i].lense;
                displayQuantity.innerHTML = "x" + shop[i].quantity;
                removeProduct.innerHTML = "Retirer le produit";
                removeProduct.setAttribute("id", "removeProduct" + [i]);
                removeProduct.setAttribute("class", "removeProduct")

                Cart.removeProduct(shop, i);
            }
        }
    },

    clearShop: function clearShop(){
        localStorage.clear();
        document.location.reload();
    },

    removeProduct: function removeProduct(shop, i){
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
            total += shop[i].price * shop[i].quantity / 100;
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

    checkForm: function checkForm() {

        let errorForm = '0';

        /* Regex pour la vérification */
        const checkSpecialCharacter = /[§!@#$%^&*().?":{}|<>]/;
        const checkNumber = /[0-9]+/;
        const checkMail = /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/;

        /* Erreur à afficher */
        let errorFirstName = document.getElementById('errorFirstName');
        let errorLastName= document.getElementById('errorLastName');
        let errorAdress = document.getElementById('errorAdress');
        let errorCity = document.getElementById('errorCity');
        let errorMail = document.getElementById('errorMail');

        /* Vérification du prénom */
        let checkFirstName = document.getElementById('prénom');
        if (checkFirstName.value == "" || checkSpecialCharacter.test(checkFirstName.value) == true || checkNumber.test(checkFirstName.value) == true ){
            errorFirstName.innerHTML = "le champ remplit n'est pas valide";
            errorFirstName.style.color = 'red';
            errorForm = '1';
        } else {
            errorFirstName.innerHTML = "";
        }

        /* Vérification du nom */
        let checkLastName = document.getElementById('nom');
        if (checkLastName.value == "" || checkSpecialCharacter.test(checkLastName.value) == true || checkNumber.test(checkLastName.value) == true){
            errorLastName.innerHTML = "le champ remplit n'est pas valide";
            errorLastName.style.color = 'red';
            errorForm = '1';
        } else {
            errorLastName.innerHTML = "";
        }

        /* Vérification de l'adresse */
        let checkAdress = document.getElementById('adresse');
        if (checkAdress.value == "" || checkSpecialCharacter.test(checkAdress.value) == true){
            errorAdress.innerHTML = "le champ remplit n'est pas valide";
            errorAdress.style.color = 'red';
            errorForm = '1';
        } else {
            errorAdress.innerHTML = "";
        }

        /* Vérifiaction de la Ville */
        let checkCity = document.getElementById('ville');
        if (checkCity.value == "" || checkSpecialCharacter.test(checkCity.value) == true || checkNumber.test(checkCity.value) == true){
            errorCity.innerHTML = "le champ remplit n'est pas valide";
            errorCity.style.color = 'red';
            errorForm = '1';
        } else {
            errorCity.innerHTML = "";
        }

        /* Vérification de l'email */
        let mailValue = document.getElementById('e-mail');
        if (mailValue.value == "" || checkMail.test(mailValue.value) == false) {
            errorMail.innerHTML = "le champ remplit n'est pas valide";
            errorMail.style.color = 'red';
            errorForm = '1';
        } else {
            errorMail.innerHTML = "";
        }
        return errorForm;
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

    
    onOrder: async function onOrder(shop, total, resultForm){
        if (resultForm == "1"){
            alert("le formulaire n'est pas valide ");
        } else {
            const contact = Cart.createContact();
            Cart.sendForm(contact, shop, total);
        } 
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
        Cart.displayShopProduct(shop);

        /* Fonction qui vide le panier */
        const clearShop = document.getElementById('clearShop');
        clearShop.addEventListener("click", function() {
            Cart.clearShop();
        })

        const total = Cart.totalShop(shop);
        Cart.displayTotalShop(total);

        /* Fonction qui vérifie les inputs du formulaire */
        const checkForm = document.getElementById('form');
        checkForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const resultForm = await Cart.checkForm();
            Cart.onOrder(shop, total, resultForm);
        })
    },

}

Cart.init();


