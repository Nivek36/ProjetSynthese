package com.kevin.projetsynthese.service;

import com.kevin.projetsynthese.model.Player;
import com.kevin.projetsynthese.model.Quiz;
import com.kevin.projetsynthese.model.Room;
import com.kevin.projetsynthese.repository.PlayerRepository;
import com.kevin.projetsynthese.repository.QuizRepository;
import com.kevin.projetsynthese.repository.RoomRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class RoomServiceTest {

    @Mock
    private RoomRepository roomRepository;

    @Mock
    private PlayerRepository playerRepository;

    @Mock
    private QuizRepository quizRepository;

    @InjectMocks
    private RoomService roomService;

    private Room room;
    private Room room2;
    private Player player;
    private Quiz quiz;

    @BeforeEach
    void setup() {
        room = Room.roomBuilder()
                .idRoom(1)
                .name("room1")
                .password("1234")
                .owner(player)
                .isGameStarted(true)
                .roomPlayers(getListOfPlayers())
                .build();
        room2 = Room.roomBuilder()
                .idRoom(2)
                .name("room2")
                .password("1234")
                .owner(player)
                .isGameStarted(false)
                .roomPlayers(getListOfPlayers())
                .build();
        player = Player.playerBuilder()
                .id(1)
                .password("1234")
                .username("Toto")
                .build();
        quiz = Quiz.quizBuilder()
                .idQuiz(1)
                .name("Best quiz")
                .build();
    }

    @Test
    public void createNewRoomTest() {
        when(roomRepository.save(room)).thenReturn(room);
        Optional<Room> actual = roomService.createNewRoom(room);
        assertThat(actual.get()).isEqualTo(room);
    }

    @Test
    public void createNewRoomFailsTest() {
        when(roomRepository.save(any())).thenReturn(room).thenReturn(Optional.empty());
        roomService.createNewRoom(room);
        assertThat(roomService.createNewRoom(room)).isEmpty();
    }

    @Test
    public void getAllRoomsTest() {
        when(roomRepository.findAll()).thenReturn(getListOfRooms());
        final Optional<List<Room>> allRooms = roomService.getAllRooms();
        assertThat(allRooms.get().size()).isEqualTo(3);
        assertThat(allRooms.get().get(0).getIdRoom()).isEqualTo(1);
    }

    @Test
    public void choseQuizForRoomTest() {
        when(quizRepository.findById(quiz.getIdQuiz())).thenReturn(Optional.of(quiz));
        when(roomRepository.findById(room.getIdRoom())).thenReturn(Optional.of(room));
        when(roomRepository.save(room)).thenReturn(room);
        Optional<Room> actual = roomService.choseQuizForRoom(quiz.getIdQuiz(), room.getIdRoom());
        assertThat(actual.get().getChosenQuiz()).isEqualTo(quiz);
    }

    @Test
    public void verifyIfGameStartedTest() {
        when(roomRepository.findById(room.getIdRoom())).thenReturn(Optional.of(room));
        final Optional<Boolean> actual = roomService.verifyIfGameStarted(room.getIdRoom());
        assertThat(actual.get()).isTrue();
    }

    @Test
    public void startGameTest() {
        when(roomRepository.findById(room2.getIdRoom())).thenReturn(Optional.of(room2));
        when(roomRepository.save(room2)).thenReturn(room2);
        Optional<Room> actual = roomService.startGame(room2.getIdRoom());
        assertThat(actual.get().isGameStarted()).isTrue();
    }

    private List<Room> getListOfRooms() {
        List<Room> roomList = new ArrayList<>();
        roomList.add(Room.roomBuilder()
                .idRoom(1)
                .name("Room1")
                .owner(player)
                .build());
        roomList.add(Room.roomBuilder()
                .idRoom(2)
                .name("Room2")
                .owner(player)
                .build());
        roomList.add(Room.roomBuilder()
                .idRoom(3)
                .name("Room3")
                .owner(player)
                .build());
        return roomList;
    }

    private List<Player> getListOfPlayers() {
        List<Player> playerList = new ArrayList<>();
        playerList.add(Player.playerBuilder()
                .id(2)
                .username("Player1")
                .password("1234")
                .isJoinedARoom(true)
                .build());
        playerList.add(Player.playerBuilder()
                .id(3)
                .username("Player2")
                .password("1234")
                .isJoinedARoom(true)
                .build());
        playerList.add(Player.playerBuilder()
                .id(4)
                .username("Player3")
                .password("1234")
                .isJoinedARoom(true)
                .build());
        return playerList;
    }
}
