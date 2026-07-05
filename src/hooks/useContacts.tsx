import { useState, useEffect } from 'react';
import * as Contacts from 'expo-contacts';

export const useContacts = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers, Contacts.Fields.Emails],
        });
        setContacts(data);
      }
    })();
  }, []);

  return { contacts };
};