const Contact = require('../models/contactModel');

// @desc Get all contacts
// @route GET /api/contacts
// @access Public
const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find({});
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc   Create a contact
// @route POST /api/contacts
// @access Public
const createContact = async (req, res) => {
    try {
        const { name, email, phone } = req.body;

        // Simple validation
        if (!name || !email || !phone) {
            return res.status(400).json({
                message: 'Please provide name, email and phone'
            });
        }

        // Check if contact already exists
        const contactExists = await Contact.findOne({
            email
        });
        if (contactExists) {
            return res.status(400).json({ message: 'Contact already exists' });
        }

        // Create contact
        const contact = await Contact.create({
            name,
            email,
            phone,
        });

        res.status(201).json(contact);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// @desc Get a contact
// @route GET /api/contacts/:id
// @access Public
const getContact = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({
                message: 'Contact not found'
            });
        }
        res.status(200).json(contact);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// @desc Update a contact
// @route PUT /api/contact/:id
// @access Public
const updateContact = async (req, res) => {
    try {
        const { name, email, phone } = req.body;

        // Find contact
        let contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({
                message: 'Contact not found'
            });
        }

        // Update contact
        contact = await Contact.findByIdAndUpdate(
            req.params.id,
            { name, email, phone },
            { new: true, runValidators: true }
        );

        res.status(200).json(contact);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc Delete a contact
// @route DELETE /api/contacts/:id
// @access Public

const deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({
                message: 'Contact not found'
            });
        }
        await Contact.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Contact removed' });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    getContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact,
};