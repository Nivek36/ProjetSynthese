package com.kevin.projetsynthese.controller;

import com.kevin.projetsynthese.model.Admin;
import com.kevin.projetsynthese.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/{username}/{password}")
    public ResponseEntity<Admin> loginAdmin(@PathVariable String username, @PathVariable String password){
        return adminService.loginAdmin(username, password)
                .map(admin1 -> ResponseEntity.status(HttpStatus.OK).body(admin1))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).body(new Admin()));
    }
}
