import React,{useEffect,useState} from 'react';
// import Data from './MissionVisionData';
import { NavLink, useParams } from 'react-router-dom';
import axios from 'axios';

const MissionVisionDetail = () => {
  const { id } = useParams();
  const Id = parseInt(id);

  const [mission, setMission] = useState([]);
  const [slide,setSlide] =useState([])


  const missionData = async () => {
      try {
          const response = await axios.get(
              "http://127.0.0.1:8000/api/navigations/"
          );

          const missionDatas = response.data.filter(
              (item) => item.status === "Publish" && item.page_type === "Mission & Vision"
          );
          setMission(missionDatas.find(data => data.id === Id));
          
          const sliderDatas = response.data.filter(
                (item) => item.status === "Publish" && item.page_type === "M&V/Slider"
          );
          setSlide(sliderDatas[0]);


      } catch (error) {
          console.error("Error fetching data:", error);

      }
  }

  useEffect(() => {
      missionData();
  }, []);



  return (
    <>
      <section className='sm:py-24 py-16 relative'>
        <img className='absolute w-full h-full top-0 left-0 object-cover' src={slide.slider_image} alt="background" />
        <div className='absolute w-full h-full top-0 left-0 bg-black opacity-50'></div>
        <div className='container flex md:flex-row flex-col justify-between items-center relative text-white z-10'>
          <h1 className='lg:text-5xl md:text-4xl sm:text-3xl text-2xl font-semibold text-center'>{slide.caption}</h1>
          <ul className='flex items-center gap-3 sm:text-xl text-base md:mt-16 mt-4'>
            <li className="relative hover:text-primary after:absolute after:h-[85%] after:w-[1px] after:bg-white after:right-0 after:bottom-0"><NavLink className='px-3' to="/">HOME</NavLink></li>
            <li className='flex items-center gap-2'>{mission.name && mission.name.toUpperCase()}</li>
          </ul>
        </div>
      </section>
      <section className='py-12'>
        <div className="container">
          <div className="flex md:flex-row flex-col gap-6">
            <div className='md:w-1/2 w-full md:order-1 order-2'>
              <img className='h-[300px] w-full object-cover' src={mission.bannerimage} alt={mission.name} data-aos="zoom-in" data-aos-duration="1000" data-aos-once='true' />
            </div>
            <div className='flex flex-col md:items-start items-center md:w-1/2 w-full md:order-2 order-1'>
              <h2 className="lg:text-4xl sm:text-3xl text-2xl font-bold mb-8 relative after:absolute after:w-[100%] after:h-[5px] after:bg-red-600 after:content-[''] after:bottom-[-8px] after:rounded-sm after:left-0 before:absolute before:bg-white before:content-[''] before:h-[5px] before:w-[5px] before:bottom-[-8px] before:z-10 animate" 
              data-aos="fade-up" data-aos-duration="1000" data-aos-once='true'>{mission.name}</h2>
              <p className='p-2 bg-gray-100 text-gray-700 sm:text-base text-sm' data-aos="fade-up" data-aos-duration="1000" data-aos-once='true' dangerouslySetInnerHTML={{__html:mission.short_desc}}></p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default MissionVisionDetail;
