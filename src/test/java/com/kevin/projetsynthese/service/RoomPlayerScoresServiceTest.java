package com.kevin.projetsynthese.service;

import com.kevin.projetsynthese.model.Player;
import com.kevin.projetsynthese.model.Room;
import com.kevin.projetsynthese.model.RoomPlayerScores;
import com.kevin.projetsynthese.repository.PlayerRepository;
import com.kevin.projetsynthese.repository.RoomPlayerScoresRepository;
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
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class RoomPlayerScoresServiceTest {

    @Mock
    private RoomPlayerScoresRepository roomPlayerScoresRepository;

    @Mock
    private PlayerRepository playerRepository;

    @InjectMocks
    private RoomPlayerScoresService roomPlayerScoresService;

    private RoomPlayerScores roomPlayerScores;
    private Room room;
    private Player player;

    @BeforeEach
    void setup() {
        roomPlayerScores = RoomPlayerScores.roomPlayerScoresBuilder()
                .idRoomPlayerScores(1)
                .player(player)
                .score(0)
                .build();
        room = Room.roomBuilder()
                .idRoom(1)
                .name("room1")
                .password("1234")
                .owner(player)
                .isGameStarted(true)
                .roomPlayers(getListOfPlayers())
                .build();
        player = Player.playerBuilder()
                .id(1)
                .password("1234")
                .username("Toto")
                .build();
    }

    @Test
    public void createNewScoreForPlayerTest() {
        when(roomPlayerScoresRepository.save(roomPlayerScores)).thenReturn(roomPlayerScores);
        Optional<RoomPlayerScores> actual = roomPlayerScoresService.createNewScoreForPlayer(roomPlayerScores);
        assertThat(actual.get()).isEqualTo(roomPlayerScores);
    }

    @Test
    public void setScoreForPlayerTest() {
        when(roomPlayerScoresRepository.findById(roomPlayerScores.getIdRoomPlayerScores())).thenReturn(Optional.of(roomPlayerScores));
        when(roomPlayerScoresRepository.save(roomPlayerScores)).thenReturn(roomPlayerScores);
        Optional<RoomPlayerScores> actual = roomPlayerScoresService.setScoreForPlayer(roomPlayerScores.getIdRoomPlayerScores(), 3);
        assertThat(actual.get().getScore()).isEqualTo(3);
    }

    @Test
    public void getAllScoresByRoomIdTest(){
        when(roomPlayerScoresRepository.findAllByRoomIdRoom(room.getIdRoom())).thenReturn(getListOfRoomPlayerScores());
        final Optional<List<RoomPlayerScores>> all = roomPlayerScoresService.getAllScoresByRoomId(room.getIdRoom());
        assertThat(all.get().size()).isEqualTo(3);
        assertThat(all.get().get(0).getIdRoomPlayerScores()).isEqualTo(1);
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

    private List<RoomPlayerScores> getListOfRoomPlayerScores() {
        List<RoomPlayerScores> roomPlayerScoresList = new ArrayList<>();
        roomPlayerScoresList.add(RoomPlayerScores.roomPlayerScoresBuilder()
                .idRoomPlayerScores(1)
                .player(player)
                .score(0)
                .build());
        roomPlayerScoresList.add(RoomPlayerScores.roomPlayerScoresBuilder()
                .idRoomPlayerScores(2)
                .player(player)
                .score(1)
                .build());
        roomPlayerScoresList.add(RoomPlayerScores.roomPlayerScoresBuilder()
                .idRoomPlayerScores(3)
                .player(player)
                .score(2)
                .build());
        return roomPlayerScoresList;
    }
}
