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

    @Column(unique = true, length = 50)
    private String name;

    @Column(length = 100)
    private String description;

    private boolean isPublished;
    private boolean isBlocked;

    @OneToOne
    private Player player;

    @OneToOne
    private Admin admin;

    @Builder(builderMethodName = "quizBuilder")
    public Quiz(int idQuiz, String name, String description, boolean isPublished, boolean isBlocked,
                Player player, Admin admin) {
        this.idQuiz = idQuiz;
        this.name = name;
        this.description = description;
        this.isPublished = isPublished;
        this.isBlocked = isBlocked;
        this.player = player;
        this.admin = admin;
    }
}
