import React, { useEffect, useState } from 'react';
import './style.css';
import Top3Item from 'components/Top3Item';
import { BoardListItem } from 'types/interface';
// import { latestBoardListMock } from 'mocks';
import BoardItem from 'components/BoardItem';
import { useNavigate } from 'react-router-dom';
import { SEARCH_PATH } from 'constant';
import { getLatestBoardListRequest, getPopularListRequest, getTop3BoardListRequest } from 'apis';
import GetTop3BoardListResponseDto from 'apis/response/board/get-top3-board-list.response.dto';
import { ResponseDto } from 'apis/response';
import { usePagination } from 'hooks';
import GetLatestBoardListResponseDto from 'apis/response/board/get-latest-board-list.response.dto';
import Pagination from 'components/Pagination';
import { GetPopularListResponseDto } from 'apis/response/search';



// 67추가 1:20
//  component: 메인 화면 컴포넌트  //
export default function Main() {

    //68 28:21 추가
  //   function: 네비게이트 함수 //
  const navigate = useNavigate();


  //  component: 메인 화면 상단 컴포넌트  //
  const MainTop = () => {

    
    //  state: 주간 top3 게시물 리스트 상태  //
    const [top3BoardList, setTop3BoardList] = useState<BoardListItem[]>([]);

    //   function: get top3 board list response 처리 함수 //
    // 69 수정추가 14:21
    const getTop3BoardListResponse = (responseBody: GetTop3BoardListResponseDto | ResponseDto | null) => {
      if (!responseBody) return;
      const { code } = responseBody;
      if (code === 'DBE') alert('데이터베이스 오류입니다');
      if (code !== 'SU') return;

      const { top3List } = responseBody as GetTop3BoardListResponseDto;
      setTop3BoardList(top3List)
    };


    // 69 수정추가 14:08
    //  effect: 첫마운트시 실행될 함수  //
    useEffect(() => {
      getTop3BoardListRequest().then(getTop3BoardListResponse);
    }, []);


    //  render: 메인 화면 상단 컴포넌트 렌더링  //
    return (

      <div id='main-top-wrapper'>
        <div className='main-top-container'>
          <div className='main-top-title'>{'Imaikim storyboard'}</div>
          <div className='main-top-contents-box'>
            {/* <div className='main-top-contents-title'>{'주간 TOP3 게시글'}</div> */}
            <div className='main-top-contents-title'>{'TOP3 게시글'}</div>
            <div className='main-top-contents'>
              {/* {top3BoardList.map(top3ListItem => <Top3Item top3ListItem={top3ListItem} />)} */}

              {/* key오류 이걸로 바꿈 */}
              {top3BoardList.map(top3ListItem => 
                <Top3Item 
                  key={top3ListItem.boardNumber} // 고유한 boardNumber를 key로 사용
                  top3ListItem={top3ListItem} 
                />
              )}

              
            </div>
          </div>
        </div>
      </div>
    )
  }

  //  component: 메인 화면 하단 컴포넌트  //
  const MainBottom = () => {


// 69 18:54 삭제 추가 
    // //  state: 최신 게시물 리스트 상태(임시)  //
    // const [currentBoardList, setCurrentBoardList] = useState<BoardListItem[]>([]); 

    //  state: 페이지 네이션 관련 상태 //
    const {
      currentPage, setCurrentPage, currentSection, setCurrentSection, viewList, viewPageList, totalSection, setTotalList
    } = usePagination<BoardListItem>(5);


    //  state: 인기검색어 리스트 상태 //
    const [popularWordList, setPopularWordList] = useState<string[]>([]);


    // 69 20:54 추가 
    //   function: get latest board list response 처리 함수 //
    const getLatestBoardListResponse = (responseBody: GetLatestBoardListResponseDto | ResponseDto | null) => {
      if (!responseBody) return;
      const { code } = responseBody;
      if (code === 'DBE') alert('데이터베이스 오류입니다');
      if (code !== 'SU') return;

      const { latestList } = responseBody as GetLatestBoardListResponseDto;
      setTotalList(latestList);
    }

    // 69 25:45 추가 
    //   function: get popular list response 처리 함수 //
    const getPopularListResponse = (responseBody: GetPopularListResponseDto | ResponseDto | null) => {
      if (!responseBody) return;
      const { code } = responseBody;
      if (code === 'DBE') alert('데이터베이스 오류입니다');
      if (code !== 'SU') return;

      const { popularWordList } = responseBody as GetPopularListResponseDto;
      setPopularWordList(popularWordList); 
    };

    
    
    // 27:47추가
    //  event handler: 인기검색어 클릭이벤트 처리 //
    const onPopularWordClickHandler = (word: string) => {
      navigate(SEARCH_PATH(word));
    };

    // 69 20:20 삭제 추가
    //  effect: 첫마운트시 실행될 함수  //
    useEffect(() => {
      // setCurrentBoardList(latestBoardListMock);
      getLatestBoardListRequest().then(getLatestBoardListResponse);

      // 69 25:24 삭제 추가
      // setpopularWordList(['안녕', '잘가', '또봐']);
      getPopularListRequest().then(getPopularListResponse);
    }, []);


    //  render: 메인 화면 하단 컴포넌트 렌더링  //
    return (
      <div id='main-top-wrapper'>
        <div className='main-bottom-container'>
          <div className='main-bottom-title'>{'최신게시물'}</div>
          <div className='main-bottom-contents-box'>
            <div className='main-bottom-current-contents'>
              {/* 69 22:44 viewList 로 수정 */}
              {/* {viewList.map(boardListItem => <BoardItem boardListItem={boardListItem} />)} */}

              {/* key오류로 수정 */}
              {viewList.map(boardListItem => (
                <BoardItem
                  key={boardListItem.boardNumber} // 또는 boardListItem.id 등 유니크한 속성
                  boardListItem={boardListItem}
                />
              ))}



            </div>
            <div className='main-bottom-popular-box'>
              <div className='main-bottom-popular-card'>
                <div className='main-bottom-popular-card-container'>
                  <div className='main-bottom-popular-card-title'>{'인기검색어'}</div>

                  <div className='main-bottom-popular-card-contents'>
                    {/* {popularWordList.map(word => <div className='word-badge' onClick={() => onPopularWordClickHandler(word)}>{word}</div>)} */}

                    {/* key오류 이걸로 수정  */}
                    {popularWordList.map(word => (
                      <div
                        key={word} // word가 고유하다고 가정할 때
                        className='word-badge'
                        onClick={() => onPopularWordClickHandler(word)}
                      >
                        {word}
                      </div>
                    ))}

                  
                  
                  
                  
                  
                  
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 69 22:50 주석푼다 수정*/}
          <div className='main-bottom-pagination-box'>
            <Pagination
              currentPage={currentPage}
              currentSection={currentSection}
              setCurrentPage={setCurrentPage}
              setCurrentSection={setCurrentSection}
              viewPageList={viewPageList}
              totalSection={totalSection}      
            />
          </div>
        </div>
      </div>
    )
  }


  //  render: 메인 화면 컴포넌트 렌더링  //
  return (
    <>
    <MainTop />      
    <MainBottom />
    </>
  )
}

