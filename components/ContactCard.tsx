import { MailIcon, PhoneIcon } from "@heroicons/react/solid";
import { Contact } from "@prisma/client";
import React from "react";
import InitialsPlaceholder from "./InitialsPlaceholder";

type ContactCardProps = {
  contact: Contact;
  [key: string]: any;
};

export default function ContactCard({ contact, ...rest }: ContactCardProps) {
  return (
    <li className="flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200">
      <div className="flex-1 flex flex-col p-8">
        <InitialsPlaceholder />
        <h3 className="mt-6 text-gray-900 text-sm font-medium">
          {contact.firstName}&nbsp;{contact.lastName}
        </h3>
        <dl className="mt-1 flex-grow flex flex-col justify-between">
          <dt className="sr-only">Title</dt>
          <dd className="text-gray-500 text-sm">Placeholder</dd>
          <dt className="sr-only">Role</dt>
          <dd className="mt-3">
            <span className="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">
              Placeholder
            </span>
          </dd>
        </dl>
      </div>
      <div>
        <div className="-mt-px flex divide-x divide-gray-200">
          <div className="w-0 flex-1 flex">
            <a
              href={`mailto:${contact.email}`}
              className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
            >
              <MailIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
              <span className="ml-3">Email</span>
            </a>
          </div>
          <div className="-ml-px w-0 flex-1 flex">
            <a
              href={`tel:${contact.email}`}
              className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
            >
              <PhoneIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
              <span className="ml-3">Call</span>
            </a>
          </div>
        </div>
      </div>
    </li>
  );
}
