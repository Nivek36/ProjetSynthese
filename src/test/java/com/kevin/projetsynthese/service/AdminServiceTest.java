package com.kevin.projetsynthese.service;

import com.kevin.projetsynthese.model.Admin;
import com.kevin.projetsynthese.repository.AdminRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class AdminServiceTest {

    @Mock
    private AdminRepository adminRepository;

    @InjectMocks
    private AdminService adminService;

    private Admin admin;

    @BeforeEach
    void setup() {
        admin = Admin.adminBuilder()
                .id(1)
                .password("1234")
                .username("Toto")
                .build();
    }

    @Test
    public void adminLoginTest() {
        when(adminRepository.findAdminByUsernameAndPassword(admin.getUsername(), admin.getPassword())).thenReturn(admin);
        Optional<Admin> actualAdmin = adminService.loginAdmin(admin.getUsername(), admin.getPassword());
        assertThat(actualAdmin.get()).isEqualTo(admin);
    }
}
