import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

import img1 from '../img/fotoU.jpg';
import img2 from '../img/fotoD.jpg';
import img3 from '../img/fotoT.jpg';

// {children, controles = true, ...= false}
function Slideshow () {

    // Ref al DIV
    const slideshow = useRef(null);
    const intervaloSlideshow = useRef(null);

    const siguiente = () => {

        // Si tiene imagenes
        if (slideshow.current.children.length > 0) {
            // Primer elemento del slide
            const primerElemento = slideshow.current.children[0];

            // Transicion para el slide
            slideshow.current.style.transition = `300ms ease-out all`;

            // Tamaño de la imagen
            const tamañoSlide = slideshow.current.children[0].offsetWidth;

            // Movimiento del slide
            slideshow.current.style.transform =`translateX(-${tamañoSlide}px)`;

            // Funcion de movimiento
            const transicion = () => {
                // Reset position slide
                slideshow.current.style.transition = 'none';
                slideshow.current.style.transform = `translateX(0)`;

                // Primer elemento se envia al final
                slideshow.current.appendChild(primerElemento);

                slideshow.current.removeEventListener('transitionend', transicion);
            };

            // Cuando termine la transition se ejecuta la funcion
            slideshow.current.addEventListener('transitionend' , transicion)
        };
    };
    
    const anterior = () => {

        // Si tiene imagenes
        if (slideshow.current.children.length > 0) {

            // Ultimo elemento
            const index = slideshow.current.children.length - 1;
            const ultimoElemento = slideshow.current.children[index];

            // Insertamos el ultimo en primer lugar
            slideshow.current.insertBefore(ultimoElemento, slideshow.current.firstChild);

            // Tamaño de la imagen
            const tamañoSlide = slideshow.current.children[0].offsetWidth;

            // Transicion 
            slideshow.current.style.transition = 'none';
            slideshow.current.style.transform = `translateX(-${tamañoSlide}px)`;

            setTimeout(() => {
                slideshow.current.style.transition = `300ms ease-out all`;
                slideshow.current.style.transform =`translateX(0)`;
            }, 70);
        }
    };


    useEffect (() => {
        intervaloSlideshow.current = setInterval(() => {
            siguiente();
        }, 6000);

        // Eliminar intervalos
        slideshow.current.addEventListener('mouseenter', () => {
            clearInterval(intervaloSlideshow.current);
        });

        slideshow.current.addEventListener('mouseleave', () => {
            intervaloSlideshow.current = setInterval(() => {
                siguiente();
            }, 6000);
        });

    }, []);


    return (
        <ContenedorPrincipal>
            <ContenedorSlideshow ref={slideshow}>
                {/* {children} */}
                <Slide>
                    <img src={img1} alt='' />
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
                    </TextSlide>
                </Slide>
            </ContenedorSlideshow>
            <Controles>
                <Boton onClick={anterior}>
                    PREV   
                </Boton>
                <Boton derecho onClick={siguiente}>
                    NEXT
                </Boton>
            </Controles>
        </ContenedorPrincipal>
    );
};

const ContenedorPrincipal = styled.div`
    position: relative;
`;

const ContenedorSlideshow = styled.div`
    display: flex;
    flex-wrap: nowrap;
`;

const Slide = styled.div`
    min-width: 100%;
    overflow: hidden;
    transition: .3s ease all;
    z-index: 2;
    max-height: 500px;
    position: relative;

    img {
        width: 100%;
        vertical-align: top;
    }
`;

const TextSlide = styled.div`
    background: rgba(0,0,0,.5);
    color: #fff;
    width: 100%;
    padding: 10px 60px;
    text-align: center;
    position: absolute;
    bottom: 0;

    @media screen and (max-width: 700px) {
        pisition: relative;
        background: #000;
    }
`;

const Controles = styled.div`
    position: absolute;
    top: 0;
    z-index: 4;
    width: 100%;
    height: 100%;
    pointer-events: none;
`;

const Boton = styled.button`
    pointer-events: all;
    background: none;
    cursor: pointer;
    border: none;
    outline: none;
    width: 50px;
    height: 100%;
    text-align: center;
    position: absolute;
    transisition: .3 ease all;
    font-size: 30px
    &:hover {
        background : rgba(0,0,0,.2);
        path {
            fill: #fff;
        }
    }

    path {
        filter: ${props => props.derecho ? 'drop-shadow(-2px 0px 0px #fff)' : 'drop-shadow(2px 0px 0px #fff)'};
    }

    ${props => props.derecho ? 'right: 0' : 'left: 0'}
`;

export { Slideshow, Slide, TextSlide };