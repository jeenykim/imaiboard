package com.imai.board_back.service;

import org.springframework.http.ResponseEntity;

import com.imai.board_back.dto.request.auth.SignInRequestDto;
import com.imai.board_back.dto.request.auth.SignUpRequestDto;
import com.imai.board_back.dto.response.auth.SignUpResponseDto;
import com.imai.board_back.dto.response.auth.SignInResponseDto;

public interface AuthService {

    ResponseEntity<? super SignUpResponseDto> signUp(SignUpRequestDto dto);
    // 25추가
    ResponseEntity<? super SignInResponseDto> signIn(SignInRequestDto dto);

    
}
