const API_BUSCAR_TODOS = "http://localhost:8011/cliente/listartodos";
const API_SALVAR = "http://localhost:8011/cliente/salvar";
const API_BUSCAR_POR_ID = "http://localhost:8011/cliente/listarporid";
const API_ATUALIZAR = "http://localhost:8011/cliente/atualizar";
const API_DELETAR = "http://localhost:8011/cliente/deletar";
const API_BUSCAR_NOME = "http://localhost:8011/cliente/listarNome";
const API_BUSCAR_CPF = "http://localhost:8011/cliente/listarCpf";
const API_BUSCAR_CNPJ = "http://localhost:8011/cliente/listarCnpj";

let editandoId = null;

function voltarPagina() {
    window.location.href = "http://192.168.10.84:8010/dashboard.html";
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
    document.getElementById("ativo").value = "true";

    editandoId = null;
}

function abrirModal() {

    const modal =
        new bootstrap.Modal(
            document.getElementById("clienteModal")
        );

    modal.show();
}

function fecharModal() {

    const modalElement =
        document.getElementById("clienteModal");

    const modal =
        bootstrap.Modal.getInstance(modalElement);

    modal.hide();
}

async function listarTodos() {

    try {

        const response = await fetch(API_BUSCAR_TODOS);

        if (!response.ok) {
            throw new Error("Erro ao buscar clientes");
        }

        const clientes = await response.json();

        const tbody = document.getElementById("cliente");

        tbody.innerHTML = "";

        clientes.forEach(cliente => {

            const tr = document.createElement("tr");

			tr.innerHTML = `
					<td>${cliente.id}</td>
					<td>${cliente.nomeRazaoSocial}</td>
					<td>${cliente.cpf}</td>
					<td>${cliente.cnpj}</td>
					<td>${cliente.email}</td>
					<td>${cliente.telefone}</td>
					<td>${cliente.endereco}</td>
					<td>${cliente.cidade}</td>
					<td>${cliente.estado}</td>
					<td>${cliente.tipo}</td>
					<td>${cliente.ativo ? "Ativo" : "Inativo"}</td>
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

    } catch (error) {

        console.error("Erro ao listar cliente:", error);

    }

}

async function salvar() {

    const cliente = {

        nomeRazaoSocial: document.getElementById("nome_razaoSocial").value,
        cpf: document.getElementById("cpf").value,
        cnpj: document.getElementById("cnpj").value,
        email: document.getElementById("email").value,
        telefone: document.getElementById("telefone").value,
        endereco: document.getElementById("endereco").value,
        cidade: document.getElementById("cidade").value,
        estado: document.getElementById("estado").value,
        tipo: document.getElementById("tipo").value,
        ativo: document.getElementById("ativo").value === "true"

    };

    if (!cliente.nomeRazaoSocial || !cliente.email || !cliente.telefone || !cliente.tipo) {
        alert("Preencha todos os campos obrigatórios.");
        return;
    }

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
    limparFormulario();
    await listarTodos();
}

async function deletar(id) {

    if (!confirm("Deseja realmente excluir este cliente?")) {
        return;
    }

    await fetch(
        `${API_DELETAR}/${id}`,
        {
            method: "DELETE"
        }
    );

    listarTodos();
}

async function editar(id) {

    const response =
        await fetch(`${API_BUSCAR_POR_ID}/${id}`);

    const cliente =
        await response.json();

    editandoId = id;

	document.getElementById("nome_razaoSocial").value = cliente.nomeRazaoSocial;
	document.getElementById("cpf").value = cliente.cpf;
	document.getElementById("cnpj").value = cliente.cnpj;
	document.getElementById("email").value = cliente.email;
	document.getElementById("telefone").value = cliente.telefone;
	document.getElementById("endereco").value = cliente.endereco;
	document.getElementById("cidade").value = cliente.cidade;
	document.getElementById("estado").value = cliente.estado;
	document.getElementById("tipo").value = cliente.tipo;
	document.getElementById("ativo").value = cliente.ativo;

    abrirModal();
}

async function pesquisar() {

    const nome =
        document.getElementById("filtroNome").value.trim();

    const documento =
        document.getElementById("filtroDocumento").value.trim();

    let clientes = [];

    if (documento !== "") {

        if (documento.length <= 14) {

            const response =
                await fetch(
                    `${API_BUSCAR_CPF}/${documento}`
                );

            const cliente =
                await response.json();

            if (cliente) {
                clientes.push(cliente);
            }

        } else {

            const response =
                await fetch(
                    `${API_BUSCAR_CNPJ}/${documento}`
                );

            const cliente =
                await response.json();

            if (cliente) {
                clientes.push(cliente);
            }
        }

    } else if (nome !== "") {

        const response =
            await fetch(
                `${API_BUSCAR_NOME}/${nome}`
            );

        clientes =
            await response.json();

    } else {

        listarTodos();
        return;
    }

    const tbody =
        document.getElementById("cliente");

    tbody.innerHTML = "";

    clientes.forEach(cliente => {

        const tr =
            document.createElement("tr");

			tr.innerHTML = `
								<td>${cliente.id}</td>
								<td>${cliente.nomeRazaoSocial}</td>
								<td>${cliente.cpf}</td>
								<td>${cliente.cnpj}</td>
								<td>${cliente.email}</td>
								<td>${cliente.telefone}</td>
								<td>${cliente.endereco}</td>
								<td>${cliente.cidade}</td>
								<td>${cliente.estado}</td>
								<td>${cliente.tipo}</td>
								<td>${cliente.ativo ? "Ativo" : "Inativo"}</td>
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

async function carregarDadosSelect() {

    const response = await fetch(API_URL_LISTAR_DADOS);
    const dados = await response.json();

    const select = document.getElementById('usuario-select');

    select.innerHTML = '';

    const optionDefault = document.createElement('option');
    optionDefault.value = '';
    optionDefault.textContent = 'Selecione uma opção';
    select.appendChild(optionDefault);

    dados.forEach(item => {
        const option = document.createElement('option');
        option.value = item.id;
        option.textContent = item.nome;
        select.appendChild(option);
    });

}

document.addEventListener("DOMContentLoaded", function () {

    listarTodos();

});
