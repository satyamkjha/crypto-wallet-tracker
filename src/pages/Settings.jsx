import {
  Alert,
  Avatar,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  Link,
  Container,
} from "@mui/material";
import { Form, FormikProvider, useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Dashboard/Header";
import { getUserInfo, selectUserInfo, updateUserEmail, updateUserPassword } from "../redux/slices/settingSlice";
import EmailIcon from "@mui/icons-material/Email";
import GoogleIcon from "@mui/icons-material/Google";
import { LoadingButton } from "@mui/lab";
import * as Yup from "yup";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import KeyIcon from "@mui/icons-material/Key";

export default function Settings() {
  const userInfo = useSelector(selectUserInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  const RegisterSchema = Yup.object().shape({
    consent: Yup.bool().required("Consent is required"),
    email: Yup.string().email("Email must be a valid email address"),
    newEmail: Yup.string().email("Email must be a valid email address").required("Email is required"),
  });

  const formik = useFormik({
    initialValues: { 
      email: "",
      newEmail: "",
      consent: true,
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
      setSubmitting(true);
      console.log(values);
      await dispatch(updateUserEmail({ email: values.email, newEmail: values.newEmail, reset: resetForm, setErrors }));
      setSubmitting(false);
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  const RegisterSchema2 = Yup.object().shape({
    password: Yup.string(),
    consent: Yup.bool().required("Consent is required"),
    newPassword: Yup.string().required("New Password is required"),
    confirmNewPassword: Yup.string().required("Confirm New password is required"),
  });

  const formik2 = useFormik({
    initialValues: {
      password: "",
      consent: true,
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: RegisterSchema2,
    onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
      console.log(values);
      if (values.newPassword === values.confirmNewPassword) {
        setSubmitting(true);
        console.log(values);
        await dispatch(updateUserPassword({ password: values.password, newPassword: values.newPassword, reset: resetForm, setErrors }));
        setSubmitting(false);
      } else {
        setErrors({ afterSubmit: "New Password Confirmation does not match" });
      }
    },
  });

  return (
    <>
      <Header selectedMenu={3} />

      <Container maxWidth="80vw" sx={{ marginTop: 5, maxWidth: "80vw" }}>
        <Grid container spacing={3}>
          {/* Reset Email Address */}
          <Grid item md={6} xs={12}>
            <Box
              p={5}
              sx={{
                border: "solid",
                borderWidth: 1,
                borderRadius: 1,
                borderColor: "#d6d6d6",
              }}
            >
              <FormikProvider value={formik}>
                <Stack spacing={2}>
                  <Typography variant="h4">Reset Email Address</Typography>

                  <Typography>To Reset your email, enter your current email along with the new email.</Typography>

                  <Typography>
                    <span style={{ fontWeight: "bold" }}>Please Note :</span> All the information about your next orders would be shared on your new
                    email.
                  </Typography>

                  <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                      {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}

                      <TextField
                        sx={{ display: userInfo?.email.length == 0 ? "none" : "" }}
                        fullWidth
                        type="email"
                        placeholder="Enter your Current Email Address"
                        {...getFieldProps("email")}
                        error={Boolean(touched.email && errors.email)}
                        helperText={touched.email && errors.email}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <EmailIcon sx={{ opacity: 0.5 }} />
                            </InputAdornment>
                          ),
                        }}
                      />

                      <TextField
                        fullWidth
                        type="email"
                        placeholder="Enter your New Email Address"
                        {...getFieldProps("newEmail")}
                        error={Boolean(touched.newEmail && errors.newEmail)}
                        helperText={touched.newEmail && errors.newEmail}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <EmailIcon sx={{ opacity: 0.5 }} />
                            </InputAdornment>
                          ),
                        }}
                      />

                      <Box pl={1}>
                        <Grid container>
                          <Grid item xs={5} sx={{ display: "flex", alignItems: "center" }}>
                            <FormControlLabel
                              control={<Checkbox checked={formik.values.consent} />}
                              label={
                                <Typography variant="body2" color="text.secondary">
                                  Yes, I want to reset my Email Address
                                </Typography>
                              }
                            />
                          </Grid>
                          <Grid item xs={7}>
                            <LoadingButton sx={{ minHeight: "4rem" }} fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                              Reset Email
                            </LoadingButton>
                          </Grid>
                        </Grid>
                      </Box>
                    </Stack>
                  </Form>
                </Stack>
              </FormikProvider>
            </Box>

            {/* Facing issue */}
            <Box sx={{ backgroundColor: "background.neutral", display: "flex", alignItems: "center", borderRadius: 1 }} p={3} mt={3}>
              <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
                <ContactSupportIcon sx={{ fontSize: "3rem", marginRight: 1 }} />

                <Box>
                  <Typography variant="h6">Facing issue?</Typography>
                  <Typography variant="body2">Contact our Support team to get support.</Typography>
                </Box>
              </Box>

              <Box>
                <Button variant="outlined" size="large" sx={{ backgroundColor: "#b3b3b3", color: "#121212", minWidth: "10rem", border: "none" }}>
                  Contact
                </Button>
              </Box>
            </Box>
          </Grid>

          {/* Reset password */}
          <Grid item md={6} xs={12}>
            <Box
              p={5}
              sx={{
                border: "solid",
                borderWidth: 1,
                borderRadius: 1,
                borderColor: "#d6d6d6",
              }}
            >
              <FormikProvider value={formik2}>
                <Stack spacing={2}>
                  <Typography variant="h4">Reset Password</Typography>

                  <Typography>To Reset your Password, enter your current password along with the new password.</Typography>

                  <Form autoComplete="off" noValidate onSubmit={formik2.handleSubmit}>
                    <Stack spacing={2}>
                      {formik2.errors.afterSubmit && <Alert severity="error">{formik2.errors.afterSubmit}</Alert>}

                      <TextField
                        sx={{ display: userInfo?.password_status ? "" : "none" }}
                        fullWidth
                        placeholder="Enter your Current Password"
                        {...formik2.getFieldProps("password")}
                        error={Boolean(formik2.touched.password && formik2.errors.password)}
                        helperText={formik2.touched.password && formik2.errors.password}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <KeyIcon sx={{ opacity: 0.5 }} />
                            </InputAdornment>
                          ),
                        }}
                      />

                      <TextField
                        fullWidth
                        placeholder="Enter your New Password"
                        {...formik2.getFieldProps("newPassword")}
                        error={Boolean(formik2.touched.newPassword && formik2.errors.newPassword)}
                        helperText={formik2.touched.newPassword && formik2.errors.newPassword}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <KeyIcon sx={{ opacity: 0.5 }} />
                            </InputAdornment>
                          ),
                        }}
                      />

                      <TextField
                        fullWidth
                        placeholder="Confirm your New Password"
                        {...formik2.getFieldProps("confirmNewPassword")}
                        error={Boolean(formik2.touched.confirmNewPassword && formik2.errors.confirmNewPassword)}
                        helperText={formik2.touched.confirmNewPassword && formik2.errors.confirmNewPassword}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <KeyIcon sx={{ opacity: 0.5 }} />
                            </InputAdornment>
                          ),
                        }}
                      />

                      <Box pl={1}>
                        <Grid container>
                          <Grid item xs={5} sx={{ display: "flex", alignItems: "center" }}>
                            <FormControlLabel
                              control={<Checkbox checked={formik2.values.consent} />}
                              label={
                                <Typography variant="body2" color="text.secondary">
                                  Yes, I want to reset my Password
                                </Typography>
                              }
                            />
                          </Grid>
                          <Grid item xs={7}>
                            <LoadingButton
                              sx={{ minHeight: "4rem" }}
                              fullWidth
                              size="large"
                              type="submit"
                              variant="contained"
                              loading={formik2.isSubmitting}
                            >
                              Reset Password
                            </LoadingButton>
                          </Grid>
                        </Grid>
                      </Box>
                    </Stack>
                  </Form>
                </Stack>
              </FormikProvider>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
