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
            <p>{track.artistName}</p>
            <p>{track.trackName}</p>
            <p>{track.collectionName}</p>
            <p>{track.primaryGenreName}</p>
          </div>
        <div className='status'>
          <span className='status__item'></span>
          <span className={`status__item ${ currentTrack === id ? 'unActive' : '' }`}></span>
        </div>
      </div>
      { 
          <div className={`accordContent ${currentTrack === id ? 'openAccord': ''}`}>
              { currentTrack === id &&
                <audio src={track.previewUrl} autoPlay loop></audio> 
              }
            <div className='accordContent__title'>
              <span>{`${track.artistName} - ${track.trackName}`}</span>
            </div>
            <p><b>Collection: </b>{track.collectionName}</p>
            <p><b>Track Duration: </b>
              {
                `${(track.trackTimeMillis/1000/60).toFixed(1)} min`
              }
            </p>
            <p><b>Track Count: </b>{track.trackCount}</p>
            <p><b>Track Price: </b>{track.trackPrice} USD</p>
            <p><b>Price: </b>{track.collectionPrice} USD</p>
          </div>
      }
    </div>
  );
}