async function carregarPlanejamento() {
    
    const resposta = await fetch("http://localhost:1910/mostrar"); 
    const planejamentos = await resposta.json(); 


    const container = document.getElementById("site-container");
    container.innerHTML = ""; 

    planejamentos.forEach((planejamento) => {
      const estudosDiv = document.createElement("div");
      alunoDiv.innerHTML = `<p>Matéria: ${planejamento.nome}, Idade: ${aluno.idade}</p>`;
      container.appendChild(estudosDiv);
    });
 
}

// Carrega os planejamentos ao abrir a página
window.onload = carregarAlunos;