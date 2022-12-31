    const playPad = document.getElementById('pad-button');
    const closeModal = document.getElementById('modalclose');
    const replayModal = document.getElementById('modalreplay');
    const divInfo = document.getElementById("divInfo");
    
    const mainArray = [0,1,2,3,4,5,6,7,8];
    // mouvements possibles
    const ArrayPlusThree = [0,1,2,3,4,5];
    const ArrayMinusThree = [3,4,5,6,7,8];
    const ArrayPlusOne = [0,1,3,4,6,7];
    const ArrayMinusOne = [1,2,4,5,7,8];
    
    // disposition jetons dans le jeu                                      
    let currentArray = [0,1,2,3,4,5,6,7];
    
    const mainUl = document.getElementById("table");
    
    let invisible = 4;
    let iTry = 0; // nombre d'essais et premiere visite
    //let win = false;




/** FONCTIONS */

function play()
{
    document.querySelector(".modal-container").classList.remove("none");
    document.getElementById((4).toString()).classList.add('invisible');
    // z-index de la galerie à 0 pour eliminer bugs on hover
    document.getElementById("galerie").style.zIndex = 0;
    invisible = 4;
     // ajoute dynamiquement la stylesheet
    if (iTry == 0) {
        let link = document.createElement('link');
        link.rel = "stylesheet";
        link.type = "text/css";
        link.href = "css/pad.css";   
        document.head.appendChild(link);
    }
    //initialiser le jeu. 
    shuffleArray(currentArray);

    // initialisation du jeu
    document.getElementById("0").textContent = currentArray[0] + 1;
    document.getElementById("1").textContent = currentArray[1] + 1;
    document.getElementById("2").textContent = currentArray[2] + 1;

    document.getElementById("3").textContent = currentArray[3] + 1;
    document.getElementById("4").textContent = 9;
    document.getElementById("5").textContent = currentArray[4] + 1;
    
    document.getElementById("6").textContent = currentArray[5] + 1;
    document.getElementById("7").textContent = currentArray[6] + 1;
    document.getElementById("8").textContent = currentArray[7] + 1;

    currentArray.splice(4, 0, 8);
}

function closePad()
{
    // effacer le nombre 8 du tableau
    for(let i=0; i<currentArray.length; i++){
        if ( currentArray[i] == 8){
            currentArray.splice(i,1);
            console.log(currentArray);
            document.getElementById((i).toString()).classList.remove('invisible');
            document.getElementById((4).toString()).classList.add('invisible');
            document.querySelector(".tries").textContent = "" ;
            document.querySelector(".modal-container").classList.add("none");
            document.getElementById("galerie").style.zIndex = 1;
            //win = false;
            iTry=0;
            break;
        }
    }

}
 
function replayPad(){
    closePad();
    play();
}

function controlPossibilities(id){
    let currentPossibilities = [];
    
    if( ArrayPlusThree.includes(id)){
        currentId = id + 3;
        currentPossibilities.push(currentId);
    }
    if( ArrayMinusThree.includes(id)){
        currentId = id - 3;
        currentPossibilities.push(currentId);

    }
    if(ArrayPlusOne.includes(id)){
        currentId = id + 1;
        currentPossibilities.push(currentId);

        
    }
    if(ArrayMinusOne.includes(id)){
        currentId = id - 1;
        currentPossibilities.push(currentId);
    }

    return currentPossibilities;

}

const compareArrays = (currentArray) => {
    return mainArray.toString() === currentArray.toString();
  };


function shuffleArray(currentArray){
    currentArray.sort(()=> Math.random() - 0.5);
}
//agrandir la div en utilisant une classe
function bigDiv(elt){
    elt.classList.remove("big-div");
}


// ******* CODE ********
// *********************

playPad.addEventListener("click",play);

mainUl.addEventListener("click", function(e){ 
    
    //if(win == false){
    if(compareArrays(currentArray) == false){
        
        //nombre de coups
        iTry ++;
        if(iTry > 149){
            mainUl.classList.add('lost')
            mainUl.textContent = `Vous avez perdu en ${iTry} coups !`;
            document.querySelector(".tries").textContent =  '';  
        }
        
        document.querySelector(".tries").textContent = `${iTry}  coups` ;
        // si on a cliqué sur un button valide :
        if(mainArray.includes(parseInt (e.target.id))){
            //console.log(e.target.id);
            // retout tableau possibilités de mouvemnt du clic
            currentPossibilities = controlPossibilities(parseInt(e.target.id));
            console.log(currentPossibilities);

            console.log(invisible);
            if(currentPossibilities.includes(parseInt(invisible))){
                document.querySelector('.invisible').textContent = e.target.textContent;
                //mettre à jour currentArray
                currentArray[parseInt(document.querySelector('.invisible').id)] = parseInt(e.target.textContent)-1 ;
                                
                document.querySelector('.invisible').classList.remove('invisible');
                e.target.classList.add('invisible');
                e.target.textContent = 9;
                //mettre à jour currentArray
                currentArray[e.target.id] = 8 ;

                invisible = e.target.id;

              
            }
        }
        if(compareArrays(currentArray) == true){
            //document.querySelector(".tries").textContent =  `Vous avez trouvé en ${iTry} coups !`;
            divInfo.textContent =  `Vous avez trouvé en ${iTry} coups !`;
            //document.querySelector(".tries").classList.add('win');
            divInfo.classList.add("win");
            divInfo.classList.add("big-div");
            setTimeout(bigDiv,1500, divInfo);
        }
    }
});
 
// Revenir sur le site    
closeModal.addEventListener("click", closePad);
replayModal.addEventListener("click", replayPad);
