import { Contact } from "@prisma/client";
import { useRouter } from "next/dist/client/router";
import { useQuery } from "react-query";
import { getContact } from "../../util/api";
import Content from "../../components/Content";
export default function ContactDetailPage() {
  const router = useRouter();
  const id = router.query.id;

  const { data, isLoading } = useQuery<Contact>(`contact_${id}`, () =>
    getContact(id as string)
  );

  if (isLoading)
    return <Content pageTitle="Wird geladen...">Wird geladen...</Content>;
  return (
    <Content pageTitle={`${data?.firstName} ${data?.lastName || ""}`}>
      {`${data?.firstName} ${data?.lastName || ""}`}{" "}
    </Content>
  );
}

ContactDetailPage.auth = true;
