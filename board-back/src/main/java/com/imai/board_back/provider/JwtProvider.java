package com.imai.board_back.provider;

// 80 22:55추가
import java.nio.charset.StandardCharsets;
// 80 21:44추가
import java.security.Key;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;



@Component
public class JwtProvider {

    @Value("${secret-key}")
    private String secretKey;

    public String create(String email) {

    Date expiredDate = Date.from(Instant.now().plus(1, ChronoUnit.HOURS));


    // 80 20:52추가
    Key key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));

     // 80 23:15 signWith뒤에 key추가
    String jwt = Jwts.builder()
        .signWith(key, SignatureAlgorithm.HS256)
        .setSubject(email).setIssuedAt(new Date()).setExpiration(expiredDate)
        .compact();

    return jwt;  
    
    }

    public String validate(String jwt){
    
    Claims claims = null;

    // 80 23:54추가
    Key key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));

    // 80 23:38 수정 key .build()추가
    try{
        claims = Jwts.parserBuilder()
            .setSigningKey(key)
            .build()
            .parseClaimsJws(jwt)
            .getBody();
    }catch (Exception exception) {
        exception.printStackTrace();
        return null;
    }

    return claims.getSubject();
    }
     
}