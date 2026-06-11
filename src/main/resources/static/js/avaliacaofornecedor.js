//CHAMADAS DAS APIS
const API_BUSCAR_TODOS ='http://localhost:8000/avaliacao/listarTodos';
const API_BUSCAR_ID = 'http://localhost:8000/avaliacao/listarPorId';
const API_CADASTRAR = 'http://localhost:8000/avaliacao/salvar';
const API_DELETAR = 'http://localhost:8000/avaliacao/deletar';
const API_ATUALIZAR = 'http://localhost:8000/avaliacao/atualizar';


async function salvarAluno() {
    const aluno = {
        nome: document.getElementById("nome").value,
        cpf: document.getElementById("cpf").value,
        email: document.getElementById("email").value,
        telefone: document.getElementById("telefone").value,
        endereco: document.getElementById("endereco").value,
        dataDeNascimento: document.getElementById("dataNascimento").value,
        peso: document.getElementById("peso").value,
        altura: document.getElementById("altura").value,
        alergia: document.getElementById("alergia").value,
        problemasCardiacos: document.getElementById("cardiaco").value,
        mensalidade: document.getElementById("mensalidade").value
    };

    await fetch(API_CADASTRAR, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(aluno)
    });

    limparFormulario();
}
