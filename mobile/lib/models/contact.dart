class Contact {
  final String? id;
  final String name;
  final String email;
  final String phone;

  Contact({
    this.id,
    required this.name,
    required this.email,
    required this.phone
  });

  factory Contact.fromJson(Map<String, dynamic> json) {
    return Contact(
      id: json['_id'],
      name: json['name'], 
      email: json['email'], 
      phone: json['phone'],
      );
  }

  Map<String, dynamic> toJson() {
    return {
      'name' : name,
      'email': email,
      'phone': phone
    };
  }

  Contact copyWith({
    String? id,
    String? name,
    String? email,
    String? phone,
  }) {
    return Contact(
      id: id ?? this.id,
      name: name ?? this.name,
      email: email ?? this.email,
      phone: phone ?? this.phone,
    );
  }
}