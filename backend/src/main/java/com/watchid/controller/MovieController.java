package com.watchid.controller;

import com.watchid.dto.MovieDTO;
import com.watchid.service.MovieService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/movies")
@RequiredArgsConstructor
@Tag(name = "Movie Management", description = "APIs for managing movies")
@CrossOrigin(origins = "http://localhost:4200")
public class MovieController {

    private final MovieService movieService;

    @GetMapping
    @Operation(summary = "Get all movies", description = "Retrieve a list of all available movies")
    public ResponseEntity<List<MovieDTO>> getAllMovies() {
        return ResponseEntity.ok(movieService.getAllMovies());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get movie by ID", description = "Retrieve a specific movie by its ID")
    public ResponseEntity<MovieDTO> getMovieById(@PathVariable Long id) {
        return movieService.getMovieById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/age/{age}")
    @Operation(summary = "Get movies by age", description = "Retrieve movies accessible for a specific age")
    public ResponseEntity<List<MovieDTO>> getMoviesByAge(@PathVariable Integer age) {
        return ResponseEntity.ok(movieService.getMoviesByMinAge(age));
    }

    @GetMapping("/search")
    @Operation(summary = "Search movies", description = "Search movies by title")
    public ResponseEntity<List<MovieDTO>> searchMovies(@RequestParam String title) {
        return ResponseEntity.ok(movieService.searchMoviesByTitle(title));
    }

    @PostMapping
    @Operation(summary = "Create a movie", description = "Add a new movie to the system")
    public ResponseEntity<MovieDTO> createMovie(@RequestBody MovieDTO movieDTO) {
        MovieDTO created = movieService.createMovie(movieDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update a movie", description = "Update an existing movie")
    public ResponseEntity<MovieDTO> updateMovie(@PathVariable Long id, @RequestBody MovieDTO movieDTO) {
        return movieService.updateMovie(id, movieDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a movie", description = "Remove a movie from the system")
    public ResponseEntity<Void> deleteMovie(@PathVariable Long id) {
        return movieService.deleteMovie(id)
                ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }
}
