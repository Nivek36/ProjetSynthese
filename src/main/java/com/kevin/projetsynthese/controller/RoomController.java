package com.kevin.projetsynthese.controller;

import com.kevin.projetsynthese.model.Quiz;
import com.kevin.projetsynthese.model.Room;
import com.kevin.projetsynthese.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
}
