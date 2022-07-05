import React, { useEffect, useRef, useState } from 'react'
import { Graph, Dom, Addon } from '@antv/x6'
import { usePortal, ReactShape } from '@antv/x6-react-shape'
import { message, Form, Input, Select, Modal, InputNumber, Button } from 'antd'
import './App.css'
const UNIQ_GRAPH_ID = 'UNIQ_GRAPH_ID'

const { Dnd } = Addon
const attrs = {
	circle: {
		r: 6,
		magnet: true,
		stroke: '#31d0c6',
		fill: '#fff',
		strokeWidth: 2,
	},
}
Graph.registerPortLayout('sin', (portsPositionArgs, elemBBox) => {
	console.log('portsPositionArgs', portsPositionArgs)
	console.log('elemBBox', elemBBox)
	return portsPositionArgs.map((_, index) => {
		const lf = (-1) ** index
		return {
			position: {
				x: elemBBox.width / 2 + index * lf * 20,
				y: elemBBox.height,
			},
			angle: 0,
		}
	})
})
function DndboxFn() {
	const [Portal, setGraph] = usePortal(UNIQ_GRAPH_ID)
	const [graph, setGraphState] = useState()
	const [dndTarget, setDndTarget] = useState()

	const container = useRef()
	useEffect(() => {
		const graph = new Graph({
			container: container.current,
			grid: true,
			history: true,
			snapline: {
				enabled: true,
				sharp: true,
			},
			// scroller: {
			// 	enabled: true,
			// 	pageVisible: false,
			// 	pageBreak: false,
			// 	pannable: true,
			// },
			mousewheel: {
				enabled: true,
				modifiers: ['ctrl', 'meta'],
			},
			connecting: {
				anchor: {
					name: 'nodeCenter',
				},
				snap: true,
				allowBlank: false,
				highlight: true,
			},
			height: 500,
		})
		const cells = []

		graph.on('node:mouseenter', ({ cell, node }) => {
			// cell.addTools([
			// 	{
			// 		name: 'button-remove',
			// 		args: {
			// 			onClick({ view }) {
			// 				console.log(view)
			// 				const node = view.cell
			// 				Modal.confirm({
			// 					title: '确定删除此节点？',
			// 					onOk() {
			// 						node.remove()
			// 					},
			// 					onCancel() {
			// 						console.log('Cancel')
			// 					},
			// 					okText: '确定',
			// 					cancelText: '取消',
			// 				})
			// 			},
			// 		},
			// 	},
			// 	{
			// 		name: 'button',
			// 		args: {
			// 			x: 50,
			// 			y: 50,
			// 			markup: [
			// 				{
			// 					tagName: 'circle',
			// 					selector: 'button',
			// 					attrs: {
			// 						r: 14,
			// 						stroke: '#fe854f',
			// 						'stroke-width': 3,
			// 						fill: 'white',
			// 						cursor: 'pointer',
			// 					},
			// 				},
			// 				{
			// 					tagName: 'text',
			// 					textContent: 'Btn B',
			// 					selector: 'icon',
			// 					attrs: {
			// 						fill: '#fe854f',
			// 						'font-size': 8,
			// 						'text-anchor': 'middle',
			// 						'pointer-events': 'none',
			// 						y: '0.3em',
			// 					},
			// 				},
			// 			],
			// 		},
			// 	},
			// ])
			// node.addPort({
			// 	group: 'group1',
			// })
		})
		graph.on('node:mouseleave', ({ cell }) => {
			if (cell.hasTool('button-remove')) {
				cell.removeTool('button-remove')
			}
			if (cell.hasTool('button')) {
				cell.removeTool('button')
			}
			// if (cell.hasPorts()) {
			// 	cell.removePorts()
			// }
		})
		graph.on('edge:mouseenter', ({ cell }) => {})
		graph.on('edge:mouseleave', ({ cell }) => {})
		graph.on('node:click', ({ cell, node }) => {})
		graph.on('edge:click', ({ cell, edge }) => {})
		const source = graph.addNode({
			x: 50,
			y: 50,
			width: 100,
			height: 100,
			// markup: [
			// 	{
			// 		tagName: 'rect',
			// 		selector: 'body',
			// 	},
			// ],
			attrs: {
				label: {
					text: 'Hello',
					fill: '#6a6c8a',
				},
				body: {
					stroke: '#31d0c6',
					strokeWidth: 2,
				},
			},
			ports: {
				groups: {
					group1: {
						attrs,
						position: {
							name: 'top',
						},
					},
					group2: {
						attrs,
						position: {
							name: 'left',
						},
					},
					group3: {
						attrs,
						position: {
							name: 'right',
						},
					},
					group4: {
						attrs,
						position: {
							name: 'bottom',
						},
					},
				},
			},
		})

		const target = graph.addNode({
			x: 300,
			y: 50,
			width: 100,
			height: 100,
			attrs: {
				label: {
					text: 'World',
					fill: '#6a6c8a',
				},
				body: {
					stroke: '#31d0c6',
					strokeWidth: 2,
				},
			},
			ports: {
				groups: {
					groups: {
						group1: {
							attrs,
							position: {
								name: 'top',
							},
						},
						group2: {
							attrs,
							position: {
								name: 'left',
							},
						},
						group3: {
							attrs,
							position: {
								name: 'right',
							},
						},
						group4: {
							attrs,
							position: {
								name: 'bottom',
							},
						},
					},
					// group1: {
					// 	attrs: {
					// 		circle: {
					// 			r: 6,
					// 			magnet: true,
					// 			stroke: '#31d0c6',
					// 			fill: '#fff',
					// 			strokeWidth: 2,
					// 		},
					// 	},
					// 	position: {
					// 		name: 'absolute',
					// 		args: {
					// 			x: 50,
					// 			y: 50,
					// 		},
					// 	},
					// },
				},
			},
		})

		const rect = graph.addNode({
			x: 0,
			y: 0,
			width: 100,
			height: 100,
			ports: {
				groups: {
					sin: {
						position: {
							name: 'sin',
							args: {
								start: 45,
							},
						},
						attrs: {
							rect: {
								fill: '#fe854f',
								width: 11,
							},
							text: {
								fill: '#fe854f',
							},
							circle: {
								fill: '#fe854f',
								r: 5,
								magnet: true,
							},
						},
					},
				},
			},
		})
		Array.from({ length: 4 }).forEach(() => {
			rect.addPort({ group: 'sin' })
		})
		const dnd = new Dnd({
			target: graph,
			scaled: false,
			animation: true,
			validateNode(droppingNode, options) {
				console.log(droppingNode)
				return droppingNode.shape === 'html'
					? new Promise((resolve) => {
							const { draggingNode, draggingGraph } = options
							const view = draggingGraph.findView(draggingNode)
							const contentElem = view.findOne('foreignObject > body > div')
							Dom.addClass(contentElem, 'validating')
							setTimeout(() => {
								Dom.removeClass(contentElem, 'validating')
								resolve(true)
							}, 3000)
					  })
					: true
			},
		})
		setDndTarget(dnd)
		// graph.addEdge({ source, target })
		graph.centerContent()
		setGraph(graph)
		setGraphState(graph)
	}, [setGraph])

	const startDrag = (e) => {
		const target = e.currentTarget
		const type = target.getAttribute('data-type')
		const node = graph.createNode({
			width: 100,
			height: 100,
			shape: 'html',
			html: () => {
				const wrap = document.createElement('div')
				wrap.style.width = '100%'
				wrap.style.height = '100%'
				wrap.style.display = 'flex'
				wrap.style.alignItems = 'center'
				wrap.style.justifyContent = 'center'
				wrap.style.border = '2px solid rgb(49, 208, 198)'
				wrap.style.background = '#fff'
				wrap.innerText = type
				return wrap
			},
		})

		dndTarget.start(node, e.nativeEvent)
	}
	return (
		<div className='dnd-box'>
			<div className='dnd-wrap'>
				<div data-type='router' className='dnd-rect' onMouseDown={startDrag}>
					router
				</div>
				<div data-type='switch' className='dnd-rect' onMouseDown={startDrag}>
					switch
				</div>
				<div data-type='fail' className='dnd-rect' onMouseDown={startDrag}>
					fail
				</div>
			</div>
			<div className='content' ref={container} id='container'>
				<Portal />
			</div>
		</div>
	)
}

export default DndboxFn
