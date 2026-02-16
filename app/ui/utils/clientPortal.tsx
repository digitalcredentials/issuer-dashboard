"use client";

import { useEffect, useRef, useState, ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface ClientPortalProps {
  children: ReactNode;
}

export default function ClientPortal({ children }: ClientPortalProps) {
  const ref = useRef<Element | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector('#portal-root');
    setMounted(true);
  }, []);

  return mounted && ref.current ? createPortal(children, ref.current) : null;
}