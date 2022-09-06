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
    imagen: `<img src="./imagenes/hoja.png" alt="">`

}
const palo = {
    nombre: "Palo",
    imagen: `<img src="./imagenes/palo.png" alt="">`
}
const piedra = {
    nombre: "Piedra",
    imagen: `<img src="./imagenes/piedra.png" alt="">`
}
const botella = {
    nombre: "Botella",
    imagen: `<img src="./imagenes/botella.png" alt="">`
}
const fruta = {
    nombre: "Fruta Silvestre",
    valNut: 15,
    moral: 10,
    imagen: `<img src="./imagenes/fruta.png" alt="">`
}
const gusano = {
    nombre: "Gusano",
    valNut: 2,
    moral: 10,
    imagen: `<img src="./imagenes/gusano.png" alt="">`
}
const pajaro = {
    nombre: "Pájaro",
    imagen: `<img src="./imagenes/pajaro.png" alt="">`

}
const carnePajaro = {
    nombre: "Carne Cocida de Pájaro",
    moral: 30,
    valNut: 12,
    imagen: `<img src="./imagenes/pajarococinado.png" alt="">`
}

// Arreglo de la mochila del jugador.

const mochila = [botella]

// Arreglo de los objetos que hay en el juego.

const objetos = [palo, piedra, fruta, gusano, hoja, pajaro, botella]

// Arreglo de los objetos fabricables.

const fabricables = [antorcha, carnePajaro]

// Arreglo de frases para la pantalla de espera .

const frasesDeEspera = ["Te sientas bajo un árbol a esperar que pasen algunas horas",
    "Miras las hormigas llevar hojas a su hormiguero para entretenerte algunas horas",
    "Escuchas como los pájaros cantan y esperas que pase el tiempo",
    "Buscas formas en las nubes para pasar el rato",
    "Intentas buscar recuerdos en tu memoria y pasan algunas horas"
]

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>NO CONSTANTES>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// Stats del personaje

let salud = 70
let hambre = 40
let sed = 60
let cansancio = 25
let moral = 60


// Variables de dia y hora cada actividad lleva determinada cantidad de horas y se van sumando.

let hora = 12
let dias = 0


// Arreglo usado para la recolección y esta formado por
// los elemento que se recolectan en cada iteración.

let recoleccion = []

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>FUNCIONES>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


function state() {

    if (salud <= 0) {
        alert("Game Over")
    }

    if (hambre > 100) {
        salud -= 10
    }

    if (sed > 100) {
        salud -= 20
    }

    if (cansancio > 80) {
        alert("Estas muy cansado te estas quedando  dormido")
       
    }
    if (cansancio > 100) {
        dormir()
    }

    if(moral > 100){
        moral = 100
    }
    if(moral < 0){
        moral = 0
    }
    if(cansancio < 0){
        cansancio = 100
    }
  
    if(hambre > 100){
        hambre = 100
    }
    if(hambre < 0){
        hambre = 0
    }

    if(sed > 100){
        sed = 100
    }
    if(sed < 0){
        sed = 0
    }
    if (salud > 100){
        salud = 100
    }

  
    if (moral > 40) {
        document.querySelector(".gameBox").style.filter = `grayscale(0%)`;
    }

    if (moral <= 40) {
        document.querySelector(".gameBox").style.filter = `grayscale(50%)`;
    }
    if (moral <= 35) {
        document.querySelector(".gameBox").style.filter = `grayscale(75%)`;
    }
    if (moral <= 20) {
        document.querySelector(".gameBox").style.filter = `grayscale(100%)`;
    }
}


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
    } else if (hora == 24) {
        hora = 0
        dias += 1
        document.querySelector(".timeText").innerHTML = hora + ":00 hs";
        document.querySelector(".dayText").innerHTML = "Día: " + dias;
        return
    } else {
        document.querySelector(".timeText").innerHTML = hora + ":00 hs";
        document.querySelector(".dayText").innerHTML = "Día: " + dias;
    }

}

// Función del sol y la luna. Funciona con una imagen circular con el sol y la luna de lados opuestos
// que va girando 15 grados según pasa la hora

function sunMoon() {
    let hourDivition = hora * 15
    let hourV = -(hourDivition) + 180
    document.querySelector(".sunMoonImg").style.transform = 'rotate(' + hourV + 'deg)';

}

// Función del cielo. cambia el degradado del DOM según la hora

function dayNight() {
    if (hora >= 6 && hora < 17) {
        document.querySelector(".sky").style.backgroundImage = "url(../imagenes/cielodia.png)";
        document.querySelector(".camping").style.backgroundImage = "url(../imagenes/campingdia.png)"

    } else if (hora >= 17 && hora < 19) {
        document.querySelector(".sky").style.backgroundImage = "url(../imagenes/cielotarde.png)";
        document.querySelector(".camping").style.backgroundImage = "url(../imagenes/campingdia.png)"
    } else {
        document.querySelector(".sky").style.backgroundImage = "url(../imagenes/cielonoche2.png)";
        document.querySelector(".camping").style.backgroundImage = "url(../imagenes/campingnoche.png)"
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
        sed += 20
        moral += 10

        //   Si hay frutas en el arreglo mochila la fruta tiene que Ser
        //   eliminada de mi arreglo cuando el personaje la coma

        // 1-filtro todo los elementos que no son fruta y creo el arreglo filtrados
        // 2-filtro todos los elemento fruta en el arreglo no filtrados

        let filtrados = mochila.filter(element => element != fruta)
        let noFiltrados = mochila.filter(element => element == fruta)

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


        clock()
        state()
        statusBar(".statusBarHealth", salud)
        statusBar(".statusBarFatigue", cansancio)
        statusBar(".statusBarHunger", hambre)
        statusBar(".statusBarThirst", sed)
        statusBar(".statusBarMood", moral)
        inventario()
        dayNight()
        sunMoon()

    } else {
        alert("No tienes comida en tu mochila.")

    }
}

