import { Alert, Box, InputAdornment, Stack, TextField, Typography, IconButton, Fab } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import {
  updateNotification,
  selectOpenEditNotificationDialog,
  selectSelectedNotification,
  updateOpenEditNotificationDialog,
  selectSlackAuthorized,
  selectSlackAuthUrl,
  selectSlackChannels,
  selectTelegramAuthorized,
  updateopenTelegramNotificationsDialog,
} from "../../redux/slices/notificationSlice";
import { Form, FormikProvider, useFormik } from "formik";
import LoadingButton from "@mui/lab/LoadingButton";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import MemoryIcon from "@mui/icons-material/Memory";
import { selectPlanStats } from "../../redux/slices/dashboardSlice";
import { assetsURL } from "../../utils/assetsURL";

export default function EditNotification() {
  const dispatch = useDispatch();
  const selectedNotification = useSelector(selectSelectedNotification);
  
  const slackAuthorized = useSelector(selectSlackAuthorized);
  const [emailChannelEnabled, setEmailChannelEnabled] = useState(true);
  const [slackChannelEnabled, setSlackChannelEnabled] = useState(true);
  const openCreateInvestigationDialog = useSelector(selectOpenEditNotificationDialog);
  const slackAuthUrl = useSelector(selectSlackAuthUrl);
  const slackChannels = useSelector(selectSlackChannels);
  const [telegramChannelEnabled, setTelegramChannelEnabled] = useState(true);
  const telegramAuthorized = useSelector(selectTelegramAuthorized);
  const planStats = useSelector(selectPlanStats);

  const Schema = Yup.object().shape({
    address: Yup.string("Enter valid address").required("Address is required"),
    email: Yup.string("Enter valid Email").email("Email must be a valid email address"),
    slackChannelId: Yup.string("Enter valid Slack Channel"),
  });

  const formik = useFormik({
    initialValues: {
      address: "",
      email: "",
      slackChannelId: "",
    },
    validationSchema: Schema,
    onSubmit: async (values, { setErrors, setSubmitting, isSubmitting }) => {
      setSubmitting(true);
      let valid = true;

      let data = {
        setErrors,
        address: values.address,
      };

      if (slackChannelEnabled) {
        if (values.slackChannelId !== "") {
          data["slackChannelId"] = values.slackChannelId;
        } else {
          setErrors({ slackChannelId: "Enter Slack Channel ID" });
          valid = false;
        }
      } else {
        data["slackChannelId"] = "";
      }

      if (emailChannelEnabled) {
        if (values.email !== "") {
          data["email"] = values.email;
        } else {
          setErrors({ email: "Enter Email Address" });
          valid = false;
        }
      } else {
        data["email"] = "";
      }

      data["telegramChannelEnabled"] = telegramChannelEnabled;

      if (valid) {
        await dispatch(updateNotification(data));
      }
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue, values } = formik;

  useEffect(() => {
    if (selectedNotification) {
      setEmailChannelEnabled(true);
      setTelegramChannelEnabled(true);
      setSlackChannelEnabled(true);

      setFieldValue("email", selectedNotification.email_for_notification ? selectedNotification.email_for_notification : "");
      setFieldValue("address", selectedNotification.address);
      setFieldValue("slackChannelId", selectedNotification.slack_channel_for_notification ? selectedNotification.slack_channel_for_notification : "");

      if (selectedNotification.email_for_notification === null || selectedNotification.email_for_notification === "") {
        setEmailChannelEnabled(false);
      }

      if (selectedNotification.slack_channel_for_notification === null || selectedNotification.slack_channel_for_notification === "") {
        setSlackChannelEnabled(false);
      }

      if (selectedNotification.telegram_chat_id === null || selectedNotification.telegram_chat_id === "") {
        setTelegramChannelEnabled(false);
      }
    }
  }, [selectedNotification]);

  useEffect(() => {
    if (planStats?.active_plans == 0) {
      setTelegramChannelEnabled(false);
      setSlackChannelEnabled(false);
    }
  }, [planStats]);

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={openCreateInvestigationDialog}
      onClose={() => {
        dispatch(updateOpenEditNotificationDialog(false));
      }}
    >
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Box pt={3} pr={3} pl={3}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h5">Configure Notifications</Typography>

              <IconButton
                onClick={() => {
                  dispatch(updateOpenEditNotificationDialog(false));
                }}
              >
                <CancelIcon />
              </IconButton>
            </Box>

            <Typography variant="body1" sx={{ marginBottom: 2 }}>
              Enter address below to start notifications
            </Typography>

            <Stack spacing={1}>
              {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}

              <TextField
                disabled
                fullWidth
                placeholder="Address"
                {...getFieldProps("address")}
                error={Boolean(touched.address && errors.address)}
                helperText={touched.address && errors.address}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MemoryIcon sx={{ opacity: 0.5 }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
          </Box>

          <Stack pr={3} pl={3} pt={3}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Typography variant="h5">Active Channels</Typography>

              <Stack direction="row" spacing={1}>
                {!emailChannelEnabled && (
                  <Button
                    onClick={() => {
                      setEmailChannelEnabled(true);
                    }}
                    variant="outlined"
                  >
                    Enable Email Channel
                  </Button>
                )}

                {planStats?.active_plans != 0 && !telegramChannelEnabled && (
                  <Button
                    onClick={() => {
                      setTelegramChannelEnabled(true);
                    }}
                    variant="outlined"
                  >
                    Enable Telegram Channel
                  </Button>
                )}

                {planStats?.active_plans != 0 && !slackChannelEnabled && (
                  <Button
                    onClick={() => {
                      setSlackChannelEnabled(true);
                    }}
                    variant="outlined"
                  >
                    Enable Slack Channel
                  </Button>
                )}
              </Stack>
            </Box>

            {emailChannelEnabled && (
              <Stack direction="row" spacing={1} pt={2}>
                <Fab
                  sx={{
                    boxShadow: "none",
                    borderRadius: 1,
                    minWidth: "3.5rem",
                    backgroundColor: "white",
                    border: "solid",
                    borderWidth: 1,
                    borderColor: "#d6d6d6",
                    display: {
                      xs: 'none', md: 'block'
                    }
                  }}
                >
                  <Box
                    component="img"
                    sx={{
                      opacity: 0.5,
                      height: 28,
                      width: 28,
                      maxHeight: 28,
                      maxWidth: 28,
                    }}
                    alt="ethereum"
                    src={`${assetsURL}email.png`}
                  />
                </Fab>

                <TextField
                  fullWidth
                  placeholder="Email Address"
                  {...getFieldProps("email")}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />

                <Fab
                  color="error"
                  onClick={() => {
                    setEmailChannelEnabled(false);
                  }}
                  sx={{
                    minWidth: "3.5rem",
                    boxShadow: "none",
                    borderRadius: 1,
                    backgroundColor: "#ffe3de",
                    "&:hover": {
                      backgroundColor: "#ffc2b8",
                    },
                  }}
                >
                  <DeleteForeverIcon sx={{ color: "#FC573B" }} />
                </Fab>
              </Stack>
            )}

            {slackChannelEnabled && (
              <Stack direction="row" spacing={1} pt={2}>
                <Fab
                  sx={{
                    boxShadow: "none",
                    borderRadius: 1,
                    minWidth: "3.5rem",
                    backgroundColor: "white",
                    border: "solid",
                    borderWidth: 1,
                    borderColor: "#d6d6d6",
                  }}
                >
                  <Box
                    component="img"
                    sx={{
                      opacity: 0.5,
                      height: 28,
                      width: 28,
                      maxHeight: 28,
                      maxWidth: 28,
                    }}
                    alt="ethereum"
                    src={`${assetsURL}slack.png`}
                  />
                </Fab>

                {slackAuthorized && (
                  <>
                    <Select
                      {...getFieldProps("slackChannelId")}
                      fullWidth
                      value={values.slackChannelId}
                      onChange={(e) => {
                        setFieldValue("slackChannelId", e.target.value);
                      }}
                      error={Boolean(touched.slackChannelId && errors.slackChannelId)}
                      helperText={touched.slackChannelId && errors.slackChannelId}
                    >
                      {slackChannels.map((channel) => {
                        return <MenuItem value={channel.id}>{channel.name}</MenuItem>;
                      })}
                    </Select>
                  </>
                )}

                {!slackAuthorized && (
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => {
                      window.open(slackAuthUrl, "_self");
                    }}
                  >
                    Authorize Slack
                  </Button>
                )}

                <Fab
                  onClick={() => {
                    setSlackChannelEnabled(false);
                  }}
                  sx={{
                    minWidth: "3.5rem",
                    boxShadow: "none",
                    borderRadius: 1,
                    backgroundColor: "#ffe3de",
                    "&:hover": {
                      backgroundColor: "#ffc2b8",
                    },
                  }}
                >
                  <DeleteForeverIcon sx={{ color: "#FC573B" }} />
                </Fab>
              </Stack>
            )}

            {telegramChannelEnabled && (
              <Stack direction="row" spacing={1} pt={2}>
                <Fab
                  sx={{
                    boxShadow: "none",
                    borderRadius: 1,
                    minWidth: "3.5rem",
                    backgroundColor: "white",
                    border: "solid",
                    borderWidth: 1,
                    borderColor: "#d6d6d6",
                  }}
                >
                  <Box
                    component="img"
                    sx={{
                      opacity: 0.5,
                      height: 28,
                      width: 28,
                      maxHeight: 28,
                      maxWidth: 28,
                    }}
                    alt="ethereum"
                    src={`${assetsURL}Telegram.png`}
                  />
                </Fab>

                {telegramAuthorized && (
                  <>
                    <TextField value="Receive notifications on Telegram" fullWidth disabled={true} />
                  </>
                )}

                {!telegramAuthorized && (
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => {
                      dispatch(updateopenTelegramNotificationsDialog(true));
                    }}
                  >
                    Authorize Telegram
                  </Button>
                )}

                <Fab
                  color="error"
                  onClick={() => {
                    setTelegramChannelEnabled(false);
                  }}
                  sx={{
                    minWidth: "3.5rem",
                    boxShadow: "none",
                    borderRadius: 1,
                    backgroundColor: "#ffe3de",
                    "&:hover": {
                      backgroundColor: "#ffc2b8",
                    },
                  }}
                >
                  <DeleteForeverIcon sx={{ color: "#FC573B" }} />
                </Fab>
              </Stack>
            )}
          </Stack>

          <Box p={3} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Box width={'50%'}>
              Notifications Remaining <span style={{ fontWeight: "bold" }}>{planStats?.remaining_notifications}</span>
            </Box>

            <LoadingButton size="large" type="submit" variant="contained" loading={isSubmitting}>
              Submit
            </LoadingButton>
          </Box>
        </Form>
      </FormikProvider>
    </Dialog>
  );
}
