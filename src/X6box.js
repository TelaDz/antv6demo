// 这是用来测试react渲染节点,并且导入再导入的效果
import React, { useEffect, useRef, useState } from 'react'
import { Graph, DataUri, Line, Path, Curve } from '@antv/x6'
import { Dom, Addon, Shape } from '@antv/x6'
import { usePortal, ReactShape } from '@antv/x6-react-shape'
import './test.css'
import './demo2.css'
import { message, Form, Input, Select, Modal, InputNumber, Button } from 'antd'
import SwitchNode from './SwitchNode'
import RouterNode from './RouterNode'
import { values } from 'lodash'
import nodeData from './data2'
const UNIQ_GRAPH_ID = 'UNIQ_GRAPH_ID'
const { Dnd, Stencil } = Addon
const { Rect, Circle } = Shape
Graph.registerNode(
	'router-node',
	{
		inherit: 'react-shape',
		width: 50,
		height: 50,
		component: <RouterNode />,
		attrs: {
			showLabel: false,
		},
	},
	true,
)
Graph.registerConnector(
	'multi-smooth',
	(sourcePoint, targetPoint, routePoints, options) => {
		const { index = 0, total } = options
		const line = new Line(sourcePoint, targetPoint)
		const factor = (-1) ** index
		const jo = index % 2 === 0
		let num = 0
		if (jo) {
			num = index / 2
		} else {
			num = ((index + 1) * factor) / 2
		}
		const vertice = line
			.pointAtLength(line.length() / 2 + 16 * num)
			.rotate(90, line.getCenter())
		const points = [sourcePoint, vertice, targetPoint]
		const curves = Curve.throughPoints(points)
		const path = new Path(curves)
		return options.raw ? path : path.serialize()
	},
	true,
)

Graph.registerNode(
	'switch-node',
	{
		inherit: 'react-shape',
		width: 50,
		height: 50,
		component: <SwitchNode />,
		attrs: {
			showLabel: false,
		},
	},
	true,
)

