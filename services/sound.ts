class SoundService {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;

  private getContext(): AudioContext {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.connect(this.ctx.destination);
      this.masterGain.gain.value = 0.3; // Global volume
    }
    return this.ctx;
  }

  // Initialize context on user interaction to bypass autoplay policies
  async init() {
    const ctx = this.getContext();
    if (ctx.state === 'suspended') {
      await ctx.resume();
    }
  }

  private playTone(freq: number, duration: number, type: OscillatorType = 'sine', startTime: number = 0) {
    try {
      const ctx = this.getContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime + startTime);

      osc.connect(gain);
      gain.connect(this.masterGain!);

      // Envelope
      const start = ctx.currentTime + startTime;
      gain.gain.setValueAtTime(0, start);
      gain.gain.linearRampToValueAtTime(1, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, start + duration);

      osc.start(start);
      osc.stop(start + duration + 0.1);
    } catch (e) {
      console.error("Audio error", e);
    }
  }

  playFlip() {
    // Short, high tick
    this.playTone(600, 0.1, 'sine');
  }

  playMatch() {
    // Happy chime (Major 3rd)
    this.playTone(523.25, 0.3, 'sine', 0); // C5
    this.playTone(659.25, 0.3, 'sine', 0.1); // E5
  }

  playCorrect() {
    // Success triad
    this.playTone(523.25, 0.2, 'sine', 0); // C5
    this.playTone(659.25, 0.2, 'sine', 0.1); // E5
    this.playTone(783.99, 0.4, 'sine', 0.2); // G5
  }

  playSwoosh() {
    try {
      const ctx = this.getContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(this.masterGain!);
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.3);
      
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } catch (e) {}
  }

  playFanfare() {
    // Wedding march-ish / Celebration
    const now = 0;
    this.playTone(392.00, 0.2, 'square', now); // G4
    this.playTone(523.25, 0.2, 'square', now + 0.2); // C5
    this.playTone(659.25, 0.2, 'square', now + 0.4); // E5
    this.playTone(783.99, 0.6, 'square', now + 0.6); // G5 (Hold)
  }
}

export const soundService = new SoundService();