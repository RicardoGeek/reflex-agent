const estados = {
    'estado1': ['A', 'DIRTY', 'DIRTY'],
    'estado2': ['B', 'DIRTY', 'DIRTY'],
    'estado3': ['A', 'CLEAN', 'DIRTY'],
    'estado4': ['B', 'CLEAN', 'DIRTY'],
    'estado5': ['A', 'DIRTY', 'CLEAN'],
    'estado6': ['B', 'DIRTY', 'CLEAN'],
    'estado7': ['A', 'CLEAN', 'CLEAN'],
    'estado8': ['B', 'CLEAN', 'CLEAN']
}

let actual = ['A', 'DIRTY', 'DIRTY']

const reflexAgent = () => {
    const name = getName(actual)
    visitarEstado(name)

    const sucioDeNuevo = Math.floor(Math.random() * 101);
    const seEnsucio = sucioDeNuevo < 75;

    if (actual[0] == "A" && actual[1] == "DIRTY") {
        actual[1] = "CLEAN";
    } else if (actual[0] == "A" && actual[1] == "CLEAN") {
        actual[0] = "B";
        if(seEnsucio) {
            actual[1] = "DIRTY"
        }
    } else if (actual[0] == "B" && actual[2] == "DIRTY") {
        actual[2] = "CLEAN"; 
    } else if (actual[0] == "B" && actual[2] == "CLEAN") {
        actual[0] = "A";
        if(seEnsucio) {
            actual[2] = "DIRTY"
        }
    }

    appendLog(actual)
    setTimeout(function(){ reflexAgent() }, 2000);
}

const getName = (estado) => {
    const match = Object.entries(estados).find(([key, value]) =>
        value[0] === estado[0] && value[1] === estado[1] && value[2] === estado[2]
    )

    return match ? match[0] : null
}

const visitarEstado = (estado) => {
    const estado1 = document.getElementById(estado);
    estado1.style.backgroundColor = 'green'
}

const appendLog = (logLine) => {
    const log = document.getElementById("log");
    log.textContent = log.textContent + logLine + "\n"

    log.scrollTop = log.scrollHeight 
}

document.addEventListener("DOMContentLoaded", reflexAgent);
