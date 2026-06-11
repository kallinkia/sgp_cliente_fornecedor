const API_BUSCAR_TODOS = "http://localhost:8080/TipoCliente/listarTodos";
const API_BUSCAR_POR_ID = "http://localhost:8080/Tipocliente/listarporid";
const API_SALVAR = "http://localhost:8080/TipoCliente/atualizar";
const API_ATUALIZAR = "http://localhost:8080/TipoCliente/deletar";
const API_DELETAR = "http://localhost:8080/TipoCliente/salvar";


let editandoId = null;

function limparFormulario(){
	
	document.getElementById("Descrição").value = "";
	document.getElementById("PercentualdeDesconto").value = "";
	document.getElementById("Status").value = "";
	
	editandoId = null;
	
}

function AbrirModal(){
	
	const modal = new bootstrap.Modal(document.getElementById("cadastroModal"));
	modal.show();
}

function FecharModal(){
	
	const modalElement = document.getElementById("cadastroModal");
	const modal = bootstrap.Modal.getInstance(modalElement);
	modal.hide();
}


async function listarNomes(){
	
	const response = await fetch(API_BUSCAR_TODOS);
	const nomes = await response.json();
	
}

nomes.forEach(nome => {

const tr = document.createElement("tr");

tr.innerHTML = `

<td>${nome.id}</td>

<td>${nome.Descrição}</td>

<td>${nome.PercentualdeDesconto}</td>

<td>${nome.Status}</td>



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

async function salvarNome(){
	
	//RECUPERANDO OS VALORES DOS INPUTS
	const nome = {
		
		Descrição : document.getElementById('Descrição').value,
		PercentualdeDesconto : document.getElementById('PercentualdeDesconto').value,
		Status:document.getElementById('Status').value,
		
	}
	
	
	if(editandoId){
		//EDITANDO
		//PRECISO PASSAR O METODO, O CABEÇALHO E OS MEUS DADOS OU OBJETO.
			await fetch(`${API_ATUALIZAR}/${id}/${editandoId}`,{
				
				method: 'PUT', //METODO DA MINHA API
				
				headers: {// CABEÇALHO INDICANDO O FORMATO QUE IREI PASSAR OS DADOS
					
					'Content-Type':'application/json' // SERA UM PADRÃO NOSSO
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
		await listarNomes();
		limparFormulario();
		
	}	
		
	async function deletar(id){
		
		if(!confirm("Deseja realmente excluir?"))return;
		
		await fetch (`${API_DELETAR}/${id}`, {
			
			method:"DELETE"
		});
		
		listarNomes();
	}	
		
	async function editar(id){
		
		const response = await fetch(`${API_BUSCAR_POR_ID}/${id}`);
		const nome=await response.json();
		
		
		editandoId = id;
		document.getElementById("Descrição").value =nome.Descricao;
		document.getElementById("PercentualdeDesconto").value =nome.PercentualdeDesconto;
		document.getElementById("Status").value =nome.Status;
	
		
		aAbrirModal();
		
	}	
		
		
	
	



