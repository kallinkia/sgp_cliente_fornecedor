const API_BUSCAR_TODOS = "http://localhost:8080/cliente/listartodos";
const API_SALVAR = "http://localhost:8080/cliente/salvar";
const API_BUSCAR_POR_ID = "http://localhost:8080/cliente/listarporid";
const API_ATUALIZAR = "http://localhost:8080/cliente/atualizar";
const API_DELETAR = "http://localhost:8080/cliente/deletar";


let editandoId = null;

function abrirModal(){
	const modal = new bootstrap.Modal(document.getElementById("clienteModal"));
	modal.show();
}

function fecharModal(){
	const modalElement = document.getElementById("clienteModal");
	const modal = bootstrap.Modal.getInstance(modalElement);
	modal.hide();
}


function limparFormulario() {

    document.getElementById("nome_razaoSocial").value = "";
    document.getElementById("cpf").value = "";
    document.getElementById("cnpj").value = "";
    document.getElementById("email").value = "";
    document.getElementById("telefone").value = "";
    document.getElementById("endereco").value = "";
    document.getElementById("cidade").value = "";
    document.getElementById("estado").value = "";
    document.getElementById("tipo").value = "";
    document.getElementById("ativo").checked = false;

    editandoId = null;
}

//inicializar
document.addEventListener("DOMContentLoaded", () => {
	listarTodos();
});


async function salvar() {

    const cliente = {
        nome_razaoSocial: document.getElementById("nome_razaoSocial").value,
        cpf: document.getElementById("cpf").value,
        cnpj: document.getElementById("cnpj").value,
        email: document.getElementById("email").value,
        telefone: document.getElementById("telefone").value,
        endereco: document.getElementById("endereco").value,
        cidade: document.getElementById("cidade").value,
        estado: document.getElementById("estado").value,
        tipo: document.getElementById("tipo").value,
        ativo: document.getElementById("ativo").checked
    };

    console.log("SALVANDO...");

    if (editandoId) {

        await fetch(`${API_ATUALIZAR}/${editandoId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cliente)
        });

    } else {

        await fetch(API_SALVAR, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cliente)
        });

    }

    fecharModal();
    await listartodos();
    limparFormulario();
}

async function listartodos() {

    const response = await fetch(API_BUSCAR_TODOS);
    const clientes = await response.json();

    const tbody = document.querySelector("tbody");
    tbody.innerHTML = "";

    clientes.forEach(cliente => {

        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${cliente.id}</td>
            <td>${cliente.nome_razaoSocial}</td>
            <td>${cliente.cpf}</td>
            <td>${cliente.cnpj}</td>
            <td>${cliente.email}</td>
            <td>${cliente.telefone}</td>
            <td>${cliente.endereco}</td>
            <td>${cliente.cidade}</td>
            <td>${cliente.estado}</td>
            <td>${cliente.tipo}</td>
            <td>${cliente.ativo ? "Ativo" : "Inativo"}</td>
        `;

        tbody.appendChild(tr);
    });
}

async function listarPorId(id) {

    const response = await fetch(`${API_BUSCAR_POR_ID}/${id}`);
    const cliente = await response.json();

    console.log(cliente);

    return cliente;
}

async function atualizar(id) {

    const cliente = {
        nome_razaoSocial: document.getElementById("nome_razaoSocial").value,
        cpf: document.getElementById("cpf").value,
        cnpj: document.getElementById("cnpj").value,
        email: document.getElementById("email").value,
        telefone: document.getElementById("telefone").value,
        endereco: document.getElementById("endereco").value,
        cidade: document.getElementById("cidade").value,
        estado: document.getElementById("estado").value,
        tipo: document.getElementById("tipo").value,
        ativo: document.getElementById("ativo").checked
    };

    await fetch(`${API_ATUALIZAR}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(cliente)
    });

    listarTodos();
}



async function deletar(id) {

    await fetch(`${API_DELETAR}/${id}`, {
        method: "DELETE"
    });

    listarTodos();
}




