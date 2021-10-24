import { Contact } from "@prisma/client";
import { useRouter } from "next/dist/client/router";
import { useQuery } from "react-query";
import { getContact } from "../../util/api";

export default function ContactDetailPage() {
  const router = useRouter();
  const id = router.query.id;

  const { data, isLoading } = useQuery<Contact>(`contact_${id}`, () =>
    getContact(id as string)
  );

  if (isLoading) return <p>Loading...</p>;
  return <div>{data?.id}</div>;
}

ContactDetailPage.auth = true;
