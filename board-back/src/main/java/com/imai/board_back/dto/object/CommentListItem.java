package com.imai.board_back.dto.object;

import java.util.ArrayList;
import java.util.List;

import com.imai.board_back.repository.resultset.GetCommentListResultSet;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CommentListItem {
    
    private String nickname;
    private String profileImage;
    private String writeDatetime;
    private String content;

//47추가 5:36
    public CommentListItem(GetCommentListResultSet resultSet) {
        this.nickname = resultSet.getNickname();
        this.profileImage = resultSet.getProfileImage();
        this.writeDatetime = resultSet.getWriteDatetime();
        this.content = resultSet.getContent();
    }

    public static List<CommentListItem> copyList(List<GetCommentListResultSet> resultSets) {
        List<CommentListItem> list = new ArrayList<>();
        for (GetCommentListResultSet resultSet: resultSets) {
            CommentListItem commentListItem = new CommentListItem(resultSet);
            list.add(commentListItem); // 리스트에 항목 추가
    }
    return list; // 리스트 반환
    }
}
