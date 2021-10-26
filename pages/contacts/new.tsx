import { useMutation } from "react-query";
import Content from "../../components/Content";
import PageHeaderWithActions from "../../components/PageHeaderWithActions";
import { createContact } from "../../util/api";

export default function NewContact() {
  const mutation = useMutation(createContact);

  return (
    <Content pageTitle="Neuer Kontakt">
      <PageHeaderWithActions pageTitle="Neuer Kontakt">
        <button>Cancel</button>
        <button className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Save & Create another
        </button>
        <button className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Save & Create
        </button>
      </PageHeaderWithActions>
    </Content>
  );
}

NewContact.auth = true;
