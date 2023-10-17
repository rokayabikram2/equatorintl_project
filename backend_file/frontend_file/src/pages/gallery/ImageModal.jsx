import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

const ImageModal = (props) => {
    const { imageUrl, index, images } = props;
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [imageIndex, setImageIndex] = useState(index);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handlePrevClick = () => {
        setImageIndex((prevIndex) => (prevIndex !== 0 ? prevIndex - 1 : images.length - 1));
    };

    const handleNextClick = () => {
        setImageIndex((prevIndex) => (prevIndex !== images.length - 1 ? prevIndex + 1 : 0));
    };

    useEffect(() => {
        setImageIndex(index);
    }, [index]);

    useEffect(() => {
        setImageIndex(index);
    }, [modalIsOpen]);

    useEffect(() => {
        if (imageIndex < 0) {
            setImageIndex(0);
        } else if (imageIndex >= images.length) {
            setImageIndex(images.length - 1);
        }
    }, [imageIndex, images]);

    const currentImage = images[imageIndex];
    return (
        <>
            <div className='shadow-[0_0_5px_2px_rgba(0,0,0,0.1)]' onClick={openModal} data-aos="zoom-in" data-aos-duration="1000" data-aos-once='true'>
                <img className='w-full h-full' src={imageUrl} alt="Image"/>
            </div>
            <ReactModal isOpen={modalIsOpen} onRequestClose={closeModal}>
                <span onClick={closeModal} className='fixed z-[1000] top-[30px] right-[30px] text-xl h-[30px] w-[30px] rounded-full bg-red-700 text-white flex justify-center items-center cursor-pointer'>
                    <i className='fa-solid fa-xmark'></i>
                </span>
                <span className='h-[25px] w-[25px] flex items-center justify-center bg-black text-white absolute left-2 top-[50%] rounded-[50%]' onClick={handlePrevClick}>
                    <i
                        className="fa fa-chevron-left"

                    ></i>
                </span>
                <div className='flex justify-center items-center pt-3 h-full'>
                    <img
                        src={currentImage.bannerimage}
                        alt="Full Image"
                        className="h-full w-[50%] shadow-[0_0_5px_2px_rgba(0,0,0,0.1)]"
                    />
                </div>
                <span className='h-[25px] w-[25px] flex items-center justify-center bg-black text-white absolute right-2 top-[50%] rounded-[50%]' onClick={handleNextClick}>
                    <i
                        className="fa fa-chevron-right"

                    ></i>
                </span>
            </ReactModal>
        </>
    );
}

export default ImageModal;

