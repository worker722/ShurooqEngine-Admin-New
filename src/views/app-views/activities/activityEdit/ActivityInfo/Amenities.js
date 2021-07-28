import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import * as actions from "../../../../_redux/activities/activitiesActions";
import { process } from "@progress/kendo-data-query";
import { Checkbox } from "@progress/kendo-react-inputs";

import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

function Amenities(props) {

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

  const { editId } = props;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.getIdData(editId, token));
    dispatch(actions.getAmenitiesData());
  }, []);

  const [dataState, setDataState] = React.useState(initialDataState);

  const token = useSelector(({ auth }) => auth.authToken, shallowEqual);
  const history = useHistory();

  const { addActivityStatusData, addActivityId, amenitiesData, activityData } = useSelector(
    (state) => ({
      addActivityStatusData: state.activities.addActivityStatusData,
      addActivityId: state.activities.addActivityId,
      amenitiesData: state.activities.amenitiesData,
      activityData: state.activities.activityData,
    }),
    shallowEqual
  );

  const [realData, setRealData] = React.useState([]);
  const tblData = [];
  const [enabledList, setEnabledList] = useState([]);

  useEffect(() => {
    let transData = JSON.parse(activityData?.amenities_options);
    for (var i = 0; i < amenitiesData.length; i++) {
      if (amenitiesData[i].enable == 1) {
        let data = {};
        data["id"] = amenitiesData[i].id;
        data["amenity_name"] = amenitiesData[i].amenity_name;
        data["enabled"] = 0;
        if (transData != null) {
          for (var j = 0; j < transData.length; j++) {
            if (amenitiesData[i].id == transData[j]) {
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
  }, [amenitiesData]);

  useEffect(() => {
    if (activityData?.amenities == "1")
      setEnableMeals(true);
    else
      setEnableMeals(false);

  }, [activityData]);

  const enableChanged = (props, event) => {
    const { value } = event;
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
    const { value } = event;
    setEnableMeals(value)
  };

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
        data["amenities_options"] = JSON.stringify(enabledList);
        data["amenities"] = enableMeals;

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
            <Checkbox name="enableMeals" label="Enable Meals" value={enableMeals} onChange={e => enableMealsChanged(e)} />
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
                data={process(realData || [], dataState)}
                {...dataState}
                onDataStateChange={(e) => {
                  setDataState(e.dataState);
                }}
              >
                <Column field="id" title="Id" width="80px" filterable={false} />
                <Column field="amenity_name" title="Amenity Name" />
                <Column field="enable" title="Enabled"
                  cell={(props) => (
                    <td>
                      <Checkbox
                        value={props.dataItem.enabled}
                        onChange={e => enableChanged(props, e)}
                      />
                    </td>
                  )}
                />
              </Grid>
            </div>
            <div className="col-2"></div>
          </div>

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

export default Amenities;
