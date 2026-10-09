// Web Audio API lightweight synthesizer for micro-interactions
// Zero external dependencies, pure native browser audio nodes

class AudioSynth {
  constructor() {
    this.ctx = null
    this.muted = typeof window !== 'undefined' ? localStorage.getItem('nk_sound_muted') !== 'false' : true // Default muted for accessibility
    this.listeners = new Set()
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContext = window.AudioContext || window.webkitAudioContext
      if (AudioContext) {
        this.ctx = new AudioContext()
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
  }

  isMuted() {
    return this.muted
  }

  toggleMute() {
    this.muted = !this.muted
    if (typeof window !== 'undefined') {
      localStorage.setItem('nk_sound_muted', this.muted ? 'true' : 'false')
    }
    this.listeners.forEach((fn) => fn(this.muted))
    return this.muted
  }

  subscribe(listener) {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  playHover() {
    if (this.muted) return
    try {
      this.init()
      if (!this.ctx) return
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()
      const now = this.ctx.currentTime

      osc.type = 'sine'
      osc.frequency.setValueAtTime(420, now)
      osc.frequency.exponentialRampToValueAtTime(780, now + 0.04)

      gain.gain.setValueAtTime(0.025, now)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start(now)
      osc.stop(now + 0.045)
    } catch {
      // Audio context might fail in silent mode; ignore gracefully
    }
  }

  playClick() {
    if (this.muted) return
    try {
      this.init()
      if (!this.ctx) return
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()
      const now = this.ctx.currentTime

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(680, now)
      osc.frequency.exponentialRampToValueAtTime(240, now + 0.06)

      gain.gain.setValueAtTime(0.05, now)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.065)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start(now)
      osc.stop(now + 0.065)
    } catch {
      // Ignore gracefully
    }
  }

  playModeSwitch() {
    if (this.muted) return
    try {
      this.init()
      if (!this.ctx) return
      const now = this.ctx.currentTime
      const osc1 = this.ctx.createOscillator()
      const osc2 = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc1.type = 'sine'
      osc2.type = 'sine'
      osc1.frequency.setValueAtTime(520, now)
      osc2.frequency.setValueAtTime(880, now + 0.03)

      gain.gain.setValueAtTime(0.04, now)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09)

      osc1.connect(gain)
      osc2.connect(gain)
      gain.connect(this.ctx.destination)

      osc1.start(now)
      osc1.stop(now + 0.045)
      osc2.start(now + 0.03)
      osc2.stop(now + 0.09)
    } catch {
      // Ignore
    }
  }

  playCurtainOpen() {
    if (this.muted) return
    try {
      this.init()
      if (!this.ctx) return
      const now = this.ctx.currentTime
      const freqs = [329.63, 440.0, 554.37, 659.25] // E major chord swell

      freqs.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator()
        const gain = this.ctx.createGain()
        osc.type = 'sine'
        osc.frequency.setValueAtTime(freq, now + idx * 0.06)
        osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + 0.8)

        gain.gain.setValueAtTime(0.0001, now)
        gain.gain.linearRampToValueAtTime(0.03, now + 0.15)
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.9)

        osc.connect(gain)
        gain.connect(this.ctx.destination)

        osc.start(now + idx * 0.06)
        osc.stop(now + 0.95)
      })
    } catch {
      // Ignore
    }
  }
}

export const synth = new AudioSynth()

