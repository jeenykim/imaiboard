package com.imai.board_back.service.implement;

import java.util.ArrayList;
import java.util.List;


// 일주일 기간 삭제 후 주석
// 65추가 11:03
// import java.util.Date;
// import java.text.SimpleDateFormat;
// 65추가 11:40 
// import java.time.Instant;
// import java.time.temporal.ChronoUnit; 

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.imai.board_back.dto.request.board.PatchBoardRequestDto;
import com.imai.board_back.dto.request.board.PostBoardRequestDto;
import com.imai.board_back.dto.request.board.PostCommentRequestDto;
import com.imai.board_back.dto.response.ResponseDto;
// import com.imai.board_back.dto.response.auth.SignUpResponseDto;
import com.imai.board_back.dto.response.board.PostBoardResponseDto;
import com.imai.board_back.dto.response.board.PostCommentResponseDto;
import com.imai.board_back.dto.response.board.PutFavoriteResponseDto;
import com.imai.board_back.dto.response.board.DeleteBoardResponseDto;
import com.imai.board_back.dto.response.board.GetBoardResponseDto;
import com.imai.board_back.dto.response.board.GetCommentListResponseDto;
import com.imai.board_back.dto.response.board.GetFavoriteListResponseDto;
import com.imai.board_back.dto.response.board.GetLatestBoardListResponseDto;
import com.imai.board_back.dto.response.board.GetSearchBoardListResponseDto;
import com.imai.board_back.dto.response.board.GetTop3BoardListResponseDto;
import com.imai.board_back.dto.response.board.GetUserBoardListResponseDto;
import com.imai.board_back.dto.response.board.IncreaseViewCountResponseDto;
import com.imai.board_back.dto.response.board.PatchBoardResponseDto;
import com.imai.board_back.entity.BoardEntity;
import com.imai.board_back.entity.BoardListViewEntity;
import com.imai.board_back.entity.CommentEntity;
import com.imai.board_back.entity.FavoriteEntity;
import com.imai.board_back.entity.ImageEntity;
import com.imai.board_back.entity.SearchLogEntity;
import com.imai.board_back.repository.BoardListViewRepository;
import com.imai.board_back.repository.BoardRepository;
import com.imai.board_back.repository.CommentRepository;
import com.imai.board_back.repository.FavoriteRepository;
import com.imai.board_back.repository.ImageRepository;
import com.imai.board_back.repository.SearchLogRepository;
import com.imai.board_back.repository.UserRepository;
import com.imai.board_back.repository.resultset.GetBoardResultSet;
import com.imai.board_back.repository.resultset.GetCommentListResultSet;
import com.imai.board_back.repository.resultset.GetFavoriteListResultSet;
import com.imai.board_back.service.BoardService;

import lombok.RequiredArgsConstructor;



@Service
@RequiredArgsConstructor
public class BoardServiceImplement implements BoardService {

    private final UserRepository userRepository;
    private final BoardRepository boardRepository;
    private final ImageRepository imageRepository;  
     // 44_1추가 12:08
    private final FavoriteRepository favoriteRepository;

     // 70 추가 12:00
    private final SearchLogRepository searchLogRepository;

    //46추가
    private final CommentRepository commentRepository;

    // 64추가 11:00
    private final BoardListViewRepository boardListViewRepository;


  
    // 43추가
    @Override
    public ResponseEntity<? super GetBoardResponseDto> getBoard(Integer boardNumber) {

        GetBoardResultSet resultSet = null;
        List<ImageEntity> imageEntities = new ArrayList<>();

        try {

            resultSet = boardRepository.getBoard(boardNumber);
            if (resultSet == null) return GetBoardResponseDto.noExistBoard();

            imageEntities = imageRepository.findByBoardNumber(boardNumber);


            //53에서 21:28 잘라내기후 하단 248라인에 붙임
            // 43추가
            // BoardEntity boardEntity = boardRepository.findByBoardNumber(boardNumber);
            // // 43_1추가
            // boardEntity.increaseViewCount();
            // boardRepository.save(boardEntity);
            
            } catch (Exception exception) {
                exception.printStackTrace();
                return ResponseDto.databaseError();
            }
            return GetBoardResponseDto.success(resultSet, imageEntities);
    } 
    

    // 45자동생성 잘라내기후 68상단으로 올림

