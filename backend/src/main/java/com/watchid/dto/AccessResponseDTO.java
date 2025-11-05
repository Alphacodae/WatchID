package com.watchid.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AccessResponseDTO {
    private Boolean accessGranted;
    private String message;
    private MovieDTO movie;
}
