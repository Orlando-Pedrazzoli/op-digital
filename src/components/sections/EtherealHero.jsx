import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SECTIONS = [
  {
    id: 'hero',
    headline: 'Pedrazzoli',
    subheadline: 'Digital',
    body: 'Sites e lojas online sob medida que realmente geram vendas.',
  },
  {
    id: 'sites',
    headline: 'Sites',
    subheadline: 'Profissionais',
    body: 'Design moderno, código próprio, SEO otimizado e performance máxima. Sem templates.',
  },
  {
    id: 'ecommerce',
    headline: 'E-Commerce',
    subheadline: 'Completo',
    body: 'Lojas virtuais com carrinho, checkout, Pagar.me/Stripe e painel de gestão.',
  },
  {
    id: 'design',
    headline: 'Design',
    subheadline: '& Branding',
    body: 'UI/UX, identidade visual, logotipos e protótipos interativos pensados para conversão.',
  },
  {
    id: 'framer',
    headline: 'Framer',
    subheadline: 'Development',
    body: 'Landing pages e portfólios animados de alta performance com Framer.',
  },
  {
    id: 'contact',
    headline: 'Vamos',
    subheadline: 'Criar Juntos',
    body: 'Do briefing ao deploy — fale direto comigo, sem agência no meio.',
  },
];

const COLOR_PALETTE = {
  primary: '#16a34a',
  secondary: '#22c55e',
  tertiary: '#059669',
  accent: '#4ade80',
  dark: '#141735',
};

const paletteGLSL = `
  vec3 cosPalette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b*cos(6.28318*(c*t + d));
  }
`;

