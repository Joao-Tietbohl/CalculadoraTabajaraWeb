import { Calculadora } from "./calculadora.js";
import { Calculo } from "./calculo";
import { RepositorioLocalStorage } from "./repositorios/repositorioLocalStorage.js";

const txtN1 = document.getElementById("primeiroNumero") as HTMLInputElement;
const txtN2 = document.getElementById("segundoNumero") as HTMLInputElement;
const selectOperador = document.getElementById("operador") as HTMLSelectElement;

const txtResultado = document.getElementById("txtResultado") as HTMLParagraphElement;
const btnCalcular  = document.getElementById("btnCalcular") as HTMLButtonElement; 
const btnLimpar = document.getElementById("btnLimpar") as HTMLButtonElement;
const divHistorico = document.getElementById("historico") as HTMLDivElement;

const calculadora = new Calculadora();
const repositorioLocalStorage = new RepositorioLocalStorage();

exibeHistorico();

const operacoes: string[] = [];

operacoes.forEach((x: string)  => {
  calculadora.historicoOperacoes.push(x);
}) 

console.log(calculadora.historicoOperacoes);

function calcular(){
 
  const calculo: Calculo = {
    primeiroNumero: Number(txtN1.value),
    segundoNumero: Number(txtN2.value),
    operador: selectOperador.options[selectOperador.selectedIndex].value
  }
  
  let resultado = calculadora.calcular(calculo);

  repositorioLocalStorage.inserir(calculadora.historicoOperacoes);

  if(calculadora.historicoOperacoes.length === 0){
    
    divHistorico.style.display = "none";

  } else {
    
    limpaHistorico();
    exibeHistorico();
  }
  
  txtResultado.innerText = "O resultado é: " + resultado.toString(); 
}

function limpaHistorico() {
  while(divHistorico.firstChild){
    divHistorico.removeChild(divHistorico.firstChild);
  }
}

function exibeHistorico(){

  calculadora.historicoOperacoes = repositorioLocalStorage.selecionarTodos();

  if(calculadora.historicoOperacoes.length > 0)
    divHistorico.classList.remove("d-none");

  calculadora.historicoOperacoes.forEach((operacao: string) => {
    const txtOperacao = document.createElement("h3") as HTMLHeadingElement;

    txtOperacao.className = "alert alert-primary";
    txtOperacao.innerText = operacao;

    divHistorico.appendChild(txtOperacao);
  });
}

btnCalcular.addEventListener("click", calcular)
btnLimpar.addEventListener("click", () => {
  repositorioLocalStorage.excluir();

  divHistorico.classList.add("d-none");
  exibeHistorico();
})

