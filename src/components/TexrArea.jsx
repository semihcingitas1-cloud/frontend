import React from 'react';

const TexrArea = ({placeholder, value, name, id, type, onChange}) => {

    return (

        <textarea className='p-1 w-full border-2 border-green-400 outline-none' placeholder={placeholder} value={value} name={name} id={id} type={type} onChange={onChange} ></textarea>
    );
};

export default TexrArea;