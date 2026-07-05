import React, { useContext } from 'react';
import { View, FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { EventContext } from '../context/EventContext';
import { shareICal } from '../utils/ICalUtils';
import EventCard from '../components/EventCard';
import * as Calendar from 'expo-calendar';
import { commonStyles } from '../theme';

const MyEvents = () => {
  const { events, deleteEvent } = useContext(EventContext);
  const navigation = useNavigation();

const handleEditEvent = (event) => {
  const eventWithSerializedDates = {
    ...event,
    startDate: event.startDate?.toISOString(),
    endDate: event.endDate?.toISOString(),
  };

  navigation.navigate('EditEvent', { event: eventWithSerializedDates });
};


const handleDeleteEvent = async (event) => {
    Alert.alert(
      'Delete Event',
      'Are you sure you want to delete this event?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: async () => {
              try {

                         if (event.calendarEventId) {
                           await Calendar.deleteEventAsync(event.calendarEventId);
                         }


                         deleteEvent(event.id);

                         Alert.alert('Success', 'Event deleted successfully');
                       } catch (error) {
                         Alert.alert('Error', 'Failed to delete event from calendar');
                       }
          },
        },
      ]
    );
  };

   const handleShareEvent = async (event) => {
      try {
        await shareICal(event);
      } catch (error) {
        Alert.alert('Error', 'Failed to share event');
      }
    };

 return (
     <View style={commonStyles.container}>
       <FlatList
         data={events}
         keyExtractor={(item) => item.id}
         renderItem={({ item }) => (
           <EventCard
             event={item}
             onEdit={() => handleEditEvent(item)}
             onDelete={() => handleDeleteEvent(item)}
             onShare={() => handleShareEvent(item)}
           />
         )}
       />
     </View>
   );
 };

export default MyEvents;
