const Order = {

    /* Fonction qui affiche les informations de la commande sur la page commande.html */

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

    /* Fonction qui récupère l'Id de la commande dans l'Url de la page commande.html */

    getIdUrl: function getIdUrl () {
        const urlSearchParams = new URLSearchParams(location.search);
        const id = urlSearchParams.get('id');
        return id;
    },

    /* Fonction qui récupère le nom de l'utilisateur de la commande dans l'Url de la page commande.html */

    getNameUrl: function getNameUrl() {
        const urlSearchParams = new URLSearchParams(location.search);
        const name = urlSearchParams.get('name');
        return name;
    },

    /* Fonction qui récupère le montant total de la commande dans l'Url de la page commande.html */

    getTotalUrl: function getTotalUrl() {
        const urlSearchParams = new URLSearchParams(location.search);
        const total = urlSearchParams.get('total');
        return total;
    },
    
    init: function init () {   
        const id = Order.getIdUrl(); 
        const name = Order.getNameUrl();
        const total = Order.getTotalUrl();
        Order.displayCommand(id, name, total);
    },

}


Order.init()
