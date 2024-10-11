package com.imai.board_back.dto.request.board;

import jakarta.validation.constraints.NotBlank;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PostCommentRequestDto {

     // postman확인 content로 수정 19:41
     // CommentEntity 45라인 getContent수정
    @NotBlank
    private String content;
    
}
