const API_BUSCAR_TODOS = "http://localhost:8011/TipoCliente/listarTodos";
const API_SALVAR = "http://localhost:8011/TipoCliente/salvar";
const API_BUSCAR_POR_ID = "http://localhost:8011/TipoCliente/listarId";
const API_ATUALIZAR = "http://localhost:8011/TipoCliente/atualizar";
const API_DELETAR = "http://localhost:8011/TipoCliente/deletar";
const API_BUSCAR_POR_DESCRICAO = "http://localhost:8011/TipoCliente/listarDescricao";

let editandoId = null;


function limparFormulario(){
	document.getElementById("descricao").value = "";
	document.getElementById("percentualDesconto").value = "";
	document.getElementById("status").value = "";
	editandoId= null;
}

function abrirModal(){
	const modal = new bootstrap.Modal(document.getElementById("modalTipoCliente"));
	modal.show();
}

function fecharModal(){
	const modalElement = document.getElementById("modalTipoCliente");
	const modal = bootstrap.Modal.getInstance(modalElement);
	modal.hide();
}



async function listarTodos(){
	const response =await fetch(API_BUSCAR_TODOS);
	const clientes = await response.json();
	const tbody = document.getElementById("tabelaTiposClientes");
	tbody.innerHTML="";
	console.log(clientes);
	clientes.forEach(cliente=>{
	const tr = document.createElement("tr");

		tr.innerHTML = `
		<td>${cliente.id}</td>
		<td>${cliente.descricao}</td>
		<td>${cliente.percentualDesconto}</td>
		<td>${cliente.status ? "Ativo" : "Inativo"}</td>
		<td>

		    <button class="btn btn-warning btn-sm" onclick="editar(${cliente.id})">
		        Editar
		    </button>

		    <button class="btn btn-danger btn-sm" onclick="deletar(${cliente.id})">
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
	const clientes = {
		descricao: document.getElementById("descricao").value,
		percentualDesconto: document.getElementById("percentualDesconto").value,
		status: document.getElementById("status").value
};

if (!clientes.descricao || !clientes.status) {
        alert("Preencha todos os campos obrigatórios.");
        return;
    }
	console.log(clientes);
	if (editandoId){
		await fetch (`${API_ATUALIZAR}/${editandoId}`,{
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body:JSON.stringify(clientes)
		});
	}else {
	await fetch(API_SALVAR, {
	method: "POST",
	headers: {
		"Content-Type": "application/json"
	},
	body: JSON.stringify(clientes)
});	
}
fecharModal();
await listarTodos();
limparFormulario();	

console.log(clientes);
}


async function deletar(id){
	if (!confirm("Deseja realmente excluir?")) return;
	
	await fetch (`${API_DELETAR}/${id}`,{
		method: "DELETE"
	});
	listarTodos();
}

async function editar(id){
	const response = await fetch(`${API_BUSCAR_POR_ID}/${id}`);
	const tClientes = await response.json();
	
	editandoId = id;
	
	document.getElementById("descricao").value=tClientes.descricao;
	document.getElementById("percentualDesconto").value =tClientes.percentualDesconto;
	document.getElementById("status").value=tClientes.status;
	
	abrirModal();
	
}

async function pesquisar() {

    const descricao =
        document.getElementById("txtPesquisa").value;

    if (descricao === "") {
        listarTodos();
        return;
    }

    const response =
        await fetch(`${API_BUSCAR_POR_DESCRICAO}/${descricao}`);

    const clientes = await response.json();

	console.log(clientes);
	
    const tbody =
        document.getElementById("tabelaTiposClientes");

    tbody.innerHTML = "";

    clientes.forEach(cliente => {

        const tr = document.createElement("tr");

		
		
        tr.innerHTML = `
            <td>${cliente.id}</td>
            <td>${cliente.descricao}</td>
            <td>${cliente.percentualDesconto}</td>
            <td>${cliente.status ? "Ativo" : "Inativo"}</td>
            <td>
                <button
                    class="btn btn-warning btn-sm"
                    onclick="editar(${cliente.id})">

                    Editar

                </button>

                <button
                    class="btn btn-danger btn-sm"
                    onclick="deletar(${cliente.id})">

                    Deletar

                </button>
            </td>
        `;

        tbody.appendChild(tr);
    });
}