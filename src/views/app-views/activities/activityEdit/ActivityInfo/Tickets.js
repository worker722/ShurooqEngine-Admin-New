import React, { useState, useEffect, Fragment } from "react";
import { Form, Button, Input, Checkbox, InputNumber, Select } from "antd";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../../_redux/activities/activitiesActions";
import { MultiSelect } from "@progress/kendo-react-dropdowns";
import { CloseCircleOutlined } from '@ant-design/icons';

import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const { Option } = Select;

function Tickets(props) {

    const dispatch = useDispatch();
    const { editId } = props;

    useEffect(() => {
        dispatch(actions.getIdData(editId, token));
        dispatch(actions.getPlatformData(token));
    }, []);

    const token = useSelector(({ auth }) => auth.authToken, shallowEqual);
    const { addActivityId, activityData, addActivityStatusData, platformData } = useSelector(
        (state) => ({
            addActivityId: state.activities.addActivityId,
            activityData: state.activities.activityData,
            addActivityStatusData: state.activities.addActivityStatusData,
            platformData: state.activities.platformData,
        }),
        shallowEqual
    );

    const editActivity = (values) => {
        dispatch(actions.editActivity(values, token));
    };

    const makeRandomId = () => {
        var result = addActivityId;
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < 6; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    const [randomId, setRandomId] = useState(makeRandomId());

    ////////////////////////////////////////////////////
    const [inputFields, setInputFields] = useState([
    ]);

    const handleAddFields = () => {
        setRandomId(makeRandomId());
        setInputFields([...inputFields, { id: randomId, ticket_name: '', ticket_name_ar: '', cost_price: 0, markup_price: 0, daily_limit: 0, enable: false }]);
    };

    const handleRemoveFields = (index) => {
        const values = [...inputFields];
        values.splice(index, 1);
        setInputFields(values);
    };

    const dailyChanged = (value, index) => {
        const list = [...inputFields];
        list[index]['daily_limit'] = value;
        setInputFields(list);
    };

    const srcPriceChanged = (value, index) => {
        const list = [...inputFields];
        list[index]['cost_price'] = value;
        setInputFields(list);
    };

    const markupPriceChanged = (value, index) => {
        const list = [...inputFields];
        list[index]['markup_price'] = value;
        setInputFields(list);
    };

    const ticketNameChanged = ({ target: { value } }, index) => {
        const list = [...inputFields];
        list[index]['ticket_name'] = value;
        setInputFields(list);
    };

    const ticketNameARChanged = ({ target: { value } }, index) => {
        const list = [...inputFields];
        list[index]['ticket_name_ar'] = value;
        setInputFields(list);
    };

    const enableChanged = (event, index) => {
        const value = event.target.checked;
        const list = [...inputFields];
        list[index]['enable'] = value;
        setInputFields(list);
    };

    useEffect(() => {
        let bookingSchd = JSON.parse(activityData?.tickets);
        if (bookingSchd != null) {
            let rangList = [];
            for (var i = 0; i < bookingSchd.length; i++) {
                var rangeData = {};
                rangeData["id"] = bookingSchd[i].id;
                rangeData["ticket_name"] = bookingSchd[i].ticket_name;
                rangeData["ticket_name_ar"] = bookingSchd[i].ticket_name_ar;
                rangeData["daily_limit"] = bookingSchd[i].daily_limit;
                rangeData["platforms"] = bookingSchd[i].platforms;
                rangeData["cost_price"] = bookingSchd[i].cost_price;
                rangeData["markup_price"] = bookingSchd[i].markup_price;
                rangeData["enable"] = bookingSchd[i].enable;
                rangList.push(rangeData);
            }
            setInputFields(rangList);
        }

        setRandomId(makeRandomId());

    }, [activityData]);

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

    useEffect(() => {
        let lst = [];
        for (var i = 0; i < platformData.length; i++) {
            let data = {};
            data["id"] = platformData[i].id;
            data["platform_name"] = platformData[i].name;
            lst.push(data);
        }
        setActivityListData(lst);
    }, [platformData])

    const [activityListData, setActivityListData] = useState([]);
    const onActivityChange = (event, index) => {
        const list = [...inputFields];
        list[index]['platforms'] = event.value;
        setInputFields(list);
    };

    const [form] = Form.useForm();
    const onFinish = values => {
        let data = {};
        data["id"] = addActivityId;
        data["tickets"] = JSON.stringify(inputFields);

        editActivity(JSON.stringify(data));
    };

    return (
        <Form form={form} initialValues={activityData} name="control-hooks" onFinish={onFinish} style={{ width: '100%', marginTop: 100 }}>

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
            <Form.Item>
                <div className="form-group row">
                    <div className="col-2">
                        <Button
                            className="mr-2"
                            type="primary"
                            style={{ float: "right" }}
                            onClick={() => handleAddFields()}
                        >
                            Add
                        </Button>
                    </div>

                    <div className="col-10 form-row">
                        {inputFields.map((inputDate, index) => (
                            <Fragment key={index}>
                                <div className="form-row" style={{ marginTop: "15px" }}>
                                    <div className="col-1"></div>
                                    <div className="col-2">
                                        <Input
                                            name="random"
                                            readOnly
                                            style={{ width: '100px', height: '40px' }}
                                            value={inputDate.id}
                                        />
                                    </div>
                                    <div className="col-3">
                                        <label className="col-form-label" style={{ marginRight: 20 }}>Ticket Name</label>
                                        <Input
                                            style={{ width: '150px', height: '40px' }}
                                            value={inputDate.ticket_name}
                                            onChange={e => ticketNameChanged(e, index)}
                                        />
                                    </div>

                                    <div className="col-3">
                                        <label className="col-form-label" style={{ marginRight: 20 }}>Ticket Name AR</label>
                                        <Input
                                            style={{ width: '150px', height: '40px' }}
                                            value={inputDate.ticket_name_ar}
                                            onChange={e => ticketNameARChanged(e, index)}
                                        />
                                    </div>
                                    <div className="col-form-label" style={{ marginLeft: 20 }}>
                                        <span onClick={() => handleRemoveFields(index)}>
                                            <CloseCircleOutlined />
                                        </span>
                                    </div>
                                    <div className="col-2">
                                    </div>

                                    <div className="row" style={{ width: '100%', marginTop: 10 }}>
                                        <div className="col-2" style={{ marginLeft: 20 }}>
                                            <label>
                                                Cost Price
                                                <InputNumber
                                                    min={0}
                                                    onChange={e => srcPriceChanged(e, index)}
                                                    defaultValue={inputDate.cost_price}
                                                />{" "}
                                            </label>
                                        </div>
                                        <div className="col-2" style={{ marginLeft: 20 }}>
                                            <label>
                                                MarkUp Price
                                                <InputNumber
                                                    min={0}
                                                    onChange={e => markupPriceChanged(e, index)}
                                                    defaultValue={inputDate.markup_price}
                                                />{" "}
                                            </label>
                                        </div>
                                        <div className="col-2" style={{ marginLeft: 20 }}>
                                            <label>
                                                Daily Limit
                                                <InputNumber
                                                    min={0}
                                                    onChange={e => dailyChanged(e, index)}
                                                    defaultValue={inputDate.daily_limit}
                                                />{" "}
                                            </label>
                                        </div>
                                        <div className="col-3" style={{ marginLeft: 20 }}>
                                            <MultiSelect data={activityListData} onChange={e => onActivityChange(e, index)} value={inputDate.platforms} dataItemKey="id" textField="platform_name" />
                                        </div>
                                        <div className="col-form-label">
                                            <Checkbox name="enable" onChange={e => enableChanged(e, index)} checked={inputDate.enable} >Enable</Checkbox>
                                        </div>
                                        <div className="col-1"></div>
                                    </div>
                                </div>
                            </Fragment>
                        ))}
                    </div>
                </div>
            </Form.Item>

            <Form.Item>
                <Button className="mr-2" type="primary" htmlType="submit" style={{ float: 'right' }} >
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
}

export default Tickets;
