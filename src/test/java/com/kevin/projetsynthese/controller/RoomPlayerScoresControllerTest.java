package com.kevin.projetsynthese.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kevin.projetsynthese.model.Player;
import com.kevin.projetsynthese.model.Room;
import com.kevin.projetsynthese.model.RoomPlayerScores;
import com.kevin.projetsynthese.service.RoomPlayerScoresService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

@WebMvcTest(RoomPlayerScoresController.class)
public class RoomPlayerScoresControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
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
    public void createNewScoreForPlayerTest() throws Exception {
        when(roomPlayerScoresService.createNewScoreForPlayer(roomPlayerScores)).thenReturn(Optional.of(roomPlayerScores));

        MvcResult result = mockMvc.perform(post("/roomPlayerScores/create-new-score-for-player")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(roomPlayerScores))).andReturn();

        var actual = new ObjectMapper().readValue(result.getResponse().getContentAsString(), RoomPlayerScores.class);
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.CREATED.value());
        assertThat(roomPlayerScores).isEqualTo(actual);
    }

    @Test
    public void setScoreForPlayerTest() throws Exception {
        when(roomPlayerScoresService.setScoreForPlayer(player.getId(), 3)).thenReturn(Optional.of(roomPlayerScores));

        MvcResult result = mockMvc.perform(post("/roomPlayerScores/set-score-for-player/{playerId}/{score}", player.getId(), 3)
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(roomPlayerScores))).andReturn();

        var actual = new ObjectMapper().readValue(result.getResponse().getContentAsString(), RoomPlayerScores.class);
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.CREATED.value());
        assertThat(roomPlayerScores).isEqualTo(actual);
    }

    @Test
    public void getAllScoresByRoomIdTest() throws Exception {
        when(roomPlayerScoresService.getAllScoresByRoomId(room.getIdRoom())).thenReturn(Optional.of(getListOfRoomPlayerScores()));

        MvcResult result = mockMvc.perform(get("/roomPlayerScores/get-all-scores-by-room/{roomId}", room.getIdRoom())
                .contentType(MediaType.APPLICATION_JSON))
                .andReturn();

        var actuals = new ObjectMapper().readValue(result.getResponse().getContentAsString(), List.class);
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(actuals.size()).isEqualTo(3);
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
