import PixelArtCreator from '../components/PixelArtCreator';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="z-10 max-w-5xl w-full items-center font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">Pixel Art Creator</h1>
        <PixelArtCreator />
      </div>
    </main>
  );
}
