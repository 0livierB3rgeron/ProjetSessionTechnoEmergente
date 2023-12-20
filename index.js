/**RENDERER PROCESS */

const { ipcRenderer } = require('electron');
const dropdown1 = document.getElementById('dropdown1');
const dropdown2 = document.getElementById('dropdown2')
const resultat = document.getElementById('resultat')

ipcRenderer.on('fetch-data-response', (event, data) => {
   let taux = data.conversion_rates

   for(const[key, value] of Object.entries(taux)){
      const nouvelOption = document.createElement('option');
      nouvelOption.value = key;
      nouvelOption.textContent = key;
      dropdown1.appendChild(nouvelOption);
   }
   
});
ipcRenderer.send('fetch-data'); 

ipcRenderer.on('fetch-data-response-devise', (event, data) =>{
   let taux = data.conversion_rates

   if(dropdown2.options.length > 1){
      deleteChildren();
   }

   for(const[key, value] of Object.entries(taux)){
      const nouvelOption = document.createElement('option');
      nouvelOption.value = value;
      nouvelOption.textContent = key;
      dropdown2.appendChild(nouvelOption);
   }
   

})

function deleteChildren(){

   var i, L = dropdown2.options.length - 1;
   for(i = L; i >= 0; i--) {
      dropdown2.remove(i);
   }
}

function getData(event){
   let devise = dropdown1.value;
   ipcRenderer.send('fetch-data-devise', devise); 
}


function traitementForm(event){
   event.preventDefault();
   let valeur = document.getElementById('initial').value;
   let resultatVal = valeur*dropdown2.value
   resultat.value = resultatVal.toFixed(2);

}

/**Méthode qui envoie le signal au main process pour fermer l'application */
function fermerApp(event){
   event.preventDefault()
   ipcRenderer.send('close')
}
document.getElementById('quitter').addEventListener('click', fermerApp)



