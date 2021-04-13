/* Lien avec l'API */

function getData () {
    return fetch('https://ab-p5-api.herokuapp.com/api/cameras')
      .then(function (response) {
        return response.json()
    })
      .then(function (dataProduct){
        return dataProduct        
    })
  }

/* Fonction qui récupère l'ID dans l'URL de la page*/

function getIdUrl () {
    let urlSearch = location.search.substring(3)
    return urlSearch  
}

/* Fonction qui récupère la caméra correspondant à l'ID */

function getCameraItem(myData, myId) {
    let choosenCamera = myData.find(myData => myData['_id'] == myId);
    return choosenCamera
}

/* Fonction qui affiche la caméra sur la page produit */

function displayMyCamera(myCamera) {

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
}

async function init () {
    let myData = await getData()
    let myId = getIdUrl()
    let myCamera = getCameraItem(myData, myId)
    console.log(myCamera)
    displayMyCamera (myCamera)
}

init();
