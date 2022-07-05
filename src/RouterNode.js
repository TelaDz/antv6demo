import React, { useEffect } from 'react'
import A from './A.png'
import { Tooltip } from 'antd'
function RouterNode(props) {
	const { node } = props
	const Show = (props) => {
		return (
			<div>
				{props.data.eqName} {props.data.eqIp}{' '}
			</div>
		)
	}
	return (
		<Tooltip title={Show(node)}>
			<div className='x6-node' style={{ backgroundImage: `URL(${A})` }}>
				{node.data.eqName}

				{node.attrs.showLabel ? (
					<div className='x6-showlabel'>
						<p>{node.data.eqName}</p>
						<p>{node.data.eqIp}</p>
					</div>
				) : null}
			</div>
		</Tooltip>
	)
}

export default RouterNode
