import React ,{useState,useEffect} from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import axios from 'axios';

const Clients = () => {
    // const images = ['alstom.png', 'kepco.png', 'manco.png', 'ottawa.png', 'punj-lloyd.jpg', 'technip.png']
    const options = {
        items: 3,
        loop: true,
        margin: 20,
        autoplay: true,
        dots: false,
        autoplayTimeout: 4000,
        responsive: {
            0: {
                items: 3
            },
            600: {
                items: 4
            },
            1000: {
                items: 5
            }
        }
    };

    const [client, setClient] = useState([])
    const clientData = async () =>{
        try{
            const response = await axios.get(
                "http://127.0.0.1:8000/api/navigations/"
            );
            let newClient=[...response.data]
            newClient=newClient.reverse()
            const clientdatas = newClient.filter(
                (item) => item.status === "Publish" && item.page_type ==="Clients"
            );
            // setClient(clientdatas ? clientdatas : []);
            setClient(clientdatas);


        }catch (error){
            console.error("Error on fetching data:",error);
        }
    };

    useEffect(() =>{
        clientData()
    }, []);

    return (
        <section className='py-12'>
            <div className='container flex flex-col items-center'>
                <h2 className="lg:text-4xl sm:text-3xl text-2xl font-bold text-center mb-8 relative after:absolute after:w-[100%] after:h-[5px] after:bg-red-600 after:content-[''] after:bottom-[-8px] after:rounded-sm after:left-0 before:absolute before:bg-white before:content-[''] before:h-[5px] before:w-[5px] before:bottom-[-8px] 
                before:z-10 animate" data-aos="fade-up" data-aos-duration="1000" data-aos-once='true'>{client[0] ? client[0].title : ''}</h2>
                <OwlCarousel className="owl-theme" {...options}>
                    {client.map((image, index) => (
                        <div className="item flex justify-center items-center clients-image" key={index}>
                            <img src={image.bannerimage} alt="clients" />
                        </div>
                    ))}
                </OwlCarousel>
            </div>
        </section>
    )
}

export default Clients;
