function logincheck(){
    if(window.localStorage.getItem("logado")==null||window.localStorage.getItem("logado")==""){
        window.location.href = "logar.html";
    }
  }

function cadastrar(){
    const descricao = document.getElementById("descricao").value;
    const data = document.getElementById("data").value;
    const hora = document.getElementById("hora").value;
    const valor = parseFloat(document.getElementById("valor").value);
    const conta = document.getElementById("conta").value;
    const contasGravadas = JSON.parse(window.localStorage.getItem("contas"));
    const logado = window.localStorage.getItem("logado")

    if(descricao == ""|| data == ""|| hora==""|| valor==""|| conta==""){
        Swal.fire({
    
            icon: 'error',
            title: 'Algum Valor em branco!',
            showConfirmButton: false,
            timer: 2500
          });
    }else{
        for(i=0; i<contasGravadas.length;i++){
            if(contasGravadas[i].descricao == conta){
                tipo = contasGravadas[i].tipo;
            }
        }
        const lancamento = {id: Date.now(), descricao, data, hora, valor, conta, tipo, logado};

        //teste de existencia de items em local storage
        let local = JSON.parse(window.localStorage.getItem("lancamentos"))

        if(local == null||local==""){
            window.localStorage.setItem("lancamentos",JSON.stringify([]));
        }
        
        const lancamentosGravados = JSON.parse(window.localStorage.getItem("lancamentos"));
        lancamentosGravados.push(lancamento)
        
        //mandar para localstorage
        window.localStorage.setItem("lancamentos", JSON.stringify(lancamentosGravados))

        Swal.fire({
      
            icon: 'success',
            title: 'Lançamento cadastrado com sucesso!',
            showConfirmButton: false,
            timer: 2000
      
          });
        listar();
        document.getElementById("descricao").value="";
        document.getElementById("data").value="";
        document.getElementById("hora").value="";
        document.getElementById("valor").value="";
        document.getElementById("conta").value="";
    }
}



function apagar(id){
    Swal.fire({
        title: 'Confirmar a exclução do Lançamento?',
        
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim'
      }).then((result) => {
        if (result.value) {
            let lancamentosGravados = JSON.parse(window.localStorage.getItem("lancamentos"));
            let lancamentosIndex = lancamentosGravados.findIndex(lancamento => lancamento.id == id);
            window.localStorage.removeItem("lancamentos");
            
            lancamentosGravados.splice(lancamentosIndex,1);

            window.localStorage.setItem("lancamentos",JSON.stringify(lancamentosGravados))

            Swal.fire({
      
                icon: 'success',
                title: 'Lancamento deletado com sucesso!',
                showConfirmButton: false,
                timer: 2000
          
              });
            listar();
        }
      });
}

function listar(){
    //lista contas no input
    let linha = "";
    let contasGravadas = JSON.parse(window.localStorage.getItem("contas"));
    const logado = window.localStorage.getItem("logado");

    
    if(contasGravadas == "" || contasGravadas == null){
        row = document.getElementById("conta")
        linha = "";
        row.innerHTML = linha;
    }else{
        contasGravadas.forEach(conta => {
            if(conta.logado == logado){
                row = document.getElementById("conta")
                linha += "<option value='"+conta.descricao+"'>"+conta.descricao+"<option>"
                row.innerHTML = linha;
            }
        })
    }

    //listar lancamentos

    linha = "";
    let lancamentosGravados = JSON.parse(window.localStorage.getItem("lancamentos"));

    if(lancamentosGravados == ""||lancamentosGravados == null){
        row = document.getElementById("tbody")
        linha = "";
        row.innerHTML = linha;
    }else{
        lancamentosGravados.forEach(lancamento => {
            if(lancamento.logado == logado){
                row = document.getElementById("tbody")
                linha +="<tr>"+
                            "<td id='tdid'>"+lancamento.id +"</td>"+
                            "<td id='tddescricao'>"+lancamento.descricao+"</td>"+
                            "<td id='tddata'>"+lancamento.data+"</td>"+
                            "<td id='tdhora'>"+lancamento.hora+"</td>"+
                            "<td id='tdvalor'>"+lancamento.valor+"</td>"+
                            "<td id='tdconta'>"+lancamento.conta+"</td>"+
                            "<td id='tdacoes'><button class='btn btn-danger'onclick='apagar("+lancamento.id+")'><i class='fa fa-trash'></i></button></td>"+
                        "</tr>";
                row.innerHTML = linha;
            }
        })
    }
}