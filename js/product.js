/* Lien avec l'API */

const Product = {
  getData: function getData (id) {
    return fetch('https://ab-p5-api.herokuapp.com/api/cameras/' + id)
      .then(function (response) {
        return response.json()
    })
      .then(function (dataProduct){
        return dataProduct        
    })
  },

  getIdUrl: function getIdUrl () {
    const urlSearchParams = new URLSearchParams(location.search);
    const id = urlSearchParams.get('id');
    return id;  
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
    Product.stockObject(shopObject)
    })
  },

  stockObject: function stockObject(shopObject) {
    localStorage.setItem('nom',JSON.stringify(shopObject));
    console.log(localStorage)
  },

  init: async function init () {
    const myId = Product.getIdUrl()
    const myData = await Product.getData(myId)
    Product.displayMyCamera(myData)
    const shopObject = await Product.createShopObject(myData)
  },
}


Product.init();
