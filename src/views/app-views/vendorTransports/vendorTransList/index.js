/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Card, Table, Select, Input, Button, Badge, Menu, Tag } from 'antd';
import { EyeOutlined, UserAddOutlined, SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';
import AvatarStatus from 'components/shared-components/AvatarStatus';
import Flex from 'components/shared-components/Flex'
import utils from 'utils'
import * as actions from "../../../_redux/vendortransports/vendortransportsActions";

function ListForm(props) {
	const { vendorTransportListData } = props;
	const history = useHistory();

	const tableColumns = [
		{
			title: 'ID',
			dataIndex: 'id'
		},
		{
			title: 'Transport Name',
			dataIndex: 'transport_name',
			render: (_, record) => (
				<div className="d-flex">
					<AvatarStatus name={record.transport_name} />
				</div>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'transport_name')
		},
		{
			title: 'Oneway Price',
			dataIndex: 'oneway_price',
			render: (_, record) => (
				<div className="d-flex">
					<AvatarStatus name={record.oneway_price} />
				</div>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'oneway_price')
		},
		{
			title: 'Twoway Price',
			dataIndex: 'twoway_price',
			render: (_, record) => (
				<div className="d-flex">
					<AvatarStatus name={record.twoway_price} />
				</div>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'twoway_price')
		},
        {
			title: 'Enable',
			dataIndex: 'enable',
			render: (_, record) => (
				<div className="d-flex">
					<AvatarStatus name={record.enable.toString()} />
				</div>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'enable')
		},
		{
			title: 'Edit',
			dataIndex: 'edit',
			render: (_, record) => (
				<div className="d-flex">
					<Button onClick={e => userEdit(e, record.id)}>Edit</Button>
				</div>
			),
		},
	];

	const userEdit = (event, id) => {
		history.push("/app/vendor-transports/" + id);
	}
	
	const userAdd = () => {
		history.push("/app/vendor-transports/new");
	}

	const [list, setList] = useState(vendorTransportListData)


	const onSearch = e => {
		const value = e.currentTarget.value
		const searchArray = e.currentTarget.value ? list : vendorTransportListData
		const data = utils.wildCardSearch(searchArray, value)
		setList(data)
	}

	return (
		<Card>
			<Flex alignItems="center" justifyContent="between" mobileFlex={false}>
				<Flex className="mb-1" mobileFlex={false}>
					<div className="mr-md-3 mb-3">
						<Input placeholder="Search" prefix={<SearchOutlined />} onChange={e => onSearch(e)} />
					</div>
				</Flex>
				<div>
					<Button type="primary" onClick={userAdd} icon={<UserAddOutlined />} block>Add</Button>
				</div>
			</Flex>
			<div className="table-responsive">
				<Table
					columns={tableColumns}
					dataSource={list}
					rowKey='id'
				/>
			</div>
		</Card>
	)
}

const VendorTransList = () => {

	const dispatch = useDispatch();
	const history = useHistory();
    const [load, setLoad] = useState(0);
	const token = useSelector(({ auth }) => auth.authToken, shallowEqual);
	useEffect(() => {
        dispatch(actions.getVendorTransportLists());
		setLoad(1);
	}, []);
	const { vendorTransportListData } = useSelector(
        (state) => ({
            vendorTransportListData: state.vendortransports.vendorTransportListData,
        }),
        shallowEqual
      );

	return (
		<div>
			{vendorTransportListData && load == 1 && <ListForm vendorTransportListData={vendorTransportListData} />}
		</div>
	)
}

export default VendorTransList
