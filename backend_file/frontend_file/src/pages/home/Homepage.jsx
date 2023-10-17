import React from 'react'
import Banner from './Banner';
import Clients from './Clients';
import Intro from './Intro';
import Link from './Link';
import MissionVision from './MissionVision';
import Testimonial from './Testimonial';
import NewsVacancy from './NewsVacancy';
import FeaturedJobs from './FeaturedJobs';

const Homepage = () => {
  return (
    <>
      <Banner />
      <Link />
      <Intro />
      <NewsVacancy />
      <FeaturedJobs />
      <MissionVision />
      <Testimonial />
      <Clients />
    </>
  )
}

export default Homepage;
