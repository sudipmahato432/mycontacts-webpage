const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

// description: get all contacts
// route: GET api/contacts
// access: private

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});

// description: create contact
// route: POST api/contacts
// access: private

const createContact = asyncHandler(async (req, res) => {
  const { name, email, phNumber } = req.body;
  if (!name || !email || !phNumber) {
    res.status(400);
    throw new Error("All fields are mendatory!");
  }
  // console.log(req.body);
  const contact = await Contact.create({
    name,
    email,
    phNumber,
    user_id: req.user.id,
  });
  res.status(201).json(contact);
});

// description: get contact
// route: GET api/contacts/:id
// access: private

const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);
});

// description: update contact
// route: PUT api/contacts/:id
// access: private

const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error(
      "User don't have permission to update other user's contacts"
    );
  }

  const updatedcontact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(201).json(updatedcontact);
});

// description: delete contact
// route: DELETE api/contacts/:id
// access: private

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error(
      "User don't have permission to delete other user's contacts"
    );
  }

  await Contact.deleteOne({ _id: req.params.id });
  res.status(200).json(contact);
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
