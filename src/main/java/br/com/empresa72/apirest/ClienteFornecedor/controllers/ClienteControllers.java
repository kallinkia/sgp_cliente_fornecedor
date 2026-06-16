package br.com.empresa72.apirest.ClienteFornecedor.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.empresa72.apirest.ClienteFornecedor.entity.ClienteEntity;
import br.com.empresa72.apirest.ClienteFornecedor.repository.ClienteRepository;

@RestController
@RequestMapping("/cliente")
@CrossOrigin("*")
public class ClienteControllers {

	@Autowired
	private ClienteRepository clienterep;
	
	
	// LISTAR TODOS //
			@GetMapping("/listartodos")
			@ResponseStatus(HttpStatus.OK) 
			public List<ClienteEntity> listarTodos(){ 
				return clienterep.findAll(); 
			}
	
	// SALVAR INSCRIÇÃO //
			@PostMapping("/salvar")
			@ResponseStatus(HttpStatus.CREATED)
			public ClienteEntity salvar(@RequestBody ClienteEntity cliente) {
				return clienterep.save(cliente);
			}
	
	
	// BUSCAR POR ID //
			@GetMapping("/listarporid/{id}")
			@ResponseStatus(HttpStatus.OK)
			public Optional<ClienteEntity> buscarPorID(@PathVariable Long id){
				return clienterep.findById(id);
					
				}	
	// ATUALIZAR
			@PutMapping("/atualizar/{id}")
			@ResponseStatus(HttpStatus.OK)
			public String atualizarCliente(@PathVariable Long id, @RequestBody ClienteEntity cliente) {
				if(clienterep.existsById(id)) {
					cliente.setId(id);
					clienterep.save(cliente);
				return "Atualizado";
							}
					return "Não atualizado";
						}		
			
		// DELETAR//
			@DeleteMapping("/deletar/{id}")
			@ResponseStatus(HttpStatus.NO_CONTENT)
			public String deletarcliente(@PathVariable Long id) {
				if(clienterep.existsById(id)) {
					clienterep.deleteById(id);
					return "Cliente deletado";
							}
							
					return "Cliente não encontrado";
						}
			
			
			
			@GetMapping("/listarNome/{nomeRazaoSocial}")
			public Optional<ClienteEntity> buscarPorNome(
			        @PathVariable String nomeRazaoSocial) {

			    return clienterep.findByNomeRazaoSocial(nomeRazaoSocial);
			}
			
			
			// BUSCAR POR CNPJ
			@GetMapping("/listarCnpj/{cnpj}")
			@ResponseStatus(HttpStatus.OK)
			public Optional<ClienteEntity> buscarPorCnpj(
			        @PathVariable String cnpj) {

			    return clienterep.findByCnpj(cnpj);
			}
	
	       // BUSCAR POR CNPJ
			@GetMapping("/listarCpf/{cpf}")
			@ResponseStatus(HttpStatus.OK)
				public Optional<ClienteEntity> buscarPorCpf(
				   @PathVariable String cpf) {

						    return clienterep.findByCpf(cpf);
}		
			
	
			
}
