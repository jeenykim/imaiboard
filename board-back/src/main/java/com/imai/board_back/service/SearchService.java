// 66 5:05추가

package com.imai.board_back.service;

import org.springframework.http.ResponseEntity;

import com.imai.board_back.dto.response.search.GetPopularListResponseDto;
import com.imai.board_back.dto.response.search.GetRelationListResponseDto;


public interface SearchService {
        
    ResponseEntity<? super GetPopularListResponseDto> getPopularList();
    
    // 71 4:10 추가
    ResponseEntity<? super GetRelationListResponseDto> getRelationList(String searchWord);

    }
    

