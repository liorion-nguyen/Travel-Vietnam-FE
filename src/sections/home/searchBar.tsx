import React, { useRef } from 'react'
import { TextField, Grid, IconButton, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useNavigate } from 'react-router-dom'
import { envConfig } from 'src/config'

const SearchBar = () => {
  const locationRef = useRef<HTMLInputElement | null>(null)
  const distanceRef = useRef<HTMLInputElement | null>(null)
  const maxGroupSizeRef = useRef<HTMLInputElement | null>(null)
  const navigate = useNavigate()
  const baseUrl = envConfig.serverURL

  const searchHandler = async () => {
    const location = locationRef.current?.value
    const distance = distanceRef.current?.value
    const maxGroupSize = maxGroupSizeRef.current?.value

    if (!location || !distance || !maxGroupSize) {
      return alert('All fields are required!')
    }

    const res = await fetch(
      `${baseUrl}/tours/search/getTourBySearch?city=${location}&distance=${distance}&maxGroupSize=${maxGroupSize}`
    )

    if (!res.ok) alert('Something went wrong')

    const result = await res.json()

    navigate(
      `/tours/search?city=${location}&distance=${distance}&maxGroupSize=${maxGroupSize}`,
      { state: result.data }
    )
  }

  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      alignItems="center"
      sx={{
        padding: '0.5rem 1rem',
        borderRadius: '50px',
        boxShadow: 'rgba(17, 12, 46, 0.15) 0px 48px 100px 0px',
        width: 'fit-content',
        marginTop: '20px',
        ".MuiGrid-root": {
            paddingTop: '0'
        }
      }}
    >
      <Grid item xs={12} md={4}>
        <TextField
          label="Location"
          placeholder="Where are you going?"
          inputRef={locationRef}
          fullWidth
          sx={{
            '& input': {
              fontSize: '0.9rem',
              fontWeight: 500,
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <TextField
          label="Distance"
          placeholder="Distance k/m"
          type="number"
          inputRef={distanceRef}
          fullWidth
          sx={{
            '& input': {
              fontSize: '0.9rem',
              fontWeight: 500,
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <TextField
          label="Max People"
          placeholder="0"
          type="number"
          inputRef={maxGroupSizeRef}
          fullWidth
          sx={{
            '& input': {
              fontSize: '0.9rem',
              fontWeight: 500,
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12} md={2}>
        <IconButton
          color="primary"
          onClick={searchHandler}
          size="large"
          sx={{
            fontSize: '1.6rem',
            padding: '0.5rem',
            backgroundColor: '#faa935',
            color: '#fff',
            borderRadius: '10px 5px 10px 5px',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: '#ffb74d',
            },
          }}
        >
          <SearchIcon />
        </IconButton>
      </Grid>
    </Grid>
  )
}

export default SearchBar