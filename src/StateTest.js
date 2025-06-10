import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const StateTester = () => {
    const count = useSelector((state) => state.count); // Pegando estado global
    const dispatch = useDispatch(); // Criando o mecanismo para enviar ações

    return (
        <div>
            <h1>Valor do Contador: {count}</h1>
            <button onClick={() => dispatch({ type: 'SET_COUNT', payload: count + 1 })}>
                Incrementar +1
            </button>
        </div>
    );
};

export default StateTester;