import {useEffect,useState} from 'react';
import axios from '../utils/axios';

export default function Home(){
    const [cars,setCars] = useState([]);
    useEffect(() => {
        axios.get('/cars')
            .then(res => console.log(res))
    },[])
    
    return <>
        <h1>Home page</h1>
    </>
}




















