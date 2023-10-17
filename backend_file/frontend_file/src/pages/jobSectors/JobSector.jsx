import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import JobItem from './JobItem';
import axios from 'axios';

const JobSector = () => {
    const [job, setJob] = useState([]);
    const [slide,setSlide] =useState([])
  
  
    const jobData = async () => {
        try {
            const response = await axios.get(
                "http://127.0.0.1:8000/api/navigations/"
            );
            let newJob=[...response.data]
            newJob=newJob.reverse()
            const jobDatas = newJob.filter(
                (item) => item.status === "Publish" && item.page_type === "Job Sectors"
            );
            setJob(jobDatas);
            
            const sliderDatas = response.data.filter(
                  (item) => item.status === "Publish" && item.page_type === "Job Sector/slider"
            );
            setSlide(sliderDatas[0]);
  
  
        } catch (error) {
            console.error("Error fetching data:", error);
  
        }
    }
  
    useEffect(() => {
        jobData();
    }, []);

    // const jobData = Data;
    const jobFolder = {};
    job.forEach((dataItem) => {
        if (!jobFolder[dataItem.title]) {
            jobFolder[dataItem.title] = {
                title: dataItem.title,
                thumbnailImage: dataItem.bannerimage,
                allData: [dataItem],
            };
        } else {
            jobFolder[dataItem.title].allData.push(dataItem);
        }
    });
    return (
        <>
            <section className='sm:py-24 py-16 relative'>
                <img className='absolute w-full h-full top-0 left-0 object-cover' src={slide.slider_image} alt="background" />
                <div className='absolute w-full h-full top-0 left-0 bg-black opacity-50'></div>
                <div className='container flex md:flex-row flex-col justify-between items-center relative text-white z-10'>
                    <h1 className='lg:text-5xl md:text-4xl sm:text-3xl text-2xl font-semibold text-center'>{slide.caption}</h1>
                    <ul className='flex items-center gap-3 sm:text-xl text-base md:mt-16 mt-4'>
                        <li className="relative hover:text-primary after:absolute after:h-[85%] after:w-[1px] after:bg-white after:right-0 after:bottom-0"><NavLink className='px-3' to="/">HOME</NavLink></li>
                        <li>{slide.title && slide.title.toUpperCase()}</li>
                    </ul>
                </div>
            </section>
            <section className="py-12">
                <div className="container flex flex-col items-center">
                    <h2 className="lg:text-4xl sm:text-3xl text-2xl font-bold mb-8 relative after:absolute after:w-[100%] after:h-[5px] after:bg-red-600 after:content-[''] after:bottom-[-8px] after:rounded-sm after:left-0 before:absolute before:bg-white before:content-[''] before:h-[5px] before:w-[5px] before:bottom-[-8px] before:z-10 animate"
                     data-aos="fade-up" data-aos-duration="1000" data-aos-once='true'>{slide.title}</h2>
                    <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5'>
                        {Object.values(jobFolder).map((jobData) => (
                            <JobItem key={jobData.title} jobData={jobData} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default JobSector;