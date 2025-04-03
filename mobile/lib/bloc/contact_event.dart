import 'package:equatable/equatable.dart';
import 'package:mobile/models/contact.dart';

abstract class ContactEvent extends Equatable {
  const ContactEvent();

  @override
  List<Object?> get props => [];
}

// Event to load all contacts.
class LoadContacts extends ContactEvent {}

// Event to add a new contact.
class AddContact extends ContactEvent {
  final Contact contact;

  const AddContact(this.contact);

  @override
  List<Object?> get props => [contact];
}

// Event to update an existing contact.
class UpdateContact extends ContactEvent {
  final Contact contact;

  const UpdateContact(this.contact);

  @override
  List<Object?> get props => [contact];
}

// Event to delete a contact.
class DeleteContact extends ContactEvent {
  final String id;

  const DeleteContact(this.id);

  @override
  List<Object?> get props => [id];
}

// Event to get a single contact
class GetContact extends ContactEvent {
  final String id;

  const GetContact(this.id);

  @override
  List<Object?> get props => [id];
}
