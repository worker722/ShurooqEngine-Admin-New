/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { LeftOutlined } from '@ant-design/icons';
import Flex from 'components/shared-components/Flex'
import * as actions from "../../../_redux/vendoramenities/vendoramenitiesActions";
import { Card, Select, Input, Button, Checkbox, Form, InputNumber } from 'antd';
import ImageUploading from 'react-images-uploading';
import { CloseCircleOutlined } from '@ant-design/icons';

const { Option } = Select;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

function NewForm(props) {

    const { vendorAmenitiesData, form, onFinish, checkVal, selectChanged, selectVal, handleChange, vendorData } = props;
    return (
        <Form  {...layout} initialValues={vendorAmenitiesData} form={form} name="control-hooks" onFinish={onFinish}>
            <Form.Item label="Vendor" rules={[{ required: true }]}>
                <Select
                    placeholder="Select a option and change input text above"
                    defaultValue={selectVal}
                    onChange={handleChange}
                    allowClear
                >
                    {vendorData?.map((vendor, index) => {
                        return (
                            <Option key={index} value={vendor.id}>{vendor.name}</Option>
                        )
                    })}
                </Select>
            </Form.Item>
            <Form.Item name="amenity_name" label="Amenity Name" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item label="Enable" rules={[{ required: true }]}>
                <Checkbox name="enable" onChange={e => selectChanged(e)} checked={checkVal}></Checkbox>
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
    const { vendorAmenitiesData, vendorData, id } = props;
    const [form] = Form.useForm();
    const [load, setLoad] = useState(0);
    const onFinish = values => {
        values["id"] = id;
        values["enable"] = checkVal;
        values["vendor_id"] = selectVal;
        addVendorAmenitie(JSON.stringify(values));
    };

    useEffect(() => {
        setLoad(1);
        setCheckVal(vendorAmenitiesData?.enable)
        setSelectVal(vendorAmenitiesData?.vendor_id)
    }, [vendorAmenitiesData]);
    const token = useSelector(({ auth }) => auth.authToken, shallowEqual);
    const history = useHistory();
    const dispatch = useDispatch();

    const addVendorAmenitie = (values) => {
        dispatch(actions.addVendorAmenitie(values, token)).then(() => gotoList());
    };

    const gotoList = () => {
        // dispatch(actions.setvendorMealData());
        history.goBack();
    }
    const [checkVal, setCheckVal] = useState(0);

    const selectChanged = (event) => {
        setCheckVal(event.target.checked)
    };

    const [selectVal, setSelectVal] = useState(1);
    function handleChange(value) {
        setSelectVal(value);
    }

    return (
        <div>
            {(vendorAmenitiesData && load == 1) ? (
                <NewForm vendorAmenitiesData={vendorAmenitiesData} vendorData={vendorData} form={form} onFinish={onFinish} checkVal={checkVal} selectChanged={selectChanged} selectVal={selectVal} handleChange={handleChange} />
            ) :
                (<div></div>)}
        </div>
    )
}

const VendorAmensCreate = ({
    match: {
        params: { id },
    },
}) => {

    const token = useSelector(({ auth }) => auth.authToken, shallowEqual);
    const history = useHistory();
    const dispatch = useDispatch();
    const [load, setLoad] = useState(0);
    const { vendorAmenitiesData, vendorData } = useSelector(
        (state) => ({
            vendorData: state.vendoramenities.vendorData,
            vendorAmenitiesData: state.vendoramenities.vendorAmenitiesData,
        }),
        shallowEqual
    );
    useEffect(() => {
        dispatch(actions.getVendor());

        if (id != null) {
            dispatch(actions.getVendorAmenitieData(id, token));
            setLoad(1);
        }
        // else
        // dispatch(actions.setvendorMealData());
    }, [id]);

    const addVendorAmenitie = (values) => {
        dispatch(actions.addVendorAmenitie(values, token)).then(() => gotoList());
    }

    const gotoList = () => {
        history.goBack();
    }

    const [form] = Form.useForm();
    const onFinish = values => {
        values["id"] = 0;
        values["enable"] = checkVal;
        addVendorAmenitie(JSON.stringify(values));
    };

    //////////
    const [checkVal, setCheckVal] = useState(0);

    const selectChanged = (event) => {
        setCheckVal(event.target.checked)
    };

    return (
        <Card>
            <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
                <Flex className="mb-1" mobileFlex={false}>
                    <h2>Add VendorAmenity</h2>
                </Flex>
                <div>
                    <Button type="primary" onClick={gotoList} icon={<LeftOutlined />} block>Back</Button>
                </div>
            </Flex>
            <div style={{ width: '50%', marginLeft: '17%', marginTop: 100 }}>
                {(id == null) &&
                    <Form  {...layout} form={form} name="control-hooks" onFinish={onFinish}>
                        <Form.Item name="vendor_id" label="Vendor" rules={[{ required: true }]}>
                            <Select
                                placeholder="Select a option and change input text above"
                                allowClear
                            >
                                {vendorData?.map((vendor, index) => {
                                    return (
                                        <Option key={index} value={vendor.id}>{vendor.name}</Option>
                                    )
                                })}
                            </Select>
                        </Form.Item>
                        <Form.Item name="amenity_name" label="Amenity Name" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Enable" rules={[{ required: true }]}>
                            <Checkbox name="enable" onChange={e => selectChanged(e)} checked={checkVal}></Checkbox>
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button className="mr-2" type="primary" htmlType="submit" style={{ float: 'right' }} >
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                }
                {id != 0 && vendorAmenitiesData && load == 1 && <EditForm vendorAmenitiesData={vendorAmenitiesData} id={id} vendorData={vendorData} />}
            </div>
        </Card>
    )
}

export default VendorAmensCreate
