package com.kevin.projetsynthese.service;

import com.kevin.projetsynthese.model.Player;
import com.kevin.projetsynthese.model.Quiz;
import com.kevin.projetsynthese.model.Room;
import com.kevin.projetsynthese.repository.RoomRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class RoomServiceTest {

    @Mock
    private RoomRepository roomRepository;

    @InjectMocks
    private RoomService roomService;

    private Room room;
    private Player player;

    @BeforeEach
    void setup() {
        room = Room.roomBuilder()
                .idRoom(1)
                .name("room1")
                .password("1234")
                .owner(player)
                .build();
        player = Player.playerBuilder()
                .id(1)
                .password("1234")
                .username("Toto")
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
}
