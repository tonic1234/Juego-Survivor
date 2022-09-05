// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>CONSTANTES>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// Elementos del DOM

const comerB = document.querySelector("#comerButton")
const tomarB = document.querySelector("#aguaButton")
const dormirB = document.querySelector("#dormirButton")
const recolectarB = document.querySelector("#recolectarButton")
const fabricarB = document.querySelector("#fabricarButton")
const esperarB = document.querySelector("#esperarButton")

// Objetos del juego.

const antorcha = {
    nombre: "Antorcha",
    
    
}

const hoja = {
    nombre: "Hoja",
    
}
const palo = {
    nombre: "Palo",
    imagen: <img src="./imagenes/palo.png" alt=""></img>
}
const piedra = {
    nombre: "Piedra",
    
}
const botella = {
    nombre: "Botella",
   
}
const fruta = {
    nombre: "Fruta Silvestre",
    valNut: 15,
    moral: 10
}
const gusano = {
    nombre: "Gusano",
    valNut: 2,
    moral: 10
}
const pajaro = {
    nombre: "Pajaro",
    
}
const carnePajaro = {
    nombre: "Carne Cocida de Pajaro",
    moral: 30
}

// Arreglo de la mochila del jugador.

const mochila = [buzo, reloj, hoja, hoja, fruta, fruta, fruta]

// Arreglo de los objetos que hay en el juego.

const objetos = [palo, fruta, gusano, hoja]

// Arreglo usado para la recolección y esta formado por
// los elemento que se recolectan en cada iteración.

const recoleccion = []

// Arreglo de frases para la pantalla de espera .

const frasesDeEspera = ["Te sientas bajo un árbol a esperar que pasen algunas horas",
    "Miras las hormigas llevar hojas a su hormiguero para entretenerte algunas horas",
    "Escuchas como los pájaros cantan y esperas que pase el tiempo",
    "Buscas formas en las nubes para pasar el rato",
    "Intentas buscar recuerdos en tu memoria y pasan algunas horas"
]

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>NO CONSTANTES>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// Stats del personaje

let salud = 50
let hambre = 70
let cansancio = 80

// Variables de dia y hora cada actividad lleva determinada cantidad de horas y se van sumando.

let hora = 16
let dias = 0

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>FUNCIONES>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// Función del reloj

function clock() {
    if (hora == 24) {
        hora = 0
        dias += 1
        document.querySelector(".timeText").innerHTML = hora + ":00 hs";
        document.querySelector(".dayText").innerHTML = "Día: " + dias;
        return

    } else if (hora > 24) {
        let saldoHoras = hora - 24
        hora = saldoHoras
        dias += 1
        document.querySelector(".timeText").innerHTML = hora + ":00 hs";
        document.querySelector(".dayText").innerHTML = "Día: " + dias;
        return
    }
    else if(hora == 24){
        hora = 0
        dias += 1
        document.querySelector(".timeText").innerHTML = hora + ":00 hs";
        document.querySelector(".dayText").innerHTML = "Día: " + dias;
        return
    }
    else{
        document.querySelector(".timeText").innerHTML = hora + ":00 hs";
        document.querySelector(".dayText").innerHTML = "Día: " + dias;
    }

}

// Función del sol y la luna. Funciona con una imagen circular con el sol y la luna de lados opuestos
// que va girando 15 grados según pasa la hora

function sunMoon() {
    let hourDivition = hora * 15
    let hourV = -(hourDivition) - 180
    document.querySelector(".sunMoonImg").style.transform = 'rotate(' + hourV + 'deg)';

}

// Función del campamento. Se hace de dia y de noche según la hora

function camping() {
    if (hora >= 6 && hora <= 17) {
        document.querySelector(".camping").style.backgroundImage = "url(../imagenes/campingdia.png)";
    } else if (hora >= 19 && hora < 6) {
        document.querySelector(".camping").style.backgroundImage = "url(../imagenes/campingnoche.png)";
    } else {
        document.querySelector(".sky").style.background = "linear-gradient(0deg, rgba(8,81,204,1) 0%, rgba(3,16,34,1) 100%)";

    }

}

