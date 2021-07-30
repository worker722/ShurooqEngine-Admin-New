import React, { useState, useEffect, Fragment } from "react";
import { Input, Form, Button, Checkbox, DatePicker, InputNumber } from "antd";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../../_redux/activities/activitiesActions";
import moment from 'moment';
import { CloseCircleOutlined, CloseOutlined } from '@ant-design/icons';

import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const dateFormat = 'YYYY-MM-DD';

function BookingLimits(props) {

  const dispatch = useDispatch();
  const { editId } = props;

  useEffect(() => {
    dispatch(actions.getIdData(editId, token));
  }, []);

  const token = useSelector(({ auth }) => auth.authToken, shallowEqual);
  const { addActivityId, activityData, addActivityStatusData } = useSelector(
    (state) => ({
      addActivityId: state.activities.addActivityId,
      activityData: state.activities.activityData,
      addActivityStatusData: state.activities.addActivityStatusData,
    }),
    shallowEqual
  );

  const editActivity = (values) => {
    dispatch(actions.editActivity(values, token));
  };

  ////////////////////////////////////////////////////
  const [inputFields, setInputFields] = useState([
  ]);
  const [daySet, setDaySet] = useState([]);

  const setSelectDay = (index, data, spliceNum) => {
    const values = [...daySet];
    for (var i = 0; i < data[index].days.length; i++) {
      if (data[index].days[i] == 1) values[index].mon = true;
      if (data[index].days[i] == 2) values[index].tues = true;
      if (data[index].days[i] == 3) values[index].wed = true;
      if (data[index].days[i] == 4) values[index].thur = true;
      if (data[index].days[i] == 5) values[index].fri = true;
      if (data[index].days[i] == 6) values[index].sat = true;
      if (data[index].days[i] == 0) values[index].sun = true;
    }

    if (spliceNum == 1) values[index].mon = false;
    if (spliceNum == 2) values[index].tues = false;
    if (spliceNum == 3) values[index].wed = false;
    if (spliceNum == 4) values[index].thur = false;
    if (spliceNum == 5) values[index].fri = false;
    if (spliceNum == 6) values[index].sat = false;
    if (spliceNum == 0) values[index].sun = false;
    setDaySet(values);
  }

  const handleAddFields = () => {
    setInputFields([...inputFields, { start_date: new Date(), end_date: new Date(), daily_limit: 0 }]);
  };

  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  const startDateChanged = (date, index) => {
    // const { value } = event.target;
    const list = [...inputFields];
    list[index]['start_date'] = moment(date).format(dateFormat).toString();
    setInputFields(list);
  };

  const endDateChanged = (date, index) => {
    const list = [...inputFields];
    list[index]['end_date'] = moment(date).format(dateFormat).toString();
    setInputFields(list);
  };

  const adultChanged = (value, index) => {
    // const { value } = event.target;
    const list = [...inputFields];
    list[index]['daily_limit'] = value;
    setInputFields(list);
  };

  ////////////////////////////////////////////////////
  const [inputDay, setInputDay] = useState([
  ]);

  const handleAddDay = () => {
    setInputDay([...inputDay, { days: [], daily_limit: 0 }]);
    setDaySet([...daySet, { mon: false, tues: false, wed: false, thur: false, fri: false, sat: false, sun: false }]);
  };

  const handleRemoveDay = (index) => {
    const values = [...inputDay];
    values.splice(index, 1);
    setInputDay(values);
  };

  const adultDayChanged = (value, index) => {
    const list = [...inputDay];
    list[index]['daily_limit'] = value;
    setInputDay(list);
  };

  const selectDay = (event, index) => {
    const list = [...inputDay];
    const value = event.target.checked;
    let spliceNum = -1;
    if (value) {
      list[index]['days'].push(Number(event.target.name))
    }
    else {
      for (var i = 0; i < list[index]['days'].length; i++) {
        if (list[index]['days'][i] == event.target.name) {
          list[index]['days'].splice(i, 1);
          spliceNum = event.target.name;
        }
      }
    }
    setInputDay(list);

    setSelectDay(index, list, spliceNum);
  }

  useEffect(() => {
    let bookingSchd = JSON.parse(activityData?.datewise_booking_limits);
    if (bookingSchd != null) {
      let rangList = [];
      for (var i = 0; i < bookingSchd.length; i++) {
        var rangeData = {};
        rangeData["start_date"] = new Date(bookingSchd[i].start_date);
        rangeData["end_date"] = new Date(bookingSchd[i].end_date);
        rangeData["daily_limit"] = bookingSchd[i].daily_limit;
        rangList.push(rangeData);
      }
      setInputFields(rangList);
    }

    let dayData = JSON.parse(activityData?.daywise_bookinglimit_options);
    if (dayData != null) {
      setInputDay(dayData);

      const list = [];
      for (var index = 0; index < dayData.length; index++) {
        let values = {};
        values['mon'] = false;
        values['tues'] = false;
        values['wed'] = false;
        values['thur'] = false;
        values['fri'] = false;
        values['sat'] = false;
        values['sun'] = false;

        for (var i = 0; i < dayData[index].days.length; i++) {
          if (dayData[index].days[i] == 1) values.mon = true;
          if (dayData[index].days[i] == 2) values.tues = true;
          if (dayData[index].days[i] == 3) values.wed = true;
          if (dayData[index].days[i] == 4) values.thur = true;
          if (dayData[index].days[i] == 5) values.fri = true;
          if (dayData[index].days[i] == 6) values.sat = true;
          if (dayData[index].days[i] == 0) values.sun = true;
        }
        list.push(values);
      }
      setDaySet(list);
    }

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

  const [form] = Form.useForm();
  const onFinish = values => {
    let data = {};
    data["id"] = addActivityId;
    data["daily_limit"] = values.daily_limit;
    data["overall_bookings_limit"] = values.overall_bookings_limit;
    data["datewise_booking_limits"] = JSON.stringify(inputFields);
    data["daywise_bookinglimit_options"] = JSON.stringify(inputDay);

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
      <div className="row">
        <div className="col-3"></div>
        <div className="col-2">
          <Form.Item name="daily_limit" label="Daily Limit" rules={[{ required: true }]}>
            <InputNumber min={0} />
          </Form.Item>
        </div>
        <div className="col-1"></div>
        <div className="col-2">
          <Form.Item name="overall_bookings_limit" label="Overall Limit" rules={[{ required: true }]}>
            <InputNumber min={0} />
          </Form.Item>
        </div>
        <div className="col-3"></div>
      </div>

      <Form.Item>
        <div className="form-group row" style={{ marginTop: '50px' }}>
          <div className="col-2">
            <Button
              type="primary"
              className="mr-2"
              style={{ float: "right" }}
              onClick={() => handleAddFields()}
            >
              Add Datewise Data
            </Button>
          </div>
          <div className="col-10 form-row" style={{ marginTop: "10px" }}>
            {inputFields.map((inputDate, index) => (
              <Fragment key={index}>
                <div className="col-12 form-row" style={{ marginTop: 20 }}>
                  <div className="col-1"></div>
                  <label className=" col-form-label activity-title" style={{ marginRight: 20 }}>Start Date</label>
                  <div className="col-2">
                    <DatePicker
                      onChange={e => startDateChanged(e, index)}
                      defaultValue={moment(inputDate.start_date, dateFormat)}
                      format={dateFormat}
                    />
                  </div>

                  <label className="col-form-label activity-title" style={{ marginRight: 20 }}>End Date</label>
                  <div className="col-2">
                    <DatePicker
                      onChange={e => endDateChanged(e, index)}
                      defaultValue={moment(inputDate.end_date, dateFormat)}
                      format={dateFormat}
                    />
                  </div>
                  <div className="col-2" style={{ marginLeft: 50 }}>
                    <label>
                      Daily Adult Limit
                      <InputNumber min={0} defaultValue={inputDate.daily_limit} onChange={e => adultChanged(e, index)} />
                    </label>
                  </div>

                  <div className="col-form-label" style={{ marginLeft: 20 }} >
                    <span onClick={() => handleRemoveFields(index)} >
                      <CloseCircleOutlined />
                    </span>
                  </div>

                  <div className="col-1">
                  </div>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      </Form.Item>

      <Form.Item>
        <div className="form-group row" style={{ marginTop: '50px' }}>
          <div className="col-2">
            <Button
              type="primary"
              className="mr-2"
              style={{ float: "right" }}
              onClick={() => handleAddDay()}
            >
              Add Daywise Data
            </Button>
          </div>
          <div className="col-10 form-row">
            {inputDay.map((inputDay, index) => (
              <Fragment key={index}>
                <div className="col-12 form-row" style={{ marginTop: 20 }} >
                  <div className="col-8">
                    <Checkbox name="1" onChange={e => selectDay(e, index)} checked={daySet[index].mon} >Monday</Checkbox>
                    <Checkbox name="2" onChange={e => selectDay(e, index)} checked={daySet[index].tues} >Tuseday</Checkbox>
                    <Checkbox name="3" onChange={e => selectDay(e, index)} checked={daySet[index].wed} >Wednesday</Checkbox>
                    <Checkbox name="4" onChange={e => selectDay(e, index)} checked={daySet[index].thur} >Thursday</Checkbox>
                    <Checkbox name="5" onChange={e => selectDay(e, index)} checked={daySet[index].fri} >Friday</Checkbox>
                    <Checkbox name="6" onChange={e => selectDay(e, index)} checked={daySet[index].sat} >Saturday</Checkbox>
                    <Checkbox name="0" onChange={e => selectDay(e, index)} checked={daySet[index].sun} >Sunday</Checkbox>
                  </div>
                  <div className="col-2">
                    <label>
                      Daily Adult Limit
                      <InputNumber min={0} defaultValue={inputDay.daily_limit} onChange={e => adultDayChanged(e, index)} />
                    </label>
                  </div>
                  <div className="col-form-label" style={{ marginLeft: 20 }} >
                    <span onClick={() => handleRemoveDay(index)}>
                      <CloseCircleOutlined />
                    </span>
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

export default BookingLimits;
