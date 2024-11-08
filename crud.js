async function carregarAlunos() {
    
    const resposta = await fetch("http://localhost:3031/mostrar"); 
    const alunos = await resposta.json(); 


    const container = document.getElementById("alunos-container");
    container.innerHTML = ""; 

    alunos.forEach((aluno) => {
      const alunoDiv = document.createElement("div");
      alunoDiv.innerHTML = `<p>Nome: ${aluno.nome}, Idade: ${aluno.idade}</p>`;
      container.appendChild(alunoDiv);
    });
 
}

// Carrega os alunos ao abrir a página
window.onload = carregarAlunos;