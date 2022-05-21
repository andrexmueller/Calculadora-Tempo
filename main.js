

const btDD = document.querySelector('#calcDD');
btDD.onclick = () => {
    let d1str = document.querySelector('#ini1');
    let d2str = document.querySelector('#fin1');
    let d1 = Data.parseData(d1str.value);
    let d2 = Data.parseData(d2str.value);
    let res = document.querySelector('#perEntreDts');
    res.textContent = Data.periodo(d1, d2).toString()  
    // d1str.value = "";
    // d2str.value = "";

};

const btDP = document.querySelector('#calcDP');
btDP.onclick = () => {
    let dstr = document.querySelector('#dtini').value;
    let data = Data.parseData(dstr);
    let anos = parseInt(document.querySelector('#anos').value);
    let meses = parseInt(document.querySelector('#meses').value);
    let dias = parseInt(document.querySelector('#dias').value);
    anos = isNaN(anos) ? 0 : anos;
    meses = isNaN(meses) ? 0 : meses;
    dias = isNaN(dias) ? 0 : dias;
    let periodo = new Periodo(anos, meses, dias)
    let res = document.querySelector('#dataMaisPer');
    res.textContent = dataMaisPeriodo(data, periodo).toString();  
      
};

const aritmeticaPeridos = (operacao) => {
    let anos1 = parseInt(document.querySelector('#anos1').value);
    let meses1 = parseInt(document.querySelector('#meses1').value);
    let dias1 = parseInt(document.querySelector('#dias1').value);
    anos1 = isNaN(anos1) ? 0 : anos1;
    meses1 = isNaN(meses1) ? 0 : meses1;
    dias1 = isNaN(dias1) ? 0 : dias1;
    let anos2 = parseInt(document.querySelector('#anos2').value);
    let meses2 = parseInt(document.querySelector('#meses2').value);
    let dias2 = parseInt(document.querySelector('#dias2').value);
    anos2 = isNaN(anos2) ? 0 : anos2;
    meses2 = isNaN(meses2) ? 0 : meses2;
    dias2 = isNaN(dias2) ? 0 : dias2;

    let periodo1 = new Periodo(anos1, meses1, dias1)
    let periodo2 = new Periodo(anos2, meses2, dias2)
    if (operacao === 'soma') return Periodo.soma(periodo1, periodo2)
    if (operacao === 'subtrai') return Periodo.subtrai(periodo1, periodo2)
}

const btsoma = document.querySelector('#ppsoma')
btsoma.onclick = () => {
    let res = document.querySelector('#ppres');
    res.textContent = aritmeticaPeridos('soma').toString();
}

const btsub = document.querySelector('#ppsub')
btsub.onclick = () => {
    let res = document.querySelector('#ppres');
    res.textContent = aritmeticaPeridos('subtrai').toString();
}

const btconv = document.querySelector('#converte');
btconv.onclick = () => {
    let anos = parseInt(document.querySelector('#anosc').value);
    let meses = parseInt(document.querySelector('#mesesc').value);
    let dias = parseInt(document.querySelector('#diasc').value);
    anos = isNaN(anos) ? 0 : anos;
    meses = isNaN(meses) ? 0 : meses;
    dias = isNaN(dias) ? 0 : dias;
    let periodo = new Periodo(anos, meses, dias);
    let fator = parseFloat(document.querySelector('#fator').value);
    let res = document.querySelector('#convertido');
    res.textContent = periodo.produto(fator).toString();
}