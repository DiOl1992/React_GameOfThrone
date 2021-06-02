import React, {Component} from 'react';
import styled from 'styled-components';
import { ListGroup, ListGroupItem } from 'reactstrap';

import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';


const ItemDetail = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
    h4{
        margin-bottom: 20px;
        text-align: center;
    }
`
const Term = styled.span`
    font-weight: bold;
    margin-right: 10px;
`
const ErrorSpan = styled.span`
    background: #fff;
    height: 30px;
    width: max-content;
    display: flex;
    padding: 0 15px;
    align-items: center;
    justify-content: center;
`

const Field =({item, field, label}) => {
    return (
        <ListGroupItem className="d-flex justify-content-between">
            <Term>{label}</Term>
            <span>{item[field]}</span>
        </ListGroupItem>
    )
}

export{
    Field
};

export default class ItemDetails extends Component {


    state = {
        item: null
    }

    componentDidMount(){
        this.updateItem();
    }

    componentDidUpdate(prevProps){
        if(this.props.itemId !== prevProps.itemId) {
            this.updateItem();
        }
    }

    // onItemDetailsLoaded = (item) => {
    //     this.setState({
    //         item,
    //         loading: false
        
    //     })
    // }

    updateItem(){
        const {itemId, getData} = this.props;
        if(!itemId){
            return;
        }

        getData(itemId)
            .then((item)=>{
                this.setState({item})
            })

        // this.setState({
        //     loading: true
        // })
        // this.gotService.getCharacter(itemId)
        //     .then(this.onItemDetailsLoaded)
        //     .catch( () => this.onError())
        
    }

    // onError(){
    //     this.setState({
    //         char: null,
    //         error: true
    //     })
    // }

    render() {

        // if(!this.state.item && this.state.error){
        //     return <ErrorMessage/>
        // } else 
        if (!this.state.item){
            return <ErrorSpan>Please select item in the list</ErrorSpan>
        }

        const {item} = this.state;
        const {name} = item;

        // if(this.state.loading){
        //     return <Spinner/> 
        // }

        return (
            <ItemDetail>
                <h4>{name}</h4>
                <ListGroup flush>
                    {
                        React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, {item})
                        })
                    }
                </ListGroup>
            </ItemDetail>
        );
    }
}