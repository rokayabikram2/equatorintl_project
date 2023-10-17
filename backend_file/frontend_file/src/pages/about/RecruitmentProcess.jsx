import React,{useState,useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const RecruitmentProcess = () => {
    const [recurit, setRecurit] = useState([]);

    const recuritData = async () => {
        try {
            const response = await axios.get(
                "http://127.0.0.1:8000/api/navigations/"
            );

            const recuritDatas = response.data.filter(
                (item) => item.status === "Publish" && item.page_type === "Recruitment Process"
            );
            setRecurit(recuritDatas[0]);
        } catch (error) {
            console.error("Error fetching data:", error);

        }
    }

    useEffect(() => {
        recuritData();
    }, []);
    
    return (
        <>
            <section className='sm:py-24 py-16 relative'>
                <img className='absolute w-full h-full top-0 left-0 object-cover' src={recurit.slider_image} alt="background" />
                <div className='absolute w-full h-full top-0 left-0 bg-black opacity-50'></div>
                <div className='container flex md:flex-row flex-col justify-between items-center relative text-white z-10'>
                    <h1 className='lg:text-5xl md:text-4xl sm:text-3xl text-2xl font-semibold text-center'>{recurit.caption}</h1>
                    <ul className='flex items-center gap-3 sm:text-xl text-base md:mt-16 mt-4'>
                        <li className="relative hover:text-primary after:absolute after:h-[85%] after:w-[1px] after:bg-white after:right-0 after:bottom-0"><NavLink className='px-3' to="/">HOME</NavLink></li>
                        <li className='flex items-center gap-2'>{recurit.name && recurit.name.toUpperCase()}</li>
                    </ul>
                </div>
            </section>
            <section className="py-12">
                <div className="container">
                    <div className="flex md:flex-row flex-col justify-between gap-6">
                        <div className='flex flex-col items-start md:w-1/2 w-full'>
                            <h2 className="lg:text-4xl sm:text-3xl text-2xl font-bold mb-8 relative after:absolute after:w-[100%] after:h-[5px] after:bg-red-600 after:content-[''] after:bottom-[-8px] after:rounded-sm after:left-0 before:absolute before:bg-white before:content-[''] before:h-[5px] before:w-[5px] before:bottom-[-8px] before:z-10 animate" 
                            data-aos="fade-up" data-aos-duration="1000" data-aos-once='true'>{recurit.title}</h2>
                            <div className='bg-gray-100 text-gray-700 p-3 w-full' data-aos="fade-right" data-aos-duration="1000" data-aos-once='true'>
                                {/* <ul className='sm:text-base text-sm'>
                                    <li className='flex items-center gap-2'>
                                        <i className="fa-solid fa-check"></i>
                                        <p>Advertisement</p>
                                    </li>
                                    <li className='flex items-center gap-2'>
                                        <i className="fa-solid fa-check"></i>
                                        <p>Legal Documentation & Registration</p>
                                    </li>
                                    <li className='flex items-center gap-2'>
                                        <i className="fa-solid fa-check"></i>
                                        <p>Prepares Schedule of Interview Dates</p>
                                    </li>
                                    <li className='flex items-center gap-2'>
                                        <i className="fa-solid fa-check"></i>
                                        <p>Offer Letters, Medical & Relevant Documents</p>
                                    </li>
                                    <li className='flex items-center gap-2'>
                                        <i className="fa-solid fa-check"></i>
                                        <p>Deployment & Begins Deployment Process</p>
                                    </li>
                                    <li className='flex items-center gap-2'>
                                        <i className="fa-solid fa-check"></i>
                                        <p>Visa, Other Processes & Orientation</p>
                                    </li>
                                    <li className='flex items-center gap-2'>
                                        <i className="fa-solid fa-check"></i>
                                        <p>Employment Contract Signing</p>
                                    </li>
                                    <li className='flex items-center gap-2'>
                                        <i className="fa-solid fa-check"></i>
                                        <p>Pre-Departure Orientation</p>
                                    </li>
                                    <li className='flex items-center gap-2'>
                                        <i className="fa-solid fa-check"></i>
                                        <p>Departure</p>
                                    </li>
                                </ul> */}
                                <p dangerouslySetInnerHTML={{__html:recurit.short_desc}}></p>
                            </div>
                        </div>
                        <div className='md:w-1/2 w-full'>
                            <img src={recurit.bannerimage} alt="recruitment-process" data-aos="zoom-in" data-aos-duration="1000" data-aos-once='true' />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default RecruitmentProcess;
