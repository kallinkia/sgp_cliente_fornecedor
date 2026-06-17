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
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
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
	

    @NotNull(message = "A data da avaliação é obrigatória")
	private LocalDate dataDaAvaliacao;
	
	@Min (value = 1) 
	@Max(value = 5)
	private int qualidadeDasPecas;
	
	@Min (value = 1) 
	@Max(value = 5)
	private int prazoDeEntrega;
	
	@Min (value = 1) 
	@Max(value = 5)
	private int atendimento;
	
	@Min (value = 1) 
	@Max(value = 5)
	private int preco;
	
	@Size(max = 500)
	private String observacoes;
	
	public String getObservacoes() {
		return observacoes;
	}


	@ManyToOne
	@JoinColumn(name = "idFornecedores")
	private FornecedoresEntity fornecedor;
	
	public void setObservacoes(String observacoes) {
		this.observacoes = observacoes;
	}

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

	public FornecedoresEntity getFornecedor() {
		return fornecedor;
	}

	public void setFornecedor(FornecedoresEntity fornecedor) {
		this.fornecedor = fornecedor;
	}
	
	

}
