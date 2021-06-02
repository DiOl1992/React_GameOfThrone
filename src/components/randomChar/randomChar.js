import React, { Component } from 'react';
import styled from 'styled-components';
import { ListGroup, ListGroupItem } from 'reactstrap';
import gotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

const RandomBlock = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
    img{
        width: 100%
    }
`;

const RandomBlockTitle = styled.h4`
    margin-bottom: 20px;
    text-align: center;
`;

const Term = styled.span`
    font-weight: bold;
`



export default class RandomChar extends Component {

    

    gotService = new gotService();
    state = {
        char: {},
        loading: true
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false,
            error: false
        
        })
    }

    componentDidMount(){
        this.updateChar();
        this.timerId = setInterval(this.updateChar, 15000);
    }


    componentWillUnmount(){
        clearInterval(this.timerId);
    }


    onError = (err) => {
        this.setState({
            error: true,
            loading: false,

        })
    }

    updateChar = () => {
        const id = Math.floor(Math.random()*140 + 25);
        // const id = 130000000;
        this.gotService.getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    render(){
        console.log('render');
        const {char, loading, error} = this.state;

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View char={char}/> : null;

        return (
            <RandomBlock> 
                {errorMessage}
                {spinner}
                {content}
            </RandomBlock>
        );
    }
}

const View = ({char}) => {
    const {name, gender, born, died, culture} = char;
    return(
        <>
            <RandomBlockTitle>
                    Random Character: {name}
                </RandomBlockTitle>
                <ListGroup flush>
                    <ListGroupItem className="justify-content-between d-flex">
                        <Term>Gender </Term>
                        <span>{gender}</span>
                    </ListGroupItem>
                    <ListGroupItem className="justify-content-between d-flex">
                        <Term>Born </Term>
                        <span>{born}</span>
                    </ListGroupItem>
                    <ListGroupItem className="justify-content-between d-flex">
                        <Term>Died </Term>
                        <span>{died}</span>
                    </ListGroupItem>
                    <ListGroupItem className="justify-content-between d-flex">
                        <Term>Culture </Term>
                        <span>{culture}</span>
                    </ListGroupItem>
                </ListGroup>
        </>
    )
}



