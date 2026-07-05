import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { colors, typography, spacing, commonStyles } from '../theme';

export const DateTimePickerGroup = ({ startDate, endDate, setStartDate, setEndDate }) => {
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  const handleDateChange = (setDate, setShow) => (event, selectedDate) => {
    setShow(false);
    if (selectedDate) setDate(selectedDate);
  };

  return (
    <View>
      <View style={styles.dateTimeContainer}>
        <TouchableOpacity style={styles.button} onPress={() => setShowStartDatePicker(true)}>
          <Text style={styles.buttonText}>Start Date</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setShowStartTimePicker(true)}>
          <Text style={styles.buttonText}>Start Time</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.dateText}>Start: {startDate.toLocaleString()}</Text>

      <View style={styles.dateTimeContainer}>
        <TouchableOpacity style={styles.button} onPress={() => setShowEndDatePicker(true)}>
          <Text style={styles.buttonText}>End Date</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setShowEndTimePicker(true)}>
          <Text style={styles.buttonText}>End Time</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.dateText}>End: {endDate.toLocaleString()}</Text>

      {showStartDatePicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          onChange={handleDateChange(setStartDate, setShowStartDatePicker)}
        />
      )}
      {showStartTimePicker && (
        <DateTimePicker
          value={startDate}
          mode="time"
          display="default"
          onChange={handleDateChange(setStartDate, setShowStartTimePicker)}
        />
      )}
      {showEndDatePicker && (
        <DateTimePicker
          value={endDate}
          mode="date"
          display="default"
          onChange={handleDateChange(setEndDate, setShowEndDatePicker)}
        />
      )}
      {showEndTimePicker && (
        <DateTimePicker
          value={endDate}
          mode="time"
          display="default"
          onChange={handleDateChange(setEndDate, setShowEndTimePicker)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.small,
  },
  button: {
    ...commonStyles.button,
    flex: 1,
    marginRight: spacing.small,
  },
  buttonText: {
    ...commonStyles.buttonText,
  },
  dateText: {
    ...typography.body,
    marginBottom: spacing.medium,
  },
});