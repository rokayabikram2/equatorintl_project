import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
// import GalleryImages from './GalleryImages';
import ImageModal from './ImageModal';
import axios from 'axios';

const Gallery = () => {
    const [company, setCompany] = useState([]);
    const [event, setEvent] = useState([]);
    const [slide,setSlide] =useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3; // Adjust this based on your design
    const [Pages, setTotalPages] = useState(1)
  
  
    const galleryData = async () => {
        try { 
            const response = await axios.get(
                "http://127.0.0.1:8000/api/navigations/"
            );
            let newCompany =[...response.data]
            newCompany = newCompany.reverse()
            const companyDatas = newCompany.filter(
                (item) => item.status === "Publish" && item.page_type === "Gallery/Company profile"
            );
            setCompany(companyDatas);
            let newEvents =[...response.data]
            newEvents = newEvents.reverse()
            const eventDatas = newEvents.filter(
                (item) => item.status === "Publish" && item.page_type === "Gallery/Events"
            );
            setEvent(eventDatas);
            
            const sliderDatas = response.data.filter(
                  (item) => item.status === "Publish" && item.page_type === "Gallery/slider"
            );
            setSlide(sliderDatas[0]);


            
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const paginatedCompanyDatas = companyDatas.slice(startIndex, endIndex);
            const paginatedEventDatas = eventDatas.slice(startIndex, endIndex);


            setCompany(paginatedCompanyDatas);
            setEvent(paginatedEventDatas);

            const totalPages = Math.ceil(companyDatas.length / itemsPerPage);
            setTotalPages(totalPages);
            
  
  
        } catch (error) {
            console.error("Error fetching data:", error);
  
        }
    }
  
    useEffect(() => {
        galleryData();
    }, [currentPage]);


    const [activeBlock, setActiveBlock] = useState(0);

    useEffect(() => {
        setActiveBlock(0);
    }, []);

    const handleButtonClick = (index) => {
        setActiveBlock(index)
    }

 

    return (
        <>
            {/* ---top part--- */}
            <section className='sm:py-24 py-16 relative'>
                <img className='absolute w-full h-full top-0 left-0 object-cover' src={slide.slider_image} alt="background" />
                <div className='absolute w-full h-full top-0 left-0 bg-black opacity-50'></div>
                <div className='container flex md:flex-row flex-col justify-between items-center relative text-white z-10'>
                    <h1 className='lg:text-5xl md:text-4xl sm:text-3xl text-2xl font-semibold text-center'>{slide.caption}</h1>
                    <ul className='flex items-center gap-3 sm:text-xl text-base md:mt-16 mt-4'>
                        <li className="relative hover:text-primary after:absolute after:h-[85%] after:w-[1px] after:bg-white after:right-0 after:bottom-0"><NavLink className='px-3' to="/">HOME</NavLink></li>
                        <li>{slide.title}</li>
                    </ul>
                </div>
            </section>
            {/* ---image part--- */}
            <section className="py-12">
                <div className="container flex flex-col items-center">
                    <h2 className="lg:text-4xl sm:text-3xl text-2xl font-bold mb-8 relative after:absolute after:w-[100%] after:h-[5px] after:bg-red-600 after:content-[''] after:bottom-[-8px] after:rounded-sm after:left-0 before:absolute before:bg-white before:content-[''] before:h-[5px] before:w-[5px] before:bottom-[-8px] before:z-10 animate"
                     data-aos="fade-up" data-aos-duration="1000" data-aos-once='true'>{slide.name}</h2>
                    <div className='flex items-center gap-1 mb-6'>
                        <button onClick={() => handleButtonClick(0)} className={`py-1 sm:px-3 px-2 sm:text-lg text-sm bg-white border-b ${activeBlock === 0 ? 'border-red-500 text-primary' : ''}`}>All</button>
                        <button onClick={() => handleButtonClick(1)} className={`py-1 sm:px-3 px-2 sm:text-lg text-sm bg-white border-b ${activeBlock === 1 ? 'border-red-500 text-primary' : ''}`}>Company Profile</button>
                        <button onClick={() => handleButtonClick(2)} className={`py-1 sm:px-3 px-2 sm:text-lg text-sm bg-white border-b ${activeBlock === 2 ? 'border-red-500 text-primary' : ''}`}>Events</button>
                    </div>
                    <div className='grid grid-cols-1'>
                        <div className={`${activeBlock === 0 ? 'block' : 'hidden'}`}>
                            <div className='grid md:grid-cols-3 grid-cols-2 gap-5'>
                                {company.map((image, index) => (
                                    <ImageModal key={image.id} imageUrl={image.bannerimage} images={company} index={index} />
                                ))}
                                {event.map((image, index) => (
                                    <ImageModal key={image.id} imageUrl={image.bannerimage} images={event} index={index} />
                                ))}
                                
                            </div>
                        </div>
                        <div className={`${activeBlock === 1 ? 'block' : 'hidden'}`}>
                            <div className='grid md:grid-cols-3 grid-cols-2 gap-5'>
                                {company.map((image, index) => (
                                    <ImageModal key={image.id} imageUrl={image.bannerimage} images={company} index={index} />
                                ))}
                            </div>
                        </div>
                        <div className={`${activeBlock === 2 ? 'block' : 'hidden'}`}>
                            <div className='grid md:grid-cols-3 grid-cols-2 gap-5'>
                                {event.map((image, index) => (
                                    <ImageModal key={image.id} imageUrl={image.bannerimage} images={event} index={index} />
                                ))}
                            </div>
                        </div>
                        
                <nav className="flex justify-center items-center space-x-2 pt-5">
                    <button
                        className="text-gray-500 hover:text-blue-600 p-4 inline-flex items-center gap-2 rounded-md"
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <span aria-hidden="true">«</span>
                        <span className="sr-only">Previous</span>
                    </button>
                    {Array.from({ length: Pages }).map((_, index) => (
                        <button
                            key={index + 1}
                            className={`w-10 h-10 ${currentPage === index + 1
                                    ? "bg-blue-500 text-white"
                                    : "text-gray-500 hover:text-blue-600"
                                } p-4 inline-flex items-center text-sm font-medium rounded-full`}
                            onClick={() => setCurrentPage(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        className="text-gray-500 hover:text-blue-600 p-4 inline-flex items-center gap-2 rounded-md"
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === Pages}
                    >
                        <span className="sr-only">Next</span>
                        <span aria-hidden="true">»</span>
                    </button>
                    
                </nav>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Gallery;
