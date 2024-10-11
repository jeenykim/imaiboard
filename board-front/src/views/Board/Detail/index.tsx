import React, { ChangeEvent, EventHandler, useEffect, useRef, useState } from 'react';
import './style.css';
import FavoriteItem from 'components/FavoriteItem';
import { Board, CommentListItem, FavoriteListItem } from 'types/interface';
// import { boardMock, commentListMock, favoriteListMock } from 'mocks';
import CommentItem from 'components/CommentItem';
import Pagination from 'components/Pagination';
import defaultProfileImage from 'assets/image/default-profile-image.png';
import { useLoginUserStore } from 'stores';
import { useNavigate, useParams } from 'react-router-dom';
import { BOARD_PATH, BOARD_UPDATE_PATH, MAIN_PATH, USER_PATH } from 'constant';
import { deleteBoardRequest, getBoardRequest, getCommentListRequest, getFavoriteListRequest, increaseViewCountRequest, postCommentRequest, putFavoriteRequest } from 'apis';
import GetBoardResponseDto from 'apis/response/board/get-board.response.dto';
import { ResponseDto } from 'apis/response';
import { DeleteBoardResponseDto, GetCommentListResponseDto, GetFavoriteListResponseDto, IncreaseViewCountResponseDto, PostCommentResponseDto, PutFavoriteResponseDto } from 'apis/response/board';

// 54 npm i dayjs인스톨후 4:12추가
import dayjs from 'dayjs';
import { useCookies } from 'react-cookie';
import { PostCommentRequestDto } from 'apis/request/board';
import { usePagination } from 'hooks';


