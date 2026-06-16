const API_BUSCAR_TODOS = "http://localhost:8011/TipoCliente/listarTodos";
const API_BUSCAR_POR_ID = "http://localhost:8011/Tipocliente/listarporid";
const API_SALVAR = "http://localhost:8011/TipoCliente/atualizar";
const API_ATUALIZAR = "http://localhost:8011/TipoCliente/deletar";
const API_DELETAR = "http://localhost:8011/TipoCliente/salvar";


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

function AbrirModal(){
	
	const modal = new bootstrap.Modal(document.getElementById("modalTipoCliente"));
	modal.show();
}

function FecharModal(){
	
	const modalElement = document.getElementById("modalTipoCliente");
	const modal = bootstrap.Modal.getInstance(modalElement);
	modal.hide();
}


async function listarTodos(){
	
	const response = await fetch(API_BUSCAR_TODOS);
	const nomes = await response.json();
	const tbody = document.getElementById("tabelaTipoCliente");
	tbody.innerHTML="";

    nomes.forEach(nome => {

    const tr = document.createElement("tr");
	let statusAI;
	  
	  if (fornecedores.status === true) {
	      statusAI = "Ativo";
	  } else {
	      statusAI = "Inativo";
	  }
    tr.innerHTML = `

<td>${nome.pessoaFisica}</td>

<td>${nome.pessoaJuridica}</td>

<td>${nome.revendedor}</td>

<td>${nome.oficinaParceira}</td>

<td>${nome.percentualDesconto}</td>

<td>${nome.status}</td>

<td>${nome.clientePremium}</td>

<td>${nome.descricao}</td>
<td>

<button class="btn btn-warning btn-sm" onclick="editar(${nome.id})">

Editar

</button>

<button class="btn btn-danger btn-sm" onclick="deletar(${nome.id})">

Deletar

</button>

</td>

`;

tbody.appendChild(tr);

});

}

//inicializar
document.addEventListener("DOMContentLoaded", () => {
	listarTodos();
	
	});	
	
async function salvar(){
	
	//RECUPERANDO OS VALORES DOS INPUTS
	const nome = {
		
		pessoaFisica : document.getElementById('pessoaFisica').value,
		pessoaJuridica : document.getElementById('pessoaJuridica').value,
		revendedor:document.getElementById('revendedor').value,
		oficinaParceira:document.getElementById('oficinaParceira').value,
		percentualDesconto:document.getElementById('percentualDesconto').value,
		status:document.getElementById('status').value,
		clientePremium:document.getElementById('clientePremium').value,
		descricao:document.getElementById('descricao').value,
	}
	console.log("SALVANDO...");
	console.log(nome);
	
	if(editandoId){
		//EDITANDO
		//PRECISO PASSAR O METODO, O CABEÇALHO E OS MEUS DADOS OU OBJETO.
			await fetch(`${API_ATUALIZAR}/${editandoId}`,{
				
				method: "PUT", //METODO DA MINHA API
				
				headers: {// CABEÇALHO INDICANDO O FORMATO QUE IREI PASSAR OS DADOS
					
					"Content-Type":"application/json" // SERA UM PADRÃO NOSSO
				},
				
				body: JSON.stringify(nome)// CONVERTE EM FORMATO JSON
				
				
			});
		
		
	  }else{
		//INSERINDO
	    await fetch(API_SALVAR,{
			
			method:"POST",
			headers:{
				
				"Content-Type":"application/json"
			},
			
			body:JSON.stringify(nome)
		});
		
		}
		FecharModal();
		await listarTodos();
		//limparFormulario();
		
	}	
		
	async function deletar(id){
		
		if(!confirm("Deseja realmente excluir?"))return;
		
		await fetch (`${API_DELETAR}/${id}`, {
			
			method:"DELETE"
		});
		
		listarTodos();
	}	
		
	async function editar(id){
		
		const response = await fetch(API_BUSCAR_POR_ID);
		const nome=await response.json();
		
		
		editandoId = id;
		document.getElementById("pessoaFisica").value =nome.pessoaFisica;
		document.getElementById("pessoaJuridica").value =nome.pessoaJuridica;
		document.getElementById("revendedor").value =nome.revendedor;
		document.getElementById("oficinaParceira").value =nome.oficinaParceira;
		document.getElementById("percentualDesconto").value =nome.percentualDesconto;
		document.getElementById("status").value =nome.status;
		document.getElementById("clientePremium").value =nome.clientePremium;
		document.getElementById("descricao").value =nome.descricao;
		
		AbrirModal();
		
	}	
		
		
	
	



