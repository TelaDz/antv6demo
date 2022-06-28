// 这是用来测试react渲染节点,并且导入再导入的效果
import React, { useEffect, useRef, useState } from 'react'
import { Graph, DataUri, Line, Path, Curve } from '@antv/x6'
import { usePortal, ReactShape } from '@antv/x6-react-shape'
import './test.css'
import { message, Form, Input, Select, Modal, InputNumber, Button } from 'antd'
import SwitchNode from './SwitchNode'
import RouterNode from './RouterNode'
import { values } from 'lodash'
const UNIQ_GRAPH_ID = 'UNIQ_GRAPH_ID'

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

		// attrHooks: {
		// 	showLabel: false,
		// },
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

const nodeData = [
	{
		id: '0',
		eqName: '路由器0',
		eqOrgId: 'eqOrgId',
		eqPortTypeNum: [
			'eqPortTypeNum/0/0/0',
			'eqPortTypeNum/0/0/1',
			'eqPortTypeNum/0/0/2',
		],
		eqTypeCode: 'router-node',
		eqTypeId: 'eqTypeId',
		eqTypeName: 'eqTypeName',
		errNode: false,
		eqIp: '192.168.1.0',
		x: 1,
		y: 0,
	},
	{
		id: '1',
		eqName: '路由器1',
		eqOrgId: 'eqOrgId',
		eqPortTypeNum: [
			'eqPortTypeNum/0/1/0',
			'eqPortTypeNum/0/1/1',
			'eqPortTypeNum/0/1/2',
		],
		eqTypeCode: 'router-node',
		eqTypeId: 'eqTypeId',
		eqTypeName: 'eqTypeName',
		errNode: false,
		eqIp: '192.168.1.1',
		x: 2,
		y: 0,
	},
	{
		id: '2',
		eqName: '路由器2',
		eqOrgId: 'eqOrgId',
		eqPortTypeNum: [
			'eqPortTypeNum/0/2/0',
			'eqPortTypeNum/0/2/1',
			'eqPortTypeNum/0/2/2',
		],
		eqTypeCode: 'router-node',
		eqTypeId: 'eqTypeId',
		eqTypeName: 'eqTypeName',
		errNode: false,
		eqIp: '192.168.1.2',
		x: 1,
		y: 1,
	},
	{
		id: '3',
		eqName: '路由器3',
		eqOrgId: 'eqOrgId',
		eqPortTypeNum: [
			'eqPortTypeNum/3/1/0',
			'eqPortTypeNum/3/1/1',
			'eqPortTypeNum/3/1/2',
		],
		eqTypeCode: 'router-node',
		eqTypeId: 'eqTypeId',
		eqTypeName: 'eqTypeName',
		errNode: false,
		eqIp: '192.168.1.2',
		x: 2,
		y: 1,
	},
	{
		id: '4',
		eqName: '交换机1',
		eqOrgId: 'eqOrgId',
		eqPortTypeNum: [
			'eqPortTypeNum/4/1/0',
			'eqPortTypeNum/4/1/1',
			'eqPortTypeNum/4/1/2',
		],
		eqTypeCode: 'router-node',
		eqTypeId: 'eqTypeId',
		eqTypeName: 'eqTypeName',
		errNode: false,
		eqIp: '192.168.1.2',
		x: 1,
		y: 2,
	},
	{
		id: '5',
		eqName: '交换机2',
		eqOrgId: 'eqOrgId',
		eqPortTypeNum: [
			'eqPortTypeNum/5/1/0',
			'eqPortTypeNum/5/1/1',
			'eqPortTypeNum/5/1/2',
		],
		eqTypeCode: 'router-node',
		eqTypeId: 'eqTypeId',
		eqTypeName: 'eqTypeName',
		errNode: false,
		eqIp: '192.168.1.2',
		x: 2,
		y: 2,
	},
	{
		id: '6',
		eqName: '防火墙1',
		eqOrgId: 'eqOrgId',
		eqPortTypeNum: [
			'eqPortTypeNum/6/1/0',
			'eqPortTypeNum/6/1/1',
			'eqPortTypeNum/6/1/2',
		],
		eqTypeCode: 'router-node',
		eqTypeId: 'eqTypeId',
		eqTypeName: 'eqTypeName',
		errNode: false,
		eqIp: '192.168.1.2',
		x: 0,
		y: 2,
	},
	{
		id: '7',
		eqName: '防火墙2',
		eqOrgId: 'eqOrgId',
		eqPortTypeNum: [
			'eqPortTypeNum/0/7/0',
			'eqPortTypeNum/0/7/1',
			'eqPortTypeNum/0/7/2',
		],
		eqTypeCode: 'router-node',
		eqTypeId: 'eqTypeId',
		eqTypeName: 'eqTypeName',
		errNode: false,
		eqIp: '192.168.1.2',
		x: 3,
		y: 2,
	},

	// {
	// 	id: '3',
	// 	eqName: '交换机1',
	// 	eqOrgId: 'eqOrgId',
	// 	eqPortTypeNum: ['eqPortTypeNum/0/0/2'],
	// 	eqTypeCode: 'switch-node',
	// 	eqTypeId: 'eqTypeId',
	// 	eqTypeName: 'eqTypeName',
	// 	errNode: false,
	// 	eqIp: '192.168.1.3',
	// 	x: 1.5,
	// 	y: 2,
	// },
	// {
	// 	id: '4',
	// 	eqName: '交换机2',
	// 	eqOrgId: 'eqOrgId',
	// 	eqPortTypeNum: ['eqPortTypeNum'],
	// 	eqTypeCode: 'switch-node',
	// 	eqTypeId: 'eqTypeId',
	// 	eqTypeName: 'eqTypeName',
	// 	errNode: false,
	// 	eqIp: '192.168.1.4',
	// 	x: 1.5,
	// 	y: 3.5,
	// },
]

