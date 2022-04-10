package com.kevin.projetsynthese.model;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.OneToOne;

@Data
@Entity
@NoArgsConstructor
public class Player extends User{

    private boolean isBlocked;
    private boolean isJoinedARoom;

    @Builder(builderMethodName = "playerBuilder")
    public Player(int id, String password, String username, boolean isBlocked, boolean isJoinedARoom) {
        super.setId(id);
        super.setPassword(password);
        super.setUsername(username);
        this.isBlocked = isBlocked;
        this.isJoinedARoom = isJoinedARoom;
    }
}
