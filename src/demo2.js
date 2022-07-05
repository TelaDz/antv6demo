import React from 'react'
import { Graph, Addon, Shape } from '@antv/x6'
import './demo2.css'
import ComNode from './ComNode'
import RouterNode from './RouterNode'

const { Stencil } = Addon
const { Rect, Circle } = Shape

export default class Example extends React.Component {
	componentDidMount() {
		const graph = new Graph({
			container: this.container,
			grid: true,
			snapline: {
				enabled: true,
				sharp: true,
			},
			scroller: {
				enabled: true,
				pageVisible: false,
				pageBreak: false,
				pannable: true,
			},
		})

		const source = graph.addNode({
			x: 130,
			y: 30,
			width: 100,
			height: 40,
			attrs: {
				label: {
					text: 'Hello',
					fill: '#6a6c8a',
				},
				body: {
					stroke: '#31d0c6',
				},
			},
		})

		const target = graph.addNode({
			x: 320,
			y: 240,
			width: 100,
			height: 40,
			attrs: {
				label: {
					text: 'World',
					fill: '#6a6c8a',
				},
				body: {
					stroke: '#31d0c6',
				},
			},
		})

		// graph.addEdge({ source, target })

		graph.centerContent()


	}

	refContainer = (container) => {
		this.container = container
	}

	refStencil = (container) => {
		this.stencilContainer = container
	}

	render() {
		return (
			<div className='app'>
				<div className='app-stencil' ref={this.refStencil} />
				<div className='app-content' ref={this.refContainer} />
			</div>
		)
	}
}
