import React, { useEffect } from 'react';
// import logo from './logo.svg';
import './App.css';
// import BoardItem from 'components/BoardItem';
// import { commentListMock, favoriteListMock, latestBoardListMock, top3BoardListMock } from 'mocks';
// import Top3Item from 'components/Top3Item';
// import CommentItem from 'components/CommentItem';
// import FavoriteItem from 'components/FavoriteItem';
// import InputBox from 'components/InputBox';
// import Footer from 'layouts/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from 'views/Main';
import Authentication from 'views/Authentication';
import UserP from 'views/User';
import Search from 'views/Search';
import BoardDetail from 'views/Board/Detail';
import BoardUpdate from 'views/Board/Update';
import BoardWrite from 'views/Board/Write';
import Container from 'layouts/Container';
import { AUTH_PATH, BOARD_DETAIL_PATH, BOARD_PATH, BOARD_UPDATE_PATH, BOARD_WRITE_PATH, MAIN_PATH, SEARCH_PATH, USER_PATH } from 'constant';
import { useCookies } from 'react-cookie';
import { useLoginUserStore } from 'stores';
import { User } from 'types/interface';
import { GetSignInUserResponseDto }from 'apis/response/user';
import { ResponseDto } from 'apis/response';
import { getSignInUserRequest } from 'apis';



//  component: Application 컴포넌트  //
function App() {

  //   state: 로그인 유저 전역상태 ///
  const { setLoginUser, resetLoginUser } = useLoginUserStore();

  //   state: cookie상태 ///
  const [cookies, setCookie] = useCookies();

//   function: get Sign In User Response 처리  함수   //
  const getSignInUserResponse = (responseBody: GetSignInUserResponseDto | ResponseDto | null) => {
    if (!responseBody) return;
    const { code } = responseBody;
    if  (code === 'AF' || code === 'NU' || code === 'DBE') {
      resetLoginUser();
      return;
    }
    const loginUser: User = { ...responseBody as GetSignInUserResponseDto };
    setLoginUser(loginUser);
  }
  //로그인하면  로그인 버튼이 마이페이지 로그아웃 버튼으로 바뀐다
  
  //   effect: accessToken cookie 값이 변경될때마다 실행할 함수   //

  useEffect(() => {
    if (!cookies.accessToken) {
      resetLoginUser();
      return;
    }
    getSignInUserRequest(cookies.accessToken).then(getSignInUserResponse);
  }, [cookies.accessToken]);

  
  //  render: Application 컴포넌트 렌더링  //
  // description: 메인 화면 : '/' -  Main //
  // description: 로그인 + 회원가입 화면 : '/auth' - Authentication  //
  // description: 검색 화면 : '/search/:searchWord' - Search  //
  // description: 유저 페이지  : '/user/:userEmail' - User  //
  // description: 게시물 상세보기  : '/board/detail/:boardNumber' - BoardDetail //
  // description: 게시물 작성하기  : '/board/write' - BoardWrite //
  // description: 게시물 수정하기  : '/board/update/:boardNumber' - BoardUpdate //

  return (
    <Router>
      <Routes>
        <Route element={<Container />}>

        {/* <Route path='/' element={<Main />} />
        <Route path='/auth' element={<Authentication />} />
        <Route path='/search' element={<Search />} />
        <Route path='/user' element={<User />} />
        <Route path='/board'>
          <Route path='write' element={<BoardWrite />} />
          <Route path='detail/:boardNumber' element={<BoardDetail />} />
          <Route path='update/:boardNumber' element={<BoardUpdate />} />
        </Route> */}

          <Route path={MAIN_PATH()} element={<Main />} />
          <Route path={AUTH_PATH()} element={<Authentication />} />
          <Route path={SEARCH_PATH(':searchWord')} element={<Search />} />
          <Route path={USER_PATH(':userEmail')} element={<UserP />} />
          <Route path={BOARD_PATH()}>
            <Route path={BOARD_WRITE_PATH()} element={<BoardWrite />} />
            <Route path={BOARD_DETAIL_PATH(':boardNumber')} element={<BoardDetail />} />
            <Route path={BOARD_UPDATE_PATH(':boardNumber')} element={<BoardUpdate />} />
          </Route>
            <Route path='*' element={<h1>404 Not Found</h1>} />
        
        </Route>
      </Routes>
    </Router>
  );
}

export default App;