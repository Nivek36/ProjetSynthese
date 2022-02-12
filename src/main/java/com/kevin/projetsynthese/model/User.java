package com.kevin.projetsynthese.model;

import lombok.Data;

import javax.persistence.*;

@Data
@MappedSuperclass
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(unique = true, length = 200)
    private String username;

    private String password;
}
