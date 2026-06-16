
package br.com.empresa72.apirest.ClienteFornecedor.controllers;

import java.util.Iterator;
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
import br.com.empresa72.apirest.ClienteFornecedor.entity.AvaliacaoFornecedorEntity;
import br.com.empresa72.apirest.ClienteFornecedor.repository.AvaliacaoFornecedorRepository;

@RestController
@RequestMapping("avaliacao")
@CrossOrigin("*")
public class AvaliacaoFornecedorController {

	@Autowired
	private AvaliacaoFornecedorRepository avaliacaoRepo;
	
	@GetMapping("/listarTodos")
	@ResponseStatus(HttpStatus.OK)
	public List< AvaliacaoFornecedorEntity> listarAvalicao(){

		return avaliacaoRepo.findAll();
	}


	@GetMapping("/listarPorId/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Optional<AvaliacaoFornecedorEntity> listarPorId (@PathVariable Long id){
		return avaliacaoRepo.findById(id);
	}
	
	@PostMapping("/salvar")
	@ResponseStatus(HttpStatus.CREATED)
	public AvaliacaoFornecedorEntity cadsatrar (@RequestBody AvaliacaoFornecedorEntity avaliacao) {
		return avaliacaoRepo.save(avaliacao);
	}
	
	@DeleteMapping("/deletar/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public String deletar (@PathVariable long id) {
		
		if(avaliacaoRepo.existsById(id)) {
			avaliacaoRepo.deleteById(id);
			return"Deletado";
		}
		return"Não";
	}
	
	@PutMapping("/atualizar/{id}")
	@ResponseStatus(HttpStatus.OK)
	public String atualizarTabela(@PathVariable Long id, @RequestBody AvaliacaoFornecedorEntity avaliacao) {
		
		if(avaliacaoRepo.existsById(id)) {
			avaliacao.setId(id);
			avaliacaoRepo.save(avaliacao);
			return "Atualizado";
		}
		return "Não atulizado";
	}
	
}
		
		
