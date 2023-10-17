import React from 'react';
import { NavLink } from 'react-router-dom';

const Link = () => {
    return (
        <section>
            <div className="container flex flex-wrap">
                <div className='md:w-1/3 w-full'>
                    <NavLink className='flex justify-between items-center gap-4 bg-primary text-white py-10 px-5' to="/OrganizationChart">
                        <div className="w-1/3 relative before:absolute before:content-[''] before:w-[80px] before:h-[80px] before:border-2 before:border-dotted before:border-white before:z-10 before:top-[-20px] before:left-[-10px] before:rounded-[60px] after:absolute after:content-[''] after:w-[79px] after:h-[79px] after:top-[-18px] after:left-[-9px] after:bg-primary after:rounded-[60px] after:z-20">
                            <img className='h-16 relative z-30' src="/src/assets/images/worker.png" alt="worker" />
                        </div>
                        <div className='w-2/3'>
                            <p className='lg:text-3xl md:text-2xl text-xl font-semibold'>Organization Chart</p>
                        </div>
                    </NavLink>
                </div>
                <div className='md:w-1/3 w-full'>
                    <NavLink className='flex justify-center items-center gap-4 bg-gray-200 text-black py-10 px-5' to="/LegalDocument">
                        <div className="w-1/3 relative before:absolute before:content-[''] before:w-[80px] before:h-[80px] before:border-2 before:border-dotted before:border-white before:z-10 before:top-[-20px] before:left-[-10px] before:rounded-[60px] after:absolute after:content-[''] after:w-[79px] after:h-[79px] after:top-[-18px] after:left-[-9px] after:bg-gray-200 after:rounded-[60px] after:z-20">
                            <img className='h-16 relative z-30' src="/src/assets/images/building.png" alt="building" />
                        </div>
                        <div className='w-2/3'>
                            <p className='lg:text-3xl md:text-2xl text-xl font-semibold'>Legal Documents</p>
                        </div>
                    </NavLink>
                </div>
                <div className='md:w-1/3 w-full'>
                    <NavLink className='flex justify-center items-center gap-4 bg-primary text-white py-10 px-5' to="/CurrentDemand">
                        <div className="w-1/3 relative before:absolute before:content-[''] before:w-[80px] before:h-[80px] before:border-2 before:border-dotted before:border-white before:z-10 before:top-[-20px] before:left-[-10px] before:rounded-[60px] after:absolute after:content-[''] after:w-[79px] after:h-[79px] after:top-[-18px] after:left-[-9px] after:bg-primary after:rounded-[60px] after:z-20">
                            <img className='h-16 relative z-30' src="/src/assets/images/call.png" alt="caller" />
                        </div>
                        <div className='w-2/3'>
                            <p className='lg:text-3xl md:text-2xl text-xl font-semibold'>Current Demand</p>
                        </div>
                    </NavLink>
                </div>
            </div>
        </section>
    )
}

export default Link;
