package com.example.backend;

import java.time.ZonedDateTime;

public record ErrorMessage(String error, ZonedDateTime zonedDateTime) {
    public ErrorMessage(String error){this(error,ZonedDateTime.now());}
}
