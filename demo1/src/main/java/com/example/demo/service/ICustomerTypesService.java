package com.example.demo.service;

import com.example.demo.entity.CustomerTypes;

import java.util.List;

public interface ICustomerTypesService {
    List<CustomerTypes> findAllCustomerType();
}