    @Override
    public ResponseEntity<? super GetFavoriteListResponseDto> getFavoriteList(Integer boardNumber) {

        // 45 추가 삽입 14:21
        List<GetFavoriteListResultSet> resultSets = new ArrayList<>();
               
        try {

            // 45 추가 삽입 15:00
            boolean existedBoard = boardRepository.existsByBoardNumber(boardNumber);
            if (!existedBoard) return GetFavoriteListResponseDto.noExistBoard();

            resultSets = favoriteRepository.getFavoriteList(boardNumber);


            
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        // 45 추가 삽입 15:36
        return GetFavoriteListResponseDto.success(resultSets);
    }


    //47 하단코드잘라 붙이기 10:45
    @Override
    public ResponseEntity<? super GetCommentListResponseDto> getCommentList(Integer boardNumber) {


        List<GetCommentListResultSet> resultSets = new ArrayList<>();

        try {
            boolean existedBoard = boardRepository.existsByBoardNumber(boardNumber);
            if (!existedBoard) return GetCommentListResponseDto.noExistBoard();

            resultSets = commentRepository.getCommentList(boardNumber);
            
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return GetCommentListResponseDto.success(resultSets);  
    }

    // 64 9:41 하단새로 생성 잘라서 붙이기
    @Override
    public ResponseEntity<? super GetLatestBoardListResponseDto> getLatestBoardList() {

        List<BoardListViewEntity> boardListViewEntities = new ArrayList<>();

        try {                        
            boardListViewEntities = boardListViewRepository.findByOrderByWriteDatetimeDesc();
            
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return GetLatestBoardListResponseDto.success(boardListViewEntities);  

    }

    // 65 5:41 하단새로 생성 잘라서 붙이기
    @Override
    public ResponseEntity<? super GetTop3BoardListResponseDto> getTop3BoardList() {

        List<BoardListViewEntity> boardListViewEntities = new ArrayList<>();
  
        try {
            // 65 12:00 추가 너튜브원본은 일주일인데 날짜 조건 삭제
            // WriteDatetimeGreaterThan 삭제
            // Date beforeWeek = Date.from(Instant.now().minus(7, ChronoUnit.DAYS));
            // SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            // String sevenDaysAgo = simpleDateFormat.format(beforeWeek);

            // boardListViewEntities = boardListViewRepository.findTop3ByWriteDatetimeGreaterThanOrderByFavoriteCountDescCommentCountDescViewCountDescWriteDatetimeDesc(sevenDaysAgo);
            boardListViewEntities = boardListViewRepository.findTop3ByOrderByFavoriteCountDescCommentCountDescViewCountDescWriteDatetimeDesc();
            
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return GetTop3BoardListResponseDto.success(boardListViewEntities);  
    }


    // 70 5:28 하단새로 생성 잘라서 붙이기
    @Override
    public ResponseEntity<? super GetSearchBoardListResponseDto> getSearchBoardList(String searchWord, String preSearchWord) {
        
        List<BoardListViewEntity> boardListViewEntities = new ArrayList<>();

        // 70 추가 9:03
        try {

            boardListViewEntities = boardListViewRepository.findByTitleContainsOrContentContainsOrderByWriteDatetimeDesc(searchWord, searchWord);
            //현재 검색 결과 찾음  
            
            // 70 추가 11:50
            SearchLogEntity searchLogEntity = new SearchLogEntity(searchWord, preSearchWord, false);
            searchLogRepository.save(searchLogEntity);

            boolean relation = preSearchWord != null;
            if (relation) {
                searchLogEntity = new SearchLogEntity(preSearchWord, searchWord, relation);
                searchLogRepository.save(searchLogEntity);
            }


        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return GetSearchBoardListResponseDto.success(boardListViewEntities);  
    }

    // 74 18:30 자동생성후 하단 복붙 이동
    @Override
    public ResponseEntity<? super GetUserBoardListResponseDto> getUserBoardList(String email) {

        List<BoardListViewEntity> boardListViewEntities = new ArrayList<>();

        try {

        boolean existedUser = userRepository.existsByEmail(email);

        if (!existedUser) return GetUserBoardListResponseDto.noExistUser();
            
        boardListViewEntities = boardListViewRepository.findByWriterEmailOrderByWriteDatetimeDesc(email);
        //현재 검색 결과 찾음  
            
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return GetUserBoardListResponseDto.success(boardListViewEntities);  

    }


     


    @Override
    public ResponseEntity<? super PostBoardResponseDto> postBoard(PostBoardRequestDto dto, String email) {

        try {

            boolean existedEmail =userRepository.existsByEmail(email);
            if (!existedEmail) return PostBoardResponseDto.noExistUser();

            BoardEntity boardEntity = new BoardEntity(dto, email);
            boardRepository.save(boardEntity);

            int boardNumber = boardEntity.getBoardNumber();

            List<String> boardImageList = dto.getBoardImageList();
            List<ImageEntity> imageEntities = new ArrayList<>();
            
            for (String image: boardImageList) {
                ImageEntity imageEntity = new ImageEntity(boardNumber, image);
                //ImageEntity 파일에 추가 입력해야함
                imageEntities.add(imageEntity);
            }
            imageRepository.saveAll(imageEntities);
            // 데이타 양 너무 많아지면 무리기에 saveAll로 해줌
        
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return PostBoardResponseDto.success();

    }

    // 46추가후 하단 생성 코드 잘라서 가져옴 10:00
    @Override
    public ResponseEntity<? super PostCommentResponseDto> postComment(PostCommentRequestDto dto, Integer boardNumber, String email) {
    
        try {

            BoardEntity boardEntity =boardRepository.findByBoardNumber(boardNumber);
            if (boardEntity == null) return PostCommentResponseDto.noExistBoard();

            boolean existedUser = userRepository.existsByEmail(email);
            if (!existedUser) return PostCommentResponseDto.noExistUser();

            CommentEntity commentEntity = new CommentEntity(dto, boardNumber, email);
            commentRepository.save(commentEntity);

            boardEntity.increaseCommentCount();
            boardRepository.save(boardEntity);           


        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();      
        }
        return PostCommentResponseDto.success();
    }



    // 44추가7:40
    @Override
    public ResponseEntity<? super PutFavoriteResponseDto> putFavorite(Integer boardNumber, String email) {
 
        try {

            boolean existedUser = userRepository.existsByEmail(email);
            if (!existedUser) return PutFavoriteResponseDto.noExistUser();
            

            // //44추가
            // boolean existedBoard = boardRepository.existsByBoardNumber(boardNumber);
            // if (!existedBoard) return PutFavoriteResponseDto.noExistBoard();


            // 44_1상단 수정추가 13:54           
            BoardEntity boardEntity = boardRepository.findByBoardNumber(boardNumber);
            if (boardEntity == null) return PutFavoriteResponseDto.noExistBoard();


            // 44_1추가 19:33
            FavoriteEntity favoriteEntity = favoriteRepository.findByBoardNumberAndUserEmail(boardNumber, email);
            if (favoriteEntity  == null) {
                favoriteEntity = new FavoriteEntity(email, boardNumber
                );
                favoriteRepository.save(favoriteEntity);
                // 15:22추가
                boardEntity.increaseFavoriteCount();
            }
            else {
                favoriteRepository.delete(favoriteEntity);
                // 15:22추가
                boardEntity.decreaseFavoriteCount();
            }
            // 15:22추가
            boardRepository.save(boardEntity);

            
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();           
        }
        return PutFavoriteResponseDto.success();
    }

    // 61 10:18 자동 생성후 하단에서 이 위치로 옮김
    @Override
    public ResponseEntity<? super PatchBoardResponseDto> patchBoard(PatchBoardRequestDto dto, Integer boardNumber,
            String email) {
        try {
            BoardEntity boardEntity = boardRepository.findByBoardNumber(boardNumber);
            if (boardEntity == null) return PatchBoardResponseDto.noExistBoard();

            boolean existedUser = userRepository.existsByEmail(email);
            if (!existedUser) return PatchBoardResponseDto.noExistUser();

            String writerEmail = boardEntity.getWriterEmail();
            boolean isWriter = writerEmail.equals(email);
            if (!isWriter) return PatchBoardResponseDto.noPermission();

            // 61 추가 14:44
            boardEntity.patchBoard(dto);
            boardRepository.save(boardEntity);

            imageRepository.deleteByBoardNumber(boardNumber);
            List<String> boardImageList = dto.getBoardImageList();
            List<ImageEntity> imageEntities = new ArrayList<>();

            for (String image: boardImageList) {
                ImageEntity imageEntity = new ImageEntity(boardNumber, image);
                imageEntities.add(imageEntity);
            }

            imageRepository.saveAll(imageEntities);
            
            
            } catch (Exception exception) {
                exception.printStackTrace();
                return ResponseDto.databaseError();           
            }

            return PatchBoardResponseDto.success();

        }


   



    // 53 20:48  BoardServiceImplement 우측마우스 add후 자동생성

    @Override
    public ResponseEntity<? super IncreaseViewCountResponseDto> increaseViewCount(Integer boardNumber) {

        // 53  21:58 상단 잘라낸 영역 여기에 붙임
        // 53  22:50 noExistBoard() 마지막 return추가 
        //
        try {
            BoardEntity boardEntity = boardRepository.findByBoardNumber(boardNumber);
            if (boardEntity == null) return IncreaseViewCountResponseDto.noExistBoard();

            boardEntity.increaseViewCount();
            boardRepository.save(boardEntity);
            
            } catch (Exception exception) {
                exception.printStackTrace();
                return ResponseDto.databaseError();           
            }

            return IncreaseViewCountResponseDto.success();

        }

    // 56추가 5:56 상단 add 자동 생성
    @Override
    public ResponseEntity<? super DeleteBoardResponseDto> deleteBoard(Integer boardNumber, String email) {
        try {

            boolean existedUser = userRepository.existsByEmail(email);
            if (!existedUser) return DeleteBoardResponseDto.noExistUser();

            BoardEntity boardEntity = 
            boardRepository.findByBoardNumber(boardNumber);
            if (boardEntity == null) return DeleteBoardResponseDto.noExistBoard();

            String writerEmail = boardEntity.getWriterEmail();
            boolean isWriter = writerEmail.equals(email);
            if (!isWriter) return DeleteBoardResponseDto.noPermission();

            imageRepository.deleteByBoardNumber(boardNumber);
            commentRepository.deleteByBoardNumber(boardNumber);
            favoriteRepository.deleteByBoardNumber(boardNumber);

            boardRepository.delete(boardEntity);

           
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();      
            
        }
            return DeleteBoardResponseDto.success();
        }









    

    }


    
