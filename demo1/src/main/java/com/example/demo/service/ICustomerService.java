package com.example.demo.service;

import com.example.demo.entity.Customer;

import java.util.List;

public interface ICustomerService {
    List<Customer> findAllCustomer();

    Customer findById(Integer id);

    Customer save(Customer customer);

    void delete(Integer id);
}
