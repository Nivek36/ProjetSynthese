package com.kevin.projetsynthese.repository;

import com.kevin.projetsynthese.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Integer> {

    Admin findAdminByUsernameAndPassword(String username, String password);
}
