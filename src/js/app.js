document.addEventListener('DOMContentLoaded', function(){
    iniciaApp();
});

function iniciaApp() {
    scrollnav();
    creargaleria();
    navegacionfija();
}

function scrollnav() {
    const enlaces=document.querySelectorAll('.navegacion-principal a');
    enlaces.forEach(enlaces => {
        enlaces.addEventListener('click', function(e) {
            e.preventDefault();
            const seccionscroll=e.target.attributes.href.value;
            const seccion=document.querySelector(seccionscroll);
            seccion.scrollIntoView({behavior:'smooth'});
        } )
    })
}


function navegacionfija() {
    const barra=document.querySelector('header');
    const sobrefestival= document.querySelector('.video');
    const body=document.querySelector('body');

    window.addEventListener('scroll', function() {
        if(sobrefestival.getBoundingClientRect().bottom < 0){
            barra.classList.add('fijo');
            body.classList.add('body-scroll');
        } else {
            barra.classList.remove('fijo');
            body.classList.remove('body-scroll');
        }
       
    })
}

function creargaleria() {
const galeria=document.querySelector('.galeria-imagenes');

for(let i=1; i<=12; i++){
const imagen=document.createElement('Picture');
imagen.innerHTML = `
<source srcset="build/img/thumb/${i}.avif" type="image/avif">
<source srcset="build/img/thumb/${i}.webp" type="image/webp">

<img width="200" height="300" src="build/img/thumb/${i}.jpg" alt="imagen vocalista">
`;
imagen.onclick = function() {
mostrarimagen(i);
}
galeria.appendChild(imagen);
}
}

function mostrarimagen(id) {
    const imagen = document.createElement('picture');
    //innerHTMl: coloca los elementos descendientes del padre.
    imagen.innerHTML=`
<source srcset="build/img/grande/${id}.avif" type="image/avif">
<source srcset="build/img/grande/${id}.webp" type="image/webp">
<img width="200" height="300" src="build/img/grande/${id}.jpg" alt="imagen vocalista">
`;

const overlay = document.createElement('DIV');
overlay.appendChild(imagen);
overlay.classList.add('overlay');

overlay.onclick= function() {
    const body = document.querySelector('body');
    body.classList.remove('fijar-body');
    overlay.remove();
}

    const cerrarmodal= document.createElement('P');
    cerrarmodal.textContent='x';
    cerrarmodal.classList.add('btn-cerrar');

    cerrarmodal.onclick= function() {
const body=document.querySelector('body');
body.classList.remove('fijar-body');
overlay.remove();
    }

    overlay.appendChild(cerrarmodal);
//añadiendo al Html
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body');
}
