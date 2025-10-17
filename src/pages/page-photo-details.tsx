import { useParams } from "react-router";
import Text from "../components/text";

export default function PagePhotoDetails() {
  const { id } = useParams();
  return (
    <>
      <Text variant="heading-medium">Página Detalhe da Foto</Text>
      <hr />
      <Text>Id da foto é {id}</Text>
    </>
  );
}
