package com.gapsi.suppliers_service.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/v1/version", produces = MediaType.APPLICATION_JSON_VALUE)
@Tag(name = "VersionInfo", description = "Version Info")
public class VersionInfoController {
    @Value("${app.info.message}")
    private String message;

    @Value("${app.info.version}")
    private String version;

    @Value("${app.info.author}")
    private String author;

    @GetMapping("/info")
    public ResponseEntity<Map<String, String>> info() {
        return ResponseEntity.ok(Map.of(
                "message", message,
                "version", version,
                "author", author
        ));
    }
}
