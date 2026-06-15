package br.com.empresa72.apirest.ClienteFornecedor.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.empresa72.apirest.ClienteFornecedor.entity.ClienteEntity;

@Repository
public interface ClienteRepository extends JpaRepository<ClienteEntity, Long> {
		
	Optional<ClienteEntity> findByCpf(String cpf);

    Optional<ClienteEntity> findByCnpj(String cnpj);

    Optional<ClienteEntity> findByNomeRazaoSocial(String nomeRazaoSocial);
}
