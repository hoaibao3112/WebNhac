'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Activity } from 'lucide-react';

interface AudioVisualizerProps {
  audioElement: HTMLAudioElement | null;
  isPlaying: boolean;
}

type VisualizerMode = 'bars' | 'wave' | 'circular';

export default function AudioVisualizer({ audioElement, isPlaying }: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const animationRef = useRef<number>(0);
  const [isVisible, setIsVisible] = useState(false);
  const [mode, setMode] = useState<VisualizerMode>('bars');
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize Web Audio API
  const initAudio = useCallback(() => {
    if (!audioElement || isInitialized) return;
    
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.8;

      // Only create source if not already created for this element
      const source = audioContext.createMediaElementSource(audioElement);
      source.connect(analyser);
      analyser.connect(audioContext.destination);

      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
      sourceRef.current = source;
      setIsInitialized(true);
    } catch (e) {
      console.warn('AudioVisualizer: Could not initialize Web Audio API', e);
    }
  }, [audioElement, isInitialized]);

  // Draw Bars visualization
  const drawBars = useCallback((ctx: CanvasRenderingContext2D, dataArray: Uint8Array, bufferLength: number, width: number, height: number) => {
    const barCount = Math.min(bufferLength, 64);
    const barWidth = (width / barCount) * 0.8;
    const gap = (width / barCount) * 0.2;

    for (let i = 0; i < barCount; i++) {
      const value = dataArray[i] / 255;
      const barHeight = value * height * 0.85;
      
      const x = i * (barWidth + gap);
      const y = height - barHeight;

      // Create gradient for each bar
      const hue = (i / barCount) * 60 + 260; // Purple to pink
      const saturation = 70 + value * 30;
      const lightness = 45 + value * 25;

      // Glow effect
      ctx.shadowBlur = 15;
      ctx.shadowColor = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.6)`;

      // Bar with rounded top
      const radius = barWidth / 2;
      ctx.beginPath();
      ctx.moveTo(x, height);
      ctx.lineTo(x, y + radius);
      ctx.arcTo(x, y, x + radius, y, radius);
      ctx.arcTo(x + barWidth, y, x + barWidth, y + radius, radius);
      ctx.lineTo(x + barWidth, height);
      ctx.closePath();

      const gradient = ctx.createLinearGradient(x, height, x, y);
      gradient.addColorStop(0, `hsla(${hue}, ${saturation}%, ${lightness - 15}%, 0.4)`);
      gradient.addColorStop(0.5, `hsla(${hue}, ${saturation}%, ${lightness}%, 0.8)`);
      gradient.addColorStop(1, `hsla(${hue}, 100%, ${lightness + 15}%, 1)`);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Mirror reflection
      ctx.shadowBlur = 0;
      const reflectGradient = ctx.createLinearGradient(x, height, x, height + barHeight * 0.3);
      reflectGradient.addColorStop(0, `hsla(${hue}, ${saturation}%, ${lightness}%, 0.15)`);
      reflectGradient.addColorStop(1, 'transparent');
      ctx.fillStyle = reflectGradient;
      ctx.fillRect(x, height, barWidth, barHeight * 0.3);
    }
  }, []);

  // Draw Wave visualization
  const drawWave = useCallback((ctx: CanvasRenderingContext2D, dataArray: Uint8Array, bufferLength: number, width: number, height: number) => {
    const sliceWidth = width / bufferLength;

    // Draw multiple layered waves
    for (let layer = 2; layer >= 0; layer--) {
      ctx.beginPath();
      const layerOffset = layer * 0.1;
      
      for (let i = 0; i < bufferLength; i++) {
        const value = dataArray[i] / 255;
        const y = (value + layerOffset) * height * 0.4 + height * 0.3;
        const x = i * sliceWidth;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          // Smooth curve
          const prevX = (i - 1) * sliceWidth;
          const prevValue = dataArray[i - 1] / 255;
          const prevY = (prevValue + layerOffset) * height * 0.4 + height * 0.3;
          const midX = (prevX + x) / 2;
          ctx.quadraticCurveTo(prevX, prevY, midX, (prevY + y) / 2);
        }
      }

      const hue = 270 + layer * 25;
      const alpha = 0.3 + layer * 0.25;
      ctx.strokeStyle = `hsla(${hue}, 80%, 65%, ${alpha})`;
      ctx.lineWidth = 3 - layer * 0.5;
      ctx.shadowBlur = 20 - layer * 5;
      ctx.shadowColor = `hsla(${hue}, 80%, 65%, 0.5)`;
      ctx.stroke();

      // Fill under the wave
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      const gradient = ctx.createLinearGradient(0, height * 0.3, 0, height);
      gradient.addColorStop(0, `hsla(${hue}, 80%, 65%, ${alpha * 0.3})`);
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.fill();
    }
  }, []);

  // Draw Circular visualization
  const drawCircular = useCallback((ctx: CanvasRenderingContext2D, dataArray: Uint8Array, bufferLength: number, width: number, height: number) => {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.25;
    const barCount = Math.min(bufferLength, 80);

    // Draw center circle glow
    const avgValue = dataArray.reduce((a, b) => a + b, 0) / bufferLength / 255;
    const glowGradient = ctx.createRadialGradient(centerX, centerY, radius * 0.3, centerX, centerY, radius * (1 + avgValue * 0.5));
    glowGradient.addColorStop(0, `hsla(280, 80%, 60%, ${avgValue * 0.3})`);
    glowGradient.addColorStop(0.5, `hsla(280, 80%, 50%, ${avgValue * 0.1})`);
    glowGradient.addColorStop(1, 'transparent');
    ctx.fillStyle = glowGradient;
    ctx.fillRect(0, 0, width, height);

    // Inner circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.4, 0, Math.PI * 2);
    ctx.strokeStyle = `hsla(280, 70%, 55%, ${0.3 + avgValue * 0.3})`;
    ctx.lineWidth = 2;
    ctx.shadowBlur = 20;
    ctx.shadowColor = 'hsla(280, 80%, 60%, 0.5)';
    ctx.stroke();

    // Draw bars radiating from center
    for (let i = 0; i < barCount; i++) {
      const value = dataArray[i] / 255;
      const angle = (i / barCount) * Math.PI * 2 - Math.PI / 2;
      const barLength = value * radius * 0.8;

      const innerR = radius * 0.5;
      const x1 = centerX + Math.cos(angle) * innerR;
      const y1 = centerY + Math.sin(angle) * innerR;
      const x2 = centerX + Math.cos(angle) * (innerR + barLength);
      const y2 = centerY + Math.sin(angle) * (innerR + barLength);

      const hue = (i / barCount) * 80 + 250;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = `hsla(${hue}, 85%, ${50 + value * 30}%, ${0.5 + value * 0.5})`;
      ctx.lineWidth = 2.5;
      ctx.shadowBlur = 10;
      ctx.shadowColor = `hsla(${hue}, 85%, 60%, ${value * 0.6})`;
      ctx.lineCap = 'round';
      ctx.stroke();
    }

    // Rotating ring
    const time = Date.now() * 0.001;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * (0.7 + avgValue * 0.15), time % (Math.PI * 2), (time + Math.PI * 1.5) % (Math.PI * 2));
    ctx.strokeStyle = `hsla(320, 80%, 60%, ${0.4 + avgValue * 0.3})`;
    ctx.lineWidth = 2;
    ctx.shadowBlur = 15;
    ctx.shadowColor = 'hsla(320, 80%, 60%, 0.5)';
    ctx.stroke();
  }, []);

  // Animation loop
  useEffect(() => {
    if (!isVisible || !analyserRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const analyser = analyserRef.current;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);

      // Get canvas actual size
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

      const width = rect.width;
      const height = rect.height;

      // Clear with fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.fillRect(0, 0, width, height);
      ctx.clearRect(0, 0, width, height);

      // Get frequency data
      analyser.getByteFrequencyData(dataArray);

      ctx.shadowBlur = 0;

      switch (mode) {
        case 'bars':
          drawBars(ctx, dataArray, bufferLength, width, height);
          break;
        case 'wave':
          analyser.getByteTimeDomainData(dataArray);
          drawWave(ctx, dataArray, bufferLength, width, height);
          break;
        case 'circular':
          drawCircular(ctx, dataArray, bufferLength, width, height);
          break;
      }
    };

    draw();

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [isVisible, mode, drawBars, drawWave, drawCircular]);

  // Handle toggle
  const handleToggle = () => {
    if (!isInitialized && audioElement) {
      initAudio();
    }
    setIsVisible(!isVisible);
  };

  const cycleMode = () => {
    const modes: VisualizerMode[] = ['bars', 'wave', 'circular'];
    const currentIndex = modes.indexOf(mode);
    setMode(modes[(currentIndex + 1) % modes.length]);
  };

  const modeLabels: Record<VisualizerMode, string> = {
    bars: '▮▮▮ Bars',
    wave: '〰 Wave',
    circular: '◎ Circular',
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={handleToggle}
        className={`p-2 rounded-full transition-all duration-300 ${
          isVisible
            ? 'text-purple-400 bg-purple-400/10 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
            : 'text-gray-400 hover:text-white'
        }`}
        title="Audio Visualizer"
      >
        <Activity className="w-5 h-5" />
      </button>

      {/* Visualizer Panel */}
      {isVisible && (
        <div className="absolute bottom-full left-0 right-0 mb-0 z-40 pointer-events-none">
          <div className="relative w-full pointer-events-auto">
            {/* Mode selector */}
            <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
              <button
                onClick={cycleMode}
                className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 text-xs text-white/70 hover:text-white hover:border-purple-500/50 transition-all duration-300"
              >
                {modeLabels[mode]}
              </button>
              <button
                onClick={() => setIsVisible(false)}
                className="w-7 h-7 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 text-white/50 hover:text-white hover:border-red-500/50 flex items-center justify-center transition-all duration-300 text-sm"
              >
                ✕
              </button>
            </div>

            {/* Canvas */}
            <canvas
              ref={canvasRef}
              className="w-full bg-black/40 backdrop-blur-sm border-t border-white/5"
              style={{ height: '200px' }}
            />

            {/* Gradient fade at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-900 to-transparent pointer-events-none" />
          </div>
        </div>
      )}
    </>
  );
}
