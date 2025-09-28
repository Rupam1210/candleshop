import React from 'react';

// const GlowingDiwaliCircle = () => {
//   return (
//     <div className="absolute -top-20 -left-20 w-56 h-56">
//       {/* Glow Effect */}
//       <div className="absolute   inset-0 bg-gradient-to-br from-orange-400 to-yellow-300 rounded-full animate-pulse shadow-2xl"></div>
      
//       {/* Main Circle */}
//       <div className="absolute inset-2 bg-gradient-to-br from-orange-500 to-yellow-400 rounded-full border-4 border-yellow-200 flex items-center justify-center">
//         <div className="text-center">
//           <div className="text-2xl font-bold text-white tracking-wider">DIWALI</div>
//           <div className="text-xl font-bold text-white tracking-wider mt-1">SALE</div>
//           {/* <div className="text-xs text-white font-medium mt-3 bg-red-500 rounded-full px-2 py-1 inline-block">
//             SPECIAL CANDLES
//           </div> */}
//         </div>
//       </div>

//       {/* Sparkle Effects */}
//       <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 text-xl animate-bounce">✨</div>
//     </div>
//   );
// };

// export default GlowingDiwaliCircle;
const GlowingDiwaliCircle = () => {
  return (
    <div className="absolute -top-10 -left-10 w-48 h-48 bg-gradient-to-br from-orange-500 to-yellow-400 rounded-full shadow-xl border-4 border-yellow-200 flex items-center justify-center p-8 hover:scale-105 transition-transform duration-300">
      <div className="text-center">
        <div className="text-2xl font-bold text-white drop-shadow-md">Diwali</div>
        <div className="text-xl font-bold text-white drop-shadow-md mt-2">Sale</div>
        <div className="w-12 h-1 bg-white rounded-full mx-auto mt-3"></div>
        <div className="text-xs text-white font-semibold mt-2">Special Candles</div>
      </div>
    </div>
  );
};

export default GlowingDiwaliCircle;