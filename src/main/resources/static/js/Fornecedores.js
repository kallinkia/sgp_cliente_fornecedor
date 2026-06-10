const API_BUSCAR_TODOS = "http://localhost:8011/Fornecedores/listarTodos";
const API_SALVAR = "http://localhost:8011/Fornecedores/salvar";
const API_BUSCAR_POR_ID = "http://localhost:8011/Fornecedores/listarId";
const API_ATUALIZAR = "http://localhost:8011/Fornecedores/atualizar";
const API_DELETAR = "http://localhost:8011/Fornecedores/deletar";

let editandoId = null;

function limparFormulario(){
	document.getElementById("razaoSocial").value = "";
	document.getElementById("nomeFantasia").value = "";
	document.getElementById("cnpj").value = "";
	document.getElementById("email").value = "";
	document.getElementById("telefone").value = "";
	document.getElementById("contatoResponsavel").value = "";
	document.getElementById("endereco").value = "";
	document.getElementById("cidade").value = "";
	document.getElementById("estado").value = "";
	document.getElementById("prazoMedioEntrega").value = "";
	document.getElementById("status").value = "";
	editandoId= null;
}



async function listarTodos(){
	const response =await fetch(API_BUSCAR_TODOS);
	
	const participantes = await response.json();
	const tbody = document.querySelector("tbody");
		tbody.innerHTML="";

	participantes.forEach(participante=>{
	const tr = document.createElement("tr");
	tr.innerHTML = `
		<td>${participante.id}</td>
		<td>${participante.nome}</td>
		<td>${participante.cidade}</td>
		<td>${participante.tipoCorrida}</td>
		<td>${participante.numeroCamisa}</td>
	`;
	
	tbody.appendChild(tr);

});
}

//inicializar
document.addEventListener("DOMContentLoaded", () => {
	listarTodos();
});


async function salvar(){
	const participantes = {
		nome: document.getElementById("nome").value,
		cidade: document.getElementById("cidade").value,
		tipoCorrida: document.getElementById("tipoCorrida").value,
		numeroCamisa: document.getElementById("numeroCamisa").value
	};
	
		await fetch(API_SALVAR, {
	method: "POST",
	headers: {
		"Content-Type": "application/json"
	},
	body: JSON.stringify(participantes)
});	

fecharModal();
carregarCarros();	
}