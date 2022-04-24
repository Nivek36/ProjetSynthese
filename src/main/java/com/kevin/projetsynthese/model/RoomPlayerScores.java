package com.kevin.projetsynthese.model;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;

@Data
@Entity
@NoArgsConstructor
public class RoomPlayerScores {

    @Id
    @GeneratedValue
    private int idRoomPlayerScores;

    @OneToOne
    private Player player;

    @OneToOne
    private Room room;

    private int score;

    @Builder(builderMethodName = "roomPlayerScoresBuilder")
    public RoomPlayerScores(int idRoomPlayerScores, Player player, int score, Room room) {
        this.idRoomPlayerScores = idRoomPlayerScores;
        this.player = player;
        this.score = score;
        this.room = room;
    }
}
