export default function MotoCard({ data }) {
    const { modelo_recomendado, ficha_tecnica } = data;
  
    return (
      <div className="bg-gray-100 p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">✅ Moto recomendada: {modelo_recomendado}</h2>
        <ul className="space-y-1 text-gray-700">
          <li><strong>Altura del asiento:</strong> {ficha_tecnica.altura_asiento} mm</li>
          <li><strong>Peso:</strong> {ficha_tecnica.peso} kg</li>
          <li><strong>Categoría:</strong> {ficha_tecnica.categoria}</li>
          <li><strong>Cilindrada:</strong> {ficha_tecnica.cilindrada} cc</li>
        </ul>
      </div>
    );
  }
  