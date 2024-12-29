import { TextField, Button, Typography, Grid, Card, CardContent, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { tokens } from 'src/locales/tokens';
import SearchMdIcon from '@untitled-ui/icons-react/build/esm/SearchMd';

export const AirlineBooking = () => {
  const { t } = useTranslation();

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <TextField
          label={t(tokens.flights.from)}
          sx={{ width: '30%' }}
        />
        <TextField
          label={t(tokens.flights.to)}
          sx={{ width: '30%' }}
        />
        <TextField
          label={t(tokens.flights.departure)}
          type="date"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label={t(tokens.flights.return)}
          type="date"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label={t(tokens.flights.passengers)}
          type="number"
          InputProps={{ inputProps: { min: 1 } }}
        />
        <Button
          variant="contained"
          color="primary"
        >
          <SearchMdIcon />
        </Button>
      </Box>
      <Typography
        variant="h6"
        gutterBottom
      >
        Available Flights
      </Typography>
      <Grid
        container
        spacing={3}
      >
        {[1, 2, 3].map((flight) => (
          <Grid
            item
            xs={12}
            key={flight}
          >
            <Card>
              <CardContent
                sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <Box>
                  <Typography variant="h6">Airline {flight}</Typography>
                  <Typography variant="body2">Departure: 10:00 AM</Typography>
                  <Typography variant="body2">Duration: 2h 30m</Typography>
                </Box>
                <Typography
                  variant="h6"
                  color="primary"
                >
                  $299
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                >
                  Select
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
