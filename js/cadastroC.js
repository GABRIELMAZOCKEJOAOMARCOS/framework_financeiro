function logincheck(){
    if(window.localStorage.getItem("logado")==null||window.localStorage.getItem("logado")==""){
        window.location.href = "logar.html";
    }
}


//CATEGORIA
function cadCategoria(){
    const nome = document.getElementById("nome").value;
    const logado = window.localStorage.getItem("logado");
    if(nome == ""){
        Swal.fire({
    
            icon: 'error',
            title: 'Algum Valor em branco!',
            showConfirmButton: false,
            timer: 2500
          });
    }else{


        const categoria = {id: Date.now(), nome, logado};

        //teste de existencia de items em local storage
        let local = JSON.parse(window.localStorage.getItem("categorias"))

        if(local == null||local==""){
            window.localStorage.setItem("categorias",JSON.stringify([]));
        }
        
        const categoriasGravadas = JSON.parse(window.localStorage.getItem("categorias"));
        categoriasGravadas.push(categoria)
        
        //mandar para localstorage
        window.localStorage.setItem("categorias", JSON.stringify(categoriasGravadas))

        Swal.fire({
      
            icon: 'success',
            title: 'Usuário cadastrado com sucesso!',
            showConfirmButton: false,
            timer: 2000
      
          });
        listarCategoria();
        document.getElementById("nome").value=""
    }
}

function listarCategoria(){
    let linha = "";
    let categoriasGravadas = JSON.parse(window.localStorage.getItem("categorias"));
    const logado = window.localStorage.getItem("logado");

    if(categoriasGravadas == "" || categoriasGravadas == null){
        Swal.fire({
    
            icon: 'error',
            title: 'Nenhuma categoria gravada!',
            showConfirmButton: false,
            timer: 2000
        });
        row = document.getElementById("tbody")
        linha = "";
        row.innerHTML = linha;
    }else{
        categoriasGravadas.forEach(categoria => {
          if(categoria.logado == logado){
            row = document.getElementById("tbody")
            linha +="<tr>"+
                        "<td id='tdid'>"+categoria.id +"</td>"+
                        "<td id='tdnome'>"+categoria.nome +"</td>"+
                        "<td id='tdacoes'><button class='btn btn-success' onclick='editarCategoria("+categoria.id+")'><i class='fa fa-edit'></i></button>"+
                        "<button class='btn btn-danger'onclick='apagarCategoria("+categoria.id+")'><i class='fa fa-trash'></i></button></td>"+
                    "</tr>";
            row.innerHTML = linha;
          }          
        })
    }
}

function editarCategoria(id){
    Swal.mixin({
        input: 'text',
        confirmButtonText: 'Sim',
        confirmButtonColor: '#3085d6',
        showCancelButton: true,
        progressSteps: ['1']
      }).queue([
        {
          title: 'Nome',
          text: 'Altere o nome'
        }
      ]).then((result) => {
        if (result.value) {
            debugger
            if(result.value == null|| result.value==""){
            }else{
          const answers = JSON.stringify(result.value)


          let categoriasGravadas = JSON.parse(window.localStorage.getItem("categorias"));
          let categoriaIndex = categoriasGravadas.findIndex(conta => conta.id == id);
          window.localStorage.removeItem("categorias");

          categoriasGravadas[categoriaIndex].nome = JSON.parse(answers)[0];

          window.localStorage.setItem("categorias", JSON.stringify(categoriasGravadas))

          listarCategoria()
        }
        }
      })
}

function apagarCategoria(id){
    Swal.fire({
        title: 'Confirmar a exclução da Categoria?',
        
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim'
      }).then((result) => {
        if (result.value) {
            let categoriasGravadas = JSON.parse(window.localStorage.getItem("categorias"));
            let categoriaIndex = categoriasGravadas.findIndex(categoria => categoria.id == id);
            window.localStorage.removeItem("categorias");
            
            categoriasGravadas.splice(categoriaIndex,1);

            window.localStorage.setItem("categorias",JSON.stringify(categoriasGravadas))
            Swal.fire(
            'Produto excluido!',
            '',
            'success' 
            )
            listarCategoria();
        }
      });
}

//CONTAS

