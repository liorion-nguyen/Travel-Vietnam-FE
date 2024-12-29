import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  Box,
  Button,
  CircularProgress,
  Checkbox,
  FormHelperText,
  Stack,
  TextField,
  Typography,
  MenuItem,
  OutlinedInput,
  FormControl,
} from '@mui/material';

import { useDispatch, useSelector } from 'src/redux/store';
import { useMounted } from 'src/hooks/use-mounted';
import { handleOpenDialog, register } from 'src/redux/slices/authentication';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import { MuiTelInput } from 'mui-tel-input';
import { useTranslation } from 'react-i18next';
import { tokens } from 'src/locales/tokens';

interface Address {
  province: string;
  district: string;
  ward: string;
}

interface Phone {
  country: string;
  number: string;
}

interface RegisterValues {
  email: string;
  fullName: string;
  password: string;
  confirmPassword: string;
  policy: boolean;
  dateOfBirth: Dayjs | null;
  address: Address;
  phone: Phone;
  role: string;
  status: string;
}

const initialValues: RegisterValues = {
  email: '',
  fullName: '',
  password: '',
  confirmPassword: '',
  policy: false,
  dateOfBirth: null,
  address: {
    province: '',
    district: '',
    ward: '',
  },
  phone: {
    country: '+ 84',
    number: '',
  },
  role: 'User',
  status: 'Active',
};

interface Location {
  id: string;
  name: string;
}

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Must be a valid email')
    .max(255, 'Email must be at most 255 characters')
    .required('Email is required'),

  fullName: Yup.string()
    .max(255, 'Full name must be at most 255 characters')
    .required('Full name is required'),

  password: Yup.string()
    .min(7, 'Password must be at least 7 characters')
    .max(255, 'Password must be at most 255 characters')
    .required('Password is required'),

  confirmPassword: Yup.string().required('Confirm password is required'),

  policy: Yup.boolean().oneOf([true], 'This field must be checked'),

  dateOfBirth: Yup.date().required('Date of birth is required'),

  address: Yup.object({
    province: Yup.string().required('Province is required'),
    district: Yup.string().required('District is required'),
    ward: Yup.string().required('Ward is required'),
  }),

  phone: Yup.object({
    country: Yup.string().required('Country code is required'),
    number: Yup.string()
      .max(9, 'Number phone must be at most 9 characters')
      .matches(/^\d{8,11}$/, 'Phone number must be between 8 and 11 digits')
      .required('Phone number is required'),
  }),
});

