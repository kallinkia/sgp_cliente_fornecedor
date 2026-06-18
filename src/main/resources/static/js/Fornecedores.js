const API_BUSCAR_TODOS = "http://localhost:8011/Fornecedores/listarTodos";
const API_SALVAR = "http://localhost:8011/Fornecedores/salvar";
const API_BUSCAR_POR_ID = "http://localhost:8011/Fornecedores/listarId";
const API_ATUALIZAR = "http://localhost:8011/Fornecedores/atualizar";
const API_DELETAR = "http://localhost:8011/Fornecedores/deletar";
const API_BUSCAR_RAZAO_SOCIAL = "http://localhost:8011/Fornecedores/listarRazaoSocial";
const API_BUSCAR_CNPJ = "http://localhost:8011/Fornecedores/listarCnpj";

let editandoId = null;

function voltarPagina() {
    window.history.back();
}

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

function abrirModal(){
	const modal = new bootstrap.Modal(document.getElementById("fornecedorModal"));
	modal.show();
}

function fecharModal(){
	const modalElement = document.getElementById("fornecedorModal");
	const modal = bootstrap.Modal.getInstance(modalElement);
	modal.hide();
}



async function listarTodos(){
	const response =await fetch(API_BUSCAR_TODOS);
	const fornecedores = await response.json();
	const tbody = document.getElementById("Fornecedor");
			tbody.innerHTML="";

	fornecedores.forEach(fornecedor=>{
	const tr = document.createElement("tr");

		tr.innerHTML = `
		<td>${fornecedor.id}</td>
		<td>${fornecedor.razaoSocial}</td>
		<td>${fornecedor.nomeFantasia}</td>
		<td>${fornecedor.cnpj}</td>
		<td>${fornecedor.email}</td>
		<td>${fornecedor.telefone}</td>
		<td>${fornecedor.contatoResponsavel}</td>
		<td>${fornecedor.cidade}</td>
		<td>${fornecedor.status ? "Ativo" : "Inativo"}</td>
		<td>

		    <button class="btn btn-warning btn-sm" onclick="editar(${fornecedor.id})">
		        Editar
		    </button>

		    <button class="btn btn-danger btn-sm" onclick="deletar(${fornecedor.id})">
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
	const fornecedores = {
		razaoSocial: document.getElementById("razaoSocial").value,
			nomeFantasia: document.getElementById("nomeFantasia").value,
			cnpj: document.getElementById("cnpj").value,
			email: document.getElementById("email").value,
			telefone: document.getElementById("telefone").value,
			contatoResponsavel: document.getElementById("contatoResponsavel").value,
			endereco: document.getElementById("endereco").value,
			cidade: document.getElementById("cidade").value,
			estado: document.getElementById("estado").value,
			prazoMedioEntrega: document.getElementById("prazoMedioEntrega").value,
			status: document.getElementById("status").value
};

if (!fornecedores.razaoSocial || !fornecedores.nomeFantasia || !fornecedores.cnpj || !fornecedores.email || !fornecedores.telefone || !fornecedores.contatoResponsavel) {
        alert("Preencha todos os campos obrigatórios.");
        return;
    }
	console.log(fornecedores);
	if (editandoId){
		await fetch (`${API_ATUALIZAR}/${editandoId}`,{
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body:JSON.stringify(fornecedores)
		});
	}else {
	await fetch(API_SALVAR, {
	method: "POST",
	headers: {
		"Content-Type": "application/json"
	},
	body: JSON.stringify(fornecedores)
});	
}
fecharModal();
await listarTodos();
limparFormulario();	

console.log(fornecedores);
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
	const fornecedores = await response.json();
	
	editandoId = id;
	
	document.getElementById("razaoSocial").value=fornecedores.razaoSocial;
	document.getElementById("nomeFantasia").value =fornecedores.nomeFantasia;
	document.getElementById("cnpj").value =fornecedores.cnpj;
	document.getElementById("email").value =fornecedores.email;
	document.getElementById("telefone").value =fornecedores.telefone;
	document.getElementById("contatoResponsavel").value =fornecedores.contatoResponsavel;
	document.getElementById("endereco").value =fornecedores.endereco;
	document.getElementById("cidade").value =fornecedores.cidade;
	document.getElementById("estado").value =fornecedores.estado;
	document.getElementById("prazoMedioEntrega").value= fornecedores.prazoMedioEntrega;
	document.getElementById("status").value=fornecedores.status;
	
	abrirModal();
	
}

async function pesquisar() {

    const razaoSocial = document.getElementById("filtroRazaoSocial").value;
    const cnpj = document.getElementById("filtroCnpj").value;

    let fornecedores = [];

    if (cnpj !== "") {

        const response = await fetch(
            `${API_BUSCAR_CNPJ}/${cnpj}`
        );

        const fornecedor = await response.json();

        if (fornecedor) {
            fornecedores.push(fornecedor);
        }

    } else if (razaoSocial !== "") {

        const response = await fetch(
            `${API_BUSCAR_RAZAO_SOCIAL}/${razaoSocial}`
        );

        fornecedores = await response.json();

    } else {

        listarTodos();
        return;
    }

    const tbody = document.getElementById("Fornecedor");
    tbody.innerHTML = "";

    fornecedores.forEach(fornecedores => {

        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${fornecedores.id}</td>
            <td>${fornecedores.razaoSocial}</td>
            <td>${fornecedores.nomeFantasia}</td>
            <td>${fornecedores.cnpj}</td>
            <td>${fornecedores.email}</td>
            <td>${fornecedores.telefone}</td>
            <td>${fornecedores.contatoResponsavel}</td>
            <td>${fornecedores.endereco}</td>
            <td>${fornecedores.cidade}</td>
            <td>${fornecedores.estado}</td>
            <td>${fornecedores.prazoMedioEntrega}</td>
            <td>${fornecedores.status}</td>
            <td>
                <button
                    class="btn btn-warning btn-sm"
                    onclick="editar(${fornecedores.id})">

                    Editar

                </button>

                <button
                    class="btn btn-danger btn-sm"
                    onclick="deletar(${fornecedores.id})">

                    Deletar

                </button>
            </td>
        `;

        tbody.appendChild(tr);
    });
}
