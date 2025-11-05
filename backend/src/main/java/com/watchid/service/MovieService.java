package com.watchid.service;

import com.watchid.dto.MovieDTO;
import com.watchid.model.Movie;
import com.watchid.repository.MovieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MovieService {

    private final MovieRepository movieRepository;

    public List<MovieDTO> getAllMovies() {
        return movieRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public Optional<MovieDTO> getMovieById(Long id) {
        return movieRepository.findById(id)
                .map(this::convertToDTO);
    }

    public List<MovieDTO> getMoviesByMinAge(Integer age) {
        return movieRepository.findByMinAgeLessThanEqual(age).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<MovieDTO> searchMoviesByTitle(String title) {
        return movieRepository.findByTitleContainingIgnoreCase(title).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public MovieDTO createMovie(MovieDTO movieDTO) {
        Movie movie = convertToEntity(movieDTO);
        Movie savedMovie = movieRepository.save(movie);
        return convertToDTO(savedMovie);
    }

    public Optional<MovieDTO> updateMovie(Long id, MovieDTO movieDTO) {
        return movieRepository.findById(id)
                .map(existingMovie -> {
                    existingMovie.setTitle(movieDTO.getTitle());
                    existingMovie.setDescription(movieDTO.getDescription());
                    existingMovie.setMinAge(movieDTO.getMinAge());
                    existingMovie.setGenre(movieDTO.getGenre());
                    existingMovie.setDuration(movieDTO.getDuration());
                    existingMovie.setPosterUrl(movieDTO.getPosterUrl());
                    existingMovie.setTrailerUrl(movieDTO.getTrailerUrl());
                    Movie updated = movieRepository.save(existingMovie);
                    return convertToDTO(updated);
                });
    }

    public boolean deleteMovie(Long id) {
        if (movieRepository.existsById(id)) {
            movieRepository.deleteById(id);
            return true;
        }
        return false;
    }

    private MovieDTO convertToDTO(Movie movie) {
        MovieDTO dto = new MovieDTO();
        dto.setId(movie.getId());
        dto.setTitle(movie.getTitle());
        dto.setDescription(movie.getDescription());
        dto.setMinAge(movie.getMinAge());
        dto.setGenre(movie.getGenre());
        dto.setDuration(movie.getDuration());
        dto.setPosterUrl(movie.getPosterUrl());
        dto.setTrailerUrl(movie.getTrailerUrl());
        return dto;
    }

    private Movie convertToEntity(MovieDTO dto) {
        Movie movie = new Movie();
        movie.setTitle(dto.getTitle());
        movie.setDescription(dto.getDescription());
        movie.setMinAge(dto.getMinAge());
        movie.setGenre(dto.getGenre());
        movie.setDuration(dto.getDuration());
        movie.setPosterUrl(dto.getPosterUrl());
        movie.setTrailerUrl(dto.getTrailerUrl());
        return movie;
    }
}
