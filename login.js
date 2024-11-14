async function carregarUsuarios() {
  const resposta = await fetch("http://localhost:1910/exibir");
  const usuarios = await resposta.json();

  const container = document.getElementById("site-container");
  container.innerHTML = ""; // Limpa a área antes de inserir novos dados

  usuarios.forEach(usuario => {
      const usuarioDiv = document.createElement("div");
      usuarioDiv.classList.add("col");

      usuarioDiv.innerHTML = `
          <div class="card h-100">
              <div class="card-body">
                  <h5 class="card-title">${usuario.nome}</h5>
                  <h6 class="card-subtitle mb-2 text-muted">${usuario.email}</h6>
                  <p class="card-text">Esse é um exemplo de descrição que poderia ser utilizada para mais detalhes sobre o usuário ou outros dados.</p>
              </div>
              <div class="card-footer text-center">
                  <button class="btn btn-primary">Detalhes</button>
              </div>
          </div>
      `;

      container.appendChild(usuarioDiv);
  });
}
