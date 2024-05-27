const html= document.querySelector("html");
const img=document.querySelector(".app__image");
const title= document.querySelector(".app__title");
const timer=document.querySelector('#timer');

const cardButtons=document.querySelectorAll(".app__card-button");
const musicCheckbox=document.querySelector("#alternar-musica");
const comenzarPausarButton=document.querySelector("#start-pause");
const textoComenzarPausar=document.querySelector("#start-pause span");
const imgComenzarPausar=document.querySelector("#start-pause img");

const music=new Audio("./sonidos/luna-rise-part-one.mp3");
let idInterval=null;
let timeDate=new Date();
let timeLimit=25*60;
let timeCounter=timeLimit;


//Helper functions
function getCardId(button){
    const buttonClass= button.classList[1];
    let cardId=buttonClass.substring("app__card-button--".length);
    cardId=="enfoque"?cardId:cardId="descanso-"+cardId;
    return cardId;
}
function resetComenzarPausarButton(){
    clearInterval(idInterval);
    idInterval=null;
    textoComenzarPausar.textContent="Comenzar";
    imgComenzarPausar.setAttribute("src","./imagenes/play_arrow.png");
}
function resetStates(){
    //Reset music button
    musicCheckbox.checked=false;
    music.currentTime=0;
    music.pause();
    //Reset comenzar-pausar button
    resetComenzarPausarButton();
    //Reset card buttons 
    cardButtons.forEach((button)=>{
        button.classList.remove("active");
    });
}
function showCounter(){
    timeDate=new Date(timeCounter*1000);
    timer.innerHTML=timeDate.toLocaleTimeString('es-ES', {minute: '2-digit', second: '2-digit'});
}
function changeCard(cardId){
    html.setAttribute("data-contexto",cardId);
    img.setAttribute("src",`./imagenes/${cardId}.png`);

    switch(cardId){
        case("enfoque"):
            title.innerHTML="Optimiza tu productividad,<br><strong class='app__title-strong'>sumérgete en lo que importa.</strong>";
            timeLimit=25*60;
            timeCounter=timeLimit;
            break;
        case("descanso-corto"):
            title.innerHTML="¿Qué tal tomar un respiro?,<br><strong class='app__title-strong'>¡Haz una pausa corta!</strong>";
            timeLimit=5*60;
            timeCounter=timeLimit;
            break;
        case("descanso-largo"):
            title.innerHTML="Hora de volver a la superficie<br><strong class='app__title-strong'> Haz una pausa larga.</strong>";
            timeLimit=15*60;
            timeCounter=timeLimit;
            break;
    }
    showCounter();
}


//Card buttons event listener
cardButtons.forEach((button)=>{
    button.addEventListener("click",()=>{
        resetStates();
        button.classList.add("active");
        changeCard(getCardId(button));
    });
});

//Music checkbox event listener
musicCheckbox.addEventListener("change",()=>{
    if(music.paused){
        music.play();
        music.loop=true;
    }
    else{
        music.pause();
    }
});

//Comenzar-pausar button event listener
comenzarPausarButton.addEventListener("click",()=>{
    if(idInterval){
        resetComenzarPausarButton();
    }
    else{
        idInterval=setInterval(() => {
            if(timeCounter===0){
                resetComenzarPausarButton();
                timeCounter=timeLimit; //reset de counter
            }
            else{
                timeCounter--;
            }
            showCounter();
        }, 1000);

        textoComenzarPausar.textContent="Pausar";
        imgComenzarPausar.setAttribute("src","./imagenes/pause.png");
    }
});

