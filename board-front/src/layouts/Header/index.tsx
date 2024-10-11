import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import './style.css';
import { AUTH_PATH, BOARD_DETAIL_PATH, BOARD_PATH, BOARD_UPDATE_PATH, BOARD_WRITE_PATH, MAIN_PATH, SEARCH_PATH, USER_PATH } from 'constant';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useBoardStore, useLoginUserStore } from 'stores';
import { fileUploadRequest, patchBoardRequest, postBoardRequest } from 'apis';
import { PatchBoardRequestDto, PostBoardRequestDto } from 'apis/request/board';
import { PatchBoardResponseDto, PostBoardResponseDto } from 'apis/response/board';
import { ResponseDto } from 'apis/response';

// Constants
// const MAIN_PATH = () => '/';

//모달 추가
//  component: 업로드 성공 모달 컴포넌트 //
const UploadSuccessModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        <p>업로드가 성공하였습니다!</p>
        <button onClick={onClose}>창 닫기</button>
      </div>
    </div>
  );
};

//  component: 헤더 레이아웃  //
export default function Header() {

  //20_2
  // 25:46추가
  //  state: 로그인 유저 상태  //
  const { loginUser, setLoginUser, resetLoginUser } = useLoginUserStore();


  //21
  //  state: path 상태  //
  const { pathname } = useLocation();


  //  state: cookie 상태  //
  const [cookies, setCookie] = useCookies();

  //  state: 로그인 상태  //
  const [isLogin, setLogin] = useState<boolean>(false);

  // 로그아웃 상태
  // const [isLogin, setLogin] = useState<boolean>(true);
  //로그인 상태 마이페이지로 바뀜

  //  state: 인증 페이지 상태  //
  const [isAuthPage, setAuthPage] = useState<boolean>(false);
  //  state: 메인 페이지 상태  //
  const [isMainPage, setMainPage] = useState<boolean>(false);
  //  state: 검색 페이지 상태  //
  const [isSearchPage, setSearchPage] = useState<boolean>(false);
  //  state: 게시물 상세 페이지 상태  //
  const [isBoardDetailPage, setBoardDetailPage] = useState<boolean>(false);
  //  state: 게시물 작성 페이지 상태  //
  const [isBoardWritePage, setBoardWritePage] = useState<boolean>(false);
  //  state: 게시물 작성 페이지 상태  //
  const [isBoardUpdatePage, setBoardUpdatePage] = useState<boolean>(false);
  //  state: 유저 페이지 상태  //
  const [isUserPage, setUserPage] = useState<boolean>(false);



  //21
  // 37:05에서 밑으로 이동
  // 삭제 안하고 주석처리함
  // const isAuthPage = pathname.startsWith(AUTH_PATH());
  // const isMainPage = pathname.startsWith(MAIN_PATH());
  // const isSearchPage = pathname.startsWith(SEARCH_PATH(''));
  // const isBoardDetailPage = pathname.startsWith(BOARD_DETAIL_PATH(''));
  // const isBoardWritePage = pathname.startsWith(BOARD_WRITE_PATH());
  // const isBoardUpdatePage = pathname.startsWith(BOARD_UPDATE_PATH(''));
  // const isUserPage = pathname.startsWith(USER_PATH(''));


   //  function: 네비게이트 함수  //
  const navigate = useNavigate();



  //  event handler: 로고클릭 이벤트 처리 함수  //
  // header-left-box에 클릭연동
  const onLogoClickHandler = () => {
    navigate(MAIN_PATH());
  }

  //  component: 검색버튼 컴포넌트    //
  const SearchButton = () => {

    //  state: 검색어 버튼요소 참조 상태  //
    const searchButtonRef = useRef<HTMLDivElement | null>(null);

    //  state: 검색버튼 상태  //
    const [status, setStatus] = useState(false);

    //  state: 검색어 상태  //
    const [word, setWord] = useState<string>('');

    //  state: 검색어 path variable 상태  //
    // 검색입력창 변경안됨 불편연동
    // const {searchWord} = useParams();


    //  event handler: 검색어 클릭 이벤트 처리 함수   //
    const onSearchWordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setWord(value);
    };

    //  event handler: 검색어 키보드엔터키 이벤트 처리 함수  //
    const onSearchWordKeyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== 'Enter') return;
      if (!searchButtonRef.current) return;
      searchButtonRef.current.click();
    };
    
    //  event handler: 검색버튼 클릭 이벤트 처리  함수 //
    const onSearchButtonClickHandler = () => {
      if(!status) {
        setStatus(!status);
        return;
      }
      navigate(SEARCH_PATH(word));
  };

    //effect: 검색어 path variable 변경될때마다 실행될 함수  //
    //기존 검색창 입력문구 유지
    //입력창 변경안됨 불편

    // useEffect(() => {
    //   if (searchWord) {
    //     setWord(searchWord);
    //     setStatus(true);
    //   }
    // }, [searchWord]);

    
    
    
    if (!status) {
       //  render: 검색버튼 컴포넌트 렌더링 (클릭false상태)  //
      return (
        <div className='icon-button' onClick={onSearchButtonClickHandler}>
          <div className='icon search-light-icon'></div>
        </div>
      );
    }

     //  render: 검색버튼 컴포넌트 렌더링 (클릭true상태) //
    return (
      <div className='header-search-input-box'>
        <input className='header-search-input' 
        type='text' 
        placeholder='검색어를 입력해주세요'  
        value={word} 
        onChange={onSearchWordChangeHandler} 
        onKeyDown={onSearchWordKeyDownHandler} />

        <div className='icon-button' 
        ref={searchButtonRef}  
        onClick={onSearchButtonClickHandler}>
          <div className='icon search-light-icon'></div>
        </div>
      </div>
    );
  };

  //20
  //  component: 로그인 또는 마이페이지 버튼 컴포넌트  //
  const MyPageButton = () => {

  
  //  state: userEmail path variable 상태  //
  const { userEmail } = useParams();

    //  event handler: 마이페이지 버튼 클릭 이벤트 처리  함수 //
    const onMyPageButtonClickHandler = () => {
      if (!loginUser) return;
      const { email } = loginUser;
      navigate(USER_PATH(email));
    };

    //  event handler: 로그아웃 버튼 클릭 이벤트 처리  함수 //
    const onSignOutButtonClickHandler = () => {
      resetLoginUser();
      setCookie('accessToken', '', { path: MAIN_PATH(), expires: new Date() });
      navigate(MAIN_PATH());
    };

    //  event handler: 로그인 버튼 클릭 이벤트 처리  함수 //
    const onSignInButtonClickHandler = () => {
      navigate(AUTH_PATH());
    };


    //  render: 로그아웃 버튼 컴포넌트 렌더링  // 
    if (isLogin && userEmail === loginUser?.email)
    return <div className='white-button' onClick={onSignOutButtonClickHandler}>{'로그아웃'}</div>;


    //  render: 마이페이지 버튼 컴포넌트 렌더링  //  
    if (isLogin)
    return <div className='white-button' onClick={onMyPageButtonClickHandler}>{'마이페이지'}</div>;


  //  26에서 onSignInButtonClickHandler확인후 추가
    //  render: 로그인 버튼 컴포넌트 렌더링  //  
    return <div className='black-button' onClick={onSignInButtonClickHandler}>{'로그인'}</div>;
  
  };

  // 21추가
  // https://www.youtube.com/watch?v=vSXVb8s4HY0&list=PLbq5jHjpmq7q-Td2jOXtpf7SD5c53RqXh&index=22


  //  state: 업로드 성공 상태  //
  const [isUploadSuccess, setUploadSuccess] = useState<boolean>(false);

  //  component: 업로드버튼 컴포넌트    //
  const UploadButton = () => {

    // 63 10:16 추가

    //  state: 게시물 상태  //
    const { boardNumber }= useParams();

    //  state: 게시물 상태  //
    const { title, content, boardImageFileList, resetBoard }= useBoardStore();

    // const accessToken = cookies.accessToken;


    //42추가 19:20
    //56 업로드 연동 확인안돼서 수정
    // 모달 표시 추가
    // function: post board response 처리 함수  //
    const postBoardResponse = (responseBody: PostBoardResponseDto | ResponseDto | null) => {
      if (!responseBody) return;

      const { code } = responseBody;
      if ( code === 'DBE') alert('데이터베이스 오류입니다');
      if ( code === 'AF' || code === 'NU') navigate(AUTH_PATH());
      if ( code === 'VF') alert('제목과 내용은 모두 필수입니다');
      //여기 틀림
      // if ( code === 'SU') return;
      // 원래코드 연동안됨 챗봇 코드 확인 유튜브42추가 24:50
      if ( code === 'SU') {  
      resetBoard();
      setUploadSuccess(true); // 업로드 성공 시 모달 표시
      if (!loginUser) return;
      const { email } = loginUser;
      navigate(USER_PATH(email));
      }
    }


    // 모달 표시 추가 return;은 주석
    // 63 11:20 추가
    // function: patch board response 처리 함수  //
    const patchBoardResponse = (responseBody: PatchBoardResponseDto | ResponseDto | null) => {
      if (!responseBody) return;

      const { code } = responseBody;
      if ( code === 'DBE') alert('데이터베이스 오류입니다');
      if ( code === 'AF' || code === 'NU' || code === 'NB' || code === 'NP' ) navigate(AUTH_PATH());
      if ( code === 'VF') alert('제목과 내용은 모두 필수입니다');
      if ( code === 'SU') {
        setUploadSuccess(true); // 업로드 성공 시 모달 표시
        // return;
      
      if (!boardNumber) return;
      navigate(BOARD_PATH() + '/' + BOARD_DETAIL_PATH(boardNumber));
      }
    }


    // 기존 주석
    // 42안의 내용 추가 7:47
    // 42안의 내용 추가 14:41
    //  event handler: 업로드 버튼 클릭 이벤트 처리  함수 //
    const onUploadButtonClickHandler = async () => {
      const accessToken = cookies.accessToken;
      if (!accessToken) return;

      const boardImageList: string[] = [];

      for (const file of boardImageFileList) {
        const data = new FormData();
        data.append('file', file);

        const url = await fileUploadRequest(data);
        if (url) boardImageList.push(url);
      }


    

      // 63 7:00 추가
      const isWriterPage = pathname === BOARD_PATH() + '/' + BOARD_WRITE_PATH();
      if (isWriterPage) {
        const requestBody: PostBoardRequestDto = {
          title, content, boardImageList
        }
        postBoardRequest(requestBody, accessToken).then(postBoardResponse);
      } else {
        if (!boardNumber) return;

        const requestBody: PatchBoardRequestDto = {
          title, content, boardImageList
        }
        patchBoardRequest(boardNumber, requestBody, accessToken).then(patchBoardResponse);
      }
    }
      


    //  render: 업로드버튼 컴포넌트 렌더링  //  
    if (title && content)
    return <div className='black-button' onClick={onUploadButtonClickHandler}>{'업로드'}</div>;

    //  render: 업로드 불가버튼 컴포넌트 렌더링  //  
    return <div className='disable-button'>{'업로드'}</div>;
  };

