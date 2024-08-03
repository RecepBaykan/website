package com.nontius.proje.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

import com.nontius.proje.entityDTO.ContentDTO;
import com.nontius.proje.service.ContentService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/content")
@AllArgsConstructor
@CrossOrigin("*")
public class ContentController {

	private ContentService service;
	
	@GetMapping("{id}")
	public ResponseEntity<?> getContent(@PathVariable("id") Long id) {
		
		
		ContentDTO contentDTO = service.getContent(id);
		
		if(contentDTO != null) {
			
			return ResponseEntity.ok(contentDTO);
		}else {
			
			return new ResponseEntity<>
			( "Not found content by id: "+ id, HttpStatus.NOT_FOUND);
		}
		
	}
	
	@PostMapping
	public ResponseEntity<?> createContent(@RequestBody ContentDTO content){
		
		ContentDTO contentDTO = service.createContent(content);
		
		if(contentDTO != null) {
			
			return ResponseEntity.ok(contentDTO);
		}else {
			return new ResponseEntity<>("Not crate content", HttpStatus.BAD_REQUEST);
		}
		
		
	}
	
	@GetMapping
	public ResponseEntity<?> getContents(){
		
		List<ContentDTO> contents = service.contents();
		
		if(contents != null) {
			return ResponseEntity.ok(contents);
		}else {
			return new ResponseEntity<>
			( "Conttens Not Found", HttpStatus.NOT_FOUND);
		}
		
		
	}
	
	@PutMapping("{id}")
	public ResponseEntity<?> updateContent(@PathVariable("id") Long id, 
			@RequestBody ContentDTO contentDTO){
		
		ContentDTO content = service.updateContent(id, contentDTO);
		
		if(content != null) {
			return ResponseEntity.ok(content);
		}else {
			return new ResponseEntity<>
			( "Conttens Not Found", HttpStatus.NOT_FOUND);
		}
	}
	
	@DeleteMapping("{id}")
	public void deleteContent(@PathVariable("id") Long id) {
		
		service.deleteContent(id);
	
	}
		
	
}