const dddid = [
	{
		source: '0',
		target: '2',
		index: 0,
		data: {
			port: 'eqPortTypeNum/0/0/2',
		},
	},
	{
		source: '1',
		target: '3',
		index: 0,
		data: {
			port: 'eqPortTypeNum/0/1/2',
		},
	},
	{
		source: '2',
		target: '4',
		index: 0,
		data: {
			port: 'eqPortTypeNum/0/2/2',
		},
	},
	{
		source: '2',
		target: '5',
		index: 0,
		data: {
			port: 'eqPortTypeNum/0/3/2',
		},
	},
	{
		source: '3',
		target: '4',
		index: 0,
		data: {
			port: 'eqPortTypeNum/0/3/1',
		},
	},
	{
		source: '3',
		target: '5',
		index: 0,
		data: {
			port: 'eqPortTypeNum/0/3/2',
		},
	},
	{
		source: '3',
		target: '5',
		index: 0,
		data: {
			port: 'eqPortTypeNum/0/3/0',
		},
	},
	{
		source: '4',
		target: '6',
		index: 0,
		data: {
			port: 'eqPortTypeNum/0/4/2',
		},
	},
	{
		source: '4',
		target: '6',
		index: 1,
		data: {
			port: 'eqPortTypeNum/0/4/3',
		},
	},
	{
		source: '5',
		target: '7',
		index: 0,
		data: {
			port: 'eqPortTypeNum/0/5/2',
		},
	},
	{
		source: '5',
		target: '7',
		index: 1,
		data: {
			port: 'eqPortTypeNum/0/5/3',
		},
	},
	{
		source: '4',
		target: '5',
		index: 0,
		data: {
			port: 'eqPortTypeNum/0/4/2',
		},
	},
]
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
	const [edgeList, setEdgeList] = useState([])
	const [edit, setEdit] = useState(false)
	const [editNodeCell, setEditNodeCell] = useState()

	const container = useRef()
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
			// console.log('cell', cell)
			// console.log('edge', cell.data)
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
						<p>
							使用{source.data.eqName}端口:{edge.data.port}
						</p>
					</>
				),
			})
		})

		dddid.forEach((i) => {
			graph.addEdge({
				source: i.source,
				target: i.target,
				connector: {
					name: 'multi-smooth',
					args: {
						index: i.index,
					},
				},
				attrs: {
					line: {
						stroke: i.err ? 'red' : '#7c68fc', // 指定 path 元素的填充色
						targetMarker: null,
					},
				},
				data: i.data,
			})
		})
		setGraph(graph)
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
			shape: item.shape,
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
			value: item.data.id,
			label: item.data.eqName,
		}))
		setNodeList(nodesMap)
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

	return (
		<>
			<div className='content' ref={container} id='container'>
				<Portal />
			</div>
			<div>
				<button onClick={handleDownLoad}>导出数据</button>
				<button onClick={handlePNG}>导出PNG</button>
				{/* <button onClick={handleShowLabel}>展示其他数据</button> */}
				<button onClick={addNode}>添加节点</button>
				<button onClick={addDataEdge}>添加连线</button>
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
		</>
	)
}
