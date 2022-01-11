import { Component } from 'react';
import {LoadingButton} from './Button.styled';

export default class Button extends Component {
    state = {

    };

    handleClick = () => {
        this.props.onClick();
        console.log(222);
    }

    render () {
        return <LoadingButton type='button' onClick={this.handleClick}>Load more</LoadingButton>;
    }
}