// Función del cielo. cambia el degradado del DOM según la hora

function dayNight() {
    if (hora >= 6 && hora <= 17) {
        document.querySelector(".sky").style.background = "linear-gradient(0deg, rgba(255, 255, 255, 1) 0%, rgb(87, 157, 255) 100%)";
    } else if (hora >= 19 && hora < 6) {
        document.querySelector(".sky").style.background = "linear-gradient(0deg, rgba(255,112,45,1) 0%, rgba(252,176,69,1) 100%)";
    } else {
        document.querySelector(".sky").style.background = "linear-gradient(0deg, rgba(8,81,204,1) 0%, rgba(3,16,34,1) 100%)";

    }

}

// Función de las barras de de stats. Los parámetros son el selector de la barra en el DOM 
// y el stats es el numero de la stat en el programa

function statusBar(querySelector, stats) {
    let barDivition = stats * 3.30
    let statusV = barDivition + "px"
    document.querySelector(querySelector).style.width = statusV;
}

// Función de la acción comer .

function comer() {
    if (hambre < 20) {
        alert("No puedes comer, no tienes hambre")

        // Con el método some verifico si Frutas Silvestres que es
        //  el único alimento por el momento esta en mi arreglo mochila

    } else if (mochila.some(alimento => alimento.nombre == "Fruta Silvestre") === true) {
        hambre -= fruta.valNut
        cansancio += 20
        hora += 1

        //   Si hay frutas en el arreglo mochila la fruta tiene que Ser
        //   eliminada de mi arreglo cuando el personaje la coma

        // 1-filtro todo los elementos que no son fruta y creo el arreglo filtrados
        // 2-filtro todos los elemento fruta en el arreglo no filtrados

        const filtrados = mochila.filter(element => element != fruta)
        const noFiltrados = mochila.filter(element => element == fruta)

        // Vació el arreglo mochila

        mochila.length = 0;

        // Pongo los elementos del arreglo filtrados dentro de arreglo mochila

        Array.prototype.push.apply(mochila, filtrados);

        // Filter nos saco todos los elemento fruta del arreglo mochila pero el personaje
        // puede tener mas de una fruta en el inventario
        // Con el arreglo noFiltrados sabemos cuantas frutas tenia el arreglo mochila
        // Con ciclo for los volvemos a poner dentro de la mochila la cantidad de veces que existiera
        // el elemento fruta en el arreglo - 1 que seria la fruta que el personaje comió

        for (let index = 0; index < noFiltrados.length - 1; index++) {
            mochila.push(fruta)
        }
        statusBar(".statusBarHealth", salud)
        statusBar(".statusBarFatigue", cansancio)
        statusBar(".statusBarHunger", hambre)
        dayNight()
        clock()
        camping()
        sunMoon()

    } else {
        alert("No tienes comida en tu mochila.")

    }
}

// Función de la acción dormir .

function dormir() {
    if (cansancio <= 30) {
        alert("No puedes dormir, no tienes sueño.")

    } else {
        cansancio -= 30
        hambre += 20
        hora += 6
        statusBar(".statusBarHealth", salud)
        statusBar(".statusBarFatigue", cansancio)
        statusBar(".statusBarHunger", hambre)
        clock()
        dayNight()
        camping()
        sunMoon()


    }
}

// Función de la acción esperar .

function esperar() {
    hora += 3
    cansancio += 30
    hambre += 20
    // let frase = Math.ceil(Math.random() * frasesDeEspera.length - 1);
    // alert(frasesDeEspera[frase])
    statusBar(".statusBarHealth", salud)
    statusBar(".statusBarFatigue", cansancio)
    statusBar(".statusBarHunger", hambre)
    clock()
    dayNight()
    camping()
    sunMoon()
}

