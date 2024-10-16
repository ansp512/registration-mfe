import { LockOutlined } from "@mui/icons-material";
import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid2,
  Alert,
  CardContent,
  CardActions,
  Card,
  Snackbar,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import * as ApiService from "../utils/apis";

export interface ComponentProps {}

const EventsReg: React.FC<ComponentProps> = (props: ComponentProps) => {
  const [eventsList, setEventsList] = useState<any[]>([]);
  const [registeredEventsList, setRegisteredEventsList] = useState<any[]>([]);
  const location = useLocation();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackBarMessage, setSnackbarMessage] = useState("");
  const [eventsLoading, setEventsLoading] = useState(false);

  const userId = new URLSearchParams(location.search).get("userId");

  useEffect(() => {
    setEventsLoading(true);
    ApiService.getAllUnregisteredEvents(Number(userId))
      .then((res) => {
        setEventsList(res.data);
        setEventsLoading(false);
      })
      .catch((err) => setEventsLoading(false));
  }, []);

  useEffect(() => {
    setEventsLoading(true);
    ApiService.getAllRegisteredEvents(Number(userId))
      .then((res) => {
        setRegisteredEventsList(res.data);
        setEventsLoading(false);
      })
      .catch((err) => setEventsLoading(false));
  }, []);

  const handleRegister: any = (data: any) => {
    const payload = {
      user_id: Number(userId),
      event_ids: [data],
    };
    setEventsLoading(true);
    ApiService.registerForEvent(payload)
      .then((res) => {
        setSnackbarMessage(res.data.message);
        setSnackbarOpen(true);
        ApiService.getAllRegisteredEvents(Number(userId))
          .then((res) => {
            setRegisteredEventsList(res.data);
            setEventsLoading(false);
          })
          .catch((err) => setEventsLoading(false));
      })
      .catch((err) => {
        setSnackbarMessage(err.response.data.detail);
        setSnackbarOpen(true);
        setEventsLoading(false);
      });
  };

  const handleUnRegister: any = (data: any) => {
    setEventsLoading(true);
    ApiService.unregisterFromEvent(Number(userId), data)
      .then((res) => {
        setSnackbarMessage(res.data.message);
        setSnackbarOpen(true);
        ApiService.getAllRegisteredEvents(Number(userId))
      .then((res) => {
        setRegisteredEventsList(res.data);
        setEventsLoading(false);
      })
      .catch((err) => setEventsLoading(false));
      })
      .catch((err) => {
        setSnackbarMessage(err.response.data.detail);
        setSnackbarOpen(true);
        setEventsLoading(false);
      });
  };

  return (
    <>
      <Container maxWidth="xl" style={{display: "flex"}}>
        <Grid2
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          padding={"12px"}
        >
          {eventsList.map((data, index) => (
            <Grid2 key={index} size={{ xs: 2, sm: 4, md: 4, lg: 4 }}>
              <Card color="primary" variant="outlined">
                <CardContent>
                  <Typography
                    gutterBottom
                    sx={{ color: "text.secondary", fontSize: 14 }}
                  >
                    {data.category}
                  </Typography>
                  <Typography sx={{ color: "text.primary", fontSize: 20 }}>
                    {data.name}
                  </Typography>
                  <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                    {data.event_date}
                  </Typography>
                  <Typography variant="body2">
                    {data.start_time + " - " + data.end_time}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    disabled={eventsLoading}
                    onClick={() => {
                      handleRegister(data.event_id);
                    }}
                  >
                    Register
                  </Button>
                </CardActions>
              </Card>
            </Grid2>
          ))}
        </Grid2>
        <Grid2
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          padding={"12px"}
        >
          {registeredEventsList.map((data, index) => (
            <Grid2 key={index} size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
              <Card color="primary" variant="outlined">
                <CardContent>
                  <Typography
                    gutterBottom
                    sx={{ color: "text.secondary", fontSize: 14 }}
                  >
                    {data.category}
                  </Typography>
                  <Typography sx={{ color: "text.primary", fontSize: 20 }}>
                    {data.name}
                  </Typography>
                  <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                    {data.event_date}
                  </Typography>
                  <Typography variant="body2">
                    {data.start_time + " - " + data.end_time}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    style={{ color: "red" }}
                    disabled={eventsLoading}
                    onClick={() => {
                      handleUnRegister(data.event_id);
                    }}
                  >
                    Remove
                  </Button>
                </CardActions>
              </Card>
            </Grid2>
          ))}
        </Grid2>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={2000}
          onClose={() => setSnackbarOpen(false)}
          message={snackBarMessage}
        />
      </Container>
    </>
  );
};

export default EventsReg;
