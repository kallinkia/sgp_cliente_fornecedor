package br.com.empresa72.apirest.ClienteFornecedor.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.empresa72.apirest.ClienteFornecedor.entity.FornecedoresEntity;

public interface FornecedoresRepository extends JpaRepository<FornecedoresEntity, Long>{

}
