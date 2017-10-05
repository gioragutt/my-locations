import React, { Component } from 'react'

import { Map, ActionMarker, LocationMarker, addressByCoordinates } from '../Map';

const invoke = method => {
    if (method) {
        method();
    }
};

export default class LocationsMap extends Component {
    constructor(props) {
        super(props);

        this.state = {
            additionCoordinate: null,
            additionCoordinateAddress: null,        
        }
    }

    resetAddition() {
        this.setState({additionCoordinate: null, additionCoordinateAddress: null});        
    }

    onClick() {
        invoke(this.props.onClick);
        this.resetAddition();
    }

    onMapRightClick(e) {
        invoke(this.props.onRightClick);
        const coordinates = {
            lat: e.latLng.lat(),
            long: e.latLng.lng()
        };
        addressByCoordinates(coordinates)
            .then(address => {
                this.setState({
                    additionCoordinate: coordinates,
                    additionCoordinateAddress: address
                });
            })
    }

    additionData() {
        return {
            coordinates: this.state.additionCoordinate,
            address: this.state.additionCoordinateAddress
        };
    }

    panTo(coordinates) {
        this.map.panTo({
            lat: coordinates.lat,
            lng: coordinates.long
        });
    }

    getMapRef(map) {
        if (!this.map) {
            this.map = map;
        }
    }

    render() {
        const {
            locations,
            selectedLocation,
            locationClicked,
            onAdditionClick,
            onAdditionCancel,
            locationInfoClosed,
            onRightClick, // Ignore, not to pass to map
            ...props
        } = this.props;

        const {
            additionCoordinate,
            additionCoordinateAddress
        } = this.state;
        
        return (
            <Map
                mapRef={map => this.getMapRef(map)}
                onRightClick={e => this.onMapRightClick(e)}
                onClick={() => this.onClick()}
                {...props}
            >
                { 
                    additionCoordinate &&
                    <ActionMarker
                        coordinates={additionCoordinate}
                        onClick={onAdditionClick}
                        onCloseClick={() => { this.resetAddition(); invoke(onAdditionCancel); }}
                        description={
                            <div>
                                { additionCoordinateAddress && <div><b>Address:</b> {additionCoordinateAddress}</div> }
                                <div><b>Coordinates:</b> {`${additionCoordinate.lat}, ${additionCoordinate.long}`}</div>
                            </div>
                        }
                        action="Add"
                    />
                }
                {
                    locations.map(loc => (
                        <LocationMarker
                            key={loc.id}
                            location={loc}
                            onClick={locationClicked}
                            onCloseClick={locationInfoClosed}
                            isSelected={selectedLocation && loc.id === selectedLocation.id}
                        />
                    ))
                }
            </Map>
        );
    }
};