import React, { useEffect, useState } from 'react';
import './style.css';
import { useNavigate, useParams } from 'react-router-dom';
import { BoardListItem } from 'types/interface';
import { SEARCH_PATH } from 'constant';
import BoardItem from 'components/BoardItem';
import { getRelationListRequest, getSearchBoardListRequest } from 'apis';
import { GetSearchBoardListResponseDto } from 'apis/response/board';
import { ResponseDto } from 'apis/response';
import { usePagination } from 'hooks';
import Pagination from 'components/Pagination';
import { GetRelationListResponseDto } from 'apis/response/search';


// 72 1:11추가
//  component:  검색 화면 컴포넌트  //
export default function Search() {

  //  state: searchWord path variable 상태  //
  const { searchWord } = useParams();


  // 73 15:00 main index파일 81라인 페이지 네이션복붙 추가
  //  state: 페이지 네이션 관련 상태 //
  const {
    currentPage, setCurrentPage, currentSection, setCurrentSection, viewList, viewPageList, totalSection, setTotalList
  } = usePagination<BoardListItem>(5);


  //73 12:20추가
  //  state: 이전검색어 상태  //
  const [preSearchWord, setPreSearchWord] = useState<string | null>(null);

  //  state: 검색게시물 개수 상태  //
  const [count, setCount] = useState<number>(0);

  // 73 12:18 삭제
  // //  state: 검색 게시물 리스트 상태 (임시)  //
  // const [searchBoardList, setSearchBoardList] = useState<BoardListItem[]>([]);

  // 73 21:15 수정
  //  state: 연관 검색어 리스트 상태  //
  const [relativeWordList, setRelationWordList] = useState<string[]>([]);


  //function: 네비게이트 함수 //
  const navigate = useNavigate();


  // 73 13:15 추가
  //function: get Search Board List Response 처리 함수 //
  const getSearchBoardListResponse =  (responseBody: GetSearchBoardListResponseDto | ResponseDto | null) => {
    if (!responseBody) return;
    const { code } = responseBody;
    if (code === 'DBE') alert('데이터베이스 오류입니다');
    if (code !== 'SU') return;

    if (!searchWord) return;
    const { searchList } = responseBody as GetSearchBoardListResponseDto;
    setTotalList(searchList)
    setCount(searchList.length);
    setPreSearchWord(searchWord);
  };


  // 73 19:50 추가
  //function: get relation List Response 처리 함수 //
  const getRelationListResponse =  (responseBody: GetRelationListResponseDto | ResponseDto | null) => {
    if (!responseBody) return;
    const { code } = responseBody;
    if (code === 'DBE') alert('데이터베이스 오류입니다');
    if (code !== 'SU') return;

    if (!searchWord) return;
    const { relativeWordList } = responseBody as GetRelationListResponseDto;
    setRelationWordList(relativeWordList)
  };


  // event handler: 연관 검색어 클릭 이벤트 처리 //
  const onRelationWordClickHandler = (word: string) =>
    navigate(SEARCH_PATH(word));
 

  //  effect: searchWord 상태 변경시 실행될 함수  //
  useEffect(() => {
    //73 setSearchBoardList와 setRelationList삭제후 수정
    // setSearchBoardList(latestBoardListMock);
    // 72 37:00 웹페이지 확인하고 다시 지움
    // setRelationList(['안녕', '환영해']);
    // setRelationList([]);
    if (!searchWord) return;
    getSearchBoardListRequest(searchWord, preSearchWord).then(getSearchBoardListResponse);
    // 73 19:10 추가
    getRelationListRequest(searchWord).then(getRelationListResponse);
  }, [searchWord]);


  // 72 39:51 138라인 Pagination 수정
  // 73 16:20 138라인 Pagination 수정
  // 73 16:50  118라인 searchBoardList수정
  //  render:  검색 화면 컴포넌트 렌더링  //
  if (!searchWord) return (<></>)
  return (
    <div id='search-wrapper'>
      <div className='search-container'>

        <div className='search-title-box'>
          <div className='search-title'><span className='emphasis'>{searchWord}</span>{'에 대한 검색결과입니다'}</div>
          <div className='search-count'>{count}</div>
        </div>

        <div className='search-contents-box'>
          {count === 0 ?
          <div className='search-contents-nothing'>{'검색결과가 없습니다'}</div> :           
          <div className='search-contents'>
            
            {/* {viewList.map(boardListItem => <BoardItem boardListItem={boardListItem} />)} */}

            {/* 키오류 아래 코드로 사용 */}
            {viewList.map(boardListItem => (
              <BoardItem
              key={boardListItem.boardNumber}  // 고유한 키를 추가합니다.
              boardListItem={boardListItem} 
              />
            ))}
          </div>
          }

          <div className='search-relation-box'>
            <div className='search-relation-card'>
              <div className='search-relation-card-container'>
                <div className='search-relation-card-title'>{'관련검색어'}</div>
                {relativeWordList.length === 0 ?
                <div className='search-relation-card-contents-nothing'>{'관련검색어가 없습니다'}</div> :
                <div className='search-relation-card-contents'>
                {/* {relativeWordList.map(word => <div className='word-badge' onClick={() => onRelationWordClickHandler(word)}>{word}</div>)} */}


                {relativeWordList.map((word, index) => (
                  <div 
                    key={index}  // 인덱스를 key로 사용합니다.
                    className='word-badge' 
                    onClick={() => onRelationWordClickHandler(word)}
                  >
                    {word}
                  </div>
                ))}

                </div>
                }
                
              </div>
            </div>
          </div>
        </div>

        <div className='search-pagination-box'>
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
  )
}
