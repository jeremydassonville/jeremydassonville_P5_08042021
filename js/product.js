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

    let displayProduct = document.getElementById('productName')

    let productName = document.createElement('h3')

    displayProduct.appendChild(productName)
    
    productName.innerHTML = myCamera.name
}

async function init () {
    let myData = await getData()
    let myId = getIdUrl()
    let myCamera = getCameraItem(myData, myId)
    console.log(myCamera)
    displayMyCamera (myCamera)
}

init();
