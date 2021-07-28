import React, { useState, Fragment, useEffect } from "react";
import * as Yup from "yup";
import { Form, Formik, setIn } from "formik";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../../_redux/activities/activitiesActions";
import { Checkbox } from "@progress/kendo-react-inputs";
import { TimePicker } from "@progress/kendo-react-dateinputs";
import { NumericTextBox } from "@progress/kendo-react-inputs";
import { DatePicker } from "@progress/kendo-react-dateinputs";
import { format } from 'date-fns'

import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const TimeSlots = (props) => {
  const initialValues = {
  };
  const Schema = Yup.object().shape({
  });

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

    // for (var i = 0; i < inputDate.length; i++) {
    //   let startDate = inputDate[i]['start_date'];
    //   let endDate = inputDate[i]['end_date'];
    //   let timeSlts = inputDate[i]['timeslots'];
    //   let timeData = {
    //     id: randomId, start_time: new Date(), end_time: new Date(), daliy_limit: 0, enable: false
    //   }
    //   timeSlts.push(timeData);
    //   let newArr = [...inputDate];
    //   newArr[i] = { start_date: startDate, end_date: endDate, timeslots: timeSlts };

    //   setInputDate(newArr);
    // }
  };

  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
    setAddTimeSlotData(values);

  };

  const startTimeChanged = (event, index) => {
    const { value } = event.target;
    const list = [...inputFields];
    list[index]['start_time'] = value;
    setInputFields(list);
    setAddTimeSlotData(list);
  };

  const endTimeChanged = (event, index) => {
    const { value } = event.target;
    const list = [...inputFields];
    list[index]['end_time'] = value;
    setInputFields(list);
    setAddTimeSlotData(list);
  };

  const adultChanged = (event, index) => {
    const { value } = event.target;
    const list = [...inputFields];
    list[index]['daliy_limit'] = value;
    setInputFields(list);
    setAddTimeSlotData(list);
  };

  const [enableTimeslots, setEnableTimeSlots] = React.useState(false);
  const enableChanged = (event, index) => {
    const { value } = event;
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

  const startDateChanged = (event, index) => {
    const { value } = event.target;
    const list = [...inputDate];
    list[index]['start_date'] = value;
    setInputDate(list);
  };

  const endDateChanged = (event, index) => {
    const { value } = event.target;
    const list = [...inputDate];
    list[index]['end_date'] = value;
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
    const { value } = event;
    console.log(value)
    setEnableTimeSlots(value)
  };

  const startTimeSlotChanged = (event, i, index) => {
    const { value } = event.target;
    const list = [...inputDate];
    list[i]['timeslots'][index]['start_time'] = value;
    setInputDate(list);
  };

  const endTimeSlotChanged = (event, i, index) => {
    const { value } = event.target;
    const list = [...inputDate];
    list[i]['timeslots'][index]['end_time'] = value;
    setInputDate(list);
  };

  const adultSlotChanged = (event, i, index) => {
    const { value } = event.target;
    const list = [...inputDate];
    list[i]['timeslots'][index]['daliy_limit'] = value;
    setInputDate(list);
  };

  const enableSlotChanged = (event, i, index) => {
    const { value } = event;
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
    const { value } = event;

    let spliceNum = -1;
    if (value) {
      list[index]['days'].push(Number(event.target.element.name))
    }
    else {
      for (var i = 0; i < list[index]['days'].length; i++) {
        if (list[index]['days'][i] == event.target.element.name) {
          list[index]['days'].splice(i, 1);
          spliceNum = event.target.element.name;
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

  const startDayTimeSlotChanged = (event, i, index) => {
    const { value } = event.target;
    const list = [...inputDay];
    list[i]['timeslots'][index]['start_time'] = value;
    setInputDay(list);
  };

  const endDayTimeSlotChanged = (event, i, index) => {
    const { value } = event.target;
    const list = [...inputDay];
    list[i]['timeslots'][index]['end_time'] = value;
    setInputDay(list);
  };

  const adultDaySlotChanged = (event, i, index) => {
    const { value } = event.target;
    const list = [...inputDay];
    list[i]['timeslots'][index]['daliy_limit'] = value;
    setInputDay(list);
  };

  const enableDaySlotChanged = (event, i, index) => {
    const { value } = event;
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

  return (

    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={Schema}
      onSubmit={(values) => {
        let data = {};
        data["id"] = addActivityId;
        data["timeslot_options"] = JSON.stringify(inputFields);
        data["timeslots"] = enableTimeslots;
        data["datewise_timeslot_options"] = JSON.stringify(inputDate);
        data["daywise_timeslot_options"] = JSON.stringify(inputDay);

        dispatch(actions.editActivity(data, token));
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

          <div className="row" style={{ width: '100%' }}>
            <div className="col-1"></div>
            <div className="col-form-label">
              <Checkbox name="enableTimeSlots" label="Enable TimeSlots" value={enableTimeslots} onChange={e => enableTimeSlotsChanged(e)} />
            </div>
            <div className="col-9">
              <button
                className="btn btn-Tab"
                type="button"
                style={{ float: "right" }}
                onClick={() => handleAddFields()}
              >
                Add
              </button>
            </div>
          </div>

          <div className="form-row" style={{ marginTop: "10px" }}>
            {inputFields.map((inputField, index) => (
              <Fragment key={index}>
                <div className="row" style={{ width: '100%' }}>
                  <div className="col-2"></div>
                  <input
                    type="text"
                    name="random"
                    readOnly
                    style={{ width: '60px', height: '30px' }}
                    value={inputField.id}
                  />
                  <div className="col-2">
                    <TimePicker
                      name="start_time"
                      onChange={e => startTimeChanged(e, index)}
                      value={inputField.start_time}
                    />
                  </div>

                  <div className="col-2">
                    <TimePicker
                      name="end_time"
                      onChange={e => endTimeChanged(e, index)}
                      value={inputField.end_time}
                    />
                  </div>
                  <div className="col-3" style={{ marginLeft: 50 }}>
                    <label>
                      <NumericTextBox
                        name="daliy_limit"
                        onChange={e => adultChanged(e, index)}
                        value={inputField.daliy_limit}
                      />{" "}
                      Daliy Limit
                    </label>
                  </div>
                  <div className="col-form-label">
                    <span className="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow" style={{ backgroundColor: "#8950fc" }} onClick={() => handleRemoveFields(index)}>
                      <i className="ki ki-bold-close icon-xs text-muted"></i>
                    </span>
                  </div>
                  <div className="col-form-label">
                    <Checkbox name="enable" label="Enable" onChange={e => enableChanged(e, index)} value={inputField.enable} />
                  </div>
                </div>

              </Fragment>
            ))}
          </div>

          <div className="form-group row" style={{ marginTop: '100px' }}>
            <div className="col-2">
              <button
                className="btn btn-Tab"
                type="button"
                style={{ float: "right" }}
                onClick={() => handleAddFieldsDate()}
              >
                Add Datewise Data
              </button>
            </div>
            <div className="col-10"></div>

          </div>

          <div className="form-row" style={{ marginTop: "10px" }}>
            {inputDate.map((inputDate, index) => (
              <Fragment key={index}>
                <div className="col-2"></div>
                <label className=" col-form-label activity-title" style={{ marginRight: 20 }}>Start Date</label>
                <div className="col-3">
                  <DatePicker
                    name="start-date"
                    onChange={e => startDateChanged(e, index)}
                    value={inputDate.start_date}
                  />
                </div>

                <label className="col-form-label activity-title" style={{ marginRight: 20 }}>End Date</label>
                <div className="col-3">
                  <DatePicker
                    name="end-date"
                    onChange={e => endDateChanged(e, index)}
                    value={inputDate.end_date}
                  />
                </div>
                <div className="col-form-label">
                  <span className="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow" style={{ backgroundColor: "#8950fc" }} onClick={() => handleRemoveFieldsDate(index)}>
                    <i className="ki ki-bold-close icon-xs text-muted"></i>
                  </span>
                </div>
                <div className="col-2">
                  <button
                    className="btn btn-Tab"
                    type="button"
                    onClick={() => handleAddFieldsDateTimeslots(index)}
                  >
                    Add TimeSlots
                  </button>
                </div>
                {inputDate['timeslots'].map((dateTimeSlot, i) => (
                  <Fragment key={i}>
                    <div className="row" style={{ width: '100%' }}>
                      <div className="col-2"></div>
                      <input
                        type="text"
                        name="random"
                        readOnly
                        style={{ width: '60px', height: '30px' }}
                        value={dateTimeSlot.id}
                      />

                      <div className="col-2">
                        <TimePicker
                          name="start_timeslot"
                          onChange={e => startTimeSlotChanged(e, index, i)}
                          value={dateTimeSlot.start_time}
                        />
                      </div>

                      <div className="col-2">
                        <TimePicker
                          name="end_timeslot"
                          onChange={e => endTimeSlotChanged(e, index, i)}
                          value={dateTimeSlot.end_time}
                        />
                      </div>
                      <div className="col-3" style={{ marginLeft: 50 }}>
                        <label>
                          <NumericTextBox
                            name="adult_limitslot"
                            onChange={e => adultSlotChanged(e, index, i)}
                            value={dateTimeSlot.daliy_limit}
                          />{" "}
                          Daliy Limit
                        </label>
                      </div>
                      <div className="col-form-label">
                        <Checkbox name="enable" label="Enable" onChange={e => enableSlotChanged(e, index, i)} value={dateTimeSlot.enable} />
                      </div>
                      <div className="col-form-label">
                        <span className="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow" style={{ backgroundColor: "#8950fc" }} onClick={() => handleRemoveFieldsDateTimeslot(index, i)}>
                          <i className="ki ki-bold-close icon-xs text-muted"></i>
                        </span>
                      </div>
                    </div>
                  </Fragment>
                ))}
              </Fragment>
            ))}
          </div>

          <div className="form-group row" style={{ marginTop: '100px' }}>
            <div className="col-2">
              <button
                className="btn btn-Tab"
                type="button"
                style={{ float: "right" }}
                onClick={() => handleAddFieldsDay()}
              >
                Add Daywise Data
              </button>
            </div>
            <div className="col-10"></div>

          </div>

          <div className="form-row" style={{ marginTop: "10px" }}>
            {inputDay.map((inputDay, index) => (
              <Fragment key={index}>
                <div className="col-2"></div>
                <div className="col-7">
                  <Checkbox name="1" label="Monday" onChange={e => selectDay(e, index)} value={daySet[index].mon} />
                  <Checkbox name="2" label="Tuseday" onChange={e => selectDay(e, index)} value={daySet[index].tues} />
                  <Checkbox name="3" label="Wednesday" onChange={e => selectDay(e, index)} value={daySet[index].wed} />
                  <Checkbox name="4" label="Thursday" onChange={e => selectDay(e, index)} value={daySet[index].thur} />
                  <Checkbox name="5" label="Friday" onChange={e => selectDay(e, index)} value={daySet[index].fri} />
                  <Checkbox name="6" label="Saturday" onChange={e => selectDay(e, index)} value={daySet[index].sat} />
                  <Checkbox name="0" label="Sunday" onChange={e => selectDay(e, index)} value={daySet[index].sun} />
                </div>

                <div className="col-form-label">
                  <span className="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow" style={{ backgroundColor: "#8950fc" }} onClick={() => handleRemoveFieldsDay(index)}>
                    <i className="ki ki-bold-close icon-xs text-muted"></i>
                  </span>
                </div>
                <div className="col-2">
                  <button
                    className="btn btn-Tab"
                    type="button"
                    onClick={() => handleAddFieldsDayTimeslots(index)}
                  >
                    Add TimeSlots
                  </button>
                </div>
                {inputDay['timeslots'].map((dateTimeSlot, i) => (
                  <Fragment key={i}>
                    <div className="row" style={{ width: '100%' }}>
                      <div className="col-2"></div>
                      <input
                        type="text"
                        name="random"
                        readOnly
                        style={{ width: '60px', height: '30px' }}
                        value={dateTimeSlot.id}
                      />

                      <div className="col-2">
                        <TimePicker
                          name="start_timeslot"
                          onChange={e => startDayTimeSlotChanged(e, index, i)}
                          value={dateTimeSlot.start_time}
                        />
                      </div>

                      <div className="col-2">
                        <TimePicker
                          name="end_timeslot"
                          onChange={e => endDayTimeSlotChanged(e, index, i)}
                          value={dateTimeSlot.end_time}
                        />
                      </div>
                      <div className="col-3" style={{ marginLeft: 50 }}>
                        <label>
                          <NumericTextBox
                            name="adult_limitslot"
                            onChange={e => adultDaySlotChanged(e, index, i)}
                            value={dateTimeSlot.daliy_limit}
                          />{" "}
                          Daliy Limit
                        </label>
                      </div>
                      <div className="col-form-label">
                        <Checkbox name="enable" label="Enable" onChange={e => enableDaySlotChanged(e, index, i)} value={dateTimeSlot.enable} />
                      </div>
                      <div className="col-form-label">
                        <span className="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow" style={{ backgroundColor: "#8950fc" }} onClick={() => handleRemoveFieldsDayTimeslot(index, i)}>
                          <i className="ki ki-bold-close icon-xs text-muted"></i>
                        </span>
                      </div>
                    </div>
                  </Fragment>
                ))}
              </Fragment>
            ))}
          </div>

          <div className="form-group">
            <button
              type="submit"
              className={`btn btn-Tab`}
              style={{ float: "right", marginRight: 150, marginTop: 50 }}
              onSubmit={() => handleSubmit()}
            >Submit</button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default TimeSlots;
