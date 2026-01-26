"use client";
import { Suspense } from "react";
import { Navbar } from '@/components/navbar';
import LoadingSpinner from '@/components/loading-spinner';
import PhotoInfoContent from '@/components/PhotoInfoContent';
import Footer from '@/components/footer';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

export default function PhotoDetailPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Suspense fallback={<main className="flex-1 flex items-center justify-center"><LoadingSpinner /></main>}>
        <PhotoInfoContent />
      </Suspense>
      <Footer />
    </div>
  );
}