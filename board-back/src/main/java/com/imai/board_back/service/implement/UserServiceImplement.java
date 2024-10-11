package com.imai.board_back.service.implement;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.imai.board_back.dto.request.user.PatchNicknameRequestDto;
import com.imai.board_back.dto.request.user.PatchProfileImageRequestDto;
import com.imai.board_back.dto.response.ResponseDto;
import com.imai.board_back.dto.response.user.GetSignInUserResponseDto;
import com.imai.board_back.dto.response.user.GetUserResponseDto;
import com.imai.board_back.dto.response.user.PatchNicknameResponseDto;
import com.imai.board_back.dto.response.user.PatchProfileImageResponseDto;

import com.imai.board_back.entity.UserEntity;
import com.imai.board_back.repository.UserRepository;
import com.imai.board_back.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImplement implements UserService {

    private final UserRepository userRepository;


    // 74  빠른 수정후 하단생성 여기로 이동
    @Override
    public ResponseEntity<? super GetUserResponseDto> getUser(String email) {

        UserEntity userEntity = null;

        try {
           
            userEntity = userRepository.findByEmail(email);
            if (userEntity == null) return GetSignInUserResponseDto.noExistUser();
            
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();        
        }

        return GetUserResponseDto.success(userEntity);

    }


    @Override
    public ResponseEntity<? super GetSignInUserResponseDto> getSignInUser(String email) {
    
        UserEntity userEntity = null;

        try {
           
            userEntity = userRepository.findByEmail(email);
            if (userEntity == null) return GetSignInUserResponseDto.noExistUser();
            
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();        
        }

        return GetSignInUserResponseDto.success(userEntity);
    }

    // 75 11:00 추가
    @Override
    public ResponseEntity<? super PatchNicknameResponseDto> patchNickname(PatchNicknameRequestDto dto, String email) {
        
        try {
           
            UserEntity userEntity = userRepository.findByEmail(email);

            if (userEntity == null) return PatchNicknameResponseDto.noExistUser();

            String nickname = dto.getNickname();
            boolean existedNickname = userRepository.existsByNickname(nickname);
            if (existedNickname) return PatchNicknameResponseDto.duplicateNickname();

            userEntity.setNickname(nickname);
            userRepository.save(userEntity);
            
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();        
        }

        return PatchNicknameResponseDto.success();
    }

    //75 14:20 추가
    @Override
    public ResponseEntity<? super PatchProfileImageResponseDto> patchProfileImage(PatchProfileImageRequestDto dto, String email) {
     
        try {
           
            UserEntity userEntity = userRepository.findByEmail(email);

            if (userEntity == null) return PatchProfileImageResponseDto.noExistUser();

            String profileImage = dto.getProfileImage();
            userEntity.setProfileImage(profileImage);
            userRepository.save(userEntity);
            
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();        
        }

        return PatchProfileImageResponseDto.success();

    }

}
