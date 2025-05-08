export default function AudioWaveform() {
    return (
      <div className="flex items-center justify-center gap-[2px] h-8">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="w-[4px] rounded-sm bg-green-500 animate-wave "
            style={{
              animationDelay: `${i * 0.1}s`,
              height: `${Math.random() * 100}%`,
              opacity: i < 8 ? 1 : 0.3, 
            }}
          />
        ))}
      </div>
    );
  }
  