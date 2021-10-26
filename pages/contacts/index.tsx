import Content from "../../components/Content";
import Link from "next/link";
import { useQuery } from "react-query";
import { Contact } from "@prisma/client";
import InitialsPlaceholder from "../../components/InitialsPlaceholder";
import { getAllContacts } from "../../util/api";
import PageHeaderWithActions from "../../components/PageHeaderWithActions";

export default function ContactList(props: any) {
  const { data, isLoading } = useQuery<Contact[]>("contacts", getAllContacts);

  return (
    <Content pageTitle="Kontakte">
      <PageHeaderWithActions pageTitle="Kontakte">
        <Link href="contacts/new">
          <a className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Create new contact
          </a>
        </Link>
      </PageHeaderWithActions>
      {isLoading && (
        <div className="h-full flex justify-center items-center font-extrabold text-6xl">
          Loading...
        </div>
      )}
      {!isLoading && (
        <div className="flex flex-col flex-1 py-6 overflow-y-hidden">
          <div className="overflow-x-auto flex flex-1">
            <div className="py-1 align-middle min-w-full sm:px-6 lg:px-8 flex flex-1">
              <div className="shadow overflow-y-auto border-b border-gray-200 sm:rounded-lg flex-1">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Birthday
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">View</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {data?.map((contact) => (
                      <tr key={contact.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <InitialsPlaceholder />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {contact.firstName} {contact.lastName}
                              </div>
                              <div className="text-sm text-gray-500">
                                {contact.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {contact.birthday}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link href={`contacts/${contact.id}`}>
                            <a className="text-indigo-600 hover:text-indigo-900">
                              View
                            </a>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </Content>
  );
}

ContactList.auth = true;
