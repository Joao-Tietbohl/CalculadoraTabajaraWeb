export class Calculadora {
    constructor() {
        this.historicoOperacoes = [];
    }
    calcular(calculo) {
        let resultado = 0;
        switch (calculo.operador) {
            case "+":
                resultado = calculo.primeiroNumero + calculo.segundoNumero;
                break;
            case "-":
                resultado = calculo.primeiroNumero - calculo.segundoNumero;
                break;
            case "*":
                resultado = calculo.primeiroNumero * calculo.segundoNumero;
                break;
            case "/":
                resultado = calculo.primeiroNumero / calculo.segundoNumero;
                break;
        }
        const operacao = `${calculo.primeiroNumero} ${calculo.operador} ${calculo.segundoNumero} = ${resultado}`;
        console.log(operacao);
        this.historicoOperacoes.push(operacao);
        return resultado;
    }
}
