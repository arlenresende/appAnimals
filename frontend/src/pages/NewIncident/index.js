import React,{useState} from 'react';
import logoImg from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import {FiArrowDownLeft} from 'react-icons/fi';
import api from '../../services/api';
import './style.css';


export default function NewIncident(){

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const ongId = localStorage.getItem('ongId');

    const history = useHistory();

    
    async function handleRegister(e){
        e.preventDefault();

        const data = ({title,description,value});

        try {
            await api.post('/incidents',data,{
                headers:{
                    Authorization: ongId,
                }
            });
            history.push('/profile');
        }catch(err){
            alert('Erro no cadastro, tente novamente');
        }
    }


    return(
        <div className="new-incident">
            <div className="content">
                <section>
                    <img src={logoImg} alt=" Logo" />
                    <h1>Cadastrar novo Caso</h1>
                    <p>Faça seu cadastro e ajude os animais de sua cidade</p>
                      
                    <Link to="/profile" className="back-link">
                         <FiArrowDownLeft size={16} color="#E02041" /> Voltar para home
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input placeholder="Título do cado"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                     />
                    <textarea  placeholder="Descrição" 
                     value={description}
                     onChange={e => setDescription(e.target.value)}
                     />
                    <input placeholder="Valor em reais"
                     value={value}
                     onChange={e => setValue(e.target.value)}
                      />

                  

                    <button className="button" type="submit" >Cadastrar</button>
                </form>
            
            </div>
    </div>
    );

}