function cadContas(){
    const descricao = document.getElementById("descricao").value;
    const tipo = document.getElementById("tipo").value;
    const categoria = document.getElementById("categoria").value;
    const logado = window.localStorage.getItem("logado")

    if(descricao == ""|| tipo == ""|| categoria==""){
        Swal.fire({
    
            icon: 'error',
            title: 'Algum Valor em branco!',
            showConfirmButton: false,
            timer: 2500
          });
    }else{
        const conta = {id: Date.now(), descricao, tipo, categoria, logado};

        //teste de existencia de items em local storage
        let local = JSON.parse(window.localStorage.getItem("contas"))

        if(local == null||local==""){
            window.localStorage.setItem("contas",JSON.stringify([]));
        }
        
        const contasGravadas = JSON.parse(window.localStorage.getItem("contas"));
        contasGravadas.push(conta)
        
        //mandar para localstorage
        window.localStorage.setItem("contas", JSON.stringify(contasGravadas))

        Swal.fire({
      
            icon: 'success',
            title: 'Usuário cadastrado com sucesso!',
            showConfirmButton: false,
            timer: 2000
      
          });
        listarConta();
        document.getElementById("descricao").value="";
        document.getElementById("tipo").value="";
        document.getElementById("categoria").value="";
    }
}



function apagarConta(id){
    Swal.fire({
        title: 'Confirmar a exclução da Conta?',
        
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim'
      }).then((result) => {
        if (result.value) {
            let contaGravadas = JSON.parse(window.localStorage.getItem("contas"));
            let contaIndex = contaGravadas.findIndex(conta => conta.id == id);
            window.localStorage.removeItem("contas");
            
            contaGravadas.splice(contaIndex,1);

            window.localStorage.setItem("contas",JSON.stringify(contaGravadas))

            Swal.fire({
      
                icon: 'success',
                title: 'Usuário deletado com sucesso!',
                showConfirmButton: false,
                timer: 2000
          
              });
            listarConta();
        }
      });
}

function editarConta(id){
    Swal.mixin({
        input: 'text',
        confirmButtonText: 'Sim',
        confirmButtonColor: '#3085d6',
        showCancelButton: true,
        progressSteps: ['1']
      }).queue([
        {
          title: 'Decrição',
          text: 'Altere a descrição'
        }
      ]).then((result) => {
        if (result.value) {

            if(result.value == null|| result.value==""){
            }else{
          const answers = JSON.stringify(result.value)


          let contasGravadas = JSON.parse(window.localStorage.getItem("contas"));
          let contaIndex = contasGravadas.findIndex(conta => conta.id == id);
          window.localStorage.removeItem("contas");

          contasGravadas[contaIndex].descricao = JSON.parse(answers)[0];

          window.localStorage.setItem("contas", JSON.stringify(contasGravadas))

          listarConta()
        }
        }
      })
}

function listarConta(){
    //lista categorias no input
    let linha;
    let categoriasGravadas = JSON.parse(window.localStorage.getItem("categorias"));
    const logado = window.localStorage.getItem("logado");

    if(categoriasGravadas == "" || categoriasGravadas == null){
        row = document.getElementById("categoria")
        linha = "";
        row.innerHTML = linha;
    }else{
        categoriasGravadas.forEach(categoria => {
          if (categoria.logado == logado){
            row = document.getElementById("categoria")
            linha += "<option value='"+categoria.nome+"'>"+categoria.nome+"<option>"
            row.innerHTML = linha;
          }
        })
    }

    //listar contas

    linha = "";
    let contasGravadas = JSON.parse(window.localStorage.getItem("contas"));

    if(contasGravadas == ""||contasGravadas == null){
        row = document.getElementById("tbody")
        linha = "";
        row.innerHTML = linha;
    }else{
        contasGravadas.forEach(conta => {
          if(conta.logado == logado){
            row = document.getElementById("tbody")
            linha +="<tr>"+
                        "<td id='tdid'>"+conta.id +"</td>"+
                        "<td id='tdnome'>"+conta.descricao+"</td>"+
                        "<td id='tdnome'>"+conta.tipo+"</td>"+
                        "<td id='tdnome'>"+conta.categoria+"</td>"+
                        "<td id='tdacoes'><button class='btn btn-success' onclick='editarConta("+conta.id+")'><i class='fa fa-edit'></i></button>"+
                        "<button class='btn btn-danger'onclick='apagarConta("+conta.id+")'><i class='fa fa-trash'></i></button></td>"+
                    "</tr>";
            row.innerHTML = linha;
          }
        })
    }
}