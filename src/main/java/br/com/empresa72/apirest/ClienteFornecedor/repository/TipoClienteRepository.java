package br.com.empresa72.apirest.ClienteFornecedor.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.empresa72.apirest.ClienteFornecedor.entity.TipoClienteEntity;

@Repository
public interface TipoClienteRepository extends JpaRepository<TipoClienteEntity, Long> {

}
