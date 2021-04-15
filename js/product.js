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

    const displayProduct = document.getElementById('productDescription')

    /* Ajout de la structure HTML */
    
    const productCard = document.createElement('div')
    const productImage = document.createElement('img')
    const productBody = document.createElement('div')
    const productName = document.createElement('h3')
    const productDescription = document.createElement('p')
    const productPrice = document.createElement('p')

    /* Ajout des éléments sur la page */

    displayProduct.appendChild(productCard)
    productCard.appendChild(productImage)
    productCard.appendChild(productBody)
    productBody.appendChild(productName)
    productBody.appendChild(productDescription)
    productBody.appendChild(productPrice)

    /* Ajout des valeurs */

    productCard.setAttribute("class", "card")
    productImage.setAttribute("class", "card-img-top mx-auto mt-4")
    productImage.setAttribute("src", myCamera.imageUrl)
    productBody.setAttribute("class", "card-body")
    productName.setAttribute("class","card-title")
    productName.innerHTML = myCamera.name
    productDescription.setAttribute("class", "card-text")
    productDescription.innerHTML = myCamera.description
    productPrice.setAttribute("class", "cart-text")
    productPrice.innerHTML = myCamera.price /100 + '€'
  },

  init: async function init () {
    let myId = Product.getIdUrl()
    let myData = await Product.getData(myId)
    Product.displayMyCamera(myData)
  },

}


Product.init();
