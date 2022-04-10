package com.kevin.projetsynthese.service;

import com.kevin.projetsynthese.model.Player;
import com.kevin.projetsynthese.model.Quiz;
import com.kevin.projetsynthese.model.Room;
import com.kevin.projetsynthese.repository.PlayerRepository;
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
public class PlayerServiceTest {

    @Mock
    private PlayerRepository playerRepository;

    @Mock
    private RoomRepository roomRepository;

    @InjectMocks
    private PlayerService playerService;

    private Player player;
    private Player player2;
    private Room room;

    @BeforeEach
    void setup() {
        player = Player.playerBuilder()
                .id(1)
                .password("1234")
                .username("Toto")
                .isBlocked(false)
                .build();
        player2 = Player.playerBuilder()
                .id(2)
                .password("1234")
                .username("Toto2")
                .isBlocked(true)
                .build();
        room = Room.roomBuilder()
                .idRoom(1)
                .name("room1")
                .password("1234")
                .owner(player)
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

    @Test
    public void blockPlayerTest() {
        when(playerRepository.findById(player.getId())).thenReturn(Optional.of(player));
        when(playerRepository.save(player)).thenReturn(player);
        Optional<Player> actualPlayer = playerService.blockPlayer(player.getId());
        assertThat(actualPlayer.get().isBlocked()).isTrue();
    }

    @Test
    public void unblockPlayerTest() {
        when(playerRepository.findById(player2.getId())).thenReturn(Optional.of(player2));
        when(playerRepository.save(player2)).thenReturn(player2);
        Optional<Player> actualPlayer = playerService.unblockPlayer(player2.getId());
        assertThat(actualPlayer.get().isBlocked()).isFalse();
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
