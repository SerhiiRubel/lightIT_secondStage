import React, { Component } from 'react';

import ListItem from '../../components/ListItem/index';

class TrackList extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      currentTrack: null,
      tracksList: [],
      searchValue: '',
    });      
  }

  componentWillMount() {
    fetch('https://itunes.apple.com/search?term=The+Beatles')
      .then( response => response.json() )
      .then( tracksList => {
        this.setState({
          tracksList: tracksList.results,
        })
      })
  }

  changeCurrentTrack = id => {
    id === this.state.currentTrack ? 
      this.setState({ currentTrack: null }) : 
      this.setState({ currentTrack: id })
  }

  handleChange = (e) => {
    this.setState({
      searchValue: e.target.value,
    })
  }

  handleSubmit = (e) => { 
    e.preventDefault();
    fetch(`https://itunes.apple.com/search?term=${ encodeURIComponent(this.state.searchValue).replace(/%20/g, "+") }`)
      .then( response => response.json() )
      .then( tracksList => {
        this.setState({
          tracksList: tracksList.results,
          searchValue: '',
          currentTrack: null,
        })
      } )
  }

  render() {
    return (
      <div className='trackList'>
        <form className='form' onSubmit={this.handleSubmit}>
          <input
            required
            className='form__input' 
            type='text' 
            onChange={this.handleChange} 
            value={this.state.searchValue} 
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
              this.state.tracksList.length > 0 &&
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
              }) || <h1 align='center'>This music band not found</h1>
            }
        </div>
      </div>
    );
  }
}

export default TrackList;