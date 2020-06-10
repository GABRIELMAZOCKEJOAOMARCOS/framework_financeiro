function logincheck(){
    if(window.localStorage.getItem("logado")==null||window.localStorage.getItem("logado")==null==""){
        window.location.href = "logar.html";
    }
}

function listar(){

    let local = JSON.parse(window.localStorage.getItem("dinheiro"));
    if(local==""||local==null){
        window.localStorage.setItem('dinheiro',JSON.stringify([]));
    }
    
    let numProdutos = JSON.parse(window.localStorage.getItem("dinheiro")).length;


    let linha ="";
    row = document.getElementById("cardP");
    linha += "<tr>"+
             "<td id='numPro'>"+numProdutos+"</td>"+
             "</tr>";
    row.innerHTML = linha;
}