package br.com.empresa72.apirest.ClienteFornecedor.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.empresa72.apirest.ClienteFornecedor.entity.FornecedoresEntity;

@Repository
public interface FornecedoresRepository extends JpaRepository<FornecedoresEntity, Long>{
	
	
	    // Busca por Razão Social
	    List<FornecedoresEntity> findByRazaoSocialContainingIgnoreCase(String razaoSocial);

	    // Busca por CNPJ
	    Optional<FornecedoresEntity> findByCnpj(String cnpj);

	}
