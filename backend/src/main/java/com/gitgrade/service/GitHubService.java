package com.gitgrade.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class GitHubService {

    private final RestTemplate restTemplate = new RestTemplate();
    private final String GITHUB_API_BASE = "https://api.github.com/repos";

    public JsonNode getRepoMetadata(String owner, String repo) {
        String url = String.format("%s/%s/%s", GITHUB_API_BASE, owner, repo);
        return fetchFromGitHub(url);
    }

    public JsonNode getRepoContent(String owner, String repo, String path) {
        String url = String.format("%s/%s/%s/contents/%s", GITHUB_API_BASE, owner, repo, path);
        return fetchFromGitHub(url);
    }

    public JsonNode getRepoLanguages(String owner, String repo) {
        String url = String.format("%s/%s/%s/languages", GITHUB_API_BASE, owner, repo);
        return fetchFromGitHub(url);
    }

    public JsonNode getRepoCommits(String owner, String repo) {
        // Fetch last 30 commits
        String url = String.format("%s/%s/%s/commits?per_page=30", GITHUB_API_BASE, owner, repo);
        return fetchFromGitHub(url);
    }

    public JsonNode getRepoPulls(String owner, String repo) {
        // Fetch recent pull requests (closed/merged usually better for history, but all is fine)
        String url = String.format("%s/%s/%s/pulls?state=all&per_page=10", GITHUB_API_BASE, owner, repo);
        return fetchFromGitHub(url);
    }

    private JsonNode fetchFromGitHub(String url) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.set("Accept", "application/vnd.github.v3+json");
            headers.set("User-Agent", "RepoTrace-App");
            // Note: For higher rate limits, we should add Authorization header here if a token is available.
            // headers.set("Authorization", "token " + token);

            HttpEntity<String> entity = new HttpEntity<>(headers);
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
            
            ObjectMapper mapper = new ObjectMapper();
            return mapper.readTree(response.getBody());
        } catch (Exception e) {
            // Handle exceptions (e.g. 404, 403)
            System.err.println("Error fetching from GitHub (" + url + "): " + e.getMessage());
            return null;
        }
    }
}
