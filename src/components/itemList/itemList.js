// с использованием state

import React, {Component} from 'react';
import styled from 'styled-components';
import Spinner from '../spinner';



const ListItem = styled.li`
    cursor: pointer;
    list-style: none;
    position: relative;
    display: block;
    padding: 0.75rem 1.25rem;
    background-color: #fff;
    border-top: 1px solid rgba(0, 0, 0, 0.125);
    &:first-child{
        border: none
    }
    
`

const ListContainer = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
`


export default class ItemList extends Component {

    state = {
        itemList: null,
       
    }
  
    componentDidMount(){
        const {getData} = this.props;

        getData()
            .then( (itemList) => {
                this.setState({
                    itemList,
                   
                })
            })
            
    }


    renderItems(arr){
        return arr.map((item) => {


            const {id} = item;
            const label = this.props.renderItem(item);

            return (
              
                <ListItem 
                key={id}
                onClick={ () => this.props.onItemSelected(id)}
                >
                 {label}
                </ListItem>
                
            )
        })
    }

    render() {

        const {itemList} = this.state;

        if(!itemList){
            return <Spinner/>
        }

        const items = this.renderItems(itemList);

       
        return (
            <ListContainer>
                {items}
            </ListContainer>
            
        );
    }
}

//с использованием ХУКов

// import React, {useState, useEffect} from 'react';
// import styled from 'styled-components';
// import Spinner from '../spinner';



// const ListItem = styled.li`
//     cursor: pointer;
//     list-style: none;
//     position: relative;
//     display: block;
//     padding: 0.75rem 1.25rem;
//     background-color: #fff;
//     border-top: 1px solid rgba(0, 0, 0, 0.125);
//     &:first-child{
//         border: none
//     }
    
// `

// const ListContainer = styled.div`
//     background-color: #fff;
//     padding: 25px 25px 15px 25px;
//     margin-bottom: 40px;
// `


// function ItemList({getData, onItemSelected, renderItem}) {

//     const [itemList, updateList] = useState([]);

  
//     useEffect(() => {
//         getData()
//         .then( (data) => {
//             updateList(data)
//             })
//         }, [])



//     function renderItems(arr){
//         return arr.map((item) => {


//             const {id} = item;
//             const label = renderItem(item);

//             return (
              
//                 <ListItem 
//                 key={id}
//                 onClick={ () => onItemSelected(id)}
//                 >
//                  {label}
//                 </ListItem>
                
//             )
//         })
//     }


//         if(!itemList){
//             return <Spinner/>
//         }

//         const items = renderItems(itemList);

       
//         return (
//             <ListContainer>
//                 {items}
//             </ListContainer>
            
//         );
// }

// export default ItemList;