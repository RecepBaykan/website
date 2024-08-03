package com.nontius.proje.entityDTO;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.nontius.proje.entity.Tag;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Component
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ContentDTO {
	
	
	private Long id;
	
	private String title;
	
	private String content;
	
	
	private List<Tag> tags;
	
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
	private LocalDateTime date;
	
	private String desc;
	
	private String	 picture;
	
	
	

}
