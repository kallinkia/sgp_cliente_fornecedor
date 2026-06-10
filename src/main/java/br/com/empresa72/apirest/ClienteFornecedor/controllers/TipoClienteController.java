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

import br.com.empresa72.apirest.ClienteFornecedor.entity.TipoClienteEntity;
import br.com.empresa72.apirest.ClienteFornecedor.repository.TipoClienteRepository;

@RestController
@RequestMapping("/TipoCliente")
@CrossOrigin("*")
public class TipoClienteController {
	// CRIANDO USUARIO
	@Autowired
	private TipoClienteRepository Clie;

	// LISTANDO TODOS
	@GetMapping("/listarTodos")
	@ResponseStatus(HttpStatus.OK)
	public List<TipoClienteEntity> BuscarTodos() {

		return Clie.findAll();
	}

	// LISTANDO USUARIOS POR ID
	@GetMapping("/listarporid/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Optional<TipoClienteEntity> buscarPorID(@PathVariable Long id) {

		return Clie.findById(id);
	}

	// PUT ATUALIZAR USUARIO
	@PutMapping("/atualizar/{id}")
	@ResponseStatus(HttpStatus.OK)
	public TipoClienteEntity atualizar(@RequestBody TipoClienteEntity cliee) {

		return Clie.save(cliee);
	}

	// METODO DELETAR
	@DeleteMapping("/deletar/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deletar(@PathVariable Long id) {
		

		if (Clie.existsById(id)) {
			Clie.deleteById(id);
			
			
		}
		
	}

	// SALVANDO USUARIO
	@PostMapping("/salvar")
	@ResponseStatus(HttpStatus.CREATED)
	public TipoClienteEntity gravar(@PathVariable long id, @RequestBody TipoClienteEntity cliee) {

		if (Clie.existsById(id)) {
			Clie.deleteById(id);
		}

		return Clie.save(cliee);
	}
	
}
