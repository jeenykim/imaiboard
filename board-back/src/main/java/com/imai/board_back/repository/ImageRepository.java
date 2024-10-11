package com.imai.board_back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.imai.board_back.entity.ImageEntity;
import java.util.List;

import jakarta.transaction.Transactional;


@Repository
public interface ImageRepository extends JpaRepository<ImageEntity, Integer> {
    
    //43추가
    List<ImageEntity> findByBoardNumber(int boardNumber);

    // 56추가 9:00
    @Transactional
    void deleteByBoardNumber(Integer boardNumber);

}
