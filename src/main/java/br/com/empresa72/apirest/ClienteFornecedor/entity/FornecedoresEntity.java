package br.com.empresa72.apirest.ClienteFornecedor.entity;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Email;

import org.hibernate.validator.constraints.br.CNPJ;

@Entity
@Table(name = "Fornecedor")
public class FornecedoresEntity {
		@Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    private String razaoSocial;
 
	    private String nomeFantasia;
	    
	    @CNPJ
	    private String cnpj;
	    
	    @Email
	    private String email;
		
	    private String telefone;

	    private String contatoResponsavel;

	    private String endereco;

	    private String cidade;

		@Column
	    private String estado;

		@Column
	    private int prazoMedioEntrega;

	    private Boolean status;
	    
	    
//// GETTERS E SETTERS	    

	    
	    public Long getId() {
			return id;
		}

		public void setId(Long id) {
			this.id = id;
		}

		public String getRazaoSocial() {
			return razaoSocial;
		}

		public void setRazaoSocial(String razaoSocial) {
			this.razaoSocial = razaoSocial;
		}

		public String getNomeFantasia() {
			return nomeFantasia;
		}

		public void setNomeFantasia(String nomeFantasia) {
			this.nomeFantasia = nomeFantasia;
		}

		public String getCnpj() {
			return cnpj;
		}

		public void setCnpj(String cnpj) {
			this.cnpj = cnpj;
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

		public String getContatoResponsavel() {
			return contatoResponsavel;
		}

		public void setContatoResponsavel(String contatoResponsavel) {
			this.contatoResponsavel = contatoResponsavel;
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

		public Integer getPrazoMedioEntrega() {
			return prazoMedioEntrega;
		}

		public void setPrazoMedioEntrega(Integer prazoMedioEntrega) {
			this.prazoMedioEntrega = prazoMedioEntrega;
		}

		public Boolean getStatus() {
			return status;
		}

		public void setStatus(Boolean status) {
			this.status = status;
		}

	}

