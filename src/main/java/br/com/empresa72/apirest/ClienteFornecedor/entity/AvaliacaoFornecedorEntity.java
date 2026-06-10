package br.com.empresa72.apirest.ClienteFornecedor.entity;

import java.io.Serializable;
import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.Size;

@Entity
@Table(name = "avaliacaoFornecedores")
public class AvaliacaoFornecedorEntity implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private LocalDate dataDaAvaliacao;
	@Size(min = 1, max = 5)
	private int qualidadeDasPecas;
	@Size(min = 1, max = 5)
	private int prazoDeEntrega;
	
	
	@Size(min = 1, max = 5)
	private int atendimento;
	@Size(min = 1, max = 5)
	private int preco;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "idFornecedores")
	private Fornecedores fornecedor;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public LocalDate getDataDaAvaliacao() {
		return dataDaAvaliacao;
	}

	public void setDataDaAvaliacao(LocalDate dataDaAvaliacao) {
		this.dataDaAvaliacao = dataDaAvaliacao;
	}

	public int getQualidadeDasPecas() {
		return qualidadeDasPecas;
	}

	public void setQualidadeDasPecas(int qualidadeDasPecas) {
		this.qualidadeDasPecas = qualidadeDasPecas;
	}

	public int getPrazoDeEntrega() {
		return prazoDeEntrega;
	}

	public void setPrazoDeEntrega(int prazoDeEntrega) {
		this.prazoDeEntrega = prazoDeEntrega;
	}

	public int getAtendimento() {
		return atendimento;
	}

	public void setAtendimento(int atendimento) {
		this.atendimento = atendimento;
	}

	public int getPreco() {
		return preco;
	}

	public void setPreco(int preco) {
		this.preco = preco;
	}

	public Fornecedores getFornecedor() {
		return fornecedor;
	}

	public void setFornecedor(Fornecedores fornecedor) {
		this.fornecedor = fornecedor;
	}
	
	

}
