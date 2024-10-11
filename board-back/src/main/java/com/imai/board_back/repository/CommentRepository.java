package com.imai.board_back.repository;

import java.util.List;

import jakarta.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.imai.board_back.entity.CommentEntity;
import com.imai.board_back.repository.resultset.GetCommentListResultSet;

@Repository
public interface CommentRepository extends JpaRepository<CommentEntity, Integer> {

    //47  13:00
    // join쿼리 작업이기에 직접 작성함
    @Query(
        value =
        "SELECT " +
        "   U.nickname AS nickname, " +
        "    U.profile_image AS profileImage, " +
        "    C.write_datetime AS writeDatetime, " +
        "    C.content AS content " +
        "FROM comment AS C " +
        "INNER JOIN user AS U " +
        "ON C.user_email = U.email " +
        "WHERE C.board_number = ?1 " +
        "ORDER BY writeDatetime DESC",
        nativeQuery=true
    )
    List<GetCommentListResultSet> getCommentList(Integer boardNumber);


    // 56추가 9:34
    @Transactional
    void deleteByBoardNumber(Integer boardNumber);

}