package com.imai.board_back.service;

import org.springframework.http.ResponseEntity;

import com.imai.board_back.dto.request.user.PatchNicknameRequestDto;
import com.imai.board_back.dto.request.user.PatchProfileImageRequestDto;
import com.imai.board_back.dto.response.user.GetSignInUserResponseDto;
import com.imai.board_back.dto.response.user.PatchNicknameResponseDto;
import com.imai.board_back.dto.response.user.PatchProfileImageResponseDto;

import com.imai.board_back.dto.response.user.GetUserResponseDto;


public interface UserService {

    //74 5:16추가
    ResponseEntity<? super GetUserResponseDto> getUser(String email);

    ResponseEntity<? super GetSignInUserResponseDto> getSignInUser(String email);

    //75 9:35추가
    ResponseEntity<? super PatchNicknameResponseDto> patchNickname(PatchNicknameRequestDto dto, String email);

    //75 10:06추가
    ResponseEntity<? super PatchProfileImageResponseDto> patchProfileImage(PatchProfileImageRequestDto dto, String email);
}