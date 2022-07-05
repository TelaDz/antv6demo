import { Node } from '@antv/x6'
import React from 'react'

export default class ComNode extends Node {
	shouldComponentUpdate() {
		const node = this.props.node
		if (node) {
			if (node.hasChanged('data')) {
				return true
			}
		}

		return false
	}
	render() {
		return (
			<div
				style={{
					width: 100,
					height: 100,
					textAlign: 'center',
					lineHeight: '50px',
					border: '2px solid #9254de',
					borderRadius: 4,
					background: '#efdbff',
				}}>
				123321
			</div>
		)
	}
}
