package com.kevin.projetsynthese.model;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;

@Data
@Entity
@NoArgsConstructor
public class Player extends User{

    @Builder(builderMethodName = "playerBuilder")
    public Player(int id, String password, String username) {
        super.setId(id);
        super.setPassword(password);
        super.setUsername(username);
    }
}
