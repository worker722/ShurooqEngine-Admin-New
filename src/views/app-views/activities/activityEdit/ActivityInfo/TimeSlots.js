import React, { useState, Fragment, useEffect } from "react";
import { Form, Button, Input, Checkbox, DatePicker, TimePicker, InputNumber } from "antd";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../../_redux/activities/activitiesActions";
import moment from 'moment';
import { CloseCircleOutlined } from '@ant-design/icons';

import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const timeFormat = 'HH:mm:ss';
const dateFormat = 'YYYY-MM-DD';

const TimeSlots = (props) => {

  const dispatch = useDispatch();
  const { editId } = props;

  useEffect(() => {
    dispatch(actions.getIdData(editId, token));
  }, []);

  const token = useSelector(({ auth }) => auth.authToken, shallowEqual);
  const { activityData, addActivityId, addActivityStatusData } = useSelector(
    (state) => ({
      activityData: state.activities.activityData,
      addActivityId: state.activities.addActivityId,
      addActivityStatusData: state.activities.addActivityStatusData,
    }),
    shallowEqual
  );

  const makeRandomId = () => {
    var result = addActivityId;
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const makeRandomIdT = () => {
    var result = addActivityId;
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const [randomId, setRandomId] = useState(makeRandomId());
  const [randomIdT, setRandomIdT] = useState(makeRandomIdT());

  const [inputFields, setInputFields] = useState([]);
  const [addTimeSlotData, setAddTimeSlotData] = useState([]);
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
    setRandomIdT(makeRandomIdT());
    setInputFields([...inputFields, { id: randomIdT, start_time: new Date(), end_time: new Date(), enable: false, daliy_limit: 0 }]);
    setAddTimeSlotData([...inputFields, { id: randomIdT, start_time: new Date(), end_time: new Date(), enable: false, daliy_limit: 0 }]);
  };

  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
    setAddTimeSlotData(values);

  };

  const startTimeChanged = (time, index) => {
    const list = [...inputFields];
    list[index]['start_time'] = time.toString();
    setInputFields(list);
    setAddTimeSlotData(list);
  };

  const endTimeChanged = (time, index) => {
    const list = [...inputFields];
    list[index]['end_time'] = time.toString();
    setInputFields(list);
    setAddTimeSlotData(list);
  };

  const adultChanged = (value, index) => {
    const list = [...inputFields];
    list[index]['daliy_limit'] = value;
    setInputFields(list);
    setAddTimeSlotData(list);
  };

  const [enableTimeslots, setEnableTimeSlots] = React.useState(false);
  const enableChanged = (event, index) => {
    const value = event.target.checked;
    const list = [...inputFields];
    list[index]['enable'] = value;
    setInputFields(list);
    setAddTimeSlotData(list);
  };

  /////////////////////////////////////////////////////
  const [inputDate, setInputDate] = useState([
  ])

  const handleAddFieldsDateTimeslots = (index) => {
    let startDate = inputDate[index]['start_date'];
    let endDate = inputDate[index]['end_date'];
    let timeSlts = inputDate[index]['timeslots'];
    let timeData = {
      id: randomId, start_time: new Date(), end_time: new Date(), daliy_limit: 0, enable: false
    }
    timeSlts.push(timeData);

    let newArr = [...inputDate];
    newArr[index] = { start_date: startDate, end_date: endDate, timeslots: timeSlts };

    setRandomId(makeRandomId());
    setInputDate(newArr);
  };

  const startDateChanged = (time, index) => {
    const list = [...inputDate];
    list[index]['start_date'] = time.toString();
    setInputDate(list);
  };

  const endDateChanged = (time, index) => {
    const list = [...inputDate];
    list[index]['end_date'] = time.toString();
    setInputDate(list);
  };

  const handleAddFieldsDate = () => {
    setInputDate([...inputDate, {
      start_date: new Date(), end_date: new Date(),
      timeslots: [...addTimeSlotData]
    }]);
    setRandomId(makeRandomId());
  };

  const handleRemoveFieldsDate = (index) => {
    const values = [...inputDate];
    values.splice(index, 1);
    setInputDate(values);
  };

  const handleRemoveFieldsDateTimeslot = (index, i) => {
    let newArr = [...inputDate];
    newArr[index]['timeslots'].splice(i, 1);
    setInputDate(newArr);
  };


  const enableTimeSlotsChanged = (event) => {
    const value = event.target.checked;
    setEnableTimeSlots(value)
  };

  const startTimeSlotChanged = (time, i, index) => {
    const list = [...inputDate];
    list[i]['timeslots'][index]['start_time'] = time.toString();
    setInputDate(list);
  };

  const endTimeSlotChanged = (time, i, index) => {
    const list = [...inputDate];
    list[i]['timeslots'][index]['end_time'] = time.toString();
    setInputDate(list);
  };

  const adultSlotChanged = (value, i, index) => {
    const list = [...inputDate];
    list[i]['timeslots'][index]['daliy_limit'] = value;
    setInputDate(list);
  };

  const enableSlotChanged = (event, i, index) => {
    const value = event.target.checked;
    const list = [...inputDate];
    list[i]['timeslots'][index]['enable'] = value;
    setInputDate(list);
  };

  /////////////////////////////////////////////////////
  const [inputDay, setInputDay] = useState([
  ])

  const handleAddFieldsDayTimeslots = (index) => {
    let days = inputDay[index]['days'];
    let timeSlts = inputDay[index]['timeslots'];
    let timeData = {
      id: randomId, start_time: new Date(), end_time: new Date(), daliy_limit: 0, enable: false
    }
    timeSlts.push(timeData);

    let newArr = [...inputDay];
    newArr[index] = { days: days, timeslots: timeSlts };

    setRandomId(makeRandomId());
    setInputDay(newArr);
  };

  const handleAddFieldsDay = () => {
    setInputDay([...inputDay, {
      days: [],
      timeslots: [...addTimeSlotData]
    }]);
    setRandomId(makeRandomId());

    setDaySet([...daySet, { mon: false, tues: false, wed: false, thur: false, fri: false, sat: false, sun: false }]);
  };

  const handleRemoveFieldsDay = (index) => {
    const values = [...inputDay];
    values.splice(index, 1);
    setInputDay(values);
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

  const handleRemoveFieldsDayTimeslot = (index, i) => {
    let newArr = [...inputDay];
    newArr[index]['timeslots'].splice(i, 1);
    setInputDay(newArr);
  };

  const startDayTimeSlotChanged = (time, i, index) => {
    const list = [...inputDay];
    list[i]['timeslots'][index]['start_time'] = time.toString();
    setInputDay(list);
  };

  const endDayTimeSlotChanged = (time, i, index) => {
    const list = [...inputDay];
    list[i]['timeslots'][index]['end_time'] = time.toString();
    setInputDay(list);
  };

  const adultDaySlotChanged = (value, i, index) => {
    const list = [...inputDay];
    list[i]['timeslots'][index]['daliy_limit'] = value;
    setInputDay(list);
  };

  const enableDaySlotChanged = (event, i, index) => {
    const value = event.target.checked;
    const list = [...inputDay];
    list[i]['timeslots'][index]['enable'] = value;
    setInputDay(list);
  };

  ////////////////////////////////////////////////////////////

  useEffect(() => {
    if (activityData?.timeslots == "1")
      setEnableTimeSlots(true);
    else
      setEnableTimeSlots(false);

    let bookingSchd = JSON.parse(activityData?.timeslot_options);
    if (bookingSchd != null) {
      let rangList = [];
      for (var i = 0; i < bookingSchd.length; i++) {
        var rangeData = {};
        rangeData["id"] = bookingSchd[i].id;
        rangeData["start_time"] = new Date(bookingSchd[i].start_time);
        rangeData["end_time"] = new Date(bookingSchd[i].end_time);
        rangeData["enable"] = bookingSchd[i].enable;
        rangeData["daliy_limit"] = bookingSchd[i].daliy_limit;
        rangList.push(rangeData);
      }
      setInputFields(rangList);
      setAddTimeSlotData(rangList);
    }

    let inputDateData = JSON.parse(activityData?.datewise_timeslot_options);
    if (inputDateData != null) {
      let sltList = [];
      for (var i = 0; i < inputDateData.length; i++) {
        var rangeData = {};
        rangeData["start_date"] = new Date(inputDateData[i].start_date);
        rangeData["end_date"] = new Date(inputDateData[i].end_date);
        rangeData["timeslots"] = [];

        for (var j = 0; j < inputDateData[i].timeslots.length; j++) {
          var rangeChildDate = {};
          rangeChildDate["id"] = inputDateData[i].timeslots[j].id;
          rangeChildDate["start_time"] = new Date(inputDateData[i].timeslots[j].start_time);
          rangeChildDate["end_time"] = new Date(inputDateData[i].timeslots[j].end_time);
          rangeChildDate["enable"] = inputDateData[i].timeslots[j].enable;
          rangeChildDate["daliy_limit"] = inputDateData[i].timeslots[j].daliy_limit;

          rangeData["timeslots"].push(rangeChildDate);
        }
        sltList.push(rangeData);
      }

      setInputDate(sltList);
    }

    let dayData = JSON.parse(activityData?.daywise_timeslot_options);
    if (dayData != null) {
      let sltList = [];
      for (var i = 0; i < dayData.length; i++) {
        var rangeData1 = {};
        rangeData1["days"] = dayData[i].days;
        rangeData1["timeslots"] = [];

        for (var j = 0; j < dayData[i].timeslots.length; j++) {
          var rangeChildDate = {};
          rangeChildDate["id"] = dayData[i].timeslots[j].id;
          rangeChildDate["start_time"] = new Date(dayData[i].timeslots[j].start_time);
          rangeChildDate["end_time"] = new Date(dayData[i].timeslots[j].end_time);
          rangeChildDate["enable"] = dayData[i].timeslots[j].enable;
          rangeChildDate["daliy_limit"] = dayData[i].timeslots[j].daliy_limit;

          rangeData1["timeslots"].push(rangeChildDate);
        }
        sltList.push(rangeData1);
      }

      setInputDay(sltList);

      /////////////
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

    setRandomId(makeRandomId());
    setRandomIdT(makeRandomIdT());

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

  ////////////
  const [form] = Form.useForm();
  const onFinish = values => {
    let data = {};
    data["id"] = addActivityId;
    data["timeslot_options"] = JSON.stringify(inputFields);
    data["timeslots"] = enableTimeslots;
    data["datewise_timeslot_options"] = JSON.stringify(inputDate);
    data["daywise_timeslot_options"] = JSON.stringify(inputDay);

    dispatch(actions.editActivity(data, token));
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

      <div className="row" style={{ width: '100%' }}>
        <div className="col-2">
          <Checkbox style={{ float: "right" }} name="enableTimeSlots" checked={enableTimeslots} onChange={e => enableTimeSlotsChanged(e)} >Enable TimeSlots</Checkbox>
        </div>
        <div className="col-9">
          <Button
            className="mr-2"
            type="primary"
            style={{ float: "right" }}
            onClick={() => handleAddFields()}
          >
            Add
          </Button>
        </div>
      </div>

      <div className="form-row" style={{ marginTop: "10px" }}>
        {inputFields.map((inputField, index) => (
          <Fragment key={index}>
            <div className="row" style={{ width: '100%' }}>
              <div className="col-2"></div>
              <Input
                name="random"
                readOnly
                style={{ width: '100px', height: '40px' }}
                value={inputField.id}
              />
              <div className="col-2">
                <TimePicker
                  onChange={e => startTimeChanged(e, index)}
                  defaultValue={moment(inputField.start_time, timeFormat)}
                  style={{ marginLeft: 30 }}
                />
              </div>

              <div className="col-2">
                <TimePicker
                  onChange={e => endTimeChanged(e, index)}
                  defaultValue={moment(inputField.end_time, timeFormat)}
                  style={{ marginLeft: -30 }}
                />
              </div>
              <div className="col-2" style={{ marginLeft: 0 }}>
                <label>
                  <InputNumber
                    onChange={e => adultChanged(e, index)}
                    defaultValue={inputField.daliy_limit}
                    min={0}
                  />{" "}
                  Daliy Limit
                </label>
              </div>
              <div className="col-form-label">
                <Checkbox name="enable" onChange={e => enableChanged(e, index)} checked={inputField.enable} > Enable </Checkbox>
              </div>
              <div className="col-form-label" style={{ marginLeft: 20 }} >
                <span onClick={() => handleRemoveFields(index)}>
                  <CloseCircleOutlined />
                </span>
              </div>
            </div>
          </Fragment>
        ))}
      </div>

      <div className="form-group row" style={{ marginTop: '50px' }}>
        <div className="col-2">
          <Button
            className="mr-2"
            type="primary"
            style={{ float: "right" }}
            onClick={() => handleAddFieldsDate()}
          >
            Add Datewise Data
          </Button>
        </div>
        <div className="col-10 form-row">
          {inputDate.map((inputDate, index) => (
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
                <div className="col-form-label">
                  <span onClick={() => handleRemoveFieldsDate(index)}>
                    <CloseCircleOutlined />
                  </span>
                </div>
                <div className="col-2">
                  <Button
                    className="mr-2"
                    type="primary"
                    style={{ float: "right" }}
                    onClick={() => handleAddFieldsDateTimeslots(index)}
                  >
                    Add TimeSlots
                  </Button>
                </div>
                {inputDate['timeslots'].map((dateTimeSlot, i) => (
                  <Fragment key={i}>
                    <div className="row" style={{ width: '100%', marginTop: 5 }}>
                      <Input
                        name="random"
                        readOnly
                        style={{ width: '100px', height: '40px' }}
                        value={dateTimeSlot.id}
                      />

                      <div className="col-2">
                        <TimePicker
                          onChange={e => startTimeSlotChanged(e, index, i)}
                          defaultValue={moment(dateTimeSlot.start_time, timeFormat)}
                          format={timeFormat}
                        />
                      </div>

                      <div className="col-2">
                        <TimePicker
                          onChange={e => endTimeSlotChanged(e, index, i)}
                          defaultValue={moment(dateTimeSlot.end_time, timeFormat)}
                          format={timeFormat}
                        />
                      </div>
                      <div className="col-3" style={{ marginLeft: 0 }}>
                        <label>
                          <InputNumber
                            onChange={e => adultSlotChanged(e, index, i)}
                            defaultValue={dateTimeSlot.daliy_limit}
                            min={0}
                          />{" "}
                          Daliy Limit
                        </label>
                      </div>
                      <div className="col-form-label">
                        <Checkbox name="enable" onChange={e => enableSlotChanged(e, index, i)} checked={dateTimeSlot.enable} >Enable</Checkbox>
                      </div>
                      <div className="col-form-label" style={{ marginLeft: 20 }} >
                        <span onClick={() => handleRemoveFieldsDateTimeslot(index, i)}>
                          <CloseCircleOutlined />
                        </span>
                      </div>
                    </div>
                  </Fragment>
                ))}
              </div>
            </Fragment>
          ))}
        </div>
      </div>

      <div className="form-group row" style={{ marginTop: '100px' }}>
        <div className="col-2">
          <Button
            className="mr-2"
            type="primary"
            style={{ float: "right" }}
            onClick={() => handleAddFieldsDay()}
          >
            Add Daywise Data
          </Button>
        </div>
        <div className="col-10 form-row">
          {inputDay.map((inputDay, index) => (
            <Fragment key={index}>
              <div className="col-12 form-row" style={{ marginTop: "20px" }}>
                <div className="col-7">
                  <Checkbox name="1" onChange={e => selectDay(e, index)} checked={daySet[index].mon} >Monday</Checkbox>
                  <Checkbox name="2" onChange={e => selectDay(e, index)} checked={daySet[index].tues} >Tuseday</Checkbox>
                  <Checkbox name="3" onChange={e => selectDay(e, index)} checked={daySet[index].wed} >Wednesday</Checkbox>
                  <Checkbox name="4" onChange={e => selectDay(e, index)} checked={daySet[index].thur} >Thursday</Checkbox>
                  <Checkbox name="5" onChange={e => selectDay(e, index)} checked={daySet[index].fri} >Friday</Checkbox>
                  <Checkbox name="6" onChange={e => selectDay(e, index)} checked={daySet[index].sat} >Saturday</Checkbox>
                  <Checkbox name="0" onChange={e => selectDay(e, index)} checked={daySet[index].sun} >Sunday</Checkbox>
                </div>

                <div className="col-form-label">
                  <span onClick={() => handleRemoveFieldsDay(index)}>
                    <CloseCircleOutlined />
                  </span>
                </div>
                <div className="col-2">
                  <Button className="mr-2" type="primary" style={{ float: 'right' }} onClick={() => handleAddFieldsDayTimeslots(index)} >
                    Add TimeSlots
                  </Button>
                </div>
                {inputDay['timeslots'].map((dateTimeSlot, i) => (
                  <Fragment key={i}>
                    <div className="row" style={{ width: '100%', marginTop: 5 }}>
                      <Input
                        name="random"
                        readOnly
                        style={{ width: '100px', height: '40px' }}
                        value={dateTimeSlot.id}
                      />

                      <div className="col-2">
                        <TimePicker
                          onChange={e => startDayTimeSlotChanged(e, index, i)}
                          defaultValue={moment(dateTimeSlot.start_time, timeFormat)}
                        />
                      </div>

                      <div className="col-2">
                        <TimePicker
                          onChange={e => endDayTimeSlotChanged(e, index, i)}
                          defaultValue={moment(dateTimeSlot.end_time, timeFormat)}
                        />
                      </div>
                      <div className="col-3" style={{ marginLeft: 0 }}>
                        <label>
                          <InputNumber
                            onChange={e => adultDaySlotChanged(e, index, i)}
                            defaultValue={dateTimeSlot.daliy_limit}
                          />{" "}
                          Daliy Limit
                        </label>
                      </div>
                      <div className="col-form-label">
                        <Checkbox name="enable" onChange={e => enableDaySlotChanged(e, index, i)} checked={dateTimeSlot.enable} >Enable</Checkbox>
                      </div>
                      <div className="col-form-label" style={{ marginLeft: 20 }} >
                        <span onClick={() => handleRemoveFieldsDayTimeslot(index, i)}>
                          <CloseCircleOutlined />
                        </span>
                      </div>
                    </div>
                  </Fragment>
                ))}
              </div>
            </Fragment>
          ))}
        </div>
      </div>

      <Form.Item>
        <Button className="mr-2" type="primary" htmlType="submit" style={{ float: 'right' }} >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default TimeSlots;
