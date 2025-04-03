import 'package:flutter_bloc/flutter_bloc.dart';
import '../services/contact_api.dart';
import 'contact_event.dart';
import 'contact_state.dart';

class ContactBloc extends Bloc<ContactEvent, ContactState> {
  final ContactApi contactAPI;

  ContactBloc({required this.contactAPI}) : super(ContactsLoading()) {
    on<LoadContacts>(_onLoadContacts);
    on<AddContact>(_onAddContact);
    on<UpdateContact>(_onUpdateContact);
    on<DeleteContact>(_onDeleteContact);
    on<GetContact>(_onGetContact);
  }

  Future<void> _onLoadContacts(
      LoadContacts event, Emitter<ContactState> emit) async {
    emit(ContactsLoading());
    try {
      final contacts = await contactAPI.getContacts();
      emit(ContactsLoaded(contacts));
    } catch (e) {
      emit(ContactsError(e.toString()));
    }
  }

  Future<void> _onAddContact(
      AddContact event, Emitter<ContactState> emit) async {
    try {
      await contactAPI.addContact(event.contact);
      emit(ContactOperationSuccess());
      add(LoadContacts());
    } catch (e) {
      emit(ContactOperationFailure(e.toString()));
    }
  }

  Future<void> _onUpdateContact(
      UpdateContact event, Emitter<ContactState> emit) async {
    try {
      if (event.contact.id != null) {
        await contactAPI.updateContact(event.contact.id!, event.contact);
        emit(ContactOperationSuccess());
        add(LoadContacts());
      } else {
        emit(const ContactOperationFailure('Contact ID is null'));
      }
    } catch (e) {
      emit(ContactOperationFailure(e.toString()));
    }
  }

  Future<void> _onDeleteContact(
      DeleteContact event, Emitter<ContactState> emit) async {
    try {
      await contactAPI.deleteContact(event.id);
      emit(ContactOperationSuccess());
      add(LoadContacts());
    } catch (e) {
      emit(ContactOperationFailure(e.toString()));
    }
  }

  Future<void> _onGetContact(
      GetContact event, Emitter<ContactState> emit) async {
    emit(ContactsLoading());
    try {
      final contact = await contactAPI.getContact(event.id);
      emit(ContactLoaded(contact));
    } catch (e) {
      emit(ContactsError(e.toString()));
    }
  }
}