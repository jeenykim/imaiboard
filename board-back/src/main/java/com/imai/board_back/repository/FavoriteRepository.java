package com.imai.board_back.repository;

import java.util.List;

import jakarta.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.imai.board_back.entity.FavoriteEntity;
import com.imai.board_back.entity.primaryKey.FavoritePk;
// import java.util.List;
import com.imai.board_back.repository.resultset.GetFavoriteListResultSet;

@Repository
public interface FavoriteRepository extends JpaRepository<FavoriteEntity, FavoritePk>{
    
    // 44추가 11:27
    FavoriteEntity findByBoardNumberAndUserEmail(Integer boardNumber, String userEmail);

    // 45추가
    @Query(
        value=
        "SELECT " +
        "   U.email AS email, " +
        "   U.nickname AS nickname, " +
        "   U.profile_image AS profileImage " +
        "FROM favorite AS F " +
        "INNER JOIN user AS U " +
        "ON F.user_email = U.email " +
        "WHERE F.board_number = ?1 ",
        nativeQuery=true
    )
    List<GetFavoriteListResultSet> getFavoriteList(Integer boardNumber);

    // 56추가 9:45
    @Transactional
    void deleteByBoardNumber(Integer boardNumber);
    
}
