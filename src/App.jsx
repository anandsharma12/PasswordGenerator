import { useCallback, useState, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [pass, setPass] = useState("");
  // pass reff
  const passRef = useRef(null);
  const passGenerator = useCallback(() => {
    let password = " ";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (characterAllowed) str += "!@#$%^&*()_=+|{}:/?.>";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      password += str.charAt(char);
    }
    setPass(password);
  }, [length, numberAllowed, characterAllowed]);

  const copyToClipboard = useCallback(() => {
    passRef.current?.select();
    passRef.current?.setSelectionRange(0, 99);
    window.navigator.clipboard.writeText(pass);
  }, [pass]);
  useEffect(() => {
    passGenerator();
  }, [numberAllowed, characterAllowed, length, passGenerator]);

  return (
    <>
      <div className="w-full max-w-wd mx-auto shadow-md rounded-lg px-4 my-8 bg-gray-800 text-orange-500">
        <h1 className="text-white text-center my-3">Password generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={pass}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
            ref={passRef}
          />
          <button
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
            onClick={copyToClipboard}
          >
            copy
          </button>
        </div>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex item-center gap-x-1">
          <input
            type="range"
            min={8}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <label className="text-white">Length: {length} </label>
        </div>
        <div className="flex item-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
          />
          <label className="text-white" htmlFor="numberInput">
            Numbers
          </label>
        </div>
        <div className="flex item-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={characterAllowed}
            id="characterInput"
            onChange={() => {
              setCharacterAllowed((prev) => !prev);
            }}
          />
          <label className="text-white" htmlFor="characterInput">
            Character
          </label>
        </div>
      </div>
    </>
  );
}

export default App;
