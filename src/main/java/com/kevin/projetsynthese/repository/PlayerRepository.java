package com.kevin.projetsynthese.repository;

import com.kevin.projetsynthese.model.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Integer> {

    Player findPlayerByUsernameAndPassword(String username, String password);
}
