import React,{useState,useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const Contact = () => {
    
    const [contacts,setContacts] = useState([]);
    const [global,setGlobal] = useState([])
    const contactData= async () =>{
      try {
          const response = await axios.get(
              "http://127.0.0.1:8000/api/navigations/"
          );
          
          const contactsDatas = response.data.filter(
              (item) => item.status ==="Publish" && item.page_type ==="Contact us"
  
          );
          setContacts(contactsDatas[0]);

          const responses = await axios.get('http://127.0.0.1:8000/api/globals/');
          responses.data && setGlobal(responses.data[0]);
  
      
      }catch (error){
          console.error("Error on fetching data:",error);
  
  
      }
  
    };

    
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile : '',
    subject: '',
    message: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        const response = await axios.post(
            "http://127.0.0.1:8000/ api/contacts/",  // Update with your Django API endpoint
            formData
        );
        
        // Display success message
        // setSuccessMessage("Contact form submitted successfully!");
        alert("Contact form submitted successfully!")

        
        // Clear the form after submission
        setFormData({
            name: '',
            email: '',
            mobile: '',
            subject: '',
            message: ''
        });


    }catch (error) {
      console.error("Error on fetching data:", error);
  
      
    }
};


    useEffect(() => {
        contactData();
      
    },[]);
    return (
        <>
            {/* ---top part--- */}
            <section className='sm:py-24 py-16 relative'>
                <img className='absolute w-full h-full top-0 left-0 object-cover' src={contacts.slider_image} alt="background" />
                <div className='absolute w-full h-full top-0 left-0 bg-black opacity-50'></div>
                <div className='container flex md:flex-row flex-col justify-between items-center relative text-white z-10'>
                    <h1 className='lg:text-5xl md:text-4xl sm:text-3xl text-2xl font-semibold text-center'>{contacts.caption}</h1>
                    <ul className='flex items-center gap-3 sm:text-xl text-base md:mt-16 mt-4'>
                        <li className="relative hover:text-primary after:absolute after:h-[85%] after:w-[1px] after:bg-white after:right-0 after:bottom-0"><NavLink className='px-3' to="/">HOME</NavLink></li>
                        <li>{contacts.title && contacts.title.toUpperCase()}</li>
                    </ul>
                </div>
            </section>
            {/* ---contactForm part--- */}
            <section className='py-12'>
                <div className="container flex flex-col items-center">
                    <h2 className="lg:text-4xl sm:text-3xl text-2xl font-bold mb-8 relative after:absolute after:w-[100%] after:h-[5px] after:bg-red-600 after:content-[''] after:bottom-[-8px] after:rounded-sm after:left-0 before:absolute before:bg-white before:content-[''] before:h-[5px] 
                    before:w-[5px] before:bottom-[-8px] before:z-10 animate" data-aos="fade-up" data-aos-duration="1000" data-aos-once='true'>{contacts.title}</h2>
                    <div className='w-full'>
                        <div className='border border-black p-5 md:mb-0 mb-6' >
                            <h2 className='md:text-2xl text-xl font-semibold mb-4 text-center' data-aos="zoom-in" data-aos-duration="1000" data-aos-once='true'>SEND ENQUIRY</h2>
                            <form onSubmit={handleSubmit}>

                                <div className='flex md:flex-row flex-col justify-between items-center gap-4'>
                                    <div className='flex flex-col items-start w-full' data-aos="fade-right" data-aos-duration="1000" data-aos-once='true'>
                                        <label className='mb-1 relative' htmlFor="name">Name<i className="fa-sharp fa-solid fa-star absolute top-1.5 right-[-8px] text-red-600" style={{ fontSize: '5px' }}></i></label>
                                        <input className='p-3 bg-gray-200 rounded focus:outline outline-red-600 w-full' type="text" id='name' name='name' value={formData.name} onChange={handleInputChange} placeholder='Your Name' required />
                                    </div>
                                    <div className='flex flex-col items-start w-full' data-aos="fade-right" data-aos-duration="1000" data-aos-once='true'>
                                        <label className='mb-1 relative' htmlFor="mobile">Mobile No.<i className="fa-sharp fa-solid fa-star absolute top-1.5 right-[-8px] text-red-600" style={{ fontSize: '5px' }}></i></label>
                                        <input className='p-3 bg-gray-200 rounded focus:outline outline-red-600 w-full' type="tel" id='mobile' name='mobile' value={formData.mobile} onChange={handleInputChange} placeholder='Your Mobile No.' required />
                                    </div>
                                </div>
                                <div className='flex md:flex-row flex-col justify-between items-center gap-4 my-6' >
                                    <div className='flex flex-col items-start w-full' data-aos="fade-right" data-aos-duration="1000" data-aos-once='true'>
                                        <label className='mb-1 relative' htmlFor="email">Email<i className="fa-sharp fa-solid fa-star absolute top-1.5 right-[-8px] text-red-600" style={{ fontSize: '5px' }}></i></label>
                                        <input className='p-3 bg-gray-200 rounded focus:outline outline-red-600 w-full' type="email" id='email' name='email' value={formData.email} onChange={handleInputChange} placeholder='Your Email' required />
                                    </div>
                                    <div className='flex flex-col items-start w-full' data-aos="fade-right" data-aos-duration="1000" data-aos-once='true'>
                                        <label className='mb-1 relative' htmlFor="subject">Subject<i className="fa-sharp fa-solid fa-star absolute top-1.5 right-[-8px] text-red-600" style={{ fontSize: '5px' }}></i></label>
                                        <input className='p-3 bg-gray-200 rounded focus:outline outline-red-600 w-full' type="text" id='subject' name='subject' value={formData.subject} onChange={handleInputChange} placeholder='Subject' required />
                                    </div>
                                </div>
                                <div className='flex flex-col items-start' data-aos="zoom-in" data-aos-duration="1000" data-aos-once='true'>
                                    <label className='mb-1 relative' htmlFor="message">Message<i className="fa-sharp fa-solid fa-star absolute top-1.5 right-[-8px] text-red-600" style={{ fontSize: '5px' }}></i></label>
                                    <textarea className='p-3 bg-gray-200 focus:outline outline-red-600 w-full' type="text" id='message' name='message' value={formData.message} onChange={handleInputChange} rows='5' placeholder='Your Message' required />
                                </div>
                                <div className='flex justify-center'>
                                    <input className='bg-red-600 text-white py-2 px-3 rounded border border-red-600 transition-all duration-200 ease-linear hover:bg-white hover:text-gray-700 cursor-pointer mt-6' type="submit" value='SUBMIT' />
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className='w-full mt-8' data-aos="fade-right" data-aos-duration="1000" data-aos-once='true'>
                        <h3 className='md:text-2xl text-xl font-semibold mb-2'>{global.SiteName}</h3>
                        <span className='text-gray-700 flex items-center gap-2'>
                            <i className="fa-solid fa-location-dot"></i>
                            <p>{global.SiteAddress}</p>
                        </span>
                        <span className='text-gray-700 flex items-center gap-2 my-1'>
                            <i className="fa-solid fa-phone"></i>
                            <p>{global.SiteContact}</p>
                        </span>
                        <span className='text-gray-700 flex items-center gap-2'>
                            <i className="fa-solid fa-envelope"></i>
                            <p>{global.SiteEmail}</p>
                        </span>
                    </div>
                </div>
            </section>
            {/* ---map part--- */}
            <section className='py-4'>
                <iframe className='w-full h-80' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.2952932376134!2d85.31130357393788!3d27.739036624095895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb192769445433%3A0x9b19ae864def10a7!2sEquator%20International%20P.%20Ltd.!5e0!3m2!1sen!2snp!4v1692158490685!5m2!1sen!2snp" 
                allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </section>
        </>
    )
}

export default Contact;
