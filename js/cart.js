
function getShopProduct() {
    const test = JSON.parse(localStorage.getItem('nom'))
    console.log(test)
    
    const displayimg = document.getElementById('img');
    displayimg.setAttribute("src", test.img);

    const displayName = document.getElementById('name');
    displayName.innerHTML = test.name;

    const displayPrice = document.getElementById('price');
    displayPrice.innerHTML = test.price / 100 + '€';

    const displayLense = document.getElementById('lense')
    displayLense.innerHTML = test.lense
}

getShopProduct()


