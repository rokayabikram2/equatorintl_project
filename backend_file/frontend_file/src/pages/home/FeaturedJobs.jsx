import React, { useEffect, useState } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import JobItem from '../jobSectors/JobItem';
import axios from 'axios';

const FeaturedJobs = () => {
    const [job, setJob] = useState([]);
    const [slide,setSlide] =useState([]);
  
  
    const jobData = async () => {
        try {
            const response = await axios.get(
                "http://127.0.0.1:8000/api/navigations/"
            );
            let newJObD=[...response.data]
            newJObD = newJObD.reverse()
            const jobDatas = newJObD.filter(
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


    const options = {
        items: 3,
        loop: true,
        autoplay: true,
        dots: false,
        autoplayTimeout: 6000,
        margin: 15,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            800: {
                items: 3
            }
        }
    };
    return (
        <section className='py-12 relative'>
            <img className='absolute inset-0 w-full h-full object-cover' src={slide.back_image} alt="background" />
            <div className='absolute inset-0 w-full h-full bg-black opacity-70'></div>
            <div className="container flex flex-col items-center relative z-10 text-red-600">
                <h2 className="lg:text-4xl sm:text-3xl text-2xl font-bold mb-8 text-white relative after:absolute after:w-[100%] after:h-[5px] after:bg-red-600 after:content-[''] after:bottom-[-8px] after:rounded-sm after:left-0 before:absolute before:bg-white before:content-[''] before:h-[5px] before:w-[5px] before:bottom-[-8px] before:z-10 animate" 
                data-aos="fade-up" data-aos-duration="1000" data-aos-once='true'>{slide.meta_title}</h2>
                <OwlCarousel className="owl-theme" {...options}>
                    {Object.values(jobFolder).map((jobData) => (
                        <JobItem key={jobData.title} jobData={jobData} />
                    ))}
                </OwlCarousel>
            </div>
        </section>
    )
}

export default FeaturedJobs;