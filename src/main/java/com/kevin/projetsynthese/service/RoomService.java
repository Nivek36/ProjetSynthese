package com.kevin.projetsynthese.service;

import com.kevin.projetsynthese.model.Room;
import com.kevin.projetsynthese.repository.RoomRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RoomService {

    private RoomRepository roomRepository;

    public RoomService(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    public Optional<Room> createNewRoom(Room room) {
        try {
            return Optional.of(roomRepository.save(room));
        } catch (Exception e) {
            return Optional.empty();
        }
    }
}
