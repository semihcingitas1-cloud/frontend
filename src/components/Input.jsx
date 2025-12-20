import React from 'react';

const Input = ({placeholder, value, name, id, type, onChange}) => {

    return (

        <input className='w-full h-10 p-2 outline-none border rounded-md' placeholder={placeholder} value={value} name={name} id={id} type={type} onChange={onChange} />
    );
};

export default Input;