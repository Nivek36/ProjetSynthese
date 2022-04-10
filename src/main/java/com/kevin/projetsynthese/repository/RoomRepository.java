package com.kevin.projetsynthese.repository;

import com.kevin.projetsynthese.model.Player;
import com.kevin.projetsynthese.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room, Integer> {

    @Query("SELECT r.roomPlayers " +
            "FROM Room r " +
            "WHERE r.idRoom = ?1")
    List<Player> findAllPlayersByRoom(int roomId);
}
