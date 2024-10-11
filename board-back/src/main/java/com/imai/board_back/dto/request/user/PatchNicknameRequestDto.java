// 75 2:00추가

package com.imai.board_back.dto.request.user;

import jakarta.validation.constraints.NotBlank;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PatchNicknameRequestDto {
    
    @NotBlank
    private String nickname;
}
