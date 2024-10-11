import { ResponseCode } from 'types/enum';
// tsconfig.json파일의 target 밑으로  "baseUrl": "./src", 추가해줌
export default interface ResponseDto {

    code : ResponseCode;
    message : string;    
}