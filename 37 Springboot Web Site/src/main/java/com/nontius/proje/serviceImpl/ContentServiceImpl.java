package com.nontius.proje.serviceImpl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.nontius.proje.entity.Content;
import com.nontius.proje.entityDTO.ContentDTO;
import com.nontius.proje.exception.ContentNotFound;
import com.nontius.proje.mapper.ContentMapper;
import com.nontius.proje.repository.ContentRepository;
import com.nontius.proje.service.ContentService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ContentServiceImpl implements ContentService{

	private ContentRepository repository;
	
	@Override
	public ContentDTO getContent(Long id) {
		// TODO Auto-generated method stub
		
		ContentDTO contentDTO = ContentMapper.contentToContentDTO(repository.findById(id).orElseThrow(
				() -> new ContentNotFound("Not found")));
		return contentDTO;
	}

	@Override
	public List<ContentDTO> contents() {
		// TODO Auto-generated method stub
		List<Content> contents = repository.findAll();
		return contents.stream().map(
				(content) -> ContentMapper.contentToContentDTO(content)
				).collect(Collectors.toList());
				
	}

	@Override
	public ContentDTO createContent(ContentDTO contentDTO) {
		
		Content content = ContentMapper.contentDTOToContent(contentDTO);
		
		Content savedContent = repository.save(content);
		
		
		return ContentMapper.contentToContentDTO(savedContent);
	}
	
	@Override
	public ContentDTO updateContent(Long id, ContentDTO contentDTO) {
		Content content = repository.findById(id).orElseThrow(
				() -> new ContentNotFound("Not found content by id: " + id)
				);
		
		content.setTitle(contentDTO.getTitle());
		content.setContent(contentDTO.getContent());
		content.setDate(contentDTO.getDate());
		content.setTags(contentDTO.getTags());
		content.setDesc(contentDTO.getDesc());
		content.setPicture(contentDTO.getPicture());
		Content savedContent = repository.save(content);
		
		
		
		return ContentMapper.contentToContentDTO(savedContent);
	}
	
	@Override
	public void deleteContent(Long id) {

		Content content = repository.findById(id).orElseThrow(
				() -> new ContentNotFound("Not found content by id: " + id)
				);
		
		repository.delete(content);
		
	}

}
