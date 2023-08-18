import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { Box, Button, Container, Grid, Link, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Header from "../components/Dashboard/Header";
import {
  calculatePriceInCrypto,
  getCurrentExchangeRates,
  getCurrentPlan,
  selectCurrentExchangerates,
  selectCurrentPlan,
  selectCurrentpriceInCrypto,
  updatePlanUsingCoinpayment,
} from "../redux/slices/pricingSlice";
// import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
// import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import CheckIcon from "@mui/icons-material/Check";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useState } from "react";
import { getPlanStats, selectPlanStats } from "../redux/slices/dashboardSlice";
import { formatDate } from "../utils/formatTime";
import { assetsURL } from "../utils/assetsURL";

export default function Pricing() {
  const currentPlan = useSelector(selectCurrentPlan);
  const currentpriceInCrypto = useSelector(selectCurrentpriceInCrypto);
  const currentExchangerates = useSelector(selectCurrentExchangerates);
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const [updatingPlanTo, setupdatingPlanTo] = useState(-1);
  const [SubscriptionExpiredDialogOpen, setSubscriptionExpiredDialogOpen] = React.useState(false);
  const handleSubscriptionExpiredDialogClose = () => {
    setSubscriptionExpiredDialogOpen(false);
  };
  const planStats = useSelector(selectPlanStats);
  const [selectedCryptoCurrency, setselectedCryptoCurrency] = useState("BTC");

  useEffect(() => {
    dispatch(getCurrentPlan());
    dispatch(getPlanStats());
    dispatch(getCurrentExchangeRates());

    if (searchParams.get("open_subscription_expired_dialog")) {
      setSubscriptionExpiredDialogOpen(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const payUsingStripe = () => {
  //   if (currentPlan == updatingPlanTo) {
  //     console.log("No need to update free plan");
  //   } else {
  //     dispatch(updatePlan({ targetPlan: updatingPlanTo }));
  //   }
  // };

  const payUsingCoinpayments = () => {
    if (currentPlan === updatingPlanTo) {
      console.log("No need to update free plan");
    } else {
      dispatch(updatePlanUsingCoinpayment({ targetPlan: updatingPlanTo, targetCrypto: selectedCryptoCurrency }));
    }
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (updatingPlanTo) => {
    if (currentPlan !== updatingPlanTo) {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Complete payments dialog
  const [openCoinpaymentDialog, setOpenCoinpaymentDialog] = React.useState(false);

  const handleOpenCoinpaymentDialog = (updatingPlanTo) => {
    setOpen(false);
    setOpenCoinpaymentDialog(true);
  };

  const handleCloseCoinpaymentDialog = () => {
    setOpenCoinpaymentDialog(false);
  };

  return (
    <>
      <Header selectedMenu={1} />

      <Container maxWidth="80vw" sx={{ marginTop: 5, maxWidth: "80vw" }}>
        <Box pb={3} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Typography variant="h6">Our Pricing</Typography>

          <Typography variant="subtitle1">
            Your Current plan :
            <span style={{ color: "green" }}>
              {currentPlan === 0 && " Free"}
              {currentPlan === 1 && " Beginner"}
              {currentPlan === 2 && " Enterprise"}{planStats?.subscription_end &&  "/"+formatDate(planStats?.subscription_end)}
            </span>
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {/* Free plan */}
          <Grid item md={4} xs={12}>
            <Stack
              spacing={1}
              p={3}
              sx={{
                height: "100%",
                border: "solid",
                borderWidth: 1,
                borderRadius: 1,
                borderColor: "#d6d6d6",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <HomeRoundedIcon sx={{ marginRight: 1 }} />
                  <Typography variant="h4">Free</Typography>
                </Box>
              </Box>

              <Typography variant="body2" color="text.secondary">
                Lorem ipsum dolor sit amet{" "}
              </Typography>

              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <Typography variant="h1" color="text.secondary">
                  $
                </Typography>
                <Typography variant="h1">0</Typography>
                <Typography variant="body2" color="text.secondary" mb={1} ml={1}>
                  per user/month
                </Typography>
              </Box>

              <Button
                variant="outlined"
                size="large"
                onClick={() => {
                  setupdatingPlanTo(0);
                  handleClickOpen(0);
                }}
              >
                {currentPlan === 0 ? "Your Current Plan" : "Get Started"}
              </Button>

              <Typography variant="body2" sx={{ fontWeight: "bold", paddingTop: 2 }}>
                This Plan Includes:
              </Typography>

              <Stack spacing={2}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <CheckIcon sx={{ marginRight: 1, fontSize: "1rem" }} />
                  <Typography variant="body2">1 Investigation</Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <CheckIcon sx={{ marginRight: 1, fontSize: "1rem" }} />
                  <Typography variant="body2">3 Addresses for Monitoring</Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <CheckIcon sx={{ marginRight: 1, fontSize: "1rem" }} />
                  <Typography variant="body2">1 Notification Channel for Alerts</Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <CheckIcon sx={{ marginRight: 1, fontSize: "1rem" }} />
                  <Typography variant="body2">24/7 Support</Typography>
                </Box>
              </Stack>
            </Stack>
          </Grid>

          {/* Beginner Plan */}
          <Grid item md={4} xs={12}>
            <Stack
              spacing={1}
              p={3}
              sx={{
                height: "100%",
                border: "solid",
                borderWidth: 1,
                borderRadius: 1,
                borderColor: "#d6d6d6",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <HomeRoundedIcon sx={{ marginRight: 1 }} />
                  <Typography variant="h4">Beginner</Typography>
                </Box>
              </Box>

              <Typography variant="body2" color="text.secondary">
                Lorem ipsum dolor sit amet{" "}
              </Typography>

              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <Typography variant="h1" color="text.secondary">
                  $
                </Typography>
                <Typography variant="h1">49</Typography>
                <Typography variant="body2" color="text.secondary" mb={1} ml={1}>
                  per user/month
                </Typography>
              </Box>

              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => {
                  setupdatingPlanTo(1);
                  handleClickOpen(1);
                }}
              >
                {currentPlan === 1 ? "Your Current Plan" : "Get Started"}
              </Button>

              <Typography variant="body2" sx={{ fontWeight: "bold", paddingTop: 2 }}>
                Everything in Free, plus:
              </Typography>

              <Stack spacing={2}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <CheckIcon sx={{ marginRight: 1, fontSize: "1rem" }} />
                  <Typography variant="body2">3 Investigation</Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <CheckIcon sx={{ marginRight: 1, fontSize: "1rem" }} />
                  <Typography variant="body2">25 Addresses for Monitoring</Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <CheckIcon sx={{ marginRight: 1, fontSize: "1rem" }} />
                  <Typography variant="body2">Unlimited Notification Channel for Alerts</Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <CheckIcon sx={{ marginRight: 1, fontSize: "1rem" }} />
                  <Typography variant="body2">24/7 Support</Typography>
                </Box>
              </Stack>
            </Stack>
          </Grid>

          {/* Enterprise Plan */}
          <Grid item md={4} xs={12}>
            <Stack
              spacing={1}
              p={3}
              sx={{
                backgroundColor: "primary.main",
                height: "100%",
                border: "solid",
                borderWidth: 1,
                borderRadius: 1,
                borderColor: "#d6d6d6",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <HomeRoundedIcon sx={{ marginRight: 1, color: "White" }} color="white" />
                  <Typography variant="h4" color="common.white">
                    Enterprise
                  </Typography>
                </Box>

                <Button variant="outlined" color="warning" sx={{ backgroundColor: "#332801", border: "none" }}>
                  Best Value
                </Button>
              </Box>

              <Typography variant="body2" color="text.secondary">
                Lorem ipsum dolor sit amet{" "}
              </Typography>

              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <Typography variant="h1" color="text.secondary">
                  $
                </Typography>
                <Typography variant="h1" color="common.white">
                  299
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={1} ml={1}>
                  per user/month
                </Typography>
              </Box>

              <Button
                variant="contained"
                size="large"
                color="warning"
                onClick={() => {
                  setupdatingPlanTo(2);
                  handleClickOpen(2);
                }}
              >
                {currentPlan === 2 ? "Your Current Plan" : "Get Started"}
              </Button>

              <Typography variant="body2" sx={{ fontWeight: "bold", paddingTop: 2 }} color="common.white">
                Everything in Beginner, plus:
              </Typography>

              <Stack spacing={1} sx={{ opacity: 0.8 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <CheckIcon sx={{ marginRight: 1, fontSize: "1rem", color: "White" }} />
                  <Typography variant="body2" color="common.white">
                    20 Investigation
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <CheckIcon sx={{ marginRight: 1, fontSize: "1rem", color: "White" }} />
                  <Typography variant="body2" color="common.white">
                    150 Addresses for Monitoring
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <CheckIcon sx={{ marginRight: 1, fontSize: "1rem", color: "White" }} />
                  <Typography variant="body2" color="common.white">
                    Unlimited Notification Channel for Alerts with Custom Webhooks
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <CheckIcon sx={{ marginRight: 1, fontSize: "1rem", color: "White" }} />
                  <Typography variant="body2" color="common.white">
                    Priority Support
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <CheckIcon sx={{ marginRight: 1, fontSize: "1rem", color: "White" }} />
                  <Typography variant="body2" color="common.white">
                    Social Media Discussions
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </Grid>

          {/* Custom Plan */}
          <Grid item xs={12}>
            <Box
              spacing={1}
              p={1}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: "bold" }} textAlign="center">
                For any Custom Plans - <Link onClick={() => {
                                        window.open('mailto:info@credshields.com', '_blank');
                                    }} sx={{ cursor: "pointer" }}>Contact US</Link>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Complete payment dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle textAlign="center">Complete the payment</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            {/* <Grid item xs={6}>
              <Box
                p={2}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  border: "solid",
                  borderWidth: 0.2,
                  borderColor: "#bfbfbf",
                  borderRadius: 1,
                }}
              >
                <Box
                  component="img"
                  sx={{
                    width: "100%",
                  }}
                  alt="ethereum"
                  src="${assetsURL}stripe.png"
                />

                <Button
                  variant="contained"
                  sx={{ marginTop: 4 }}
                  onClick={() => {
                    payUsingStripe();
                  }}
                >
                  Pay
                </Button>
              </Box>
            </Grid> */}

            <Grid item xs={12}>
              <Box
                p={2}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  border: "solid",
                  borderWidth: 0.2,
                  borderColor: "#bfbfbf",
                  borderRadius: 1,
                }}
              >
                <Box
                  component="img"
                  sx={{
                    width: "100%",
                  }}
                  alt="ethereum"
                  src={`${assetsURL}coinpayments.svg`}
                />

                <Button
                  variant="contained"
                  sx={{ marginTop: 4 }}
                  onClick={() => {
                    setselectedCryptoCurrency("BTC");
                    dispatch(calculatePriceInCrypto({ updatingPlanTo, targetCrypt: "BTC" }));
                    handleOpenCoinpaymentDialog();
                  }}
                >
                  Pay
                </Button>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>

      {/* Subscription expired dialog */}
      <Dialog open={SubscriptionExpiredDialogOpen} onClose={handleSubscriptionExpiredDialogClose}>
        <DialogTitle color="error" variant="h3">
          Your Subscription is Expired
        </DialogTitle>
        <DialogContent>
          <Typography>Your current plan subscription is expired. Please renew your subscription to continue using this service.</Typography>

          <Button variant="contained" sx={{ marginTop: 2 }} onClick={handleSubscriptionExpiredDialogClose}>
            Ok
          </Button>
        </DialogContent>
      </Dialog>

      {/* Complete payment using coinpayments gateway */}
      <Dialog open={openCoinpaymentDialog} onClose={handleCloseCoinpaymentDialog}>
        <DialogTitle textAlign="center">Complete the payment using Coinpayments</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box
                p={2}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  border: "solid",
                  borderWidth: 0.2,
                  borderColor: "#bfbfbf",
                  borderRadius: 1,
                }}
              >
                <Box
                  component="img"
                  sx={{
                    width: "100%",
                  }}
                  alt="ethereum"
                  src={`${assetsURL}coinpayments.svg`}
                  mb={3}
                />

                <Typography variant="h5" sx={{ marginBottom: 2 }}>
                  {currentpriceInCrypto.toFixed(8)} {selectedCryptoCurrency}
                </Typography>

                <FormControl fullWidth>
                  <InputLabel>Currencies</InputLabel>
                  <Select
                    value={selectedCryptoCurrency}
                    label="Currencies"
                    onChange={(e) => {
                      dispatch(calculatePriceInCrypto({ updatingPlanTo, targetCrypt: e.target.value }));
                      setselectedCryptoCurrency(e.target.value);
                    }}
                  >
                    {currentExchangerates.length !== 0 &&
                      Object.keys(currentExchangerates).map((curr) => {
                        return <MenuItem value={curr}>{curr}</MenuItem>;
                      })}
                  </Select>
                </FormControl>

                <Button
                  variant="contained"
                  sx={{ marginTop: 2 }}
                  onClick={() => {
                    payUsingCoinpayments();
                  }}
                >
                  Pay
                </Button>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}