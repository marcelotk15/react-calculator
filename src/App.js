import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const MAX_VISOR_CHAR = 8;

  const [total, setTotal] = useState("");
  const [accumulator, setAccumulator] = useState("");
  const [saveAction, setSaveAction] = useState(null);
  const [count, setCount] = useState([]);

  const handleNumber = (e) => {
    e.preventDefault();

    if (total.length < MAX_VISOR_CHAR) setTotal(total + e.target.textContent);
  };

  const handleAction = (e) => {
    e.preventDefault();

    if (total.length === 0) return;

    setAccumulator(`${accumulator} ${total} ${e.target.textContent}`);
    setTotal("");

    setCount([...count, Number(total), e.target.textContent]);
  };

  const handleComma = (e) => {
    e.preventDefault();

    if (!total.includes(".")) setTotal(total + ".");
  };

  const handleResult = async (e) => {
    e.preventDefault();

    if (accumulator[accumulator.length - 1] === "=" && total.length > 0)
      setTotal(
        ProcessAction(Number(total), Number(total), saveAction)
          .toString()
          .substring(0, MAX_VISOR_CHAR)
      );

    if (count.length === 0) return;

    setCount([...count, Number(total)]);

    setAccumulator(`${accumulator} ${total} =`);

    // await ProcessResult();
  };

  const ProcessResult = () => {
    let current = null;
    let action = null;

    let total = 0;

    if (isNaN(count[count.length - 1])) count.pop();

    count.forEach((n) => {
      if (!isNaN(n)) {
        if (current === null) {
          current = n;
        } else {
          total += ProcessAction(current, n, action);
          current = null;
        }
      } else {
        action = n;
        setSaveAction(n);
      }
    });

    if (current !== null) total = ProcessAction(total, current, action);

    if (total.toString().length > MAX_VISOR_CHAR) return setTotal("ERR");

    setTotal(total.toString().substring(0, MAX_VISOR_CHAR));

    setCount([]);
  };

  const ProcessAction = (n1, n2, action) => {
    switch (action) {
      case "+":
        return n1 + n2;
      case "-":
        return n1 - n2;
      case "x":
        return n1 * n2;
      case "/":
        return n1 / n2;
      default:
        return;
    }
  };

  const handleCleanCurrentEntry = (e) => {
    e.preventDefault();

    setTotal("");
  };

  const handleCleanAll = (e) => {
    e.preventDefault();

    setTotal("");
    setAccumulator("");

    setCount([]);
  };

  const handlePercentage = (e) => {
    e.preventDefault();

    if (total !== "") setTotal(Number(total) / 100);
  };

  const handleSign = (e) => {
    e.preventDefault();

    setTotal((Number(total) * -1).toString());
  };

  useEffect(() => {
    if (!isNaN(count[count.length - 1])) ProcessResult();
  }, [ProcessResult, count]);

  return (
    <>
      <div className="calculator">
        <div className="visor">
          <div className="accumulator">{accumulator}</div>

          <div className="total">{total}</div>
        </div>

        <div className="numeric action" onClick={handleCleanAll}>
          C
        </div>

        <div className="numeric action" onClick={handleCleanCurrentEntry}>
          CE
        </div>

        <div className="numeric action" onClick={handlePercentage}>
          %
        </div>

        <div className="numeric action" onClick={handleAction}>
          /
        </div>

        <div className="numeric" onClick={handleNumber}>
          7
        </div>

        <div className="numeric" onClick={handleNumber}>
          8
        </div>

        <div className="numeric" onClick={handleNumber}>
          9
        </div>

        <div className="numeric action" onClick={handleAction}>
          x
        </div>

        <div className="numeric" onClick={handleNumber}>
          4
        </div>

        <div className="numeric" onClick={handleNumber}>
          5
        </div>

        <div className="numeric" onClick={handleNumber}>
          6
        </div>

        <div className="numeric action" onClick={handleAction}>
          -
        </div>

        <div className="numeric" onClick={handleNumber}>
          1
        </div>

        <div className="numeric" onClick={handleNumber}>
          2
        </div>

        <div className="numeric" onClick={handleNumber}>
          3
        </div>
        <div className="numeric action" onClick={handleAction}>
          +
        </div>

        <div className="numeric" onClick={handleSign}>
          -/+
        </div>

        <div className="numeric" onClick={handleNumber}>
          0
        </div>

        <div className="numeric" onClick={handleComma}>
          .
        </div>

        <div className="numeric action result" onClick={handleResult}>
          =
        </div>
      </div>
    </>
  );
}

export default App;
