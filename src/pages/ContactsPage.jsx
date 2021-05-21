import ContactForm from '../components/Form/Form';
import Filter from '../components/Filter/Filter';
import ContactList from '../components/ContactList/ContactList';
import { Container } from 'react-bootstrap';

const ContactsPage = () => (
  <Container>
    <h1>Phonebook</h1>
    <ContactForm />
    <Filter />
    <ContactList />
  </Container>
);
export default ContactsPage;
