import { TableOrdenes, Header } from "@/components";

const Ordenes = () => {
  return (
    <div className="w-full ">
      <Header
        title="Ordenes"
        subtitle="Encontraras y visualisaras todas las ordenes del restaurante."
      />
      <div className="mt-5 bg-white rounded-lg drop-shadow-xl">
        <TableOrdenes />
      </div>
    </div>
  );
};

export default Ordenes;
