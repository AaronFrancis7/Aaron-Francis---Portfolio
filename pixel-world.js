/**
 * 16-BIT PIXEL-ART COASTAL WORLD ENGINE
 * Aaron Francis Personal Portfolio Redesign
 * 
 * Features:
 * - High-detail 16-bit retro adventure game tropical coastline.
 * - Matching perspective, composition and landmarks for Day & Night.
 * - Procedural pixel waves, beach surf foam wash, glistening specular sun/moon reflection.
 * - Swaying coconut palm trees with multi-toned 16-bit fronds and wind harmonics.
 * - Drifting pixel clouds, distant volcanic islands with atmospheric mist.
 * - Daytime soaring gulls and nighttime twinkling stars & glowing fireflies.
 * - THE SIGNATURE FEATURE: 9-Stage Sunset and 6-Stage Sunrise animated transitions!
 */

(function () {
  'use strict';

  // Master Color Palette Tables for 16-bit Coastal Lighting
  const PALETTES = {
    day: {
      skyZenith: [25, 118, 210],    // Deep tropical azure
      skyMid: [56, 189, 248],       // Clear cyan blue
      skyHorizon: [186, 230, 253],  // Sunlit horizon haze
      sunCore: [255, 255, 255],
      sunCorona: [254, 240, 138],
      sunRay: [253, 224, 71],
      seaDeep: [2, 132, 199],       // Horizon ocean
      seaMid: [14, 165, 233],       // Turquoise mid-ocean
      seaShallow: [20, 184, 166],   // Nearshore aquamarine
      seaFoam: [240, 253, 250],     // White surf foam
      sandDry: [250, 232, 176],     // Warm golden sand
      sandWet: [196, 162, 102],     // Tide-washed wet sand
      sandShadow: [217, 180, 110],
      palmLight: [74, 222, 128],    // Sunlit palm leaves
      palmMid: [22, 163, 74],
      palmDark: [20, 83, 45],
      palmTrunkLight: [180, 120, 70],
      palmTrunkDark: [110, 65, 30],
      island: [30, 65, 100],        // Distant island silhouette
      islandHaze: [147, 197, 253],
      cloudHighlight: [255, 255, 255],
      cloudBody: [224, 242, 254],
      cloudShadow: [186, 215, 240],
      reflectionColor: [254, 240, 138]
    },
    sunset: {
      skyZenith: [46, 16, 101],     // Deep twilight purple
      skyMid: [192, 38, 211],       // Fuchsia / magenta
      skyHorizon: [249, 115, 22],   // Burning sunset orange
      sunCore: [255, 247, 237],
      sunCorona: [253, 186, 116],
      sunRay: [249, 115, 22],
      seaDeep: [76, 29, 149],       // Deep wine/purple ocean
      seaMid: [157, 23, 77],        // Magenta water reflection
      seaShallow: [225, 29, 72],    // Crimson-rose nearshore
      seaFoam: [254, 215, 170],     // Warm orange-lit foam
      sandDry: [217, 119, 6],       // Amber sunset sand
      sandWet: [146, 64, 14],       // Deep dusk wet sand
      sandShadow: [120, 53, 15],
      palmLight: [251, 146, 60],    // Fiery rim lighting on palms
      palmMid: [147, 51, 234],
      palmDark: [30, 27, 75],
      palmTrunkLight: [150, 70, 40],
      palmTrunkDark: [60, 20, 25],
      island: [59, 7, 100],         // Purple island silhouette
      islandHaze: [251, 113, 133],
      cloudHighlight: [254, 215, 170],
      cloudBody: [244, 63, 94],
      cloudShadow: [107, 33, 168],
      reflectionColor: [253, 186, 116]
    },
    night: {
      skyZenith: [3, 7, 18],        // Obsidian night sky
      skyMid: [10, 17, 40],         // Midnight navy
      skyHorizon: [15, 29, 64],     // Moonlit horizon indigo
      sunCore: [241, 245, 249],     // Moon core
      sunCorona: [148, 163, 184],   // Lunar halo
      sunRay: [203, 213, 225],
      seaDeep: [6, 16, 38],         // Inky deep sea
      seaMid: [8, 32, 62],          // Moonlit ocean band
      seaShallow: [14, 56, 84],     // Deep turquoise shore
      seaFoam: [165, 243, 252],     // Phosphorescent surf foam
      sandDry: [28, 42, 56],        // Moonlit blue-grey sand
      sandWet: [13, 24, 34],        // Dark tide line
      sandShadow: [17, 28, 38],
      palmLight: [56, 189, 248],    // Cool moonlight rim
      palmMid: [15, 23, 42],
      palmDark: [3, 7, 18],
      palmTrunkLight: [51, 65, 85],
      palmTrunkDark: [15, 23, 42],
      island: [5, 12, 26],          // Nocturnal island shadow
      islandHaze: [30, 41, 59],
      cloudHighlight: [148, 163, 184],
      cloudBody: [51, 65, 85],
      cloudShadow: [15, 23, 42],
      reflectionColor: [224, 242, 254]
    },
    sunrise: {
      skyZenith: [24, 20, 68],      // Morning violet/indigo
      skyMid: [99, 102, 241],       // Morning periwinkle
      skyHorizon: [253, 224, 71],   // Golden dawn horizon
      sunCore: [255, 251, 235],
      sunCorona: [254, 215, 170],
      sunRay: [251, 146, 60],
      seaDeep: [30, 27, 75],        // Early dawn water
      seaMid: [2, 132, 199],        // Waking turquoise
      seaShallow: [6, 182, 212],    // Fresh morning tide
      seaFoam: [254, 240, 138],     // Golden morning foam
      sandDry: [212, 180, 131],     // Soft morning sand
      sandWet: [133, 91, 50],
      sandShadow: [160, 120, 80],
      palmLight: [244, 114, 182],   // Soft pink dawn rim
      palmMid: [34, 197, 94],
      palmDark: [20, 83, 45],
      palmTrunkLight: [160, 100, 60],
      palmTrunkDark: [80, 40, 20],
      island: [30, 27, 75],
      islandHaze: [244, 114, 182],
      cloudHighlight: [254, 240, 138],
      cloudBody: [251, 113, 133],
      cloudShadow: [99, 102, 241],
      reflectionColor: [254, 240, 138]
    }
  };

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function lerpColor(c1, c2, t) {
    return [
      Math.round(lerp(c1[0], c2[0], t)),
      Math.round(lerp(c1[1], c2[1], t)),
      Math.round(lerp(c1[2], c2[2], t))
    ];
  }

  function rgbString(c, alpha) {
    if (alpha !== undefined && alpha < 1) {
      return `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${alpha.toFixed(3)})`;
    }
    return `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
  }

  // 16-Bit Pixel-Art Coastal World Renderer Class
  class PixelWorld {
    constructor() {
      this.canvas = document.getElementById('pixel-canvas');
      if (!this.canvas) return;

      this.ctx = this.canvas.getContext('2d', { alpha: false });
      
      // Native Retro Pixel Buffer (Classic 16-bit 16:9 ratio)
      this.pixelHeight = 288;
      this.pixelWidth = 512;
      this.buffer = document.createElement('canvas');
      this.buffer.width = this.pixelWidth;
      this.buffer.height = this.pixelHeight;
      this.bctx = this.buffer.getContext('2d', { alpha: false });
      this.bctx.imageSmoothingEnabled = false;

      // State: 'day', 'night'
      this.currentMode = 'day'; 
      this.transitionType = null; // 'sunset' or 'sunrise'
      this.transitionProgress = 0; // 0 to 1
      this.isTransitioning = false;
      this.transitionDuration = 2600; // 2.6 seconds carefully timed cinematic cycle
      this.transitionStartTime = 0;

      // Active reflection state
      this.activeReflectionX = 368;
      this.activeReflectionAlpha = 0.8;
      this.activeReflectionColor = PALETTES.day.reflectionColor;

      // Simulation clock
      this.simTime = 0;
      this.lastFrame = performance.now();

      // Clouds state
      this.clouds = [
        { x: 30, y: 35, width: 85, height: 22, speed: 0.035, scale: 1.0 },
        { x: 190, y: 20, width: 110, height: 26, speed: 0.025, scale: 1.2 },
        { x: 360, y: 48, width: 75, height: 18, speed: 0.045, scale: 0.8 },
        { x: 480, y: 28, width: 95, height: 24, speed: 0.03, scale: 1.1 }
      ];

      // Stars
      this.stars = [];
      this.generateStars(80);

      // Night Fireflies
      this.fireflies = [];
      this.generateFireflies(10);

      // Daytime Gulls
      this.gulls = [
        { x: 80, y: 70, vx: 0.35, vy: 0.04, flap: 0 },
        { x: 120, y: 62, vx: 0.38, vy: -0.03, flap: 1.5 },
        { x: 260, y: 80, vx: -0.3, vy: 0.05, flap: 3.0 }
      ];

      // Shooting star state
      this.shootingStar = null;
      this.lastShootingStarTime = 0;

      // Water wave state
      this.waveTime = 0;

      // Wind sway for palm trees
      this.windTime = 0;

      // Mouse interactivity
      this.mouse = { x: -100, y: -100, active: false };

      this.init();
    }

    init() {
      this.handleResize();
      window.addEventListener('resize', () => this.handleResize(), { passive: true });

      // Track mouse for subtle pixel glints
      window.addEventListener('mousemove', e => {
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.x = ((e.clientX - rect.left) / rect.width) * this.pixelWidth;
        this.mouse.y = ((e.clientY - rect.top) / rect.height) * this.pixelHeight;
        this.mouse.active = true;
      }, { passive: true });

      // Read initial theme from document
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      this.currentMode = currentTheme === 'dark' ? 'night' : 'day';

      // Kick off render loop
      requestAnimationFrame(time => this.render(time));
    }

    handleResize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;

      this.canvas.width = Math.round(w * dpr);
      this.canvas.height = Math.round(h * dpr);
      this.ctx.imageSmoothingEnabled = false;

      this.pixelHeight = 288;
      this.pixelWidth = Math.max(384, Math.round(this.pixelHeight * (w / h)));
      this.buffer.width = this.pixelWidth;
      this.buffer.height = this.pixelHeight;
      this.bctx.imageSmoothingEnabled = false;
    }

    generateStars(count) {
      this.stars = [];
      let seed = 1234567;
      const rnd = () => {
        seed = (seed * 16807) % 2147483647;
        return (seed - 1) / 2147483646;
      };

      for (let i = 0; i < count; i++) {
        this.stars.push({
          x: Math.floor(rnd() * 800),
          y: Math.floor(rnd() * 155),
          size: rnd() > 0.82 ? 2 : 1,
          phase: rnd() * Math.PI * 2,
          speed: 1.5 + rnd() * 2.5,
          colorType: rnd() > 0.7 ? 1 : 0
        });
      }
    }

    generateFireflies(count) {
      this.fireflies = [];
      for (let i = 0; i < count; i++) {
        this.fireflies.push({
          baseX: i < 5 ? 40 + i * 14 : this.pixelWidth - 60 + (i - 5) * 12,
          baseY: 160 + (i % 5) * 20,
          offsetX: Math.random() * 20,
          offsetY: Math.random() * 20,
          phase: Math.random() * Math.PI * 2,
          speed: 0.8 + Math.random() * 1.2
        });
      }
    }

    // THE SIGNATURE FEATURE: Start animated Sunset (Day -> Night) or Sunrise (Night -> Day)
    toggleThemeTransition() {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      this.transitionDuration = prefersReducedMotion ? 1 : 2600;

      if (this.currentMode === 'day' || (this.isTransitioning && this.transitionType === 'sunrise')) {
        // Start Sunset Transition: Day -> Sunset -> Night!
        this.isTransitioning = true;
        this.transitionType = 'sunset';
        this.transitionStartTime = performance.now();
        this.transitionProgress = 0;
        this.updateThemeAttributes('dark');
        return 'dark';
      } else {
        // Start Sunrise Transition: Night -> Sunrise/Dawn -> Day!
        this.isTransitioning = true;
        this.transitionType = 'sunrise';
        this.transitionStartTime = performance.now();
        this.transitionProgress = 0;
        this.updateThemeAttributes('light');
        return 'light';
      }
    }

    updateThemeAttributes(themeAttr) {
      document.documentElement.setAttribute('data-theme', themeAttr);
      try {
        localStorage.setItem('af_theme', themeAttr);
      } catch (e) {}

      const isNight = themeAttr === 'dark';
      const statusText = isNight ? '[ Night ]' : '[ Day ]';

      const hudStatus = document.getElementById('time-hud-status');
      if (hudStatus) hudStatus.textContent = statusText;

      const mobileStatus = document.getElementById('mobile-hud-status');
      if (mobileStatus) mobileStatus.textContent = isNight ? 'Night' : 'Day';

      const hudBtn = document.getElementById('time-hud');
      if (hudBtn) {
        hudBtn.setAttribute('title', `Time of Day: currently ${isNight ? 'Night' : 'Day'}. Click to transition.`);
        hudBtn.setAttribute('aria-label', `Time of Day: ${isNight ? 'Night' : 'Day'}. Click to switch.`);
      }
    }

    // Compute active color palette depending on current state & transition progress
    getActivePalette() {
      if (!this.isTransitioning) {
        return this.currentMode === 'night' ? PALETTES.night : PALETTES.day;
      }

      const p = this.transitionProgress;
      let p1, p2, blend;

      if (this.transitionType === 'sunset') {
        // Day (0.0) -> Sunset (0.45) -> Dusk (0.75) -> Night (1.0)
        if (p < 0.48) {
          p1 = PALETTES.day;
          p2 = PALETTES.sunset;
          blend = p / 0.48;
        } else {
          p1 = PALETTES.sunset;
          p2 = PALETTES.night;
          blend = (p - 0.48) / 0.52;
        }
      } else {
        // Sunrise: Night (0.0) -> Dawn/Sunrise (0.48) -> Day (1.0)
        if (p < 0.48) {
          p1 = PALETTES.night;
          p2 = PALETTES.sunrise;
          blend = p / 0.48;
        } else {
          p1 = PALETTES.sunrise;
          p2 = PALETTES.day;
          blend = (p - 0.48) / 0.52;
        }
      }

      const res = {};
      const keys = Object.keys(PALETTES.day);
      for (const k of keys) {
        res[k] = lerpColor(p1[k], p2[k], blend);
      }
      return res;
    }

    // Main 60fps render loop
    render(now) {
      const dt = Math.min(now - this.lastFrame, 100);
      this.lastFrame = now;
      this.simTime += dt * 0.001;
      this.waveTime += dt * 0.0018;
      this.windTime += dt * 0.0022;

      // Process transition progress with smooth easing
      if (this.isTransitioning) {
        const elapsed = now - this.transitionStartTime;
        const raw = Math.min(1.0, elapsed / this.transitionDuration);
        
        // Smooth sinusoidal easing
        this.transitionProgress = 0.5 - 0.5 * Math.cos(raw * Math.PI);

        // Update live HUD text during transition stages
        const hudStatus = document.getElementById('time-hud-status');
        const mobileStatus = document.getElementById('mobile-hud-status');
        let stageText = '';
        if (this.transitionType === 'sunset') {
          if (raw < 0.25) stageText = 'Golden Hour';
          else if (raw < 0.65) stageText = 'Sunset';
          else if (raw < 0.85) stageText = 'Twilight';
          else stageText = 'Night';
        } else {
          if (raw < 0.25) stageText = 'Pre-Dawn';
          else if (raw < 0.65) stageText = 'Sunrise';
          else if (raw < 0.85) stageText = 'Daybreak';
          else stageText = 'Day';
        }
        if (hudStatus) hudStatus.textContent = `[ ${stageText} ]`;
        if (mobileStatus) mobileStatus.textContent = stageText;

        if (raw >= 1.0) {
          this.isTransitioning = false;
          this.currentMode = this.transitionType === 'sunset' ? 'night' : 'day';
          this.transitionType = null;
          this.transitionProgress = 0;
          this.updateThemeAttributes(this.currentMode === 'night' ? 'dark' : 'light');
        }
      }

      const p = this.getActivePalette();
      const ctx = this.bctx;
      const W = this.pixelWidth;
      const H = this.pixelHeight;
      const horizonY = Math.round(H * 0.57);

      // 1. SKY GRADIENT WITH 16-BIT BAYER PIXEL DITHERING
      this.drawSky(ctx, W, horizonY, p);

      // 2. CELESTIAL BODIES (SUN & MOON) WITH HORIZON SUBMERSION
      this.drawCelestial(ctx, W, horizonY, p);

      // 3. TWINKLING STARS & SHOOTING STARS
      this.drawStars(ctx, W, horizonY, p);

      // 4. DISTANT VOLCANIC ISLANDS & HORIZON HAZE
      this.drawDistantIslands(ctx, W, horizonY, p);

      // 5. DRIFTING PIXEL CLOUDS
      this.drawClouds(ctx, W, dt, p);

      // 6. THE TURQUOISE / MOONLIT OCEAN WITH SWELL WAVES & SPECULAR SHIMMER
      this.drawOcean(ctx, W, H, horizonY, p);

      // 7. GOLDEN / MOONLIT BEACH WITH ACTIVE SURF FOAM WASH
      this.drawBeachAndSurf(ctx, W, H, p);

      // 8. WILDLIFE (DAY GULLS & NIGHT FIREFLIES)
      this.drawWildlife(ctx, W, horizonY, dt, p);

      // 9. LUSH FRAMING COCONUT PALM TREES WITH HARMONIC WIND SWAY
      this.drawPalmTrees(ctx, W, H, p);

      // 10. BLIT BUFFER TO SCREEN CANVAS
      this.ctx.drawImage(this.buffer, 0, 0, this.canvas.width, this.canvas.height);

      requestAnimationFrame(time => this.render(time));
    }

    // 1. DRAW SKY WITH 16-BIT BAYER DITHERING
    drawSky(ctx, W, horizonY, p) {
      const bands = 18;
      const bandH = Math.ceil(horizonY / bands);

      for (let b = 0; b < bands; b++) {
        const t1 = b / bands;
        const yStart = b * bandH;
        const yEnd = Math.min(horizonY, (b + 1) * bandH);

        let c;
        if (t1 < 0.5) {
          c = lerpColor(p.skyZenith, p.skyMid, t1 * 2);
        } else {
          c = lerpColor(p.skyMid, p.skyHorizon, (t1 - 0.5) * 2);
        }

        ctx.fillStyle = rgbString(c);
        ctx.fillRect(0, yStart, W, yEnd - yStart);

        // 16-bit 2x2 Dither boundary
        if (b < bands - 1) {
          const nextT = (b + 1) / bands;
          let nextC = nextT < 0.5 
            ? lerpColor(p.skyZenith, p.skyMid, nextT * 2) 
            : lerpColor(p.skyMid, p.skyHorizon, (nextT - 0.5) * 2);

          ctx.fillStyle = rgbString(nextC);
          const ditherY = yEnd - 1;
          for (let x = 0; x < W; x += 2) {
            ctx.fillRect(x + (ditherY % 2), ditherY, 1, 1);
          }
        }
      }
    }

    // 2. CELESTIAL MECHANICS: SUN, MOON & ACCURATE HORIZON DIPPING
    drawCelestial(ctx, W, horizonY, p) {
      let sunVisible = false;
      let sunX = 0, sunY = 0;
      let moonVisible = false;
      let moonX = 0, moonY = 0, moonAlpha = 1.0;

      if (!this.isTransitioning) {
        if (this.currentMode === 'day') {
          sunVisible = true;
          sunX = Math.round(W * 0.72);
          sunY = Math.round(horizonY * 0.35);
          this.activeReflectionX = sunX;
          this.activeReflectionAlpha = 0.85;
          this.activeReflectionColor = p.reflectionColor;
        } else {
          moonVisible = true;
          moonX = Math.round(W * 0.75);
          moonY = Math.round(horizonY * 0.38);
          moonAlpha = 1.0;
          this.activeReflectionX = moonX;
          this.activeReflectionAlpha = 0.75;
          this.activeReflectionColor = p.reflectionColor;
        }
      } else if (this.transitionType === 'sunset') {
        const prog = this.transitionProgress;
        
        // 9-STAGE SUNSET CHOREOGRAPHY:
        // 1. Sun slowly descends towards the horizon (0.0 to 0.55)
        // 2. Sky transitions through golden amber, orange, magenta, and purple
        // 3. Sunlight gradually fades
        // 4. Ocean reflections burn in golden-orange
        // 5. Sun submerges below the horizon (0.48 to 0.56)
        // 6. Sky turns deep navy
        // 7. Stars gradually appear (0.50 to 0.90)
        // 8. Moon rises from horizon (0.55 to 1.0)
        // 9. Moonlight spreads silvery reflection across the sea (0.70 to 1.0)

        // Sun descent and horizon submersion
        if (prog < 0.60) {
          sunVisible = true;
          const sunDown = prog / 0.52; // reaches horizon at ~0.52
          sunX = Math.round(W * 0.72 - prog * 28);
          sunY = Math.round(horizonY * 0.35 + Math.pow(sunDown, 1.6) * (horizonY - horizonY * 0.35 + 10));
        }

        // Moon rise from below the horizon
        if (prog > 0.45) {
          moonVisible = true;
          const moonUp = (prog - 0.45) / 0.55;
          moonX = Math.round(W * 0.75 + (1 - moonUp) * 15);
          moonY = Math.round(horizonY + 12 - Math.sin(moonUp * Math.PI * 0.5) * (horizonY - horizonY * 0.38 + 12));
          moonAlpha = Math.min(1.0, moonUp * 1.6);
        }

        // Active ocean reflection interpolation
        if (prog < 0.52) {
          this.activeReflectionX = sunX;
          this.activeReflectionAlpha = Math.max(0.2, 0.9 - prog * 0.8);
          this.activeReflectionColor = p.reflectionColor;
        } else {
          this.activeReflectionX = moonX;
          this.activeReflectionAlpha = Math.min(0.8, (prog - 0.52) * 1.6);
          this.activeReflectionColor = PALETTES.night.reflectionColor;
        }

      } else if (this.transitionType === 'sunrise') {
        const prog = this.transitionProgress;

        // 6-STAGE SUNRISE CHOREOGRAPHY:
        // 1. Moon slowly descends toward the horizon (0.0 to 0.52)
        // 2. Stars gradually disappear (0.15 to 0.50)
        // 3. Sky transitions through purple, pink, coral, and orange sunrise colors
        // 4. Sun rises above the horizon (0.42 to 1.0)
        // 5. Golden sunlight returns
        // 6. Ocean returns to bright turquoise

        // Moon descent
        if (prog < 0.56) {
          moonVisible = true;
          const moonDown = prog / 0.50;
          moonX = Math.round(W * 0.75 - moonDown * 20);
          moonY = Math.round(horizonY * 0.38 + Math.pow(moonDown, 1.5) * (horizonY - horizonY * 0.38 + 14));
          moonAlpha = Math.max(0, 1.0 - moonDown * 1.2);
        }

        // Sun rise from below ocean horizon
        if (prog > 0.38) {
          sunVisible = true;
          const sunUp = (prog - 0.38) / 0.62;
          sunX = Math.round(W * 0.68 + sunUp * 20);
          sunY = Math.round(horizonY + 12 - Math.sin(sunUp * Math.PI * 0.5) * (horizonY - horizonY * 0.35 + 12));
        }

        // Active ocean reflection interpolation
        if (prog < 0.45) {
          this.activeReflectionX = moonX;
          this.activeReflectionAlpha = Math.max(0.1, 0.8 - prog * 1.5);
          this.activeReflectionColor = PALETTES.night.reflectionColor;
        } else {
          this.activeReflectionX = sunX;
          this.activeReflectionAlpha = Math.min(0.9, (prog - 0.45) * 1.7);
          this.activeReflectionColor = p.reflectionColor;
        }
      }

      // Draw Sun and Moon clipped to the sky area (so they realistically dip behind the horizon)
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, W, horizonY + 2); // Clipped at horizon line
      ctx.clip();

      if (sunVisible) {
        this.drawPixelSun(ctx, sunX, sunY, p);
      }

      if (moonVisible) {
        this.drawPixelMoon(ctx, moonX, moonY, moonAlpha, p);
      }

      ctx.restore();
    }

    drawPixelSun(ctx, cx, cy, p) {
      const radius = 10;
      ctx.fillStyle = rgbString(p.sunCorona, 0.35);
      ctx.fillRect(cx - radius - 5, cy - 2, (radius + 5) * 2, 4);
      ctx.fillRect(cx - 2, cy - radius - 5, 4, (radius + 5) * 2);

      ctx.fillStyle = rgbString(p.sunCorona);
      for (let dy = -radius; dy <= radius; dy++) {
        const span = Math.round(Math.sqrt(radius * radius - dy * dy));
        ctx.fillRect(cx - span, cy + dy, span * 2, 1);
      }

      const coreR = radius - 3;
      ctx.fillStyle = rgbString(p.sunCore);
      for (let dy = -coreR; dy <= coreR; dy++) {
        const span = Math.round(Math.sqrt(coreR * coreR - dy * dy));
        ctx.fillRect(cx - span, cy + dy, span * 2, 1);
      }

      // 4-point solar flare rays
      ctx.fillStyle = rgbString(p.sunRay, 0.85);
      ctx.fillRect(cx - radius - 7, cy, 5, 1);
      ctx.fillRect(cx + radius + 3, cy, 5, 1);
      ctx.fillRect(cx, cy - radius - 7, 1, 5);
      ctx.fillRect(cx, cy + radius + 3, 1, 5);
    }

    drawPixelMoon(ctx, cx, cy, alpha, p) {
      if (alpha <= 0.02) return;
      ctx.save();
      ctx.globalAlpha = Math.min(1.0, alpha);

      const r = 11;
      ctx.fillStyle = 'rgba(56, 189, 248, 0.18)';
      ctx.fillRect(cx - r - 4, cy - r - 4, (r + 4) * 2, (r + 4) * 2);

      ctx.fillStyle = '#f8fafc';
      for (let dy = -r; dy <= r; dy++) {
        const span = Math.round(Math.sqrt(r * r - dy * dy));
        ctx.fillRect(cx - span, cy + dy, span * 2, 1);
      }

      // 16-Bit Lunar Craters
      ctx.fillStyle = '#cbd5e1';
      ctx.fillRect(cx - 5, cy - 4, 4, 3);
      ctx.fillRect(cx - 1, cy - 6, 3, 2);
      ctx.fillRect(cx + 2, cy - 1, 3, 4);
      ctx.fillRect(cx - 4, cy + 3, 5, 3);

      ctx.fillStyle = '#94a3b8';
      ctx.fillRect(cx - 4, cy - 3, 2, 2);
      ctx.fillRect(cx + 3, cy, 2, 2);
      ctx.fillRect(cx - 3, cy + 4, 2, 2);

      // Crescent shadow on right
      ctx.fillStyle = 'rgba(15, 23, 42, 0.55)';
      for (let dy = -r; dy <= r; dy++) {
        const outerSpan = Math.round(Math.sqrt(r * r - dy * dy));
        const shadowStart = Math.round(outerSpan * 0.25);
        if (outerSpan > shadowStart) {
          ctx.fillRect(cx + shadowStart, cy + dy, outerSpan - shadowStart, 1);
        }
      }

      ctx.restore();
    }

    // 3. TWINKLING STARS & SHOOTING STARS
    drawStars(ctx, W, horizonY, p) {
      let nightFactor = 0;
      if (!this.isTransitioning) {
        nightFactor = this.currentMode === 'night' ? 1.0 : 0.0;
      } else if (this.transitionType === 'sunset') {
        // Step 7: Stars gradually appear as twilight deepens
        nightFactor = Math.max(0, (this.transitionProgress - 0.48) / 0.45);
      } else if (this.transitionType === 'sunrise') {
        // Step 2: Stars gradually disappear as dawn breaks
        nightFactor = Math.max(0, 1.0 - (this.transitionProgress / 0.48));
      }

      if (nightFactor <= 0.02) return;

      const time = this.simTime;
      ctx.save();
      for (const star of this.stars) {
        if (star.y >= horizonY - 4) continue;

        const twinkle = (Math.sin(time * star.speed + star.phase) + 1) * 0.5;
        const starAlpha = nightFactor * (0.35 + twinkle * 0.65);

        if (starAlpha <= 0.05) continue;

        if (star.colorType === 1) {
          ctx.fillStyle = `rgba(254, 240, 138, ${starAlpha.toFixed(2)})`;
        } else {
          ctx.fillStyle = `rgba(224, 242, 254, ${starAlpha.toFixed(2)})`;
        }

        const sx = star.x % W;
        ctx.fillRect(sx, star.y, 1, 1);

        if (star.size === 2 && twinkle > 0.65) {
          ctx.fillStyle = `rgba(255, 255, 255, ${(starAlpha * 0.6).toFixed(2)})`;
          ctx.fillRect(sx - 1, star.y, 3, 1);
          ctx.fillRect(sx, star.y - 1, 1, 3);
        }
      }

      // Occasional Shooting Star during deep night
      if (nightFactor > 0.8) {
        if (!this.shootingStar && time - this.lastShootingStarTime > 14) {
          this.shootingStar = {
            x: Math.random() * (W * 0.6) + W * 0.1,
            y: Math.random() * 40 + 10,
            vx: 3.5 + Math.random() * 2.0,
            vy: 1.8 + Math.random() * 1.2,
            life: 0,
            maxLife: 28
          };
          this.lastShootingStarTime = time;
        }

        if (this.shootingStar) {
          const ss = this.shootingStar;
          ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
          ctx.fillRect(Math.round(ss.x), Math.round(ss.y), 2, 2);

          ctx.fillStyle = 'rgba(186, 230, 253, 0.45)';
          for (let tr = 1; tr <= 4; tr++) {
            ctx.fillRect(Math.round(ss.x - ss.vx * tr * 0.6), Math.round(ss.y - ss.vy * tr * 0.6), 1, 1);
          }

          ss.x += ss.vx;
          ss.y += ss.vy;
          ss.life++;

          if (ss.life >= ss.maxLife || ss.y >= horizonY) {
            this.shootingStar = null;
          }
        }
      }

      ctx.restore();
    }

    // 4. DISTANT VOLCANIC ISLANDS & HORIZON HAZE
    drawDistantIslands(ctx, W, horizonY, p) {
      ctx.fillStyle = rgbString(p.island);
      const island1 = [
        [0.00, 0], [0.03, 4], [0.06, 9], [0.09, 15], [0.12, 19], 
        [0.14, 21], [0.16, 18], [0.19, 12], [0.22, 6], [0.25, 2], [0.28, 0]
      ];

      ctx.beginPath();
      ctx.moveTo(0, horizonY);
      for (const pt of island1) {
        ctx.lineTo(Math.round(pt[0] * W), horizonY - pt[1]);
      }
      ctx.lineTo(Math.round(0.28 * W), horizonY);
      ctx.closePath();
      ctx.fill();

      // Right island
      const island2 = [
        [0.72, 0], [0.75, 3], [0.78, 6], [0.81, 7], [0.84, 5], [0.87, 2], [0.89, 0]
      ];
      ctx.beginPath();
      ctx.moveTo(Math.round(0.72 * W), horizonY);
      for (const pt of island2) {
        ctx.lineTo(Math.round(pt[0] * W), horizonY - pt[1]);
      }
      ctx.lineTo(Math.round(0.89 * W), horizonY);
      ctx.closePath();
      ctx.fill();

      // Distant micro-palms
      ctx.fillStyle = rgbString(p.island);
      const palmX = Math.round(0.79 * W);
      ctx.fillRect(palmX, horizonY - 11, 1, 5);
      ctx.fillRect(palmX - 2, horizonY - 13, 5, 2);

      // Atmospheric Horizon Haze
      ctx.fillStyle = rgbString(p.islandHaze, 0.4);
      ctx.fillRect(0, horizonY - 2, W, 3);
    }

    // 5. DRIFTING 16-BIT PIXEL CLOUDS
    drawClouds(ctx, W, dt, p) {
      for (const c of this.clouds) {
        c.x += c.speed * dt * 0.15;
        if (c.x > W + 60) {
          c.x = -c.width - 20;
        }

        this.drawSinglePixelCloud(ctx, Math.round(c.x), Math.round(c.y), c.width, c.height, p);
      }
    }

    drawSinglePixelCloud(ctx, x, y, w, h, p) {
      const rBody = Math.round(h * 0.5);
      const cy = y + rBody;

      ctx.fillStyle = rgbString(p.cloudShadow, 0.85);
      ctx.fillRect(x + 6, cy + 2, w - 12, rBody - 2);

      ctx.fillStyle = rgbString(p.cloudBody, 0.95);
      ctx.fillRect(x + 4, cy - 3, w - 8, rBody + 2);
      ctx.fillRect(x + 12, cy - rBody, Math.round(w * 0.4), rBody + 2);
      ctx.fillRect(x + Math.round(w * 0.45), cy - Math.round(rBody * 1.3), Math.round(w * 0.35), rBody * 2);

      ctx.fillStyle = rgbString(p.cloudHighlight);
      ctx.fillRect(x + 14, cy - rBody, Math.round(w * 0.36), 2);
      ctx.fillRect(x + Math.round(w * 0.47), cy - Math.round(rBody * 1.3), Math.round(w * 0.31), 2);
      ctx.fillRect(x + 5, cy - 2, 8, 2);
    }

    // 6. THE OCEAN WITH PERSPECTIVE WAVES & SPECULAR CELESTIAL SHIMMER
    drawOcean(ctx, W, H, horizonY, p) {
      const oceanHeight = H - horizonY;
      const numRows = 24;
      const reflectionX = this.activeReflectionX || Math.round(W * 0.72);
      const reflAlpha = this.activeReflectionAlpha || 0.75;
      const reflCol = this.activeReflectionColor || p.reflectionColor;

      for (let r = 0; r < numRows; r++) {
        const depth = r / numRows;
        const yStart = horizonY + Math.round(Math.pow(depth, 1.35) * oceanHeight);
        const nextDepth = (r + 1) / numRows;
        const yEnd = horizonY + Math.round(Math.pow(nextDepth, 1.35) * oceanHeight);

        let waterColor;
        if (depth < 0.4) {
          waterColor = lerpColor(p.seaDeep, p.seaMid, depth / 0.4);
        } else {
          waterColor = lerpColor(p.seaMid, p.seaShallow, (depth - 0.4) / 0.6);
        }

        ctx.fillStyle = rgbString(waterColor);
        ctx.fillRect(0, yStart, W, yEnd - yStart);

        // Wave crest ridges
        const wavePhase = this.waveTime * 2.2 + r * 0.45;
        const waveCrest = Math.sin(wavePhase);

        if (waveCrest > 0.55 && yEnd - yStart >= 1) {
          ctx.fillStyle = rgbString(p.seaFoam, 0.4 + depth * 0.45);
          const step = Math.max(6, Math.round(18 - depth * 10));
          const offset = Math.round((wavePhase * 4) % step);
          for (let wx = offset; wx < W; wx += step) {
            const crestLen = Math.round(3 + depth * 7);
            ctx.fillRect(wx, yStart, crestLen, 1);
          }
        }

        // Specular Sun / Moon Reflection Path
        const spread = Math.round(8 + depth * 42);
        const glintOffset = Math.sin(this.waveTime * 3.5 + r * 0.7);

        if (Math.abs(glintOffset) > 0.2) {
          ctx.fillStyle = rgbString(reflCol, reflAlpha * (0.35 + (1 - Math.abs(depth - 0.5)) * 0.55));
          const minX = Math.max(0, reflectionX - spread);
          const maxX = Math.min(W, reflectionX + spread);
          for (let gx = minX; gx < maxX; gx += 4) {
            if ((gx + r) % 3 === 0) {
              ctx.fillRect(gx, yStart, 2, 1);
            }
          }
        }
      }

      // Mouse interactivity glints
      if (this.mouse.active && this.mouse.y >= horizonY && this.mouse.y < H - 30) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
        const mx = Math.round(this.mouse.x);
        const my = Math.round(this.mouse.y);
        ctx.fillRect(mx - 2, my, 5, 1);
        ctx.fillRect(mx, my - 2, 1, 5);
      }
    }

    // 7. GOLDEN / MOONLIT SAND DUNES & ACTIVE SHORELINE SURF FOAM WASH
    drawBeachAndSurf(ctx, W, H, p) {
      const shorePoints = [];
      const numSegments = 32;
      for (let i = 0; i <= numSegments; i++) {
        const u = i / numSegments;
        const sx = Math.round(u * W);
        const sy = Math.round(H * 0.73 + Math.sin(u * Math.PI * 0.85) * (H * 0.12) + (u * 14));
        shorePoints.push({ x: sx, y: sy });
      }

      const surfCycle = (this.waveTime * 0.8) % (Math.PI * 2);
      const surge = Math.max(0, Math.sin(surfCycle));
      const surgeReach = Math.round(surge * 14);

      // Wet sand wash layer
      ctx.fillStyle = rgbString(p.sandWet);
      ctx.beginPath();
      ctx.moveTo(0, H);
      for (let i = 0; i < shorePoints.length; i++) {
        const pt = shorePoints[i];
        ctx.lineTo(pt.x, pt.y - surgeReach);
      }
      ctx.lineTo(W, H);
      ctx.closePath();
      ctx.fill();

      // Main beach sand
      ctx.fillStyle = rgbString(p.sandDry);
      ctx.beginPath();
      ctx.moveTo(0, H);
      for (let i = 0; i < shorePoints.length; i++) {
        const pt = shorePoints[i];
        ctx.lineTo(pt.x, pt.y + 3);
      }
      ctx.lineTo(W, H);
      ctx.closePath();
      ctx.fill();

      // Sand texture
      ctx.fillStyle = rgbString(p.sandShadow);
      for (let i = 0; i < shorePoints.length - 1; i++) {
        const pt = shorePoints[i];
        if (i % 2 === 0) {
          ctx.fillRect(pt.x, pt.y + 4, 3, 1);
          ctx.fillRect(pt.x + 1, pt.y + 6, 2, 1);
        }
      }

      // Beach pebbles / seashells
      const pebbleCoords = [
        [0.15, 0.86], [0.32, 0.89], [0.55, 0.87], [0.78, 0.92], [0.88, 0.90]
      ];
      ctx.fillStyle = rgbString(p.sandShadow);
      for (const pcoord of pebbleCoords) {
        const px = Math.round(pcoord[0] * W);
        const py = Math.round(pcoord[1] * H);
        ctx.fillRect(px, py, 2, 1);
        ctx.fillRect(px, py + 1, 1, 1);
      }

      // Frothy Surf Foam Crest
      ctx.fillStyle = rgbString(p.seaFoam);
      for (let i = 0; i < shorePoints.length; i++) {
        const pt = shorePoints[i];
        const foamY = pt.y - surgeReach;
        const foamH = Math.round(2 + surge * 2);

        ctx.fillRect(pt.x, foamY, 4, foamH);

        if (i % 3 === 0 && surge > 0.3) {
          ctx.fillRect(pt.x + 1, foamY + 2, 2, 1);
        }
      }
    }

    // 8. WILDLIFE: DAYTIME GULLS & NIGHTTIME FIREFLIES
    drawWildlife(ctx, W, horizonY, dt, p) {
      let isDaytime = this.currentMode === 'day';
      if (this.isTransitioning) {
        if (this.transitionType === 'sunset') isDaytime = this.transitionProgress < 0.52;
        else if (this.transitionType === 'sunrise') isDaytime = this.transitionProgress > 0.48;
      }

      if (isDaytime) {
        ctx.fillStyle = rgbString(p.cloudHighlight);
        for (const g of this.gulls) {
          g.x += g.vx * dt * 0.08;
          g.y += g.vy * dt * 0.08;
          g.flap += dt * 0.006;

          if (g.x > W + 20) g.x = -15;
          if (g.x < -20) g.x = W + 15;

          const gx = Math.round(g.x);
          const gy = Math.round(g.y);
          const wingY = Math.sin(g.flap) > 0 ? 1 : -1;

          ctx.fillRect(gx, gy, 1, 1);
          ctx.fillRect(gx - 2, gy + wingY, 2, 1);
          ctx.fillRect(gx + 1, gy + wingY, 2, 1);
        }
      } else {
        // Fireflies at night
        for (const ff of this.fireflies) {
          ff.phase += ff.speed * dt * 0.003;
          const fx = Math.round(ff.baseX + Math.sin(ff.phase) * 16);
          const fy = Math.round(ff.baseY + Math.cos(ff.phase * 1.3) * 12);
          const pulse = (Math.sin(ff.phase * 2.2) + 1) * 0.5;

          if (pulse > 0.25) {
            ctx.fillStyle = `rgba(163, 230, 53, ${(pulse * 0.85).toFixed(2)})`;
            ctx.fillRect(fx, fy, 2, 2);

            ctx.fillStyle = `rgba(163, 230, 53, ${(pulse * 0.3).toFixed(2)})`;
            ctx.fillRect(fx - 1, fy, 4, 2);
            ctx.fillRect(fx, fy - 1, 2, 4);
          }
        }
      }
    }

    // 9. LUSH FRAMING COCONUT PALM TREES WITH HARMONIC WIND SWAY
    drawPalmTrees(ctx, W, H, p) {
      const windSway = Math.sin(this.windTime * 2.0);

      // Left Master Palm
      this.drawCurvedPalm(
        ctx,
        {
          rootX: -10,
          rootY: H + 10,
          crownX: Math.round(W * 0.15 + windSway * 3),
          crownY: Math.round(H * 0.18),
          trunkThickness: 7,
          isLeft: true
        },
        windSway,
        p
      );

      // Right Secondary Palm
      this.drawCurvedPalm(
        ctx,
        {
          rootX: W + 15,
          rootY: H + 10,
          crownX: Math.round(W * 0.88 + windSway * 2),
          crownY: Math.round(H * 0.22),
          trunkThickness: 6,
          isLeft: false
        },
        windSway,
        p
      );
    }

    drawCurvedPalm(ctx, cfg, windSway, p) {
      const { rootX, rootY, crownX, crownY, trunkThickness, isLeft } = cfg;

      // 1. Draw Trunk with Segmented Bark Rings
      const trunkSteps = 24;
      for (let s = 0; s < trunkSteps; s++) {
        const u = s / trunkSteps;
        const controlX = isLeft ? rootX + 50 : rootX - 50;
        const controlY = rootY - (rootY - crownY) * 0.55;

        const tx = Math.round((1 - u) * (1 - u) * rootX + 2 * (1 - u) * u * controlX + u * u * crownX);
        const ty = Math.round((1 - u) * (1 - u) * rootY + 2 * (1 - u) * u * controlY + u * u * crownY);
        const thick = Math.round(trunkThickness * (1 - u * 0.35));

        ctx.fillStyle = rgbString(p.palmTrunkDark);
        ctx.fillRect(tx - thick, ty, thick * 2, 3);

        ctx.fillStyle = rgbString(p.palmTrunkLight);
        const highOffset = isLeft ? 1 : -thick + 1;
        ctx.fillRect(tx + highOffset, ty, Math.max(1, Math.round(thick * 0.6)), 2);
      }

      // 2. Draw Crown Fronds
      const frondAngles = isLeft 
        ? [-0.75, -0.45, -0.15, 0.15, 0.45, 0.85, 1.15]
        : [-1.15, -0.85, -0.45, -0.15, 0.15, 0.45, 0.75];

      for (let f = 0; f < frondAngles.length; f++) {
        const baseAngle = frondAngles[f];
        const frondSway = Math.sin(this.windTime * 2.5 + f * 0.8) * 0.08;
        const finalAngle = baseAngle + frondSway;
        const frondLength = 48 + (f % 3) * 8;

        this.drawSinglePalmFrond(ctx, crownX, crownY, finalAngle, frondLength, p, isLeft);
      }

      // Coconut Cluster
      ctx.fillStyle = rgbString(p.palmTrunkDark);
      ctx.fillRect(crownX - 4, crownY - 3, 8, 6);
      ctx.fillStyle = rgbString(p.palmDark);
      ctx.fillRect(crownX - 2, crownY - 5, 4, 4);
    }

    drawSinglePalmFrond(ctx, startX, startY, angle, length, p, isLeft) {
      const steps = 18;
      const spine = [];

      let curX = startX;
      let curY = startY;
      let curAngle = angle;

      for (let i = 0; i <= steps; i++) {
        const u = i / steps;
        spine.push({ x: Math.round(curX), y: Math.round(curY), u });

        curAngle += (isLeft ? 0.06 : -0.06) * u;
        curX += Math.cos(curAngle) * (length / steps);
        curY += Math.sin(curAngle) * (length / steps) + (u * u * 1.5);
      }

      // Leaflets
      for (let i = 2; i < spine.length; i++) {
        const pt = spine[i];
        const leafletSpan = Math.round(Math.sin(pt.u * Math.PI) * 9);

        ctx.fillStyle = rgbString(p.palmDark);
        ctx.fillRect(pt.x - leafletSpan, pt.y + 1, leafletSpan * 2, 1);

        ctx.fillStyle = rgbString(p.palmMid);
        ctx.fillRect(pt.x - leafletSpan + 1, pt.y, leafletSpan * 2 - 2, 1);

        if (i % 2 === 0) {
          ctx.fillStyle = rgbString(p.palmLight);
          ctx.fillRect(pt.x - Math.round(leafletSpan * 0.6), pt.y - 1, Math.round(leafletSpan * 1.2), 1);
        }
      }

      // Spine stem
      ctx.fillStyle = rgbString(p.palmLight);
      for (let i = 0; i < spine.length; i++) {
        ctx.fillRect(spine[i].x, spine[i].y, 1, 1);
      }
    }
  }

  // Mount globally on DOM ready
  window.addEventListener('DOMContentLoaded', () => {
    window.pixelWorld = new PixelWorld();
  });

})();
