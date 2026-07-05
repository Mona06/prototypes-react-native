import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { DateTimePickerGroup } from './DateTimePickerGroup';
import { InviteesList } from './InviteesList';
import { ContactsList } from './ContactsList';
import { colors, typography, spacing, commonStyles } from '../theme';
import { useContacts } from '../hooks/useContacts';

const EventForm = ({ onSubmit, initialEvent = null }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [invitees, setInvitees] = useState([]);
  const [showContactList, setShowContactList] = useState(false);

  const { contacts } = useContacts();
  const scrollViewRef = useRef(null);

  useEffect(() => {
    if (initialEvent) {
      setName(initialEvent.name);
      setDescription(initialEvent.description);
      setLocation(initialEvent.location);
      setStartDate(new Date(initialEvent.startDate));
      setEndDate(new Date(initialEvent.endDate));
      setInvitees(initialEvent.invitees || []);
    }
  }, [initialEvent]);

  const handleSubmit = () => {
    if (!name || !startDate || !endDate || !location) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    const eventData = {
      name,
      description,
      location,
      startDate,
      endDate,
      invitees,
    };

    if (initialEvent) {
      eventData.id = initialEvent.id;
      eventData.calendarEventId = initialEvent.calendarEventId;
    }

    onSubmit(eventData);

     setName('');
      setDescription('');
      setLocation('');
      setStartDate(new Date());
      setEndDate(new Date());
      setInvitees([]);
  };

  const toggleInvitee = (contact) => {
    setInvitees(currentInvitees => {
      if (currentInvitees.some(invitee => invitee.id === contact.id)) {
        return currentInvitees.filter(invitee => invitee.id !== contact.id);
      } else {
        return [...currentInvitees, contact];
      }
    });
  };

  const closeModal = () => {
    setShowContactList(false);
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView ref={scrollViewRef} contentContainerStyle={styles.scrollViewContent} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>{initialEvent ? 'Edit Event' : 'Create Event'}</Text>
        <TextInput
          placeholder="Event Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          placeholder="Event Description"
          value={description}
          onChangeText={setDescription}
          style={styles.input}
          multiline
        />
        <TextInput
          placeholder="Event Location"
          value={location}
          onChangeText={setLocation}
          style={styles.input}
        />
        <DateTimePickerGroup
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />

        <TouchableOpacity style={styles.button} onPress={() => setShowContactList(true)}>
          <Text style={styles.buttonText}>{initialEvent ? 'Edit Invitees' : 'Add Invitees'}</Text>
        </TouchableOpacity>

        <InviteesList invitees={invitees} toggleInvitee={toggleInvitee} />

        <TouchableOpacity style={[styles.button, styles.submitButton]} onPress={handleSubmit}>
          <Text style={styles.buttonText}>{initialEvent ? 'Update Event' : 'Create Event'}</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={false}
        visible={showContactList}
        onRequestClose={closeModal}
      >
        <ContactsList
          contacts={contacts}
          invitees={invitees}
          toggleInvitee={toggleInvitee}
          closeModal={closeModal}
        />
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...commonStyles.container,
    paddingBottom: spacing.large,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  title: {
    ...typography.title,
    marginBottom: spacing.medium,
    textAlign: 'center',
  },
  input: {
    ...commonStyles.card,
    marginBottom: spacing.medium,
  },
  button: {
    ...commonStyles.button,
  },
  buttonText: {
    ...commonStyles.buttonText,
  },
  submitButton: {
    backgroundColor: colors.secondary,
    marginTop: spacing.medium,
  },
});

export default EventForm;