// Función tomar agua

function tomarAgua() {

    if (sed <= 20) {
        alert("No puedes beber agua, no tienes sed")
    } else if (mochila.some(bebida => bebida.nombre == "Botella") === true) {
        sed -= 30
        cansancio -= 10
        hora += 1
        moral += 10

        //   Si hay botella en el arreglo mochila la botella tiene que Ser
        //   eliminada de mi arreglo cuando el personaje la coma

        // 1-filtro todo los elementos que no son fruta y creo el arreglo filtrados
        // 2-filtro todos los elemento fruta en el arreglo no filtrados

        let filtrados = mochila.filter(element => element != botella)
        let noFiltrados = mochila.filter(element => element == botella)

        // Vació el arreglo mochila

        mochila.length = 0;

        // Pongo los elementos del arreglo filtrados dentro de arreglo mochila

        Array.prototype.push.apply(mochila, filtrados);

        // Filter nos saco todos los elemento botella del arreglo mochila pero el personaje
        // puede tener mas de una botella en el inventario
        // Con el arreglo noFiltrados sabemos cuantas botellas tenia el arreglo mochila
        // Con ciclo for los volvemos a poner dentro de la mochila la cantidad de veces que existiera
        // el elemento fruta en el arreglo - 1 que seria la fruta que el personaje comió

        for (let index = 0; index < noFiltrados.length - 1; index++) {
            mochila.push(botella)
        }


        clock()
        state()
        statusBar(".statusBarHealth", salud)
        statusBar(".statusBarFatigue", cansancio)
        statusBar(".statusBarHunger", hambre)
        statusBar(".statusBarThirst", sed)
        statusBar(".statusBarMood", moral)
        inventario()
        dayNight()
        sunMoon()
    }
}





// Función de la acción dormir .

function dormir() {
    if (cansancio <= 30) {
        alert("No puedes dormir, no tienes sueño.")

    } else {
        hambre += 20
        sed += 20
        cansancio -= 40
        moral += 5
        hora += 5



        clock()
        state()
        statusBar(".statusBarHealth", salud)
        statusBar(".statusBarFatigue", cansancio)
        statusBar(".statusBarHunger", hambre)
        statusBar(".statusBarThirst", sed)
        statusBar(".statusBarMood", moral)
        inventario()
        dayNight()
        sunMoon()

    }
}

// Función de la acción esperar .

function esperar() {
    hora += 3
    sed += 10
    cansancio += 10
    hambre += 20
    moral -= 20

    let frase = Math.ceil(Math.random() * frasesDeEspera.length - 1);
    alert(frasesDeEspera[frase])

    clock()
    state()
    statusBar(".statusBarHealth", salud)
    statusBar(".statusBarFatigue", cansancio)
    statusBar(".statusBarHunger", hambre)
    statusBar(".statusBarThirst", sed)
    statusBar(".statusBarMood", moral)
    inventario()
    dayNight()
    sunMoon()
}

// Función de la acción inventario .


function inventario() {
    mochila.sort()
    let imagenObjeto = mochila.map((element) => element.imagen)
    document.querySelector(".backPackimg").innerHTML = imagenObjeto


    // let nombresMochila = mochila.map((element) => element.nombre)


}

// Función de la acción recolectar .

function recolectar() {

    // Solo se puede recolectar si es de dia

    if (hora > 6 && hora < 19 || mochila.some(element => element.nombre == "Antorcha") === true) {
        cansancio += 40
        sed += 20
        hambre += 20
        hora += 2
        

        recoleccion = []

        // Se recolectan de 1 a 3 objetos al azar según su indice
        // en el arreglo objetos

        let busqueda = Math.ceil(Math.random() * 2)

        for (let index = 0; index < busqueda; index++) {
            let chance = Math.ceil(Math.random() * objetos.length - 1);

            // los objetos recolectados se agregan a la mochila en cada iteración

            mochila.push(objetos[chance])
            recoleccion.push(objetos[chance])
            moral += 1
        }


        recoleccion.sort()
        let nombresRecoleccion = recoleccion.map((element) => element.nombre)
        alert("Recolectaste esto: " + nombresRecoleccion)
        alert("Se agregaron a tu mochila.")



        clock()
        state()
        statusBar(".statusBarHealth", salud)
        statusBar(".statusBarFatigue", cansancio)
        statusBar(".statusBarHunger", hambre)
        statusBar(".statusBarThirst", sed)
        statusBar(".statusBarMood", moral)
        inventario()
        dayNight()
        sunMoon()

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
            cansancio += 30
            sed += 30
            hambre += 20
            hora += 2
            moral += 20

            clock()
            state()
            statusBar(".statusBarHealth", salud)
            statusBar(".statusBarFatigue", cansancio)
            statusBar(".statusBarHunger", hambre)
            statusBar(".statusBarThirst", sed)
            statusBar(".statusBarMood", moral)
            inventario()
            dayNight()
            sunMoon()


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
statusBar(".statusBarThirst", sed)
statusBar(".statusBarMood", moral)
inventario()
dayNight()
sunMoon()





comerB.addEventListener('click', function () {
    comer();
});
tomarB.addEventListener('click', function () {
    tomarAgua();
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