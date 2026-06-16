//CHAMADAS DAS APIS
const API_BUSCAR_TODOS ='http://localhost:8000/avaliacao/listarTodos';
const API_BUSCAR_ID = 'http://localhost:8000/avaliacao/listarPorId';
const API_CADASTRAR = 'http://localhost:8000/avaliacao/salvar';
const API_DELETAR = 'http://localhost:8000/avaliacao/deletar';
const API_ATUALIZAR = 'http://localhost:8000/avaliacao/atualizar';


//VARIAVEL DE CONTROLE
let editandoid = null;

async function salvarAvaliacao() {
    const avaliacao = {
        dataDaAvaliacao: document.getElementById("dataDaAvaliacao").value,
        qualidadeDasPecas: document.getElementById("qualidadeDasPecas").value,
        prazoDeEntrega: document.getElementById("prazoDeEntrega").value,
        atendimento: document.getElementById("atendimento").value,
        preco: document.getElementById("preco").value,
        observacoes: document.getElementById("observacoes").value,
    };

    await fetch(API_CADASTRAR, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(avaliacao)
    });

    limparFormulario();
}
