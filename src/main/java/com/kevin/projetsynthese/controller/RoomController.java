package com.kevin.projetsynthese.controller;

import com.kevin.projetsynthese.model.Player;
import com.kevin.projetsynthese.model.Quiz;
import com.kevin.projetsynthese.model.Room;
import com.kevin.projetsynthese.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/room")
public class RoomController {

    @Autowired
    private RoomService roomService;

    @PostMapping("/create_new_room")
    public ResponseEntity<Room> createNewRoom(@RequestBody Room room) {
        return roomService.createNewRoom(room)
                .map(room1 -> ResponseEntity.status(HttpStatus.CREATED).body(room1))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }

    @GetMapping("/get-all-rooms")
    public ResponseEntity<List<Room>> getAllRooms(){
        return roomService.getAllRooms()
                .map(rooms -> ResponseEntity.status(HttpStatus.OK).body(rooms))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }

    @PostMapping("/joined-room-by-player/{roomId}/{playerId}")
    public ResponseEntity<Room> joinedRoomByPlayer(@PathVariable int roomId, @PathVariable int playerId){
        return roomService.joinedRoomByPlayer(roomId, playerId)
                .map(room -> ResponseEntity.status(HttpStatus.OK).body(room))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }

    @GetMapping("/get-all-players-by-room/{roomId}")
    public ResponseEntity<List<Player>> getAllPlayersByRoom(@PathVariable int roomId){
        return roomService.getAllPlayersByRoom(roomId)
                .map(players -> ResponseEntity.status(HttpStatus.OK).body(players))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }

    @PostMapping("/chose-quiz-for-room/{quizId}/{roomId}")
    public ResponseEntity<Room> choseQuizForRoom(@PathVariable int quizId, @PathVariable int roomId){
        return roomService.choseQuizForRoom(quizId, roomId)
                .map(room -> ResponseEntity.status(HttpStatus.OK).body(room))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }
}
