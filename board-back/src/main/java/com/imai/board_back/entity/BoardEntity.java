package com.imai.board_back.entity;

import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import com.imai.board_back.dto.request.board.PatchBoardRequestDto;
import com.imai.board_back.dto.request.board.PostBoardRequestDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="board")
@Table(name="board")

public class BoardEntity {

    @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
    private int boardNumber;
    private String title;
    private String content;
    private String writeDatetime;
    private int favoriteCount;
    private int commentCount;
    private int viewCount;
    private String writerEmail;
    

    // 38 15:00추가
    public BoardEntity(PostBoardRequestDto dto, String email){

        Date now = Date.from(Instant.now());
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String writeDatetime = simpleDateFormat.format(now);
        
        this.title = dto.getTitle();
        this.content = dto.getContent();
        this.writeDatetime = writeDatetime;
        this.favoriteCount = 0;
        this.viewCount = 0;
        this.writerEmail = email;
    }

    //43추가
    public void increaseViewCount() {
        this.viewCount++;
    }

    //44추가 
    public void increaseFavoriteCount() {
        this.favoriteCount++;
    }

    //46추가 15:05
    public void increaseCommentCount() {
        this.commentCount++;
    }

    //44추가14:24
    public void decreaseFavoriteCount() {
        this.favoriteCount--;
    }

    //61 추가 13:37
    public void patchBoard(PatchBoardRequestDto dto) {
        this.title = dto.getTitle();
        this.content = dto.getContent();
    }

}
