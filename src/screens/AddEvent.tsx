import React, { useContext } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import EventForm from '../components/EventForm';
import { EventContext } from '../context/EventContext';
import { commonStyles } from '../theme';
import { handleEventSubmit } from '../utils/EventUtils';

const AddEvent = () => {
  const { addEvent } = useContext(EventContext);
  const navigation = useNavigation();

  const handleAddEvent = async (eventData) => {
    try {
      const result = await handleEventSubmit(eventData);

      if (result.success) {
        const newEvent = {
          ...eventData,
          id: Date.now().toString(),
          calendarEventId: result.eventId,
        };

        addEvent(newEvent);
        Alert.alert('Success', result.message);
        navigation.navigate('Discover');
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Failed to add event:', error);
      Alert.alert('Error', 'Failed to add event to calendar.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <EventForm onSubmit={handleAddEvent} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...commonStyles.container,
    justifyContent: 'center',
  },
});

export default AddEvent;