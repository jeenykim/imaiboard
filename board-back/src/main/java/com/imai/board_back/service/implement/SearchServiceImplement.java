// 66 7:20추가

package com.imai.board_back.service.implement;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.imai.board_back.dto.response.ResponseDto;
import com.imai.board_back.dto.response.search.GetPopularListResponseDto;
import com.imai.board_back.dto.response.search.GetRelationListResponseDto;
import com.imai.board_back.repository.SearchLogRepository;
import com.imai.board_back.repository.resultset.GetPopularListResultSet;
import com.imai.board_back.repository.resultset.GetRelationListResultSet;
import com.imai.board_back.service.SearchService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SearchServiceImplement implements SearchService {
    
    private final SearchLogRepository searchLogRepository;

    @Override
    public ResponseEntity<? super GetPopularListResponseDto> getPopularList() {

        // 66 13:10추가
        List<GetPopularListResultSet> resultSets = new ArrayList<>();

        try {
           
            resultSets = searchLogRepository.getPopularList();
            
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();        
        }
        // 66 15:28 resultSets추가
        return GetPopularListResponseDto.success(resultSets);

    }


    // 71  빠른 수정후 생성
    @Override
    public ResponseEntity<? super GetRelationListResponseDto> getRelationList(String searchWord) {


        // 71 8:20추가
        List<GetRelationListResultSet> resultSets = new ArrayList<>();

        try {
           
            resultSets = searchLogRepository.getRelationList(searchWord);
            
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();        
        }
        
        return GetRelationListResponseDto.success(resultSets);
       
    }
    
}
