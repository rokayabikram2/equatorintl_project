import React, { useState,useRef } from 'react';
// import emailjs from '@emailjs/browser';
import { NavLink } from 'react-router-dom';
import countryList from 'react-select-country-list';
import axios from 'axios';


// emailjs.init("rokayabikram2@gmail.com");

const Apply = () => {
    const initialFormData = {
        name: '',
        mobile: '',
        permanentAddress: '',
        currentAddress: '',
        email: '',
        country: '',
        message: '',
        cv: null,
        photo: null,
        passport: null,
        certificate: null,
    }
    const countries = countryList().getData();
    

    const [formData, setFormData] = useState(initialFormData);

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    const handleFileChange = (e) => {
      const { name, files } = e.target;
      setFormData({
        ...formData,
        [name]: files[0], // Assuming you only allow selecting one file
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        // Create a FormData object to send files and other form data
        const formDataToSend = new FormData();
  
        // Iterate over the form data and append it to formDataToSend
        for (const fieldName in formData) {
          const fieldData = formData[fieldName];
  
          if (fieldData instanceof File) {
            // If the field is a File (e.g., file input)
            formDataToSend.append(fieldName, fieldData, fieldData.name); // Append the file with its name
          } else {
            // If the field is not a File (e.g., text input)
            formDataToSend.append(fieldName, fieldData); // Append other form fields
          }
        }
  
        // Send the form data to the backend using Axios
        const response = await axios.post("http://127.0.0.1:8000/api/applies/",
          formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data', // Important for sending files
          },
        });
  
        // Reset the form after successful submission
        alert('Form submitted successfully!');
        window.location.reload()

      } catch (error) {
        // Handle any errors (e.g., show an error message)
        console.error(error);
        alert('An error occurred while submitting the form.');
      }
    };

    // const form = useRef();

    // const sendEmail = (e) => {
    // e.preventDefault();

    // emailjs.sendForm(
    //     'service_0bgzrv6', 
    //     'template_nv6ng38',
    //      form.current, '10LJ9xAXo8f4SKeW_')
    //   .then((result) => {
    //       console.log(result.text);
    //       console.log("message sent");

    //   }, (error) => {
    //       console.log(error.text);
    //   });
    //   alert('Your Form submited')
    //   window.location.reload()

    // }
  
    return (
        <>
            <section className='sm:py-24 py-16 relative'>
                <img className='absolute w-full h-full top-0 left-0 object-cover' src="/src/assets/images/background.webp" alt="background" />
                <div className='absolute w-full h-full top-0 left-0 bg-black opacity-50'></div>
                <div className='container flex md:flex-row flex-col justify-between items-center relative text-white z-10'>
                    <h1 className='lg:text-5xl md:text-4xl sm:text-3xl text-2xl font-semibold text-center'>Equator International</h1>
                    <ul className='flex items-center gap-3 sm:text-xl text-base md:mt-16 mt-4'>
                        <li className="relative hover:text-primary after:absolute after:h-[85%] after:w-[1px] after:bg-white after:right-0 after:bottom-0"><NavLink className='px-3' to="/">HOME</NavLink></li>
                        <li>APPLY NOW</li>
                    </ul>
                </div>
            </section>
            <section className="py-12">
                <div className="container flex flex-col items-center">
                    <h2 className="lg:text-4xl sm:text-3xl text-2xl font-bold mb-8 relative after:absolute after:w-[100%] after:h-[5px] after:bg-red-600 after:content-[''] after:bottom-[-8px] after:rounded-sm after:left-0 before:absolute before:bg-white before:content-[''] before:h-[5px] before:w-[5px] before:bottom-[-8px] before:z-10 animate" data-aos="fade-up" data-aos-duration="1000" data-aos-once='true'>Apply Now</h2>
                    <div className='w-full shadow-[0_0_20px_1px_rgba(0,0,0,0.1)] p-6 rounded-lg'>

                        <form  onSubmit={handleSubmit}>
                            <div className='flex md:flex-row flex-col justify-between items-center gap-4'>
                                <div className='flex flex-col items-start w-full' data-aos="fade-right" data-aos-duration="1000" data-aos-once='true'>
                                    <label className='mb-1 relative' htmlFor="name">Name<i className="fa-sharp fa-solid fa-star absolute top-1.5 right-[-8px] text-red-600" style={{ fontSize: '5px' }}></i></label>
                                    <input className='p-3 bg-gray-200 rounded focus:outline outline-red-600 w-full' type="text" id='name' name='name' placeholder='Your Name' required value={formData.name}
                                        onChange={handleInputChange} />
                                </div>
                                <div className='flex flex-col items-start w-full' data-aos="fade-right" data-aos-duration="1000" data-aos-once='true'>
                                    <label className='mb-1 relative' htmlFor="mobile">Mobile No.<i className="fa-sharp fa-solid fa-star absolute top-1.5 right-[-8px] text-red-600" style={{ fontSize: '5px' }}></i></label>
                                    <input className='p-3 bg-gray-200 rounded focus:outline outline-red-600 w-full' type="tel" id='mobile' name='mobile' placeholder='Your Mobile No.' required value={formData.mobile}
                                        onChange={handleInputChange} />
                                </div>
                            </div>
                            <div className='flex md:flex-row flex-col justify-between items-center gap-4 my-6'>
                                <div className='flex flex-col items-start w-full' data-aos="fade-right" data-aos-duration="1000" data-aos-once='true'>
                                    <label className='mb-1 relative' htmlFor="permanent-address">Permanent Address<i className="fa-sharp fa-solid fa-star absolute top-1.5 right-[-8px] text-red-600" style={{ fontSize: '5px' }}></i></label>
                                    <input className='p-3 bg-gray-200 rounded focus:outline outline-red-600 w-full' type="text" id='permanent-address' name='permanentAddress' placeholder='Permanent Address' required value={formData.permanentAddress} onChange={handleInputChange} />
                                </div>
                                <div className='flex flex-col items-start w-full' data-aos="fade-right" data-aos-duration="1000" data-aos-once='true'>
                                    <label className='mb-1 relative' htmlFor="current-address">Current Address<i className="fa-sharp fa-solid fa-star absolute top-1.5 right-[-8px] text-red-600" style={{ fontSize: '5px' }}></i></label>
                                    <input className='p-3 bg-gray-200 rounded focus:outline outline-red-600 w-full' type="text" id='current-address' name='currentAddress' placeholder='Current Address' required value={formData.currentAddress} onChange={handleInputChange} />
                                </div>
                            </div>
                            <div className='flex md:flex-row flex-col justify-between items-center gap-4 my-6'>
                                <div className='flex flex-col items-start w-full' data-aos="fade-right" data-aos-duration="1000" data-aos-once='true'>
                                    <label className='mb-1 relative' htmlFor="email">Email<i className="fa-sharp fa-solid fa-star absolute top-1.5 right-[-8px] text-red-600" style={{ fontSize: '5px' }}></i></label>
                                    <input className='p-3 bg-gray-200 rounded focus:outline outline-red-600 w-full' type="email" id='email' name='email' placeholder='Your Email' required value={formData.email}
                                        onChange={handleInputChange} />
                                </div>
                                <div className='flex flex-col items-start w-full' data-aos="fade-right" data-aos-duration="1000" data-aos-once='true'>
                                    <label className='mb-1' htmlFor="country">Select Country</label>
                                    <select className='p-3 bg-gray-200 rounded focus:outline outline-red-600 w-full' id='country' name='country' value={formData.country}
                                        onChange={handleInputChange}>
                                        {countries.map((country) => (
                                            <option key={country.value} value={country.value}>
                                                {country.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className='flex flex-col items-start' data-aos="zoom-in" data-aos-duration="1000" data-aos-once='true'>
                                <label className='mb-1' htmlFor="message">Message</label>
                                <textarea className='p-3 bg-gray-200 focus:outline outline-red-600 w-full' type="text" id='message' name='message' rows='5' placeholder='Your Message' value={formData.message}
                                    onChange={handleInputChange} />
                            </div>
                            <div className='flex md:gap-0 gap-4 md:flex-row flex-col justify-between flex-wrap my-6'>
                                <div className='flex flex-col items-start md:w-1/3 w-full' data-aos="fade-right" data-aos-duration="1000" data-aos-once='true'>
                                    <label htmlFor="cv" className='mb-1'>Your CV</label>
                                    <input type="file" id='cv' name='cv' className='text-gray-700 w-full' onChange={handleFileChange} />
                                </div>
                                <div className='flex flex-col items-start md:w-1/3 w-full' data-aos="fade-right" data-aos-duration="1000" data-aos-once='true'>
                                    <label htmlFor="photo" className='mb-1'>Your passport sized photo</label>
                                    <input type="file" id='photo' name='photo' className='text-gray-700 w-full' onChange={handleFileChange} />
                                </div>
                                <div className='flex flex-col items-start md:w-1/3 w-full' data-aos="fade-right" data-aos-duration="1000" data-aos-once='true'>
                                    <label htmlFor="passport" className='mb-1'>Your scaned passport</label>
                                    <input type="file" id='passport' name='passport' className='text-gray-700 w-full' onChange={handleFileChange} />
                                </div>
                                <div className='flex flex-col items-start md:w-1/3 w-full md:mt-4' data-aos="fade-right" data-aos-duration="1000" data-aos-once='true'>
                                    <label htmlFor="certificate" className='mb-1'>Your academic certificate</label>
                                    <input type="file" id='certificate' name='certificate' className='text-gray-700 w-full' onChange={handleFileChange} />

                                </div>
                            </div>
                            <div className='flex justify-center'>
                                <input className='bg-red-600 text-white py-2 px-3 rounded border border-red-600 transition-all duration-200 ease-linear hover:bg-white hover:text-gray-700 cursor-pointer mt-6' type="submit" value='SUBMIT' />
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Apply;