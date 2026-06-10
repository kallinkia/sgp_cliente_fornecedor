package br.com.empresa72.apirest.ClienteFornecedor.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.swing.Spring;
import javax.validation.constraints.Email;

import org.hibernate.validator.constraints.br.CNPJ;
import org.hibernate.validator.constraints.br.CPF;

@Entity
@Table(name = "cliente")

public class ClienteEntity implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private String nome_razaoSocial;
	@CPF
	private String cpf;
	@CNPJ
	private String cnpj;
	@Email
	private String email;
	private String telefone;
	private String endereco;
	private String cidade;
	private String estado;
	private String tipo;
	private boolean ativo;

	
	// RELACIONAMENTOS
	@ManyToOne
	@JoinColumn(name = "TipoCliente")
	private TipoClienteEntity TipoCliente;

	public long getId() {
		return id;
	}

	public String getCpf() {
		return cpf;
	}
	public void setCpf(String cpf) {
		this.cpf = cpf;
	}
	public String getCnpj() {
		return cnpj;
	}
	public void setCnpj(String cnpj) {
		this.cnpj = cnpj;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getNome_razaoSocial() {
		return nome_razaoSocial;
	}

	public void setNome_razaoSocial(String nome_razaoSocial) {
		this.nome_razaoSocial = nome_razaoSocial;
	}


	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getTelefone() {
		return telefone;
	}

	public void setTelefone(String telefone) {
		this.telefone = telefone;
	}

	public String getEndereco() {
		return endereco;
	}

	public void setEndereco(String endereco) {
		this.endereco = endereco;
	}

	public String getCidade() {
		return cidade;
	}

	public void setCidade(String cidade) {
		this.cidade = cidade;
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}

	public String getTipo() {
		return tipo;
	}

	public void setTipo(String tipo) {
		this.tipo = tipo;
	}

	public boolean isAtivo() {
		return ativo;
	}

	public void setAtivo(boolean ativo) {
		this.ativo = ativo;
	}

}
