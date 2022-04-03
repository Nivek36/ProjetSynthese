package com.kevin.projetsynthese.model;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@NoArgsConstructor
public class Room {

    @Id
    @GeneratedValue
    private int idRoom;

    @Column(unique = true, length = 50)
    private String name;
    private String password;

    @OneToOne
    private Player owner;

    @Builder(builderMethodName = "roomBuilder")
    public Room(int idRoom, String name, String password, Player owner) {
        this.idRoom = idRoom;
        this.name = name;
        this.password = password;
        this.owner = owner;
    }
}
