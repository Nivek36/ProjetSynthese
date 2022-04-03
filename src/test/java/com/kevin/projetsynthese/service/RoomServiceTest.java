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

    @Test
    public void getAllRoomsTest(){
        when(roomRepository.findAll()).thenReturn(getListOfRooms());
        final Optional<List<Room>> allRooms = roomService.getAllRooms();
        assertThat(allRooms.get().size()).isEqualTo(3);
        assertThat(allRooms.get().get(0).getIdRoom()).isEqualTo(1);
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
}
