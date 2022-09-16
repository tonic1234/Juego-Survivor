// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>CONSTANTES>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// Elementos del DOM

const comerB = document.querySelector("#comerButton")
const tomarB = document.querySelector("#aguaButton")
const dormirB = document.querySelector("#dormirButton")
const recolectarB = document.querySelector("#recolectarButton")
const fabricarB = document.querySelector("#fabricarButton")
const esperarB = document.querySelector("#esperarButton")
const closeCraft = document.querySelector("#closeIconCraft")
const closeRecollect = document.querySelector("#closeIconRecollect")
const closeMsg = document.querySelector("#closeIconMsg")
const closeInvt = document.querySelector("#closeIconInventory")
const antorchaB = document.querySelector(".antorchaButton")
const fogataB = document.querySelector(".fogataButton")
const recolectorB = document.querySelector(".recolectorButton")
const reStartB = document.querySelector(".reStartButton")
const inventoryB = document.querySelector(".backPackIcon")
const playB = document.querySelector(".startButton")
const inventoryDiscart_1 = document.querySelector("#inventorySlotDiscart_1")
const inventoryDiscart_2 = document.querySelector("#inventorySlotDiscart_2")
const inventoryDiscart_3 = document.querySelector("#inventorySlotDiscart_3")
const inventoryDiscart_4 = document.querySelector("#inventorySlotDiscart_4")
const inventoryDiscart_5 = document.querySelector("#inventorySlotDiscart_5")
const inventoryDiscart_6 = document.querySelector("#inventorySlotDiscart_6")
const inventoryDiscart_7 = document.querySelector("#inventorySlotDiscart_7")
const inventoryDiscart_8 = document.querySelector("#inventorySlotDiscart_8")


// Objetos del juego.


const recolector = {
    nombre: "Recolector de Agua",
    imagen: `<img src="./imagenes/recolectordeagua.png" alt="">`

}

const fogata = {
    nombre: "Fogata",
    imagen: `<img src="./imagenes/fuego.png" alt="">`
}

