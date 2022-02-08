package com.kevin.projetsynthese.controller;

import com.kevin.projetsynthese.model.Player;
import com.kevin.projetsynthese.service.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/player")
public class PlayerController {

    @Autowired
    PlayerService playerService;

    @PostMapping("/register_player")
    public ResponseEntity<Player> registerPlayer(@RequestBody Player player) {
        return playerService.registerPlayer(player)
                .map(player1 -> ResponseEntity.status(HttpStatus.CREATED).body(player1))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).body(new Player()));
    }
}