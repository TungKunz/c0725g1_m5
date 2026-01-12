package com.example.demo.service;

import com.example.demo.entity.CustomerTypes;
import com.example.demo.repository.ICustomerTypesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class CustomerTypesService implements ICustomerTypesService{
    @Autowired
    ICustomerTypesRepository customerTypesRepository;
    @Override
    public List<CustomerTypes> findAllCustomerType() {
        return customerTypesRepository.findAll();
    }
}
