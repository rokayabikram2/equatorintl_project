import React,{useState,useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const MdMessage = () => {

    const [md, setMD] = useState([]);

    const mdData = async () => {
        try {
            const response = await axios.get(
                "http://127.0.0.1:8000/api/navigations/"
            );

            const mdDatas = response.data.filter(
                (item) => item.status === "Publish" && item.page_type === "Message from MD"
            );
            setMD(mdDatas[0]);
        } catch (error) {
            console.error("Error fetching data:", error);

        }
    }

    useEffect(() => {
        mdData();
    }, []);
    return (
        <>
            <section className='sm:py-24 py-16 relative'>
                <img className='absolute w-full h-full top-0 left-0 object-cover' src={md.slider_image} alt="background" />
                <div className='absolute w-full h-full top-0 left-0 bg-black opacity-50'></div>
                <div className='container flex md:flex-row flex-col justify-between items-center relative text-white z-10'>
                    <h1 className='lg:text-5xl md:text-4xl sm:text-3xl text-2xl font-semibold text-center'>{md.caption}</h1>
                    <ul className='flex items-center gap-3 sm:text-xl text-base md:mt-16 mt-4'>
                        <li className="relative hover:text-primary after:absolute after:h-[85%] after:w-[1px] after:bg-white after:right-0 after:bottom-0"><NavLink className='px-3' to="/">HOME</NavLink></li>
                        <li className='flex items-center gap-2'>{md.name && md.name.toUpperCase()}</li>
                    </ul>
                </div>
            </section>
            <section className='py-12'>
                <div className="container">
                    <div className='flex flex-col items-center'>
                        <div>
                            <h2 className="lg:text-4xl sm:text-3xl text-2xl font-bold mb-8 relative after:absolute after:w-[100%] after:h-[5px] after:bg-red-600 after:content-[''] after:bottom-[-8px] after:rounded-sm after:left-0 before:absolute before:bg-white before:content-[''] before:h-[5px] before:w-[5px] before:bottom-[-8px] before:z-10 animate" data-aos="fade-up"
                             data-aos-duration="1000" data-aos-once='true'>{md.title}</h2>
                        </div>
                        <div className='flex justify-between w-full'>
                            <div className='lg:w-1/2 md:w-9/12 sm:w-9/12 w-11/12 flex gap-4 items-center'>
                                <img className='h-50 w-[50%] object-cover' src={md.bannerimage} alt="md-image" data-aos="zoom-in" data-aos-duration="1000" data-aos-once='true' />
                                <span className='block mt-4' data-aos="fade-left" data-aos-duration="1000" data-aos-once='true'>
                                    <b className='text-black md:text-2xl text-xl'>{md.meta_title}</b>
                                    <p className='text-gray-700 sm:text-base text-sm'>{md.meta_keyword}</p>
                                </span>
                            </div>
                        </div>
                        <div className='text-gray-700 mt-5 bg-gray-100 p-4 sm:text-base text-sm' data-aos="fade-right" data-aos-duration="1000" data-aos-once='true'>
                            <p dangerouslySetInnerHTML={{__html:md.short_desc}}></p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default MdMessage;
