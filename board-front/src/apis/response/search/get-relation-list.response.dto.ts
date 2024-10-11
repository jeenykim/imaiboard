// 73 4:00추가

import ResponseDto from "../response.dto";

export default interface GetRelationListResponseDto extends ResponseDto {
    relativeWordList: string[];
}