import Heading from "../../_components/heading";

export default function Page() {
  const currentDate = new Date().toLocaleDateString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  return <Heading title={currentDate}></Heading>;
}
