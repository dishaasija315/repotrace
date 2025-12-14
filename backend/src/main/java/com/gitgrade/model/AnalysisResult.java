package com.gitgrade.model;

import lombok.Data;
import java.util.List;
import java.util.Map;

@Data
public class AnalysisResult {
    private String repoName;
    private String description;
    private int score;
    private String summary;
    private List<String> roadmap;
    private List<String> techStack;
    private Map<String, Object> details; // Detailed metrics (stars, forks, etc.)
    private Map<String, Integer> categoryScores; // Breakdown: Quality, Docs, Health, etc.
}
