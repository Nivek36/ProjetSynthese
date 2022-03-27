package com.kevin.projetsynthese.service;

import com.kevin.projetsynthese.model.Player;
import com.kevin.projetsynthese.model.Quiz;
import com.kevin.projetsynthese.repository.PlayerRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlayerService {

    private PlayerRepository playerRepository;

    public PlayerService(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    public Optional<Player> registerPlayer(Player player) {
        try {
            return Optional.of(playerRepository.save(player));
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public Optional<Player> loginPlayer(String username, String password) {
        try {
            return Optional.of(playerRepository.findPlayerByUsernameAndPassword(username, password));
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public Optional<List<Player>> getAllPlayers() {
        try {
            return Optional.of(playerRepository.findAll());
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public Optional<Player> blockPlayer(int id) {
        try {
            Optional<Player> player = playerRepository.findById(id);
            player.get().setBlocked(true);
            return Optional.of(playerRepository.save(player.get()));
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public Optional<Player> unblockPlayer(int id) {
        try {
            Optional<Player> player = playerRepository.findById(id);
            player.get().setBlocked(false);
            return Optional.of(playerRepository.save(player.get()));
        } catch (Exception e) {
            return Optional.empty();
        }
    }
}
