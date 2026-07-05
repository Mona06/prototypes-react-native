import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, typography, spacing, commonStyles } from '../theme';

export const InviteesList = ({ invitees, toggleInvitee }) => {
  if (invitees.length === 0) return null;

  return (
    <View style={styles.inviteesContainer}>
      <Text style={styles.inviteesHeader}>Current Invitees:</Text>
      {invitees.map(invitee => (
        <View key={invitee.id} style={styles.inviteeItem}>
          <Text style={styles.inviteeName}>{invitee.name}</Text>
          <TouchableOpacity onPress={() => toggleInvitee(invitee)}>
            <Text style={styles.removeInvitee}>Remove</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  inviteesContainer: {
    marginTop: spacing.medium,
  },
  inviteesHeader: {
    ...typography.subtitle,
    marginBottom: spacing.small,
  },
  inviteeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.small,
  },
  inviteeName: {
    ...typography.body,
  },
  removeInvitee: {
    ...typography.caption,
    color: colors.error,
  },
});