package com.kevin.projetsynthese.model;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;

@Data
@Entity
@NoArgsConstructor
public class Admin extends User{

    @Builder(builderMethodName = "adminBuilder")
    public Admin(int id, String password, String username) {
        super.setId(id);
        super.setPassword(password);
        super.setUsername(username);
    }
}
