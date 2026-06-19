// CHAMADAS DAS APIS
const API_BUSCAR_TODOS = 'http://localhost:8011/avaliacao/listarTodos';
const API_BUSCAR_ID = 'http://localhost:8011/avaliacao/listarPorId';
const API_CADASTRAR = 'http://localhost:8011/avaliacao/salvar';
const API_DELETAR = 'http://localhost:8011/avaliacao/deletar';
const API_ATUALIZAR = 'http://localhost:8011/avaliacao/atualizar';
const API_URL_LISTAR_DADOS= 'http://localhost:8011/Fornecedores/listarTodos';

// VARIÁVEIS DE CONTROLE
let editandoid = null;

function voltarPagina() {
    window.location.href = "192.168.10.84:8010/dashboard.html";
}

let qualidadeDasPecas = 0;
let prazoDeEntrega = 0;
let atendimento = 0;
let preco = 0;

// SALVAR
async function salvarAvaliacao() {

    
	
	const avaliacao = {

		fornecedor : {
			id : document.getElementById("select").value
		},
		
        dataDaAvaliacao: document.getElementById("dataDaAvaliacao").value,

        qualidadeDasPecas: qualidadeDasPecas,

        prazoDeEntrega: prazoDeEntrega,

        atendimento: atendimento,

        preco: preco,

        observacoes: document.getElementById("observacoes").value
    };
	

    console.log(validarCampo());
	console. log (dataDaAvaliacao);

    await fetch(API_CADASTRAR, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(avaliacao)
    });

    alert("Avaliação salva com sucesso!");

    fecharModal();
    limparFormulario();
    listarFornecedor();
}

 function validarCampo()  {

	const select = document.getElementById("select").value;
		

		 if (qualidadeDasPecas < 1){
			
			alert("Preencha este campo!")
			return false;
		} 

		 if(prazoDeEntrega < 1){
			
			alert("Preencha este campo!")
			return false;
		}

		 if(atendimento < 1){
			
			alert("Preencha este campo!")
			return false;
		}

		 if (preco < 1){
						
			alert("Preencha este campo!")
			return false;
		}

		 if (select === ""){
												
			alert("Preencha este campo!")
			return false;
		}
				return true; 		
	}

// LIMPAR FORMULÁRIO
function limparFormulario() {

    document.getElementById("dataDaAvaliacao").value = "";
    document.getElementById("observacoes").value = "";

    qualidadeDasPecas = 0;
    prazoDeEntrega = 0;
    atendimento = 0;
    preco = 0;

    document.querySelectorAll(".star").forEach(star => {
        star.classList.remove("active");
    });

    editandoid = null;
}

// EDITAR
async function editar(id) {

    const response = await fetch(`${API_BUSCAR_ID}/${id}`);
    const avaliacao = await response.json();

    editandoid = id;

    document.getElementById("dataDaAvaliacao").value =
        avaliacao.dataDaAvaliacao;

    document.getElementById("observacoes").value =
        avaliacao.observacoes;

    qualidadeDasPecas = avaliacao.qualidadeDasPecas;
    prazoDeEntrega = avaliacao.prazoDeEntrega;
    atendimento = avaliacao.atendimento;
    preco = avaliacao.preco;

    abrirModal("Editar Avaliação");
}

// MODAL
function abrirModal(nomeFornecedor) {

    document.getElementById("modalAvaliacao").style.display = "flex";

    if (nomeFornecedor) {
        document.getElementById("nomeFornecedor").innerText =
            nomeFornecedor;
    }
	carregarDadosSelect();
}

function fecharModal() {
    document.getElementById("modalAvaliacao").style.display = "none";
}

// ESTRELAS
function hoverStar(star, nota) {

    const estrelas = star.parentElement.querySelectorAll(".star");

    estrelas.forEach((item, index) => {

        if (index < nota) {
            item.classList.add("hover");
        } else {
            item.classList.remove("hover");
        }

    });
}

function limparHover(star) {

    const estrelas = star.parentElement.querySelectorAll(".star");

    estrelas.forEach(item => {
        item.classList.remove("hover");
    });
}

function avaliar(star, nota) {

    const rating = star.parentElement;

    const estrelas = rating.querySelectorAll(".star");

    estrelas.forEach((item, index) => {

        if (index < nota) {
            item.classList.add("active");
        } else {
            item.classList.remove("active");
        }

    });

    const campo = rating.dataset.campo;

    switch (campo) {

        case "qualidadeDasPecas":
            qualidadeDasPecas = nota;
            break;

        case "prazoDeEntrega":
            prazoDeEntrega = nota;
            break;

        case "atendimento":
            atendimento = nota;
            break;

        case "preco":
            preco = nota;
            break;
    }

    console.log(
        "Qualidade:", qualidadeDasPecas,
        "Prazo:", prazoDeEntrega,
        "Atendimento:", atendimento,
        "Preço:", preco
    );
}

// LISTAR
async function listarFornecedor() {

        const response = await fetch(API_BUSCAR_TODOS);

        const avaliacoes = await response.json();

        const tbody = document.getElementById("tabela");

 		console.log("Avaliações recebidas:", avaliacoes);
        tbody.innerHTML = "";

		avaliacoes.forEach(avaliacao => {

		    if (!avaliacao.fornecedor) {
		        console.warn(
		            `Avaliação ${avaliacao.id} sem fornecedor`
		        );
		        return;
		    }

		    const tr = document.createElement("tr");

		    let soma =
		        avaliacao.qualidadeDasPecas +
		        avaliacao.prazoDeEntrega +
		        avaliacao.atendimento +
		        avaliacao.preco;

		    let media = ((soma / 20) * 100).toFixed(2);

		    tr.innerHTML = `
		        <td>${avaliacao.fornecedor.nomeFantasia}</td>
		        <td>${avaliacao.fornecedor.cnpj}</td>
		        <td>${avaliacao.fornecedor.cidade}</td>
		        <td>${media}%</td>
		    `;

		    tbody.appendChild(tr);

		});
		console.log("Avaliações recebidas:", avaliacoes.length);
		console.log("Linhas criadas:", tbody.children.length);
}

// INICIAR TELA
document.addEventListener("DOMContentLoaded", () => {
    listarFornecedor();
});

async function carregarDadosSelect() {

const response = await fetch(API_URL_LISTAR_DADOS);
const dados = await response.json();

const select = document.getElementById('select');

select.innerHTML = '';

const optionDefault = document.createElement('option');
optionDefault.value = '';
optionDefault.textContent = 'Selecione uma opção';
select.appendChild(optionDefault);

dados.forEach(item => {
const option = document.createElement('option');
option.value = item.id;
option.textContent = item.nomeFantasia;
select.appendChild(option);
});

}