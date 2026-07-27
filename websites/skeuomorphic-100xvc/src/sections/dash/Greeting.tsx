import VectorCanvas from '../../components/VectorCanvas';
import { USER } from '../../data/dashboard';

export default function Greeting() {
  return (
    <header className="relative overflow-hidden">
      {/* animated vector field, kept whisper-quiet */}
      <VectorCanvas className="absolute inset-0 h-full w-full opacity-60" />
      <div className="relative px-5 pb-8 pt-7 sm:px-8">
        <p className="font-serif text-[15px] italic text-ink-55">Good morning, {USER.first}.</p>
        <h1 className="mt-3 max-w-[720px] font-serif text-[40px] font-medium leading-[1.08] tracking-[-0.01em] sm:text-[52px]">
          <span className="italic">Design systems.</span>
          <br />
          Build leverage. Create escape velocity.
        </h1>
        <p className="mt-4 font-serif text-[16px] leading-relaxed text-ink-55 sm:text-[17px]">
          You don't rise by doing more.
          <br />
          <span className="italic">You rise by building what runs without you.</span>
        </p>
      </div>
    </header>
  );
}
