function logincheck(){
    if(window.localStorage.getItem("logado")==null||window.localStorage.getItem("logado")==""){
        window.location.href = "logar.html";
    }
}

function listar(){

    const logado = window.localStorage.getItem("logado");
    debugger
    let linha = "";  
    var valorS = 0;
    var valorE = 0;
    var valorA = 0;
    let tipo;


    let lancamentosGravados = JSON.parse(window.localStorage.getItem("lancamentos"));

    if (lancamentosGravados == null){

    }else{
        for(i=0; i<lancamentosGravados.length; i++){
            if(lancamentosGravados[i].logado == logado){
                if(lancamentosGravados[i].tipo == "entrada"){
                    valorE += lancamentosGravados[i].valor;
                    valorA += lancamentosGravados[i].valor;
                }else{
                    valorS += lancamentosGravados[i].valor;
                    valorA -= lancamentosGravados[i].valor;
                }
            }
        }
    }

    row = document.getElementById("cardS");
    linha += "<tr>"+
             "<td id='numPro'>R$ "+valorS+",00</td>"+
             "</tr>";
    row.innerHTML = linha;
    linha = ""

    row = document.getElementById("cardE");
    linha += "<tr>"+
             "<td id='numPro'>R$ "+valorE+",00</td>"+
             "</tr>";
    row.innerHTML = linha;
    linha = ""

    row = document.getElementById("cardA");
    linha += "<tr>"+
             "<td id='numPro'>R$ "+valorA+",00</td>"+
             "</tr>";
    row.innerHTML = linha;
    linha = ""

}