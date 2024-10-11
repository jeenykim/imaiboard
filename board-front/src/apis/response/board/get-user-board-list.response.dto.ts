// 79 4:11 추가

import { BoardListItem } from "types/interface";
import ResponseDto from "../response.dto";

export default interface GetUserBoardListResponseDto extends ResponseDto {
    userBoardList: BoardListItem[];
}