// Función de la acción inventario .


// function inventario() {
//     if (mochila.length === 0) {
//         alert("Tu mochila esta vacía. Sal a recolectar a ver qué puedes encontrar.")

//     } else {

//         mochila.sort()
//         let nombresMochila = mochila.map((element) => element.nombre)
//         alert(nombresMochila)
//     }
// }

// Función de la acción recolectar .

function recolectar() {

    // Solo se puede recolectar si es de dia

    if (hora > 6 && hora < 19 || mochila.some(element => element.nombre == "Antorcha") === true) {
        cansancio += 30
        hambre += 10
        hora += 4

        recoleccion = []

        // Se recolectan de 1 a 3 objetos al azar según su indice
        // en el arreglo objetos

        let busqueda = Math.ceil(Math.random() * 2)

        for (let index = 0; index < busqueda; index++) {
            let chance = Math.ceil(Math.random() * objetos.length - 1);

            // los objetos recolectados se agregan a la mochila en cada iteración

            mochila.push(objetos[chance])
            recoleccion.push(objetos[chance])
        }


        // recoleccion.sort()
        // let nombresRecoleccion = recoleccion.map((element) => element.nombre)
        // alert("Recolectaste esto: " + nombresRecoleccion)
        // alert("Se agregaron a tu mochila.")

        statusBar(".statusBarHealth", salud)
        statusBar(".statusBarFatigue", cansancio)
        statusBar(".statusBarHunger", hambre)
        dayNight()
        camping()
        sunMoon()
        clock()

    } else {
        alert("Es de noche, no puedes recolectar.");

    }
}


// Función de la acción fabricar .

function fabricar() {

    let palos = mochila.filter(element => element == palo)
    let hojas = mochila.filter(element => element == hoja)

    if (palos.length >= 1 && hojas.length >= 2) {
        alert("Puedes fabricar una antorcha para poder recolectar en la noche")
        alert("PALO X1 HOJA X2")
        let fAction = prompt("Fabricar antorcha? 1-Si 2-No")

        while (fAction != 1 || fAction != 2) {
            alert("Opción Invalida ingrese nuevamente")
            prompt("Fabricar antorcha? 1-Si 2-No")
            if (fAction == 1 || fAction == 2) {
                break
            }
        }

        if (fAction == 1) {
            alert("fabricaste una antorcha")

            mochila.push(antorcha)

            const noFiltrados = mochila.filter(element => element != hoja && element != palo)
            const hojasFiltradas = mochila.filter(element => element == hoja)
            const palosFiltrados = mochila.filter(element => element == palo)

            // Vació el arreglo mochila

            mochila.length = 0;

            // Pongo los elementos del arreglo filtrados dentro de arreglo mochila

            Array.prototype.push.apply(mochila, noFiltrados);



            for (let index = 0; index < hojasFiltradas.length - 2; index++) {
                mochila.push(hoja)
            }

            for (let index = 0; index < palosFiltrados.length - 1; index++) {
                mochila.push(palo)
            }
        } else if (fAction == 2) {

        }
    } else {
        alert("No tienes materiales suficientes para fabricar nada")
    }

}



// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>INICIO DEL PROGRAMA>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>




alert("¿Qué quieres hacer?")

clock()
state()
statusBar(".statusBarHealth", salud)
statusBar(".statusBarFatigue", cansancio)
statusBar(".statusBarHunger", hambre)
dayNight()
camping()
sunMoon()


function state() {

    if (salud <= 0) {
        alert("Game Over")
    }

    if (hambre > 100) {
        salud -= 10
    }

    if (cansancio > 100) {
        alert("Estas muy cansado te quedaste dormido")
        dormir()

    }
}



comerB.addEventListener('click', function () {
    comer();
});
dormirB.addEventListener('click', function () {
    dormir();
});
recolectarB.addEventListener('click', function () {
    recolectar();
});
esperarB.addEventListener('click', function () {
    esperar();
});