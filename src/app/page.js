"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import MotoCard from "./components/MotoCard";

export default function Home() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      estatura: "",
      peso: "",
      genero: "hombre",
      experiencia: "principiante",
      preferencia_uso: "ciudad",
      preferencia_estilo: "scooter"
    }
  });
  const [recomendacion, setRecomendacion] = useState(null);
  const [error, setError] = useState(null);

  const onSubmit = async (data) => {
    try {
      setError(null);
      const res = await axios.post("https://moto-match-backend.onrender.com/recomendar", data);
      setRecomendacion(res.data);
    } catch (err) {
      console.error("Error al obtener recomendación:", err);
      setError("Hubo un problema al obtener la recomendación. Por favor, intenta de nuevo.");
    }
  };

  return (
    <main className="max-w-xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">🧠 Recomendador de Motos</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-6 rounded-xl shadow-md">
        <div>
          <label className="block mb-1">Estatura (cm):</label>
          <input 
            type="number" 
            {...register("estatura", { 
              required: "La estatura es requerida",
              min: { value: 100, message: "La estatura debe ser al menos 100cm" },
              max: { value: 250, message: "La estatura debe ser menor a 250cm" }
            })} 
            className="input w-full p-2 border rounded" 
          />
          {errors.estatura && <p className="text-red-500 text-sm mt-1">{errors.estatura.message}</p>}
        </div>

        <div>
          <label className="block mb-1">Peso (kg):</label>
          <input 
            type="number" 
            {...register("peso", { 
              required: "El peso es requerido",
              min: { value: 30, message: "El peso debe ser al menos 30kg" },
              max: { value: 200, message: "El peso debe ser menor a 200kg" }
            })} 
            className="input w-full p-2 border rounded" 
          />
          {errors.peso && <p className="text-red-500 text-sm mt-1">{errors.peso.message}</p>}
        </div>

        <div>
          <label className="block mb-1">Género:</label>
          <select {...register("genero")} className="input w-full p-2 border rounded">
            <option value="hombre">Hombre</option>
            <option value="mujer">Mujer</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Experiencia:</label>
          <select {...register("experiencia")} className="input w-full p-2 border rounded">
            <option value="principiante">Principiante</option>
            <option value="media">Media</option>
            <option value="avanzada">Avanzada</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Uso preferido:</label>
          <select {...register("preferencia_uso")} className="input w-full p-2 border rounded">
            <option value="ciudad">Ciudad</option>
            <option value="ruta">Ruta</option>
            <option value="off-road">Off-road</option>
            <option value="mixto">Mixto</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Estilo preferido:</label>
          <select {...register("preferencia_estilo")} className="input w-full p-2 border rounded">
            <option value="scooter">Scooter</option>
            <option value="urbana">Urbana</option>
            <option value="deportiva">Deportiva</option>
            <option value="offroad">Offroad</option>
            <option value="touring">Touring</option>
          </select>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700 transition"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Procesando..." : "Ver recomendación"}
        </button>
      </form>

      {recomendacion && (
        <div className="mt-8">
          <MotoCard data={recomendacion} />
        </div>
      )}
    </main>
  );
}
