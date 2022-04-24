package com.kevin.projetsynthese.service;

import com.kevin.projetsynthese.model.*;
import com.kevin.projetsynthese.repository.PlayerRepository;
import com.kevin.projetsynthese.repository.RoomPlayerScoresRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoomPlayerScoresService {

    private RoomPlayerScoresRepository roomPlayerScoresRepository;
    private PlayerRepository playerRepository;

    public RoomPlayerScoresService(RoomPlayerScoresRepository roomPlayerScoresRepository, PlayerRepository playerRepository) {
        this.roomPlayerScoresRepository = roomPlayerScoresRepository;
        this.playerRepository = playerRepository;
    }

    public Optional<RoomPlayerScores> createNewScoreForPlayer(RoomPlayerScores roomPlayerScores) {
        try {
            return Optional.of(roomPlayerScoresRepository.save(roomPlayerScores));
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public Optional<RoomPlayerScores> setScoreForPlayer(int roomPlayerScoresId, int score) {
        try {
            RoomPlayerScores tempRoomPlayerScores = roomPlayerScoresRepository.findById(roomPlayerScoresId).get();
            tempRoomPlayerScores.setScore(score);
            return Optional.of(roomPlayerScoresRepository.save(tempRoomPlayerScores));
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public Optional<List<RoomPlayerScores>> getAllScoresByRoomId(int roomId) {
        try {
            return Optional.of(roomPlayerScoresRepository.findAllByRoomIdRoom(roomId));
        } catch (Exception e) {
            return Optional.empty();
        }
    }
}
