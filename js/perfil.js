function logincheck(){
    if(window.localStorage.getItem("logado")==null||window.localStorage.getItem("logado")==""){
        window.location.href = "logar.html";
    }
}
//nome email senha endereco status
function listar(){
    let usuariosGravadas = JSON.parse(window.localStorage.getItem("usuarios"));
    const logado = window.localStorage.getItem("logado");
    let usuariosIndex = usuariosGravadas.findIndex(usuario => usuario.id == logado);


    document.getElementById("nome").value = usuariosGravadas[usuariosIndex].nome;
    document.getElementById("email").value = usuariosGravadas[usuariosIndex].email;
    document.getElementById("senha").value = usuariosGravadas[usuariosIndex].senha;
    document.getElementById("endereco").value = usuariosGravadas[usuariosIndex].endereco;
    document.getElementById("status").value = usuariosGravadas[usuariosIndex].status;
}

function Alterar(){
    let nome = document.getElementById("nome").value
    let email =document.getElementById("email").value
    let senha =document.getElementById("senha").value
    let endereco =document.getElementById("endereco").value

    if(nome == "" || email == ""|| senha== ""||endereco==""){
        Swal.fire({
    
            icon: 'error',
            title: 'Algum Valor em branco!',
            showConfirmButton: false,
            timer: 4000
          });
    }else{
        Swal.fire({
            title: 'Confirmar a alteração do Lançamento?',
            
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim'
          }).then((result) => {
            if (result.value) {
                debugger
                let usuariosGravadas = JSON.parse(window.localStorage.getItem("usuarios"));
                const logado = window.localStorage.getItem("logado");
                let usuariosIndex = usuariosGravadas.findIndex(usuario => usuario.id == logado);
            
                usuariosGravadas[usuariosIndex].nome = nome
                usuariosGravadas[usuariosIndex].email = email
                usuariosGravadas[usuariosIndex].senha = senha
                usuariosGravadas[usuariosIndex].endereco = endereco
                
                window.localStorage.removeItem("usuarios");
                window.localStorage.setItem("usuarios", JSON.stringify(usuariosGravadas));
                Swal.fire({
          
                    icon: 'success',
                    title: 'Alteração realizada com sucesso!',
                    showConfirmButton: false,
                    timer: 2500
                  });
                listar();
            }
          });
    }
}