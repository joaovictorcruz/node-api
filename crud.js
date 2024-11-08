async function carregarUsuario() {
    
    const resposta = await fetch("http://localhost:1910/exibir"); 
    const Usuarios = await resposta.json(); 


    const container = document.getElementById("site-container");
    container.innerHTML = ""; 

    Usuarios.forEach((usuario) => {
      const estudosDiv = document.createElement("div");
      estudosDiv.innerHTML = `<p>Nome: ${usuario.nome}, email: ${usuario.email}</p>`;
      container.appendChild(estudosDiv);
    });
 
}

// Carrega os planejamentos ao abrir a página
window.onload = carregarUsuario;