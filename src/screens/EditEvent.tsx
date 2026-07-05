import React, { useContext } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Alert } from 'react-native';
import { EventContext } from '../context/EventContext';
import { commonStyles } from '../theme';
import EventForm from '../components/EventForm';
import { handleEventSubmit } from '../utils/EventUtils';

const EditEvent = ({ route, navigation }) => {
  const { event } = route.params;
  const { updateEvent } = useContext(EventContext);

  const handleEditEvent = async (eventData) => {
    try {
      const result = await handleEventSubmit(eventData, eventData.calendarEventId);

      if (result.success) {
        updateEvent(eventData);
        Alert.alert('Success', result.message);
        navigation.goBack();
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Failed to update event:', error);
      Alert.alert('Error', 'Failed to update event in calendar.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <EventForm onSubmit={handleEditEvent} initialEvent={event} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...commonStyles.container,
    justifyContent: 'center',
  },
});

export default EditEvent;