import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

export const shareICal = async (event) => {
  try {
    const iCalContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//YourApp//EN
METHOD:PUBLISH
BEGIN:VEVENT
UID:${event.id}
DTSTAMP:${new Date().toISOString().replace(/-|:|\.\d+/g, '')}
DTSTART:${new Date(event.startDate).toISOString().replace(/-|:|\.\d+/g, '')}
DTEND:${new Date(event.endDate).toISOString().replace(/-|:|\.\d+/g, '')}
SUMMARY:${event.name}
LOCATION:${event.location}
DESCRIPTION:${event.description}
END:VEVENT
END:VCALENDAR`;

    const fileUri = `${FileSystem.documentDirectory}${event.name}.ics`;
    await FileSystem.writeAsStringAsync(fileUri, iCalContent);

    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(fileUri);
    } else {
      throw new Error('Sharing is not available');
    }
  } catch (error) {
    console.error('Error sharing iCal:', error);
    throw error;
  }
};
