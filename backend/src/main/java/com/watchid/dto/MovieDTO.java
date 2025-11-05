package com.watchid.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MovieDTO {
    private Long id;
    private String title;
    private String description;
    private Integer minAge;
    private String genre;
    private Integer duration;
    private String posterUrl;
    private String trailerUrl;
}
