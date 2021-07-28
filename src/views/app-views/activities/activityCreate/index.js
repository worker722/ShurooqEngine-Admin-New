/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Card, Select, Input, Button, Radio, Form } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import Flex from 'components/shared-components/Flex'
import * as actions from "../../../_redux/activities/activitiesActions";

const { Option } = Select;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const ActivityCreate = () => {

    const token = useSelector(({ auth }) => auth.authToken, shallowEqual);
    const history = useHistory();
    const { addActivityStatusData, addActivityId, activityData } = useSelector(
        (state) => ({
            addActivityStatusData: state.activities.addActivityStatusData,
            addActivityId: state.activities.addActivityId,
            activityData: state.activities.activityData,
        }),
        shallowEqual
    );
    const dispatch = useDispatch();
    const addActivity = (values) => {
        dispatch(actions.addActivity(values, token));
    };

    const gotoList = () => {
        history.push("/app/activities");
    }

    useEffect(() => {
        if (addActivityId == 0) {
            //   history.push("/activities");
        }
        else {
            history.push("/app/activities/" + addActivityId);
        }
    }, [addActivityId]);

    const [form] = Form.useForm();
    const onGenderChange = value => {
        form.setFieldsValue({
            note: `${value === '1' ? 'Super Admin' : 'Vendor'}`,
        });
    };

    const onFinish = values => {
        values["activity_type"] = radValue;
        addActivity(JSON.stringify(values));
    };

    const [radValue, setRadValue] = useState(1);

    const radChanged = e => {
        console.log('radio checked', e.target.value);
        setRadValue(e.target.value);
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
                <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
                    <Form.Item name="vendor_id" label="Vendor" rules={[{ required: true }]}>
                        <Select
                            placeholder="Select a option and change input text above"
                            // onChange={onGenderChange}
                            allowClear
                        >
                            <Option value="1">Super Admin</Option>
                            <Option value="2">Vendor</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="activity_type" label="Type" rules={[{ required: true }]} >
                        <Radio.Group onChange={radChanged} value={radValue}>
                            <Radio value={1}>Activity One</Radio>
                            <Radio value={2}>Activity Two</Radio>
                            <Radio value={3}>Activity Three</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item name="activity_name" label="English Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="activity_name_ar" label="Arabic Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="activity_description" label="English Description" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="activity_description_ar" label="Arabic Description" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button className="mr-2" type="primary" htmlType="submit" style={{ float: 'right' }} >
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </Card>
    )
}

export default ActivityCreate
