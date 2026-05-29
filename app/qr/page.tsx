"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { destinations } from "@/features/localpass/data";

const checkinKey = "lakbay-localpass-checkins";

type Checkin = {
  qrCode: string;
  name: string;
  points: number;
  date: string;
};

type DetectedBarcode = {
  rawValue: string;
};

type BarcodeDetectorConstructor = new (options?: { formats?: string[] }) => {
  detect(source: ImageBitmapSource): Promise<DetectedBarcode[]>;
};

type WindowWithBarcodeDetector = Window & {
  BarcodeDetector?: BarcodeDetectorConstructor;
};

export default function QRPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const frameRef = useRef<number | null>(null);
  const detectorRef = useRef<InstanceType<BarcodeDetectorConstructor> | null>(null);
  const lastScanRef = useRef("");

  const [code, setCode] = useState(destinations[0]?.qrCode ?? "");
  const [checkins, setCheckins] = useState<Checkin[]>([]);
  const [message, setMessage] = useState("Start the camera scanner, upload a QR photo, or type a LocalPass QR code.");
  const [scannerStatus, setScannerStatus] = useState("Camera idle");
  const [scannerSupported, setScannerSupported] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(checkinKey);
    if (saved) {
      setCheckins(JSON.parse(saved) as Checkin[]);
    }

    const BarcodeDetector = (window as WindowWithBarcodeDetector).BarcodeDetector;
    const supported = typeof navigator.mediaDevices?.getUserMedia === "function" && typeof BarcodeDetector === "function";
    setScannerSupported(supported);
    if (BarcodeDetector) {
      detectorRef.current = new BarcodeDetector({ formats: ["qr_code"] });
    }

    return () => stopCamera();
  }, []);

  const totalPoints = useMemo(() => checkins.reduce((sum, item) => sum + item.points, 0), [checkins]);

  function saveCheckins(nextCheckins: Checkin[]) {
    setCheckins(nextCheckins);
    window.localStorage.setItem(checkinKey, JSON.stringify(nextCheckins));
  }

  function processCode(rawCode: string) {
    const normalized = rawCode.trim().toUpperCase();
    setCode(normalized);

    const destination = destinations.find((item) => item.qrCode === normalized);

    if (!destination) {
      setMessage("QR code not found in demo seed data.");
      setScannerStatus("Code scanned but not recognized");
      return;
    }

    if (checkins.some((item) => item.qrCode === destination.qrCode)) {
      setMessage(`Already checked in at ${destination.name}. Story remains unlocked.`);
      setScannerStatus("Already checked in");
      return;
    }

    const nextCheckins = [
      {
        qrCode: destination.qrCode,
        name: destination.name,
        points: destination.points,
        date: new Date().toLocaleString()
      },
      ...checkins
    ];

    saveCheckins(nextCheckins);
    setMessage(`Unlocked ${destination.name}. You earned ${destination.points} LocalPass points.`);
    setScannerStatus("Check-in successful");
    stopCamera();
  }

  function checkIn() {
    processCode(code);
  }

  async function scanFrame() {
    const detector = detectorRef.current;
    const video = videoRef.current;

    if (!detector || !video || video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
      frameRef.current = window.requestAnimationFrame(scanFrame);
      return;
    }

    try {
      const results = await detector.detect(video);
      const rawValue = results[0]?.rawValue;

      if (rawValue && rawValue !== lastScanRef.current) {
        lastScanRef.current = rawValue;
        processCode(rawValue);
        return;
      }
    } catch {
      setScannerStatus("Scanner could not read this frame");
    }

    frameRef.current = window.requestAnimationFrame(scanFrame);
  }

  async function startCamera() {
    if (!scannerSupported || !detectorRef.current) {
      setScannerStatus("Camera QR scanning is not supported in this browser");
      return;
    }

    try {
      setScannerStatus("Requesting camera permission");
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } },
        audio: false
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      lastScanRef.current = "";
      setCameraActive(true);
      setScannerStatus("Point the camera at a LocalPass QR");
      frameRef.current = window.requestAnimationFrame(scanFrame);
    } catch {
      setScannerStatus("Camera permission was blocked or unavailable");
    }
  }

  function stopCamera() {
    if (frameRef.current) {
      window.cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }

    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setCameraActive(false);
  }

  async function scanUploadedImage(file: File | undefined) {
    const detector = detectorRef.current;
    if (!file || !detector) {
      setScannerStatus("Image QR scanning is not supported in this browser");
      return;
    }

    try {
      setScannerStatus("Scanning uploaded image");
      const bitmap = await createImageBitmap(file);
      const results = await detector.detect(bitmap);
      bitmap.close();

      if (!results[0]?.rawValue) {
        setScannerStatus("No QR code found in the image");
        return;
      }

      processCode(results[0].rawValue);
    } catch {
      setScannerStatus("Could not scan the uploaded image");
    }
  }

  function resetDemo() {
    saveCheckins([]);
    setMessage("LocalPass demo progress was reset.");
    setScannerStatus("Camera idle");
  }

  return (
    <main className="lakbay-page">
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-soft md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-lakbay-gold">LocalPass QR</p>
            <h1 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">Scan, check in, and unlock heritage stories.</h1>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Use the camera scanner on supported browsers, upload a QR photo, or enter a LocalPass code manually for demos and older devices.
            </p>

            <div className="mt-8 overflow-hidden rounded-[1.75rem] border border-white/10 bg-black">
              <div className="relative aspect-[3/4] bg-slate-900">
                <video ref={videoRef} className="h-full w-full object-cover" playsInline muted />
                {!cameraActive && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <div className="h-44 w-44 rounded-[2rem] border-4 border-dashed border-lakbay-gold/70" />
                    <p className="mt-5 text-sm font-bold text-slate-300">
                      {scannerSupported ? "Camera ready for QR scanning" : "Use manual entry or a browser with BarcodeDetector support"}
                    </p>
                  </div>
                )}
                <div className="pointer-events-none absolute inset-10 rounded-[2rem] border-4 border-lakbay-gold/80 shadow-[0_0_0_999px_rgba(0,0,0,0.28)]" />
              </div>
              <div className="grid gap-3 bg-white p-4 text-slate-950 sm:grid-cols-2">
                <button onClick={startCamera} disabled={cameraActive} className="rounded-full bg-lakbay-green px-5 py-3 text-sm font-black text-white transition hover:bg-slate-950 disabled:cursor-not-allowed disabled:bg-slate-300">
                  Start scanner
                </button>
                <button onClick={stopCamera} disabled={!cameraActive} className="rounded-full border border-slate-200 px-5 py-3 text-sm font-black text-slate-700 transition hover:border-red-300 hover:text-red-600 disabled:cursor-not-allowed disabled:text-slate-300">
                  Stop camera
                </button>
                <label className="sm:col-span-2 rounded-full border border-dashed border-lakbay-green/50 px-5 py-3 text-center text-sm font-black text-lakbay-green transition hover:border-lakbay-blue hover:text-lakbay-blue">
                  Upload QR image
                  <input type="file" accept="image/*" className="sr-only" onChange={(event) => scanUploadedImage(event.target.files?.[0])} />
                </label>
              </div>
            </div>

            <div className="mt-5 rounded-[1.5rem] bg-white/10 p-5">
              <p className="text-sm font-bold text-slate-300">Scanner status</p>
              <p className="mt-2 text-lg font-black text-white">{scannerStatus}</p>
            </div>

            <div className="mt-5 rounded-[1.5rem] bg-white p-5 text-slate-950">
              <label className="text-sm font-black text-slate-600">Manual QR code</label>
              <input
                value={code}
                onChange={(event) => setCode(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 font-mono text-sm font-bold outline-none ring-lakbay-green transition focus:ring-4"
                placeholder="LP-BASILICA-001"
              />
              <button onClick={checkIn} className="mt-4 w-full rounded-full bg-lakbay-green px-5 py-3 text-sm font-black text-white transition hover:bg-slate-950">
                Check in now
              </button>
              <button onClick={resetDemo} className="mt-3 w-full rounded-full border border-slate-200 px-5 py-3 text-sm font-black text-slate-700 transition hover:border-red-300 hover:text-red-600">
                Reset demo progress
              </button>
            </div>

            <div className="mt-6 rounded-[1.5rem] bg-white/10 p-5">
              <p className="text-sm font-bold text-slate-300">Check-in result</p>
              <p className="mt-2 text-lg font-black text-white">{message}</p>
            </div>
          </section>

          <section>
            <div className="grid gap-5 md:grid-cols-2">
              <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
                <p className="text-sm font-bold text-slate-500">Total points</p>
                <p className="mt-3 text-5xl font-black text-lakbay-green">{totalPoints}</p>
                <p className="mt-3 text-sm text-slate-500">Points are saved in browser local storage for this demo.</p>
              </article>
              <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
                <p className="text-sm font-bold text-slate-500">Visited stops</p>
                <p className="mt-3 text-5xl font-black text-slate-950">{checkins.length}</p>
                <p className="mt-3 text-sm text-slate-500">QR check-ins can later sync to Supabase.</p>
              </article>
            </div>

            <div className="mt-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
              <h2 className="text-2xl font-black text-slate-950">Demo QR codes</h2>
              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {destinations.map((destination) => (
                  <button
                    key={destination.id}
                    onClick={() => setCode(destination.qrCode)}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left transition hover:border-lakbay-green hover:bg-emerald-50"
                  >
                    <p className="font-black text-slate-950">{destination.name}</p>
                    <p className="mt-2 font-mono text-xs font-bold text-lakbay-green">{destination.qrCode}</p>
                    <p className="mt-2 text-xs font-bold text-amber-700">+{destination.points} points</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
              <h2 className="text-2xl font-black text-slate-950">Unlocked stories</h2>
              <div className="mt-5 space-y-3">
                {checkins.length === 0 && <p className="text-sm text-slate-500">No stories unlocked yet.</p>}
                {checkins.map((checkin) => {
                  const destination = destinations.find((item) => item.qrCode === checkin.qrCode);
                  return (
                    <article key={checkin.qrCode} className="rounded-2xl bg-slate-50 p-4">
                      <p className="font-black text-slate-950">{checkin.name}</p>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{destination?.story}</p>
                      <p className="mt-2 text-xs font-bold text-slate-400">Checked in: {checkin.date}</p>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
