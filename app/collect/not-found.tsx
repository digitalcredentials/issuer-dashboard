'use client';
 
export default function NotFound() {
 
  return (
    <main className="flex h-full flex-col items-center justify-center">
      <h2 className="text-center">Something went wrong!</h2>
      <h3 className="text-center">Be sure that you have used the link you were emailed, although it may have expired, in which case you&apos;ll need to request a new one.</h3>
    </main>
  );
}