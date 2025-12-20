import React from 'react';

const Button = ({text, onClick, width}) => {

    const buttonWidth = {width: width};

    return (

        <button className='p-3 border-2 border-green-400 text-green-400 rounded-md text-2xl hover:bg-green-400  hover:text-white duration-300' style={buttonWidth} onClick={onClick} >{text}</button>
    );
};

export default Button;