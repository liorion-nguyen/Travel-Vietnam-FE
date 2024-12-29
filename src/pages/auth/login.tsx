import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Button, CircularProgress, Stack, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'src/redux/store';
import { handleOpenDialog, login } from '../../redux/slices/authentication';
import { useMounted } from 'src/hooks/use-mounted';
import { useDialog } from 'src/hooks/use-dialog';
import { useTranslation } from 'react-i18next';
import { tokens } from 'src/locales/tokens';

interface LoginValues {
  email: string;
  password: string;
  submit: null;
}

const initialValues: LoginValues = {
  email: '',
  password: '',
  submit: null,
};

const LoginPage = () => {
  const dispatch = useDispatch();
  const isMounted = useMounted();
  const dialog = useDialog();
  const { t } = useTranslation();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email(t(tokens.auth.login.invalidEmail))
      .max(100, t(tokens.auth.login.emailRequired))
      .required(t(tokens.auth.login.emailRequired)),
    password: Yup.string()
      .min(8, t(tokens.auth.login.passwordLength))
      .max(50, t(tokens.auth.login.passwordLength))
      .required(t(tokens.auth.login.passwordRequired)),
  });

  const { loading } = useSelector((state) => state.authentication);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        const loginData = {
          email: values.email,
          password: values.password,
        };
        await dispatch(login(loginData));
        dialog.handleClose();
        dispatch(handleOpenDialog(''));
      } catch (err) {
        if (isMounted()) {
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: err.message });
          helpers.setSubmitting(false);
        }
      }
    },
  });

  return (
    <>
      <div>
        <Stack
          sx={{ mb: 4 }}
          spacing={1}
        >
          <Typography variant="h5">{t(tokens.auth.login.title)}</Typography>
          <Typography
            color="text.secondary"
            variant="body2"
            display="flex"
          >
            {t(tokens.auth.login.noAccount)} &nbsp;
            <Typography
              color="#faa935"
              variant="subtitle2"
              onClick={() => dispatch(handleOpenDialog('register'))}
            >
              {t(tokens.auth.login.signUp)}
            </Typography>
          </Typography>
        </Stack>
        <form
          noValidate
          onSubmit={formik.handleSubmit}
        >
          <Stack spacing={3}>
            <TextField
              autoFocus
              error={!!(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label={t(tokens.auth.login.email)}
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              value={formik.values.email}
            />
            <TextField
              error={!!(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label={t(tokens.auth.login.password)}
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              autoComplete="current-password"
            />
          </Stack>
          <Typography
            color="#faa935"
            variant="subtitle2"
            onClick={() => {
              dispatch(handleOpenDialog('forgot-password'));
            }}
          >
            {t(tokens.auth.login.forgotPassword)}
          </Typography>
          <Button
            fullWidth
            sx={{ mt: 3, background: '#faa935' }}
            size="large"
            type="submit"
            variant="contained"
            disabled={loading}
          >
            {loading ? <CircularProgress /> : t(tokens.auth.login.loginButton)}
          </Button>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
