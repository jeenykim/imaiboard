import React, {  ChangeEvent, KeyboardEvent, forwardRef } from 'react';
import './style.css';

//  interface: Input Box컴포넌트 Properties  //
interface Props {
    label: string;
    type: 'text' | 'password';
    placeholder: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    // 29수정
    error: boolean;

    // icon?: string;
    icon?: 'eye-light-off-icon' | 'eye-light-on-icon' | 'expand-right-light-icon';
    onButtonClick?: () => void;

    message?: string;
    onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
}

//  component: Input Box 컴포넌트  //
const InputBox = forwardRef<HTMLInputElement, Props>((props: Props, ref ) => {
// 엔터치면 다음 항목으로 넘어감

    //  state: Properties  //
    const { label, type, error, placeholder, value, icon, message} = props;
    const { onChange, onButtonClick, onKeyDown } = props;


    //  event handler: input값 변경 이벤트 처리함수  //
    // const onChangeHandler = (event : ChangeEvent<HTMLInputElement>) => {
    //     const{ value } = event.target;
    //     setValue(value);
    // }

    //  event handler: input키 이벤트 처리함수  //
    const onKeyDownHandler = (event : KeyboardEvent<HTMLInputElement>) => {
        if(!onKeyDown) return;
        onKeyDown(event);
    }


  //  render: Input Box 컴포넌트 렌더링  //
    return (
        <div className='inputbox'>
            <div className='inputbox-label'>{label}</div>
            <div className={error ? 'inputbox-container-error' :'inputbox-container'}>
                <input ref={ref} type={type} className = 'input' placeholder={placeholder} value={value} onChange={onChange} onKeyDown={onKeyDownHandler} />
                {onButtonClick !== undefined &&
                
                <div className='icon-button' onClick={onButtonClick}>
                    {/* 27에서 onClick={onButtonClick}추가 */}
                    
                    {icon !== undefined && <div className={`icon ${icon}`}></div>} 
                </div>
            }
            </div>
        
            {message !== undefined && <div className='inputbox-message'>{message}</div>}
        </div>
    )

});

export default InputBox;
