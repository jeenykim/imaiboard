// 52 4:35추가
//D:\springreact79-1\board-back\src\main\java\com\imai\board_back\dto\response\board\GetBoardResponseDto.java에서 복붙

export default interface board {

    boardNumber: number;
    title: string;
    content: string;
    boardImageList: string[];
    writeDateTime: string;
    writerEmail: string;
    writerNickName: string;
    writerProfileImage: string | null;

}