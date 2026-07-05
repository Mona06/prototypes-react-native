import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { colors, typography, spacing, commonStyles } from '../theme';

export const ContactsList = ({ contacts, invitees, toggleInvitee, closeModal }) => {
  const renderContactItem = ({ item }) => (
    <TouchableOpacity onPress={() => toggleInvitee(item)} style={styles.contactItem}>
      <View style={styles.contactInfo}>
        <Text style={styles.contactName}>{item.name}</Text>
        {item.phoneNumbers && item.phoneNumbers[0] && (
          <Text style={styles.contactDetail}>{item.phoneNumbers[0].number}</Text>
        )}
        {item.emails && item.emails[0] && (
          <Text style={styles.contactDetail}>{item.emails[0].email}</Text>
        )}
      </View>
      {invitees.some(invitee => invitee.id === item.id) && (
        <Text style={styles.invitedTag}>Invited</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.modalContainer}>
      <Text style={styles.modalTitle}>Select Invitees</Text>
      <FlatList
        data={contacts}
        renderItem={renderContactItem}
        keyExtractor={item => item.id}
        style={styles.contactsList}
      />
      <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
        <Text style={styles.buttonText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    padding: spacing.medium,
    backgroundColor: colors.background,
  },
  modalTitle: {
    ...typography.title,
    marginBottom: spacing.medium,
    textAlign: 'center',
  },
  contactsList: {
    flex: 1,
  },
  contactItem: {
    ...commonStyles.card,
    marginBottom: spacing.small,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    ...typography.subtitle,
  },
  contactDetail: {
    ...typography.caption,
  },
  invitedTag: {
    ...typography.caption,
    color: colors.secondary,
    fontWeight: 'bold',
  },
  closeButton: {
    ...commonStyles.button,
    marginTop: spacing.medium,
    backgroundColor: colors.error,
  },
  buttonText: {
    ...commonStyles.buttonText,
  },
});