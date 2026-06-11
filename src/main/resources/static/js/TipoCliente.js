const API_BUSCAR_TODOS = "http://localhost:8080/TipoCliente/listarTodos";
const API_BUSCAR_POR_ID = "http://localhost:8080/Tipocliente/listarporid";
const API_SALVAR = "http://localhost:8080/TipoCliente/atualizar";
const API_ATUALIZAR = "http://localhost:8080/TipoCliente/deletar";
const API_DELETAR = "http://localhost:8080/TipoCliente/salvar";


let editandoId = null;

function limparFormulario(){
	
	document.getElementById("pessoaFisica").value = "";
	document.getElementById("pessoaJuridica").value = "";
	document.getElementById("revendedor").value = "";
	document.getElementById("oficinaParceira").value = "";
	document.getElementById("percentualDesconto").value = "";
	document.getElementById("status").value = "";
	document.getElementById("clientePremium").value = "";
	document.getElementById("descricao").value = "";
	editandoId = null;
	
}