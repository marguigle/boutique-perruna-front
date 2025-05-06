import { useState } from "react";

export default function CalculoEstadia() {
  const [fechaIng, setFechaIng] = useState("");
  const [fechaEg, setFechaEg] = useState("");
  const [valorDiario, setValorDiario] = useState(0);

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
    return `${dia} / ${mes} / ${anio}`;
  };

  return (
    <div>
      <h2>Cálculo de Estadía</h2>

      <label htmlFor="fecha-ingreso" className="mr-1.5">
        {" "}
        <h5>
          {" "}
          <span> INGRESO</span>
        </h5>{" "}
      </label>

      <input
        type="date"
        id="fecha-ingreso"
        value={fechaIng}
        onChange={(e) => setFechaIng(e.target.value)}
      />
      <h4>{fechaIng && `Día de ingreso:  ${mostrarFecha(fechaIng)}`}</h4>

      <label htmlFor="fecha-egreso">
        <h5>EGRESO</h5>{" "}
      </label>
      <input
        type="date"
        id="fecha-egreso"
        value={fechaEg}
        onChange={(e) => setFechaEg(e.target.value)}
      />
      <h4>{fechaEg && `Día de egreso:  ${mostrarFecha(fechaEg)}`}</h4>

      <h2>
        {diasEstadia !== null &&
          (diasEstadia >= 0
            ? `Estadía:  ${diasEstadia} día(s)`
            : "La fecha de egreso no puede ser anterior a la de ingreso")}
      </h2>

      <input
        type="number"
        onChange={(e) => setValorDiario(e.target.value)}
        placeholder="actualizar valor del dia"
        defaultValue={15000}
        name="valor-del-dia"
      ></input>
      <h3> Valor diario: $ {valorDiario}</h3>
      <h3> Valor total: $ {valorDiario * diasEstadia}</h3>
      <input type="reset" value="Restablecer" />
    </div>
  );
}
