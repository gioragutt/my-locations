import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Map, AdditionMarker, LocationMarker, addressByCoordinates } from '../Map';

import { LocationPropType } from './util';

const invoke = method => {
    if (method) {
        method();
    }
};

export default class LocationsMap extends Component {
    static propTypes = {
        locations: PropTypes.arrayOf(LocationPropType.isRequired).isRequired,
        selectedLocation: LocationPropType,
        locationClicked: PropTypes.func.isRequired,
        onAdditionClick: PropTypes.func.isRequired,
        onAdditionCancel: PropTypes.func,
        locationInfoClosed: PropTypes.func.isRequired,
        onLocationRemove: PropTypes.func.isRequired,
        onLocationEdit: PropTypes.func.isRequired,
        onRightClick: PropTypes.func,
        onClick: PropTypes.func,
    }

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

    getGM() {
        return this.map;
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
            onLocationRemove,
            onLocationEdit,
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
                    <AdditionMarker
                        coordinates={additionCoordinate}
                        address={additionCoordinateAddress}
                        onClick={onAdditionClick}
                        onCloseClick={() => { this.resetAddition(); invoke(onAdditionCancel); }}
                    />
                }
                {
                    locations.map(loc => (
                        <LocationMarker
                            key={loc.id}
                            location={loc}
                            onClick={locationClicked}
                            onCloseClick={locationInfoClosed}
                            isSelected={selectedLocation ? loc.id === selectedLocation.id : false}
                            onRemove={onLocationRemove}
                            onEdit={onLocationEdit}
                        />
                    ))
                }
            </Map>
        );
    }
};