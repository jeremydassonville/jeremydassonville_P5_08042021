/* Fonction qui récupère les données de l'API */

function getData () {
  return fetch('https://ab-p5-api.herokuapp.com/api/cameras')
    .then(function (response) {
      return response.json()
  })
    .then(function (dataProduct){
      return dataProduct
  })
}

/* Fonction qui affiche les données de l'API sur la page d'acceuil */

function displayData(myData) {
  let displayProduct = document.getElementById('listeProduit')

      /* Boucle qui traverse le tableau de données */

  for (i = 0; i < myData.length; i++) {

       /* Ajout de la structure HTML  */
       
    const productColumn = document.createElement('div')
    const productLink = document.createElement('a')
    const productContenant = document.createElement('div')
    const productImage = document.createElement('img')
    const productBody = document.createElement('div')
    const productName = document.createElement('h3')
    const productPrice = document.createElement('p')

        /* Ajout des éléments sur la page */

    displayProduct.appendChild(productColumn)
    productColumn.appendChild(productLink)
    productLink.appendChild(productContenant)
    productContenant.appendChild(productImage)
    productContenant.appendChild(productBody)
    productBody.appendChild(productName)
    productBody.appendChild(productPrice)

        /* Ajout des valeurs */

    productColumn.setAttribute("class", "col-12 col-lg-4")
    productLink.setAttribute("href", "pages/products.html?id=" + myData[i]._id)
    productContenant.setAttribute("class", "card mb-4 mt-4")    
    productImage.setAttribute("src", myData[i].imageUrl)
    productImage.setAttribute("class", "card-img-top ")
    productBody.setAttribute("class", "card-body")
    productName.setAttribute("class", "card-title")
    productName.innerHTML += myData[i].name
    productPrice.setAttribute("class", "card-text")
    productPrice.innerHTML += myData[i].price / 100 + '€'
  }  
}



/* Fonction qui initialise */


async function init() {
  let myData = await getData()
  console.log(myData)
  displayData(myData)
}

init()



