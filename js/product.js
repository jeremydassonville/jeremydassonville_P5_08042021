const Product = {

  /* Fonction qui récupère l'id du produit dans l'url de la page  */

  getIdUrl: function getIdUrl () {
    const urlSearchParams = new URLSearchParams(location.search);
    const id = urlSearchParams.get('id');
    return id;  
  },

  /* Fonction qui récupère les informations du produit avec l'api */

  getData: function getData (id) {
    return fetch('http://localhost:3000/api/cameras/' + id)
      .then(function (response) {
        return response.json()
    })
      .then(function (dataProduct){
        return dataProduct        
    })
    .catch(function() {
      alert('le site a rencontré une erreur, merci de réessayer ulterieurement.')
    })
  },


  /* Fonction qui affiche les informations du produit sur la page product.html */

  displayMyCamera: function displayMyCamera(myCamera) {

    /* Création des variables pour la page HTML */

    const productImage1 = document.getElementById('productImage')
    const productName2 = document.getElementById('productName')
    const productDescription2 = document.getElementById('productDescription')
    const productPrice3 = document.getElementById('productPrice')

    /* Ajout des valeurs */

    productImage1.setAttribute("src", myCamera.imageUrl)
    productName2.innerHTML = myCamera.name
    productDescription2.innerHTML = myCamera.description
    productPrice3.innerHTML = myCamera.price /100 + '€'

    /* Gestion des lenses du Formulaire */

    for (i = 0; i < myCamera.lenses.length; i++) {
      
      const displayLenses = document.getElementById('lenses')
      const productLenses = document.createElement('option')

      displayLenses.appendChild(productLenses)

      productLenses.innerHTML += myCamera.lenses[i]

    }
  },

  /* Fonction qui créer l'objet pour le localStorage */

  createShopObject: function createShopObject(myCamera) {

    const shopObject = {
      name: myCamera.name,
      img: myCamera.imageUrl,
      id: myCamera._id,
      price: myCamera.price,
      lense: document.getElementById('lenses').value,
      quantity: document.getElementById('quantity').value, 
    }  
    location.reload();
    Product.stockObject(shopObject)
  },

  /* Fonction qui initialise le localStorage et qui "push" l'objet créer précédemment */

  stockObject: function stockObject(shopObject) {
    let currentCart = JSON.parse(localStorage.getItem('nom'))
    if(!currentCart){
      currentCart = [];
    }
    currentCart.push(shopObject);
    localStorage.setItem('nom',JSON.stringify(currentCart));
  },

  /* Fonction qui affiche le nombre d'articles dans le panier */
  
  shopIndex: function shopIndex() {
    const shop = localStorage.getItem('nom');
    const shopIndex = JSON.parse(shop)
    const displayIndex = document.getElementById('indexShop');
    const i = document.createElement('p');
    displayIndex.appendChild(i);
  
    i.innerHTML = shopIndex.length;
  },
  

  init: async function init () {   
    const myId = Product.getIdUrl()
    const myData = await Product.getData(myId)
    Product.displayMyCamera(myData)

    /* Fonction qui au clique de l'utilisateurs va créer l'objet pour le localStorage */
    const addToShop = document.getElementById('addToShop')
    addToShop.addEventListener("click", function(e) {
      Product.createShopObject(myData);
    });

    Product.shopIndex();
  },
}


Product.init();