const vertexShader = `
  varying vec2 vUv;
  varying vec3 vWorldPos;
  varying vec3 vNormal;
  varying float vDist;

  uniform float uTime;
  uniform vec2  uMouse;
  uniform float uScrollProgress;
  uniform float uScrollVelocity;
  uniform float uSectionT;

  vec3 mod289(vec3 x){ return x - floor(x*(1.0/289.0))*289.0; }
  vec4 mod289(vec4 x){ return x - floor(x*(1.0/289.0))*289.0; }
  vec4 permute(vec4 x){ return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314*r; }

  float snoise(vec3 v){
    const vec2  C = vec2(1.0/6.0, 1.0/3.0);
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g  = step(x0.yzx, x0.xyz);
    vec3 l  = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3  ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0*floor(p*ns.z*ns.z);
    vec4 x_ = floor(j*ns.z);
    vec4 y_ = floor(j - 7.0*x_);
    vec4 x = x_*ns.x + ns.yyyy;
    vec4 y = y_*ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1),
                                   dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1),
                            dot(x2,x2), dot(x3,x3)), 0.0);
    m = m*m;
    return 42.0*dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                dot(p2,x2), dot(p3,x3) ) );
  }

  float fbm(vec3 p){
    float v = 0.0;
    float a = 0.5;
    for(int i=0;i<5;i++){
      v += a * snoise(p);
      p *= 2.0;
      a *= 0.5;
    }
    return v;
  }

  void main(){
    vUv = uv;
    vec3 pos = position;
    vec3 p = pos * 1.1;
    float t = uTime * 0.25;
    float warp1 = fbm(p + vec3(t, -t, t*0.5));
    float warp2 = snoise(p*2.0 + vec3(-t*0.7, t*0.9, t*0.2));
    float warp = warp1*0.25 + warp2*0.1;
    float twist = uScrollVelocity * 0.6;
    float angle = pos.y * twist;
    mat2 R = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
    pos.xz = R * pos.xz;
    float ridge = max(0.0, 1.0 - abs(snoise(p*1.5)));
    float disp = warp + ridge*0.15;
    vDist = disp;
    pos += normal * disp;
    vec4 world = modelMatrix * vec4(pos,1.0);
    vWorldPos = world.xyz;
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

const createFragmentShader = () => `
  precision highp float;

  varying vec2 vUv;
  varying vec3 vWorldPos;
  varying vec3 vNormal;
  varying float vDist;

  uniform float uTime;
  uniform float uScrollProgress;
  uniform float uSectionIndex;
  uniform vec2  uMouse;

  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  uniform vec3 uAccent;

  ${paletteGLSL}

  float saturate(float x){ return clamp(x,0.0,1.0); }

  vec3 normalFromDerivatives(vec3 p){
    vec3 dx = dFdx(p);
    vec3 dy = dFdy(p);
    return normalize(cross(dx,dy));
  }

  vec3 F_Schlick(float cosTheta, vec3 F0){
    return F0 + (1.0 - F0)*pow(1.0 - cosTheta, 5.0);
  }

  float D_GGX(float NdotH, float rough){
    float a = rough*rough;
    float a2 = a*a;
    float d = (NdotH*NdotH)*(a2 - 1.0) + 1.0;
    return a2 / (3.14159 * d * d);
  }

  float G_SchlickGGX(float NdotV, float rough){
    float r = rough + 1.0;
    float k = (r*r)/8.0;
    return NdotV / (NdotV*(1.0 - k) + k);
  }

  float G_Smith(float NdotV, float NdotL, float rough){
    return G_SchlickGGX(NdotV, rough) * G_SchlickGGX(NdotL, rough);
  }

  vec3 envGradient(vec3 r, vec3 skyA, vec3 skyB, vec3 ground){
    float h = r.y * 0.5 + 0.5;
    vec3 sky = mix(skyB, skyA, h);
    return mix(ground, sky, saturate(h*1.2));
  }

  float gradParam(vec2 uv, float time){
    vec2 q = uv*2.0 - 1.0;
    q.x *= 1.2;
    float a = sin(q.x*2.5 + time*0.25);
    float b = cos(q.y*3.0 - time*0.2);
    return saturate(0.5 + 0.5*(a*0.6 + b*0.4));
  }

  void main(){
    vec3 N = normalFromDerivatives(vWorldPos);
    vec3 V = normalize(cameraPosition - vWorldPos);

    float t = uTime*0.6;
    vec3 L1pos = vec3( 6.0*sin(t*0.7),  4.0,  6.0*cos(t*0.7));
    vec3 L2pos = vec3(-5.0*cos(t*0.5), -3.5, 5.0*sin(t*0.45));
    vec3 L3pos = vec3( 0.0,  6.0*sin(t*0.25), -6.0);

    vec3 L1 = normalize(L1pos - vWorldPos);
    vec3 L2 = normalize(L2pos - vWorldPos);
    vec3 L3 = normalize(L3pos - vWorldPos);

    float gp = gradParam(vUv, uTime) + vDist*0.6;
    float sectionMix = clamp(uSectionIndex/5.0, 0.0, 1.0);

    vec3 palA = cosPalette(
      gp,
      vec3(0.35,0.55,0.38),
      vec3(0.25,0.45,0.25),
      vec3(0.85,0.90,0.70),
      vec3(0.00,0.25,0.15)
    );

    vec3 palB = cosPalette(
      gp + 0.15*sin(uTime*0.25),
      vec3(0.30,0.56,0.38),
      vec3(0.20,0.50,0.35),
      vec3(0.80,0.65,0.75),
      vec3(0.15,0.10,0.30)
    );

    vec3 baseAlbedo = mix(palA, palB, sectionMix);
    baseAlbedo = mix(baseAlbedo, uColor1, 0.20);
    baseAlbedo = mix(baseAlbedo, uColor2, 0.12);

    float metallic = 0.25 + 0.15*sin(uTime*0.2 + gp*3.0);
    float rough    = clamp(0.18 + 0.12*sin(gp*6.283 + uTime*0.35), 0.06, 0.6);

    vec3 F0 = mix(vec3(0.04), baseAlbedo, metallic);

    vec3 H1 = normalize(V + L1);
    vec3 H2 = normalize(V + L2);
    vec3 H3 = normalize(V + L3);

    float NdotV = saturate(dot(N,V));
    float NdotL1= saturate(dot(N,L1));
    float NdotL2= saturate(dot(N,L2));
    float NdotL3= saturate(dot(N,L3));

    float NdotH1= saturate(dot(N,H1));
    float NdotH2= saturate(dot(N,H2));
    float NdotH3= saturate(dot(N,H3));

    float D1 = D_GGX(NdotH1, rough);
    float D2 = D_GGX(NdotH2, rough);
    float D3 = D_GGX(NdotH3, rough);

    float G1 = G_Smith(NdotV, NdotL1, rough);
    float G2 = G_Smith(NdotV, NdotL2, rough);
    float G3 = G_Smith(NdotV, NdotL3, rough);

    vec3  F1 = F_Schlick(saturate(dot(V,H1)), F0);
    vec3  F2 = F_Schlick(saturate(dot(V,H2)), F0);
    vec3  F3 = F_Schlick(saturate(dot(V,H3)), F0);

    vec3 spec1 = (D1*G1*F1) / max(4.0*NdotV*NdotL1, 0.001);
    vec3 spec2 = (D2*G2*F2) / max(4.0*NdotV*NdotL2, 0.001);
    vec3 spec3 = (D3*G3*F3) / max(4.0*NdotV*NdotL3, 0.001);

    vec3 kS = F_Schlick(NdotV, F0);
    vec3 kD = (vec3(1.0) - kS) * (1.0 - metallic);

    vec3 diffuse = baseAlbedo / 3.14159;

    vec3 c1 = vec3(1.0);
    vec3 c2 = mix(uColor3, vec3(0.9,0.95,1.0), 0.6);
    vec3 c3 = mix(uAccent, vec3(1.0,0.9,0.75), 0.5);

    vec3 direct =
      (kD*diffuse + spec1) * c1 * NdotL1 * 0.9 +
      (kD*diffuse + spec2) * c2 * NdotL2 * 0.6 +
      (kD*diffuse + spec3) * c3 * NdotL3 * 0.5;

    vec3 R = reflect(-V, N);
    vec3 env = envGradient(R,
      vec3(0.08,0.14,0.10),
      vec3(0.03,0.06,0.05),
      vec3(0.01,0.02,0.012)
    );
    vec3 Fenv = F_Schlick(saturate(dot(N,V)), F0);
    vec3 envSpec = Fenv * env * (1.0 - rough) * 0.6;

    float rim = pow(1.0 - saturate(dot(N,V)), 2.0);
    vec3 rimCol = mix(uAccent, uColor3, 0.4) * rim * 0.35;

    vec3 glow = mix(uAccent, uColor3, 0.5) * abs(vDist) * 0.25;

    vec3 color = direct + envSpec + rimCol + glow;

    float pattern = sin(vUv.x*40.0 + uTime) * sin(vUv.y*38.0 - uTime);
    color += pattern * 0.015;

    color = clamp(color, 0.0, 4.0);
    gl_FragColor = vec4(color, 1.0 - uScrollProgress*0.12);
  }
