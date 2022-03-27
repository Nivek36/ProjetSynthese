package com.kevin.projetsynthese.service;

import com.kevin.projetsynthese.model.Player;
import com.kevin.projetsynthese.model.Quiz;
import com.kevin.projetsynthese.repository.PlayerRepository;
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
    public void registerDuplicatePlayerFailsTest() {
        when(playerRepository.save(any())).thenReturn(player).thenReturn(Optional.empty());
        playerService.registerPlayer(player);
        assertThat(playerService.registerPlayer(player)).isEmpty();
    }

    @Test
    public void playerLoginTest() {
        when(playerRepository.findPlayerByUsernameAndPassword(player.getUsername(), player.getPassword())).thenReturn(player);
        Optional<Player> actualAdmin = playerService.loginPlayer(player.getUsername(), player.getPassword());
        assertThat(actualAdmin.get()).isEqualTo(player);
    }

    @Test
    public void getAllPlayersTest(){
        when(playerRepository.findAll()).thenReturn(getListOfPlayers());
        final Optional<List<Player>> allPlayers = playerService.getAllPlayers();
        assertThat(allPlayers.get().size()).isEqualTo(3);
        assertThat(allPlayers.get().get(0).getId()).isEqualTo(1);
    }

    private List<Player> getListOfPlayers() {
        List<Player> playerList = new ArrayList<>();
        playerList.add(Player.playerBuilder()
                .id(1)
                .username("Player1")
                .password("1234")
                .build());
        playerList.add(Player.playerBuilder()
                .id(2)
                .username("Player2")
                .password("1234")
                .build());
        playerList.add(Player.playerBuilder()
                .id(3)
                .username("Player3")
                .password("1234")
                .build());
        return playerList;
    }
}
