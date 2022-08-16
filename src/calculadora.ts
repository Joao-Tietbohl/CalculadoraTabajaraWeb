import { Calculo } from "./calculo.js";

export class Calculadora{ 

  historicoOperacoes: string[];

  constructor(){
    this.historicoOperacoes = [];
  }

  calcular(calculo: Calculo): number{
    
    let resultado: number = 0;
    switch(calculo.operador){
      case "+":
        resultado = calculo.primeiroNumero + calculo.segundoNumero;
        break;
  
      case"-":
       resultado = calculo.primeiroNumero - calculo.segundoNumero;
       break;
  
       case"*":
       resultado = calculo.primeiroNumero * calculo.segundoNumero;
       break;
  
       case"/":
       resultado = calculo.primeiroNumero / calculo.segundoNumero;
       break;
    
    }


    const operacao: string 
    = `${calculo.primeiroNumero} ${calculo.operador} ${calculo.segundoNumero} = ${resultado}`;

    console.log(operacao);
    this.historicoOperacoes.push(operacao);

    return resultado;
  }
}