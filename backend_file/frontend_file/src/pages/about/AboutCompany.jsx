import React ,{useState,useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const AboutCompany = () => {
    const [company, setCompany] = useState([]);

    const comapnyData = async () => {
        try {
            const response = await axios.get(
                "http://127.0.0.1:8000/api/navigations/"
            );

            const companyDatas = response.data.filter(
                (item) => item.status === "Publish" && item.page_type === "AboutUs"
            );
            setCompany(companyDatas[0]);
        } catch (error) {
            console.error("Error fetching data:", error);

        }
    }

    useEffect(() => {
        comapnyData();
    }, []);
    return (
        <>
            <section className='sm:py-24 py-16 relative'>
                <img className='absolute w-full h-full top-0 left-0 object-cover' src={company.slider_image} alt="background" />
                <div className='absolute w-full h-full top-0 left-0 bg-black opacity-50'></div>
                <div className='container flex md:flex-row flex-col justify-between items-center relative text-white z-10'>
                    <h1 className='lg:text-5xl md:text-4xl sm:text-3xl text-2xl font-semibold text-center'>{company.caption}</h1>
                    <ul className='flex items-center gap-3 sm:text-xl text-base md:mt-16 mt-4'>
                        <li className="relative hover:text-primary after:absolute after:h-[85%] after:w-[1px] after:bg-white after:right-0 after:bottom-0"><NavLink className='px-3' to="/">HOME</NavLink></li>
                        <li className='flex items-center gap-2'>{company.name && company.name.toUpperCase()}</li>
                    </ul>
                </div>
            </section>
            <section className="py-12">
                <div className="container">
                    <div className="flex lg:flex-row flex-col justify-between lg:gap-4 gap-6">
                        <div className='flex flex-col items-start lg:w-8/12'>
                            <h2 className="lg:text-4xl sm:text-3xl text-2xl font-bold mb-8 relative after:absolute after:w-[100%] after:h-[5px] after:bg-red-600 after:content-[''] after:bottom-[-8px] after:rounded-sm after:left-0 before:absolute before:bg-white before:content-[''] before:h-[5px] before:w-[5px] before:bottom-[-8px] 
                            before:z-10 animate" data-aos="fade-up" data-aos-duration="1000" data-aos-once='true'>{company.title}</h2>
                            <div className='text-gray-700 sm:text-base text-sm w-full' data-aos="fade-right" data-aos-duration="1000" data-aos-once='true'>
                                <p className='mb-2' dangerouslySetInnerHTML={{__html:company.short_desc}}></p>
                            </div>
                        </div>
                        <div className='lg:w-4/12 flex items-center'>
                            <img className='h-96 w-full object-cover rounded-se-3xl rounded-es-3xl' src={company.bannerimage} alt="about-company" data-aos="zoom-in" data-aos-duration="1000" data-aos-once='true'/>
                        </div>
                    </div>
                </div>
            </section>
            <section className='pb-12'>
                <div className="container">
                    <div className='flex flex-col items-start'>
                        <h2 className="lg:text-4xl sm:text-3xl text-2xl font-bold mb-8 relative after:absolute after:w-[100%] after:h-[5px] after:bg-red-600 after:content-[''] after:bottom-[-8px] after:rounded-sm after:left-0 before:absolute before:bg-white before:content-['']
                         before:h-[5px] before:w-[5px] before:bottom-[-8px] before:z-10 animate" data-aos="fade-up" data-aos-duration="1000" data-aos-once='true'>{company.meta_title}</h2>
                        <div className='text-gray-700 bg-gray-100 p-3' data-aos="fade-right" data-aos-duration="1000" data-aos-once='true'>
                            <p dangerouslySetInnerHTML={{__html:company.desc}}></p>
                            {/* <ul className='sm:text-base text-sm'>

                                <li className='flex items-center gap-2'>
                                    <i className="fa-solid fa-check"></i>
                                    <p>To Highly-skilled, Skilled, Semi-skilled as well as Non-skilled people abroad.</p>
                                </li>
                                <li className='flex items-center gap-2'>
                                    <i className="fa-solid fa-check"></i>
                                    <p>To find the right candidate according to the requirement of the employer company</p>
                                </li>
                                <li className='flex items-center gap-2'>
                                    <i className="fa-solid fa-check"></i>
                                    <p>To find right job abroad according to capability of jobseekers.</p>
                                </li>
                                <li className='flex items-center gap-2'>
                                    <i className="fa-solid fa-check"></i>
                                    <p>To support the national economy by incresing foreign remittance.</p>
                                </li>
                                <li className='flex items-center gap-2'>
                                    <i className="fa-solid fa-check"></i>
                                    <p>To extend good relationship with the recruiting company abroad by providing them manpower as per their recriutment</p>
                                </li>
                            </ul> */}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AboutCompany;
