import React from 'react'

import { Col, Row } from 'react-bootstrap';

const Layout = ({side, main}) => (
    <Row>
        <Col xs={6} sm={8}>
            {main}
        </Col>
        <Col xs={6} sm={4}>
            {side}
        </Col>
    </Row>
);

export default Layout;