import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import EventsReg from "../index";
import * as ApiService from "../../utils/apis";
import { MemoryRouter } from "react-router-dom";

// Mocking the ApiService methods
jest.mock("../../utils/apis", () => ({
  getAllUnregisteredEvents: jest.fn(),
  getAllRegisteredEvents: jest.fn(),
  registerForEvent: jest.fn(),
  unregisterFromEvent: jest.fn(),
}));

describe("EventsReg Component", () => {
  const mockUserId = "123";

  beforeEach(() => {
    // Mocking URLSearchParams to return a specific userId
    jest.spyOn(URLSearchParams.prototype, "get").mockReturnValue(mockUserId);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders without crashing", () => {
    (ApiService.getAllUnregisteredEvents as jest.Mock).mockResolvedValueOnce({
      data: [
        {
          event_id: 1,
          name: "Event 1",
          category: "Category 1",
          event_date: "2024-03-18 12:30:00",
          start_time: "2024-03-18 12:30:00",
          end_time: "2024-03-18 12:30:00",
        },
      ],
    });
    (ApiService.getAllRegisteredEvents as jest.Mock).mockResolvedValueOnce({
      data: [
        {
          event_id: 2,
          name: "Event 2",
          category: "Category 2",
          event_date: "2024-03-18 12:30:00",
          start_time: "2024-03-18 12:30:00",
          end_time: "2024-03-18 12:30:00",
        },
      ],
    });

    render(
      <MemoryRouter>
        <EventsReg />
      </MemoryRouter>
    );
    expect(screen.getByText("No registered events")).toBeInTheDocument();
  });

  test("displays no events message when there are no events", async () => {
    (ApiService.getAllUnregisteredEvents as jest.Mock).mockResolvedValueOnce({
      data: [],
    });
    (ApiService.getAllRegisteredEvents as jest.Mock).mockResolvedValueOnce({
      data: [],
    });

    render(
      <MemoryRouter>
        <EventsReg />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/No events available/i)).toBeInTheDocument();
      expect(screen.getByText(/No registered events/i)).toBeInTheDocument();
    });
  });

  test("unregisters from an event and updates lists", async () => {
    const unregisteredEvents: any = [];
    const registeredEvents = [
      {
        event_id: 1,
        name: "Event 1",
        category: "Category 1",
        event_date: "2024-03-18 12:30:00",
        start_time: "2024-03-18 12:30:00",
        end_time: "2024-03-18 12:30:00",
      },
    ];

    (ApiService.getAllUnregisteredEvents as jest.Mock).mockResolvedValueOnce({
      data: unregisteredEvents,
    });
    (ApiService.getAllRegisteredEvents as jest.Mock).mockResolvedValueOnce({
      data: registeredEvents,
    });
    (ApiService.unregisterFromEvent as jest.Mock).mockResolvedValueOnce({
      data: { message: "Unregistered successfully" },
    });

    render(
      <MemoryRouter>
        <EventsReg />
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText(/Event 1/i));

    fireEvent.click(screen.getByText(/Remove/i));

    await waitFor(() => {
      expect(ApiService.unregisterFromEvent).toHaveBeenCalledWith(
        Number(mockUserId),
        1
      );
    });
  });
});
