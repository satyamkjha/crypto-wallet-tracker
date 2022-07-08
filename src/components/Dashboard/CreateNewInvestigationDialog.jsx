import {
    Alert, Box, InputAdornment,
    Stack, TextField
} from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { createInvestigation, selectOpenCreateInvestigationDialog, selectPlanStats, updateOpenCreateInvestigationDialog } from '../../redux/slices/dashboardSlice';
import { Form, FormikProvider, useFormik } from 'formik';
import EmailIcon from '@mui/icons-material/Email';
import LoadingButton from '@mui/lab/LoadingButton';
import { useNavigate } from "react-router-dom";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { chains } from '../../utils/supportedChains';

export default function CreateNewInvestigationDialog() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const openCreateInvestigationDialog = useSelector(selectOpenCreateInvestigationDialog)
    const planStats = useSelector(selectPlanStats)

    const Schema = Yup.object().shape({
        address: Yup.string('Enter valid address').required('Address is required'),
        chain: Yup.string('Select valid chain').required('Chain is required'),
    });

    const formik = useFormik({
        initialValues: {
            address: '',
            chain: 'ethereum-mainnet'
        },
        validationSchema: Schema,
        onSubmit: async (values, { setErrors, setSubmitting, isSubmitting }) => {
            setSubmitting(true);

            await dispatch(createInvestigation({
                setSubmitting,
                address: values.address,
                chain: values.chain,
                navigate
            }))

        }
    });

    const { errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue } = formik;

    return (
        <Dialog
            fullWidth
            maxWidth='sm'
            open={openCreateInvestigationDialog}
            onClose={() => { dispatch(updateOpenCreateInvestigationDialog(false)) }}
        >
            <FormikProvider value={formik}>
                <Form autoComplete="off" noValidate onSubmit={handleSubmit}>

                    <DialogTitle>
                        {"Add Investigation"}
                    </DialogTitle>

                    <DialogContent>
                        <DialogContentText>
                            Enter address below to start investigation
                        </DialogContentText>

                        <Stack spacing={1}>
                            {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}

                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box sx={{ flexGrow: 1, marginRight: 1 }}>
                                    <TextField
                                        fullWidth
                                        placeholder='Address'
                                        {...getFieldProps('address')}
                                        error={Boolean(touched.address && errors.address)}
                                        helperText={touched.address && errors.address}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start"><EmailIcon sx={{ opacity: 0.5 }} /></InputAdornment>,
                                        }}
                                    />
                                </Box>


                                <Select
                                    value={formik.values.chain}
                                    sx={{ minWidth: '14rem' }}
                                    onChange={(e) => { setFieldValue('chain', e.target.value) }}
                                >
                                    {
                                        chains.map(chainData => {
                                            return <MenuItem value={chainData.name}>
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <Box
                                                        component="img"
                                                        sx={{
                                                            marginRight: 1,
                                                            height: 24,
                                                            width: 24,
                                                            maxHeight: 24,
                                                            maxWidth: 24,
                                                        }}
                                                        alt="ethereum"
                                                        src={chainData.logo}
                                                    />
                                                    {chainData.name}
                                                </Box>
                                            </MenuItem>

                                        })
                                    }
                                </Select>
                            </Box>
                        </Stack>

                    </DialogContent>

                    <Box p={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box>
                            Investigation remaining {planStats?.remaining_investigations}
                        </Box>

                        <LoadingButton
                            type="submit"
                            variant="contained"
                            loading={isSubmitting}>
                            Investigate
                        </LoadingButton>
                    </Box>

                </Form>
            </FormikProvider>
        </Dialog>
    )
}