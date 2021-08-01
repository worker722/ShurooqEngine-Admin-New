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
import * as actions from "../../../_redux/linkedactivities/linkedactivitiesActions";

function ListForm(props) {
	const { linkedactivitiesList } = props;
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
			title: 'Count',
			dataIndex: 'count',
			render: (_, record) => (
				<div className="d-flex">
					<AvatarStatus name={record.count.toString()} />
				</div>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'count')
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
		history.push("/app/linked-activities/" + id);
	}
	
	const userAdd = () => {
		history.push("/app/linked-activities/new");
	}

	const [list, setList] = useState(linkedactivitiesList)


	const onSearch = e => {
		const value = e.currentTarget.value
		const searchArray = e.currentTarget.value ? list : linkedactivitiesList
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

const LinkedActivityList = () => {

	const dispatch = useDispatch();
	const history = useHistory();
    const [load, setLoad] = useState(0);
	const token = useSelector(({ auth }) => auth.authToken, shallowEqual);
	useEffect(() => {
        dispatch(actions.getLinkedActivitieslist());
		setLoad(1);
	}, []);
	const { linkedactivitiesList } = useSelector(
        (state) => ({
            linkedactivitiesList: state.linkedactivities.linkedactivitiesList,
        }),
        shallowEqual
    );

	const [lstData, setLstData] = useState([]);
    useEffect(() => {
        let listActivity = [];
        for (var i = 0; i < linkedactivitiesList.length; i++) {
            let data = {};
            data["id"] = linkedactivitiesList[i].id;
            data["name"] = JSON.parse(linkedactivitiesList[i].linked_activties)[0]?.name;
            data["count"] = JSON.parse(linkedactivitiesList[i].linked_activties)[0]?.linked_activities.length;
            listActivity.push(data);
        }

        setLstData(listActivity);
    }, [linkedactivitiesList])

	return (
		<div>
			{lstData && load == 1 && <ListForm linkedactivitiesList={lstData} />}
		</div>
	)
}

export default LinkedActivityList
