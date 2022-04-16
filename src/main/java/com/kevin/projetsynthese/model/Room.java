package com.kevin.projetsynthese.model;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

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
    private Quiz chosenQuiz;

    @OneToOne
    private Player owner;

    @OneToMany
    List<Player> roomPlayers;

    @Builder(builderMethodName = "roomBuilder")
    public Room(int idRoom, String name, String password, Quiz chosenQuiz, Player owner, List<Player> roomPlayers) {
        this.idRoom = idRoom;
        this.name = name;
        this.password = password;
        this.chosenQuiz = chosenQuiz;
        this.owner = owner;
        this.roomPlayers = roomPlayers;
    }
}
