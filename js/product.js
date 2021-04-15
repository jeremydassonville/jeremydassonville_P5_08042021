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
  },

  init: async function init () {
    let myId = Product.getIdUrl()
    let myData = await Product.getData(myId)
    Product.displayMyCamera(myData)
  },

}


Product.init();
