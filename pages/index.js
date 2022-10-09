import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import axios from 'axios';

const serverAddress = 'localhost';
const port = 3000;

export default function Home({itemList}) {
    console.log("This is itemList in Home: ",itemList);
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