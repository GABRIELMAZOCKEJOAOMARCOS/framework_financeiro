function deleteLogado(){
  window.localStorage.removeItem("logado");
}

function cadUsuario(){
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  const telefone = document.getElementById("telefone").value;
  const endereco = document.getElementById("endereco").value;

  if(nome==""|| email==""|| senha==""||telefone==""|| endereco==""){
    Swal.fire({
    
      icon: 'error',
      title: 'Algum Valor em branco!',
      showConfirmButton: false,
      timer: 4000
    });
  }else{
    const usuario = {id: Date.now(),nome, email, senha, telefone, endereco,status: "ativo"};
    //usuarios.push(usuario);
    let local = JSON.parse(window.localStorage.getItem("usuarios"));
  
    if(local == ""|| local==null){
      window.localStorage.setItem('usuarios',JSON.stringify([]));
    }
  
  
    let usuarioGravado = JSON.parse(window.localStorage.getItem("usuarios"));
  
    usuarioGravado.push(usuario);
    
  //gravar usuario
  window.localStorage.setItem('usuarios',JSON.stringify(usuarioGravado));
  
  
    Swal.fire({
      
      icon: 'success',
      title: 'Usuário cadastrado com sucesso!',
      showConfirmButton: false,
      timer: 4000

    });
    Limpar();
    window.location.href = "logar.html";
  }  
} 


function logar(){
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  
  let cont=-1;
  let usuariosGravados = JSON.parse(window.localStorage.getItem("usuarios"));

  if(usuariosGravados==null){
    Swal.fire({
        
      icon: 'error',
      title: 'Email incorreto!',
      showConfirmButton: false,
      timer: 2500
    });
  }else{
  for(let i = 0 ; i<usuariosGravados.length; i++){
    if(usuariosGravados[i].email == email){
      cont = i;
    }
  }


    if(cont!=-1){
      if(usuariosGravados[cont].senha == senha){
        if(usuariosGravados[cont].status == "ativo"){
          Swal.fire({
          
            icon: 'success',
            title: 'Login feito com sucesso!',
            showConfirmButton: false,
            timer: 2500
          });
          window.localStorage.setItem('logado',usuariosGravados[cont].id);
          window.location.href = "index.html"
        }else{
          Swal.fire({
        
            icon: 'error',
            title: 'Usuario Inativo!',
            showConfirmButton: false,
            timer: 2500
          });
        }
      }else{
        Swal.fire({
        
          icon: 'error',
          title: 'Senha incorreta!',
          showConfirmButton: false,
          timer: 2500
        });
      }
    }else{
      Swal.fire({
        
        icon: 'error',
        title: 'Email incorreto!',
        showConfirmButton: false,
        timer: 2500
      });
    }
  }

  }

 function Limpar(){
    document.getElementById("nome").value="";
    document.getElementById("email").value="";
    document.getElementById("senha").value="";
    document.getElementById("telefone").value="";
    document.getElementById("endereco").value="";
 }