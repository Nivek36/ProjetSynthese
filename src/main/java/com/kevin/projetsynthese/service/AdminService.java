package com.kevin.projetsynthese.service;

import com.kevin.projetsynthese.model.Admin;
import com.kevin.projetsynthese.repository.AdminRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdminService {

    private AdminRepository adminRepository;

    public AdminService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    public Optional<Admin> loginAdmin(String username, String password) {
        try {
            return Optional.of(adminRepository.findAdminByUsernameAndPassword(username, password));
        } catch (Exception e) {
            return Optional.empty();
        }
    }
}
