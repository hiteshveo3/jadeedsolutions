import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({ subsets: ["latin"] });

const Preview = ({ name, weightClass, trackingClass }: { name: string; weightClass: string; trackingClass: string }) => (
  <div className={`mb-16 ${openSans.className}`}>
    <p className="text-sm text-gray-500 mb-3 font-sans font-bold tracking-widest uppercase">{name}</p>
    <h1 className={`text-6xl md:text-8xl leading-[0.95] max-w-5xl ${weightClass} ${trackingClass}`}>
      More booked jobs. <br />
      <span className="text-black/40">Zero vanity metrics.</span>
    </h1>
  </div>
);

export default function FontsPreview() {
  return (
    <div className="min-h-screen bg-[#F4F3EF] text-[#0D0D0D] p-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 border-b border-black/10 pb-6 font-sans">
          Open Sans - Variations & Weights
        </h2>
        
        <Preview 
          name="1. Open Sans (Medium 500) + Tighter Spacing (Current Style)" 
          weightClass="font-medium" 
          trackingClass="tracking-tighter" 
        />
        <Preview 
          name="2. Open Sans (SemiBold 600) + Tighter Spacing" 
          weightClass="font-semibold" 
          trackingClass="tracking-tighter" 
        />
        <Preview 
          name="3. Open Sans (Bold 700) + Tighter Spacing (Very punchy)" 
          weightClass="font-bold" 
          trackingClass="tracking-tighter" 
        />
        <Preview 
          name="4. Open Sans (ExtraBold 800) + Tighter Spacing" 
          weightClass="font-extrabold" 
          trackingClass="tracking-tighter" 
        />
        <Preview 
          name="5. Open Sans (Medium 500) + Normal Spacing (More open/readable)" 
          weightClass="font-medium" 
          trackingClass="tracking-normal" 
        />
        <Preview 
          name="6. Open Sans (SemiBold 600) + Normal Spacing" 
          weightClass="font-semibold" 
          trackingClass="tracking-normal" 
        />
        <Preview 
          name="7. Open Sans (Light 300) + Tight Spacing (Elegant/Thin)" 
          weightClass="font-light" 
          trackingClass="tracking-tight" 
        />
        
      </div>
    </div>
  );
}
