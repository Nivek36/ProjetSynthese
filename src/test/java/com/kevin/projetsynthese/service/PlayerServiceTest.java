package com.kevin.projetsynthese.service;

import com.kevin.projetsynthese.model.Player;
import com.kevin.projetsynthese.repository.PlayerRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;


@ExtendWith(MockitoExtension.class)
public class PlayerServiceTest {

    @Mock
    private PlayerRepository playerRepository;

    @InjectMocks
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
    public void registerPlayerTest() {
        when(playerRepository.save(player)).thenReturn(player);
        Optional<Player> actualPlayer = playerService.registerPlayer(player);
        assertThat(actualPlayer.get()).isEqualTo(player);
    }

    @Test
    public void playerLoginTest() {
        when(playerRepository.findPlayerByUsernameAndPassword(player.getUsername(), player.getPassword())).thenReturn(player);
        Optional<Player> actualStudent = playerService.loginPlayer(player.getUsername(), player.getPassword());
        assertThat(actualStudent.get()).isEqualTo(player);
    }
}
