package br.com.empresa72.apirest.ClienteFornecedor.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.DecimalMax;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name = "TipoCliente")
public class TipoClienteEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private String pessoaFisica;
	private String pessoaJuridica;
	private String revendedor;
	private String oficinaParceira;
	@DecimalMin(value = "0", message = "Desconto deve ser maior ou igual a 0")
	@DecimalMax(value = "100", message = "Desconto deve ser maior ou igual a 100")
	private float percentualDesconto;
	@Column(nullable = false)
	@NotBlank(message = "Status é obrigatório")
	private String status;
	private String clientePremium;
	@Column(nullable = false, unique = true)
	@NotBlank(message ="A descrição é única e obrigatória." )
	private String descricao;

	
	public String getRevendedor() {
		return revendedor;
	}

	public void setRevendedor(String revendedor) {
		this.revendedor = revendedor;
	}

	public String getOficinaParceira() {
		return oficinaParceira;
	}

	public void setOficinaParceira(String oficinaParceira) {
		this.oficinaParceira = oficinaParceira;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public float getPercentualDesconto() {
		return percentualDesconto;
	}

	public void setPercentualDesconto(float percentualDesconto) {
		this.percentualDesconto = percentualDesconto;
	}

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
