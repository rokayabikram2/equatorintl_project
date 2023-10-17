import React, {useState,useEffect} from 'react';
import { NavLink } from 'react-router-dom';
// import Data from './MissionVisionData';
import axios from 'axios';

const MissionVision = () => {
    const [mission, setMission] = useState([]);

    const missionData = async () => {
        try {
            const response = await axios.get(
                "http://127.0.0.1:8000/api/navigations/"
            );

            const missionDatas = response.data.filter(
                (item) => item.status === "Publish" && item.page_type === "Mission & Vision"
            );
            setMission(missionDatas);
            
        } catch (error) {
            console.error("Error fetching data:", error);

        }
    }

    useEffect(() => {
        missionData();
    }, []);
    return (
        <section className='py-12'>
            <div className="container grid md:grid-cols-3 grid-cols-1 gap-4">
                {mission.map((dataItem) => (
                    <div key={dataItem.id} className='text-white' data-aos="zoom-in" data-aos-duration="1000" data-aos-once='true'>
                        <NavLink to={`/MissionVision/${dataItem.id}`} className='block p-4 relative'>
                            <img className='absolute w-full h-full top-0 left-0 object-cover' src={dataItem.back_image} alt="mission" />
                            <div className='absolute w-full h-full top-0 left-0 bg-black opacity-70'></div>
                            <div className='flex flex-col items-center relative z-10'>
                                <span className='flex flex-col items-center'>
                                    <img className='w-2/3' src={dataItem.icon_image} alt="target" />
                                    <h4 className='sm:text-2xl text-xl my-2 font-medium'>{dataItem.name}</h4>
                                </span>
                                <p className='text-center sm:text-base text-sm'dangerouslySetInnerHTML={{__html:dataItem.short_desc.substring(0,150)}}></p>
                            </div>
                        </NavLink>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default MissionVision;
