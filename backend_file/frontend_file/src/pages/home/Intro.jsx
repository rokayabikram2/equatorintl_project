import React,{useState,useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const Intro = () => {
    const [intro, setIntro] = useState([]);

    const introData = async () => {
        try {
            const response = await axios.get(
                "http://127.0.0.1:8000/api/navigations/"
            );

            const introDatas = response.data.filter(
                (item) => item.status === "Publish" && item.page_type === "Home/Aboutus"
            );
            setIntro(introDatas);
        } catch (error) {
            console.error("Error fetching data:", error);

        }
    }

    useEffect(() => {
        introData();
    }, []);

    // console.log(intro)
    return (
        <section className='py-12'>
            {intro.map((data,index) =>(
            <div key={index} className='container flex flex-col items-center'>
                <h2 className="lg:text-4xl sm:text-3xl text-2xl font-bold mb-8 relative after:absolute after:w-[100%] after:h-[5px] after:bg-red-600 after:content-[''] after:bottom-[-8px] after:rounded-sm after:left-0 before:absolute before:bg-white before:content-[''] before:h-[5px] before:w-[5px] before:bottom-[-8px]
                 before:z-10 animate" data-aos="fade-up" data-aos-duration="1000" data-aos-once='true'>{data.name}</h2>
                <div data-aos="fade-right" data-aos-duration="1000" data-aos-once='true'>
                    <h3 className='md:text-2xl sm:text-xl text-lg font-bold'>{data.title}</h3>
                    <p className='text-gray-700 mb-5 sm:text-base text-sm' dangerouslySetInnerHTML={{__html:data.short_desc}}></p>
                    <NavLink to="/AboutCompany" className='py-3 px-4 rounded bg-red-700 bottom-10 right-2 text-white z-[9999] border border-red-700 transition-all duration-200 ease-linear hover:bg-white hover:text-gray-700'>Read More <i className="fa fa-chevron-right ms-1"></i></NavLink>
                </div>
            </div>
             ))}
        </section>
    )
}

export default Intro;
