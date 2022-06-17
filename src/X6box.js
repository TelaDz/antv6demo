// 这是用来测试react渲染节点,并且导入再导入的效果
import React, { useEffect, useRef, useState } from 'react'
import { Graph, DataUri, Line, Path, Curve } from '@antv/x6'
import { usePortal, ReactShape } from '@antv/x6-react-shape'
import './test.css'
import { message, Form, Input, Select, Modal, InputNumber, Button } from 'antd'
import SwitchNode from './SwitchNode'
import RouterNode from './RouterNode'
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

Graph.registerEdge(
	'left',
	{
		inherit: 'edge',
		attrs: {
			line: {
				refX2: -10,
				refY2: 10,
			},
		},
	},
	true,
)
Graph.registerEdge(
	'left2',
	{
		inherit: 'edge',
		attrs: {
			line: {
				refX2: -20,
				refY2: 20,
			},
		},
	},
	true,
)
Graph.registerEdge(
	'right',
	{
		inherit: 'edge',
		attrs: {
			line: {
				refX2: 10,
				refY2: 10,
			},
		},
	},
	true,
)
Graph.registerEdge(
	'right2',
	{
		inherit: 'edge',
		attrs: {
			line: {
				refX2: 20,
				refY2: 20,
			},
		},
	},
	true,
)
const nodeData = [
	{
		id: '0',
		eqName: 'eqName1',
		eqOrgId: 'eqOrgId',
		eqPortTypeNum: ['eqPortTypeNum'],
		eqTypeCode: 'eqTypeCode',
		eqTypeId: 'eqTypeId',
		eqTypeName: 'eqTypeName',
		errNode: false,
		eqIp: '192.168.1.0',
		x: 50,
		y: 50,
		in: [],
		out: ['192.168.1.2', '192.168.1.3'],
		upEq: [
			{
				id: '1',
				eqName: 'eqName2',
				eqOrgId: 'eqOrgId',
				eqPortTypeNum: ['eqPortTypeNum'],
				eqTypeCode: 'eqTypeCode',
				eqTypeId: 'eqTypeId',
				eqName: 'eqName',
				errNode: false,
				eqIp: '192.168.1.0',
			},
		],
		downEq: [
			{
				id: '2',
				eqName: 'eqName3',
				eqOrgId: 'eqOrgId',
				eqPortTypeNum: ['eqPortTypeNum'],
				eqTypeCode: 'eqTypeCode',
				eqTypeId: 'eqTypeId',
				eqName: 'eqName',
				errNode: false,
				eqIp: '192.168.1.0',
			},
		],
	},
	{
		id: '2',
		eqName: 'eqName2',
		eqOrgId: 'eqOrgId',
		eqPortTypeNum: ['eqPortTypeNum'],
		eqTypeCode: 'eqTypeCode',
		eqTypeId: 'eqTypeId',
		eqTypeName: 'eqTypeName',
		errNode: false,
		eqIp: '192.168.1.2',
		x: 50,
		y: 200,
		in: ['192.168.1.0'],
		out: [],
		upEq: [],
		downEq: [],
	},
	{
		id: '3',
		eqName: 'eqName3',
		eqOrgId: 'eqOrgId',
		eqPortTypeNum: ['eqPortTypeNum'],
		eqTypeCode: 'eqTypeCode',
		eqTypeId: 'eqTypeId',
		eqTypeName: 'eqTypeName',
		errNode: false,
		eqIp: '192.168.1.3',
		x: 150,
		y: 200,
		in: ['192.168.1.0'],
		out: ['192.168.1.4'],
		upEq: [],
		downEq: [],
	},
	{
		id: '4',
		eqName: 'eqName4',
		eqOrgId: 'eqOrgId',
		eqPortTypeNum: ['eqPortTypeNum'],
		eqTypeCode: 'eqTypeCode',
		eqTypeId: 'eqTypeId',
		eqTypeName: 'eqTypeName',
		errNode: false,
		eqIp: '192.168.1.4',
		x: 150,
		y: 350,
		in: ['192.168.1.3'],
		out: [],
		upEq: [],
		downEq: [],
	},
]

