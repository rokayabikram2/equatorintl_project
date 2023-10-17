import React, { useEffect, useRef } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import './App.css';
import Footer from './components/Footer';
import GoToTopButton from './components/GoToTopButton';
import Header from './components/Header';
import Contact from './pages/contact/Contact';
import Documentation from './pages/documentation/Documentation';
import Gallery from './pages/gallery/Gallery';
import Homepage from './pages/home/Homepage';
import JobSector from './pages/jobSectors/JobSector';
import Apply from './pages/jobApply/Apply';
import AboutCompany from './pages/about/AboutCompany';
import RecruitmentProcess from './pages/about/RecruitmentProcess';
import MdMessage from './pages/about/MdMessage';
import OrganizationChart from './pages/home/OrganizationChart';
import LegalDocument from './pages/home/LegalDocument';
import WhyChooseUs from './pages/about/WhyChooseUs';
import MissionVisionDetail from './pages/home/MissionVisionDetail';
import NewspaperVacancy from './pages/newspaper-vacancy/NewspaperVacancy';
import AboutNepal from './pages/about/AboutNepal';
import CurrentDemand from './pages/home/CurrentDemand';
import JobDescription from './pages/jobSectors/JobDescription';
import ScrollToTop from './components/ScrollToTop';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const animatedRef = useRef(false);
  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      const disableValue = windowWidth <= 600 ? 0 : 600; // Change the threshold as needed
      Aos.init({
        disable: window.innerWidth <= 600 ? true : disableValue
      });
    };
    if (!animatedRef.current) {
      handleResize(); // Initial setup
      animatedRef.current = true;
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route exact path='/' Component={Homepage} />
          <Route exact path='JobSector/:title' Component={JobDescription} />
          <Route exact path='/NewspaperVacancy' Component={NewspaperVacancy} />
          <Route exact path='/MissionVision/:id' Component={MissionVisionDetail} />
          <Route exact path='/Apply' Component={Apply} />
          <Route exact path='/OrganizationChart' Component={OrganizationChart} />
          <Route exact path='/LegalDocument' Component={LegalDocument} />
          <Route exact path='/CurrentDemand' Component={CurrentDemand} />
          <Route exact path='/AboutCompany' Component={AboutCompany} />
          <Route exact path='/AboutNepal' Component={AboutNepal} />
          <Route exact path='/MdMessage' Component={MdMessage} />
          <Route exact path='/RecruitmentProcess' Component={RecruitmentProcess} />
          <Route exact path='/WhyChooseUs' Component={WhyChooseUs} />
          <Route exact path='/JobSector' Component={JobSector} />
          <Route exact path='/Documentation' Component={Documentation} />
          <Route exact path='/Gallery' Component={Gallery} />
          <Route exact path='/Contact' Component={Contact} />
        </Routes>
        <Footer />
        <ScrollToTop />
        <GoToTopButton />
      </Router>
    </>
  )
}

export default App;
