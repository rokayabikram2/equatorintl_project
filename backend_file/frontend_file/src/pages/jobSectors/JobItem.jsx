import React from 'react';
import { NavLink } from 'react-router-dom';

const JobItem = ({ jobData }) => {
    return (
        <div  data-aos="zoom-in" data-aos-duration="1000" data-aos-once='true'>
            <NavLink to={`/JobSector/${jobData.title}`} className="block relative after:absolute after:inset-0 after:bg-primary after:content-['View_Details'] after:text-2xl after:flex after:justify-center after:items-center after:text-white after:opacity-0 hover:after:opacity-60 after:transition-all after:duration-300 after:ease-linear">
                <img className='h-60 w-full object-cover' src={jobData.thumbnailImage} alt="image" />
            </NavLink>
            <h4 className='text-xl font-medium text-center mt-1'>{jobData.title}</h4>
        </div>
    )
}

export default JobItem;