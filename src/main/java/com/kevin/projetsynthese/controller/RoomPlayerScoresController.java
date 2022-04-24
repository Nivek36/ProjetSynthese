package com.kevin.projetsynthese.controller;

import com.kevin.projetsynthese.model.Room;
import com.kevin.projetsynthese.model.RoomPlayerScores;
import com.kevin.projetsynthese.service.RoomPlayerScoresService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/roomPlayerScores")
public class RoomPlayerScoresController {

    @Autowired
    private RoomPlayerScoresService roomPlayerScoresService;

    @PostMapping("/create-new-score-for-player")
    public ResponseEntity<RoomPlayerScores> createNewScoreForPlayer(@RequestBody RoomPlayerScores roomPlayerScores) {
        System.out.println(roomPlayerScores);
        return roomPlayerScoresService.createNewScoreForPlayer(roomPlayerScores)
                .map(roomPlayerScores1 -> ResponseEntity.status(HttpStatus.CREATED).body(roomPlayerScores1))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }

    @PostMapping("/set-score-for-player/{playerId}/{score}")
    public ResponseEntity<RoomPlayerScores> setScoreForPlayer(@PathVariable int playerId, @PathVariable int score) {
        return roomPlayerScoresService.setScoreForPlayer(playerId, score)
                .map(roomPlayerScores1 -> ResponseEntity.status(HttpStatus.CREATED).body(roomPlayerScores1))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }

    @GetMapping("/get-all-scores-by-room/{roomId}")
    public ResponseEntity<List<RoomPlayerScores>> getAllScoresByRoomId(@PathVariable int roomId){
        return roomPlayerScoresService.getAllScoresByRoomId(roomId)
                .map(roomPlayerScores1 -> ResponseEntity.status(HttpStatus.OK).body(roomPlayerScores1))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }
}
