
import './App.css';
import {Slideshow, Slide, TextSlide } from './components/Slideshow';
import styled from 'styled-components';


function App () {
  return (
    <div className="App">
      <Slideshow>
        {/* controles{true} ...{false} ...{true} */}
        {/* <Slide> */}
          {/* Para reutilizar */}
                    {/* <img src={img1} alt='' />
                    <TextSlide>
                        <p>
                            Imagen numero 1
                        </p>
                    </TextSlide>
                </Slide>
                <Slide>
                    <img src={img2} alt='' />
                    <TextSlide>
                        <p>
                            Imagen numero 2
                        </p>
                    </TextSlide>
                </Slide>
                <Slide>
                    <img src={img3} alt='' />
                    <TextSlide>
                        <p>
                            Imagen numero 3
                        </p>
                    </TextSlide> */}
        {/* </Slide> */}
      </Slideshow>
    </div>
  );
}

const Titulo = styled.p`
  font-size: 18px;

`;

export default App;
