import React from 'react';
import NavBar from '../components/NavBar';
import Slider from 'react-slick'; 
import '../styles/Home.css';

const Home: React.FC = () => {
  const settings = {
    dots: true,           
    infinite: true,       
    speed: 500,           
    slidesToShow: 1,     
    slidesToScroll: 1,    
    autoplay: true,       
    autoplaySpeed: 2500,  
  };

  return (
    <div className='home-container'>
      <NavBar />
      
      <section className="carousel-section">
        <h2></h2>
        <div className="carousel-container">
          <Slider {...settings}>
            <div>
              <img src="src/assets/vengeance.jpeg" alt="" />
            </div>
            <div>
              <img src="src\assets\ABS-Precision-Xtreme-gaming-PC-review-242.jpg" alt="" />
            </div>
            <div>
              <img src="src\assets\PC-Gamer.jpg" alt="" />
            </div>
          </Slider>
        </div>
      </section>

      <section className="welcome-section">
        <h1>Bem-vindo ao nosso Gerenciador de Estoque</h1>
        <p>Seja bem-vindo ao nosso gerenciador de estoque de produtos eletrônicos, somos especializados em serviços secundários para grandes lojas que procuram um software de fácil acesso e grande ultilização</p>
      </section>
      
      <section className="partners-section">
        <h2>Sites parceiros que usam nossos serviços:</h2>
        <div className="partners-images">
          <img src="src/assets/kabum-logo-0.png" alt="Kabum" />
          <img src="src/assets/teraicon.png" alt="Terabyte"/>
          <img src="src/assets/R.png" alt="iByte" />
        </div>
      </section>
    </div>
  );
}

export default Home;
