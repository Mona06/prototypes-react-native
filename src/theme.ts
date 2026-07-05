import { StyleSheet } from 'react-native';

const colors = {
  primary: '#007AFF',
  secondary: '#5856D6',
  background: '#F2F2F7',
  white: '#FFFFFF',
  text: '#000000',
  subText: '#8E8E93',
  border: '#C7C7CC',
  error: '#FF3B30',
};

const typography = {
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  body: {
    fontSize: 14,
  },
  caption: {
    fontSize: 12,
    color: colors.subText,
  },
};

const spacing = {
  small: 8,
  medium: 16,
  large: 24,
};

const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.medium,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: spacing.medium,
    marginVertical: spacing.small,
    elevation: 2,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  button: {
    backgroundColor: colors.primary,
    padding: spacing.medium,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: spacing.small,
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
  },
});

export { colors, typography, spacing, commonStyles };