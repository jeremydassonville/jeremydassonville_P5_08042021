const Index = {
  /* Fonction qui récupère les données de l'API */

getData: function getData () {
  return fetch('http://localhost:3000/api/cameras')
    .then(function (response) {
      return response.json()
  })
    .then(function (dataProduct){
      return dataProduct
  })
  .catch(function() {
    const erreur = document.getElementById('errorMessage');
    const erreurMessage = document.createElement('h2');
    erreur.appendChild(erreurMessage);
    erreurMessage.innerHTML = "Le site a rencontré un problème, merci de réessayer ulterieurement.";
  })
},

/* Fonction qui affiche les données de l'API sur la page d'acceuil */

displayData: function displayData(myData) {
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
    productImage.setAttribute("src", myData[i].imageUrl )
    productImage.setAttribute("class", "card-img-top ")
    productBody.setAttribute("class", "card-body")
    productName.setAttribute("class", "card-title")
    productName.innerHTML += myData[i].name
    productPrice.setAttribute("class", "card-text")
    productPrice.innerHTML += myData[i].price / 100 + '€'
  }
},

shopIndex: function shopIndex() {
  const shop = localStorage.getItem('nom');
  const shopIndex = JSON.parse(shop)
  const displayIndex = document.getElementById('indexShop');
  const i = document.createElement('p');
  displayIndex.appendChild(i);

  i.innerHTML = shopIndex.length
  console.log(shopIndex)
},


/* Fonction qui initialise */


init: async function init() {
  let myData = await Index.getData()
  Index.displayData(myData)
  Index.shopIndex()
},


}


Index.init()



