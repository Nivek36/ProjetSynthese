package com.kevin.projetsynthese.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@NoArgsConstructor
public class Quiz {

    @Id
    @GeneratedValue
    private int idQuiz;

    @Column(unique = true, length = 200)
    private String name;

    private boolean isPublished;

    @OneToOne
    private Player player;

    @OneToOne
    private Admin admin;

    @Builder(builderMethodName = "quizBuilder")
    public Quiz(int idQuiz, String name, boolean isPublished, Player player, Admin admin) {
        this.idQuiz = idQuiz;
        this.name = name;
        this.isPublished = isPublished;
        this.player = player;
        this.admin = admin;
    }
}
