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
import * as actions from "../../../_redux/vendors/vendorsActions";

function ListForm(props) {
	const { vendorListData } = props;
	const history = useHistory();

	const tableColumns = [
		{
			title: 'ID',
			dataIndex: 'id'
		},
		{
			title: 'Name',
			dataIndex: 'name',
			render: (_, record) => (
				<div className="d-flex">
					<AvatarStatus name={record.name} />
				</div>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'name')
		},
		{
			title: 'Description',
			dataIndex: 'description',
			render: (_, record) => (
				<div className="d-flex">
					<AvatarStatus name={record.description} />
				</div>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'description')
		},
        {
			title: 'Location',
			dataIndex: 'location',
			render: (_, record) => (
				<div className="d-flex">
					<AvatarStatus name={record.location} />
				</div>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'location')
		},
        {
			title: 'Our Commission',
			dataIndex: 'our_commission',
			render: (_, record) => (
				<div className="d-flex">
					<AvatarStatus name={record.our_commission} />
				</div>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'our_commission')
		},
        {
			title: 'Allowed Users',
			dataIndex: 'allowed_users',
			render: (_, record) => (
				<div className="d-flex">
					<AvatarStatus name={record.allowed_users} />
				</div>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'allowed_users')
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
		history.push("/app/vendors/" + id);
	}
	
	const userAdd = () => {
		history.push("/app/vendors/new");
	}

	const [list, setList] = useState(vendorListData)


	const onSearch = e => {
		const value = e.currentTarget.value
		const searchArray = e.currentTarget.value ? list : vendorListData
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

const VendorList = () => {

	const dispatch = useDispatch();
	const history = useHistory();
    const [load, setLoad] = useState(0);
	const token = useSelector(({ auth }) => auth.authToken, shallowEqual);
	useEffect(() => {
        dispatch(actions.getVendorLists());
		setLoad(1);
	}, []);
	const { vendorListData } = useSelector(
        (state) => ({
            vendorListData: state.vendors.vendorListData,
        }),
        shallowEqual
      );

	return (
		<div>
			{vendorListData && load == 1 && <ListForm vendorListData={vendorListData} />}
		</div>
	)
}

export default VendorList
