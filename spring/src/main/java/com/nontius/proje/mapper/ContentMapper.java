package com.nontius.proje.mapper;

import com.nontius.proje.entity.Content;
import com.nontius.proje.entityDTO.ContentDTO;

public class ContentMapper {
	
	public static Content contentDTOToContent(ContentDTO contentDTO){
		
		return new Content(
				contentDTO.getId(),
				contentDTO.getTitle(),
				contentDTO.getContent(),
				contentDTO.getTags(),
				contentDTO.getDate(),
				contentDTO.getDesc(),
				contentDTO.getPicture(),
				contentDTO.getMetaTag()
				
				);
	}
	
	public static ContentDTO contentToContentDTO(Content content){
		
		return new ContentDTO(
				content.getId(),
				content.getTitle(),
				content.getContent(),
				content.getTags(),
				content.getDate(),
				content.getDesc(),
				content.getPicture(),
				content.getMetaTag()
				
				);
	}

}
