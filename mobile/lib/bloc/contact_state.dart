import 'package:equatable/equatable.dart';
import 'package:mobile/models/contact.dart';

abstract class ContactState extends Equatable {
  const ContactState();

  @override
  List<Object?> get props => [];
}

// State indicating that contacts are being loaded.
class ContactsLoading extends ContactState {}

// State when the contacts have been successfully loaded.
class ContactsLoaded extends ContactState {
  final List<Contact> contacts;

  const ContactsLoaded(this.contacts);

  @override
  List<Object?> get props => [contacts];
}

/// State when a specific contact has been loaded.
class ContactLoaded extends ContactState {
  final Contact contact;

  const ContactLoaded(this.contact);

  @override
  List<Object?> get props => [contact];
}

/// State for handling general errors.
class ContactsError extends ContactState {
  final String message;

  const ContactsError(this.message);
  @override
  List<Object?> get props => [message];
}

/// State indicating a successful contact operation (add/update/delete).
class ContactOperationSuccess extends ContactState {}

/// State indicating a failure during a contact operation.
class ContactOperationFailure extends ContactState {
  final String message;

  const ContactOperationFailure(this.message);

  @override
  List<Object?> get props => [message];
}
