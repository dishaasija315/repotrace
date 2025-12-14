package com.gitgrade.controller;

import com.gitgrade.model.AnalysisResult;
import com.gitgrade.service.AnalysisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // Allow React frontend to access
public class AnalyzeController {

    @Autowired
    private AnalysisService analysisService;

    @GetMapping("/analyze")
    public AnalysisResult analyze(@RequestParam String url) {
        return analysisService.analyze(url);
    }
}
