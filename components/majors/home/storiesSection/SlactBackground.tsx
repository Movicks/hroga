export default function SlactBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#eff1f4] pointer-events-none select-none">
      {/* 
        This  is the rotational layer offset at 32 degrees. 
        We render multiple uniform overlapping columns, matching the angle of shadows and light 
        as shown in the reference image (left columns overlap right columns).
      */}
      <div 
        className="absolute w-[300%] h-[300%] -top-[100%] -right-[100%] flex flex-row justify-center rotate-[32deg] origin-center"
        id="bg-slat-container"
      >
        {Array.from({ length: 48 }).map((_, i) => (
          <div
            key={i}
            id={`bg-slat-item-${i}`}
            className="h-full bg-white border-r border-[#e6eaee]/10"
            style={{
              width: "172px",
              minWidth: "172px",
              zIndex: 100 - i, // Reverse z-index so left-slat overlaps right-slat
              marginLeft: "-95px", // Exact shingle overlap
              boxShadow: "15px 0 35px rgba(0, 0, 0, 0.038)", // Soft parallel drop shadow
            }}
          />
        ))}
      </div>
    </div>
  );
};