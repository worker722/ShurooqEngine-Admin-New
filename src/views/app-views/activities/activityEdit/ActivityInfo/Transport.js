import React, { useState, useEffect } from "react";
import { Form, Button, Checkbox } from "antd";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import * as actions from "../../../../_redux/activities/activitiesActions";
import { process } from "@progress/kendo-data-query";

import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

function Transport(props) {

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

  const { editId } = props;

  useEffect(() => {
    dispatch(actions.getIdData(editId, token));
  }, []);

  const [dataState, setDataState] = React.useState(initialDataState);

  const token = useSelector(({ auth }) => auth.authToken, shallowEqual);
  const history = useHistory();

  const { addActivityId, transportData, addActivityStatusData, activityData } = useSelector(
    (state) => ({
      addActivityId: state.activities.addActivityId,
      transportData: state.activities.transportData,
      addActivityStatusData: state.activities.addActivityStatusData,
      activityData: state.activities.activityData,
    }),
    shallowEqual
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.getTransportData());
  }, []);

  const [realData, setRealData] = React.useState([]);
  const tblData = [];
  const [enabledList, setEnabledList] = useState([]);

  useEffect(() => {
    let transData = JSON.parse(activityData?.transport_options);
    for (var i = 0; i < transportData.length; i++) {
      if (transportData[i].enable == 1) {
        let data = {};
        data["id"] = transportData[i].id;
        data["transport_name"] = transportData[i].transport_name;
        data["oneway_price"] = transportData[i].oneway_price;
        data["twoway_price"] = transportData[i].twoway_price;
        data["enabled"] = 0;
        if (transData != null) {
          for (var j = 0; j < transData.length; j++) {
            if (transportData[i].id == transData[j]) {
              data["enabled"] = true;
            }
          }
        }
        tblData.push(data)
      }
    }
    setRealData(tblData)

    if (transData != null) {
      const lst = [];
      for (var j = 0; j < transData.length; j++) {
        lst.push(transData[j]);
      }
      setEnabledList(lst);
    }
  }, [transportData]);

  const enableChanged = (props, event) => {
    console.log(props, event)
    const value = event.target.checked;
    const list = [...enabledList];
    if (value) {
      list.push(props.dataItem.id)
    }
    else {
      for (var i = 0; i < list.length; i++) {
        if (list[i] == props.dataItem.id)
          list.splice(i, 1);
      }
    }
    setEnabledList(list);

    const lstR = [...realData];
    for (var i = 0; i < lstR.length; i++) {
      if (lstR[i].id == props.dataItem.id) {
        lstR[i].enabled = value;
      }
    }
    setRealData(lstR);
  }

  const [enableMeals, setEnableMeals] = React.useState(0);

  const enableMealsChanged = (event) => {
    const value = event.target.checked;
    setEnableMeals(value)
  };

  useEffect(() => {
    if (activityData?.transport == "1")
      setEnableMeals(true);
    else
      setEnableMeals(false);
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
    data["transport_options"] = JSON.stringify(enabledList);
    data["transport"] = enableMeals;

    dispatch(actions.editActivity(data, token));
  };


  return (

    <Form form={form} initialValues={activityData} name="control-hooks" onFinish={onFinish} style={{ marginTop: 100 }}>

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
          <Checkbox name="enableMeals" checked={enableMeals} onChange={e => enableMealsChanged(e)} >Enable Transports</Checkbox>
        </div>
      </Form.Item>
      <Form.Item>
        <div className="form-group row">
          <div className="col-2"></div>
          <div className="col-8">
            <Grid
              pageable={true}
              sortable={true}
              // filterable={true}
              style={{
                height: "auto",
              }}
              data={process(realData || [], dataState)}
              {...dataState}
              onDataStateChange={(e) => {
                setDataState(e.dataState);
              }}
            >
              <Column field="id" title="Id" width="80px" filterable={false} />
              <Column field="transport_name" title="Transport Name" />
              <Column field="oneway_price" title="OneWay Price" />
              <Column field="twoway_price" title="TwoWay Price" />
              <Column field="enabled" title="Enabled"
                cell={(props) => (
                  <td>
                    <Checkbox
                      checked={props.dataItem.enabled}
                      onChange={e => enableChanged(props, e)}
                    ></Checkbox>
                  </td>
                )}
              />
            </Grid>
          </div>
          <div className="col-2"></div>
        </div>
      </Form.Item>

      <Form.Item>
        <div className="form-group row">
          <div className="col-10" >
            <Button className="mr-2" type="primary" htmlType="submit" style={{ float: 'right' }} >
              Submit
            </Button>
          </div>
        </div>
      </Form.Item>
    </Form>
  );
}

export default Transport;
