// 76 0:40 추가

import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import './style.css';

import defaultProfileImage from 'assets/image/default-profile-image.png';
import { useNavigate, useParams } from 'react-router-dom';
import { BoardListItem } from 'types/interface';
// import { latestBoardListMock } from 'mocks';
import BoardItem from 'components/BoardItem';
import { BOARD_PATH, BOARD_WRITE_PATH, MAIN_PATH, USER_PATH } from 'constant';
import { useLoginUserStore } from 'stores';
import { fileUploadRequest, getUserBoardListRequest, getUserRequest, patchNicknameRequest, patchProfileImageRequest } from 'apis';
import { GetUserResponseDto, PatchNicknameResponseDto, PatchProfileImageResponseDto } from 'apis/response/user';
import { ResponseDto } from 'apis/response';
import { useCookies } from 'react-cookie';
import { PatchNicknameRequestDto, PatchProfileImageRequestDto } from 'apis/request/user';
import { usePagination } from 'hooks';
import { GetUserBoardListResponseDto } from 'apis/response/board';
import Pagination from 'components/Pagination';
import { useCallback } from 'react';


//  component:  유저 화면 컴포넌트  //
export default function User() {

  //   state: userEmail path variable상태   //
  const { userEmail } = useParams();

  // 78 29:56 추가
  //   state: 로그인 유저 상태   //
  const { loginUser } = useLoginUserStore();

  // 79 26:30 추가
  //   state: cookies 상태   //
  const [cookies, setCookie] = useCookies();


  // 78 4:50 아래에서 이위치로 올림
  // 77 9:58 true를 false로 바꿈
  //   state: 마이페이지 여부상태   //
  const [isMyPage, setMyPage] = useState<Boolean>(true);

  // 78 28:16 추가
  //function: 네비게이트 함수 //
  const navigate = useNavigate();


  //  component:  유저 화면 상단 컴포넌트  //
  const UserTop = () => {


    //   state: 이미지 파일 인풋 참조 상태   //
    const imageInputRef = useRef<HTMLInputElement | null>(null);


    //   state: 닉네임 변경 여부 상태   //
    const [isNicknameChange, setNicknameChange] = useState<Boolean>(false);

    //   state: 닉네임 상태   //
    const [nickname, setNickname] = useState<string>('');

    //   state: 닉네임 변경 여부 상태   //
    const [changeNickname, setChangeNickname] = useState<string>('');

    //   state: 프로필 이미지 상태   //
    const [profileImage, setProfileImage] = useState<string | null>(null);

    // 79 19:10 추가
    //   function: get user response 처리함수   //
    const getUserResponse = (responseBody: GetUserResponseDto | ResponseDto | null) => {
      if (!responseBody) return;
      const { code } = responseBody;
      if (code === 'NU') alert('존재하지 않는 유저입니다');
      if (code === 'DBE') alert('데이터베이스 오류입니다');
      if (code !== 'SU') {
        navigate(MAIN_PATH());
        return;
      }

      const { email, nickname, profileImage } = responseBody as GetUserResponseDto;
      setNickname(nickname);
      setProfileImage(profileImage);

      const isMyPage = email === loginUser?.email;
      setMyPage(isMyPage);
    };   


    // 79 24:50 프로필 수정 추가
    //   function: file Upload response 처리함수   //
    const fileUploadResponse = (profileImage: string | null) => {
      if (!profileImage) return;
      if (!cookies.accessToken) return;

      const requestBody: PatchProfileImageRequestDto = { profileImage };
      patchProfileImageRequest(requestBody, cookies.accessToken).then(patchProfileImageResponse);      
    };


    // 79 27:26 추가
    //   function: patch Profile Image response 처리함수   //
    const patchProfileImageResponse = (responseBody: PatchProfileImageResponseDto | ResponseDto | null) => {
      if (!responseBody) return;
      const { code } = responseBody;
      
      if (code === 'AF') alert('인증에 실패했습니다');
      if (code === 'NU') alert('존재하지 않는 유저입니다');
      if (code === 'DBE') alert('데이터베이스 오류입니다');
      if (code !== 'SU') return;

      if (!userEmail) return;
      getUserRequest(userEmail).then(getUserResponse);     
    };   

    // 79 34:20 추가
    // 79 38:30 set추가
    //   function: patch nick name response 처리함수   //
    const patchNicknameResponse = (responseBody: PatchNicknameResponseDto | ResponseDto | null) => {
      if (!responseBody) return;
      const { code } = responseBody;
      
      if (code === 'VF') alert('닉네임은 필수입니다');
      if (code === 'AF') alert('인증에 실패했습니다');
      if (code === 'DN') alert('중복되는 닉네임입니다');
      if (code === 'NU') alert('존재하지 않는 유저입니다');
      if (code === 'DBE') alert('데이터베이스 오류입니다');
      if (code !== 'SU') return;

      if (!userEmail) return;
      getUserRequest(userEmail).then(getUserResponse);    
      setNicknameChange(false);
    };  

    // 77 21:35 추가
    //   event handler: 프로필 박스 클릭 이벤트 처리   //
    const onProfileBoxClickHandler = () => {
      if (!isMyPage) return;
      if (!imageInputRef.current) return;
      imageInputRef.current.click();
    };
    
    // 77 14:29 추가
    // 79 32:15 추가수정
    //   event handler: 닉네임 수정버튼 클릭 이벤트 처리   //
    const onNicknameEditButtonClickHandler = () => {
      if (!isNicknameChange) {
        setChangeNickname(nickname);
        setNicknameChange(!isNicknameChange);
        return;
      }
      
      if (!cookies.accessToken) return;
      const requestBody: PatchNicknameRequestDto = {
          nickname: changeNickname
      };

      patchNicknameRequest(requestBody, cookies.accessToken).then(patchNicknameResponse);
    };

    // 77 23:37 추가
    // 79 24:24 fileUploadResponse 추가
    //   event handler: 프로필 이미지 변경 이벤트 처리   //
    const onProfileImageChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files || !event.target.files.length) return;

      const file = event.target.files[0];
      const data = new FormData();
      data.append('file', file);

      fileUploadRequest(data).then(fileUploadResponse);
    };


    // 77 26:17 추가
    //   event handler: 닉네임 변경 이벤트 처리   //
    const onNicknameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {

      const { value } = event.target;
      setChangeNickname(value);
    };


    // 79 18:44 삭제후 추가
    
    //   effect: userEmail path variable 변경시 실행할 함수   //
    useEffect(() => {      
      if (!userEmail) return;

      getUserRequest(userEmail).then(getUserResponse);

      // setNickname('imaikim');
      //77 10:33 주석 
      // setProfileImage('https://cdn.pixabay.com/photo/2024/03/13/04/49/ai-generated-8630058_640.jpg')

    // }, [userEmail]);
    }, []);

    //  render:  유저 화면 상단 컴포넌트 렌더링  //
    // if (!user) return(<></>);
    return(
      <div id='user-top-wrapper'>
        <div className='user-top-container'>
          {isMyPage ?
          <div className='user-top-my-profile-image-box' onClick={onProfileBoxClickHandler}>
            {/* 76 30:14 user삭제 */}
            {profileImage !== null ?
            <div className='user-top-profile-image' style={{ backgroundImage: `url(${profileImage})` }}></div> :
            <div className='icon-box-large'>
                <div className='icon image-box-white-icon'></div>
              </div>
            }

            {/* 77 26:00 onChange추가 */}
            <input ref={imageInputRef} type='file' accept='image/*' style={{ display: 'none' }} onChange={onProfileImageChangeHandler}/>
          </div> :
          <div className='user-top-profile-image-box' style={{ backgroundImage: `url(${profileImage ? profileImage : defaultProfileImage})` }}></div>
          }

          {/* 76 27:40 {user.nickname}수정 */}
          {/* 76 26:00 {isChangeNickname ? 수정 */}
          <div className='user-top-info-box'>
            <div className='user-top-info-nickname-box'>

            {/* 77 27:20 2로 바꾸고 onChange추가 */}                       
              {isMyPage ? 
              <>  
              {isNicknameChange ? 
              <input className= 'user-top-info-nickname-input' type='text' size={changeNickname.length + 2} value={changeNickname} onChange={onNicknameChangeHandler} /> :
              <div className='user-top-info-nickname'>{nickname}</div>
              }
              {/* 77 15:35 onClick 추가 */}
              <div className='icon-button' onClick={onNicknameEditButtonClickHandler}>

                <div className='icon edit-icon'></div>
              </div>
              </> :
              <div className='user-top-info-nickname'>{nickname}</div>
              }
              </div>

              {/* {userEmail}로 수정 */}
            <div className='user-top-info-email'>{userEmail}</div>
          </div>
        </div>
      </div>
    );
  };

  //  component:  유저 화면 하단 컴포넌트  //
  const UserBottom = () => {


    // 79 39:40 search index파일 23라인 페이지 네이션복붙 추가
    //  state: 페이지 네이션 관련 상태 //
    const {
      currentPage, setCurrentPage, currentSection, setCurrentSection, viewList, viewPageList, totalSection, setTotalList
    } = usePagination<BoardListItem>(5);
    
    // 78 추가 6:15 추가
    // 78 추가 27:05 0을 2로 수정
    //   state: 게시물 개수 상태   //
    const [count, setCount] = useState<number>(2);


    // 78 추가 25:04 
    // 79 40:05 주석처리
    //   state: 게시물 리스트 상태 (임시)  //
    // const [userBoardList, setUserBoardList] = useState<BoardListItem[]>([]);

    // 79 40:40 추가
    // 오류 떠서 원본 주석후  chat-gpt코드로 대치
    //   function: patch nick name response 처리함수   //
    // const getUserBoardListResponse = (responseBody: PatchNicknameResponseDto | ResponseDto | null) => {
    //   if (!responseBody) return;
    //   const { code } = responseBody;
      
    //   if (code === 'NU') {
    //     alert('존재하지 않는 유저입니다');
    //     navigate(MAIN_PATH());
    //     return;
    //   }
      
    //   if (code === 'DBE') alert('데이터베이스 오류입니다');
    //   if (code !== 'SU') return;

    //   const { userBoardList } = responseBody as GetUserBoardListResponseDto; 
    //   setTotalList(userBoardList);
    //   setCount(userBoardList.length);
    // };

    // 오류 떠서 원본 주석후  chat-gpt코드로 대치
    const getUserBoardListResponse = useCallback((responseBody: PatchNicknameResponseDto | ResponseDto | null) => {
      if (!responseBody) return;
      const { code } = responseBody;
      
      if (code === 'NU') {
        alert('존재하지 않는 유저입니다');
        navigate(MAIN_PATH());
        return;
      }
      
      if (code === 'DBE') alert('데이터베이스 오류입니다');
      if (code !== 'SU') return;

      const { userBoardList } = responseBody as GetUserBoardListResponseDto; 
      setTotalList(userBoardList);
      setCount(userBoardList.length);
    },
    []
  );


    // 78 추가 28:00 
    //   event handler: 사이드 카드 클릭 이벤트 처리  //
    const onSideCardClickHandler = () => {
      if (isMyPage) navigate(BOARD_PATH() + '/' + BOARD_WRITE_PATH());
      else if (loginUser) navigate(USER_PATH(loginUser.email));
    };


    // 79 40:05 원본 주석후 수정
    //   effect: userEmail path variable 변경시 실행할 함수   //
    // useEffect(() => {
    //   setUserBoardList(latestBoardListMock);
    // }, [userEmail]);

    useEffect(() => {
      if (!userEmail) return;
      getUserBoardListRequest(userEmail).then(getUserBoardListResponse);
    }, [userEmail]);

    
    
    // 78 추가 1:20
    // 78 추가 174라인 {userBoardList.map 26:40 
    // 78 추가 171라인 0을 count로 바꿈 27:15 
    // 78 추가 201라인 onClick 추가 31:08 
    // 79 수정 325라인 viewList 수정 44:10 
    // 79 44:20 356라인 Search\index.tsx 맨하단 Pagination복사 붙이기
    
    //  render:  유저 화면 하단 컴포넌트 렌더링  //
    return(
      <div id='user-bottom-wrapper'>
        <div className='user-bottom-container'>
          
          <div className='user-bottom-title'>{isMyPage ? '내게시물 ' : '게시물 '}<span className='emphasis'>{count}</span></div>
          <div className='user-bottom-contents-box'>
            {count === 0 ?
              <div className='user-bottom-contents-nothing'>{'게시물이 없습니다'}</div> :
              <div className='user-bottom-contents'>
                {/* {viewList.map(boardListItem => <BoardItem boardListItem={boardListItem} />)} */}

                {/* key오류 이걸로 바꿈 */}
                {viewList.map(boardListItem => 
                <BoardItem 
                  key={boardListItem.content} // 또는 boardListItem의 유니크한 속성
                  boardListItem={boardListItem} 
                />
                )}


              </div>                
            }
              <div className='user-bottom-side-box'>
                <div className='user-bottom-side-card' onClick={onSideCardClickHandler}>
                  <div className='user-bottom-side-container'>
                    {isMyPage ?
                    <>
                    <div className='icon-box'>
                      <div className='icon edit-icon'></div>
                    </div>
                    <div className='user-bottom-side-text'>{'글쓰기'}</div>
                    </> :
                    <>
                    <div className='user-bottom-side-text'>{'내 게시물로 가기'}</div>
                    <div className='icon-box'>
                      <div className='icon arrow-right-icon'></div>
                    </div>
                    </>                  
                    }
                  </div>
                </div>
              </div>
            </div>
          

          <div className='user-bottom-pagination-box'>                      
            {count !== 0 &&
              <Pagination
              currentPage={currentPage}
              currentSection={currentSection}
              setCurrentPage={setCurrentPage}
              setCurrentSection={setCurrentSection}
              viewPageList={viewPageList}
              totalSection={totalSection}      
            />}          
          </div>

        </div>
      </div>
    );
  };



  //  render:  유저 화면 컴포넌트 렌더링  //
  return (
    <>
    <UserTop />
    <UserBottom />
    </>
  );
}

