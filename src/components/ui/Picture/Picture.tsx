import React from 'react';
import './Picture.scss';

import { WithHTMLAttributes } from 'src/types';

export type PictureProps = WithHTMLAttributes<
    {
        src: string;
        alt: string;
        active?: boolean
        className?: string;
    },
    HTMLDivElement
    >;

const Picture: React.FC<PictureProps> = ({src, alt, active, ...props}) => {
    return(
        <div className='picture' {...props}>
            <img className='picture__img' src={src} alt={alt} loading={active ? 'eager' : 'lazy'} />
        </div>
    )
}

export default Picture;
