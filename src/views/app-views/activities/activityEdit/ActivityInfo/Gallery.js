import React, { useEffect, Fragment } from "react";
import { Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import ImageUploading from 'react-images-uploading';
import * as actions from "../../../../_redux/activities/activitiesActions";
import * as Yup from "yup";

import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

function Gallary(props) {

  const { addActivityId, gallaryData, addActivityStatusData, delMsgStatus } = useSelector(
    (state) => ({
      addActivityId: state.activities.addActivityId,
      gallaryData: state.activities.gallaryData,
      addActivityStatusData: state.activities.addActivityStatusData,
      delMsgStatus: state.activities.delMsgStatus,
    }),
    shallowEqual
  );

  const initialValues = {

  };

  const Schema = Yup.object().shape({

  });

  const token = useSelector(({ auth }) => auth.authToken, shallowEqual);
  const dispatch = useDispatch();

  const [images, setImages] = React.useState([]);
  const maxNumber = 50;

  const onChange = (imageList) => {
    setImages(imageList);
  };

  useEffect(() => {
    dispatch(actions.getGallery(addActivityId, token));
  }, []);

  const uploadGallery = (values) => {
    dispatch(actions.uploadGallery(values, token));
  };
  //////////////////////////////////
  const deleteImage = (value) => {
    let delData = {};
    delData["image"] = value
    dispatch(actions.deleteImage(addActivityId, delData, token));
  }

  useEffect(() => {
    if (delMsgStatus != null)
      handleClickOpenMsg();
  }, [delMsgStatus]);

  const [openMsg, setOpenMsg] = React.useState(false);

  const handleClickOpenMsg = () => {
    setOpenMsg(true);
  };
  const handleCloseMsg = () => {
    setOpenMsg(false);
    dispatch(actions.setDelImgStatusData(token));
    dispatch(actions.getGallery(addActivityId, token));
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
    if (addActivityStatusData != null) {
      handleClickOpen();
      dispatch(actions.getGallery(addActivityId, token));
    }

  }, [addActivityStatusData]);

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={Schema}
      onSubmit={(values) => {
        const data = new FormData();
        const imageArry = [];
        data.append("id", addActivityId);
        for (let i = 0; i < images.length; i++) {
          data.append("gallary", images[i]["file"]);
        }
        uploadGallery(data);
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

          <Dialog onClose={handleCloseMsg} aria-labelledby="customized-dialog-title" open={openMsg}>
            <DialogContent dividers>
              <Typography gutterBottom>
                <b>Success</b>
              </Typography>
              <Typography gutterBottom style={{ marginTop: "10px" }}>
                {delMsgStatus}
              </Typography>
              <Typography gutterBottom style={{ marginTop: "10px" }}>
                <Button autoFocus onClick={handleCloseMsg} style={{ backgroundColor: "#4ef508de", color: "white" }}>
                  Okay
                </Button>
              </Typography>
            </DialogContent>
          </Dialog>

          <div className="form-group row">
            <div className="col-lg-3"></div>
            <div className="col-lg-6">
              <div className="form-group">
                <div className="App">
                  <ImageUploading
                    multiple
                    value={images}
                    onChange={onChange}
                    maxNumber={maxNumber}
                    dataURLKey="data_url"
                    name="image"
                  >
                    {({
                      imageList,
                      onImageUpload,
                      onImageRemoveAll,
                      onImageRemove,
                      dragProps,
                    }) => (
                      <div className="dropzone dropzone-default dropzone-success dz-clickable dz-clickable dz-started dz-max-files-reached" id="kt_dropzone_3">
                        <span className="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shado" onClick={onImageRemoveAll} style={{ float: "right", backgroundColor: "#8950fc" }}>
                          <i className="ki ki-bold-close icon-xs text-muted"></i>
                        </span>


                        <div className="dropzone-msg dz-message needsclick" {...dragProps}>
                          <div className="upload__image-wrapper">
                            <div onClick={onImageUpload}>
                              <h3 className="dropzone-msg-title"
                              >Drop images here or click to upload.</h3>
                            </div>
                            &nbsp;

                          </div>
                          <div className="row" style={{ justifyContent: "center" }}>
                            {imageList.map((image, index) => (
                              <div key={index} className="mr-6 ml-6">
                                <div className="image-input image-item__btn-wrapper image-input-wrapper" id="kt_image_3">
                                  <span className="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow" onClick={() => onImageRemove(index)} style={{ marginLeft: "50%", backgroundColor: "#8950fc" }}>
                                    <i className="ki ki-bold-close icon-xs text-muted"></i>
                                  </span>
                                  <div className="image-input-wrapper">
                                    <img src={image['data_url']} alt="" width="100%" height="100%" style={{ borderRadius: "50%" }} />
                                  </div>
                                </div>
                              </div>
                            ))}

                          </div>
                        </div>
                      </div>
                    )}
                  </ImageUploading>
                </div>
              </div>

              <div className="form-group">
                <button
                  type="submit"
                  className={`btn btn-Tab`}
                  style={{ float: "right" }}
                  onSubmit={() => handleSubmit()}
                >Upload</button>
              </div>
            </div>
            <div className="col-lg-3"></div>
          </div>
          <div className="form-group row">
            <div className="col-lg-2"></div>
            <div className="col-lg-8">
              {gallaryData != "" && (
                gallaryData.map((imgData, index) => (
                  <Fragment key={index}>
                    <div className="image-input image-item__btn-wrapper image-input-wrapper" id="kt_image_3">
                      <span className="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow" style={{ backgroundColor: "#8950fc", float: 'right' }} onClick={() => deleteImage(imgData)}>
                        <i className="ki ki-bold-close icon-xs text-muted"></i>
                      </span>
                      <div className="image-input-wrapper">
                        <img src={imgData} alt="" width="100%" height="100%" style={{ borderRadius: "50%" }} />
                      </div>
                    </div>
                  </Fragment>
                ))
              )}
            </div>
            <div className="col-lg-2"></div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default Gallary;
