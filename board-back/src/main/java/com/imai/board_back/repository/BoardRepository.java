package com.imai.board_back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.imai.board_back.entity.BoardEntity;
import com.imai.board_back.repository.resultset.GetBoardResultSet;



@Repository
public interface BoardRepository  extends JpaRepository<BoardEntity, Integer> {


    //44추가
    boolean existsByBoardNumber(Integer boardNumber);

    //43_1추가
    BoardEntity findByBoardNumber(Integer boardNumber);

    //43추가
    //sql쿼리문으로 직접 삽입
    //문자열뒤에 스페이스 한칸 주어야함
    //맨마지막에 ,찍고 nativeQuery=true
    //BoardEntity에는 writerNickname writerProfileImage가 없기에
    //GetBoardResultSet만들고 가져옴
    //조인작업 실무에서 연관매핑을 지양
    @Query(
        value = 
        "SELECT " +
        "   B.board_number AS boardNumber, " +
        "   B.title AS title, " +
        "   B.content AS content, " +
        "   B.write_datetime AS writeDatetime, " +
        "   B.writer_email AS writerEmail, " +
        "   U.nickname AS writerNickname, " +
        "   U.profile_image AS writerProfileImage " +
        "FROM board AS B " +
        "INNER JOIN user AS U " +
        "ON B.writer_email = U.email " +
        "WHERE board_number = ?1 ",
        nativeQuery=true
    )
    GetBoardResultSet getBoard(Integer boardNumber);
}
