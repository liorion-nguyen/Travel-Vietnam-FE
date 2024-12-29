import { Box, Button, FormControl, InputLabel, MenuItem, OutlinedInput, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { dispatch, useSelector } from "src/redux/store";
import { UserType } from "src/types/redux/user";
import { MuiTelInput } from "mui-tel-input";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import { useTranslation } from 'react-i18next';
import { tokens } from 'src/locales/tokens';
import { updatePassword, updateUser } from "src/redux/slices/user";

interface Location {
  id: string;
  name: string;
}

export default function Information() {
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.user);
  const [userDetail, setUserDetail] = useState<UserType | null>(user);
  const [provinces, setProvinces] = useState<Location[]>([]);
  const [districts, setDistricts] = useState<Location[]>([]);
  const [wards, setWards] = useState<Location[]>([]);
  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  
  useEffect(() => {
    setUserDetail(user);
  }, [user])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement> | { target: { name: string; value: string } }): void => {
    const { name, value } = event.target;
    setUserDetail((prev) => {
      if (!prev) return null;
      if (name.includes('phone.')) {
        return {
          ...prev,
          phone: {
            ...(prev.phone || {}),
            number: name === 'phone.number' ? value : prev.phone?.number,
            country: name === 'phone.country' ? value : prev.phone?.country,
          },
        };
      }
      else if (name.includes('address.')) {
        return {
          ...prev,
          address: {
            ...(prev.address || {}),
            province: name === 'address.province' ? value : prev.address?.province,
            district: name === 'address.district' ? value : prev.address?.district,
            ward: name === 'address.ward' ? value : prev.address?.ward,
          },
        };
      }
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    const fetchProvinces = async (): Promise<void> => {
      try {
        const response = await fetch('https://esgoo.net/api-tinhthanh/1/0.htm');
        const data: { data: Location[] } = await response.json() as { data: Location[] };
        setProvinces(data.data);
      } catch (error: unknown) {
        toast.error(`Error fetching provinces: ${String(error)}`);
      }
    };
    fetchProvinces().catch((error: unknown) => {
      toast.error(`Error fetching provinces: ${String(error)}`);
    });
  }, []);

  useEffect(() => {
    if (userDetail?.address?.province) {
      fetch(`https://esgoo.net/api-tinhthanh/2/${userDetail.address.province}.htm`)
        .then((response) => response.json())
        .then((data: { data: Location[] }) => {
          setDistricts(data.data);
        })
        .catch((error: unknown) => {
          toast.error(`Error fetching districts: ${String(error)}`);
        });
    }
  }, [userDetail?.address?.province]);

  useEffect(() => {
    if (userDetail?.address?.district) {
      fetch(`https://esgoo.net/api-tinhthanh/3/${userDetail.address.district}.htm`)
        .then((response) => response.json())
        .then((data: { data: Location[] }) => {
          setWards(data.data);
        })
        .catch((error: unknown) => {
          toast.error(`Error fetching wards: ${String(error)}`);
        });
    }
  }, [userDetail?.address?.district]);

  const handleSavePassword = (): void => {
    if (oldPassword && newPassword && user?._id) {
      dispatch(updatePassword(user?._id, oldPassword, newPassword));
      setOldPassword("");
      setNewPassword("");
    }
  }

  const handleSaveDetails = (): void => {
    if (userDetail) {
      dispatch(updateUser(userDetail._id, userDetail));
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}
    >
      <Card>
        <CardHeader
          subheader={t(tokens.profile.editInfo)}
          title={t(tokens.profile.title)}
        />
        <Divider />
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <FormControl fullWidth required>
            <InputLabel shrink>{t(tokens.profile.fullName)}</InputLabel>
            <OutlinedInput
              value={userDetail?.fullName}
              label={t(tokens.profile.fullName)}
              name="fullName"
              onChange={handleChange}
            />
          </FormControl>
          <FormControl fullWidth required>
            <InputLabel shrink>{t(tokens.profile.emailAddress)}</InputLabel>
            <OutlinedInput
              value={userDetail?.email}
              label={t(tokens.profile.emailAddress)}
              name="email"
              onChange={handleChange}
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor="date-of-birth" shrink>{t(tokens.profile.dateOfBirth)}</InputLabel>
            <OutlinedInput
              id="date-of-birth"
              type="date"
              name="dateOfBirth"
              value={userDetail?.dateOfBirth ? userDetail.dateOfBirth.split('T')[0] : ''}
              onChange={handleChange}
              fullWidth
            />
          </FormControl>
          <Box sx={{ display: 'flex', height: '56px', gap: '10px', ".MuiInputAdornment-root": { marginTop: '0px !important' }, ".MuiInputBase-input": { paddingTop: '10px !important', paddingBottom: '10px !important' } }}>
            <MuiTelInput
              sx={{ width: '170px', height: '100%', ".MuiInputBase-root": { height: '100%' } }}
              value={userDetail?.phone?.country}
              name="phone.country"
              onChange={(value: string) => {
                handleChange({ target: { name: 'phone.country', value } });
              }}
              defaultCountry="VN"
            />
            <FormControl fullWidth required>
              <InputLabel shrink>{t(tokens.profile.phoneNumber)}</InputLabel>
              <OutlinedInput
                sx={{ flex: 1 }}
                value={userDetail?.phone?.number}
                name="phone.number"
                onChange={handleChange}
                placeholder={t('000 000 000')}
                label={t(tokens.profile.phoneNumber)}
              />
            </FormControl>
          </Box>
          <Box sx={{ display: 'flex', gap: '10px' }}>
            <TextField
              select
              label={t(tokens.profile.province)}
              name="address.province"
              value={userDetail?.address.province}
              onChange={handleChange}
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
              label={t(tokens.profile.district)}
              name="address.district"
              value={userDetail?.address?.district}
              onChange={handleChange}
              fullWidth
              disabled={!userDetail?.address?.province}
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
              label={t(tokens.profile.ward)}
              name="address.ward"
              value={userDetail?.address?.ward}
              onChange={handleChange}
              fullWidth
              disabled={!userDetail?.address?.district}
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
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" onClick={handleSaveDetails}>{t(tokens.profile.saveDetails)}</Button>
        </CardActions>
      </Card>
      <Card>
        <CardHeader
          subheader={t(tokens.profile.editPassword)}
          title={t(tokens.profile.security)}
        />
        <Divider />
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <FormControl fullWidth required>
            <InputLabel>{t(tokens.profile.oldPassword)}</InputLabel>
            <OutlinedInput
              label={t(tokens.profile.oldPassword)}
              name="oldPassword"
              type="password"
              placeholder={t(tokens.profile.oldPassword)}
              onChange={(e) => setOldPassword(e.target.value)}
              value={oldPassword}
            />
          </FormControl>
          <FormControl fullWidth required>
            <InputLabel>{t(tokens.profile.newPassword)}</InputLabel>
            <OutlinedInput
              label={t(tokens.profile.newPassword)}
              name="newPassword"
              type="password"
              placeholder={t(tokens.profile.newPassword)}
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
            />
          </FormControl>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" onClick={handleSavePassword}>{t(tokens.profile.save)}</Button>
        </CardActions>
      </Card>
    </Box>
  )
}