const edgeList = () => {
	const data = []
	nodeData.map((item) => {
		if (item.out.length) {
			item.out.forEach((i) => {
				const targetId = data.push({
					source: item.eqIp,
					target: i,
					shape: 'dag-edge',
				})
			})
		}
	})
	return data
}
const ddd = [
	{
		source: '192.168.1.0',
		target: '192.168.1.2',
		shape: 'dag-edge',
	},
	{
		source: '192.168.1.2',
		target: '192.168.1.0',
		shape: 'down',
	},
	{
		source: '192.168.1.0',
		target: '192.168.1.2',
		shape: 'left',
	},
	{
		source: '192.168.1.0',
		target: '192.168.1.2',
		shape: 'right',
	},
	{
		source: '192.168.1.2',
		target: '192.168.1.0',
		shape: 'dag-edge',
	},
	{
		source: '192.168.1.0',
		target: '192.168.1.3',
		shape: 'dag-edge',
	},
	{
		source: '192.168.1.3',
		target: '192.168.1.4',
		shape: 'dag-edge',
	},
]
const dddid = [
	{
		source: '0',
		target: '2',
		shape: 'dag-edge',
	},
	{
		source: '2',
		target: '0',
		shape: 'down',
	},
	{
		source: '0',
		target: '2',
		shape: 'left',
	},
	{
		source: '0',
		target: '2',
		shape: 'right',
	},
	{
		source: '2',
		target: '0',
		shape: 'dag-edge',
	},
	{
		source: '0',
		target: '3',
		shape: 'dag-edge',
	},
	{
		source: '3',
		target: '4',
		shape: 'dag-edge',
	},
]
export default function Test(props) {
	const [form] = Form.useForm()
	const [formNodeEdge] = Form.useForm()
	const [Portal, setGraph] = usePortal(UNIQ_GRAPH_ID)
	const [graph, setGraphState] = useState()
	const [showForm, setShowForm] = useState(false)
	const [showFormEdge, setShowFormEdge] = useState(false)
	const [nodeList, setNodeList] = useState([])
	const [nodeListOther, setNodeListOther] = useState([])
	const [edgeList, setEdgeList] = useState([])
	const container = useRef()
	useEffect(() => {
		const graph = new Graph({
			container: container.current,
			// grid: true,
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
				x: item.x,
				y: item.y,
				width: 50,
				height: 50,
				shape: 'router-node',
				data: item,
				id: item.id,
			})
			cells.push(cell)
		})
		graph.on('node:mouseenter', ({ cell }) => {
			cell.addTools([
				{
					name: 'button-remove',
				},
			])
		})
		graph.on('node:mouseleave', ({ cell }) => {
			if (cell.hasTool('button-remove')) {
				cell.removeTool('button-remove')
			}
		})
		graph.on('node:click', ({ cell }) => {
			console.log('click', cell)
			cell.setAttrs({
				showLabel: !cell.attrs.showLabel,
			})
			message.success('node:click')
		})
		graph.on('node:contextmenu', ({ cell }) => {
			console.log('contextmenuc', cell.data)
			message.success('node:contextmenu')
		})
		graph.on('edge:click', ({ cell }) => {
			console.log('click', cell)
			cell.setAttrs({
				showLabel: !cell.attrs.showLabel,
			})
			message.success('edge:click')
		})
		graph.on('edge:contextmenu', ({ cell }) => {
			console.log('contextmenuc', cell)
			message.success('edge:contextmenu')
		})
		dddid.forEach((i) => {
			if (i.shape === 'dag-edge') {
				graph.addEdge({
					source: i.source,
					target: i.target,
				})
			} else if (i.shape === 'left') {
				graph.addEdge({
					source: i.source,
					target: i.target,
					attrs: {
						line: {
							stroke: '#722ed1',
							refX2: -10,
							refY2: 0,
						},
					},
				})
			} else if (i.shape === 'right') {
				graph.addEdge({
					source: i.source,
					target: i.target,
					attrs: {
						line: {
							stroke: 'yellow',
							refX2: 10,
							refY2: 0,
						},
					},
				})
			} else if (i.shape === 'down') {
				graph.addEdge({
					source: i.source,
					target: i.target,
					attrs: {
						line: {
							stroke: 'red',
							refX2: 20,
							refY2: 0,
						},
					},
				})
			}
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
	function handleShowLabel() {
		console.log('graph', graph)
		// const cells = graph.getCells()
		// cells.on('node:click', ({ cell }) => {
		// 	console.log(1);
		// 	// console.log('click', cell)
		// 	// cell.setAttrs({
		// 	// 	showLabel: !cell.attrs.showLabel,
		// 	// })
		// 	// message.success('node:click')
		// })
	}
	const addNode = () => {
		showFormFn()
	}
	const showFormFn = () => {
		setShowForm(!showForm)
	}
	const showFormEdgeFn = () => {
		setShowFormEdge(!showFormEdge)
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
				shape: 'router-node',
				data: {
					...values,
					id,
				},
				id,
			})
		}
		showFormFn()
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
		})
		// if (comEdge.length > 0 && comEdge.length < 4) {
		// 	comEdge.forEach((item) => {
		// 		console.log(item);
		// 		if (item.shape === 'edge') {
		// 			graph.addEdge({
		// 				source: values.ip1,
		// 				target: values.ip2,
		// 				shape: 'left',
		// 			})
		// 		} else if (item.shape === 'left') {
		// 			graph.addEdge({
		// 				source: values.ip1,
		// 				target: values.ip2,
		// 				shape: 'right',
		// 			})
		// 		} else if (item.shape === 'right') {
		// 			graph.addEdge({
		// 				source: values.ip1,
		// 				target: values.ip2,
		// 				shape: 'left2',
		// 			})
		// 		} else if (item.shape === 'left2') {
		// 			graph.addEdge({
		// 				source: values.ip1,
		// 				target: values.ip2,
		// 				shape: 'right2',
		// 			})
		// 		} else {
		// 		}
		// 	})
		// }
		console.log(comEdge)
		showFormEdgeFn()
	}
	const addDataEdge = () => {
		const nodes = graph.getNodes()
		const nodesMap = nodes.map((item) => ({
			value: item.data.id,
			label: item.data.eqName,
		}))
		setNodeList(nodesMap)
		showFormEdgeFn()
	}
	const onChangeNodes = (value) => {
		console.log(value)
		const nodesMap = nodeList.filter((item) => item.value !== value)
		formNodeEdge.setFieldsValue({ ip2: undefined })
		setNodeListOther(nodesMap)
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
				<button onClick={handleShowLabel}>展示其他数据</button>
				<button onClick={addNode}>添加节点</button>
				<button onClick={addDataEdge}>添加连线</button>
			</div>

			<Modal visible={showForm} onCancel={showFormFn} footer={null}>
				<Form {...formItemLayout} onFinish={onFinish} preserve={false}>
					<Form.Item name='eqName' label='eqName' rules={[{ required: true }]}>
						<Input />
					</Form.Item>
					<Form.Item name='eqIp' label='eqIp' rules={[{ required: true }]}>
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
						name='eqType'
						label='eqType'
						hasFeedback
						rules={[
							{ required: true, message: 'Please select your country!' },
						]}>
						<Select placeholder='Please select a country'>
							<Select.Option value='router-node'>router-node</Select.Option>
						</Select>
					</Form.Item>
					<Form.Item>
						<Button htmlType='submit' type='primary'>
							提交
						</Button>
					</Form.Item>
				</Form>
			</Modal>
			<Modal visible={showFormEdge} onCancel={showFormEdgeFn} footer={null}>
				<Form
					form={formNodeEdge}
					{...formItemLayout}
					onFinish={onFinishEdge}
					preserve={false}>
					<Form.Item
						name='ip1'
						label='ip1'
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
						name='ip2'
						label='ip2'
						hasFeedback
						rules={[
							{ required: true, message: 'Please select your country!' },
						]}>
						<Select
							options={nodeListOther}
							placeholder='Please select a country'></Select>
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