`;

const cinematicPostShader = {
  uniforms: {
    tDiffuse: { value: null },
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2() },
    uTemperature: { value: 0.04 },
    uTint: { value: 0.05 },
    uContrast: { value: 1.06 },
    uSaturation: { value: 1.05 },
    uVignette: { value: 0.35 },
    uAberration: { value: 0.0018 },
    uGrain: { value: 0.22 },
    uLetterbox: { value: 0.6 },
  },
  vertexShader: `
    varying vec2 vUv;
    void main(){
      vUv = uv;
      gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0);
    }
  `,
  fragmentShader: `
    precision highp float;
    varying vec2 vUv;
    uniform sampler2D tDiffuse;
    uniform float uTime;
    uniform vec2  uResolution;
    uniform float uTemperature, uTint, uContrast, uSaturation, uVignette, uAberration, uGrain, uLetterbox;

    float rand(vec2 co){ return fract(sin(dot(co, vec2(12.9898,78.233))) * 43758.5453); }

    vec3 aces(vec3 x){
      float a=2.51,b=0.03,c=2.43,d=0.59,e=0.14;
      return clamp((x*(a*x+b))/(x*(c*x+d)+e),0.0,1.0);
    }

    vec3 tempTint(vec3 c, float temp, float tint){
      c.r += temp*0.2;
      c.b -= temp*0.2;
      c.g += tint*0.15;
      return c;
    }

    vec3 satContrast(vec3 c, float sat, float con){
      vec3 g = vec3(dot(c, vec3(0.299,0.587,0.114)));
      c = mix(g, c, sat);
      c = (c - 0.5)*con + 0.5;
      return c;
    }

    void main(){
      vec2 p = vUv - 0.5;
      vec2 dir = normalize(p + 1e-6);
      float dist = length(p);
      vec2 off = dir * uAberration * dist;

      float r = texture2D(tDiffuse, vUv + off).r;
      float g = texture2D(tDiffuse, vUv).g;
      float b = texture2D(tDiffuse, vUv - off).b;
      vec3 col = vec3(r,g,b);

      float n = rand(vUv*vec2(uResolution.x, uResolution.y) + uTime*60.0) - 0.5;
      col += n * uGrain * 0.08;

      col = tempTint(col, uTemperature, uTint);
      col = satContrast(col, uSaturation, uContrast);

      float vig = smoothstep(0.85, 0.2, dist);
      col *= mix(1.0, vig, uVignette);

      float bar = smoothstep(uLetterbox, 0.0, abs(vUv.y - 0.5));
      col *= bar;

      col = aces(col);
      col = pow(col, vec3(1.0/2.2));

      gl_FragColor = vec4(col, 1.0);
    }
  `,
};

/* ─── Calcula Z da câmera baseado na largura da tela ─── */
function getCameraZ() {
  const vw = window.innerWidth;
  if (vw < 480) return 7.5; // mobile — afasta bastante
  if (vw < 768) return 6.5; // tablet pequeno
  if (vw < 1024) return 5.8; // tablet
  return 5; // desktop — valor original
}

export default function EtherealHero() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const meshRef = useRef(null);
  const composerRef = useRef(null);
  const sectionsRef = useRef([]);
  const progressRef = useRef(null);

  const scrollRef = useRef({
    progress: 0,
    velocity: 0,
    rotation: { x: 0, y: 0 },
  });
  const mouseRef = useRef({ x: 0.5, y: 0.5, sx: 0.5, sy: 0.5 });

  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  // Initialize Three.js
  useEffect(() => {
    if (!canvasRef.current) return;

    let scene, camera, renderer, composer;
    let mesh;
    const clock = new THREE.Clock();
    let frameId;

    const init = () => {
      scene = new THREE.Scene();

      camera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        0.1,
        100,
      );
      camera.position.set(0, 0, getCameraZ());

      renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        antialias: true,
        alpha: true,
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.0;

      const geometry = new THREE.IcosahedronGeometry(1.85, 5);

      const material = new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uMouse: { value: new THREE.Vector2(0.5, 0.5) },
          uScrollProgress: { value: 0 },
          uScrollVelocity: { value: 0 },
          uSectionT: { value: 0 },
          uSectionIndex: { value: 0 },
          uColor1: { value: new THREE.Color(COLOR_PALETTE.primary) },
          uColor2: { value: new THREE.Color(COLOR_PALETTE.secondary) },
          uColor3: { value: new THREE.Color(COLOR_PALETTE.tertiary) },
          uAccent: { value: new THREE.Color(COLOR_PALETTE.accent) },
        },
        vertexShader,
        fragmentShader: createFragmentShader(),
        transparent: true,
        side: THREE.DoubleSide,
      });

      mesh = new THREE.Mesh(geometry, material);
      meshRef.current = mesh;
      scene.add(mesh);

      composer = new EffectComposer(renderer);
      composer.addPass(new RenderPass(scene, camera));

      const bloom = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        0.7,
        0.35,
        0.92,
      );
      composer.addPass(bloom);

      const cinePass = new ShaderPass(cinematicPostShader);
      cinePass.uniforms.uResolution.value.set(
        window.innerWidth,
        window.innerHeight,
      );
      composer.addPass(cinePass);

      composerRef.current = composer;
      setIsLoaded(true);

      const animate = () => {
        frameId = requestAnimationFrame(animate);
        const t = clock.getElapsedTime();

        if (mesh) {
          mesh.material.uniforms.uTime.value = t;

          mouseRef.current.sx +=
            (mouseRef.current.x - mouseRef.current.sx) * 0.1;
          mouseRef.current.sy +=
            (mouseRef.current.y - mouseRef.current.sy) * 0.1;
          mesh.material.uniforms.uMouse.value.set(
            mouseRef.current.sx,
            mouseRef.current.sy,
          );

          mesh.material.uniforms.uScrollProgress.value =
            scrollRef.current.progress;
          mesh.material.uniforms.uScrollVelocity.value =
            scrollRef.current.velocity;

          mesh.rotation.x = scrollRef.current.rotation.x;
          mesh.rotation.y = scrollRef.current.rotation.y;

          if (Math.abs(scrollRef.current.velocity) < 0.01) {
            mesh.position.y = Math.sin(t * 0.45) * 0.06;
          } else {
            mesh.position.y *= 0.9;
          }
        }

        const lastPass = composer.passes[composer.passes.length - 1];
        if (lastPass?.uniforms?.uTime) lastPass.uniforms.uTime.value = t;

        composer.render();
      };

      animate();

      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.position.z = getCameraZ();
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        composer.setSize(window.innerWidth, window.innerHeight);
        const lastPass = composer.passes[composer.passes.length - 1];
        if (lastPass?.uniforms?.uResolution) {
          lastPass.uniforms.uResolution.value.set(
            window.innerWidth,
            window.innerHeight,
          );
        }
      };
      window.addEventListener('resize', onResize);

      return () => {
        window.removeEventListener('resize', onResize);
        if (frameId) cancelAnimationFrame(frameId);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
      };
    };

    const cleanup = init();
    return cleanup;
  }, []);

  // Scroll logic
  useEffect(() => {
    if (!isLoaded) return;

    let lastY = window.scrollY;
    let velTimeout;

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: self => {
        scrollRef.current.progress = self.progress;

        const y = window.scrollY;
        const vel = (y - lastY) * 0.01;
        lastY = y;
        scrollRef.current.velocity = THREE.MathUtils.clamp(vel, -1, 1);

        gsap.to(scrollRef.current.rotation, {
          x: self.progress * Math.PI * 3.0,
          y: self.progress * Math.PI * 4.5,
          duration: 0.3,
          ease: 'power2.out',
        });

        clearTimeout(velTimeout);
        velTimeout = setTimeout(() => {
          gsap.to(scrollRef.current, {
            velocity: 0,
            duration: 0.5,
            ease: 'power2.out',
          });
        }, 120);

        if (progressRef.current) {
          gsap.to(progressRef.current, {
            scaleY: self.progress,
            duration: 0.12,
          });
        }
      },
    });

    SECTIONS.forEach((section, idx) => {
      const el = sectionsRef.current[idx];
      if (!el) return;

      gsap.fromTo(
        el.querySelectorAll(
          '.section-headline, .section-subheadline, .section-body',
        ),
        { opacity: 0, y: 80, rotationX: -10 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1,
          stagger: 0.15,
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1,
          },
        },
      );

      ScrollTrigger.create({
        trigger: el,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => {
          setActiveSection(idx);
          if (meshRef.current) {
            gsap.to(meshRef.current.material.uniforms.uSectionIndex, {
              value: idx,
              duration: 1.2,
              ease: 'power2.inOut',
            });
            gsap.fromTo(
              meshRef.current.material.uniforms.uSectionT,
              { value: 0 },
              {
                value: 1,
                duration: 0.5,
                ease: 'power2.in',
                yoyo: true,
                repeat: 1,
              },
            );
          }
        },
        onEnterBack: () => {
          setActiveSection(idx);
          if (meshRef.current) {
            gsap.to(meshRef.current.material.uniforms.uSectionIndex, {
              value: idx,
              duration: 1.2,
              ease: 'power2.inOut',
            });
          }
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [isLoaded]);

  // Mouse + Touch
  useEffect(() => {
    const onMove = e => {
      mouseRef.current.x = e.clientX / window.innerWidth;
      mouseRef.current.y = 1 - e.clientY / window.innerHeight;
    };
    const onTouch = e => {
      if (e.touches.length > 0) {
        mouseRef.current.x = e.touches[0].clientX / window.innerWidth;
        mouseRef.current.y = 1 - e.touches[0].clientY / window.innerHeight;
      }
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onTouch, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onTouch);
    };
  }, []);

  return (
    <div ref={containerRef} className='ethereal-hero'>
      {/* Sticky canvas — stays fixed while scrolling inside ethereal-hero, then releases */}
      <div className='ethereal-canvas-wrapper'>
        <canvas ref={canvasRef} className='ethereal-canvas' />
      </div>

      {/* Scroll progress bar */}
      <div className='ethereal-progress'>
        <div ref={progressRef} className='ethereal-progress-bar' />
      </div>

      {/* Sections */}
      {SECTIONS.map((section, index) => (
        <section
          key={section.id}
          ref={el => (sectionsRef.current[index] = el)}
          className={`ethereal-section ${index === SECTIONS.length - 1 ? 'ethereal-section--last' : ''}`}
          data-section={index}
        >
          <div className='ethereal-section-content'>
            <h1 className='section-headline'>{section.headline}</h1>
            <h2 className='section-subheadline'>{section.subheadline}</h2>
            <p className='section-body'>{section.body}</p>
          </div>
        </section>
      ))}

      {/* Loading overlay */}
      <div className={`ethereal-loading ${isLoaded ? 'ethereal-loaded' : ''}`}>
        <div className='ethereal-loading-text'>Carregando...</div>
      </div>
    </div>
  );
}
