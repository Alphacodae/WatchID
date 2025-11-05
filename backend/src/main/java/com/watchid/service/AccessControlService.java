package com.watchid.service;

import com.watchid.dto.AccessRequestDTO;
import com.watchid.dto.AccessResponseDTO;
import com.watchid.dto.MovieDTO;
import com.watchid.model.AccessLog;
import com.watchid.model.Movie;
import com.watchid.model.User;
import com.watchid.repository.AccessLogRepository;
import com.watchid.repository.MovieRepository;
import com.watchid.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AccessControlService {

    private final MovieRepository movieRepository;
    private final UserRepository userRepository;
    private final AccessLogRepository accessLogRepository;

    public AccessResponseDTO checkAccess(AccessRequestDTO request) {
        Movie movie = movieRepository.findById(request.getMovieId())
                .orElseThrow(() -> new RuntimeException("Movie not found"));

        boolean accessGranted = request.getDetectedAge() >= movie.getMinAge();
        String message = accessGranted 
                ? "Access granted. Enjoy the movie!" 
                : String.format("Access denied. This content requires minimum age %d, detected age: %d", 
                        movie.getMinAge(), request.getDetectedAge());

        // Log the access attempt
        AccessLog log = new AccessLog();
        log.setMovie(movie);
        log.setDetectedAge(request.getDetectedAge());
        log.setAccessGranted(accessGranted);
        log.setDenialReason(accessGranted ? null : "Age restriction");
        
        if (request.getUserId() != null) {
            userRepository.findById(request.getUserId())
                    .ifPresent(log::setUser);
        }
        
        accessLogRepository.save(log);

        // Convert movie to DTO
        MovieDTO movieDTO = new MovieDTO();
        movieDTO.setId(movie.getId());
        movieDTO.setTitle(movie.getTitle());
        movieDTO.setDescription(movie.getDescription());
        movieDTO.setMinAge(movie.getMinAge());
        movieDTO.setGenre(movie.getGenre());
        movieDTO.setDuration(movie.getDuration());
        movieDTO.setPosterUrl(movie.getPosterUrl());
        movieDTO.setTrailerUrl(movie.getTrailerUrl());

        return new AccessResponseDTO(accessGranted, message, movieDTO);
    }
}