const antorcha = {
    nombre: "Antorcha",
    imagen: `<img src="./imagenes/antorcha.png" alt="">`
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
    nombre: "Botella Vacia",
    imagen: `<img src="./imagenes/botellavacia.png" alt="">`
}
const botellaLlena = {
    nombre: "Botella con agua",
    imagen: `<img src="./imagenes/botellallena.png" alt="">`
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

// Arreglo de los objetos recolectables.

const objetos = [hoja, palo, piedra, palo, hoja, fruta, piedra, palo, hoja, fruta, piedra, palo, hoja]


// Arreglo de los objetos fabricables.

const fabricables = [antorcha, carnePajaro, fogata, recolector]

// Arreglo de los upgrades del camping.

const campingUpGradeFogata = []
const campingUpGradeRecolector = []
const campingUpGradeAntorcha = []

const tiempoFogata = []
const tiempoRecolector = []
const tiempoAntorcha = []
const tiempoReloj = []

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
let hambre = 50
let sed = 10
let cansancio = 10
let moral = 50


// Variables de dia y hora cada actividad lleva determinada cantidad de horas y se van sumando.

let hora = 12
let dias = 0
let horasTotales
let horasSobrevividas = horasTotales - 12

// Arreglo usado para la recolección y esta formado por
// los elemento que se recolectan en cada iteración.

let recoleccion = []



// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>FUNCIONES>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// Función del progreso del juego

function gameProgress() {
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

// Función de mensajes del juego

function message(messageText) {
    document.querySelector(".messageBox").style.display = "flex";
    document.querySelector(".message").innerHTML = messageText
}

// Función de estados generales

function state() {

    // Función de iconos de upgrades

    function upGrades() {


        // Reglas de duración de los upGrades del camping

        // La fogata dura 24 horas

        if (horasTotales - tiempoFogata[0] == 24) {
            campingUpGradeFogata.shift()
        }

        // La antorcha dura 5 horas

        if (horasTotales - tiempoAntorcha[0] == 5) {
            campingUpGradeAntorcha.shift()
        }

        // El recolector 72 horas

        if (horasTotales - tiempoRecolector[0] == 72) {
            campingUpGradeRecolector.shift()
        }


// Reglas de horario para la fogata, piedras de la fogata y destello del fuego


        if (campingUpGradeFogata.length == 0) {
            document.querySelector(".campFire").style.visibility = `hidden`;
            document.querySelector(".fireRock").style.visibility = `hidden`;
            document.querySelector(".fireRockNigth").style.visibility = `hidden`;
            document.querySelector(".fireglow").style.visibility = `hidden`;
        }

        else if (campingUpGradeFogata.length > 0 && hora >= 6 && hora < 20) {
            document.querySelector(".campFire").style.visibility = `visible`;
            document.querySelector(".fireRock").style.visibility = `visible`;
            document.querySelector(".fireRockNigth").style.visibility = `hidden`;
            document.querySelector(".fireglow").style.visibility = `hidden`;

        } else if (campingUpGradeFogata.length > 0 && hora >= 20 && hora <= 23 || hora >= 0 && hora <= 6) {
            document.querySelector(".campFire").style.visibility = `visible`;
            document.querySelector(".fireRock").style.visibility = `hidden`;
            document.querySelector(".fireRockNigth").style.visibility = `visible`;
            document.querySelector(".fireglow").style.visibility = `visible`;

        } else if (campingUpGradeFogata.length > 0 && hora >= 0 && hora <= 6) {
            document.querySelector(".campFire").style.visibility = `visible`;
            document.querySelector(".fireRock").style.visibility = `hidden`;
            document.querySelector(".fireRockNigth").style.visibility = `visible`;
            document.querySelector(".fireglow").style.visibility = `visible`;
        }

        else {
            document.querySelector(".campFire").style.visibility = `hidden`;
            document.querySelector(".fireRock").style.visibility = `hidden`;
            document.querySelector(".fireRockNigth").style.visibility = `hidden`;
            document.querySelector(".fireglow").style.visibility = `hidden`;
        }
        if (campingUpGradeRecolector.length > 0) {
            document.querySelector(".upgradeIconRecolector").style.visibility = `visible`;

            // Si el recolector esta fabricado se agrega una botella de agua cada 12 horas

            let difTiempoRecolector = horasTotales - tiempoRecolector

            if (difTiempoRecolector % 12 == 0) {
                mochila.push(botellaLlena);
            }

        } else {
            document.querySelector(".upgradeIconRecolector").style.visibility = `hidden`;

        }
        if (campingUpGradeAntorcha.length > 0) {
            document.querySelector(".upgradeIconAntorcha").style.visibility = `visible`;

        } else {
            document.querySelector(".upgradeIconAntorcha").style.visibility = `hidden`;
        }


    }

    // Función que vuelve borrosa la pantalla si el personaje tiene mucho cansancio

    function blur() {
        if (cansancio > 80) {
            message("Estas muy cansado te estas quedando  dormido")
            document.querySelector("#body").style.filter = `blur(1px)`
        } else if (cansancio <= 80) {
            document.querySelector("#body").style.filter = `blur(0px)`
        } else if (cansancio > 100) {
            dormir()
        } else if (cansancio < 0) {
            cansancio = 100
        }
    }

    // Función que vuelve gris la pantalla si el personaje tiene bajo animo

    function grayscale() {

        if (moral <= 25) {
            document.querySelector(".gameBox").style.filter = `grayscale(100%)`;
        } else if (moral > 25 && moral <= 35) {
            document.querySelector(".gameBox").style.filter = `grayscale(70%)`;
        } else if (moral > 35 && moral <= 40) {
            document.querySelector(".gameBox").style.filter = `grayscale(50%)`;
        } else {
            document.querySelector(".gameBox").style.filter = `grayscale(0%)`;
        }
    }
    // Función hace temblar los iconos de estado si un stats esta al limite 

    function shakeIcon() {

        if (salud < 20) {
            document.querySelector(".StatusIconSalud").classList.toggle('satusIconShake');
        } else {
            document.querySelector(".StatusIconSalud").style.animationName = ` `;
        }
        if (cansancio > 80) {
            document.querySelector(".StatusIconCansancio").classList.toggle('satusIconShake');
        } else {
            document.querySelector(".StatusIconCansancio").style.animationName = ` `;
        }
        if (hambre > 80) {
            document.querySelector(".StatusIconHambre").classList.toggle('satusIconShake');
        } else {
            document.querySelector(".StatusIconHambre").style.animationName = ` `;
        }
        if (sed > 80) {
            document.querySelector(".StatusIconSed").classList.toggle('satusIconShake');
        } else {
            document.querySelector(".StatusIconSed").style.animationName = ` `;
        }
        if (moral < 20) {
            document.querySelector(".StatusIconMoral").classList.toggle('satusIconShake');
        } else {
            document.querySelector(".StatusIconMoral").style.animationName = ` `;
        }


    }

    // Función que ejecuta shakeIcon cada determinado tiempo

    setInterval(function () {
        shakeIcon()
    }, 1500);

    shakeIcon()
    blur()
    grayscale()
    upGrades()

    // Si salud llega a cero se recupera el objeto Json y se imprime el nombre

    if (salud <= 0) {
        document.querySelector(".statusBarHealth").style.width = "0px";
        document.querySelector(".loseBox").style.display = `flex`;
        let objetoJson = JSON.parse(localStorage.getItem(1))
        document.querySelector(".timeScore").innerHTML = objetoJson.nombre + " has sobrevivido " + (horasTotales - 12) + ":00 horas";
    }


    if (hambre > 80) {
        salud -= 1
    }
    if (hambre < 30) {
        salud += 1
    }
    if (hambre < 10) {
        salud += 2
    }

    if (sed > 80) {
        salud -= 2
    }
    if (sed < 30) {
        salud += 1
    }
    if (sed < 10) {
        salud += 2
    }


    if (campingUpGradeFogata.length > 0) {
        moral += 1
    }


    if (moral > 100) {
        moral = 100
    }
    if (moral < 0) {
        moral = 0
    }

    if (hambre > 100) {
        hambre = 100
    }
    if (hambre < 0) {
        hambre = 0
    }

    if (sed > 100) {
        sed = 100
    }
    if (sed < 0) {
        sed = 0
    }
    if (salud > 100) {
        salud = 100
    }



}


// Función del reloj

function clock() {




    function clockPrint() {
        document.querySelector(".timeText").innerHTML = hora + ":00 hs";
        document.querySelector(".dayText").innerHTML = "Día: " + dias;
        return
    }


    if (hora == 24) {
        hora = 0
        dias += 1
        clockPrint()

    } else if (hora > 24) {
        let saldoHoras = hora - 24
        hora = saldoHoras
        dias += 1
        clockPrint()

    } else {
        clockPrint()
    }

    if (dias == 0) {
        horasTotales = hora
    } else {
        horasTotales = (dias * 24) + hora
    }


}

// Función del sol y la luna. Funciona con una imagen circular con el sol y la luna de lados opuestos
// que va girando 15 grados según pasa la hora

function sunMoon() {
    let hourDivition = horasTotales * 15
    let hourV = -(hourDivition) + 180
    document.querySelector(".sunMoonImg").style.transform = 'rotate(' + hourV + 'deg)';

}

// Función del cielo. cambia cielo y fondo según la hora y modifica el camping 

function dayNight() {
    if (hora >= 6 && hora < 17) {
        document.querySelector("body").style.backgroundImage = "url(../imagenes/cielodiabg.png)";
        document.querySelector(".sky").style.backgroundImage = "url(../imagenes/cielodia.png)";
        document.querySelector(".camping").style.backgroundImage = "url(../imagenes/campingdia.png)"

    } else if (hora >= 17 && hora <= 19) {
        document.querySelector("body").style.backgroundImage = "url(../imagenes/cielotardebg.png)";
        document.querySelector(".sky").style.backgroundImage = "url(../imagenes/cielotarde.png)";
        document.querySelector(".camping").style.backgroundImage = "url(../imagenes/campingdia.png)"

    } else {
        document.querySelector("body").style.backgroundImage = "url(../imagenes/cielonochebg.png)";
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

        message("No puedes comer, no tienes hambre")

        // Con el método some verifico si Frutas Silvestres que es
        //  el único alimento por el momento esta en mi arreglo mochila

    } else if (mochila.some(alimento => alimento.nombre == "Fruta Silvestre") === true) {
        hambre -= fruta.valNut
        cansancio += 5
        sed -= 15
        moral += 10
        hora += 1

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

        gameProgress()

    } else {
        message("No tienes alimentos en tu mochila")

    }
}

// Función tomar agua

function tomarAgua() {


    if (mochila.some(bebida => bebida.nombre == "Botella con agua") === false) {
        message("No tienes agua para beber")
    }
    else if (sed <= 20) {
        message("No puedes beber agua, no tienes sed")
    }

    else if (mochila.some(bebida => bebida.nombre == "Botella con agua") === true) {
        sed -= 20
        cansancio -= 5
        moral += 10
        hora += 1

        let filtrados = mochila.filter(element => element != botellaLlena)
        let noFiltrados = mochila.filter(element => element == botellaLlena)

        // Vació el arreglo mochila

        mochila.length = 0;

        // Pongo los elementos del arreglo filtrados dentro de arreglo mochila

        Array.prototype.push.apply(mochila, filtrados);


        for (let index = 0; index < noFiltrados.length - 1; index++) {
            mochila.push(botellaLlena)
        }

        gameProgress()
    }
}





// Función de la acción dormir .

function dormir() {
    if (cansancio <= 30) {
        message("No puedes dormir, no tienes sueño")

    } else {
        hambre += 20
        sed += 20
        cansancio -= 40
        moral += 5

        // En las actividades que llevan mas de una hora las horas iteran para pasar por los estados
        // de cada hora y que no se salteen 

        for (let index = 0; index < 5; index++) {
            (hora++)
            gameProgress()

        }
    }
}

// Función de la acción esperar .

function esperar() {

    sed += 10
    cansancio += 10
    hambre += 10
    moral -= 20

    for (let index = 0; index < 3; index++) {
        (hora++)
        gameProgress()
    }

    let frase = Math.ceil(Math.random() * frasesDeEspera.length - 1);

    message(frasesDeEspera[frase])
}

// Función de la acción inventario .


function inventario() {


    // Si la mochila tiene mas de 8 elementos se borra el primer elemento del arreglo 

    if (mochila.length > 8) {
        mochila.shift();
    }

    // cada elemento del inventario aparce en la mochila y también en el menu inventario
    // de donde se pueden tirar y dejan libre el lugar

    if (mochila.length == 1) {
        let inventorySlot_1 = mochila.map((element) => element.imagen)
        document.querySelector("#inventorySlot_1").innerHTML = inventorySlot_1[0]
        document.querySelector("#inventorySlot_2").innerHTML = ""
        document.querySelector("#inventorySlot_3").innerHTML = ""
        document.querySelector("#inventorySlot_4").innerHTML = ""
        document.querySelector("#inventorySlot_5").innerHTML = ""
        document.querySelector("#inventorySlot_6").innerHTML = ""
        document.querySelector("#inventorySlot_7").innerHTML = ""
        document.querySelector("#inventorySlot_8").innerHTML = ""

    }
    if (mochila.length == 2) {
        let inventorySlot_1 = mochila.map((element) => element.imagen)
        document.querySelector("#inventorySlot_1").innerHTML = inventorySlot_1[0]
        let inventorySlot_2 = mochila.map((element) => element.imagen)
        document.querySelector("#inventorySlot_2").innerHTML = inventorySlot_2[1]
        document.querySelector("#inventorySlot_3").innerHTML = ""
        document.querySelector("#inventorySlot_4").innerHTML = ""
        document.querySelector("#inventorySlot_5").innerHTML = ""
        document.querySelector("#inventorySlot_6").innerHTML = ""
        document.querySelector("#inventorySlot_7").innerHTML = ""
        document.querySelector("#inventorySlot_8").innerHTML = ""
    }
    if (mochila.length == 3) {
        let inventorySlot_1 = mochila.map((element) => element.imagen)
        document.querySelector("#inventorySlot_1").innerHTML = inventorySlot_1[0]
        let inventorySlot_2 = mochila.map((element) => element.imagen)
        document.querySelector("#inventorySlot_2").innerHTML = inventorySlot_2[1]
        let inventorySlot_3 = mochila.map((element) => element.imagen)
        document.querySelector("#inventorySlot_3").innerHTML = inventorySlot_3[2]
        document.querySelector("#inventorySlot_4").innerHTML = ""
        document.querySelector("#inventorySlot_5").innerHTML = ""
        document.querySelector("#inventorySlot_6").innerHTML = ""
        document.querySelector("#inventorySlot_7").innerHTML = ""
        document.querySelector("#inventorySlot_8").innerHTML = ""
    }
    if (mochila.length == 4) {
        let inventorySlot_1 = mochila.map((element) => element.imagen)
        document.querySelector("#inventorySlot_1").innerHTML = inventorySlot_1[0]
        let inventorySlot_2 = mochila.map((element) => element.imagen)
        document.querySelector("#inventorySlot_2").innerHTML = inventorySlot_2[1]
        let inventorySlot_3 = mochila.map((element) => element.imagen)
        document.querySelector("#inventorySlot_3").innerHTML = inventorySlot_3[2]
        let inventorySlot_4 = mochila.map((element) => element.imagen)
        document.querySelector("#inventorySlot_4").innerHTML = inventorySlot_4[3]
        document.querySelector("#inventorySlot_5").innerHTML = ""
        document.querySelector("#inventorySlot_6").innerHTML = ""
        document.querySelector("#inventorySlot_7").innerHTML = ""
        document.querySelector("#inventorySlot_8").innerHTML = ""
    }
    if (mochila.length == 5) {
        let inventorySlot_1 = mochila.map((element) => element.imagen)
        document.querySelector("#inventorySlot_1").innerHTML = inventorySlot_1[0]
        let inventorySlot_2 = mochila.map((element) => element.imagen)
        document.querySelector("#inventorySlot_2").innerHTML = inventorySlot_2[1]
        let inventorySlot_3 = mochila.map((element) => element.imagen)
        document.querySelector("#inventorySlot_3").innerHTML = inventorySlot_3[2]
        let inventorySlot_4 = mochila.map((element) => element.imagen)
        document.querySelector("#inventorySlot_4").innerHTML = inventorySlot_4[3]
        let inventorySlot_5 = mochila.map((element) => element.imagen)
        document.querySelector("#inventorySlot_5").innerHTML = inventorySlot_5[4]
        document.querySelector("#inventorySlot_6").innerHTML = ""
        document.querySelector("#inventorySlot_7").innerHTML = ""
        document.querySelector("#inventorySlot_8").innerHTML = ""
    }
    if (mochila.length == 6) {
        let inventorySlot_1 = mochila.map((element) => element.imagen)
        document.querySelector("#inventorySlot_1").innerHTML = inventorySlot_1[0]
        let inventorySlot_2 = mochila.map((element) => element.imagen)
        document.querySelector("#inventorySlot_2").innerHTML = inventorySlot_2[1]
        let inventorySlot_3 = mochila.map((element) => element.imagen)
        document.querySelector("#inventorySlot_3").innerHTML = inventorySlot_3[2]
        let inventorySlot_4 = mochila.map((element) => element.imagen)
        document.querySelector("#inventorySlot_4").innerHTML = inventorySlot_4[3]
        let inventorySlot_5 = mochila.map((element) => element.imagen)
        document.querySelector("#inventorySlot_5").innerHTML = inventorySlot_5[4]
        let inventorySlot_6 = mochila.map((element) => element.imagen)
        document.querySelector("#inventorySlot_6").innerHTML = inventorySlot_6[5]
        document.querySelector("#inventorySlot_7").innerHTML = ""
        document.querySelector("#inventorySlot_8").innerHTML = ""
    }
    if (mochila.length == 7) {
        let inventorySlot_1 = mochila.map((element) => element.imagen)
        document.querySelector("#inventorySlot_1").innerHTML = inventorySlot_1[0]
        let inventorySlot_2 = mochila.map((element) => element.imagen)
        document.querySelector("#inventorySlot_2").innerHTML = inventorySlot_2[1]
        let inventorySlot_3 = mochila.map((element) => element.imagen)
        document.querySelector("#inventorySlot_3").innerHTML = inventorySlot_3[2]
        let inventorySlot_4 = mochila.map((element) => element.imagen)
        document.querySelector("#inventorySlot_4").innerHTML = inventorySlot_4[3]
        let inventorySlot_5 = mochila.map((element) => element.imagen)
        document.querySelector("#inventorySlot_5").innerHTML = inventorySlot_5[4]
        let inventorySlot_6 = mochila.map((element) => element.imagen)
        document.querySelector("#inventorySlot_6").innerHTML = inventorySlot_6[5]
        let inventorySlot_7 = mochila.map((element) => element.imagen)
        document.querySelector("#inventorySlot_7").innerHTML = inventorySlot_7[6]
        document.querySelector("#inventorySlot_8").innerHTML = ""
    }
    if (mochila.length == 8) {
        let inventorySlot_1 = mochila.map((element) => element.imagen)
        document.querySelector("#inventorySlot_1").innerHTML = inventorySlot_1[0]
        let inventorySlot_2 = mochila.map((element) => element.imagen)
        document.querySelector("#inventorySlot_2").innerHTML = inventorySlot_2[1]
        let inventorySlot_3 = mochila.map((element) => element.imagen)
        document.querySelector("#inventorySlot_3").innerHTML = inventorySlot_3[2]
        let inventorySlot_4 = mochila.map((element) => element.imagen)
        document.querySelector("#inventorySlot_4").innerHTML = inventorySlot_4[3]
        let inventorySlot_5 = mochila.map((element) => element.imagen)
        document.querySelector("#inventorySlot_5").innerHTML = inventorySlot_5[4]
        let inventorySlot_6 = mochila.map((element) => element.imagen)
        document.querySelector("#inventorySlot_6").innerHTML = inventorySlot_6[5]
        let inventorySlot_7 = mochila.map((element) => element.imagen)
        document.querySelector("#inventorySlot_7").innerHTML = inventorySlot_7[6]
        let inventorySlot_8 = mochila.map((element) => element.imagen)
        document.querySelector("#inventorySlot_8").innerHTML = inventorySlot_8[7]
    }


    let imagenObjeto = mochila.map((element) => element.imagen)
    setTimeout(function () {
        document.querySelector(".backPackimg").innerHTML = imagenObjeto
    }, 500);



}

// Función de la acción recolectar .

function recolectar() {

    // Solo se puede recolectar si es de dia


    if (hora > 6 && hora < 19 || campingUpGradeAntorcha.length > 0) {


        recoleccion = []

        // Se recolectan de 1 a 3 objetos al azar según su indice
        // en el arreglo objetos

        let busqueda = 3

        for (let index = 0; index < busqueda; index++) {
            let chance = Math.ceil(Math.random() * objetos.length - 1);

            // los objetos recolectados se agregan a la mochila en cada iteración
            mochila.push(objetos[chance])
            recoleccion.push(objetos[chance])
            moral += 1
        }

        setTimeout(function () {
            let imagenRecoleccionOne = recoleccion[0].imagen
            document.querySelector(".recollectOne").innerHTML = imagenRecoleccionOne
        }, 3000);

        setTimeout(function () {
            let imagenRecoleccionTwo = recoleccion[1].imagen
            document.querySelector(".recollectTwo").innerHTML = imagenRecoleccionTwo
        }, 4500);

        setTimeout(function () {
            let nombresRecoleccionThree = recoleccion[2].imagen
            document.querySelector(".recollectThree").innerHTML = nombresRecoleccionThree
        }, 6000);


        cansancio += 40
        sed += 20
        hambre += 20
        for (let index = 0; index < 2; index++) {
            (hora++)
            gameProgress()

        }


    }


    else {
        document.querySelector(".recollectBox").style.display = "none";
        message("Necesitas algo que te ilumine para poder recolectar de noche");

    }
}


// Función de la acción fabricar .

function fabricar() {

    let palos = mochila.filter(element => element == palo)
    let hojas = mochila.filter(element => element == hoja)
    let piedras = mochila.filter(element => element == piedra)
    let botellas = mochila.filter(element => element == botella)

    function fabricarRecolector() {

        message("Fabricaste un recolector")
        tiempoRecolector.push(horasTotales)
        campingUpGradeRecolector.push(recolector)
        document.querySelector(".craftingBox").style.display = "none";

        const noFiltrados = mochila.filter(element => element != hoja && element != botella)
        const hojasFiltradas = mochila.filter(element => element == hoja)
        const botellasFiltrados = mochila.filter(element => element == botella)

        // Vació el arreglo mochila

        mochila.length = 0;

        // Pongo los elementos del arreglo filtrados dentro de arreglo mochila

        Array.prototype.push.apply(mochila, noFiltrados);



        for (let index = 0; index < hojasFiltradas.length - 4; index++) {
            mochila.push(hoja)
        }

        for (let index = 0; index < botellasFiltrados.length - 1; index++) {
            mochila.push(botella)
        }


        fogataB.removeEventListener('click', fabricarFogata);

        antorchaB.removeEventListener('click', fabricarAntorcha);

        recolectorB.removeEventListener('click', fabricarRecolector);


        cansancio += 30
        sed += 30
        hambre += 20
        moral += 20
        for (let index = 0; index < 2; index++) {
            (hora++)
            gameProgress()

        }


    }

    function fabricarAntorcha() {
        message("Fabricaste una antorcha")
        tiempoAntorcha.push(horasTotales)
        document.querySelector(".craftingBox").style.display = "none";
        campingUpGradeAntorcha.push(antorcha)



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


        fogataB.removeEventListener('click', fabricarFogata);

        antorchaB.removeEventListener('click', fabricarAntorcha);

        recolectorB.removeEventListener('click', fabricarRecolector);



        cansancio += 30
        sed += 30
        hambre += 20
        moral += 20
        for (let index = 0; index < 2; index++) {
            (hora++)
            gameProgress()
        }


    }

    function fabricarFogata() {

        message("Fabricaste una fogata")
        tiempoFogata.push(horasTotales)
        document.querySelector(".craftingBox").style.display = "none";
        campingUpGradeFogata.push(fogata)


        const noFiltrados = mochila.filter(element => element != piedra && element != palo)
        const piedrasFiltradas = mochila.filter(element => element == piedra)
        const palosFiltrados = mochila.filter(element => element == palo)

        // Vació el arreglo mochila

        mochila.length = 0;

        // Pongo los elementos del arreglo filtrados dentro de arreglo mochila

        Array.prototype.push.apply(mochila, noFiltrados);

        for (let index = 0; index < piedrasFiltradas.length - 2; index++) {
            mochila.push(piedra)
        }

        for (let index = 0; index < palosFiltrados.length - 3; index++) {
            mochila.push(palo)
        }


        fogataB.removeEventListener('click', fabricarFogata);

        antorchaB.removeEventListener('click', fabricarAntorcha);

        recolectorB.removeEventListener('click', fabricarRecolector);

        cansancio += 30
        sed += 30
        hambre += 20
        moral += 20
        for (let index = 0; index < 2; index++) {
            (hora++)
            gameProgress()
        }



    }
    // Reglas del menu de fabricar

    if (botellas.length >= 1 && hojas.length >= 4) {
        document.querySelector(".recolectorButton").style.filter = `grayscale(0%)`;
        document.querySelector(".recolectorButton").style.opacity = `100%`;
        recolectorB.addEventListener('click', fabricarRecolector);

    } else {

        document.querySelector(".recolectorButton").style.filter = `grayscale(100%)`;
        document.querySelector(".recolectorButton").style.opacity = `30%`;
        recolectorB.removeEventListener('click', fabricarRecolector);
    }

    if (palos.length >= 1 && hojas.length >= 2) {
        document.querySelector(".antorchaButton").style.filter = `grayscale(0%)`;
        document.querySelector(".antorchaButton").style.opacity = `100%`;
        antorchaB.addEventListener('click', fabricarAntorcha);
    } else {
        document.querySelector(".antorchaButton").style.filter = `grayscale(100%)`;
        document.querySelector(".antorchaButton").style.opacity = `30%`;
        antorchaB.removeEventListener('click', fabricarAntorcha);
    }



    if (palos.length >= 3 && piedras.length >= 2) {
        document.querySelector(".fogataButton").style.filter = `grayscale(0%)`;
        document.querySelector(".fogataButton").style.opacity = `100%`;
        fogataB.addEventListener('click', fabricarFogata);

    } else {
        document.querySelector(".fogataButton").style.filter = `grayscale(100%)`;
        document.querySelector(".fogataButton").style.opacity = `30%`;
        fogataB.removeEventListener('click', fabricarFogata);

    }

}


// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>INICIO DEL PROGRAMA>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//Pantalla de carga


setTimeout(function () {
    document.querySelector(".loadScreen").style.backgroundImage = "url(../imagenes/cielodiabg.png)";
}, 2500);

setTimeout(function () {
    document.querySelector(".loadScreen").style.backgroundImage = "url(../imagenes/cielotardebg.png)";
}, 3500);

setTimeout(function () {
    document.querySelector(".loadScreen").style.backgroundImage = "url(../imagenes/cielonochebg.png)";
}, 4500);

setTimeout(function () {
    document.querySelector(".loadScreen").style.opacity = "0";
}, 7500);

setTimeout(function () {
    document.querySelector(".loadScreen").style.display = "none";
}, 10000);




//Botones de la interfaz


playB.addEventListener('click', function () {

    let jugador = document.querySelector(".nameBox").value
    const player = {
        nombre: jugador
    }
    //Se pide el nombre del jugador y luego se guarda en el local Storage para ser utilizado después
    localStorage.setItem(1, JSON.stringify(player))
    document.querySelector(".menuBg").classList.toggle('menuBgOut');


    setTimeout(function () {
        document.querySelector(".menuBg").style.display = "none";
    }, 2500);

});

message(`Te despiertas en un bosque junto a una carpa, tienes un gran
dolor de cabeza y no recuerdas nada, absolutamente nada.
En el suelo, a pocos metros de ti, hay una mochila. La agarras,
tiene una botella vacía, algunas hojas con instrucciones para fabricar
elementos de supervivencia y un reloj que funciona pero tiene la correa rota.`)

gameProgress()


comerB.addEventListener('click', function () {
    comer();
});
tomarB.addEventListener('click', function () {
    tomarAgua();
});
dormirB.addEventListener('click', function () {
    dormir();
});

function botonRecolectar() {
    document.querySelector(".recollectBox").style.display = "flex";
    recolectar();
}
recolectarB.addEventListener('click', botonRecolectar);

closeRecollect.addEventListener('click', function () {
    document.querySelector(".recollectBox").style.display = "none";
    recoleccion = []
    document.querySelector(".recollectOne").innerHTML = `<lottie-player class="loadRecollect" src="./imagenes/loaddots.json" speed="1" loop autoplay>
    </lottie-player> `;
    document.querySelector(".recollectTwo").innerHTML = ` <lottie-player class="loadRecollect" src="./imagenes/loaddots.json" speed="1" loop autoplay>
    </lottie-player>`;
    document.querySelector(".recollectThree").innerHTML = `<lottie-player class="loadRecollect" src="./imagenes/loaddots.json" speed="1" loop autoplay>
    </lottie-player> `;
});

esperarB.addEventListener('click', function () {
    esperar();
});

fabricarB.addEventListener('click', function () {
    document.querySelector(".craftingBox").style.display = "flex";
    fabricar()
});


inventoryB.addEventListener('click', function () {
    document.querySelector(".inventoryBox").style.display = "flex";

});



closeMsg.addEventListener('click', function () {
    document.querySelector(".messageBox").style.display = "none";
});

closeCraft.addEventListener('click', function () {
    document.querySelector(".craftingBox").style.display = "none";
    document.querySelector(".messageBox").style.display = "none";
});

closeInvt.addEventListener('click', function () {
    document.querySelector(".inventoryBox").style.display = "none";
});

reStartB.addEventListener('click', function () {
    window.location.reload()
});

inventoryDiscart_1.addEventListener('click', function () {
    mochila.splice(0, 1)
    document.querySelector("#inventorySlot_1").innerHTML = ""
    gameProgress()
});
inventoryDiscart_2.addEventListener('click', function () {
    mochila.splice(1, 1)
    document.querySelector("#inventorySlot_2").innerHTML = ""
    gameProgress()
});
inventoryDiscart_3.addEventListener('click', function () {
    mochila.splice(2, 1)
    document.querySelector("#inventorySlot_3").innerHTML = ""
    gameProgress()
});
inventoryDiscart_4.addEventListener('click', function () {
    mochila.splice(3, 1)
    document.querySelector("#inventorySlot_4").innerHTML = ""
    gameProgress()
});
inventoryDiscart_5.addEventListener('click', function () {
    mochila.splice(4, 1)
    document.querySelector("#inventorySlot_5").innerHTML = ""
    gameProgress()
});
inventoryDiscart_6.addEventListener('click', function () {
    mochila.splice(5, 1)
    document.querySelector("#inventorySlot_6").innerHTML = ""

    gameProgress()
});
inventoryDiscart_7.addEventListener('click', function () {
    mochila.splice(6, 1)
    document.querySelector("#inventorySlot_7").innerHTML = ""
    gameProgress()
});
inventoryDiscart_8.addEventListener('click', function () {
    mochila.splice(7, 1)
    document.querySelector("#inventorySlot_8").innerHTML = ""
    gameProgress()
});