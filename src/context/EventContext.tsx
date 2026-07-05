import React, { createContext, useState } from 'react';

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);

  const addEvent = (event) => {
    setEvents([...events, event]);
  };

  const deleteEvent = (id) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
  };


  const updateEvent = (updatedEvent) => {
     setEvents((prevEvents) =>
         prevEvents.map((event) => (event.id === updatedEvent.id ? updatedEvent : event))
       );
  };


  return (
    <EventContext.Provider
      value={{ events, addEvent, deleteEvent, updateEvent }}
    >
      {children}
    </EventContext.Provider>
  );
};

