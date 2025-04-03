import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';
import 'package:mobile/bloc/contact_bloc.dart';
import 'package:mobile/bloc/contact_event.dart';
import 'package:mobile/bloc/contact_state.dart';
import 'package:mobile/screens/contact_form_screen.dart';
import 'package:mobile/utils/app_theme.dart';
import 'package:mobile/widgets/contact_card.dart';

class ContactsScreen extends StatefulWidget {
  const ContactsScreen({super.key});

  @override
  State<ContactsScreen> createState() => _ContactsScreenState();
}

class _ContactsScreenState extends State<ContactsScreen> {
  bool isDarkMode = false;

  @override
  void initState() {
    super.initState();
    // Initialize with the current theme mode
    isDarkMode = AppTheme.isDarkMode;
    
    // Load contacts when screen initializes
    context.read<ContactBloc>().add(LoadContacts());
  }

  void _toggleTheme() {
    final newThemeMode = !isDarkMode;
    
    // Update local state
    setState(() {
      isDarkMode = newThemeMode;
    });
    
    // Save and broadcast the new theme
    AppTheme.setThemeMode(newThemeMode);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Contact Manager'),
        actions: [
          IconButton(
            icon: Icon(isDarkMode ? Icons.light_mode : Icons.dark_mode),
            onPressed: _toggleTheme,
          ),
        ],
      ),
      body: BlocConsumer<ContactBloc, ContactState>(
        listener: (context, state) {
          if (state is ContactOperationSuccess) {
            ScaffoldMessenger.of(context).showSnackBar(
              const SnackBar(
                content: Text('Operation successful'),
                backgroundColor: Colors.green,
              ),
            );
          } else if (state is ContactsError) {
            ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(
                content: Text(state.message),
                backgroundColor: Colors.red,
              ),
            );
          }
        },
        builder: (context, state) {
          if (state is ContactsLoading) {
            return const Center(
              child: SpinKitCircle(
                color: Colors.blue,
                size: 50.0,
              ),
            );
          } 
          else if (state is ContactsLoaded) {
            final contacts = state.contacts;
            
            if (contacts.isEmpty) {
              return Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Icon(
                      Icons.person_off,
                      size: 80,
                      color: Colors.grey,
                    ),
                    const SizedBox(height: 16),
                    const Text(
                      'No contacts found',
                      style: TextStyle(
                        fontSize: 20,
                        color: Colors.grey,
                      ),
                    ),
                    const SizedBox(height: 24),
                    ElevatedButton.icon(
                      onPressed: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => const ContactFormScreen(),
                          ),
                        ).then((_) {
                          context.read<ContactBloc>().add(LoadContacts());
                        });
                      },
                      icon: const Icon(Icons.add),
                      label: const Text('Add Contact'),
                    ),
                  ],
                ),
              );
            }
            
            return RefreshIndicator(
              onRefresh: () async {
                context.read<ContactBloc>().add(LoadContacts());
              },
              child: ListView.builder(
                itemCount: contacts.length,
                itemBuilder: (context, index) {
                  final contact = contacts[index];
                  return ContactCard(
                    contact: contact,
                    onEdit: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => ContactFormScreen(
                            contactId: contact.id,
                          ),
                        ),
                      ).then((_) {
                        context.read<ContactBloc>().add(LoadContacts());
                      });
                    },
                    onDelete: () {
                      showDialog(
                        context: context,
                        builder: (context) => AlertDialog(
                          title: const Text('Delete Contact'),
                          content: Text(
                            'Are you sure you want to delete ${contact.name}?',
                          ),
                          actions: [
                            TextButton(
                              onPressed: () => Navigator.pop(context),
                              child: const Text('Cancel'),
                            ),
                            TextButton(
                              onPressed: () {
                                Navigator.pop(context);
                                context.read<ContactBloc>().add(
                                      DeleteContact(contact.id!),
                                    );
                              },
                              child: const Text(
                                'Delete',
                                style: TextStyle(color: Colors.red),
                              ),
                            ),
                          ],
                        ),
                      );
                    },
                  );
                },
              ),
            );
          } else if (state is ContactsError) {
            return Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Icon(
                    Icons.error_outline,
                    size: 60,
                    color: Colors.red,
                  ),
                  const SizedBox(height: 16),
                  Text(
                    'Error: ${state.message}',
                    style: const TextStyle(fontSize: 16),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 24),
                  ElevatedButton.icon(
                    onPressed: () {
                      context.read<ContactBloc>().add(LoadContacts());
                    },
                    icon: const Icon(Icons.refresh),
                    label: const Text('Retry'),
                  ),
                ],
              ),
            );
          }
          
          return const SizedBox.shrink();
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => const ContactFormScreen(),
            ),
          ).then((_) {
            context.read<ContactBloc>().add(LoadContacts());
          });
        },
        child: const Icon(Icons.add),
      ),
    );
  }
}