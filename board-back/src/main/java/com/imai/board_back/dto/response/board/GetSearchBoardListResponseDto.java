package com.imai.board_back.dto.response.board;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.imai.board_back.common.ResponseCode;
import com.imai.board_back.common.ResponseMessage;
import com.imai.board_back.dto.object.BoardListItem;
import com.imai.board_back.dto.response.ResponseDto;
import com.imai.board_back.entity.BoardListViewEntity;

import lombok.Getter;

// 70 1:23 추가
@Getter
public class GetSearchBoardListResponseDto extends ResponseDto {
    
    private List<BoardListItem> searchList;

    private GetSearchBoardListResponseDto(List<BoardListViewEntity> boardListViewEntities) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.searchList = BoardListItem.getList(boardListViewEntities);
    }
    
    public static ResponseEntity<GetSearchBoardListResponseDto> success(List<BoardListViewEntity> boardListViewEntities) {
        GetSearchBoardListResponseDto result = new GetSearchBoardListResponseDto(boardListViewEntities);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

}

