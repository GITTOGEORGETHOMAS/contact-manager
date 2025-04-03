class Validators {
  // Validates name input field
  static String? validateName(String? value) {
    if (value == null || value.trim().isEmpty) {
      return 'Please enter a name';
    }
    return null;
  }

  // Validates email input field
  static String? validateEmail(String? value) {
    if (value == null || value.trim().isEmpty) {
      return 'Please enter an email';
    }

      final emailRegExp = RegExp(
      r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$',
    );

    if (!emailRegExp.hasMatch(value)) {
      return 'Please enter a valid email';
    }
    return null;
  }

  //  Validates phone number input field
    static String? validatePhone(String? value) {
    if (value == null || value.trim().isEmpty) {
      return 'Please enter a phone number';
    }

    final phoneRegExp = RegExp(r'^\d{10,}$');

    if (!phoneRegExp.hasMatch(value)) {
      return 'Phone number must be at least 10 digits and contain only numbers';
    }

    return null;
  }
}