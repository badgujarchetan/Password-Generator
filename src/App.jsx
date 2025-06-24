import { useCallback, useEffect, useState, useRef } from "react";

export default function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charcaterAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charcaterAllowed) str += "@$#!%^*&";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charcaterAllowed]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charcaterAllowed, passwordGenerator]);

  const copyPasswordtoClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,100);
    window.navigator.clipboard.writeText(password);
  }, [password]);
  return (
    <div
      style={{ fontFamily: "sans-serif" }}
      className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4"
    >
      <div className="bg-gray-900 p-6 rounded-2xl shadow-2xl w-full max-w-md border border-gray-700">
        <h3 className="text-3xl font-bold mb-6 text-center text-white tracking-wide">
          Password Generator
        </h3>

        <div className="space-y-4">
          <div className="flex">
            <input
              type="text"
              readOnly
              value={password}
              className="w-full p-2 rounded-l bg-gray-700 text-white border border-r-0 border-gray-600"
              placeholder="Generated Password"
              ref={passwordRef}
            />
            <button
              onClick={copyPasswordtoClipboard}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 rounded-r transition-all"
            >
              Copy
            </button>
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="range" className="text-white font-medium">
              Length: <span className="text-yellow-400">{length}</span>
            </label>
            <input
              type="range"
              value={length}
              id="range"
              min="6"
              max="20"
              onChange={(e) => setLength(e.target.value)}
              className="w-2/3 accent-yellow-400"
            />
          </div>

          <div className="flex items-center space-x-4">
            <input
              type="checkbox"
              id="Number"
              checked={numberAllowed}
              className="accent-blue-500 w-5 h-5"
              onChange={() => setNumberAllowed((prev) => !prev)}
            />
            <label htmlFor="Number" className="text-white font-medium">
              Include Numbers
            </label>
          </div>

          <div className="flex items-center space-x-4">
            <input
              type="checkbox"
              id="Character"
              checked={charcaterAllowed}
              className="accent-green-500 w-5 h-5"
              onChange={() => setCharAllowed((prev) => !prev)}
            />
            <label htmlFor="Character" className="text-white font-medium">
              Include Special Characters
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
