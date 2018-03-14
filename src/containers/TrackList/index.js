import React, { Component } from 'react';

import ListItem from '../../components/ListItem/index';

class TrackList extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      currentTrack: null,
      tracksList: [],
      group: '',
    });      
  }

  componentWillMount() {
    fetch('https://itunes.apple.com/search?term=The+Rammstein')
      .then( response => response.json() )
      .then( tracksList => {
        this.setState({
          tracksList: tracksList.results,
        })
      })
  }

  changeCurrentTrack = id => {
    id === this.state.currentTrack ? this.setState({ currentTrack: null }) : this.setState({ currentTrack: id })
  }

  handleChange = (e) => {
    this.setState({
      group: e.target.value,
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    fetch(`https://itunes.apple.com/search?term=${this.state.group}`)
      .then( response => response.json() )
      .then( tracksList => {
        this.setState({
          tracksList: tracksList.results,
          group: '',
        })
      } )
  }

  render() {
    console.log(this.state.tracksList);
    return (
      <div className='trackList'>
        <form className='form' onSubmit={this.handleSubmit}>
          <input
            required
            className='form__input' 
            type='text' 
            onChange={this.handleChange} 
            value={this.state.group} 
          />
          <button type='submit' className='form__btn' />
        </form>
        <div className='tracks'>
          <div className='tracks__header'>
            <p>Artist</p>
            <p>Track</p>
            <p>Collection</p>
            <p>Genre</p>
          </div>
          {
            this.state.tracksList &&
            this.state.tracksList.map( (item, index) => {
              return(
                <ListItem
                  id={index} 
                  key={index}
                  track={item}
                  changeCurrentTrack={(id) => this.changeCurrentTrack(id)}
                  {...this.state}
                />
              );
            })
          }
        </div>
      </div>
    );
  }
}

export default TrackList;