package com.example.demo.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;
    private String gender;
    private LocalDate birthday;
    private String idCard;
    private String phone;
    private String email;
    @ManyToOne
    @JoinColumn(name = "id_type", referencedColumnName = "id")
    private CustomerTypes customerTypes;
    private String address;

}
