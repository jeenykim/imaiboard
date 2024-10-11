import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import './style.css';
import { useBoardStore, useLoginUserStore } from 'stores';
import { useNavigate } from 'react-router-dom';
import { MAIN_PATH } from 'constant';
import { useCookies } from 'react-cookie';


//  component: 게시물 작성화면 컴포넌트  //
export default function BoardWrite() {



  //   state: 제목 영역 요소 참조 상태  //
  const titleRef =useRef<HTMLTextAreaElement | null>(null);

  //   state: 본문 영역 요소 참조 상태  //
  const contentRef =useRef<HTMLTextAreaElement | null>(null);

  //   state: 이미지 입력 요소 참조 상태  //
  const imageInputRef =useRef<HTMLInputElement | null>(null);

  //   state: 게시물 상태  //
  const { title, setTitle} = useBoardStore();
  const { content, setContent} = useBoardStore();
  const { boardImageFileList, setBoardImageFileList} = useBoardStore();
  const { resetBoard } = useBoardStore();

  // 42추가 1:50
  //   state: 로그인 유저 상태  //
  const { loginUser } = useLoginUserStore();

 // 42추가 27:05
  //   state: cookie상태  //
  const [cookies, setCookies] = useCookies();


  //   state: 게시물 이미지 미리보기 URL상태  //
  const [imageUrls, setImageUrls] = useState<string[]>([]);




  //42 2:47 추가
  //   function: 네비게이트 함수 //
  const navigate = useNavigate();


  //   event handler: 제목 변경 이벤트 처리 //
  const onTitleChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setTitle(value);

    if (!titleRef.current) return;
    titleRef.current.style.height = 'auto';
    titleRef.current.style.height = `${titleRef.current.scrollHeight}px`;
  }

    //   event handler: 내용 변경 이벤트 처리 //
  const onContentChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setContent(value);

    if (!contentRef.current) return;
    contentRef.current.style.height = 'auto';
    contentRef.current.style.height = `${contentRef.current.scrollHeight}px`;
  }

  //   event handler: 이미지 업로드 버튼 클릭 이벤트 처리 //
  const onImageChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {

    if (!event.target.files || !event.target.files.length) return;
    const file = event.target.files[0];

    // 미리보기용으로 배열 만듬
    const imageUrl = URL.createObjectURL(file);
    // const newImageUrls = imageUrls.map(item => item);
    // key오류로 아래코드사용
    const newImageUrls = [...imageUrls];
    newImageUrls.push(imageUrl);
    setImageUrls(newImageUrls);

    //이미지 업로드용
    // const newBoardImageFileList = boardImageFileList.map(item => item);
    // key오류로 아래코드사용
    const newBoardImageFileList = [...boardImageFileList];

    newBoardImageFileList.push(file);
    setBoardImageFileList(newBoardImageFileList);

    if (!imageInputRef.current) return;
    imageInputRef.current.value = '';
    // 동일한 파일 다중업로드 가능하게
  }

  // Array.prototype.copyWithin()
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin

  //   event handler: 이미지 업로드 버튼 클릭 이벤트 처리 //
  const onImageUploadButtonClickHandler = () => {

    if (!imageInputRef.current) return;
    imageInputRef.current.click();
  }

  //   event handler: 이미지 닫기 버튼 클릭 이벤트 처리 //
  const onImageCloseButtonClickHandler = (deleteIndex: number) => {

    if (!imageInputRef.current) return;
    imageInputRef.current.value = '';

    const newImageUrls = imageUrls.filter((url, index) => index !== deleteIndex);
    setImageUrls(newImageUrls);

    const newBoardImageFileList = boardImageFileList.filter((file, index) => index !== deleteIndex);
    setBoardImageFileList(newBoardImageFileList);
  }



// 42 26:32확인
  //   effect: 첫 마운트 시 실행할 함수 //
  useEffect(() => {
    // 42 2:22추가
    const accessToken = cookies.accessToken;
    // 42 2:22추가
    // if (!loginUser) 
    //수정
      if (!accessToken) {
      // 42 3:10추가
      navigate(MAIN_PATH());
      return;
    }
    resetBoard();
  }, []);
  


  //  render: 게시물 작성화면 컴포넌트 렌더링  //
  return (
    <div id='board-write-wrapper'>
      <div className='board-write-container'>
        <div className='board-write-box'>
          <div className='board-write-title-box'>
            <textarea ref={titleRef} className='board-write-title-textarea' rows={1} placeholder='제목을 작성해주세요' value={title}  onChange={onTitleChangeHandler} />

          </div>
          <div className='divider'></div>
          <div className='board-write-content-box'>
            <textarea ref={contentRef} className='board-write-content-textarea' placeholder='본문을 작성해주세요' value={content} onChange={onContentChangeHandler}/>
            <div className='icon-button' onClick={onImageUploadButtonClickHandler}>

              <div className='icon image-box-light-icon'></div>
            </div>
            <input ref={imageInputRef} type='file' accept='image/*' style={{ display: 'none' }} onChange={onImageChangeHandler} />
          </div>

          <div className='board-write-images-box'>


            {/* key오류로 key={index}추가 */}
            {imageUrls.map((imageUrl, index) =>
            <div key={index} className='board-write-image-box'>
              <img className='board-write-image' src={imageUrl} />
              <div className='icon-button image-close' onClick={() => onImageCloseButtonClickHandler(index)}>
                <div className='icon close-icon' ></div>
              </div>
            </div>
            )}

            {/* 41삭제 */}
            {/* <div className='board-write-image-box'>
              <img className='board-write-image' src='https://cdn.pixabay.com/photo/2024/02/09/13/03/beach-8563083_1280.jpg'/>
              <div className='icon-button image-close'>
                <div className='icon close-icon'></div>
              </div>
            </div> */}


          </div>
        </div>
      </div>
    </div>
  )
}
