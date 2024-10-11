package com.imai.board_back.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.imai.board_back.entity.SearchLogEntity;
import com.imai.board_back.repository.resultset.GetPopularListResultSet;
import com.imai.board_back.repository.resultset.GetRelationListResultSet;

@Repository
public interface SearchLogRepository extends JpaRepository<SearchLogEntity, Integer>{
    
    // 66 9:30 추가
    // DML sql에서 인기검색어 복사 붙이고 수정

    @Query(
        value = 
        "SELECT search_word as searchword, count(search_word) AS count " +
        "FROM search_log " +
        "WHERE relation IS FALSE " +
        "GROUP BY search_word " +
        "ORDER BY count DESC " +
        "LIMIT 15 ",
        nativeQuery = true
    ) 
    List<GetPopularListResultSet> getPopularList();  
    
    // 71 5:48 추가
    // DML sql에서 220라인 검색리스트 복사 붙이고 수정
    // 71 12:19 AND relation_word IS NOT NULL 추가
    // / ?1 로 수정 첫번째 매개변수 넣겠다
    @Query(
        value = 
        "SELECT relation_word as searchWord, count(relation_word) AS count " +
        "FROM search_log " +
        "WHERE search_word = ?1 " +
        "AND relation_word IS NOT NULL " +
        "GROUP BY relation_word " +
        "ORDER BY count DESC " +
        "LIMIT 15; ",
        nativeQuery = true
    )
    List<GetRelationListResultSet> getRelationList(String searchWord);  
    
}
