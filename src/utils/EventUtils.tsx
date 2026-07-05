import * as Calendar from 'expo-calendar';

const getCalendarPermission = async () => {
  const { status } = await Calendar.requestCalendarPermissionsAsync();
  if (status !== 'granted') {
    throw new Error('Calendar permission not granted');
  }
};

const getDefaultCalendar = async () => {
  const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
  const defaultCalendar = calendars.find(
    (cal) => cal.source && cal.source.name === 'Default' && cal.accessLevel === Calendar.CalendarAccessLevel.OWNER
  );
  return defaultCalendar || calendars[0];
};

export const handleEventSubmit = async (eventData, existingCalendarEventId = null) => {
  try {
    await getCalendarPermission();

    const eventDetails = {
      title: eventData.name,
      startDate: eventData.startDate,
      endDate: eventData.endDate,
      location: eventData.location,
      notes: eventData.description,
    };

    let calendarEventId;
    if (existingCalendarEventId) {
      await Calendar.updateEventAsync(existingCalendarEventId, eventDetails);
      calendarEventId = existingCalendarEventId;
    } else {
      const calendar = await getDefaultCalendar();
      if (!calendar) {
        throw new Error('No suitable calendar found');
      }
      calendarEventId = await Calendar.createEventAsync(calendar.id, eventDetails);
    }

    return {
      success: true,
      message: existingCalendarEventId ? 'Event updated successfully!' : 'Event created successfully!',
      eventId: calendarEventId
    };
  } catch (error) {
    console.error('Failed to handle event in calendar:', error);
    return {
      success: false,
      message: `Failed to handle event in calendar: ${error.message}`
    };
  }
};