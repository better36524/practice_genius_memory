import React, { useCallback, useEffect, useRef, useState } from "react";
import "./App.scss";
import Reference from "./components/Reference";
import SelectList from "./components/SelectList";

const App = () => {
  const stations = [
    "공항",
    "국회의사당",
    "미술관",
    "박물관",
    "놀이공원",
    "고속터미널",
    "문화회관",
    "영화관",
    "시청",
    "극장",
    "법원",
    "동물원"
  ];

  const [state, setState] = useState("");
  const [timeout, setTimeout] = useState(30);
  const [result, setResult] = useState("");

  useEffect(() => {
    const timer = () => {
      if (timeout <= 0) {
        onTimeOut();
        clearInterval(interval);
      } else {
        setTimeout(timeout => timeout - 1);
      }
    };
    const interval = setInterval(timer, 1000);
    return () => clearInterval(interval);
  }, [timeout]);

  const shuffle = target => {
    for (let i = target.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [target[i], target[j]] = [target[j], target[i]];
    }
    return target;
  };

  const failCnt = useRef(0);

  const [reference, setReference] = useState(
    shuffle(stations).map((station, index) => {
      const item = {
        index: index,
        station: station,
        visible: true,
        selected: false
      };
      return item;
    })
  );

  const [selections, setSelections] = useState(
    shuffle(stations).map(station => {
      const item = {
        index: reference.find(reference => {
          return reference.station === station;
        }).index,
        station: station,
        visible: false,
        isTarget: false,
        revealed: false
      };
      return item;
    })
  );

  const onTimeOut = () => {
    setState("start");
    setTimeout(0);
    clearInterval();
    setReference(
      reference
        .sort((a, b) => {
          return a.station < b.station ? -1 : a.station > b.station ? 1 : 0;
        })
        .map(reference => {
          return { ...reference, visible: false };
        })
    );
    setSelections(
      selections.map((selection, index) => {
        return { ...selection, isTarget: index === 0, visible: true };
      })
    );
  };

  const onConfirm = useCallback(item => {
    if (state !== "start") {
      return;
    }

    const target = selections.find(selection => {
      return selection.isTarget;
    });

    const result = item.index === target.index;
    setResult(result ? "correct" : "wrong");
    if (result) {
      const currentTargetIndex = selections.findIndex(selection => {
        return selection.isTarget;
      });

      if (currentTargetIndex === selections.length - 1) {
        setState("end");
        setResult(failCnt.current);
      }

      setSelections(
        selections.map((selection, index) => {
          if (selection.isTarget) {
            return { ...selection, revealed: true, isTarget: false };
          } else {
            return {
              ...selection,
              isTarget: index === currentTargetIndex + 1
            };
          }
        })
      );
    } else {
      failCnt.current++;
    }
  });

  return (
    <>
      <div className="GamePlate">
        <Reference items={reference} onClick={onConfirm} />
        <SelectList items={selections} />
      </div>
      <div className="Submit">
        {timeout > 0 && (
          <button className="over" onClick={onTimeOut}>
            {timeout}
          </button>
        )}
        <text className="result">{result}</text>
      </div>
    </>
  );
};

export default App;
