/* Fonction qui récupère les données de l'API */

function getData () {
  return fetch('http://localhost:3000/api/cameras')
    .then(function (response) {
      return response.json()
  })
    .then(function (dataProduct){
      return dataProduct
  })
}

/* Fonction qui afficher les données de l'API */

function displayData(myData) {
  let displayProduct = document.getElementById('listeProduit')

      /* Boucle qui traverse le tableau de données */

  for (i = 0; i < myData.length; i++) {

       /* Ajout de la structure HTML  */

    const productContenant = document.createElement('div')
    const productImage = document.createElement('img')
    const productName = document.createElement('h3')
    const productPrice = document.createElement('p')

        /* Ajout des éléments sur la page */

    displayProduct.appendChild(productContenant)
    productContenant.appendChild(productImage)
    productContenant.appendChild(productName)
    productContenant.appendChild(productPrice)

        /* Ajout des valeurs */

    productImage.setAttribute("src", myData[i].imageUrl)
    productContenant.setAttribute("class", "cart__container")
    productName.innerHTML += myData[i].name
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

