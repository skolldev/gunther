import { Contact } from "@prisma/client";
import axios from "axios";

const instance = axios.create({ baseURL: process.env.NEXT_PUBLIC_BASE_URL });

export const getAllContacts = () =>
  instance.get<Contact[]>("/api/contacts").then((res) => res.data);

export const createContact = (data: Pick<Contact, "firstName">) =>
  instance.post<Contact>("/api/contacts", data).then((res) => res.data);

export const getContact = (id: string) =>
  instance.get<Contact>(`/api/contacts/${id}`).then((res) => res.data);

export const deleteContact = (id: string) =>
  instance.delete(`/api/contacts/${id}`);
