import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

import NavBar from "./NavBar";
import ShimmerGpt from "./ShimmerGpt";

const FoodGpt = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [loading,setLoading] = useState(false);
  const genAI = new GoogleGenerativeAI(
    "AIzaSyCp53v21ykAGnrO-DO2dBOqeNftEiap3GA"
  );
  async function run(query) {
    
    // For text-only input, use the gemini-pro model
    setLoading(true);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = query;

    const result = await model.generateContent("Give the answer" + prompt);
    const response = await result.response;
    const res = response.text();
    console.log("Response....",res)
    setResult(res);
    setLoading(false);

    
  }

  return (
    <>
      <NavBar />
      <div className="text-center">
        <h1 className=" text-xl font-semibold">Ask Me Anything</h1>
        <input
          className="w-1/4 border border-black rounded-md p-1 mt-5"
          placeholder="Enter here..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="border border-black p-1 bg-green-500 text-white font-serif ml-2 rounded-md"
          onClick={() => {
            run(query);
          }}
        >
          Ask
        </button>
      </div>
      <div className="ml-5 mt-12">
        {/* If the result is present, then show the Result */}
        {!loading && <div className="text-xl font-semibold">{result}</div>}
        {loading && <ShimmerGpt/>}
      </div>
    </>
  );
};

export default FoodGpt;