//  effect: path가 변경될때 마다 실행될 함수  // 
// BOARD_PATH: constant>index에서 import

  useEffect(() => {
    const isAuthPage = pathname.startsWith(AUTH_PATH());
    setAuthPage(isAuthPage);

    const isMainPage = pathname === MAIN_PATH();
    setMainPage(isMainPage);

    const isSearchPage = pathname.startsWith(SEARCH_PATH(''));
    setSearchPage(isSearchPage);

    const isBoardDetailPage = pathname.startsWith(BOARD_PATH() + '/' + BOARD_DETAIL_PATH(''));
    setBoardDetailPage(isBoardDetailPage);

    const isBoardWritePage = pathname.startsWith(BOARD_PATH() + '/' + BOARD_WRITE_PATH());
    setBoardWritePage(isBoardWritePage);

    const isBoardUpdatePage = pathname.startsWith(BOARD_PATH() + '/' + BOARD_UPDATE_PATH(''));
    setBoardUpdatePage(isBoardUpdatePage);

    const isUserPage = pathname.startsWith(USER_PATH(''));
    setUserPage(isUserPage);

    // 콘솔오류확인코드
    // console.log(BOARD_PATH() + '/' + BOARD_WRITE_PATH());
  }, [pathname]);


  //  effect: login user가 변경될때 마다 실행될 함수  // 
  // 36추가
  useEffect(() => {
    setLogin(loginUser !== null);  
  }, [loginUser])
  

  //  render: 헤더 레이아웃 렌더링  //  
  return (
    <div id='header'>
      <div className='header-container'>
        <div className='header-left-box' onClick={onLogoClickHandler}>
          <div className='icon-box'>
            <div className='icon logo-dark-icon'></div>
          </div>
          <div className='header-logo'>{'Imaikim'}</div>
        </div>
        <div className='header-right-box'>
          {(isAuthPage || isMainPage || isSearchPage || isBoardDetailPage) && <SearchButton />}
          {(isMainPage || isSearchPage || isBoardDetailPage || isUserPage) &&   <MyPageButton />}
          {(isBoardWritePage || isBoardUpdatePage) && <UploadButton />}
        </div>
      </div>
      

      {/* 모달 추가 */}
      {/* 업로드 성공 모달 */}
      {isUploadSuccess && <UploadSuccessModal onClose={() => setUploadSuccess(false)} />}
    </div>
  );
}