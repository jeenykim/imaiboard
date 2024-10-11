// rfc엔터
import React, { Dispatch, SetStateAction } from 'react';
import './style.css';


// 59 23:17추가
//   interface: 페이지네이션 컴포넌트 properties   //
interface Props {
  currentPage: number;
  currentSection: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  setCurrentSection: Dispatch<SetStateAction<number>>;

  viewPageList: number[];
  totalSection: number;
} 

// 59수정 25:10 Pagination(props: Props)
//  component: 페이지네이션 컴포넌트  //
export default function Pagination(props: Props) {

  // 59추가 25:20
  //   state: Properties //
  const { currentPage, currentSection, viewPageList, totalSection } = props;
  const { setCurrentPage, setCurrentSection } = props;


  // 59추가 19:30
  //   event handler: 페이지 번호 클릭이벤트 처리 //
  const onPageClickHandler = (page: number) => {
    setCurrentPage(page);
  }

  // 59추가 26:21 원래
  // event handler: 페이지 번호 클릭이벤트 처리 //
  // const onPreviousClickHandler = () => {
  //   if (currentSection === 1) return;
  //   setCurrentPage((currentSection - 1) * 10); 
  //   setCurrentSection(currentSection - 1);
  // }

  // chatgpt 처음 10개 이상일때만 이전다음 동작 수정
  // // event handler: 이전 버튼 클릭이벤트 처리
  // const onPreviousClickHandler = () => {
  //   if (currentSection === 1) return; // 첫 번째 섹션이면 return

  //   const newSection = currentSection - 1;
  //   const newPage = (newSection - 1) * 10 + 1;

  //   setCurrentSection(newSection);
  //   setCurrentPage(newPage);
  // }

  // 갯수 상관없이 이전다음 동작 수정
  // event handler: 이전 버튼 클릭이벤트 처리
  const onPreviousClickHandler = () => {
    if (currentPage === 1) return; // 첫 번째 페이지이면 return
    setCurrentPage(currentPage - 1);
  }

  // 2 -> 10
  // 3 -> 20
  // 4 -> 30

  // (currentSection - 1) * 10

    // 59추가 29:23
  //   event handler: 페이지 번호 클릭이벤트 처리 //
  // const onNextClickHandler = () => {
  //   if (currentSection === totalSection) return;
  //   setCurrentPage(currentSection * 10 + 1); 
  //   setCurrentSection(currentSection + 1);
  // }

  //chatgpt 처음 10개 이상일때만 이전다음 동작 수정
  // event handler: 다음 버튼 클릭이벤트 처리
  // const onNextClickHandler = () => {
  //   if (currentSection === totalSection) return; // 마지막 섹션이면 return

  //   const newSection = currentSection + 1;
  //   const newPage = (newSection - 1) * 10 + 1;

  //   setCurrentSection(newSection);
  //   setCurrentPage(newPage);
  // }

  
  // 갯수 상관없이 이전다음 동작 수정
  // event handler: 다음 버튼 클릭이벤트 처리
  const onNextClickHandler = () => {
    if (currentPage === viewPageList.length) return; // 마지막 페이지이면 return
    setCurrentPage(currentPage + 1);
  }

  // 1 -> 11
  // 2 -> 21
  // 3 -> 31

  // currentSection * 10 + 1

  //chatgpt 맨 처음
  // event handler: 이미지 맨 처음으로 이동하는 처리
  const onFirstClickHandler = () => {
    setCurrentPage(1); // 첫 번째 페이지로 이동
  }

  //chatgpt 맨 마지막
  // event handler: 이미지 맨 마지막으로 이동하는 처리
  const onLastClickHandler = () => {
    setCurrentPage(viewPageList.length); // 마지막 페이지로 이동
  }
  


  //  render: 페이지네이션 컴포넌트 렌더링  //  
  return (
    <div id= 'pagination-wrapper'>
      <div className= 'pagination-change-link-box'>
        <div className= 'icon-box-small'>
          {/* 59 수정 12:50 */}
          <div className= 'icon expand-left-icon' onClick={ onFirstClickHandler}></div>
        </div>
        {/* 59 21:10 onClick추가 */}
        <div className= 'pagination-change-link-text' onClick={ onPreviousClickHandler}>{'이전'}</div>
      </div>

      <div className= 'pagination-divider'>{'\|'}</div>



      {/* 59 20:32 onClick추가 */}
      {/* 59 추가 29:50  1->page로 수정*/}
      {/* {viewPageList.map(page =>
      page === currentPage ?
      <div className= 'pagination-text-active'>{page}</div> : <div className= 'pagination-text' onClick={() => onPageClickHandler(page)}>{page}</div>
      )} */}

      {/* key오류 이걸로 바꿈 */}
      {viewPageList.map(page =>
        page === currentPage ? (
          <div key={page} className='pagination-text-active'>{page}</div>
        ) : (
          <div key={page} className='pagination-text' onClick={() => onPageClickHandler(page)}>{page}</div>
        )
      )}

      

      <div className= 'pagination-divider'>{'\|'}</div>
      <div className= 'pagination-change-link-box'>

        {/* 59 21:30 onClick추가 */}
        <div className= 'pagination-change-link-text' onClick={ onNextClickHandler}>{'다음'}</div>
        <div className= 'icon-box-small'>
          <div className= 'icon expand-right-icon' onClick={onLastClickHandler}></div>
        </div>
      </div>
    </div>
  )
}

