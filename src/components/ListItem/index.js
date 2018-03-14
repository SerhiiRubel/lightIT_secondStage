import React from 'react';

export default (props) => {
  const {
    track,
    id,
    currentTrack,
    changeCurrentTrack,
  } = props;

  return (
    <div className='listItem' onClick={ () => changeCurrentTrack(id) }>
      <div className='accordBtn'>
        <div className='wrapImg'>
          <img src={track.artworkUrl100} alt='Collection'/>
        </div>
          <div className='trackDescr'>
            <p className='trackDescr__artist'>{track.artistName}</p>
            <p className='trackDescr__track'>{track.trackName}</p>
            <p className='trackDescr__collectionName'>{track.collectionName}</p>
            <p className='trackDescr__genre'>{track.primaryGenreName}</p>
          </div>
        <div className='status'>
          <span className='status__item'></span>
          <span className={`${ currentTrack === id ? 'status__item unActive' : 'status__item' }`}></span>
        </div>
      </div>
      { 
        <div className={`accordContent ${ currentTrack === id ? 'openAccord' : '' } `}>
          <audio src={track.previewUrl} loop></audio>
          <h3>{`${track.artistName} - ${track.trackName}`}</h3>
          <p><b>Collection: </b>{track.collectionName}</p>
          <p><b>Track Count: </b>{track.trackCount}</p>
          <p><b>Price: </b>{track.collectionPrice}</p>
          <p><b>Track Duration: </b>
            {
              `${(track.trackTimeMillis/1000/60).toFixed(1)} min`
            }
          </p>
          <p><b>Track Price</b>{track.trackPrice}</p>
        </div>
      }
    </div>
  );
}