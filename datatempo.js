const DIA = 24 * 60 * 60 * 1000000;
const MES = 30 * DIA;
const ANO = 365 * 365;

class Data extends Date{

    proximoMes() {
        let mes = Math.max(1, (this.getMonth() + 2) % 13);
        let ano = this.getFullYear() + (this.getMonth() + 2) / 13;
        return new Date(ano, mes - 1, 1);
    }


    maxDiasMes() {
        // na classe Date do JS, mes é 0-based
        const ano = this.getFullYear();
        const mes = this.getMonth();
        const ultimoDia = new Date(ano, mes+1, 0);
        return ultimoDia.getDate();
    }

    static periodo(inicio, final) {
        if (inicio.eIgual(final)) return new Periodo(0, 0, 0);
        
        // garante que a data inicial seja menor q a final
        if (final < inicio) [inicio, final] = [final, inicio];
        
        // seta as variáveis para evitar muitas chamadas de getters
        let [diaInicio, mesInicio, anoInicio] = [inicio.getDate(), inicio.getMonth(), inicio.getFullYear()];
        let [diaFinal, mesFinal, anoFinal] = [final.getDate(), final.getMonth(), final.getFullYear()];

        
        // caso as duas datas estejam no mesmo mes
        if (anoInicio === anoFinal && mesInicio === mesFinal) {
            // mes inteiro
            if (diaInicio === 1 && diaFinal === final.maxDiasMes()) {
                return new Periodo(0, 1, 0);
            } else {
                return new Periodo(0, 0, diaFinal - diaInicio + 1);
            }
        }

        // soma dos dias no inicio e fim do periodo
        // soma dias do mes inicial
        let [anos, dias, meses] = [0, 0, 0];
        if (diaInicio === 1) meses++;
        else if (diaInicio === inicio.maxDiasMes()) dias++;
        else dias += 30 - diaInicio + 1;
        // soma os dias do mes final
        if (diaFinal === final.maxDiasMes()) meses++;
        else dias += diaFinal;

        // ajusta os meses para o cálculo
        diaInicio = 1;
        if (mesInicio <= 10) {
            mesInicio++;
        } else {
            mesInicio = 0;
            anoInicio++;
        }

        if (mesInicio <= mesFinal) {
            meses += mesFinal - mesInicio;
        } else {
            anoFinal--;
            meses += mesFinal + 12 - mesInicio;
        }
        anos = anoFinal - anoInicio
        return new Periodo(anos, meses, dias)
    }
    
    static parseData(str) {
        // str na forma aaaa/mm/dd
        const ano = str.slice(0, 4);
        const mes = str.slice(5, 7);
        const dia = str.slice(8);
        return new Data(ano, mes - 1, dia);
    }

    eIgual(that) {
        if (this.getDate() !== that.getDate()) return false;
        if (this.getMonth() !== that.getMonth()) return false;
        if (this.getFullYear() !== that.getFullYear()) return false;
        return true;
    }
}



class Periodo {
    
    constructor(anos, meses, dias) {
        this.anos = anos;
        this.meses = meses;
        this.dias = dias;
        this.validaPeriodo();
    }

    validaPeriodo() {
        if (this.anos >= 0 && this.meses >= 0 && this.dias >= 0) {
            this.anos += Math.floor(this.dias / 365);
            this.dias %= 365;
            this.meses += Math.floor(this.dias / 30);
            this.dias %= 30;
            this.anos += Math.floor(this.meses / 12);
            this.meses  %= 12;
        } else {
            throw "Não é Permitido Período Negativo";
        }
    }

    eIgual(that) {
        if (this.anos !== that.anos) return false;
        if (this.meses !== that.meses) return false;
        if (this.dias !== that.dias) return false;
        return true;
    }

    eMaior(that) {
        let p1 = this.anos * 365 + this.meses * 30 + this.dias;
        let p2 = that.anos * 365 + that.meses * 30 + that.dias;
        return p1 > p2;
    }

    eMaiorIgual(that) {
        return this.eIgual(that) && this.eMaior(that);
    }

    static soma(p1, p2) {
        let anos = p1.anos + p2.anos;
        let meses = p1.meses + p2.meses;
        let dias = p1.dias + p2.dias
        return new Periodo(anos, meses, dias);

    }

    static subtrai(p1, p2) {
        if (p2.eMaior(p1)) [p1, p2] = [p2, p1];
        let anos = p1.anos - p2.anos;
        let meses = p1.meses - p2.meses;
        let dias = p1.dias - p2.dias;
        if (dias < 0) {
            dias += 30;
            meses -= 1;
        }
        if (meses < 0) {
            meses += 12;
            anos -= 1;
        }
        return new Periodo(anos, meses, dias);
    }

    toString() {
        const {anos, meses, dias} = this;
        return `${anos} a, ${meses} m, ${dias} d`;
    }

    produto(fator) {
        let anos = parseInt(this.anos * fator);
        let meses = parseInt(this.meses * fator);
        let dias = parseInt(this.dias * fator);
        let fracaoAno = fator * this.anos - anos;
        let fracaoMes = fator * this.meses - meses;
        dias += parseInt(fracaoAno * 365 + fracaoMes * 30)
        return new Periodo(anos, meses, dias)
        
    }

    toString() {
        return `${this.anos}a, ${this.meses}m, ${this.dias}d`
    }
}

function dataMaisPeriodo(data, periodo) {
	let diasProxMes = data.maxDiasMes() - data.getDate() + 1;
	let dia = data.getDate() + periodo.dias;
	let mes = data.getMonth() + periodo.meses;
	let ano = data.getFullYear() + periodo.anos;
	if (diasProxMes <= periodo.dias) {
		dia = periodo.dias - diasProxMes + 1;
		mes += 1;
	}
	if (mes > 12) {
		mes -= 12;
		ano += 1;
	}
	let novaData = new Date(ano, mes, dia);
	return novaData.toLocaleDateString('en-GB');
  
}


    // /// testing

    // const p1 = new Periodo(1, 3, 25);
    // const p2 = new Periodo(5, 0, 27);
    

    // // testes
    // let d1 = new Data(2020, 0, 1);
    // let d2 = new Data(2020, 0, 31);
    // let d3 = new Data(2020, 0, 14);
    // let d4 = new Data(2021, 0, 1);
    // let d5 = new Data(1978, 6, 8);
    // let d6 = new Data(1985, 3, 13);
    // let d7 = new Data(1985, 3, 13);
    // console.log(Data.periodo(d1, d1))
    // console.log(Data.periodo(d1, d2))
    // console.log(Data.periodo(d1, d3))
    // console.log(Data.periodo(d3, d4))
    // console.log(Data.periodo(d5, d6))
    // console.log(Data.periodo(d6, d7))


