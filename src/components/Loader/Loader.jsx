import React from 'react';
import { Rings } from  'react-loader-spinner';
import {LoaderContainer} from './Loader.styled';

export default function Loader () {

return <LoaderContainer>
            <Rings color="#00BFFF" height={80} width={80} />
        </LoaderContainer>;
}
