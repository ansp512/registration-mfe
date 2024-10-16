import {
  Container,
  Typography,
  Button,
  Grid2,
  CardContent,
  CardActions,
  Card,
  Snackbar,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import * as ApiService from "../utils/apis";
import { getDateFromString, getTimeFromString } from "../utils/utils";

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
      .catch((err) => {
        setEventsList([]);
        setEventsLoading(false);
      });
  }, []);

  useEffect(() => {
    setEventsLoading(true);
    ApiService.getAllRegisteredEvents(Number(userId))
      .then((res) => {
        setRegisteredEventsList(res.data);
        setEventsLoading(false);
      })
      .catch((err) => {
        setRegisteredEventsList([]);
        setEventsLoading(false);
      });
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
            ApiService.getAllUnregisteredEvents(Number(userId))
              .then((res) => {
                setEventsList(res.data);
                setEventsLoading(false);
              })
              .catch((err) => {
                setEventsList([]);
                setEventsLoading(false);
              });
          })
          .catch((err) => {
            setRegisteredEventsList([]);
            setEventsLoading(false);
          });
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
            ApiService.getAllUnregisteredEvents(Number(userId))
              .then((res) => {
                setEventsList(res.data);
                setEventsLoading(false);
              })
              .catch((err) => {
                setEventsList([]);
                setEventsLoading(false);
              });
          })
          .catch((err) => {
            setRegisteredEventsList([]);
            setEventsLoading(false);
          });
      })
      .catch((err) => {
        setSnackbarMessage(err.response.data.detail);
        setSnackbarOpen(true);
        setEventsLoading(false);
      });
  };

  const cardStyle = {
    display: "flex",
    width: "20vw",
    height: "25vh",
    justifyContent: "space-between",
    flexDirection: "column" as const,
  };

  return (
    <>
      <Container maxWidth="xl" style={{ display: "flex" }}>
        <Container style={{ display: "flex", flexDirection: "column", marginTop: "24px" }}>
          <Typography variant="h5" gutterBottom>
            Events
          </Typography>
          <Grid2
            container
            columns={{ xs: 4, sm: 8, md: 12 }}
            padding={"24px"}
            minWidth={"70vw"}
            minHeight={"92vh"}
            borderRight={"4px solid black"}
          >
            {eventsList?.length ? (
              <>
                {eventsList.map((data, index) => (
                  <Grid2 key={index} size={{ xs: 2, sm: 4, md: 4, lg: 4 }}>
                    <Card color="primary" variant="outlined" style={cardStyle}>
                      <CardContent>
                        <Typography
                          gutterBottom
                          sx={{ color: "text.secondary", fontSize: 14 }}
                        >
                          {data.category}
                        </Typography>
                        <Typography
                          sx={{ color: "text.primary", fontSize: 16 }}
                        >
                          {data.name}
                        </Typography>
                        <Typography
                          sx={{ color: "text.secondary", fontSize: 10 }}
                        >
                          {getDateFromString(data.event_date)}
                        </Typography>
                        <Typography variant="body2">
                          {getTimeFromString(data.start_time) +
                            " - " +
                            getTimeFromString(data.end_time)}
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
                ))}{" "}
              </>
            ) : (
              <Typography variant="h6" gutterBottom>
                No events available
              </Typography>
            )}
          </Grid2>
        </Container>

        <Container style={{ display: "flex", flexDirection: "column", marginTop: "24px"}}>
          <Typography variant="h5" gutterBottom>
            Registered Events
          </Typography>
          <Grid2
            container
            columns={{ xs: 4, sm: 8, md: 12 }}
            padding={"24px"}
            minWidth={"20vw"}
            minHeight={"96vh"}
          >
            {registeredEventsList?.length ? (
              <>
                {registeredEventsList.map((data, index) => (
                  <Grid2 key={index} size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                    <Card color="primary" variant="outlined" style={cardStyle}>
                      <CardContent>
                        <Typography
                          gutterBottom
                          sx={{ color: "text.secondary", fontSize: 14 }}
                        >
                          {data.category}
                        </Typography>
                        <Typography
                          sx={{ color: "text.primary", fontSize: 16 }}
                        >
                          {data.name}
                        </Typography>
                        <Typography
                          sx={{ color: "text.secondary", fontSize: 10 }}
                        >
                          {getDateFromString(data.event_date)}
                        </Typography>
                        <Typography variant="body2">
                          {getTimeFromString(data.start_time) +
                            " - " +
                            getTimeFromString(data.end_time)}
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
              </>
            ) : (
              <Typography variant="h6" gutterBottom>
                No registered events
              </Typography>
            )}
          </Grid2>
        </Container>
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
