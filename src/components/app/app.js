import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import BooksPage from '../pages/booksPage';
import CharacterPage from '../pages/characterPage';
import HousesPage from '../pages/housesPage';
import BooksItem from '../pages/booksItem';
import gotService from '../../services/gotService';

import styled from 'styled-components';
import ErrorMessage from '../errorMessage';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './app.css';

const ButtonRandomChar = styled.button`
    background-color: #fff;
    padding: 10px;
    margin-bottom: 40px;
    color: black;
    box-shadow: none;
    border: none;
`;




export default class App extends Component{

    gotService = new gotService();

    state = {
        randomChar: true,
        error: false,
        selectedHouse: 20
    }

    componentDidCatch(){
        console.log('error');
        this.setState({
            error: true
        })
    }

    toggleRandomChar = () => {
        this.setState((state) => {
            return {
                randomChar: !state.randomChar
            }
        })
    }


    

    render() {
        
        const char = this.state.randomChar ? <RandomChar/> : null;
        
        if (this.state.error){
            return <ErrorMessage/>
        }

        return (
            <Router>
            <div className='app'> 
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            {char}
                            <ButtonRandomChar onClick={this.toggleRandomChar}>
                                Toggle RandomChar
                            </ButtonRandomChar>
                        </Col>
                    </Row>

                    
                    <Route path='/characters' component={CharacterPage}/>
                    <Route path='/houses' component={HousesPage}/>
                    <Route path='/books' exact component={BooksPage}/>
                    <Route path='/books/:id' render={
                        ({match}) => {
                            const {id}=match.params;
                            return <BooksItem bookId={id}/>
                        }
                        
                    }/>
                </Container>
            </div>
            </Router>
        );
    }

    
};

