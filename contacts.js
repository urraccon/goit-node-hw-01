import { randomUUID } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

//  Elimină comentariile variabilei și atribuie-i valoarea
const contactsPath = `${__dirname}\\db\\contacts.json`;

// TODO: documentare fiecare funcție
async function listContacts() {
  try {
    const data = await readFile(contactsPath, { encoding: "utf8" });
    const contacts = JSON.parse(data);
    console.log("Results:");
    console.table(contacts);
  } catch (error) {
    console.log("The task completion has failed because:", error.message);
  }
}

async function getContactById(contactId) {
  try {
    const data = await readFile(contactsPath, { enconding: "utf8" });
    const contacts = JSON.parse(data);
    const searchedContact = contacts.filter(
      (contact) => contact.id === contactId
    );
    if (searchedContact.length === 0) {
      throw new Error("The contact was not found");
    }

    console.log("Result: ", searchedContact);
  } catch (error) {
    console.log("The task completion has failed because:", error.message);
  }
}

async function removeContact(contactId) {
  try {
    const data = await readFile(contactsPath, { enconding: "utf8" });
    const contacts = JSON.parse(data);
    const id = contacts.findIndex((contact) => contact.id === contactId);

    if (id === -1) {
      throw new Error("The contact was not found");
    }

    const [deletedContact] = contacts.splice(id, 1);
    console.log(`The contact ${deletedContact.name} has been deleted`);
    const stringifyedContacts = JSON.stringify(contacts);
    writeFile(contactsPath, stringifyedContacts);
  } catch (error) {
    console.log("The task completion has failed because:", error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await readFile(contactsPath, { encoding: "utf8" });
    const contacts = JSON.parse(data);
    const inputsValidation = name && email && phone;

    if (!inputsValidation) {
      throw new Error("Contact information is missing");
    }

    const newId = randomUUID();
    const newContact = {
      id: newId,
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    const stringifyedContacts = JSON.stringify(contacts);
    writeFile(contactsPath, stringifyedContacts);
    console.log(`The contact ${newContact.name} has been added`);
  } catch (error) {
    console.log("The task completion has failed because:", error.message);
  }
}

const operations = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

export default operations;
