import { Calculadora } from "./calculadora.js";
import { RepositorioLocalStorage } from "./repositorios/repositorioLocalStorage.js";
const txtN1 = document.getElementById("primeiroNumero");
const txtN2 = document.getElementById("segundoNumero");
const selectOperador = document.getElementById("operador");
const txtResultado = document.getElementById("txtResultado");
const btnCalcular = document.getElementById("btnCalcular");
const btnLimpar = document.getElementById("btnLimpar");
const divHistorico = document.getElementById("historico");
const calculadora = new Calculadora();
const repositorioLocalStorage = new RepositorioLocalStorage();
exibeHistorico();
const operacoes = [];
operacoes.forEach((x) => {
    calculadora.historicoOperacoes.push(x);
});
console.log(calculadora.historicoOperacoes);
function calcular() {
    const calculo = {
        primeiroNumero: Number(txtN1.value),
        segundoNumero: Number(txtN2.value),
        operador: selectOperador.options[selectOperador.selectedIndex].value
    };
    let resultado = calculadora.calcular(calculo);
    repositorioLocalStorage.inserir(calculadora.historicoOperacoes);
    if (calculadora.historicoOperacoes.length === 0) {
        divHistorico.style.display = "none";
    }
    else {
        limpaHistorico();
        exibeHistorico();
    }
    txtResultado.innerText = "O resultado é: " + resultado.toString();
}
function limpaHistorico() {
    while (divHistorico.firstChild) {
        divHistorico.removeChild(divHistorico.firstChild);
    }
}
function exibeHistorico() {
    calculadora.historicoOperacoes = repositorioLocalStorage.selecionarTodos();
    if (calculadora.historicoOperacoes.length > 0)
        divHistorico.classList.remove("d-none");
    calculadora.historicoOperacoes.forEach((operacao) => {
        const txtOperacao = document.createElement("h3");
        txtOperacao.className = "alert alert-primary";
        txtOperacao.innerText = operacao;
        divHistorico.appendChild(txtOperacao);
    });
}
btnCalcular.addEventListener("click", calcular);
btnLimpar.addEventListener("click", () => {
    repositorioLocalStorage.excluir();
    divHistorico.classList.add("d-none");
    exibeHistorico();
});
