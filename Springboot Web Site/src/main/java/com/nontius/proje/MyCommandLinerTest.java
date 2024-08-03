package com.nontius.proje;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;



import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Component

public class MyCommandLinerTest implements CommandLineRunner {
	

	
	
	

	@Override
	public void run(String... args) throws Exception {

		System.out.println("CommandLineRunner was worked");

	}

}