//  component: 게시물 상세화면 컴포넌트  //
export default function BoardDetail() {

      //52추가 1:52
  //   state: 게시물 번호 path variable 상태   //
  const { boardNumber } = useParams();

  //   state: 로그인 유저 상태   //
  const { loginUser } = useLoginUserStore();

  //54추가 7:00
  //   state: 쿠키 상태   //
  const [ cookies, setCookies] = useCookies();


  //   function: 네비게이트 함수   //
  const navigate = useNavigate();

  // 53 31:29 추가
  //   function: increase View Count Response 함수   //
  const increaseViewCountResponse = (responseBody: IncreaseViewCountResponseDto | ResponseDto | null) => {
    if (!responseBody) return;
    const { code } = responseBody;

    if (code === 'NB') alert ('존재하지 않는 게시물입니다');
    if (code === 'DBE') alert ('데이터베이스 오류입니다');
  }

  // 48추가 5:58
  //  component: 게시물 상세 상단 컴포넌트  //
  const BoardDetailTop = () => {

    //53추가 36:19 글쓴이가 맞는지 확인후 맞으면 수정삭제버튼 보임
    //   state: 작성자 여부 상태   //
    const [isWriter, setWriter] = useState<boolean>(false);


    //52추가 4:07
    //52 7:03 추가
    //   state: more버튼 상태   //
    const [board, setBoard] = useState<Board | null>(null);

    //50추가 20:00
    //   state: more버튼 상태   //
    const [showMore, setShowMore] = useState<boolean>(false);

    //54추가 4:45 일단 생략
    // //   function :  작성일  포맷 변경  함수   //
    // const getWriteDatetimeFormat = () => {
    //   if (!board) return '';
    //   const date = dayjs(board.writeDateTime);
    //   return date.format('YYY. MM. DD.');
    // }


    //53추가 10:20
    //62 8:05 복사
    //   function :  get Board Response 처리함수   //
    const getBoardResponse = (responseBody: GetBoardResponseDto | ResponseDto | null) => {
      if (!responseBody) return;
      const { code } = responseBody;

      if (code === 'NB') alert ('존재하지 않는 게시물입니다');
      if (code === 'DBE') alert ('데이터베이스 오류입니다');
      if (code !== 'SU') {
        navigate(MAIN_PATH());
        return;
      }

      const board: Board = { ...responseBody as GetBoardResponseDto };
      // console.log(board.writeDateTime); // 로그를 통해 확인
      setBoard(board);

      // console.log(board.writeDateTime); // 로그를 통해 확인

      
      //53 추가 글쓴이 인지 확인후 수정 삭제 버튼 보이기
      if (!loginUser) {
        setWriter(false);
        return;
      }

      const isWriter = loginUser.email === board.writerEmail;
      setWriter(isWriter);
    }

    //55추가 29:00
    //   function :  delete Board Response 처리함수   //
    const deleteBoardResponse = (responseBody: DeleteBoardResponseDto | ResponseDto | null) => {
      if (!responseBody) return;
      const { code } = responseBody;

      if (code === 'VF') alert ('잘못된 접근입니다');
      if (code === 'NU') alert ('존재하지 않는 유저입니다');
      if (code === 'NB') alert ('존재하지 않는 게시물입니다');
      if (code === 'AF') alert ('인증에 실패했습니다');
      if (code === 'NP') alert ('권한이 없습니다');
      if (code === 'DBE') alert ('데이터베이스 오류입니다');
      if (code !== 'SU') return;
      
      navigate(MAIN_PATH());
    }

    
    
    
    //52추가 3:07
    //52추가 7:00
    //   event Handler: 닉네임 클릭 이벤트 처리 //
    const onNicknameClickHandler = () => {
      if (!board) return;
      navigate(USER_PATH(board.writerEmail));
    }

    //   event Handler: more버튼 클릭 이벤트 처리 //
    const onMoreButtonClickHandler = () => {
      setShowMore(!showMore);
    }

    
    //52추가 17:32
    //52 연동 확인 주석 20:04
    //   event Handler: 수정버튼 클릭 이벤트 처리 //
    const onUpdateButtonClickHandler = () => {
      // 원래 이코드인데 연동확인오류나서주석처리후
      if (!board || !loginUser) return;
      if (loginUser.email !== board.writerEmail) return;

      // 이 코드로 수정버튼누르면 http://localhost:3000/board/update/1로 연동 먼저 확인후 상단 주석 푼다
      // if (!board) return;
      // if (loginUser.email !== board.writerEmail) return;
      navigate(BOARD_PATH() + '/' + BOARD_UPDATE_PATH(board.boardNumber));
    }


        //52 연동 확인 주석 20:04
        //55추가 28:00 수정
    //   event Handler: 삭제버튼 클릭 이벤트 처리 //
    const onDeleteButtonClickHandler = () => {
      // 원래 이코드인데 연동확인오류나서주석처리후
      if (!boardNumber || !board || !loginUser || !cookies.accessToken) return;
      if (loginUser.email !== board.writerEmail) return;

      deleteBoardRequest(boardNumber, cookies.accessToken).then(deleteBoardResponse);
    }

    


    //   effect: 게시물 번호 path variable바뀔때 마다 게시물 불러오기   //
    //52추가 13:50
    //53수정 9:30
    useEffect(() => {
      if (!boardNumber) {
        navigate(MAIN_PATH());
        return;
      }
      getBoardRequest(boardNumber).then(getBoardResponse);
    }, [boardNumber]);



    // 52추가 8:10 각각 {} 수정
    // 52추가 수정 8:23  201라인 추가수정
    // 52추가 수정 8:31  204라인 추가수정
    // 52추가 수정 8:50  205라인 추가수정
    // 52추가 수정 15:00  199라인 {board.title} 추가수정
    // 52추가 수정 15:17  210라인 {board.writerNickName} 추가수정
    // 52추가 수정 15:20  216라인 {board.writeDateTime} 추가수정
    // 52추가 수정 15:31  246라인 {board.content} 추가수정
    //  render: 게시물 상세상단 컴포넌트 렌더링  //

    if (!board) return <></>

    return (
      <div id = 'board-detail-top'>
        <div className = 'board-detail-top-header'>

          <div className = 'board-detail-title'>{board.title}</div>
          <div className = 'board-detail-top-sub-box'>

            <div className = 'board-detail-write-info-box'>
              <div className = 'board-detail-writer-profile-image-box'>

    
                <div className = 'board-detail-writer-profile-image' style={{ backgroundImage: `url(${board.writerProfileImage ? board.writerProfileImage : defaultProfileImage})` }}></div>

              </div>

              <div className = 'board-detail-writer-nickname' onClick={onNicknameClickHandler}>{board.writerNickName} </div>
              <div className = 'board-detail-writer-info-divider'>{'\|'}</div>

              {/* 54수정 6:10 getWriteDatetimeFormat()*/}
              {/* 연동 안됨 */}
              <div className = 'board-detail-write-date'>{board.writeDateTime}</div>
            </div>

            {/* 세개점 버튼 */}
            {/* 50추가 */}
            {/* 53추가 38:44 글쓴이가 맞는지 확인후 수정삭제버튼 보임*/}
            {isWriter &&
            <div className = 'icon-button' onClick={onMoreButtonClickHandler}>

            {/* D:\springreact\board-front\src\App.css에 이미지 점세개 경로추가 */}
              <div className = 'icon more-icon'></div>
            </div>
            }

            {/* 50추가 */}
            {/* 52추가 19:30 onClick={onUpdateButtonClickHandler} */}
            {/* 52추가 21:10 onClick={onDeleteButtonClickHandler}*/}
            {showMore &&
            <div className = 'board-detail-more-box'>
              <div className = 'board-detail-update-button' onClick={onUpdateButtonClickHandler}>{'수 정'}</div>
              <div className = 'divider'></div>
              <div className = 'board-detail-delete-button' onClick={onDeleteButtonClickHandler}>{'삭 제'}</div>
            </div>}

          </div>
        </div>

        <div className = 'divider'></div>
        <div className = 'board-detail-top-main'>
          <div className = 'board-detail-main-text'>{board.content}</div>
          {/* 52 img 수정 16:00 */}
          {/* {board.boardImageList.map(image => <img className='board-detail-main-image' src={image} /> )} */}

          {/* key오류 이걸로 바꿈 */}
          {board.boardImageList.map((image, index) => 
            <img 
              key={index} 
              className='board-detail-main-image' 
              src={image} 
              alt={`Board image ${index}`} 
            />
          )}


          {/* 50 img 수정 url추가 */}
          {/* <img className = 'board-detail-main-image' src='https://cdn.pixabay.com/photo/2024/06/01/09/02/young-man-8801865_1280.jpg' /> */}
        </div>
        <div className = 'divider'></div>
      </div>

    );
  };



  //  component: 게시물 상세 하단 컴포넌트  //
  const BoardDetailBottom = () => {


    //52추가 36:30
    //   state: 댓글 textarea 참조 상태   //
    const commentRef = useRef<HTMLTextAreaElement | null>(null);


    //60추가 2:43 3:35 무조건 한줄로 받아야함
    //   state: 페이지 네이션 관련 상태   //
    const {
      currentPage, setCurrentPage, currentSection, setCurrentSection, viewList, viewPageList, totalSection, setTotalList
     } = usePagination<CommentListItem>(3);

     // 49추가 10:40
     //   state: 좋아요 리스트 상태   //
    const [favoriteList, setFavoriteList] = useState<FavoriteListItem[]>([]);
    
    // 빈배열 넣어줌
    //49추가 17:11
    //60 2:35 삭제
    //   state: 댓글 리스트 상태 (임시)  //
    // const [commentList, setCommentList] = useState<CommentListItem[]>([]);

    //52추가 25:00
    //   state: 좋아요 상태 //
    const [isFavorite, setFavorite] = useState<boolean>(false);


    //52추가 28:26
    //   state: 좋아요 상자 보기 상태 //
    const [showFavorite, setShowFavorite] = useState<boolean>(false);


    //52추가 28:41
    //   state: 댓글 상자 보기 상태 //
    const [showComment, setShowComment] = useState<boolean>(false);

    //60추가 6:25
    //   state: 전체 댓글 개수 상태 //
    const [totalCommentCount, setTotalCommentCount] = useState<number>(0);


    //52추가 33:15
    //   state: 댓글 상태 //
    const [comment, setComment] = useState<string>('');

 
    
   //54추가 12:45
    //   function : get Favorite List Response 처리 함수//
    const getFavoriteListResponse = (responseBody: GetFavoriteListResponseDto | ResponseDto | null) => {
      if (!responseBody) return;
      const { code } = responseBody;

      if (code === 'NB') alert ('존재하지 않는 게시물입니다');
      if (code === 'DBE') alert ('데이터베이스 오류입니다');
      if (code !== 'SU') return;

      const { favoriteList } = responseBody as GetFavoriteListResponseDto;
      setFavoriteList(favoriteList);

      //54추가 15:53
      if (!loginUser) {
        setFavorite(false);
        return;
      }

      const isFavorite = favoriteList.findIndex(favorite => favorite.email === loginUser.email) !== -1;
      setFavorite(isFavorite);
    }

    //54추가 24:22
    // function : get Comment List Response 처리 함수   //
    const getCommentListResponse = (responseBody : GetCommentListResponseDto | ResponseDto | null) => {
      if (!responseBody) return;
      const { code } = responseBody;
      if (code === 'NB') alert ('존재하지 않는 게시물입니다');
      if (code === 'DBE') alert ('데이터베이스 오류입니다');
      if (code !== 'SU') return;

      const { commentList } = responseBody as GetCommentListResponseDto;

      // 60 5:15 setTotalList로수정
      setTotalList(commentList);

      // 60 7:00 전체 댓글 개수 추가
      setTotalCommentCount(commentList.length);
    }


    //55추가 24:22
    // function : put Favorite Response 처리 함수   //
    const putFavoriteResponse = (responseBody : PutFavoriteResponseDto | ResponseDto | null) => {
      if (!responseBody) return;
      const { code } = responseBody;
      if (code === 'VF') alert ('잘못된 접근입니다');
      if (code === 'NU') alert ('존재하지 않는 유저입니다');
      if (code === 'NB') alert ('존재하지 않는 게시물입니다');
      if (code === 'AF') alert ('인증에 실패했습니다');
      if (code === 'DBE') alert ('데이터베이스 오류입니다');
      if (code !== 'SU') return;

      if (!boardNumber) return;
      getFavoriteListRequest(boardNumber).then(getFavoriteListResponse)
    }

    //55추가  댓글 달기 20:59
    // function : post Comment Response 처리 함수   //
    const postCommentResponse = (responseBody : PostCommentResponseDto | ResponseDto | null) => {
      if (!responseBody) return;
      const { code } = responseBody;
      if (code === 'VF') alert ('잘못된 접근입니다');
      if (code === 'NU') alert ('존재하지 않는 유저입니다');
      if (code === 'NB') alert ('존재하지 않는 게시물입니다');
      if (code === 'AF') alert ('인증에 실패했습니다');
      if (code === 'DBE') alert ('데이터베이스 오류입니다');
      if (code !== 'SU') return;

      setComment('');
      if (!boardNumber) return;
      getCommentListRequest(boardNumber).then(getCommentListResponse)
    }



   //52추가 25:40
   //55수정 6:40 7:38
    //   event Handler: 좋아요 클릭 이벤트 처리 //
    const onFavoriteClickHandler = () => {
      if(!boardNumber || !loginUser || !cookies.accessToken) return;
      putFavoriteRequest(boardNumber, cookies.accessToken).then(putFavoriteResponse);
    }


    //52추가 29:00
    //   event Handler: 좋아요 상자보기 클릭 이벤트 처리 //
    const onShowFavoriteClickHandler = () => {
      setShowFavorite(!showFavorite);
    }


    //52추가 29:00
    //   event Handler: 댓글 상자보기 클릭 이벤트 처리 //
    const onShowCommentClickHandler = () => {
      setShowComment(!showComment);
    }


    //52추가 39:10 39:50
    //54 수정 19:32
    //   event Handler: 댓글 작성버튼 클릭 이벤트 처리 //
    const onCommentSubmitButtonClickHandler = () => {
      if (!comment || !boardNumber || !loginUser || !cookies.accessToken) return;
      // 내용없으면 버튼클릭안됨
      const requestBody: PostCommentRequestDto = { content: comment };
      postCommentRequest(boardNumber, requestBody, cookies.accessToken).then(postCommentResponse);
      // alert('작성완료');
      //입력하고 댓글달기 하면 작성완료 경고창 나옴
    }


    //52추가 33:38
    //   event Handler: 댓글 변경 이벤트 처리 //
    const onCommentChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
      const { value } = event.target;
      setComment(value);

      //52추가 댓글 길이만큼 높이 늘어남 37:50
      if(!commentRef.current) return;
      commentRef.current.style.height = 'auto';
      commentRef.current.style.height = `${commentRef.current.scrollHeight}px`;
    }


  
    //52 추가 22:57
    //   effect: 게시물번호 path variable 바뀔때마다 좋아요 및 댓글 리스트 불러오기   //
    // 49추가 10:07
    useEffect(() => {
      // 54추가 11:50
      if (!boardNumber) return;
      getFavoriteListRequest(boardNumber).then(getFavoriteListResponse);
      // setFavoriteList(favoriteListMock);
      //49추가 17:25
      // console.log('Original commentListMock:', commentListMock);
      //52추가 boardNumber
      // setCommentList(commentListMock);
      // 54추가 24:05
      getCommentListRequest(boardNumber).then(getCommentListResponse);

    }, [boardNumber]);


    // 49추가 2:48
    //  render: 게시물 상세하단 컴포넌트 렌더링  //
    return (
      <div id = 'board-detail-bottom'>
        <div className = 'board-detail-bottom-button-box'>

        {/* board-detail-bottom-button-group시작 복사 하단 그대로 붙이기 */}
        {/* 52수정 추가 onClick={onFavoriteClickHandler}*/}
        {/* 하트 좋아요버튼 클릭하면 색바뀜 */}
          <div className = 'board-detail-bottom-button-group'>
            <div className = 'icon-button'  onClick={onFavoriteClickHandler}>

            {isFavorite ?
              <div className = 'icon favorite-fill-icon'></div> :
              <div className = 'icon favorite-light-icon'></div>            
            }
            </div>


            {/* 52수정 추가 favoriteList.length */}
            {/* 게시물 개수로 바뀜 */}
            <div className = 'board-detail-bottom-button-text'>{`하단좋아요 ${favoriteList.length}`}</div>

            {/* 52수정 추가 onClick={onShowFavoriteClickHandler} 29:59 */}
            <div className = 'icon-button' onClick={onShowFavoriteClickHandler}>

              {/* 52 추가 좋아요옆위아래버튼 {isFavorite ? ... 31:10 */}
              {showFavorite ?
              <div className = 'icon up-light-icon'></div> :
              <div className = 'icon down-light-icon'></div>
              }
            </div>

          </div>
          {/* board-detail-bottom-button-group끝 */}
      
          {/* 상단 복사 붙이기 */}
          <div className = 'board-detail-bottom-button-group'>
            <div className = 'icon-button'>

            {/* icon comment-icon으로 수정 */}
              <div className = 'icon comment-icon'></div>
            </div>       
         
            {/* 하단댓글으로 수정 */}
            {/* 52수정 추가 27:27 commentList.length */}
            {/* 게시물 개수로 바뀜 */}
            {/* 60 5:28  일단 확인 */}
            {/* 60 7:15  totalCommentCount 로 수정 */}

            <div className = 'board-detail-bottom-button-text'>{`하단댓글 ${totalCommentCount}`}</div>

            {/* 52수정 추가 onClick={onShowCommentClickHandler} 30:12 */}
            <div className = 'icon-button' onClick={onShowCommentClickHandler}>
            
            {/* 52 추가 댓글 옆위아래버튼 {isFavorite ? ... 31:40 */}
              {showComment ?
              <div className = 'icon up-light-icon'></div> :
              <div className = 'icon down-light-icon'></div>
              }

            </div>
          </div> 
          {/* board-detail-bottom-button-group 붙이기끝 */}
        </div>

        {/* 49 6:42 하단좋아요박스*/}
        {/* 49 32:20 {showFavorite 추가 좋아요 하단내용 처음엔 숨었다가 위아래버튼  클릭하면 하단내용 나왔다 숨김*/}
        
        {showFavorite &&
        <div className = 'board-detail-bottom-favorite-box'>
          <div className = 'board-detail-bottom-favorite-container'>

            {/* 52 12를 {favoriteList.length}수정 24:04 */}
            <div className = 'board-detail-bottom-favorite-title'>{'하단좋아요'}<span className='emphasis'>{favoriteList.length}</span></div>
            <div className = 'board-detail-bottom-favorite-contents'>
              {/* {favoriteList.map(item => <FavoriteItem favoriteListItem={item} />)} */}

              {/* key오류로 아래 코드 씀 */}
              {favoriteList.map((item, index) => (
                <FavoriteItem 
                  key={index}  // 인덱스를 key로 사용합니다.
                  favoriteListItem={item} 
                />
              ))}

            </div>
          </div>
        </div>
        }


        {/* 49추가 13:16 하단*/}
        {/* 52 12를 {commentList.length}수정 24:20 */}
        {/* 52 추가 {showComment && 추가 32:45 댓글하단내용 숨겨있다 클릭하면 열림*/}

        {showComment &&
        <div className = 'board-detail-bottom-comment-box'>
          <div className = 'board-detail-bottom-comment-container'>
            
            {/* 60 7:20 totalCommentCount로 수정 */}
            <div className = 'board-detail-bottom-comment-title'>{'하단댓글'}<span className='emphasis'>{totalCommentCount}</span>
            </div>

            <div className = 'board-detail-bottom-comment-list-container'>
              {/* 60 5:45 viewList로 수정 */}
              {/* {viewList.map(item => <CommentItem commentListItem={item} />)} */}

              {/* key오류로 아래 코드 씀 */}

              {viewList.map((item, index) => (
                <CommentItem 
                  key={index}  // 인덱스를 key로 사용합니다.
                  commentListItem={item} 
                />
              ))}

            </div>         
          </div>

          <div className = 'divider'></div>

          {/* 59추가 9:43*/}
          <div className = 'board-detail-bottom-comment-pagination-box'>

            {/* 49추가 23:38 */}
            {/* 60추가 수정 1:17 */}
            {/* 60추가 수정 4:30  */}
            <Pagination 
              currentPage={currentPage}
              currentSection={currentSection}
              setCurrentPage={setCurrentPage}
              setCurrentSection={setCurrentSection}
              viewPageList={viewPageList}
              totalSection={totalSection}
            />
          </div>



          {/* 51 -box로 수정 */}
          {/* 54 1:42 추가 로그인하지않으면 댓글박스 안나옴 */}
          {loginUser !== null &&
          <div className = 'board-detail-bottom-comment-input-box'>

            {/* 51 -box 추가 */}
            <div className = 'board-detail-bottom-comment-input-container'>

            {/* 52 추가 value={comment} onChange={onCommentChangeHandler} 35:00 */}
            {/* 52 추가 ref={commentRef} 37:25 */}
              <textarea ref={commentRef}className='board-detail-bottom-comment-textarea' placeholder='댓글을 작성하세요' value={comment} onChange={onCommentChangeHandler}/>

              {/* 52 추가댓글 입력하면 댓글달기 버튼 검은색으로 변함 {comment === '' ? 'disable-button' : 'black-button'} 35:45 */}
              {/* 52 추가 onClick={onCommentSubmitButtonClickHandler} 35:45 */}
              <div className = 'board-detail-bottom-comment-button-box'>
                <div className = {comment === '' ? 'disable-button' : 'black-button'} onClick={onCommentSubmitButtonClickHandler}>{'댓글달기'}</div>
              </div>
            </div>
          </div>
          }
        </div> 
        }  

      </div>  
    );
  };

      //53추가 24:06
      //53추가 30:50
    //   effect: 게시물번호 path variable 이 바뀔때마다 게시물 조회수 증가   //

    let effectFlag = false;
      useEffect(() => {
        
        if (!boardNumber) return;
        if (effectFlag) {
          return;
        }
        increaseViewCountRequest(boardNumber).then(increaseViewCountResponse);
          effectFlag = true;
      }, [boardNumber]);

    

  


  // 48추가 4:00
  //  render: 게시물 상세화면 컴포넌트 렌더링  //
  return (
    <div id = 'board-detail-wrapper'>
      <div className = 'board-detail-container'>
          <BoardDetailTop />
          <BoardDetailBottom />

      </div>

    </div>
  )
}

