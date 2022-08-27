let salud = 100
let hambre = 40
let cansancio = 10
let hora = 9
let dias = 0
const mochila = []
const articulos = ["Palo", "Frutas Silvestres", "Piedra", "Hoja de Palmera"]
let recoleccion = []

function comer() {
    if (hambre < 20) {
        alert("No puedes comer no tienes hambre")

    } else if (mochila.includes("Frutas Silvestres") === true) {
        hambre -= 5
        cansancio += 20
        hora += 1
        const filtrados = mochila.filter(element => element != "Frutas Silvestres")
        mochila.length = 0;
        Array.prototype.push.apply(mochila, filtrados);
        alert("Tu nivel de hambre es " + hambre)
    } else {
        alert("No tienes comida en tu mochila")

    }
}

function dormir() {
    if (cansancio < 10) {
        alert("No puedes dormir no tienes sueño")

    } else {
        cansancio -= 30
        hambre += 20
        hora += 6
        alert("Tu nivel de sueño es " + cansancio)

    }
}

function inventario() {
    if (mochila.length === 0) {
        alert("Tu mochila esta vacía sal a recolectar para juntar cosas")

    } else {
        alert("Esto hay en tu mochila  " + mochila)

    }
}

function recolectar() {
    if (hora > 6 && hora < 19) {
        cansancio += 30
        hambre += 10
        hora += 4
        let recoleccion = []
        for (let index = 0; index < 3; index++) {
            let chance = Math.ceil(Math.random() * articulos.length - 1);
            mochila.push(articulos[chance])
            recoleccion.push(articulos[chance])
        }
        alert("Recolectaste esto " + recoleccion)
        alert("Se agregaron a tu mochila")

    } else {
        alert("Es de noche no puedes recolectar");

    }
}

function estadoSalud() {
    alert("Tu salud es: " + salud)
    alert("Tu nivel de cansancio es: " + cansancio)
    alert("Tu nivel de hambre es: " + hambre)
}

while (salud > 0) {
    if (hambre < 10) {
        salud--
        alert("tienes hambre tu salud esta bajando. Salud " + salud)
    }

    if (hora == 24) {
        hora = 0
        dias++

    } else if (hora >= 24) {
        let saldoHoras = hora - 24
        hora = saldoHoras
        dias++

    }
    alert("que quieres hacer?")
    alert("son las " + hora + " horas del dia " + dias)
    sAction = prompt("1-Comer 2-Dormir 3-Ver mochila 4-Recolectar 5-Estado de salud")
    if (sAction == "1") {
        comer();
    } else if (sAction == "2") {
        dormir();
    } else if (sAction == "3") {
        inventario();
    } else if (sAction == "4") {
        recolectar()
    } else if (sAction == "5") {
        estadoSalud()
    }

}
alert("Has muerto")