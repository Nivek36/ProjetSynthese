package com.kevin.projetsynthese.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kevin.projetsynthese.model.Player;
import com.kevin.projetsynthese.model.Quiz;
import com.kevin.projetsynthese.model.Room;
import com.kevin.projetsynthese.service.PlayerService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;


@WebMvcTest(PlayerController.class)
public class PlayerControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private PlayerService playerService;

    private Player player;
    private Room room;

    @BeforeEach
    void setup() {
        player = Player.playerBuilder()
                .id(1)
                .password("1234")
                .username("Toto")
                .build();
        room = Room.roomBuilder()
                .idRoom(1)
                .name("room1")
                .password("1234")
                .owner(player)
                .build();
    }

    @Test
    public void registerPlayerTest() throws Exception {
        when(playerService.registerPlayer(player)).thenReturn(Optional.of(player));

        MvcResult result = mockMvc.perform(post("/player/register_player")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(player))).andReturn();

        var actualPlayer = new ObjectMapper().readValue(result.getResponse().getContentAsString(), Player.class);
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.CREATED.value());
        assertThat(player).isEqualTo(actualPlayer);
    }

    @Test
    public void loginPlayerTest() throws Exception{
        when(playerService.loginPlayer(player.getUsername(), player.getPassword())).thenReturn(Optional.of(player));

        MvcResult result = mockMvc.perform(get("/player/{username}/{password}", player.getUsername(), player.getPassword())
                .contentType(MediaType.APPLICATION_JSON))
                .andReturn();

        var actualPlayer = new ObjectMapper().readValue(result.getResponse().getContentAsString(), Player.class);
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(actualPlayer).isEqualTo(player);
    }

    @Test
    public void getAllPlayersTest() throws Exception {
        when(playerService.getAllPlayers()).thenReturn(Optional.of(getListOfPlayers()));

        MvcResult result = mockMvc.perform(get("/player/get-all-players")
                .contentType(MediaType.APPLICATION_JSON))
                .andReturn();

        var actuals = new ObjectMapper().readValue(result.getResponse().getContentAsString(), List.class);
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(actuals.size()).isEqualTo(3);
    }

    @Test
    public void blockPlayerTest() throws Exception {
        when(playerService.blockPlayer(player.getId())).thenReturn(Optional.of(player));

        MvcResult result = mockMvc.perform(put("/player/block-player/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(player))).andReturn();

        var actual = new ObjectMapper().readValue(result.getResponse().getContentAsString(), Player.class);
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(player).isEqualTo(actual);
    }

    @Test
    public void unblockPlayerTest() throws Exception {
        when(playerService.unblockPlayer(player.getId())).thenReturn(Optional.of(player));

        MvcResult result = mockMvc.perform(put("/player/unblock-player/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(player))).andReturn();

        var actual = new ObjectMapper().readValue(result.getResponse().getContentAsString(), Player.class);
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(player).isEqualTo(actual);
    }

    private List<Player> getListOfPlayers() {
        List<Player> playerList = new ArrayList<>();
        playerList.add(Player.playerBuilder()
                .id(1)
                .username("Player1")
                .password("1234")
                .isJoinedARoom(true)
                .build());
        playerList.add(Player.playerBuilder()
                .id(2)
                .username("Player2")
                .password("1234")
                .isJoinedARoom(true)
                .build());
        playerList.add(Player.playerBuilder()
                .id(3)
                .username("Player3")
                .password("1234")
                .isJoinedARoom(true)
                .build());
        return playerList;
    }
}
