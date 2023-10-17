import React ,{useState,useEffect} from 'react';
import SlickImageSlider from './SlickImageSlider';
import SlickSlider from './SlickSlider';
import axios from 'axios';

const Testimonial = () => {
    const [testi, setTesti] = useState([])

    const testiData = async () =>{
        try{
            const response = await axios.get(
                "http://127.0.0.1:8000/api/navigations/"
            );
            let newtest=[...response.data]
            newtest=newtest.reverse()
            const testiData = newtest.filter(
                (item) => item.status === "Publish" && item.page_type ==="Testimonial"
            );
            
            setTesti(testiData);


        }catch (error){
            console.error("Error on fetching data:",error);
        }
    };
    useEffect(() => {
        testiData();
    }, []);
    return (
       
        <section className='py-12 text-white relative bg-fixed bg-no-repeat bg-cover' style={{backgroundImage: `url(${testi[0] ? testi[0].back_image: ''})`}}>
            <div className='absolute top-0 left-0 w-full h-full bg-black opacity-80'></div>
            <div className="container flex flex-col items-center relative z-10">
                <h2 className="lg:text-4xl sm:text-3xl text-2xl font-bold mb-8 relative after:absolute after:w-[100%] after:h-[5px] after:bg-red-600 after:content-[''] after:bottom-[-8px] after:rounded-sm after:left-0 before:absolute before:bg-white before:content-[''] before:h-[5px] 
                before:w-[5px] before:bottom-[-8px] before:z-10 animate" data-aos="fade-up" data-aos-duration="1000" data-aos-once='true'>{ testi[0] ? testi[0].title: ''}</h2>
                <div className='flex flex-col items-center w-full'>
                    <SlickImageSlider data={testi}/>
                    <SlickSlider data={testi}/>
                </div>
                
            </div>
        </section>
    )
}

export default Testimonial;
