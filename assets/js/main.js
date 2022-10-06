// 1 - Capturar evento de submit do formulario (criar o formulario HTML(perguntas, botão...))

const form = document.querySelector('#formulario'); //2 passo

form.addEventListener('submit', function (event) {
    event.preventDefault();
    const inputPeso = event.target.querySelector('#peso');
    const inputAltura = event.target.querySelector('#altura');

    const peso = Number(inputPeso.value);
    const altura = Number(inputAltura.value)

    if (!peso) {
        setResultado('Peso inválido', false);
        return;
    }

    if (!altura) {
        setResultado('Altura inválido', false);
        return;
    }

    const imc = getImc(peso, altura)
    const nivelImc = getNivelImc(imc)

    const msg = `Seu IMC é ${imc} (${nivelImc}).`;

    setResultado(msg, true)
});

function getNivelImc(imc) {
    const nivel = ['Abaixo do peso', 'Peso normal', 'Sobrepeso', 'Obesidade grau 1', 'Obesidade grau 2', 'Obesidade grau 3'];

    if (imc >= 39.9) return nivel[5];
    if (imc >= 34.9) return nivel[4];
    if (imc >= 29.9) return nivel[3];
    if (imc >= 24.9) return nivel[2];
    if (imc >= 18.5) return nivel[1];
    if (imc < 18.5) return nivel[0];
}

function getImc(peso, altura) {
    const imc = peso / altura ** 2;
    return imc.toFixed(2);
}

function criaP() {
    const p = document.createElement('p');
    return p;
}

function setResultado(msg, isValid) { //3 passo
    const resultado = document.querySelector('#resultado');
    resultado.innerHTML = ''; // zera o html

    const p = criaP();

    if (isValid) {
        p.classList.add('paragrafo-resultado');
    } else {
        p.classList.add('bad');
    }

    p.innerHTML = msg;
    resultado.appendChild(p);

}

function relogio() {
    function criaHoraDosSegundos(segundos) {
        const data = new Date(segundos * 1000)
        return data.toLocaleTimeString('pt-BR', {
            hour12: false,
            timeZone: 'GMT'
        });
    }

    const relogio = document.querySelector('.relogio');
    // const iniciar = document.querySelector('.iniciar');
    // const pausar = document.querySelector('.pausar');
    // const zerar = document.querySelector('.zerar');
    let segundos = 0;
    let timer;

    function IniciaRelogio() {
        timer = setInterval(function () {
            segundos++;
            relogio.innerHTML = criaHoraDosSegundos(segundos);
        }, 1000);
    }

    document.addEventListener('click', function (evento) {
        const elemento = evento.target;

        if (elemento.classList.contains('zerar')) {
            clearInterval(timer);
            relogio.classList.remove('pausado')
            relogio.innerHTML = '00:00:00';
            segundos = 0;
            console.log('Você clicou em Zerar')
        }

        if (elemento.classList.contains('iniciar')) {
            relogio.classList.remove('pausado')
            clearInterval(timer);
            IniciaRelogio()
            console.log('Você clicou em Iniciar')
        }

        if (elemento.classList.contains('pausar')) {
            clearInterval(timer);
            relogio.classList.add('pausado')
            console.log('Você clicou em Pausar')
        }

    });
}

relogio();