import React, { useState, Fragment, useEffect } from "react";
import * as Yup from "yup";
import { Select, Form, Button, Checkbox } from "antd";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import { DatePicker } from "antd";
import * as actions from "../../../../_redux/activities/activitiesActions";
import { Prompt } from 'react-router';
import moment from 'moment';
import { CloseCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { format } from 'date-fns'

import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';
const { Option } = Select;

function ScheduleForm(props) {
  const { activityData, addActivityStatusData, addActivityId, selectDay, daySet, handleEnableChanged, handleRemoveDay, form, onFinish, changeData, inputDay, handleAddDay, handleRemoveFields, handleSelectChanged, dateRange, dateRangehandleChange, inputFields, handleAddFields, endDate, startDate, startDatehandleChange, endDatehandleChange } = props;

  const dispatch = useDispatch();
  const token = useSelector(({ auth }) => auth.authToken, shallowEqual);

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
    <Form form={form} name="control-hooks" onFinish={onFinish} style={{ width: '100%', marginTop: 100 }}>
      <Prompt when={changeData} message='You have unsaved changes, are you sure you want to leave?' />

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
          <div className="col-2"></div>
          <label className=" col-form-label activity-title" style={{ marginRight: 20 }}>Start Date</label>
          <div className="col-4">
            <DatePicker
              onChange={startDatehandleChange}
              defaultValue={moment(startDate, dateFormat)}
              format={dateFormat}
            />
          </div>

          <label className="col-form-label activity-title" style={{ marginRight: 20 }}>End Date</label>
          <div className="col-4">
            <DatePicker
              onChange={endDatehandleChange}
              defaultValue={moment(endDate, dateFormat)}
              format={dateFormat}
            />
          </div>
          <div className="col-2"></div>
        </div>
      </Form.Item>

      <Form.Item>
        <div className="form-group row">
          <div className="col-2">
            <Button
              className="mr-2"
              type="primary"
              style={{ float: "right" }}
              onClick={() => handleAddFields()}
            >
              Add Datewise Data
            </Button>
          </div>

          <div className="col-10 form-row" >
            {inputFields.map((inputField, index) => (
              <Fragment key={index}>
                <div className="col-12 form-row" style={{ marginTop: 20 }}>
                  <div className="col-1"></div>
                  <div className="col-4">
                    <RangePicker
                      defaultValue={[moment(dateRange[index].start, dateFormat), moment(dateRange[index].end, dateFormat)]}
                      format={dateFormat}
                      onChange={e => dateRangehandleChange(e, index)}
                    />
                  </div>
                  <div className="col-1">
                    <Select name="enable" style={{ width: "100%" }} defaultValue={inputField["enable"]} onChange={e => handleSelectChanged(e, index)}>
                      <Option value="0">Disable</Option>
                    </Select>
                  </div>
                  <div className="col-form-label" style={{ marginLeft: 20 }} >
                    <span onClick={() => handleRemoveFields(index)} style={{ width: '100%', height: '100%' }} >
                      <CloseCircleOutlined style={{ width: '100%', height: '100%' }} />
                    </span>
                  </div>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      </Form.Item>
      <Form.Item>
        <div className="form-group row">
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
                  <div className="col-1">
                    <Select name="enable" style={{ width: "100%" }} defaultValue={inputDay["enable"]} onChange={e => handleEnableChanged(e, index)}>
                      <Option value="0">Disable</Option>
                    </Select>
                  </div>
                  <div className="col-form-label" style={{ marginLeft: 20 }} >
                    <span onClick={() => handleRemoveDay(index)}>
                      <CloseCircleOutlined style={{ width: '100%', height: '100%' }} />
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
  )
}

export default function Schedule(props) {

  const dispatch = useDispatch();
  const [load, setLoad] = useState(0);
  const { editId } = props;
  useEffect(() => {
    dispatch(actions.getIdData(editId, token));
    setLoad(1);
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

  let [changeData, setChangeData] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [dateRange, setDateRange] = useState([{
    start: new Date(),
    end: new Date(),
  }]);


  useEffect(() => {
    if (activityData?.booking_start_datetime != null)
      setStartDate(activityData?.booking_start_datetime);
    if (activityData?.booking_end_datetime != null)
      setEndDate(activityData?.booking_end_datetime);

    let bookingSchd = JSON.parse(activityData?.datewise_booking_schedule);
    if (bookingSchd != null) {
      setInputFields(JSON.parse(activityData?.datewise_booking_schedule))
      let rangList = [], enableList = [];
      for (var i = 0; i < bookingSchd.length; i++) {
        var rangeData = {};
        rangeData["start"] = bookingSchd[i].start_date;
        rangeData["end"] = bookingSchd[i].end_date;
        rangList.push(rangeData);

        var enableData = {};
        enableData["enable"] = bookingSchd[i].enable;
        enableList.push(enableData);
      }
      setDateRange(rangList);
    }

    let dayData = JSON.parse(activityData?.daywise_booking_schedule);
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
  ////////////////////////////////////
  const [inputFields, setInputFields] = useState([]);

  const handleAddFields = () => {
    setChangeData(true)
    const values = [...inputFields];
    values.push({ start_date: new Date(), end_date: new Date(), enable: '0' });
    setInputFields(values);

    const values1 = [...dateRange];
    values1.push({ start: new Date(), end: new Date() });
    setDateRange(values1);
  };

  const handleRemoveFields = (index) => {
    setChangeData(true)
    const values = [...inputFields];
    values.splice(index, 1);

    setInputFields(values);

    const values1 = [...dateRange];
    values1.splice(index, 1);
    setDateRange(values1);
  };
  ///////////////////////////////////
  const [inputDay, setInputDay] = useState([]);

  const handleAddDay = () => {
    setChangeData(true)
    setInputDay([...inputDay, { days: [], enable: '0' }]);
    setDaySet([...daySet, { mon: false, tues: false, wed: false, thur: false, fri: false, sat: false, sun: false }]);
  };

  const handleRemoveDay = (index) => {
    setChangeData(true)
    const values = [...inputDay];
    values.splice(index, 1);
    setInputDay(values);

    const values1 = [...daySet];
    values1.splice(index, 1);
    setDaySet(values1);
  };

  const handleEnableChanged = (event, index) => {
    setChangeData(true)
    const { value } = event.target;
    const list = [...inputDay];
    list[index]['enable'] = value;
    setInputDay(list);
  };

  const selectDay = (event, index) => {
    const list = [...inputDay];
    const value = event.target.checked;
console.log(value, event.target)
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


  /////////////////////////////////////

  const startDatehandleChange = (date, dateString) => {
    setChangeData(true)
    setStartDate(dateString)
  };
  const endDatehandleChange = (date, dateString) => {
    setChangeData(true)
    setEndDate(dateString);
  };

  const dateRangehandleChange = (date, index, event) => {
    setChangeData(true)
    // const { value } = event.target;

    const list = [...inputFields];
    list[index]['start_date'] = moment(date[0]).format(dateFormat).toString();
    list[index]['end_date'] = moment(date[1]).format(dateFormat).toString();
    setInputFields(list);

    // setDateRange(event.value);
  };

  const handleSelectChanged = (event, index) => {
    setChangeData(true)
    const list = [...inputFields];
    list[index]['enable'] = event;
    setInputFields(list);
  };

  const [form] = Form.useForm();
  const onFinish = values => {
    let data = {};
    data["id"] = addActivityId;
    data["booking_start_datetime"] = startDate;
    data["booking_end_datetime"] = endDate;
    data["datewise_booking_schedule"] = JSON.stringify(inputFields);
    data["daywise_booking_schedule"] = JSON.stringify(inputDay);

    dispatch(actions.editActivity(data, token));
  };

  return (

    <div>
      {(activityData && load == 1 && startDate && endDate && dateRange && inputFields) ? (
        <ScheduleForm activityData={activityData} addActivityStatusData={addActivityStatusData} addActivityId={addActivityId} selectDay={selectDay} daySet={daySet} handleEnableChanged={handleEnableChanged} handleRemoveDay={handleRemoveDay} dateRange={dateRange} dateRangehandleChange={dateRangehandleChange} handleSelectChanged={handleSelectChanged} handleRemoveFields={handleRemoveFields} handleAddDay={handleAddDay} inputDay={inputDay} form={form} onFinish={onFinish} changeData={changeData} inputFields={inputFields} handleAddFields={handleAddFields} endDate={endDate} endDatehandleChange={endDatehandleChange} startDate={startDate} startDatehandleChange={startDatehandleChange} />
      ) :
        (<div></div>)}
    </div>
  );
}

// export default Schedule;
