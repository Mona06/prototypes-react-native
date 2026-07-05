import React from 'react';
import { View, Text, Button , StyleSheet, TouchableOpacity} from 'react-native';
import { colors, typography, spacing, commonStyles } from '../theme';

const EventCard = ({ event, onEdit, onDelete, onShare }) => {
return (
    <View style={[commonStyles.card, styles.card]}>
      <Text style={styles.title}>{event.name}</Text>
      <Text style={styles.description}>{event.description}</Text>
      <Text style={styles.location}>{event.location}</Text>
      <Text style={styles.date}>{`Start: ${event.startDate}`}</Text>
      <Text style={styles.date}>{`End: ${event.endDate}`}</Text>
      <View style={styles.buttonContainer}>
        {onEdit && (
          <TouchableOpacity style={styles.button} onPress={onEdit}>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
        )}
        {onDelete && (
          <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={onDelete}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        )}
        {onShare && (
          <TouchableOpacity style={styles.button} onPress={onShare}>
            <Text style={styles.buttonText}>Share</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.medium,
  },
  title: {
    ...typography.title,
    marginBottom: spacing.small,
  },
  description: {
    ...typography.body,
    marginBottom: spacing.small,
  },
  location: {
    ...typography.body,
    fontStyle: 'italic',
    marginBottom: spacing.small,
  },
  date: {
    ...typography.caption,
    marginBottom: spacing.small,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.small,
  },
  button: {
    ...commonStyles.button,
    flex: 1,
    marginHorizontal: spacing.small / 2,
  },
  buttonText: {
    ...commonStyles.buttonText,
  },
  deleteButton: {
    backgroundColor: colors.error,
  },
});

export default EventCard;
