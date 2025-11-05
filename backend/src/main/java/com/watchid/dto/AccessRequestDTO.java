package com.watchid.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AccessRequestDTO {
    private Long movieId;
    private Integer detectedAge;
    private Long userId; // Optional, for logged-in users
}
