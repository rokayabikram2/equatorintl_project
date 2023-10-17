import React, { useEffect, useState } from 'react';
import logo from '/src/assets/images/logo.png';
import { NavLink, useLocation } from 'react-router-dom';
import axios from 'axios';


const Header = () => {
    const [showAboutMenu, setShowAboutMenu] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeBlock, setActiveBlock] = useState(0);
    const [showSidebar, setShowSidebar] = useState(false);


    const location = useLocation();
    const [data, setData] = useState([])

    // nav dynamic
    const [parentId, setParentId] = useState(null);

    const [navigation, setNavigation] = useState([]);



    const headerData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/globals/');
            // Handle the response data here
            response.data && setData(response.data[0]);

            // Fetch navigation data based on parentId and page_type
            const navigationResponse = await axios.get(
                "http://127.0.0.1:8000/api/navigations/",
                {
                    params: {
                        parent_id: parentId,      // Set the parentId as a parameter
                        page_type: "Group"        // Filter by page_type
                    }
                }
            );

            if (navigationResponse.data) {
                const navigationData = navigationResponse.data.filter(
                    (item) => item.status === "Publish"
                );

                setNavigation(navigationData);
            }


        }
        catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        // Axios GET request to fetch data
        headerData();
    }, [parentId]);
  


    useEffect(() => {
        const determineActiveBlock = () => {
            switch (location.pathname) {
                case "/":
                    return 0;
                case "/AboutCompany":
                    return 1;
                case "/AboutNepal":
                    return 1;
                case "/MdMessage":
                    return 1;
                case "/RecruitmentProcess":
                    return 1;
                case "/WhyChooseUs":
                    return 1;
                case "/JobSector":
                    return 2;
                case "/Documentation":
                    return 3;
                case "/Gallery":
                    return 4;
                case "/Contact":
                    return 5;
                default:
                    return -1;
            }
        };

        setActiveBlock(determineActiveBlock());
    }, [location.pathname]);

    const handleButtonClick = (index) => {
        setActiveBlock(index)
    }

    const handleScroll = () => {
        const scrollTop = window.scrollY;
        if (scrollTop > 0) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const toggleAboutMenu = () => {
        setShowAboutMenu(!showAboutMenu);
    };

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
        if (!showSidebar) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    };

    const closeSidebar = () => {
        setShowSidebar(false);
        setShowAboutMenu(false);
        document.body.classList.remove('overflow-hidden');
    }

    return (
        <>
            <div className='bg-primary py-3 text-white md:block hidden'>
                <div className="container">
                    <div className='flex justify-between items-center xl:w-7/12 lg:w-9/12 w-full'>
                        <p>Gov.Lic.No.{data.Sitelicence}</p>
                        <a href="tel:14986469"><i className="fa-solid fa-phone me-1"></i>{data.SiteContact}</a>
                        <a href="mailto:equator746@gmail.com" ><i className="fa-solid fa-envelope me-1"></i>{data.SiteEmail}</a>
                    </div>
                </div>
            </div>
            <div className={`bg-white sticky top-0 left-0 w-full z-50 ${scrolled ? 'shadow-[0_0_10px_2px_rgba(0,0,0,0.2)]' : ''}`}>
                <div className="container flex justify-between gap-4 items-center py-2">
                    <div className='md:w-1/5 w-2/5'>
                        <NavLink to="/" className='w-full'>
                            <img className='w-full' src={data.logo} alt="logo" />
                        </NavLink>
                    </div>
                    <div onClick={toggleSidebar} className='md:hidden'>
                        <i className="fa-solid fa-bars text-xl"></i>
                    </div>
                    <div className={`absolute top-[0px] right-0 opacity-20 h-screen w-full bg-black  ${showSidebar ? 'block' : 'hidden'}`} onClick={toggleSidebar}></div>
                    <div className={`xl:w-7/12 lg:w-8/12 md:w-9/12 md:bg-white md:text-black md:h-auto md:p-0 md:block md:relative ${showSidebar ? 'flex flex-col items-start gap-6 absolute bg-primary text-white top-0 right-0 h-screen w-[220px] p-5' : 'hidden'}`}>
                        <div onClick={toggleSidebar} className='md:hidden ms-auto'>
                            <i className="fa-solid fa-xmark text-xl"></i>
                        </div>
                        <nav className='md:w-auto w-full'>
                            <ul className='flex md:flex-row flex-col justify-between md:items-center items-start gap-4 lg:text-lg font-medium'>
                                <li onClick={() => handleButtonClick(0)} className={`md:w-auto w-full relative md:after:absolute md:after:h-[2px] md:after:w-0 md:after:content-[''] md:after:bg-red-600 md:after:bottom-0 md:after:left-[50%] md:after:transition-all md:after:duration-200 md:after:ease-linear md:hover:after:w-full
                                 md:hover:after:left-0 ${activeBlock === 0 ? "md:before:absolute md:before:h-[2px] md:before:w-full md:before:content-[''] md:before:bg-red-600 md:before:bottom-0 md:before:left-0" : ''}`}>
                                    <NavLink onClick={closeSidebar} to="/" className='w-full block' >Home</NavLink>
                                </li>
                                {navigation.map((nav) => (
                                    <React.Fragment key={nav.id}>
                                        {nav.id !== 1 && (
                                            <React.Fragment>
                                                {nav.id === 55 && (
                                                    <li onClick={() => handleButtonClick(1)}
                                                        onMouseEnter={() => { if (window.innerWidth > 768) { setShowAboutMenu(true) } }} onMouseLeave={() => { if (window.innerWidth > 768) { setShowAboutMenu(false) } }} className={`relative md:w-auto w-full md:py-3 md:h-auto ${showAboutMenu ? 'h-[210px]' : ''}`}>
                                                        <button className={`relative flex items-center justify-between w-full md:after:absolute md:after:h-[2px] md:after:w-0 md:after:bg-red-600 md:after:content-[''] md:after:bottom-0 md:after:left-[50%] md:after:transition-all md:after:duration-200 md:after:ease-linear md:hover:after:w-full 
                                                        md:hover:after:left-0 ${activeBlock === 1 ? "md:before:absolute md:before:h-[2px] md:before:w-full md:before:content-[''] md:before:bg-red-600 md:before:bottom-0 md:before:left-0" : ''}`} onClick={toggleAboutMenu}>{nav.name}<i className="fa-solid fa-chevron-down md:before:hidden"></i></button>
                                                        {showAboutMenu && <div className={`md:bg-white md:text-black text-gray-200 ${showAboutMenu ? 'block' : 'hidden'} md:absolute md:top-[48px] md:left-[-20px] md:border`}>
                                                            <div className="flex flex-col w-[210px] h-full">
                                                                {navigation[navigation?.findIndex(item => item?.id === 58)] && (
                                                                    <NavLink onClick={closeSidebar} className="p-2 md:border-b md:hover:text-red-600" to="/AboutCompany">{navigation[navigation?.findIndex(item => item?.id === 58)]?.name}</NavLink>

                                                                )}

                                                                {navigation[navigation?.findIndex(item => item?.id === 59)] && (
                                                                    <NavLink onClick={closeSidebar} className="p-2 md:border-b md:hover:text-red-600" to="/AboutNepal">{navigation[navigation?.findIndex(item => item?.id === 59)]?.name}</NavLink>

                                                                )}

                                                                {navigation[navigation?.findIndex(item => item?.id === 68)] && (
                                                                    <NavLink onClick={closeSidebar} className="p-2 md:border-b md:hover:text-red-600" to="/MdMessage">{navigation[navigation?.findIndex(item => item?.id === 68)]?.name}</NavLink>


                                                                )}

                                                                {navigation[navigation?.findIndex(item => item?.id === 69)] && (
                                                                    <NavLink onClick={closeSidebar} className="p-2 md:border-b md:hover:text-red-600" to="/RecruitmentProcess">{navigation[navigation?.findIndex(item => item?.id === 69)]?.name}</NavLink>

                                                                )}

                                                                {navigation[navigation?.findIndex(item => item?.id === 70)] && (
                                                                    <NavLink onClick={closeSidebar} className="p-2 md:border-b md:hover:text-red-600" to="/WhyChooseUs">{navigation[navigation?.findIndex(item => item?.id === 70)]?.name}</NavLink>

                                                                )}

                                                            </div>
                                                        </div>
                                                        }
                                                    </li>


                                                )}
                                            </React.Fragment>
                                        )}
                                    </React.Fragment>

                                ))}

                                {navigation[navigation?.findIndex(item => item?.id === 54)] && (
                                    <li onClick={() => handleButtonClick(2)} className={`relative md:w-auto w-full md:after:absolute md:after:h-[2px] md:after:w-0 md:after:bg-red-600 md:after:content-[''] md:after:bottom-0 md:after:left-[50%] md:after:transition-all md:after:duration-200 md:after:ease-linear md:hover:after:w-full md:hover:after:left-0 ${activeBlock === 2 ? "md:before:absolute md:before:h-[2px] md:before:w-full md:before:content-[''] md:before:bg-red-600 md:before:bottom-0 md:before:left-0" : ''}`}>
                                        <NavLink onClick={closeSidebar} to="/JobSector" className='block w-full'>{navigation[navigation?.findIndex(item => item?.id === 54)]?.name}</NavLink>
                                    </li>
                                )}


                                {navigation[navigation?.findIndex(item => item?.id === 78)] && (
                                    <li onClick={() => handleButtonClick(3)} className={`relative md:w-auto w-full md:after:absolute md:after:h-[2px] md:after:w-0 md:after:bg-red-600 md:after:content-[''] md:after:bottom-0 md:after:left-[50%] md:after:transition-all md:after:duration-200 md:after:ease-linear md:hover:after:w-full md:hover:after:left-0 ${activeBlock === 3 ? "md:before:absolute md:before:h-[2px] md:before:w-full md:before:content-[''] md:before:bg-red-600 md:before:bottom-0 md:before:left-0" : ''}`}>
                                        <NavLink onClick={closeSidebar} to="/Documentation" className='block w-full'>{navigation[navigation?.findIndex(item => item?.id === 78)]?.name}</NavLink>
                                    </li>
                                )}

                                {navigation[navigation?.findIndex(item => item?.id === 84)] && (
                                    <li onClick={() => handleButtonClick(4)} className={`relative md:w-auto w-full md:after:absolute md:after:h-[2px] md:after:w-0 md:after:bg-red-600 md:after:content-[''] md:after:bottom-0 md:after:left-[50%] md:after:transition-all md:after:duration-200 md:after:ease-linear md:hover:after:w-full md:hover:after:left-0 ${activeBlock === 4 ? "md:before:absolute md:before:h-[2px] md:before:w-full md:before:content-[''] md:before:bg-red-600 md:before:bottom-0 md:before:left-0" : ''}`}>
                                        <NavLink onClick={closeSidebar} to="/Gallery" className='block w-full'>{navigation[navigation?.findIndex(item => item?.id === 84)]?.name}</NavLink>
                                    </li>
                                )}


                                {navigation[navigation?.findIndex(item => item?.id === 85)] && (
                                    <li onClick={() => handleButtonClick(5)} className={`relative md:w-auto w-full md:after:absolute md:after:h-[2px] md:after:w-0 after:bg-red-600 md:after:content-[''] md:after:bottom-0 md:after:left-[50%] md:after:transition-all md:after:duration-200 md:after:ease-linear md:hover:after:w-full md:hover:after:left-0 ${activeBlock === 5 ? "md:before:absolute md:before:h-[2px] md:before:w-full md:before:content-[''] md:before:bg-red-600 md:before:bottom-0 md:before:left-0" : ''}`}>
                                        <NavLink onClick={closeSidebar} to="/Contact" className='block w-full'>{navigation[navigation?.findIndex(item => item?.id === 85)]?.name}</NavLink>
                                    </li>
                                )}


                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header;
