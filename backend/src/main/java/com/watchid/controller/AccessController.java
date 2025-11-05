package com.watchid.controller;

import com.watchid.dto.AccessRequestDTO;
import com.watchid.dto.AccessResponseDTO;
import com.watchid.service.AccessControlService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/access")
@RequiredArgsConstructor
@Tag(name = "Access Control", description = "APIs for managing content access based on age detection")
@CrossOrigin(origins = "http://localhost:4200")
public class AccessController {

    private final AccessControlService accessControlService;

    @PostMapping("/check")
    @Operation(summary = "Check access", description = "Check if access should be granted based on detected age")
    public ResponseEntity<AccessResponseDTO> checkAccess(@RequestBody AccessRequestDTO request) {
        try {
            AccessResponseDTO response = accessControlService.checkAccess(request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
