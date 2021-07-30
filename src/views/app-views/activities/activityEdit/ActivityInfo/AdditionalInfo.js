import React, { useState, Component, Fragment, useEffect } from "react";
import * as Yup from "yup";
import { Button, Form, Input, Select } from "antd";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as actions from "../../../../_redux/activities/activitiesActions";

import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const { Option } = Select;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

function AddInfoForm(props) {

    const { activityData, addActivityStatusData, addActivityId, linkedActivityList, inputData, setInputData } = props;
    const token = useSelector(({ auth }) => auth.authToken, shallowEqual);
    const history = useHistory();
    const dispatch = useDispatch();

    ////////dialog///////
    const DialogContent = withStyles((theme) => ({
        root: {
            padding: theme.spacing(3),
        },
    }))(MuiDialogContent);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        dispatch(actions.setActivityStatusData(token));
    };

    useEffect(() => {
        if (addActivityStatusData != null)
            handleClickOpen();
    }, [addActivityStatusData]);
    //////////////////////////////////////

    const [linkedActivityData, setLinkedActivityData] = useState([]);
    useEffect(() => {
        let lstLinkData = [];
        for (var i = 0; i < linkedActivityList.length; i++) {
            let data = {};
            data["id"] = linkedActivityList[i].id;
            data["name"] = JSON.parse(linkedActivityList[i].linked_activties)[0].name;
            lstLinkData.push(data);
        }
        setLinkedActivityData(lstLinkData);
    }, [linkedActivityList]);

    const handleIdChange = (value) => {
        const list = [...inputData];
        list['linked_activity_id'] = value;

        setInputData(list);
    }

    const [form] = Form.useForm();
    const onFinish = values => {
        let data = {};
        data["id"] = addActivityId;
        data["max_allowed_tickets_per_booking"] = values.max_allowed_tickets_per_booking;
        data["contact_details"] = values.contact_details;
        data["out_of_stock_message"] = values.out_of_stock_message;
        data["linked_activity_id"] = inputData["linked_activity_id"];

        dispatch(actions.editActivity(JSON.stringify(data), token));
    };

    return (
        <Form {...layout} form={form} initialValues={activityData} name="control-hooks" onFinish={onFinish} style={{ width: '50%', marginLeft: '17%', marginTop: 100 }}>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        <b>Success</b>
                    </Typography>
                    <Typography gutterBottom style={{ marginTop: "10px" }}>
                        {addActivityStatusData}
                    </Typography>
                    <Typography gutterBottom style={{ marginTop: "10px" }}>
                        <Button autoFocus onClick={handleClose} style={{ backgroundColor: "#4ef508de", color: "white" }}>
                            Okay
                        </Button>
                    </Typography>
                </DialogContent>
            </Dialog>

            <Form.Item name="max_allowed_tickets_per_booking" label="Max allowed Tickets" rules={[{ required: true }]}>
                <Input />
            </Form.Item>

            <Form.Item name="contact_details" label="Contact Details" rules={[{ required: true }]}>
                <Input />
            </Form.Item>

            <Form.Item name="out_of_stock_message" label="Out of Stock Message" rules={[{ required: true }]}>
                <Input />
            </Form.Item>

            <Form.Item label="Linked Activities" rules={[{ required: true }]}>
                <Select
                    placeholder="Select a option"
                    defaultValue={inputData["linked_activity_id"]}
                    onChange={handleIdChange}
                    allowClear
                >
                    <Option value="0"></Option>
                    {linkedActivityData?.map((activity, index) => {
                        return (
                            <Option key={index + 1} value={activity.id}>{activity.name}</Option>
                        )
                    })}
                </Select>
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button className="mr-2" type="primary" htmlType="submit" style={{ float: 'right' }} >
                    Submit
                </Button>
            </Form.Item>
        </Form >
    )

}

function AdditionalInfo(props) {
    const [load, setLoad] = useState(0);
    const token = useSelector(({ auth }) => auth.authToken, shallowEqual);
    const history = useHistory();
    const { addActivityId, activityData, addActivityStatusData, linkedActivityList } = useSelector(
        (state) => ({
            addActivityId: state.activities.addActivityId,
            activityData: state.activities.activityData,
            addActivityStatusData: state.activities.addActivityStatusData,
            linkedActivityList: state.activities.linkedActivityList,
        }),
        shallowEqual
    );

    const dispatch = useDispatch();
    const { editId } = props;
    const [inputData, setInputData] = useState([]);

    useEffect(() => {
        dispatch(actions.getIdData(editId, token));
        dispatch(actions.getLinkedActivities(token));
        setLoad(1);
    }, []);

    useEffect(() => {
        const linkId = activityData.linked_activity_id;
        if (linkId != null) {
            const list = [...inputData];
            list['linked_activity_id'] = linkId;
            list['max_allowed_tickets_per_booking'] = activityData.max_allowed_tickets_per_booking;
            list['out_of_stock_message'] = activityData.out_of_stock_message;
            list['contact_details'] = activityData.contact_details;

            setInputData(list);
        }

    }, [activityData]);
    return (
        <div>
            {(activityData && load == 1 && inputData) ? (
                <AddInfoForm activityData={activityData} addActivityStatusData={addActivityStatusData} addActivityId={addActivityId} linkedActivityList={linkedActivityList} inputData={inputData} setInputData={setInputData} />
            ) :
                (<div></div>)}
        </div>
    );
}

export default AdditionalInfo;