export default function Test(props) {
	const [form] = Form.useForm()
	const [formNodeEdge] = Form.useForm()
	const [formNode] = Form.useForm()
	const [Portal, setGraph] = usePortal(UNIQ_GRAPH_ID)
	const [graph, setGraphState] = useState()
	const [showForm, setShowForm] = useState(false)
	const [showFormEdge, setShowFormEdge] = useState(false)
	const [showFormNode, setShowFormNode] = useState(false)
	const [nodeList, setNodeList] = useState([])
	const [nodeListPort, setNodeListPort] = useState([])
	const [nodeListOther, setNodeListOther] = useState([])
	const [nodeListOtherPort, setNodeListOtherPort] = useState([])
	const [editNodeCell, setEditNodeCell] = useState()
	const [dndTarget, setDndTarget] = useState()

	const container = useRef()
	const refStencil = useRef()
	useEffect(() => {
		const graph = new Graph({
			container: container.current,
			grid: {
				size: 50,
				visible: true,
				type: 'mesh', // 'dot' | 'fixedDot' | 'mesh'
				args: {
					color: '#ccc',
				},
			},
			snapline: true,
			panning: {
				enabled: true,
				modifiers: 'shift',
			},
			height: 500,
		})
		const cells = []
		nodeData.forEach((item) => {
			const cell = graph.addNode({
				x: item.x * 100,
				y: item.y * 100,
				width: 50,
				height: 50,
				shape: item.eqTypeCode,
				data: item,
				id: item.id,
			})
			cells.push(cell)
		})
		graph.on('node:mouseenter', ({ cell }) => {
			cell.addTools([
				{
					name: 'button-remove',
					args: {
						onClick({ view }) {
							console.log(view)
							const node = view.cell
							Modal.confirm({
								title: '确定删除此节点？',
								onOk() {
									node.remove()
								},
								onCancel() {
									console.log('Cancel')
								},
								okText: '确定',
								cancelText: '取消',
							})
						},
					},
				},
			])
		})
		graph.on('node:mouseleave', ({ cell }) => {
			if (cell.hasTool('button-remove')) {
				cell.removeTool('button-remove')
			}
		})
		graph.on('edge:mouseenter', ({ cell }) => {
			console.log(cell)
			cell.addTools([
				{
					name: 'button-remove',
					args: {
						onClick({ view }) {
							console.log(view)
							const edge = view.cell
							Modal.confirm({
								title: '确定删除这条连线？',
								onOk() {
									edge.remove()
								},
								onCancel() {
									console.log('Cancel')
								},
								okText: '确定',
								cancelText: '取消',
							})
						},
					},
				},
			])
		})
		graph.on('edge:mouseleave', ({ cell }) => {
			if (cell.hasTool('button-remove')) {
				cell.removeTool('button-remove')
			}
		})
		graph.on('node:click', ({ cell, node }) => {
			console.log('click', node.data)
			setShowFormNode(true)
			setEditNodeCell(node)
			formNode.setFieldsValue({
				eqTypeCode: node.data.eqTypeCode,
				eqIp: node.data.eqIp,
				eqName: node.data.eqName,
				x: node.data.x,
				y: node.data.y,
				id: node.data.id,
			})
		})
		graph.on('edge:click', ({ cell, edge }) => {
			const datalist = graph.getNodes()
			const source = datalist.find((item) => item.id === edge.source.cell)
			const target = datalist.find((item) => item.id === edge.target.cell)
			console.log('edge', edge)
			console.log(source.data, target.data)
			Modal.info({
				title: '链接信息',
				content: (
					<>
						<p>设备1:{source.data.eqName} </p>
						<p>设备2:{target.data.eqName} </p>
						{/* <p>
							使用{source.data.eqName}端口:{edge.data.port}
						</p> */}
					</>
				),
			})
		})

		// dddid.forEach((i) => {
		// 	graph.addEdge({
		// 		source: i.source,
		// 		target: i.target,
		// 		connector: {
		// 			name: 'multi-smooth',
		// 			args: {
		// 				index: i.index,
		// 			},
		// 		},
		// 		attrs: {
		// 			line: {
		// 				stroke: i.err ? 'red' : '#7c68fc', // 指定 path 元素的填充色
		// 				targetMarker: null,
		// 			},
		// 		},
		// 		data: i.data,
		// 	})
		// })
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

		const stencil = new Stencil({
			title: '搜索',
			target: graph,
			search(cell, keyword, groupName, stencil) {
				return cell.data.eqName?.indexOf(keyword) !== -1
			},
			placeholder: '设备名字',
			notFoundText: '未找到',
			// collapsable: true,
			stencilGraphWidth: 200,
			stencilGraphHeight: 180,
			groups: [
				{
					name: 'group1',
					title: '路由器',
				},
				{
					name: 'group2',
					title: '防火墙',
				},
				{
					name: 'group2',
					title: '交换机',
				},
			],
			layoutOptions: {
				columns: 1,
			},
		})

		refStencil.current.appendChild(stencil.container)
		const dndList = nodeData.map((item, index) =>
			graph.createNode({
				width: 50,
				height: 50,
				shape: 'router-node',
				data: {
					...item,
					eqName: `${item.eqName}${index}`,
					id: new Date().getTime() + '' + index,
				},
				id: new Date().getTime() + '' + index,
			}),
		)
		console.log(dndList)
		stencil.load(dndList, 'group1')

		stencil.load([], 'group2')
		stencil.load([], 'group3')
		stencil.resizeGroup('group1', { width: 100, height: dndList.length * 100 })
		setGraph(graph)
		setDndTarget(dnd)
		setGraphState(graph)
	}, [setGraph])

	function handleDownLoad() {
		const data = graph.toJSON()
		console.log(data)
	}
	function handleInsert(data) {
		graph.fromJSON(data.graph)
	}
	function handlePNG() {
		graph.toPNG((dataUri) => {
			DataUri.downloadDataUri(dataUri, 'chart.png')
		})
	}

	const addNode = () => {
		setShowForm(true)
	}
	const showModalCanCel = () => {
		setShowForm(false)
		setShowFormEdge(false)
		setShowFormNode(false)
		setEditNodeCell()
	}

	const onFinish = (values) => {
		console.log(values)
		if (values) {
			const id = new Date().getTime()
			graph.addNode({
				x: values.x * 100,
				y: values.y * 100,
				width: 50,
				height: 50,
				shape: values.eqTypeCode,
				data: {
					...values,
					id,
				},
				id,
			})
		}
		showModalCanCel()
	}
	const onFinishEdge = (values) => {
		const edges = graph.getEdges()
		const edgesMap = edges.map((item) => ({
			source: item.source.cell,
			target: item.target.cell,
		}))
		const comEdge = edgesMap.filter(
			(item) => item.source === values.ip1 && item.target === values.ip2,
		)
		graph.addEdge({
			source: values.ip1,
			target: values.ip2,
			connector: {
				name: 'multi-smooth',
				args: {
					index: comEdge.length,
				},
			},
			attrs: {
				line: {
					targetMarker: null,
				},
			},
			data: {
				// source: item.source.cell,
				// target: item.target.cell,
			},
		})
		showModalCanCel()
	}
	const onFinishNode = () => {
		const values = formNode.getFieldsValue(true)
		console.log(editNodeCell)
		if (
			editNodeCell.data.eqName === values.eqName &&
			editNodeCell.data.eqIp === values.eqIp &&
			editNodeCell.data.eqTypeCode === values.eqTypeCode
		) {
			showModalCanCel()
		} else {
			const data = {
				x: editNodeCell.position().x,
				y: editNodeCell.position().y,
				width: 50,
				height: 50,
				shape: values.eqTypeCode,
				data: {
					...editNodeCell.data,
					eqName: values.eqName,
					eqIp: values.eqIp,
					eqTypeCode: values.eqTypeCode,
				},
				id: editNodeCell.id,
			}
			editNodeCell.remove()
			console.log(data)
			const cell = graph.addNode(data)
			showModalCanCel()
		}
	}

	const addDataEdge = () => {
		const nodes = graph.getNodes()
		const nodesMap = nodes.map((item) => ({
			value: item.id,
			label: item.data.eqName,
		}))
		setNodeList(nodesMap)
		console.log('nodesMap', nodesMap)
		setShowFormEdge(true)
	}
	const onChangeNodes = (value) => {
		const currentNode = graph.getNodes().find((item) => item.id === value)
		const eqPortTypeNum = currentNode.data.eqPortTypeNum
		setNodeListPort(eqPortTypeNum.map((item) => ({ value: item, label: item })))

		const nodesMap = nodeList.filter((item) => item.value !== value)
		formNodeEdge.setFieldsValue({ ip2: undefined })
		setNodeListOther(nodesMap)
	}
	const onChangeNodesOtherPort = (value) => {
		const currentNode = graph.getNodes().find((item) => item.id === value)
		const eqPortTypeNum = currentNode.data.eqPortTypeNum
		setNodeListOtherPort(
			eqPortTypeNum.map((item) => ({ value: item, label: item })),
		)
	}
	const formItemLayout = {
		labelCol: { span: 4 },
		wrapperCol: { span: 14 },
	}
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
			<div className='app-stencil' ref={refStencil}></div>

			<div className='content' ref={container} id='container'>
				<Portal />
			</div>
			<div className='dnd-wrap'>
				{/* <div data-type='router' className='dnd-rect' onMouseDown={startDrag}>
					router
				</div>
				<div data-type='switch' className='dnd-rect' onMouseDown={startDrag}>
					switch
				</div>
				<div data-type='fail' className='dnd-rect' onMouseDown={startDrag}>
					fail
				</div> */}
				<div>
					<button onClick={handleDownLoad}>导出数据</button>
					<button onClick={handlePNG}>导出PNG</button>
					<button onClick={addNode}>添加节点</button>
					<button onClick={addDataEdge}>添加连线</button>
				</div>
			</div>
			<Modal
				title='添加新设备节点'
				visible={showForm}
				onCancel={showModalCanCel}
				destroyOnClose
				footer={null}>
				<Form
					{...formItemLayout}
					form={form}
					onFinish={onFinish}
					preserve={false}>
					<Form.Item
						name='eqName'
						label='设备名称'
						rules={[{ required: true }]}>
						<Input />
					</Form.Item>
					<Form.Item name='eqIp' label='设备IP' rules={[{ required: true }]}>
						<Input />
					</Form.Item>
					<Form.Item
						name='y'
						label='行'
						rules={[{ required: true, pattern: /[0-9]/ }]}>
						<InputNumber style={{ width: '100%' }} />
					</Form.Item>
					<Form.Item
						name='x'
						label='列'
						rules={[{ required: true, pattern: /[0-9]/ }]}>
						<InputNumber style={{ width: '100%' }} />
					</Form.Item>
					<Form.Item
						name='eqTypeCode'
						label='设备类型'
						hasFeedback
						rules={[{ required: true, message: '选择设备类型' }]}>
						<Select
							placeholder='选择设备类型'
							options={[
								{ value: 'router-node', label: '路由器' },
								{ value: 'switch-node', label: '交换机' },
							]}></Select>
					</Form.Item>
					<Form.Item>
						<Button htmlType='submit' type='primary'>
							提交
						</Button>
					</Form.Item>
				</Form>
			</Modal>
			<Modal
				visible={showFormEdge}
				title='添加连线'
				onCancel={showModalCanCel}
				destroyOnClose
				footer={null}>
				<Form
					form={formNodeEdge}
					{...formItemLayout}
					onFinish={onFinishEdge}
					preserve={false}>
					<Form.Item
						name='ip1'
						label='节点1'
						hasFeedback
						rules={[
							{ required: true, message: 'Please select your country!' },
						]}>
						<Select
							options={nodeList}
							onChange={onChangeNodes}
							placeholder='Please select a country'></Select>
					</Form.Item>
					<Form.Item
						name='port1'
						label='节点1端口'
						hasFeedback
						rules={[
							{ required: true, message: 'Please select your country!' },
						]}>
						<Select
							options={nodeListPort}
							placeholder='Please select a country'></Select>
					</Form.Item>
					<Form.Item
						name='ip2'
						label='节点2'
						hasFeedback
						rules={[
							{ required: true, message: 'Please select your country!' },
						]}>
						<Select
							options={nodeListOther}
							onChange={onChangeNodesOtherPort}
							placeholder='Please select a country'></Select>
					</Form.Item>
					<Form.Item
						name='port2'
						label='节点2端口'
						hasFeedback
						rules={[
							{ required: true, message: 'Please select your country!' },
						]}>
						<Select
							options={nodeListOtherPort}
							placeholder='Please select a country'></Select>
					</Form.Item>
					<Form.Item>
						<Button htmlType='submit' type='primary'>
							提交
						</Button>
					</Form.Item>
				</Form>
			</Modal>
			<Modal
				title='节点设备'
				visible={showFormNode}
				onCancel={showModalCanCel}
				destroyOnClose
				footer={null}>
				<Form
					form={formNode}
					{...formItemLayout}
					onFinish={onFinishNode}
					preserve={false}>
					<Form.Item
						name='eqName'
						label='设备名称'
						rules={[{ required: true }]}>
						<Input />
					</Form.Item>
					<Form.Item name='eqIp' label='设备IP' rules={[{ required: true }]}>
						<Input />
					</Form.Item>
					<Form.Item
						name='eqTypeCode'
						label='设备类型'
						hasFeedback
						rules={[{ required: true, message: '选择设备类型' }]}>
						<Select
							placeholder='选择设备类型'
							options={[
								{ value: 'router-node', label: '路由器' },
								{ value: 'switch-node', label: '交换机' },
							]}></Select>
					</Form.Item>
					<Form.Item>
						<Button htmlType='submit' type='primary'>
							提交
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</div>
	)
}
