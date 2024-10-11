package com.imai.board_back.dto.response.board;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.imai.board_back.common.ResponseCode;
import com.imai.board_back.common.ResponseMessage;
import com.imai.board_back.dto.response.ResponseDto;
import com.imai.board_back.entity.ImageEntity;
import com.imai.board_back.repository.resultset.GetBoardResultSet;

import lombok.Getter;

@Getter
public class GetBoardResponseDto extends ResponseDto {


    //"boardNumber": 1,
    //"title": 게시물제목입니다,
    //"content": 게시물내용입니다게시물내용입니다게시물내용입니다,
    //"boardImageList: [],
    //"writeDateTime: 2024.7.14. 19:36:44,
    //"writerEmail: email@email.com,
    //"writerNickName": 안녕하세요 이메이킴입니다,
    //"writerProfileImage": null

    // 52 5:11 하단 복사
    private int boardNumber;
    private String title;
    private String content;
    private List<String> boardImageList;
    private String writeDateTime;
    private String writerEmail;
    private String writerNickName;
    private String writerProfileImage;

    //43_1수정
    private GetBoardResponseDto(GetBoardResultSet resultSet, List<ImageEntity> imageEntities) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);

        List<String> boardImageList = new ArrayList<>();
        for (ImageEntity imageEntity: imageEntities) {
            String boardImage = imageEntity.getImage();
            boardImageList.add(boardImage);
        }


        this.boardNumber = resultSet.getBoardNumber();
        this.title = resultSet.getTitle();
        this.content = resultSet.getContent();
        this.boardImageList = boardImageList;
        this.writeDateTime = resultSet.getWriteDatetime();
        this.writerEmail = resultSet.getWriterEmail();
        this.writerNickName = resultSet.getWriterNickname();
        this.writerProfileImage = resultSet.getWriterProfileImage();
    }

    //43수정
    public static ResponseEntity<GetBoardResponseDto> success(GetBoardResultSet resultSet, List<ImageEntity> imageEntities) {
        GetBoardResponseDto result = new GetBoardResponseDto(resultSet, imageEntities);
        return ResponseEntity.status(HttpStatus.OK).body(result);         
    }

    // 53 22:35 복사후 IncreaseViewCountResponseDto.java에 붙힘
    public static ResponseEntity<ResponseDto> noExistBoard() {
        ResponseDto result = new ResponseDto(ResponseCode.NOT_EXISTED_BOARD, ResponseMessage.NOT_EXISTED_BOARD);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);    
    }

}



    

