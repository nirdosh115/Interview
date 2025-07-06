package com.javainterview.backend.controller;

import com.javainterview.backend.model.Statistic;
import com.javainterview.backend.service.StatisticService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/statistics")
@CrossOrigin(origins = "*", maxAge = 3600)
public class StatisticController {
    @Autowired
    private StatisticService statisticService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Statistic>> getAllStatistics() {
        return ResponseEntity.ok(statisticService.getAllStatistics());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Statistic> getStatisticById(@PathVariable Long id) {
        return ResponseEntity.ok(statisticService.getStatisticById(id));
    }

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Statistic> saveStatistic(@RequestBody Statistic statistic) {
        return ResponseEntity.ok(statisticService.saveStatistic(statistic));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteStatistic(@PathVariable Long id) {
        statisticService.deleteStatistic(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/user/{userId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<Statistic>> getStatisticsByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(statisticService.getStatisticsByUserId(userId));
    }

    @PutMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Statistic> updateStatistic(
            @PathVariable Long id,
            @RequestBody Statistic statistic) {
        return ResponseEntity.ok(statisticService.updateStatistic(id, statistic));
    }
}
