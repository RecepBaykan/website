package com.nontius.proje.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ContentNotFound extends RuntimeException{

	public ContentNotFound(String message) {
		super(message);
	}
}
