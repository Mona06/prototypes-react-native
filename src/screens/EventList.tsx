import React, { useContext } from 'react';
import { View, FlatList, Button } from 'react-native';
import { EventContext } from '../context/EventContext';
import EventCard from '../components/EventCard';
import { useNavigation } from '@react-navigation/native';
import { commonStyles } from '../theme';

const EventList = () => {
  const { events } = useContext(EventContext);
  const navigation = useNavigation();

 return (
    <View style={commonStyles.container}>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EventCard event={item} />
        )}
      />
    </View>
  );
};

export default EventList;

