package com.kevin.projetsynthese.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kevin.projetsynthese.model.Player;
import com.kevin.projetsynthese.model.Quiz;
import com.kevin.projetsynthese.model.Room;
import com.kevin.projetsynthese.service.RoomService;
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

@WebMvcTest(RoomController.class)
public class RoomControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
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
    public void createNewRoomTest() throws Exception {
        when(roomService.createNewRoom(room)).thenReturn(Optional.of(room));

        MvcResult result = mockMvc.perform(post("/room/create_new_room")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(room))).andReturn();

        var actual = new ObjectMapper().readValue(result.getResponse().getContentAsString(), Room.class);
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.CREATED.value());
        assertThat(room).isEqualTo(actual);
    }

    @Test
    public void getAllRoomsTest() throws Exception {
        when(roomService.getAllRooms()).thenReturn(Optional.of(getListOfRooms()));

        MvcResult result = mockMvc.perform(get("/room/get-all-rooms")
                .contentType(MediaType.APPLICATION_JSON))
                .andReturn();

        var actuals = new ObjectMapper().readValue(result.getResponse().getContentAsString(), List.class);
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(actuals.size()).isEqualTo(3);
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
