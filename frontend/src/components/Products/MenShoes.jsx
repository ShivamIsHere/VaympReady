import React from "react";
import { RxCross1 } from "react-icons/rx";

const MenShoes = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-end">
      <div className="w-full md:w-3/4 bg-white p-6 rounded-t-lg shadow-lg animate-slide-up">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Size Chart</h2>
          <button className="text-red-500 hover:text-red-700" onClick={onClose}>
            <RxCross1 size={18} />
          </button>
        </div>
        <div className="mt-4">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border p-2">UK/India Size</th>
                <th className="border p-2">Length (cm)</th>
                <th className="border p-2">Brand Size</th>
                <th className="border p-2">Euro Size</th>
                <th className="border p-2">US Size</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">4</td>
                <td className="border p-2">24.2</td>
                <td className="border p-2">UK 4</td>
                <td className="border p-2">38</td>
                <td className="border p-2">5</td>
              </tr>
              <tr>
                <td className="border p-2">5</td>
                <td className="border p-2">24.9</td>
                <td className="border p-2">UK 5</td>
                <td className="border p-2">39</td>
                <td className="border p-2">6</td>
              </tr>
              <tr>
                <td className="border p-2">6</td>
                <td className="border p-2">25.6</td>
                <td className="border p-2">UK 6</td>
                <td className="border p-2">40</td>
                <td className="border p-2">7</td>
              </tr>
              <tr>
                <td className="border p-2">7</td>
                <td className="border p-2">26.2</td>
                <td className="border p-2">UK 7</td>
                <td className="border p-2">41</td>
                <td className="border p-2">8</td>
              </tr>
              <tr>
                <td className="border p-2">8</td>
                <td className="border p-2">26.8</td>
                <td className="border p-2">UK 8</td>
                <td className="border p-2">42</td>
                <td className="border p-2">9</td>
              </tr>
              <tr>
                <td className="border p-2">9</td>
                <td className="border p-2">27.5</td>
                <td className="border p-2">UK 9</td>
                <td className="border p-2">43</td>
                <td className="border p-2">10</td>
              </tr>
              <tr>
                <td className="border p-2">10</td>
                <td className="border p-2">28.2</td>
                <td className="border p-2">UK 10</td>
                <td className="border p-2">44</td>
                <td className="border p-2">11</td>
              </tr>
              <tr>
                <td className="border p-2">11</td>
                <td className="border p-2">28.8</td>
                <td className="border p-2">UK 11</td>
                <td className="border p-2">45</td>
                <td className="border p-2">12</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MenShoes;
