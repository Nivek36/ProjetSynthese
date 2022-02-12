package com.kevin.projetsynthese.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kevin.projetsynthese.model.Player;
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

    @BeforeEach
    void setup() {
        player = Player.playerBuilder()
                .id(1)
                .password("1234")
                .username("Toto")
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
}
