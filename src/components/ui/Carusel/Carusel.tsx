import React from "react";
import './Carusel.scss'
import Picture from "../Picture/Picture";
import {WithHTMLAttributes} from "../../../types";
import cn from 'classnames';

const DURACTION = 300;

type CaruselProps = WithHTMLAttributes<
    {
        carouselPictures: string[],
        activeItem: number,
        setActiveItem: (e: number) => void;
    },
    HTMLDivElement
    >;

const Carusel:React.FC<CaruselProps> = ({ carouselPictures, activeItem, setActiveItem, className }) => {
    const pictureWrapperRef = React.useRef<null | HTMLDivElement>(null);
    const [scrollWidth, setScrollWidth] = React.useState<number>(1);
    const [pictures, setPictures] = React.useState([carouselPictures[carouselPictures.length - 1], ...carouselPictures, carouselPictures[0]]);
    const [transitionDuration, setTransitionDuration] = React.useState<number>(DURACTION);

    React.useEffect(() => {
        setPictures([carouselPictures[carouselPictures.length - 1], ...carouselPictures, carouselPictures[0]]);
    }, [carouselPictures])

    React.useEffect(() => {
        setScrollWidth(-(pictureWrapperRef as React.MutableRefObject<HTMLDivElement>)?.current?.offsetWidth * activeItem)
    }, [activeItem])

    React.useEffect(() => {
        if(activeItem === 0) {
            setTimeout(() => {
                setTransitionDuration(0);
                setActiveItem(pictures.length - 2)
                setScrollWidth(-(pictureWrapperRef as React.MutableRefObject<HTMLDivElement>)?.current?.offsetWidth * (pictures.length - 2));
            }, 300)
            return
        } 
        if(activeItem === (pictures.length -1)) {
            setTimeout(() => {
                setTransitionDuration(0);
                setActiveItem(1)
                setScrollWidth(-(pictureWrapperRef as React.MutableRefObject<HTMLDivElement>)?.current?.offsetWidth)
            }, 300)
            return;
        }
    }, [activeItem, pictures])

    React.useEffect(() => {
        setTransitionDuration(DURACTION);
    }, [activeItem])

    React.useEffect(() => {
        setScrollWidth(-(pictureWrapperRef as React.MutableRefObject<HTMLDivElement>)?.current?.offsetWidth * activeItem);
    }, [activeItem])

    return(
        <div
            ref={pictureWrapperRef}
            className={cn('carusel', className)}
            style={{
                transform: `translateX(${scrollWidth}px)`,
                transitionDuration: `${transitionDuration}ms`,
            }}
        >
            {pictures.map((item, index) => {
                let active = false
                if(activeItem === (index - 1) || activeItem === index || activeItem === (index + 1)) {
                    active = true
                }
                if(activeItem === 0 && (index === pictures.length - 1)) {
                    active = true
                }
                if(index === 0 && (activeItem === pictures.length - 1)) {
                    active = true
                }
                return (
                    <Picture key={index} className='carusel__slid' active={active} src={item} alt='phonePicture' />
                )
            })}
        </div>
    )
}

export default Carusel