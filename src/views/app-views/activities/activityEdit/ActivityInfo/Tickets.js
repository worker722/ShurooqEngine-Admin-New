import React, { useState, useEffect, Fragment } from "react";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../../_redux/activities/activitiesActions";
import { NumericTextBox } from "@progress/kendo-react-inputs";
import { Checkbox } from "@progress/kendo-react-inputs";
import { MultiSelect } from "@progress/kendo-react-dropdowns";

import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

function Tickets(props) {

    const initialValues = {

    };

    const Schema = Yup.object().shape({

    });

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

    const dailyChanged = (event, index) => {
        const { value } = event.target;
        const list = [...inputFields];
        list[index]['daily_limit'] = value;
        setInputFields(list);
    };

    const srcPriceChanged = (event, index) => {
        const { value } = event.target;
        const list = [...inputFields];
        list[index]['cost_price'] = value;
        setInputFields(list);
    };

    const markupPriceChanged = (event, index) => {
        const { value } = event.target;
        const list = [...inputFields];
        list[index]['markup_price'] = value;
        setInputFields(list);
    };

    const ticketNameChanged = (event, index) => {
        const { value } = event.target;
        const list = [...inputFields];
        list[index]['ticket_name'] = value;
        setInputFields(list);
    };

    const ticketNameARChanged = (event, index) => {
        const { value } = event.target;
        const list = [...inputFields];
        list[index]['ticket_name_ar'] = value;
        setInputFields(list);
    };

    const enableChanged = (event, index) => {
        const { value } = event;
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

    return (

        <Formik
            enableReinitialize={true}
            initialValues={activityData.daily_adult_limit ? activityData : initialValues}
            validationSchema={Schema}
            onSubmit={(values) => {
                let data = {};
                data["id"] = addActivityId;
                data["tickets"] = JSON.stringify(inputFields);

                editActivity(JSON.stringify(data));
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

                    <div className="form-group row" style={{ marginTop: '100px' }}>
                        <div className="col-2">
                            <button
                                className="btn btn-Tab"
                                type="button"
                                style={{ float: "right" }}
                                onClick={() => handleAddFields()}
                            >
                                Add Tickets
                            </button>
                        </div>
                        <div className="col-12"></div>
                    </div>

                    <div className="form-row" style={{ marginTop: "10px" }}>
                        {inputFields.map((inputDate, index) => (
                            <Fragment key={index}>
                                <div className="col-2"></div>
                                <div className="col-2">
                                    <input
                                        type="text"
                                        name="random"
                                        readOnly
                                        style={{ width: '70px', height: '30px' }}
                                        value={inputDate.id}
                                    />
                                </div>
                                <div className="col-3">
                                    <label className="col-form-label" style={{ marginRight: 20 }}>Ticket Name</label>
                                    <input
                                        type="text"
                                        style={{ width: '150px', height: '30px' }}
                                        value={inputDate.ticket_name}
                                        onChange={e => ticketNameChanged(e, index)}
                                    />
                                </div>

                                <div className="col-3">
                                    <label className="col-form-label" style={{ marginRight: 20 }}>Ticket Name AR</label>
                                    <input
                                        type="text"
                                        style={{ width: '150px', height: '30px' }}
                                        value={inputDate.ticket_name_ar}
                                        onChange={e => ticketNameARChanged(e, index)}
                                    />
                                </div>
                                <div className="col-form-label">
                                    <span className="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow" style={{ backgroundColor: "#8950fc" }} onClick={() => handleRemoveFields(index)}>
                                        <i className="ki ki-bold-close icon-xs text-muted"></i>
                                    </span>
                                </div>
                                <div className="col-2">
                                </div>

                                <div className="row" style={{ width: '100%' }}>
                                    <div className="col-2" style={{ marginLeft: 20 }}>
                                        <label>
                                            Cost Price
                                            <NumericTextBox
                                                name="adult_limit"
                                                onChange={e => srcPriceChanged(e, index)}
                                                value={inputDate.cost_price}
                                            />{" "}
                                        </label>
                                    </div>
                                    <div className="col-2" style={{ marginLeft: 20 }}>
                                        <label>
                                            MarkUp Price
                                            <NumericTextBox
                                                name="adult_limit"
                                                onChange={e => markupPriceChanged(e, index)}
                                                value={inputDate.markup_price}
                                            />{" "}
                                        </label>
                                    </div>
                                    <div className="col-2" style={{ marginLeft: 20 }}>
                                        <label>
                                            Daily Limit
                                            <NumericTextBox
                                                name="adult_limit"
                                                onChange={e => dailyChanged(e, index)}
                                                value={inputDate.daily_limit}
                                            />{" "}
                                        </label>
                                    </div>
                                    <div className="col-3" style={{ marginLeft: 20 }}>
                                        <MultiSelect data={activityListData} onChange={e => onActivityChange(e, index)} value={inputDate.platforms} dataItemKey="id" textField="platform_name" />
                                    </div>
                                    <div className="col-form-label">
                                        <Checkbox name="enable" label="Enable" onChange={e => enableChanged(e, index)} value={inputDate.enable} />
                                    </div>
                                    <div className="col-1"></div>
                                </div>
                            </Fragment>
                        ))}
                    </div>

                    <div className="form-group">
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

export default Tickets;
