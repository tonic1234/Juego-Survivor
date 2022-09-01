// Stats del personaje

let salud = 100
let hambre = 40
let cansancio = 10

// Variables de dia y hora cada actividad lleva determinada cantidad de horas y se van sumando.

let hora = 22
let dias = 0

// Objetos del juego.


const antorcha = {
    nombre: "Antorcha",
    peso: 1            
}

const hoja = {
    nombre: "Hoja",
    peso: 1
}
const palo = {
    nombre: "Palo",
    peso: 1
}
const buzo = {
    nombre: "Buzo de lana",
    peso: 2
}
const reloj = {
    nombre: "Reloj",
    peso: 1
}
const fruta = {
    nombre: "Fruta Silvestre",
    peso: 1,
    valNut: 15,
    moral: 10
}
const gusano = {
    nombre: "Gusano",
    peso: 1,
    valNut: 2,
    moral: -10
}


// Arreglo de la mochila del jugador.

const mochila = [buzo, reloj, palo, hoja, hoja]

// Arreglo de los objetos que hay en el juego.

const objetos = [palo, fruta, gusano, hoja]

// Arreglo usado para la recolección y esta formado por 
// los elemento que se recolectan en cada iteración.

let recoleccion = []

// Arreglo de frases para la pantalla de espera .

const frasesDeEspera = ["Te sientas bajo un árbol a esperar que pasen algunas horas",
    "Miras las hormigas llevar hojas a su hormiguero para entretenerte algunas horas",
    "Escuchas como los pájaros cantan y esperas que pase el tiempo",
    "Buscas formas en las nubes para pasar el rato",
    "Intentas buscar recuerdos en tu memoria y pasan algunas horas"
]

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
            mochila.push("Frutas Silvestres")
        }
        alert("Tu nivel de hambre es: " + hambre)

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
        alert("Tu nivel de sueño es: " + cansancio)

    }
}

// Función de la acción esperar .

function esperar() {
    hora += 3
    cansancio += 30
    hambre += 20
    let frase = Math.ceil(Math.random() * frasesDeEspera.length - 1);
    alert(frasesDeEspera[frase])
}

// Función de la acción inventario .


function inventario() {
    if (mochila.length === 0) {
        alert("Tu mochila esta vacía. Sal a recolectar a ver qué puedes encontrar.")

    } else {

        mochila.sort()
        let nombresMochila = mochila.map((element) => element.nombre)
        alert(nombresMochila)
    }
}

// Función de la acción recolectar .

function recolectar() {

    // Solo se puede recolectar si es de dia

    if (hora > 6 && hora < 19 || mochila.some(element => element.nombre == "Antorcha") === true) {
        cansancio += 30
        hambre += 10
        hora += 4

        recoleccion = []

        // Se recolectan 3 objetos al azar según su indice
        // en el arreglo objetos

        for (let index = 0; index < 3; index++) {
            let chance = Math.ceil(Math.random() * objetos.length - 1);

            // los objetos recolectados se agregan a la mochila en cada iteración

            mochila.push(objetos[chance])
            recoleccion.push(objetos[chance])
        }

        
        recoleccion.sort()
        let nombresRecoleccion = recoleccion.map((element) => element.nombre)
        alert("Recolectaste esto: " + nombresRecoleccion)
        alert("Se agregaron a tu mochila.")
    } else {
        alert("Es de noche, no puedes recolectar.");

    }
}



function fabricar() {
    
    let palos = mochila.filter(element => element == palo)
    let hojas = mochila.filter(element => element == hoja)

    if (palos.length >= 1 && hojas.length >= 2){
        alert("Puedes fabricar una antorcha para poder recolectar en la noche")
        alert("PALO X1 HOJA X2")
       let fAction = prompt("Fabricar antorcha? 1-Si 2-No")
       
       if (fAction == 1){
        alert("fabricaste una antorcha")
        
        mochila.push(antorcha)
        const hFiltrados = mochila.filter(element => element != hoja)
        const hNoFiltrados = mochila.filter(element => element == hoja)
        const pFiltrados = mochila.filter(element => element != palo)
        const phNoFiltrados = mochila.filter(element => element == palo)

        // Vació el arreglo mochila

        mochila.length = 0;

        // Pongo los elementos del arreglo filtrados dentro de arreglo mochila

        Array.prototype.push.apply(mochila, hFiltrados, pFiltrados);

        for (let index = 0; index < hNoFiltrados.length - 2; index++) {
            mochila.push(hoja)
        }
        for (let index = 0; index < phNoFiltrados.length - 1; index++) {
            mochila.push(palo)
        }
       }
       else if (fAction == 2){

       }
    }
    else{
        alert("No tienes materiales suficientes para fabricar nada")
    }
        
}

// Función de la acción estado de salud .

function estadoSalud() {
    alert("Tu salud es: " + salud)
    alert("Tu nivel de cansancio es: " + cansancio)
    alert("Tu nivel de hambre es: " + hambre)
}
// alert (mochila.some(alimento => alimento.nombre == "Fruta Silvestre"))
// alert (mochila)

alert("Este juego utiliza el modelo de procesamiento gráfico más potente del mercado...")
alert("Tu imaginación")
alert(` ---------------------------------------------------
        Despiertas en un bosque, tienes un gran
        dolor de cabeza y no recuerdas nada, absolutamente nada.
        En el suelo, a pocos metros de ti, hay una mochila. La agarras,
        tiene un buzo de lana que en la etiqueta dice Javier y
        un reloj que funciona pero tiene la correa rota.
        ----------------------------------------------------`)

while (salud > 0) {


    if (hambre > 100) {
        salud -= 10
        alert("Tienes hambre, tu salud está bajando. Salud: " + salud)
    }
    if (cansancio > 100) {
        alert("Tienes mucho sueño te quedas dormido")
        dormir()
    }

    // Cada 24 horas se suma un dia 
    // si una actividad queda entre medio de dos días
    // esas horas se suman al dia siguiente

    if (hora == 24) {
        hora = 0
        dias++

    } else if (hora >= 24) {
        let saldoHoras = hora - 24
        hora = saldoHoras
        dias++

    }


    alert("¿Qué quieres hacer?")
    alert("Son las: " + hora + " horas del día " + dias)
    let sAction = prompt(`-----------------
    1-Comer.
    2-Dormir.
    3-Ver mochila.
    4-Recolectar.
    5-Fabricar.
    6-Esperar.
    7-Estado de salud.
    8-Salir del juego.
    -----------------`)
    if (sAction >= 1 && sAction <= 8) {
        if (sAction == 1) {
            comer();
        } else if (sAction == 2) {
            dormir();
        } else if (sAction == 3) {
            inventario();
        } else if (sAction == 4) {
            recolectar()
        } else if (sAction == 5) {
            fabricar()
        } else if (sAction == 6) {
            esperar()
        } else if (sAction == 7) {
            estadoSalud()
        } else if (sAction == 8) {
            break;
        }

    } else {
        alert("Opción inválida, intente nuevamente")
    }

}
if (salud <= 0) {
    alert("Has muerto, Game Over")
} else {
    alert("Gracias por jugar")
}