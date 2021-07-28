import React, { useState, useEffect, useRef, Fragment } from "react";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../../_redux/activities/activitiesActions";
import { Checkbox } from "@progress/kendo-react-inputs";
import { NumericTextBox } from "@progress/kendo-react-inputs";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import { process } from "@progress/kendo-data-query";
import { DatePicker } from "@progress/kendo-react-dateinputs";
import { Input, Select } from "antd";
import { BsFillInfoCircleFill } from 'react-icons/bs';
import ReactTooltip from "react-tooltip";

import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

function Price(props) {
  const initialValues = {
  };
  const Schema = Yup.object().shape({
  });

  const initialDataState = {
    sort: [
      {
        field: "code",
        dir: "asc",
      },
    ],
    take: 10,
    skip: 0,
  };

  const dispatch = useDispatch();
  const { editId } = props;
  const [vendorId, setVendorId] = useState(0);

  useEffect(() => {
    dispatch(actions.getPlatformData());
    dispatch(actions.getIdData(editId, token));
  }, []);

  useEffect(() => {
    dispatch(actions.getVendorData(vendorId, token));
  }, [vendorId])

  const [dataState, setDataState] = useState(initialDataState);
  const [platList, setPlatList] = useState([]);

  const { activityData, addActivityId, platformData, addActivityStatusData, vendorData } = useSelector(
    (state) => ({
      activityData: state.activities.activityData,
      addActivityId: state.activities.addActivityId,
      platformData: state.activities.platformData,
      addActivityStatusData: state.activities.addActivityStatusData,
      vendorData: state.activities.vendorData,
    }),
    shallowEqual
  );

  const token = useSelector(({ auth }) => auth.authToken, shallowEqual);

  const [inputDate, setInputDate] = useState([]);
  const [inputDay, setInputDay] = useState([]);

  const [listData, setListData] = useState([]);
  const [ticketData, setTicketData] = useState([]);

  useEffect(() => {

    let platPriceData = JSON.parse(activityData?.platforms_pricing_options);
    if (platPriceData != null)
      setPlatList(platPriceData);

    const list = [...inputDate];
    let inputDateData = JSON.parse(activityData?.datewise_platform_pricing_options);
    if (inputDateData != null) {
      let sltList = [];
      for (var i = 0; i < inputDateData.length; i++) {
        var rangeData = {};
        rangeData["start_date"] = new Date(inputDateData[i].start_date);
        rangeData["end_date"] = new Date(inputDateData[i].end_date);
        rangeData["pricing"] = [];

        for (var j = 0; j < inputDateData[i].pricing.length; j++) {
          var rangeChildDate = {};
          rangeChildDate["platform_id"] = inputDateData[i].pricing[j].platform_id;
          rangeChildDate["platform_name"] = inputDateData[i].pricing[j].platform_name;
          rangeChildDate["published_price"] = inputDateData[i].pricing[j].published_price;
          rangeChildDate["sale_percent"] = inputDateData[i].pricing[j].sale_percent;

          rangeData["pricing"].push(rangeChildDate);
        }
        sltList.push(rangeData);
        list[i] = rangeData
      }
      setInputDate(list);
    }

    const dayList = [...inputDay];
    let inputDayData = JSON.parse(activityData?.daywise_platform_pricing_options);
    if (inputDayData != null) {
      let sltList = [];
      for (var i = 0; i < inputDayData.length; i++) {
        var rangeData = {};
        rangeData["day"] = inputDayData[i].day;
        rangeData["pricing"] = [];

        for (var j = 0; j < inputDayData[i].pricing.length; j++) {
          var rangeChildDate = {};
          rangeChildDate["platform_id"] = inputDayData[i].pricing[j].platform_id;
          rangeChildDate["platform_name"] = inputDayData[i].pricing[j].platform_name;
          rangeChildDate["published_price"] = inputDayData[i].pricing[j].published_price;
          rangeChildDate["sale_percent"] = inputDayData[i].pricing[j].sale_percent;

          rangeData["pricing"].push(rangeChildDate);
        }
        sltList.push(rangeData);
        dayList[i] = rangeData
      }
      setInputDay(dayList);
    }

    let ticketData = JSON.parse(activityData?.tickets);
    if (ticketData != null) {
      let ticketList = [];
      for (var k = 0; k < ticketData.length; k++) {
        if (ticketData[k].enable) {
          ticketList.push(ticketData[k]);
        }
      }
      setTicketData(ticketList);

    }

    setVendorId(activityData.vendor_id);

  }, [activityData]);

  ///////////////////////////
  useEffect(() => {

    const listD = [];
    for (var i = 0; i < platformData.length; i++) {
      let ticData = JSON.parse(activityData?.tickets);
      let ticDataList = [];
      if (ticData != null) {
        for (var k = 0; k < ticData.length; k++) {
          if (ticData[k].enable) {
            let data = {};
            data["ticket_id"] = ticData[k].id;
            data["price"] = ticData[k].markup_price;
            data["markup_price"] = ticData[k].markup_price;
            ticDataList.push(data);
          }
        }
      }

      let data = {};
      data["platform_id"] = platformData[i].id;
      data["platform_name"] = platformData[i].name;
      data["published_price"] = ticDataList;
      data["sale_percent"] = 0;
      listD.push(data);
    }
    setListData(listD);

    ///////////////////////

    if (!activityData?.platforms_pricing_options) {
      const list = [];
      for (var i = 0; i < platformData.length; i++) {

        let ticketData = JSON.parse(activityData?.tickets);
        let ticketDataList = [];
        if (ticketData != null) {
          for (var k = 0; k < ticketData.length; k++) {
            if (ticketData[k].enable) {
              let data = {};
              data["ticket_id"] = ticketData[k].id;
              data["price"] = ticketData[k].markup_price;
              data["markup_price"] = ticketData[k].markup_price;
              ticketDataList.push(data);
            }
          }
        }

        let data = {};
        data["Platform_id"] = platformData[i].id;
        data["Platform_name"] = platformData[i].name;
        data["Published_price"] = ticketDataList;
        data["Sale_percent"] = 0;
        list.push(data)
      }
      setPlatList(list);
    }

  }, [platformData]);

  /////////////////////////////////////////////////////
  const handleAddFieldsDate = () => {
    setInputDate([...inputDate, {
      start_date: new Date(), end_date: new Date(),
      pricing: listData,
    }]);
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

  const handleRemoveFieldsDate = (index) => {
    const values = [...inputDate];
    values.splice(index, 1);
    setInputDate(values);
  };

  const percentChanged = (props, event, index) => {
    const { value } = event.target;
    const list1 = [...inputDate];
    for (var k = 0; k < list1[index]['pricing'].length; k++) {
      list1[index]['pricing'][props.dataIndex]['sale_percent'] = value;
      for (var j = 0; j < list1[index]['pricing'][props.dataIndex].published_price.length; j++) {
        list1[index]['pricing'][props.dataIndex].published_price[j].price = (value + 1) * list1[index]['pricing'][props.dataIndex].published_price[j].markup_price;
      }
    }
    setInputDate(list1);
  }

  ///////////////////////////////////////////////////////////////////////
  const handleAddFieldsDay = () => {
    setInputDay([...inputDay, {
      day: 'Monday',
      pricing: listData,
    }]);
  };

  const handleRemoveFieldsDay = (index) => {
    const values = [...inputDay];
    values.splice(index, 1);
    setInputDay(values);
  };

  const percentDayChanged = (props, event, index) => {
    const { value } = event.target;
    const list1 = [...inputDay];
    for (var k = 0; k < list1[index]['pricing'].length; k++) {
      list1[index]['pricing'][props.dataIndex]['sale_percent'] = value;
      for (var j = 0; j < list1[index]['pricing'][props.dataIndex].published_price.length; j++) {
        list1[index]['pricing'][props.dataIndex].published_price[j].price = (value + 1) * list1[index]['pricing'][props.dataIndex].published_price[j].markup_price;
      }
    }
    setInputDay(list1);
  }

  const handleDayChanged = (event, index) => {
    const { value } = event.target;
    const list = [...inputDay];
    list[index]['day'] = value;
    setInputDay(list);
  };

  ///////////////////////////////////////////////////////////////////////////////
  const priceChangedF = (props, event) => {

  }

  const percentChangedF = (props, event) => {
    const list = [...platList];
    for (var i = 0; i < list.length; i++) {
      if (list[i].Platform_id == props.dataItem.Platform_id) {
        list[i].Sale_percent = event.target.value;
        for (var j = 0; j < list[i].Published_price.length; j++) {
          list[i].Published_price[j].price = (event.target.value + 1) * list[i].Published_price[j].markup_price;
        }
      }
    }
    setPlatList(list);
  }

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
        data["platforms_pricing_options"] = JSON.stringify(platList);

        data["datewise_platform_pricing_options"] = JSON.stringify(inputDate);
        data["daywise_platform_pricing_options"] = JSON.stringify(inputDay);

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

          <div className="form-group row">
            <div className="col-2"></div>
            <div className="col-8">
              <Grid
                pageable={true}
                sortable={true}
                filterable={true}
                style={{
                  height: "auto",
                }}
                data={process(platList || [], dataState)}
                {...dataState}
                onDataStateChange={(e) => {
                  setDataState(e.dataState);
                }}
              >
                <Column field="Platform_id" title="Id" width="80px" hidden={true} />
                <Column field="Platform_name" title="Platform Name" />
                {ticketData.map((ticketData, index) => (
                  <Column field="Published_price" title={ticketData.ticket_name} key={index}
                    cell={(props) => (
                      <td>
                        <input
                          format="n2"
                          min={0}
                          readOnly={true}
                          value={props.dataItem.Published_price[index].price}
                          style={{ width: '80px' }}
                          onChange={e => priceChangedF(props, e)}
                        />
                        <BsFillInfoCircleFill style={{ marginLeft: '5px' }} data-tip={"Markup Price: AED" + props.dataItem.Published_price[index].markup_price + ", Sale Price: AED" + props.dataItem.Published_price[index].price + ", You Get: AED" + props.dataItem.Published_price[index].price*(100-vendorData)/100} />
                        <ReactTooltip />
                      </td>
                    )} />
                ))}

                < Column field="Sale_percentage" title="Sale Percentage"
                  cell={(props) => (
                    <td>
                      <NumericTextBox
                        format="p"
                        max={1}
                        min={0}
                        step={0.01}
                        value={props.dataItem.Sale_percent}
                        onChange={e => percentChangedF(props, e)}
                      />
                    </td>
                  )}
                />
              </Grid>
            </div>
            <div className="col-2"></div>
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

          {inputDate.map((inputDate1, index) => (
            <Fragment key={index}>
              <div className="form-row" style={{ marginTop: "10px" }}>
                <div className="col-2"></div>
                <label className=" col-form-label activity-title" style={{ marginRight: 20 }}>Start Date</label>
                <div className="col-3">
                  <DatePicker
                    name="start-date"
                    onChange={e => startDateChanged(e, index)}
                    value={inputDate1.start_date}
                  />
                </div>

                <label className="col-form-label activity-title" style={{ marginRight: 20 }}>End Date</label>
                <div className="col-3">
                  <DatePicker
                    name="end-date"
                    onChange={e => endDateChanged(e, index)}
                    value={inputDate1.end_date}
                  />
                </div>
                <div className="col-form-label">
                  <span className="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow" style={{ backgroundColor: "#8950fc" }} onClick={() => handleRemoveFieldsDate(index)}>
                    <i className="ki ki-bold-close icon-xs text-muted"></i>
                  </span>
                </div>
                <div className="col-2">
                </div>
              </div>
              <div className="form-group row">
                <div className="col-2"></div>
                <div className="col-8">
                  <Grid
                    pageable={true}
                    sortable={true}
                    filterable={true}
                    style={{
                      height: "auto",
                    }}
                    data={process(inputDate1["pricing"] || [], dataState)}
                    {...dataState}
                    onDataStateChange={(e) => {
                      setDataState(e.dataState);
                    }}
                  >
                    <Column field="platform_id" title="Id" width="80px" hidden={true} />
                    <Column field="platform_name" title="Platform Name" />
                    {ticketData.map((ticketData, index1) => (
                      <Column field="published_price" title={ticketData.ticket_name} key={index1}
                        cell={(props) => (
                          <td>
                            <input
                              format="n2"
                              min={0}
                              readOnly={true}
                              value={props.dataItem.published_price[index1].price}
                              style={{ width: '80px' }}
                              onChange={e => priceChangedF(props, e)}
                            />
                            {/* <BsFillInfoCircleFill style={{ marginLeft: '5px' }} data-tip={"Markup Price: AED" + props.dataItem.Published_price[index1].markup_price + ", Sale Price: AED" + props.dataItem.Published_price[index1].price} />
                            <ReactTooltip /> */}
                          </td>
                        )} />
                    ))}
                    <Column field="sale_percentage" title="Sale Percentage"
                      cell={(props) => (
                        <td>
                          <NumericTextBox
                            format="p"
                            max={1}
                            min={0}
                            step={0.01}
                            value={inputDate1["pricing"][props.dataIndex].sale_percent}
                            onChange={e => percentChanged(props, e, index)}
                          />
                        </td>
                      )}
                    />
                  </Grid>
                </div>
                <div className="col-2"></div>
              </div>
            </Fragment>
          ))}

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

          {inputDay.map((inputDay, index) => (
            <Fragment key={index}>
              <div className="form-row" style={{ marginTop: "10px" }}>
                <div className="col-4"></div>
                <div className="col-4">
                  <Select name="enable" style={{ width: "auto" }} value={inputDay["day"]} onChange={e => handleDayChanged(e, index)}>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                  </Select>
                </div>
                <div className="col-form-label">
                  <span className="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow" style={{ backgroundColor: "#8950fc" }} onClick={() => handleRemoveFieldsDay(index)}>
                    <i className="ki ki-bold-close icon-xs text-muted"></i>
                  </span>
                </div>
                <div className="col-2">
                </div>
              </div>
              <div className="form-group row">
                <div className="col-2"></div>
                <div className="col-8">
                  <Grid
                    pageable={true}
                    sortable={true}
                    filterable={true}
                    style={{
                      height: "auto",
                    }}
                    data={process(inputDay["pricing"] || [], dataState)}
                    {...dataState}
                    onDataStateChange={(e) => {
                      setDataState(e.dataState);
                    }}
                  >
                    <Column field="platform_id" title="Id" width="80px" hidden={true} />
                    <Column field="platform_name" title="Platform Name" />
                    {ticketData.map((ticketData, index1) => (
                      <Column field="published_price" title={ticketData.ticket_name} key={index1}
                        cell={(props) => (
                          <td>
                            <input
                              format="n2"
                              min={0}
                              readOnly={true}
                              value={props.dataItem.published_price[index1].price}
                              style={{ width: '80px' }}
                              onChange={e => priceChangedF(props, e)}
                            />
                            {/* <BsFillInfoCircleFill style={{ marginLeft: '5px' }} data-tip={"Markup Price: AED" + props.dataItem.Published_price[index1].markup_price + ", Sale Price: AED" + props.dataItem.Published_price[index1].price} />
                            <ReactTooltip /> */}
                          </td>
                        )} />
                    ))}
                    <Column field="sale_percentage" title="Sale Percentage"
                      cell={(props) => (
                        <td>
                          <NumericTextBox
                            format="p"
                            max={1}
                            min={0}
                            step={0.01}
                            value={inputDay["pricing"][props.dataIndex].sale_percent}
                            onChange={e => percentDayChanged(props, e, index)}
                          />
                        </td>
                      )}
                    />
                  </Grid>
                </div>
                <div className="col-2"></div>
              </div>
            </Fragment>
          ))}

          <div className="form-group">
            <button
              type="submit"
              className={`btn btn-Tab`}
              style={{ float: "right", marginRight: 200, marginTop: 30 }}
              onSubmit={() => handleSubmit()}
            >Submit</button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default Price;
