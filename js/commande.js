const order = {

    getCommandItem: function getCommandItem() {
        const commandeItem = JSON.parse(sessionStorage.getItem('order'));
        order.displayCommand(commandeItem);
    },

    displayCommand: function displayCommand(commande){
        console.log(commande)

        const displayItem = document.getElementById('displayOrder');

        const displayName = document.createElement('p');
        const displayId = document.createElement('p');
        const displayTotal = document.createElement('p');

        displayItem.appendChild(displayName);
        displayItem.appendChild(displayId);
        displayItem.appendChild(displayTotal);

        displayName.innerHTML = 'merci de votre commande' + ' ' + commande.contact.firstName;
        displayId.innerHTML = 'votre Id de commande est le : ' +commande.orderId;

    },
    
    init: function init () {
        order.getCommandItem();    
    },

}


order.init()
