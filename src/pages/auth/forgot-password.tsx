import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  SvgIcon,
  TextField,
  Typography,
} from '@mui/material';
import { Seo } from 'src/components/common/performance/seo';
import { useDispatch, useSelector } from 'src/redux/store';
import { forgotPassword, handleOpenDialog, verifyCode } from 'src/redux/slices/authentication';
import { Container } from '@mui/system';
import { ArrowLeftIcon } from '@mui/x-date-pickers';
import { useTranslation } from 'react-i18next';
import { tokens } from 'src/locales/tokens';
import { MuiOtpInput } from 'mui-one-time-password-input'
import { useState } from 'react';

interface ForgotPasswordValues {
  email: string;
}

const initialValues: ForgotPasswordValues = {
  email: '',
};

const validationSchema = Yup.object({
  email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
});

const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [otp, setOtp] = useState('');

  const { loading, forgotEmailSent } = useSelector((state) => state.authentication);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (): Promise<void> => {

    },
  });

  const handleClick = async () => {
    await dispatch(forgotPassword(formik.values.email));
  };
  const handleChange = (value: string) => {
    setOtp(value);
  };

  const handleVerifyCode = async () => {
    await dispatch(verifyCode({ email: formik.values.email, code: otp }));
  };

  return (
    <>
      <Seo title={t(tokens.auth.forgotPassword.title)} />
      <Container maxWidth="sm">
        <Box
          sx={{ mb: 4, display: 'flex', alignItems: 'center' }}
          onClick={() => dispatch(handleOpenDialog('login'))}
        >
          <SvgIcon sx={{ mr: 1 }}>
            <ArrowLeftIcon />
          </SvgIcon>
          <Typography variant="subtitle2">{t(tokens.auth.forgotPassword.backToLogin)}</Typography>
        </Box>
        <Stack
          sx={{ mb: 4 }}
          spacing={1}
        >
          <Typography variant="h5">
            {forgotEmailSent ? t(tokens.auth.forgotPassword.emailSent) : t(tokens.auth.forgotPassword.title)}
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
          >
            {forgotEmailSent
              ? t(tokens.auth.forgotPassword.emailSentDescription, { email: formik.values.email })
              : t(tokens.auth.forgotPassword.description)}
          </Typography>
          {forgotEmailSent && <>
            <MuiOtpInput value={otp} onChange={handleChange} length={6} />
            <Button
              fullWidth
              size="large"
              sx={{ mt: 3 }}
              type="submit"
              variant="contained"
              disabled={loading}
              onClick={handleVerifyCode}
            >
              {loading ? <CircularProgress /> : t(tokens.auth.forgotPassword.verifyCode)}
            </Button>
            </>}
        </Stack>
        {!forgotEmailSent && (
          <form
            noValidate
            onSubmit={formik.handleSubmit}
          >
            <TextField
              autoFocus
              error={!!(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label={t(tokens.auth.login.email)}
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
            />
            <Button
              fullWidth
              size="large"
              sx={{ mt: 3 }}
              type="submit"
              variant="contained"
              disabled={loading}
              onClick={handleClick}
            >
              {loading ? <CircularProgress /> : t(tokens.auth.forgotPassword.sendResetLink)}
            </Button>
          </form>
        )}
      </Container>
    </>
  );
};

export default ForgotPasswordPage;
