import React from 'react';
import './style.css';
import { CommentListItem } from 'types/interface';
import defaultProfileImage from 'assets/image/default-profile-image.png';


interface Props {
  commentListItem: CommentListItem;
}

//  component: Comment List Item 컴포넌트  //
export default function CommentItem({ commentListItem }: Props) {

//   state: properties   //
  const { nickname,  profileImage, writeDatetime, content } = commentListItem;


  // 54 27:10 추가
  //   function: 작성일 경과 시간 함수 ///
  // const getElapsedTime = () {
  //   const now = dayjs()
  // }

  //  render: Comment List Item 컴포넌트 렌더링  //
  return (
    <div className ='comment-list-item'>

      {/* top시작 */}
			<div className ='comment-list-item-top'>

        {/* 프로필이미지시작 */}
				<div className ='comment-list-item-profile-box'>
					<div className ='comment-list-item-profile-image' style={{ backgroundImage: `url(${profileImage ? profileImage : defaultProfileImage})` }}></div>
				</div>
        {/* 프로필이미지끝 */}

        {/* 닉 시작 */}
        {/* <div className ='comment-list-item-nickname'>{'안녕하세요 이메이킴입니다'}</div> */}
        <div className ='comment-list-item-nickname'>{nickname}</div>
        <div className ='comment-list-item-divider'>{'\|'}</div>
        <div className ='comment-list-item-time'>{writeDatetime}</div>
        {/* 닉 끝 */}

      </div>
      {/* top끝 */}


      {/* content 시작 */}
      <div className ='comment-list-item-main'>
        <div className ='comment-list-item-content'>
          {content}
        </div>
      </div>
      {/* content 끝 */}

    </div>

  )
}
