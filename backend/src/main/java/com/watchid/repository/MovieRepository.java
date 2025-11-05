package com.watchid.repository;

import com.watchid.model.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {
    
    List<Movie> findByMinAgeLessThanEqual(Integer age);
    
    List<Movie> findByGenre(String genre);
    
    List<Movie> findByTitleContainingIgnoreCase(String title);
}
