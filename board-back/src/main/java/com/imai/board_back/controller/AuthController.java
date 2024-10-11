package com.imai.board_back.controller;

import org.springframework.web.bind.annotation.RestController;

import com.imai.board_back.dto.request.auth.SignInRequestDto;
import com.imai.board_back.dto.request.auth.SignUpRequestDto;
import com.imai.board_back.dto.response.auth.SignUpResponseDto;
import com.imai.board_back.dto.response.auth.SignInResponseDto;
import com.imai.board_back.service.AuthService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.RequestMapping;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor

public class AuthController {
    
    private final AuthService authService;

    @PostMapping("/sign-up")
    public ResponseEntity<? super SignUpResponseDto> signUp(
        @RequestBody @Valid SignUpRequestDto requestBody
    ) {
        ResponseEntity<? super SignUpResponseDto> response = authService.signUp(requestBody);
        return response;
    }

    @CrossOrigin(origins = "http://localhost:3000")  // 특정 도메인만 허용
    @PostMapping("/sign-in")
    public ResponseEntity<? super SignInResponseDto> signIn(
        @RequestBody @Valid SignInRequestDto requestBody
    ) {
        ResponseEntity<? super SignInResponseDto> response = authService.signIn(requestBody);
        return response;
    }


    
}

//컨트롤러에는 비지니스 로직이 담기면 안됨(service에 담아줌)

//Request를 받고 Response를 주는 검증처리하는 구역