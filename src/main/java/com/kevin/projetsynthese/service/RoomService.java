package com.kevin.projetsynthese.service;

import com.kevin.projetsynthese.model.Player;
import com.kevin.projetsynthese.model.Quiz;
import com.kevin.projetsynthese.model.Room;
import com.kevin.projetsynthese.repository.PlayerRepository;
import com.kevin.projetsynthese.repository.QuizRepository;
import com.kevin.projetsynthese.repository.RoomRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoomService {

    private RoomRepository roomRepository;
    private PlayerRepository playerRepository;
    private QuizRepository quizRepository;

    public RoomService(RoomRepository roomRepository, PlayerRepository playerRepository, QuizRepository quizRepository) {
        this.roomRepository = roomRepository;
        this.playerRepository = playerRepository;
        this.quizRepository = quizRepository;
    }

    public Optional<Room> createNewRoom(Room room) {
        try {
            return Optional.of(roomRepository.save(room));
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public Optional<List<Room>> getAllRooms() {
        try {
            return Optional.of(roomRepository.findAll());
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public Optional<Room> joinedRoomByPlayer(int roomId, int playerId) {
        try {
            Room tempRoom = roomRepository.findById(roomId).get();
            Player tempPlayer = playerRepository.findById(playerId).get();
            tempRoom.getRoomPlayers().add(tempPlayer);
            return Optional.of(roomRepository.save(tempRoom));
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public Optional<List<Player>> getAllPlayersByRoom(int roomId) {
        try {
            return Optional.of(roomRepository.findAllPlayersByRoom(roomId));
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public Optional<Room> choseQuizForRoom(int quizId, int roomId) {
        try {
            Quiz tempQuiz = quizRepository.findById(quizId).get();
            Room tempRoom = roomRepository.findById(roomId).get();
            tempRoom.setChosenQuiz(tempQuiz);
            return Optional.of(roomRepository.save(tempRoom));
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public Optional<Room> verifyIfGameStarted(int roomId) {
        try {
            return Optional.of(roomRepository.findById(roomId).get());
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public Optional<Room> startGame(int roomId) {
        try {
            Room tempRoom = roomRepository.findById(roomId).get();
            tempRoom.setGameStarted(true);
            return Optional.of(roomRepository.save(tempRoom));
        } catch (Exception e) {
            return Optional.empty();
        }
    }
}
