package br.com.empresa72.apirest.ClienteFornecedor.repository;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.empresa72.apirest.ClienteFornecedor.entity.TipoClienteEntity;

@Repository
public interface TipoClienteRepository extends JpaRepository<TipoClienteEntity, Long> {

	List<TipoClienteEntity> findByDescricaoContainingIgnoreCase(String descricao);

}
