/* Lien avec l'API */

const Product = {

  getIdUrl: function getIdUrl () {
    const urlSearchParams = new URLSearchParams(location.search);
    const id = urlSearchParams.get('id');
    return id;  
  },

  getData: function getData (id) {
    return fetch('http://localhost:3000/api/cameras' + '/' + id)
      .then(function (response) {
        return response.json()
    })
      .then(function (dataProduct){
        return dataProduct        
    })
  },


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

  createShopObject: function createShopObject(myCamera) {
    const addToShop = document.getElementById('addToShop');
    addToShop.addEventListener("click", function(e) {
      e.preventDefault();
      const shopObject = {
        name: myCamera.name,
        img: myCamera.imageUrl,
        description: myCamera.description,
        id: myCamera._id,
        price: myCamera.price,
        lense: document.getElementById('lenses').value,
        quantity: document.getElementById('quantity').value, 
      }
      alert("cet article a été ajouté au panier !");
      location.reload();
    Product.stockObject(shopObject)
    })
  },

  stockObject: function stockObject(shopObject) {
    let currentCart = JSON.parse(localStorage.getItem('nom'))
    if(!currentCart){
      currentCart = [];
    }
    currentCart.push(shopObject);
    localStorage.setItem('nom',JSON.stringify(currentCart));
  },

  shopIndex: function shopIndext() {
    const shop = localStorage.getItem('nom');
    const shopIndex = JSON.parse(shop)
    const displayIndex = document.getElementById('indexShop');
    const i = document.createElement('p');
    displayIndex.appendChild(i);

    i.innerHTML = shopIndex.length
    console.log(shopIndex)
  },

  init: async function init () {   
    const myId = Product.getIdUrl()
    const myData = await Product.getData(myId)
    Product.displayMyCamera(myData)
    const shopObject = await Product.createShopObject(myData)
    Product.shopIndex();
  },
}


Product.init();
