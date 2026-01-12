package com.example.demo.controller;

import com.example.demo.entity.Customer;
import com.example.demo.entity.CustomerTypes;
import com.example.demo.service.ICustomerService;
import com.example.demo.service.ICustomerTypesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/customer-type")
@CrossOrigin("*")
public class CustomerTypeController {
    @Autowired
    ICustomerTypesService customerTypesService;

    @GetMapping
    public List<CustomerTypes> getAll() {
        return customerTypesService.findAllCustomerType();
    }
}
