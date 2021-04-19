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

  addToShop: function addToShop(myCamera) {
    const addToShop = document.getElementById('addToShop')
    addToShop.addEventListener("click", function(e) {
      e.preventDefault();
      let lenses = document.getElementById('lenses').value
      let quantity = document.getElementById('quantity').value   
      const myShop = {
        id: myId = myCamera._id,
        lense: lenses,
        quantity: quantity, 
      }
      console.log(myShop);
      
    })
  },



  init: async function init () {
    let myId = Product.getIdUrl()
    let myData = await Product.getData(myId)
    Product.displayMyCamera(myData)
    Product.addToShop(myData)
  },

}


Product.init();
