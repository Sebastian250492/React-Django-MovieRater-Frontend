import React, { useState, useEffect } from 'react';
import { API } from '../api-service';
import { useCookies } from 'react-cookie';

function MovieForm (props){

  const [token] = useCookies(['mr-token']);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect( () => {
    setTitle(props.movie.title);
    setDescription(props.movie.description)
  }, [props.movie])

  const updateClicked = () => {
    console.log('updateClicked')
    API.updateMovie(props.movie.id, {title, description}, token['mr-token'])
    .then( resp => props.updateMovie(resp))
    .catch( err => console.log(err))
  }

  const createClicked = () => {
    console.log('createClicked')
    API.createMovie({title, description}, token['mr-token'])
    .then( resp => props.movieCreated(resp))
    .catch( err => console.log(err))
  }

  const isDisabled = title.length === 0 || description.length === 0;

  return (
    <React.Fragment>
      { props.movie ? (
        <div>
          <label htmlFor="title" >Title</label> <br/>
          <input id="title" type="text" placeholder="title" value={title} onChange={ evt => setTitle(evt.target.value) }/>
          <br/>

          <label htmlFor="description">Description</label><br/>
          <textarea id="description" type="text" placeholder="Description" value={description}
            onChange={ evt => setDescription(evt.target.value) } ></textarea>
          <br/>
          { props.movie.id ?
          <button onClick={updateClicked} disabled={isDisabled}>Update</button> :
          <button onClick={createClicked} disabled={isDisabled}>Create</button>
          }

        </div>

      ) : null
      }
    </React.Fragment>
  )
}

export default MovieForm
