import { TextField, Button, Typography, Grid, Card, CardContent, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import SearchMdIcon from '@untitled-ui/icons-react/build/esm/SearchMd';
import { tokens } from 'src/locales/tokens';

export const ShuttleBooking = () => {
  const { t } = useTranslation();

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <TextField
          label={t(tokens.airportTransfer.pickUpLocation)}
          sx={{ width: '30%' }}
        />
        <TextField
          label={t(tokens.airportTransfer.destinationAirport)}
          sx={{ width: '30%' }}
        />
        <TextField
          label={t(tokens.common.date)}
          type="date"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label={t(tokens.common.time)}
          type="time"
          InputLabelProps={{ shrink: true }}
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
        Available Shuttles
      </Typography>
      <Grid
        container
        spacing={3}
      >
        {[1, 2, 3].map((shuttle) => (
          <Grid
            item
            xs={12}
            key={shuttle}
          >
            <Card>
              <CardContent
                sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <Box>
                  <Typography variant="h6">Shuttle Service {shuttle}</Typography>
                  <Typography variant="body2">Pick-up: Central Station</Typography>
                  <Typography variant="body2">Departure: 8:00 AM</Typography>
                </Box>
                <Typography
                  variant="h6"
                  color="primary"
                >
                  $49
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                >
                  Book Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
