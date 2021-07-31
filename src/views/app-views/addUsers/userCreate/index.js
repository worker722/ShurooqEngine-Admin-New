/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { LeftOutlined } from '@ant-design/icons';
import Flex from 'components/shared-components/Flex'
import * as actions from "../../../_redux/users/usersActions";
import { Card, Select, Input, Button, Radio, Form } from 'antd';

const { Option } = Select;

const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 },
};
const tailLayout = {
	wrapperCol: { offset: 8, span: 16 },
};

function NewForm(props) {

	const { userData, form, onFinish, handleChange, selectVal, setSelectVal, selectValue } = props;
	return (
		<Form  {...layout} initialValues={userData} form={form} name="control-hooks" onFinish={onFinish}>
			<Form.Item name="username" label="User Name" rules={[{ required: true }]}>
				<Input />
			</Form.Item>
			<Form.Item name="password" label="Password" rules={[{ required: true }]}>
				<Input.Password />
			</Form.Item>
			<Form.Item name="confirmpwd" label="Confirm Password" dependencies={['password']}
				hasFeedback
				rules={[
					{
						required: true,
						message: 'Please confirm your password!',
					},
					({ getFieldValue }) => ({
						validator(rule, value) {
							if (!value || getFieldValue('password') === value) {
								return Promise.resolve();
							}
							return Promise.reject('The two passwords that you entered do not match!');
						},
					}),
				]}>
				<Input.Password />
			</Form.Item>
			<Form.Item label="Role" rules={[{ required: true }]}>
				<Select
					placeholder="Select a option and change input text above"
					defaultValue={selectValue}
					onChange={handleChange}
					allowClear
				>
					<Option value="1">Super Admin</Option>
					<Option value="2">Vendor</Option>
				</Select>
			</Form.Item>
			<Form.Item {...tailLayout}>
				<Button className="mr-2" type="primary" htmlType="submit" style={{ float: 'right' }} >
					Submit
				</Button>
			</Form.Item>
		</Form>
	)
}

function EditForm(props) {
	const { userData } = props;
	const [form] = Form.useForm();
	const [load, setLoad] = useState(0);
	const onFinish = values => {
		let data = {};
		data["username"] = values["username"];
		data["role"] = selectVal;
		data["password"] = values["password"];
		data["id"] = userData.id;

		addUser(JSON.stringify(data));
	};

	const selectValue = userData?.role.toString();
	useEffect(() => {
		setSelectVal(selectValue)
		setLoad(1);
	}, [userData]);
	const token = useSelector(({ auth }) => auth.authToken, shallowEqual);
	const history = useHistory();
	const dispatch = useDispatch();

	const addUser = (values) => {
		dispatch(actions.addUser(values, token)).then(() => gotoList());
	};

	const gotoList = () => {
		// dispatch(actions.setUserData());
		history.goBack();
	}
	const [selectVal, setSelectVal] = useState(1);
	function handleChange(value) {
		setSelectVal(value);
	}

	return (
		<div>
			{(userData && load == 1) ? (
				<NewForm userData={userData} form={form} onFinish={onFinish} selectValue={selectValue} setSelectVal={setSelectVal} selectVal={selectVal} handleChange={handleChange} />
			) :
				(<div></div>)}
		</div>
	)
}

const UserCreate = ({
	match: {
		params: { id },
	},
}) => {

	const token = useSelector(({ auth }) => auth.authToken, shallowEqual);
	const history = useHistory();
	const dispatch = useDispatch();
	const [load, setLoad] = useState(0);
	const { userData } = useSelector(
		(state) => ({
			userData: state.users.userData,
		}),
		shallowEqual
	);
	useEffect(() => {
		if (id != null) {
			dispatch(actions.getUserData(id, token));
			setLoad(1);
		}
		else
			dispatch(actions.setUserData());
	}, [id]);

	const addUser = (values) => {
		dispatch(actions.addUser(values, token)).then(() => gotoList());
	}

	const gotoList = () => {
		history.goBack();
	}

	const [form] = Form.useForm();
	const onFinish = values => {
		let data = {};
		data["username"] = values["username"];
		data["role"] = values["role"];
		data["password"] = values["password"];

		if (id != null) {
			data["id"] = id;
		}
		else {
			data["id"] = 0;
		}

		addUser(JSON.stringify(data));
	};

	return (
		<Card>
			<Flex alignItems="center" justifyContent="between" mobileFlex={false}>
				<Flex className="mb-1" mobileFlex={false}>
					<h2>Add USer</h2>
				</Flex>
				<div>
					<Button type="primary" onClick={gotoList} icon={<LeftOutlined />} block>Back</Button>
				</div>
			</Flex>
			<div style={{ width: '50%', marginLeft: '17%', marginTop: 100 }}>
				{(id == null) &&
					<Form  {...layout} form={form} name="control-hooks" onFinish={onFinish}>
						<Form.Item name="username" label="User Name" rules={[{ required: true }]}>
							<Input />
						</Form.Item>
						<Form.Item name="password" label="Password" rules={[{ required: true }]}>
							<Input.Password />
						</Form.Item>
						<Form.Item name="confirmpwd" label="Confirm Password" dependencies={['password']}
							hasFeedback
							rules={[
								{
									required: true,
									message: 'Please confirm your password!',
								},
								({ getFieldValue }) => ({
									validator(rule, value) {
										if (!value || getFieldValue('password') === value) {
											return Promise.resolve();
										}
										return Promise.reject('The two passwords that you entered do not match!');
									},
								}),
							]}>
							<Input.Password />
						</Form.Item>
						<Form.Item name="role" label="Role" rules={[{ required: true }]}>
							<Select
								placeholder="Select a option and change input text above"
								// onChange={onGenderChange}
								allowClear
							>
								<Option value="1">Super Admin</Option>
								<Option value="2">Vendor</Option>
							</Select>
						</Form.Item>
						<Form.Item {...tailLayout}>
							<Button className="mr-2" type="primary" htmlType="submit" style={{ float: 'right' }} >
								Submit
							</Button>
						</Form.Item>
					</Form>
				}
				{id != 0 && userData && load == 1 && <EditForm userData={userData} />}
			</div>
		</Card>
	)
}

export default UserCreate
