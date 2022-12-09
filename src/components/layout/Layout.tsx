import { ILayoutProps } from './layout.interface'

import React, { FC, PropsWithChildren } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Helmet } from 'react-helmet'

const Layout: FC<PropsWithChildren<ILayoutProps>> = ({
	children = '',
	title
}) => {
	return (
		<main>
			<Helmet>
				<title>{title}</title>
			</Helmet>
			<Container className='py-3 py-lg-5'>
				<Row>
					<Col lg={{ span: 8, offset: 2 }}>{children}</Col>
				</Row>
			</Container>
		</main>
	)
}

export default Layout
