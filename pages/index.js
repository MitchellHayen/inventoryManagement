import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import axios from 'axios';

const serverAddress = 'localhost';
const port = 3000;

export default function Home({itemList}) {
    console.log("This is itemList in Home: ",itemList);
    //this needs to happen when user updates a record on front end -- values passed need to correlate to itemID, itemDescription, itemQuantity, itemMinPar, itemMaxPar
    //this can be set to be activated with an input field with an onChange method -- may be easier than using a useEffect
    //data will be printed to screen with input fields from an array, so to have a useEffect track each of these may be more difficult than just an onChange method in each record input field
/*    const res1 = axios.post('http://'+serverAddress+':'+port+'/items', {itemID: itemID, itemDescription: itemDescription, itemQuantity: itemQuantity, itemMinPar: itemMinPar, itemMaxPar: itemMaxPar})
        .then(function(result){
            let rep = result.data;
            if (rep == "Success"){
                //do stuff here to inform user DB has been updated
            }
            else{
                //do stuff here to inform user DB record was not updated
            }
        })*/
    return(
        <div>
            All items in database are:
            {itemList?itemList.map(item => {return ( <><br/>{item.itemDescription}</>)}):null}
        </div>
    )
}


export const getServerSideProps = async pageContext => {
    let itemList = [];
    const res = await axios.get('http://'+serverAddress+':'+port+'/items').then(function(result){
        itemList = result.data;
        console.log("+++++ This is itemList: ",itemList);
    })

    return {
        props: {
            itemList
        }
    }
}