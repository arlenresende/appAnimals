import React , {useEffect,useState} from "react";
import { Link , useHistory } from 'react-router-dom';
import api from '../../services/api';
import logoImg from '../../assets/logo.svg';
import {FiPower, FiTrash2} from 'react-icons/fi';
import './style.css';


export default function Profile() {

    const [incidents, setIncidents] = useState([]);
    const history =  useHistory();

    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

   
    useEffect(() => {
        api.get('profile', {
            headers:{
                Authorization:ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        })
        .catch((error) => {
            alert("Ocorreu um erro ao buscar os items");
          });
    },[ongId]);

    async function handleDeleteIncident(id){
        try {
            await api.delete(`incidents/${id}`, {
                headers:{
                    Authorization:ongId,
                }
            });
            setIncidents(incidents.filter(incident => incident.id !== id))
            
        } catch (error) {
            alert('Erro ao Deletar, tente novamente');
        }

    }
    
    function handleLogOut(){
        localStorage.clear();
        history.push('/');
    }

    return (
       <div className="profile-container">
           <header>
               <img src={logoImg} alt="Animals" />
               <span>Bem vindo {ongName}</span>
               <Link className="button" to="/incidents/new">Cadastrar novo Caso</Link>
               <button type="button" onClick={handleLogOut}>
                    <FiPower size={18} color="#E02041"  ></FiPower>
               </button>
           </header>
           <h1>Casos Registrados</h1>
           <ul>
             {incidents.map(incident =>(
                <li key={incident.id}>
                    <strong>Caso</strong>
                    <p>{incident.title}</p>
                    <strong>Descrição</strong>
                    <p>{incident.description}</p>
                    <strong>Valor</strong>
                    <p>RS {incident.value}</p>
                    <button type="button" onClick={ () => handleDeleteIncident(incident.id)}>
                        <FiTrash2 size={20} color="#A8A8B3"></FiTrash2>
                    </button>
                </li>

             ) )}
           
           </ul>
       </div>
    );
}