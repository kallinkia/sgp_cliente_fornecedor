package br.com.empresa72.apirest.ClienteFornecedor.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.empresa72.apirest.ClienteFornecedor.entity.AvaliacaoFornecedorEntity;

@Repository
public interface AvaliacaoFornecedorRepository extends JpaRepository<AvaliacaoFornecedorEntity, Long>{

}
