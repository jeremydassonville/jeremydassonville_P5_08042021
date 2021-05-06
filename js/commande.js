const order = {

    displayCommand: function displayCommand(id, name, total){
        

        const displayItem = document.getElementById('displayOrder');

        const displayName = document.createElement('p');
        const displayId = document.createElement('p');
        const displayTotal = document.createElement('p');

        displayItem.appendChild(displayName);
        displayItem.appendChild(displayId);
        displayItem.appendChild(displayTotal);

        displayName.innerHTML = 'Merci de votre commande' + ' ' + name;
        displayId.innerHTML = 'Votre Id de commande est le : ' + id;
        displayTotal.innerHTML = 'Le montant total de la commande est de : ' + total + '€';

    },

    getIdUrl: function getIdUrl () {
        const urlSearchParams = new URLSearchParams(location.search);
        const id = urlSearchParams.get('id');
        return id;
    },

    getNameUrl: function getNameUrl() {
        const urlSearchParams = new URLSearchParams(location.search);
        const name = urlSearchParams.get('name');
        return name;
    },

    getTotalUrl: function getTotalUrl() {
        const urlSearchParams = new URLSearchParams(location.search);
        const total = urlSearchParams.get('total');
        return total;
    },
    
    init: function init () {   
        const id = order.getIdUrl(); 
        const name = order.getNameUrl();
        const total = order.getTotalUrl();
        order.displayCommand(id, name, total);
    },

}


order.init()
