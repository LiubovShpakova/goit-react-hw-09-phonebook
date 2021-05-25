import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ContactForm from '../components/Form/Form';
import Filter from '../components/Filter/Filter';
import ContactList from '../components/ContactList/ContactList';
import Modal from '../components/Modal/modal';
import { fetchContacts } from '../redux/contacts/operations';
import { Container } from 'react-bootstrap';

export default function ContactsPage() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [editContact, setEditContact] = useState({});
  const dispatch = useDispatch();

  const handleOpenModal = contact => {
    setIsOpenModal(true);
    setEditContact(contact);
  };
  const handleCloseModal = () => {
    setEditContact(null);
  };
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm />
      <Filter />
      <ContactList onOpenModal={handleOpenModal} />
      {isOpenModal && editContact && (
        <Modal onClose={handleCloseModal} contactEdit={editContact} />
      )}
    </Container>
  );
}
