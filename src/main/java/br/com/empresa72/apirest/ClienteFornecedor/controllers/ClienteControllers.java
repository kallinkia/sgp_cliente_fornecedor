package br.com.empresa72.apirest.ClienteFornecedor.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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
	
	
}
