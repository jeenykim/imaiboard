package com.imai.board_back.service;

import org.springframework.http.ResponseEntity;

import com.imai.board_back.dto.request.board.PatchBoardRequestDto;
import com.imai.board_back.dto.request.board.PostBoardRequestDto;
import com.imai.board_back.dto.request.board.PostCommentRequestDto;
// import com.imai.board_back.dto.request.board.PatchBoardRequestDto;
import com.imai.board_back.dto.response.board.PostCommentResponseDto;
import com.imai.board_back.dto.response.board.PostBoardResponseDto;
import com.imai.board_back.dto.response.board.GetBoardResponseDto;
import com.imai.board_back.dto.response.board.PutFavoriteResponseDto;
import com.imai.board_back.dto.response.board.GetFavoriteListResponseDto;
import com.imai.board_back.dto.response.board.GetCommentListResponseDto;
import com.imai.board_back.dto.response.board.GetLatestBoardListResponseDto;
import com.imai.board_back.dto.response.board.GetTop3BoardListResponseDto;
import com.imai.board_back.dto.response.board.GetSearchBoardListResponseDto;
import com.imai.board_back.dto.response.board.GetUserBoardListResponseDto;
import com.imai.board_back.dto.response.board.IncreaseViewCountResponseDto;
import com.imai.board_back.dto.response.board.DeleteBoardResponseDto;
import com.imai.board_back.dto.response.board.PatchBoardResponseDto;




public interface BoardService {
    
    ResponseEntity<? super GetBoardResponseDto> getBoard(Integer boardNumber);
    // 45추가
    ResponseEntity<? super GetFavoriteListResponseDto> getFavoriteList(Integer boardNumber);

    //47추가 9:35
    ResponseEntity<? super GetCommentListResponseDto> getCommentList(Integer boardNumber);


    //64추가 9:00
    ResponseEntity<? super GetLatestBoardListResponseDto> getLatestBoardList();

    //65추가 4:32
    ResponseEntity<? super GetTop3BoardListResponseDto> getTop3BoardList();


    //70추가 4:32
    ResponseEntity<? super GetSearchBoardListResponseDto> getSearchBoardList(String searchWord, String preSearchWord);


    //74추가 16:50
    ResponseEntity<? super GetUserBoardListResponseDto> getUserBoardList(String email);


    ResponseEntity<? super PostBoardResponseDto> postBoard(PostBoardRequestDto dto, String email);  

    //46추가 7:38
    ResponseEntity<? super PostCommentResponseDto> postComment( PostCommentRequestDto dto, Integer boardNumber, String email);  


    // 44추가
    ResponseEntity<? super PutFavoriteResponseDto> putFavorite(Integer boardNumber, String email);  

    // 61추가 8:51
    ResponseEntity<? super PatchBoardResponseDto> patchBoard(PatchBoardRequestDto dto, Integer boardNumber, String email);  


    // 53추가  20:00   
    ResponseEntity<? super IncreaseViewCountResponseDto> increaseViewCount(Integer boardNumber);  


    // 56추가  5:20   
    ResponseEntity<? super DeleteBoardResponseDto> deleteBoard(Integer boardNumber, String email);  
}


