import React, { useState, Component, Fragment, useEffect } from "react";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import { DatePicker, DatePickerField, Input, Select } from "antd";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import Checkbox from '@material-ui/core/Checkbox';
import * as actions from "../../../../_redux/activities/activitiesActions";

import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

function AdditionalInfo(props) {

    const initialValues = {
        contact_details: "",
        out_of_stock_message: "",
        max_allowed_tickets_per_booking: "",
    };

    const Schema = Yup.object().shape({
        contact_details: Yup.string()
            .required(
                "The field requiered"
            ),
        out_of_stock_message: Yup.string()
            .required(
                "The field requiered"
            ),
        max_allowed_tickets_per_booking: Yup.string()
            .required(
                "The field requiered"
            ),
    });
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

    useEffect(() => {
        dispatch(actions.getIdData(editId, token));
        dispatch(actions.getLinkedActivities(token));
    }, []);

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

    useEffect(() => {
        // console.log(activityData.linked_activity_id)
        const linkId = activityData.linked_activity_id;
        if(linkId != null)
        {
            const list = [...inputData];
            list['linked_activity_id'] = linkId;
            list['max_allowed_tickets_per_booking'] = activityData.max_allowed_tickets_per_booking;
            list['out_of_stock_message'] = activityData.out_of_stock_message;
            list['contact_details'] = activityData.contact_details;
    
            setInputData(list);
        }
        
    }, [activityData]);

    const [linkedActivityData, setLinkedActivityData] = useState([]);
    useEffect(() => {
        let lstLinkData = [];
        for(var i = 0; i < linkedActivityList.length; i++)
        {
            let data = {};
            data["id"] = linkedActivityList[i].id;
            data["name"] = JSON.parse(linkedActivityList[i].linked_activties)[0].name;
            lstLinkData.push(data);
        }
        setLinkedActivityData(lstLinkData);
    }, [linkedActivityList]);

    const [inputData, setInputData] = useState([]);
    const handleIdChange = (event) => {
        const { value } = event.target;
        const list = [...inputData];
        list['linked_activity_id'] = value;

        setInputData(list);
    }

    return (

        <Formik
            enableReinitialize={true}
            initialValues={activityData ? activityData : initialValues}
            validationSchema={Schema}
            onSubmit={(values) => {
                let data = {};
                data["id"] = editId;
                data["max_allowed_tickets_per_booking"] = values.max_allowed_tickets_per_booking;
                data["contact_details"] = values.contact_details;
                data["out_of_stock_message"] = values.out_of_stock_message;
                data["linked_activity_id"] = inputData["linked_activity_id"];

                dispatch(actions.editActivity(JSON.stringify(data), token));
            }}
        >
            {({ handleSubmit }) => (

                <Form className="form form-label-right">

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

                    <div className="form-group row">
                        <div className="col-lg-2"></div>
                        <div className="col-lg-8">
                            <div className="row" style={{ marginTop: '50px' }}>
                                <div className="col-2"></div>
                                <label className="col-2 col-form-label activity-title">Max allowed Tickets</label>
                                <div className="col-6">
                                    <Field
                                        name="max_allowed_tickets_per_booking"
                                        component={Input}
                                        placeholder=""
                                    />
                                </div>
                            </div>
                            <div className="row" style={{ marginTop: '50px' }}>
                                <div className="col-2"></div>
                                <label className="col-2 col-form-label activity-title">Contact Details</label>
                                <div className="col-6">
                                    <Field
                                        name="contact_details"
                                        component={Input}
                                        placeholder=""
                                    />
                                </div>
                            </div>
                            <div className="row" style={{ marginTop: '50px' }}>
                                <div className="col-2"></div>
                                <label className="col-2 col-form-label activity-title">Out of Stock Message</label>
                                <div className="col-6">
                                    <Field
                                        name="out_of_stock_message"
                                        component={Input}
                                        placeholder=""
                                    />
                                </div>
                            </div>
                            <div className="row" style={{ marginTop: '50px' }}>
                                <div className="col-2"></div>
                                <label className="col-2 col-form-label activity-title">Linked Activities</label>
                                <div className="col-6">
                                    <Select name="enable" style={{ width: "auto" }} value={inputData["linked_activity_id"]} onChange={e => handleIdChange(e)}>
                                        <option key={0} value={0}></option>
                                        {linkedActivityData?.map((activity, index) => {
                                            return (
                                                <option key={index} value={activity.id}>{activity.name}</option>
                                            )
                                        })}
                                    </Select>
                                </div>
                            </div>

                        </div>
                        <div className="col-lg-2"></div>
                    </div>
                    <div className="form-group">
                        <div className="col-10"></div>
                        <button
                            type="submit"
                            className={`btn btn-Tab`}
                            style={{ float: "right" }}
                            onSubmit={() => handleSubmit()}
                        >Submit</button>
                    </div>
                </Form>
            )}
        </Formik>
    );
}

export default AdditionalInfo;
