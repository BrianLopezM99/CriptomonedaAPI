import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled';
import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import Axios from 'axios';
import Error from './Error';
const Boton = styled.input`
margin-top: 20px;
font-weight: bold;
font-size: 20px;
padding: 10px;
background-color: #66a2fe;
border: none;
width: 100%;
border-radius: 10px;
color: #fff;
transition: background-color .3 ease;

&:hover{
    background-color: #326ac0;
    cursor: pointer;
}

`;

const Formulario = ({guardarCriptomoneda, guardarMoneda}) => {

    //state listado criptomonedas
    const [listacripto, guardarCriptomonedas] = useState([]);
    const [error, guardarError] = useState(false);

    const MONEDAS = [
        {codigo: 'USD', nombre: 'Dolar de Estados Unidos'},
        {codigo: 'MXN', nombre: 'Peso Mexicano'},
        {codigo: 'EUR', nombre: 'Euro'},
        {codigo: 'GBP', nombre: 'Libra esterlina'},
    ]
    //Utilizar useMoneda
    const [moneda, SelectMonedas] = useMoneda('Elige tu moneda', '', MONEDAS);
    //utilizar useCriptomoneda
    const [criptomoneda, SelectCripto] = useCriptomoneda('Elige tu Criptomoneda', '', listacripto);

    //ejecutar llamado a la api
    useEffect(()=>{
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
            const resultado = await Axios.get(url);
            guardarCriptomonedas(resultado.data.Data)
        }
        consultarAPI();
    }, []);

    //cuando el usuario hace submit
    const cotizarMoneda = (e) => {
        e.preventDefault();

        //validar si ambos campos estan llenos
        if(moneda === '' || criptomoneda === ''){
            guardarError(true);
            return;
        }
        guardarError(false);
        guardarCriptomoneda(criptomoneda);
        guardarMoneda(moneda);
    }
    return ( 
        <form
            onSubmit={cotizarMoneda}
        >
        {error ? <Error mensaje = "Todos los campos son obligatorios"/> : null}
        <SelectMonedas />
        <SelectCripto />
            <Boton 
                type="submit"
                value="capturar"
            />
        </form>
    );
}

export default Formulario;