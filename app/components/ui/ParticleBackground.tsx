"use client";
export default function ParticleBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <style>{`
        @keyframes orb-float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-30px) scale(1.05); }
        }
      `}</style>
      
      {/* Orb 1 */}
      <div 
        className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-sky-400/20 blur-[120px] rounded-full"
        style={{ animation: 'orb-float 8s ease-in-out infinite' }}
      ></div>
      
      {/* Orb 2 */}
      <div 
        className="absolute bottom-[-80px] right-[-80px] w-[400px] h-[400px] bg-green-400/15 blur-[100px] rounded-full"
        style={{ animation: 'orb-float 8s ease-in-out infinite 3s' }}
      ></div>
      
      {/* Orb 3 */}
      <div className="absolute top-[40%] left-[50%] -translate-x-1/2">
        <div 
          className="w-[350px] h-[350px] bg-sky-600/20 blur-[90px] rounded-full"
          style={{ animation: 'orb-float 8s ease-in-out infinite 5s' }}
        ></div>
      </div>
    </div>
  );
}
