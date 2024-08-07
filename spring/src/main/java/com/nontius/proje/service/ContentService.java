package com.nontius.proje.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nontius.proje.entity.Content;
import com.nontius.proje.entityDTO.ContentDTO;

@Service
public interface ContentService {
	
	public ContentDTO getContent(Long id);
	
	public List<ContentDTO> contents();
	
	public ContentDTO createContent(ContentDTO contentDTO);
	
	public ContentDTO updateContent(Long id, ContentDTO contentDTO);
	
	public void deleteContent(Long id);

}
