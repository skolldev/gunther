import { useMutation } from "react-query";
import { createContact } from "../../util/api";

export default function NewContact() {
  const mutation = useMutation(createContact);

  return (
    <div>
      <>
        {mutation.isError ? (
          <div>An error occurred: {(mutation.error as Error).message}</div>
        ) : null}

        {mutation.isSuccess ? <div>Todo added!</div> : null}

        <button
          onClick={() => {
            mutation.mutate({ firstName: "hui" });
          }}
        >
          {mutation.isLoading ? "Adding todo..." : "Create Todo"}
        </button>
      </>
    </div>
  );
}

NewContact.auth = true;
