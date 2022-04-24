package com.kevin.projetsynthese.repository;

import com.kevin.projetsynthese.model.RoomPlayerScores;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomPlayerScoresRepository extends JpaRepository<RoomPlayerScores, Integer> {

    List<RoomPlayerScores> findAllByRoomIdRoom(int roomId);
}
