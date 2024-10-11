package com.imai.board_back.service.implement;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.imai.board_back.dto.request.auth.SignInRequestDto;
import com.imai.board_back.dto.request.auth.SignUpRequestDto;
import com.imai.board_back.dto.response.ResponseDto;
import com.imai.board_back.dto.response.auth.SignInResponseDto;
import com.imai.board_back.dto.response.auth.SignUpResponseDto;
import com.imai.board_back.entity.UserEntity;
import com.imai.board_back.provider.JwtProvider;
import com.imai.board_back.service.AuthService;
import com.imai.board_back.repository.UserRepository;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class AuthServiceImplement implements AuthService{

    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();


    @Override
    public ResponseEntity<? super SignUpResponseDto> signUp(SignUpRequestDto dto) {

        try {         

            String email = dto.getEmail();
            boolean existedEmail = userRepository.existsByEmail(email);
            if (existedEmail) return SignUpResponseDto.duplicateEmail();

            String nickname = dto.getNickname();
            boolean existedNickname = userRepository.existsByNickname(nickname);
            if (existedNickname) return SignUpResponseDto.duplicateNickname();

            String telNumber = dto.getTelNumber();
            boolean existedTelNumber = userRepository.existsByTelNumber(telNumber);
            if (existedTelNumber) return SignUpResponseDto.duplicateTelNumber();

            String password = dto.getPassword();
            String encodedPassword = passwordEncoder.encode(password);
            dto.setPassword(encodedPassword);
            // dto에 암호화된 패스워드가 들어감

            UserEntity userEntity = new UserEntity(dto);
            userRepository.save(userEntity);
            //데이터베이스에 저장


        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return SignUpResponseDto.success();

    }


    @Override
    public ResponseEntity<? super SignInResponseDto> signIn(SignInRequestDto dto) {

        String token = null;

        try {

            String email = dto.getEmail();
            UserEntity userEntity = userRepository.findByEmail(email);
            if (userEntity == null) return SignInResponseDto.signInFail();

            String password = dto.getPassword();
            String encodedpassword = userEntity.getPassword();
            boolean isMatched = passwordEncoder.matches(password, encodedpassword);
            if (!isMatched) return SignInResponseDto.signInFail();

            token = jwtProvider.create(email);


        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return SignInResponseDto.success(token);
        }

        }


