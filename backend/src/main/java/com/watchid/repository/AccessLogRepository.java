package com.watchid.repository;

import com.watchid.model.AccessLog;
import com.watchid.model.Movie;
import com.watchid.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccessLogRepository extends JpaRepository<AccessLog, Long> {
    
    List<AccessLog> findByUser(User user);
    
    List<AccessLog> findByMovie(Movie movie);
    
    List<AccessLog> findByAccessGranted(Boolean accessGranted);
}
