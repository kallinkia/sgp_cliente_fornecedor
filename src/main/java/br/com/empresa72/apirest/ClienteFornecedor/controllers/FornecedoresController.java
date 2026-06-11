package br.com.empresa72.apirest.ClienteFornecedor.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.empresa72.apirest.ClienteFornecedor.entity.FornecedoresEntity;
import br.com.empresa72.apirest.ClienteFornecedor.repository.FornecedoresRepository;


@RestController
@RequestMapping("/Fornecedores")
public class FornecedoresController {
	@Autowired
	private FornecedoresRepository usu;

	//BUSCAR TODOS
		@GetMapping("/listarTodos")
		@ResponseStatus(HttpStatus.OK)
		public List<FornecedoresEntity> listarTodos(){
			return usu.findAll();
		}

	// BUSCAR POR ID
	@GetMapping("/listarId/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Optional<FornecedoresEntity> buscarPorID(@PathVariable Long id){
		return usu.findById(id);
			
		}
		

	// SALVAR
	@PostMapping ("/salvar")
	@ResponseStatus(HttpStatus.OK)
	public FornecedoresEntity gravarFornecedores(@RequestBody FornecedoresEntity fornecedores) {
	return usu.save(fornecedores);
	}



	// ATUALIZAR
	@PutMapping("/atualizar/{id}")
	@ResponseStatus(HttpStatus.OK)
	public FornecedoresEntity atualizarFornecedores(@PathVariable Long id, @RequestBody FornecedoresEntity fornecedores) {
		fornecedores.setId(id);
		return usu.save(fornecedores);
	}


	// DELETAR
	@DeleteMapping("/deletar/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public String deletarFornecedores(@PathVariable Long id) {
		if(usu.existsById(id)) {
			usu.deleteById(id);
			return "Fornecedor deletado";
		}
		
			return "Fornecedor não encontrado";
	}



	}
