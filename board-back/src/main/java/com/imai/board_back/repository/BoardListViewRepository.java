package com.imai.board_back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.imai.board_back.entity.BoardListViewEntity;
import java.util.List;



@Repository
public interface BoardListViewRepository extends JpaRepository<BoardListViewEntity, Integer>{
    
    // 64 11:56추가
    List<BoardListViewEntity> findByOrderByWriteDatetimeDesc();

    // 65 6:54추가 원본 주간top3
    // List<BoardListViewEntity> findTop3ByWriteDatetimeGreaterThanOrderByFavoriteCountDescCommentCountDescViewCountDescWriteDatetimeDesc(String writeDatetime);

    // 특정 기간에 관계없이 전체 게시글 중에서 좋아요 수, 댓글 수, 조회 수, 작성 시간에 따라 상위 3개의 게시글을 가져오게 된다.
    // WriteDatetimeGreaterThan삭제
    List<BoardListViewEntity> findTop3ByOrderByFavoriteCountDescCommentCountDescViewCountDescWriteDatetimeDesc();

    //70 7:40 추가
    List<BoardListViewEntity> findByTitleContainsOrContentContainsOrderByWriteDatetimeDesc(String title, String content);


    //74 20:27 추가
    List<BoardListViewEntity> findByWriterEmailOrderByWriteDatetimeDesc(String writerEmail);
}
