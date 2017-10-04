import React from 'react'

import { Table, Glyphicon } from 'react-bootstrap';
import LocationRows from './LocationRows';

const SortGlyph = ({sort}) => {
    if (sort === 'asc') {
        return <span>{' '}<Glyphicon glyph="chevron-up"/></span>
    } else if (sort === 'dsc') {
        return <span>{' '}<Glyphicon glyph="chevron-down"/></span>
    }

    return null;
}

const LocationsTable = ({locations, selectedLocation, sortByCategory, locationSelected, toggleCategorySort}) => (
    <div className="container locations-table">
        <Table responsive>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th className="sortable" onClick={toggleCategorySort}>
                        Category
                        <SortGlyph sort={sortByCategory} />
                    </th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                </tr>
            </thead>
            <tbody>
                <LocationRows
                    locations={locations}
                    onClick={locationSelected}
                    selectedLocation={selectedLocation}
                />
            </tbody>
        </Table>
    </div>
);

export default LocationsTable;