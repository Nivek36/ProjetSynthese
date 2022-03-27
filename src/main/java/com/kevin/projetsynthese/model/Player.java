package com.kevin.projetsynthese.model;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;

@Data
@Entity
@NoArgsConstructor
public class Player extends User{

    private boolean isBlocked;

    @Builder(builderMethodName = "playerBuilder")
    public Player(int id, String password, String username, boolean isBlocked) {
        super.setId(id);
        super.setPassword(password);
        super.setUsername(username);
        this.isBlocked = isBlocked;
    }
}
