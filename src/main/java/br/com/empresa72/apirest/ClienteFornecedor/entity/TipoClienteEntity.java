package br.com.empresa72.apirest.ClienteFornecedor.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "TipoCliente")
public class TipoClienteEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private String pessoaFisica;
	private String pessoaJuridica;
	private float percentualDesconto;
	@Column(nullable = false)
	private boolean ativo;
	
	
	
	

	public float getPercentualDesconto() {
		return percentualDesconto;
	}

	public void setPercentualDesconto(float percentualDesconto) {
		this.percentualDesconto = percentualDesconto;
	}

	private String clientePremium;
	@Column(nullable = false, unique = true)
	private String descricao;

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getPessoaFisica() {
		return pessoaFisica;
	}

	public void setPessoaFisica(String pessoaFisica) {
		this.pessoaFisica = pessoaFisica;
	}

	public String getPessoaJuridica() {
		return pessoaJuridica;
	}

	public void setPessoaJuridica(String pessoaJuridica) {
		this.pessoaJuridica = pessoaJuridica;
	}

	public String getClientePremium() {
		return clientePremium;
	}

	public void setClientePremium(String clientePremium) {
		this.clientePremium = clientePremium;
	}

}
