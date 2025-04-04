import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'bloc/contact_bloc.dart';
import 'services/contact_api.dart';
import 'screens/contacts_screen.dart';
import 'utils/app_theme.dart';

void main() async {
  // HEre initialized first
  WidgetsFlutterBinding.ensureInitialized();

  try {
    // need to load env vars before others
    await dotenv.load(fileName: ".env");
    print("ENV loaded successfully");
  } catch (e) {
    print("Failed to load .env file: $e");
  }

  // Start theme service
  await AppTheme.init();

  runApp(const ContactManagerApp());
}

class ContactManagerApp extends StatefulWidget {
  const ContactManagerApp({
    super.key,
  });

  @override
  State<ContactManagerApp> createState() => _ContactManagerAppState();
}

class _ContactManagerAppState extends State<ContactManagerApp> {
  late bool _isDarkMode;
  final ContactApi _contactAPI = ContactApi(); // API service for contacts

  @override
  void initState() {
    super.initState();
    //get current theme
    _isDarkMode = AppTheme.isDarkMode;

    // Listen for theme changes
    AppTheme.themeChangeStream.listen((isDarkMode) {
      setState(() {
        _isDarkMode = isDarkMode;
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) => ContactBloc(contactAPI: _contactAPI),
      child: MaterialApp(
        title: 'Contact Manager',
        theme: AppTheme.lightTheme,
        darkTheme: AppTheme.darkTheme,
        themeMode: _isDarkMode ? ThemeMode.dark : ThemeMode.light,
        debugShowCheckedModeBanner: false,
        home: const ContactsScreen(),
      ),
    );
  }
}
