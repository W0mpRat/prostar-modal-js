import React from 'react';
import './modal.css';

class Modal extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      error: null,
      isLoaded: false,
      showMore: false,
      data: {}
    };
  }

  componentDidMount() {
    fetch("https://www.mocky.io/v2/5d3752f1310000fc74b0788d")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            data: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  getDirectionsURL () {
    return `https://www.google.com/maps/dir/?api=1&destination=${this.state.data.location.address.streetAddress.replace(/ /g, '+')}+${this.state.data.location.address.addressLocality.replace(/ /g, '+')}+${this.state.data.location.address.addressRegion}+${this.state.data.location.address.postalCode}&travelmode=driving`;
  }

  getDate1 () {
    const event = new Date(this.state.data.startDate);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    return event.toLocaleDateString('en-US', options)
  }

  getTimeRange () {
    const startDate = new Date(this.state.data.startDate);
    const endDate = new Date(this.state.data.endDate);
    return `${startDate.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })} - ${endDate.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })} PST`
  }

  getGoogleMapsURL () {
    return `https://www.google.com/maps/embed/v1/place?key=AIzaSyDpdlk1qckU_znG1ME-yV6tv15wqdZDLEg&q=${this.state.data.location.address.streetAddress.replace(/ /g, '+')}+${this.state.data.location.address.addressLocality.replace(/ /g, '+')}+${this.state.data.location.address.addressRegion}+${this.state.data.location.address.postalCode}`;
  }

  render() {
    return (
      <div id="myModal" className="modal">
        {!this.state.isLoaded &&
          <div className="modal-content loading">
            Loading...
          </div>
        }
        {this.state.isLoaded &&        
          <div className="modal-content">
            <div className="modal-header">
              <div className="image-container">
                <img className="header-image" src={this.state.data.image} alt="flowers"></img>
                <div className="bottom-left">
                  <p>{this.state.data.location.name}, {this.state.data.location.address.addressLocality}</p>
                  <p className="strong-title">{this.state.data.name}</p>
                </div>
                <div className="top-right">
                  <span className="close" onClick={this.props.closeModal}>&times;</span>
                </div>
              </div>
            </div>
            <div className="modal-body">
              <div className="body-block">
                <div className="title">Date & Time</div>
                <p>{this.getDate1()}</p>
                <p>{this.getTimeRange()}</p>
              </div>
              <div className="body-block">
                <div className="title">Description</div>
                <p className={"" + (this.state.showMore ? '' : 'overflow')}>{this.state.data.description}</p>
                {/* eslint-disable-next-line */}
                <a href="#" onClick={() => this.setState({ showMore: !this.state.showMore })}>
                  {this.state.showMore ? 'Show Less' : 'Read More'}
                </a>
              </div>
              <div className="body-block">
                <div className="title">Location</div>
                <p>{this.state.data.location.name}</p>
                <p>{this.state.data.location.address.streetAddress}</p>
                <p>{this.state.data.location.address.addressLocality}, {this.state.data.location.address.addressRegion} {this.state.data.location.address.postalCode}</p>
                <iframe
                  title="map"
                  width="250"
                  height="250"
                  loading="lazy"
                  src={this.getGoogleMapsURL()}>
                </iframe>
                <br></br>
                <a href={this.getDirectionsURL()}>Get Directions</a>

              </div>
            </div>
            <div className="modal-footer">
              <button onClick={(e) => {
                e.preventDefault();
                window.location.href= this.state.data.offers.url;
              }}>
                RSVP
              </button>
            </div>
          </div>
        }
      </div>
    )
  }
}

export default Modal;