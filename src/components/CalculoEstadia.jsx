import { useState } from "react";

export default function CalculoEstadia() {
  const [fechaIng, setFechaIng] = useState("");
  const [fechaEg, setFechaEg] = useState("");
  const [valorDiario, setValorDiario] = useState(15000);

  const calcularEstadia = (fechaIng, fechaEg) => {
    const f1 = new Date(fechaIng);
    const f2 = new Date(fechaEg);
    const diffTime = f2 - f1;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const diasEstadia =
    fechaIng && fechaEg ? calcularEstadia(fechaIng, fechaEg) : null;

  const mostrarFecha = (fecha) => {
    if (!fecha) return "";
    const [anio, mes, dia] = fecha.split("-");
    return `${dia}/${mes}/${anio}`;
  };

  const totalEstadia =
    diasEstadia && diasEstadia >= 0 ? valorDiario * diasEstadia : 0;
  const esValido = diasEstadia && diasEstadia >= 0;

  const resetForm = () => {
    setFechaIng("");
    setFechaEg("");
    setValorDiario(15000);
  };

  return (
    <div className="min-h-screen bg-gradient-soft py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-beige-600 to-orange-600 bg-clip-text text-transparent mb-4">
            💰 Calculador de Estancia
          </h1>
          <p className="text-xl text-warm-700">
            Calcula el costo total de hospedaje
          </p>
        </div>

        {/* Card del calculador */}
        <div className="bg-white rounded-3xl shadow-elevated overflow-hidden backdrop-blur-sm bg-white/95 p-8">
          <form className="space-y-8">
            {/* Fechas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Fecha de Ingreso */}
              <div>
                <label
                  htmlFor="fecha-ingreso"
                  className="block text-sm font-bold text-beige-700 mb-3"
                >
                  📅 Fecha de Ingreso
                </label>
                <input
                  type="date"
                  id="fecha-ingreso"
                  value={fechaIng}
                  onChange={(e) => setFechaIng(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-warm-200 bg-warm-50 focus:border-beige-500 focus:bg-white transition-all duration-300 font-medium"
                />
                {fechaIng && (
                  <p className="text-beige-600 font-semibold mt-3 flex items-center gap-2">
                    ✓ {mostrarFecha(fechaIng)}
                  </p>
                )}
              </div>

              {/* Fecha de Egreso */}
              <div>
                <label
                  htmlFor="fecha-egreso"
                  className="block text-sm font-bold text-beige-700 mb-3"
                >
                  📅 Fecha de Egreso
                </label>
                <input
                  type="date"
                  id="fecha-egreso"
                  value={fechaEg}
                  onChange={(e) => setFechaEg(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-warm-200 bg-warm-50 focus:border-beige-500 focus:bg-white transition-all duration-300 font-medium"
                />
                {fechaEg && (
                  <p className="text-beige-600 font-semibold mt-3 flex items-center gap-2">
                    ✓ {mostrarFecha(fechaEg)}
                  </p>
                )}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t-2 border-warm-200"></div>

            {/* Valor diario */}
            <div>
              <label
                htmlFor="valor-diario"
                className="block text-sm font-bold text-beige-700 mb-3"
              >
                💵 Valor Diario
              </label>
              <div className="relative">
                <span className="absolute left-4 top-3 text-2xl">$</span>
                <input
                  type="number"
                  id="valor-diario"
                  value={valorDiario}
                  onChange={(e) => setValorDiario(Number(e.target.value))}
                  placeholder="Valor diario"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-warm-200 bg-warm-50 focus:border-beige-500 focus:bg-white transition-all duration-300 font-medium"
                  min="0"
                />
              </div>
            </div>

            {/* Resultados */}
            {diasEstadia !== null && (
              <div className="space-y-4 bg-gradient-soft p-6 rounded-2xl animate-slide-up">
                <div className="flex justify-between items-center p-4 bg-white rounded-xl">
                  <span className="font-bold text-beige-700">
                    Días de Estancia:
                  </span>
                  <span
                    className={`text-2xl font-bold ${
                      diasEstadia >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {diasEstadia >= 0
                      ? `${diasEstadia} día(s)`
                      : "❌ Fechas inválidas"}
                  </span>
                </div>

                {esValido && (
                  <>
                    <div className="flex justify-between items-center p-4 bg-white rounded-xl">
                      <span className="font-bold text-beige-700">
                        Valor Diario:
                      </span>
                      <span className="text-xl font-bold text-orange-600">
                        ${valorDiario.toLocaleString("es-AR")}
                      </span>
                    </div>

                    <div className="flex justify-between items-center p-6 bg-gradient-button rounded-xl text-white">
                      <span className="font-bold text-lg">Total a Pagar:</span>
                      <span className="text-3xl font-bold">
                        ${totalEstadia.toLocaleString("es-AR")}
                      </span>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Botones */}
            <div className="flex gap-4 pt-4">
              <button
                type="reset"
                onClick={resetForm}
                className="flex-1 bg-warm-200 hover:bg-warm-300 text-warm-900 font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                ↻ Limpiar
              </button>
            </div>
          </form>
        </div>

        {/* Info card */}
        <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
          <p className="text-yellow-800 font-semibold">
            💡 Tip: Selecciona las fechas de ingreso y egreso para calcular
            automáticamente el costo total del hospedaje.
          </p>
        </div>
      </div>
    </div>
  );
}