const RegisterPage = () => {
  const dispatch = useDispatch();
  const isMounted = useMounted();
  const { loading } = useSelector((state) => state.authentication);
  const [provinces, setProvinces] = useState<Location[]>([]);
  const [districts, setDistricts] = useState<Location[]>([]);
  const [wards, setWards] = useState<Location[]>([]);
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        const registerData = {
          email: values.email.toLowerCase(),
          password: values.password,
          fullName: values.fullName,
          dateOfBirth: values.dateOfBirth,
          address: {
            province: values.address.province,
            district: values.address.district,
            ward: values.address.ward,
          },
          phone: {
            country: values.phone.country,
            number: values.phone.number,
          },
        };
        await dispatch(register(registerData));

        if (isMounted()) {
          // router.push(paths.auth.login);
        }
      } catch (err) {
        if (isMounted()) {
          helpers.setStatus({ success: false });
          helpers.setSubmitting(false);
        }
      }
    },
  });

  useEffect(() => {
    fetch('https://esgoo.net/api-tinhthanh/1/0.htm')
      .then((response) => response.json())
      .then((data) => setProvinces(data.data));
  }, []);

  useEffect(() => {
    if (formik.values.address.province) {
      fetch(`https://esgoo.net/api-tinhthanh/2/${formik.values.address.province}.htm`)
        .then((response) => response.json())
        .then((data) => setDistricts(data.data));
    }
  }, [formik.values.address.province]);

  useEffect(() => {
    if (formik.values.address.district) {
      fetch(`https://esgoo.net/api-tinhthanh/3/${formik.values.address.district}.htm`)
        .then((response) => response.json())
        .then((data) => setWards(data.data));
    }
  }, [formik.values.address.district]);
  return (
    <>
      <div>
        <Stack
          sx={{ mb: 4 }}
          spacing={1}
        >
          <Typography variant="h5">{t(tokens.auth.register.title)}</Typography>
          <Typography
            color="text.secondary"
            variant="body2"
            display="flex"
          >
            {t(tokens.auth.register.haveAccount)} &nbsp;
            <Typography
              color="#faa935"
              variant="subtitle2"
              onClick={() => dispatch(handleOpenDialog('login'))}
            >
              {t(tokens.auth.register.loginHere)}
            </Typography>
          </Typography>
        </Stack>
        <form
          noValidate
          onSubmit={formik.handleSubmit}
        >
          <Stack spacing={3}>
            <TextField
              error={!!(formik.touched.fullName && formik.errors.fullName)}
              fullWidth
              helperText={formik.touched.fullName && formik.errors.fullName}
              label="fullName"
              name="fullName"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.fullName}
            />
            <TextField
              error={!!(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Email address"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
            />
            <TextField
              error={!!(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
            />
            <TextField
              error={
                !!(formik.touched.confirmPassword && formik.errors.confirmPassword) ||
                formik.values.password !== formik.values.confirmPassword
              }
              fullWidth
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
              label="Confirm password"
              name="confirmPassword"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.confirmPassword}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date of Birth"
                value={formik.values.dateOfBirth}
                onChange={(date: Dayjs | null) => formik.setFieldValue('dateOfBirth', date)}
              />
            </LocalizationProvider>

            <TextField
              select
              label="Province"
              name="address.province"
              value={formik.values.address?.province}
              onChange={(value) => formik.setFieldValue('address.province', value.target.value)}
              onBlur={formik.handleBlur}
              error={formik.touched.address?.province && !!formik.errors.address?.province}
              helperText={formik.touched.address?.province && formik.errors.address?.province}
              fullWidth
            >
              {provinces.map((province) => (
                <MenuItem
                  key={province.id}
                  value={province.id}
                >
                  {province.name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="District"
              name="address.district"
              value={formik.values.address?.district}
              onChange={(value) => formik.setFieldValue('address.district', value.target.value)}
              onBlur={formik.handleBlur}
              error={formik.touched.address?.district && !!formik.errors.address?.district}
              helperText={formik.touched.address?.district && formik.errors.address?.district}
              fullWidth
              disabled={!formik.values.address?.province}
            >
              {districts.map((district) => (
                <MenuItem
                  key={district.id}
                  value={district.id}
                >
                  {district.name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Ward"
              name="address.ward"
              value={formik.values.address?.ward}
              onChange={(value) => formik.setFieldValue('address.ward', value.target.value)}
              onBlur={formik.handleBlur}
              error={formik.touched.address?.ward && !!formik.errors.address?.ward}
              helperText={formik.touched.address?.ward && formik.errors.address?.ward}
              fullWidth
              disabled={!formik.values.address?.district}
            >
              {wards.map((ward) => (
                <MenuItem
                  key={ward.id}
                  value={ward.id}
                >
                  {ward.name}
                </MenuItem>
              ))}
            </TextField>
            <Box
              sx={{
                display: 'flex',
                gap: '10px',
                '.MuiInputAdornment-root': { marginTop: '0px !important' },
                '.MuiInputBase-input': {
                  paddingTop: '10px !important',
                  paddingBottom: '10px !important',
                },
              }}
            >
              <MuiTelInput
                sx={{ width: '170px' }}
                value={formik.values.phone.country}
                name="phone.country"
                onChange={(value) => formik.setFieldValue('phone.country', value)}
                onBlur={formik.handleBlur}
                error={formik.touched.phone?.country && !!formik.errors.phone?.country}
                helperText={formik.touched.phone?.country && formik.errors.phone?.country}
                defaultCountry="VN"
              />
              <FormControl
                fullWidth
                error={formik.touched.phone?.number && !!formik.errors.phone?.number}
              >
                <OutlinedInput
                  sx={{ flex: 1 }}
                  value={formik.values.phone.number}
                  name="phone.number"
                  placeholder="000 000 000"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) {
                      formik.setFieldValue('phone.number', value);
                    }
                  }}
                  // onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.phone?.number && formik.errors.phone?.number && (
                  <FormHelperText>{formik.errors.phone?.number}</FormHelperText>
                )}
              </FormControl>
            </Box>
          </Stack>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              ml: -1,
              mt: 1,
            }}
          >
            <Checkbox
              checked={formik.values.policy}
              name="policy"
              onChange={formik.handleChange}
            />
            <Typography
              color="text.secondary"
              variant="body2"
            >
              {t(tokens.auth.register.terms)}
            </Typography>
          </Box>
          {!!(formik.touched.policy && formik.errors.policy) && (
            <FormHelperText error>{t(tokens.auth.register.termsRequired)}</FormHelperText>
          )}
          <Button
            fullWidth
            size="large"
            sx={{ mt: 3, background: '#faa935' }}
            type="submit"
            variant="contained"
            disabled={!formik.values.policy || loading}
          >
            {loading ? <CircularProgress /> : t(tokens.auth.register.registerButton)}
          </Button>
        </form>
      </div>
    </>
  );
};

export default RegisterPage;
