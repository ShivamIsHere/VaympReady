import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
const MenLowerSizeChart = ({ onClose }) => {


    return (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-end">
        <div className="w-full md:w-1/2 bg-white p-6 rounded-t-lg shadow-lg animate-slide-up">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Size Chart</h2>
            <button
              className="text-red-500 hover:text-red-700"
              onClick={onClose}
            >
              <RxCross1 size={18}/>
            </button>
          </div>
          <div className="mt-4">
            {/* Size Chart Content */}
            <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border p-2">Size</th>
                <th className="border p-2">Waist (in)</th>
                <th className="border p-2">Brand Size</th>
                <th className="border p-2">Inseam Length (in)</th>
                <th className="border p-2">Hip (in)</th>
                <th className="border p-2">Rise (in)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">28</td>
                <td className="border p-2">28</td>
                <td className="border p-2">28</td>
                <td className="border p-2">36</td>
                <td className="border p-2">36</td>
                <td className="border p-2">9.5</td>
              </tr>
              <tr>
                <td className="border p-2">30</td>
                <td className="border p-2">30</td>
                <td className="border p-2">30</td>
                <td className="border p-2">36</td>
                <td className="border p-2">38</td>
                <td className="border p-2">9.5</td>
              </tr>
              <tr>
                <td className="border p-2">32</td>
                <td className="border p-2">32</td>
                <td className="border p-2">32</td>
                <td className="border p-2">36</td>
                <td className="border p-2">40</td>
                <td className="border p-2">9.5</td>
              </tr>
              <tr>
                <td className="border p-2">34</td>
                <td className="border p-2">34</td>
                <td className="border p-2">34</td>
                <td className="border p-2">36</td>
                <td className="border p-2">42</td>
                <td className="border p-2">9.5</td>
              </tr>
              <tr>
                <td className="border p-2">36</td>
                <td className="border p-2">36</td>
                <td className="border p-2">36</td>
                <td className="border p-2">36</td>
                <td className="border p-2">44</td>
                <td className="border p-2">9.5</td>
              </tr>
              <tr>
                <td className="border p-2">38</td>
                <td className="border p-2">38</td>
                <td className="border p-2">38</td>
                <td className="border p-2">36</td>
                <td className="border p-2">46</td>
                <td className="border p-2">9.5</td>
              </tr>
              <tr>
                <td className="border p-2">40</td>
                <td className="border p-2">40</td>
                <td className="border p-2">40</td>
                <td className="border p-2">36</td>
                <td className="border p-2">48</td>
                <td className="border p-2">9.5</td>
              </tr>
            </tbody>
          </table>
          </div>
        </div>
      </div>
    );
  };
  
  export default MenLowerSizeChart;