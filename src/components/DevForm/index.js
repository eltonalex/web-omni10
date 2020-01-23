import React, { useState, useEffect } from 'react';

function DevForm({ onSubmit }){

    const [github_username, setGithubusername] = useState('');
    const [techs, setTechs] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    //Ao passar o array vazio queremos que execute uma única vez: ... ,[]);
    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(
            (position) => {
                //console.log(position);
                const {latitude, longitude} = position.coords;
                
                //Na programação declarativa seria:
                //document.getElementById('latitude').value = latitude;
                //document.getElementById('longitude').value = longitude;

                //No React criamos estados
                setLatitude(latitude);
                setLongitude(longitude);

            },
            (err) => {
                console.log(err);
            },
            {
                timeout: 30000,
            }
        )
  }, []);


 async function handleSubmit(e){
    e.preventDefault();
    
    await onSubmit({
        github_username,
        techs,
        latitude,
        longitude,
    });

    //para limpar o formulário
    setGithubusername('');
    setTechs('');
  }
  

    return(
        <form onSubmit={handleSubmit}>
            <div className="input-block">
              <label htmlFor="github_username">Usuário do Github</label>
              <input name="github_username" 
              id="github_username" 
              value={github_username} required 
              onChange={ e => setGithubusername(e.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="techs">Tecnologias</label>
              <input name="techs" 
              id="techs"  
              value={techs} required 
              onChange={ e => setTechs(e.target.value)}/>
            </div>

            <div className="input-group">
              <div className="input-block">
                <label htmlFor="latitude">Latitude</label>
                <input type="number" 
                name="latitude" id="latitude" 
                value={latitude} required
                onChange={ e => setLatitude(e.target.value)} />
              </div>
              <div className="input-block">
                <label htmlFor="longitude">Longitude</label>
                <input type="number" 
                name="longitude" id="longitude" 
                value={longitude} required 
                onChange={ e => setLongitude(e.target.value)}/>
            </div>
            </div>
            
            <button type="submit">Salvar</button>
        </form>
    );
}

export default DevForm;