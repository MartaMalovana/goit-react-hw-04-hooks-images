import {LoadingButton} from './Button.styled';

export default function Button ({onClick}) {

    const handleClick = () => {
         return onClick();
    }

   return <LoadingButton type='button' onClick={handleClick}>Load more</LoadingButton>;
    
}