import React ,{useState,useEffect} from 'react';
import { NavLink } from 'react-router-dom';
// import NepalImages from './NepalImages';
import ImageModal from '../gallery/ImageModal';
import axios from 'axios';

const AboutNepal = () => {
    // const images = NepalImages;

    const [nepal, setNepal] = useState([]);
    const [nepalImage,setImage] = useState([])

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6; // Adjust this based on your design
    const [Pages, setTotalPages] = useState(1)


    const nepalData = async () => {
        try {
            const response = await axios.get(
                "http://127.0.0.1:8000/api/navigations/"
            );

            const nepalDatas = response.data.filter(
                (item) => item.status === "Publish" && item.page_type === "About Nepal"
            );
            setNepal(nepalDatas[0]);

            let newimage=[...response.data]
            newimage = newimage.reverse()
            const imageDatas = newimage.filter(
                (item) => item.status === "Publish" && item.page_type === "About Nepal/Image"
            );
            setImage(imageDatas);

            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const paginatedImageDatas = imageDatas.slice(startIndex, endIndex);
        
            setImage(paginatedImageDatas);
            
        
            const totalPages = Math.ceil(imageDatas.length / itemsPerPage);
            setTotalPages(totalPages);

        } catch (error) {
            console.error("Error fetching data:", error);

        }
    }

    useEffect(() => {
        nepalData();
    }, [currentPage]);
   

    return (
        <>
            <section className='sm:py-24 py-16 relative'>
                <img className='absolute w-full h-full top-0 left-0 object-cover' src={nepal.slider_image} alt="background" />
                <div className='absolute w-full h-full top-0 left-0 bg-black opacity-50'></div>
                <div className='container flex md:flex-row flex-col justify-between items-center relative text-white z-10'>
                    <h1 className='lg:text-5xl md:text-4xl sm:text-3xl text-2xl font-semibold text-center'>{nepal.caption}</h1>
                    <ul className='flex items-center gap-3 sm:text-xl text-base md:mt-16 mt-4'>
                        <li className="relative hover:text-primary after:absolute after:h-[85%] after:w-[1px] after:bg-white after:right-0 after:bottom-0"><NavLink className='px-3' to="/">HOME</NavLink></li>
                        <li className='flex items-center gap-2'>{nepal.name && nepal.name.toUpperCase()}</li>
                    </ul>
                </div>
            </section>
            <section className='py-12'>
                <div className="container">
                    <div className='flex flex-col items-center'>
                        <h2 className="lg:text-4xl sm:text-3xl text-2xl font-bold mb-8 relative after:absolute after:w-[100%] after:h-[5px] after:bg-red-600 after:content-[''] after:bottom-[-8px] after:rounded-sm after:left-0 before:absolute before:bg-white before:content-[''] before:h-[5px] before:w-[5px] before:bottom-[-8px] before:z-10 animate" 
                        data-aos="fade-up" data-aos-duration="1000" data-aos-once='true'>{nepal.name}</h2>
                        <div className='text-gray-700 sm:text-base text-sm w-full' data-aos="fade-right" data-aos-duration="1000" data-aos-once='true'>
                        <p dangerouslySetInnerHTML={{__html:nepal.short_desc}}></p>
                        </div>
                    </div>
                </div>
            </section>
            <section className='pb-12'>
                <div className='container flex flex-col items-center'>
                    <h2 className="lg:text-4xl sm:text-3xl text-2xl font-bold mb-8 relative after:absolute after:w-[100%] after:h-[5px] after:bg-red-600 after:content-[''] after:bottom-[-8px] after:rounded-sm after:left-0 before:absolute before:bg-white before:content-['']
                     before:h-[5px] before:w-[5px] before:bottom-[-8px] before:z-10 animate" data-aos="fade-up" data-aos-duration="1000" data-aos-once='true'>Images</h2>
                    <div className='grid md:grid-cols-3 grid-cols-2 gap-5'>
                        {nepalImage.map((image, index) => (
                            <ImageModal key={image.id} imageUrl={image.bannerimage} images={nepalImage} index={index} />
                        ))}
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
                
            </section>
        </>
    )
}

export default AboutNepal;
