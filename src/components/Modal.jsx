import React from 'react';
import { useDispatch } from 'react-redux';
import { openModalFunc } from '../redux/generalSlice';
import { CiCircleRemove } from 'react-icons/ci';
import Button from './Button';

const Modal = ({title, content, onClick, btnName, func}) => {

    const dispatch = useDispatch();

    const handleClose = () => {

        if (func) {

            dispatch(func());
        } else {

            dispatch(openModalFunc());
        }
    };

    return (

        <div className='mt-10 z-50 w-full h-full fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center'>

            <div className='mt-10 w-[500px] bg-white border p-4 rounded-md'>

                <div className='flex items-center justify-between'>

                    <div>{title}</div>
                    <div onClick={handleClose}><CiCircleRemove size={30} className='hover:bg-red-500 hover:text-white rounded-full' /></div>

                </div>
                {content}
                <Button text={btnName} width={'100%'} onClick={onClick} />

            </div>

        </div>
    );
};

export default Modal;