//CHAMADAS DAS APIS
const API_BUSCAR_TODOS ='http://localhost:8000/avaliacao/listarTodos';
const API_BUSCAR_ID = 'http://localhost:8000/avaliacao/listarPorId';
const API_CADASTRAR = 'http://localhost:8000/avaliacao/salvar';
const API_DELETAR = 'http://localhost:8000/avaliacao/deletar';
const API_ATUALIZAR = 'http://localhost:8000/avaliacao/atualizar';


async function salvarAluno() {
    const aluno = {
        nome: document.getElementById("dataDaAvaliacao").value,
        cpf: document.getElementById("qualidadeDasPecas").value,
        email: document.getElementById("prazoDeEntrega").value,
        telefone: document.getElementById("atendimento").value,
        endereco: document.getElementById("preco").value,
        dataDeNascimento: document.getElementById("observacoes").value,
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
