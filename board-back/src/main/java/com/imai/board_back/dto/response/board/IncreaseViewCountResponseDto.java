package com.imai.board_back.dto.response.board;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.imai.board_back.common.ResponseCode;
import com.imai.board_back.common.ResponseMessage;
import com.imai.board_back.dto.response.ResponseDto;

public class IncreaseViewCountResponseDto extends ResponseDto{
    
    // 53 18:50
    //53 19:20 PostBoardResponseDto.java에서 복붙하고 수정
    private IncreaseViewCountResponseDto() {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    }

    public static ResponseEntity<IncreaseViewCountResponseDto> success() {
        IncreaseViewCountResponseDto result = new IncreaseViewCountResponseDto();
        return ResponseEntity.status(HttpStatus.OK).body(result);         
    }

    // 53 22:40 GetBoardResponseDto.java에서 복사한 부분 여기에 붙힘
    public static ResponseEntity<ResponseDto> noExistBoard() {
        ResponseDto result = new ResponseDto(ResponseCode.NOT_EXISTED_BOARD, ResponseMessage.NOT_EXISTED_BOARD);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);    
    }

}
