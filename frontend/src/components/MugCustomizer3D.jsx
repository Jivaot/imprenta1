import React from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  ContactShadows,
  Environment,
  Html,
  Lightformer,
  OrbitControls,
  PerspectiveCamera,
  useGLTF,
} from '@react-three/drei';
import * as THREE from 'three';
import {
  FiCamera,
  FiDownload,
  FiImage,
  FiRefreshCw,
  FiRotateCw,
  FiType,
  FiUploadCloud,
} from 'react-icons/fi';

const TEXTURE_WIDTH = 3072;
const TEXTURE_HEIGHT = 1536;
const PRINT_AREA = {
  x: 72,
  y: 60,
  width: 2928,
  height: 1416,
  radius: 68,
};

// Keep uploaded artwork inside the front-visible face of the mug so it does not
// appear cropped by the side curvature in the default preview.
const FRONT_ARTWORK_AREA = {
  widthRatio: 0.52,
  heightRatio: 0.72,
  topOffsetRatio: 0.14,
  textBaselineRatio: 0.8,
};

const CAMERA_VIEWS = {
  front: {
    position: new THREE.Vector3(0.22, 0.32, 9.1),
    target: new THREE.Vector3(-0.18, 0.06, 0),
  },
  angle: {
    position: new THREE.Vector3(5.3, 0.72, 8.15),
    target: new THREE.Vector3(-0.18, 0.06, 0),
  },
};

const drawRoundedRectPath = (context, x, y, width, height, radius) => {
  const safeRadius = Math.min(radius, width / 2, height / 2);
  context.beginPath();
  context.moveTo(x + safeRadius, y);
  context.lineTo(x + width - safeRadius, y);
  context.quadraticCurveTo(x + width, y, x + width, y + safeRadius);
  context.lineTo(x + width, y + height - safeRadius);
  context.quadraticCurveTo(x + width, y + height, x + width - safeRadius, y + height);
  context.lineTo(x + safeRadius, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - safeRadius);
  context.lineTo(x, y + safeRadius);
  context.quadraticCurveTo(x, y, x + safeRadius, y);
  context.closePath();
};

const loadImage = (source) =>
  new Promise((resolve, reject) => {
    if (!source) {
      reject(new Error('Missing image source'));
      return;
    }
    
    const image = new window.Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error('Failed to load image'));
    image.onabort = () => reject(new Error('Image loading aborted'));
    image.src = source;
  });

const buildTextLines = (context, text, maxWidth) => {
  if (!text.trim()) {
    return [];
  }

  const words = text.trim().split(/\s+/);
  const lines = [];
  let currentLine = words[0] || '';

  for (let index = 1; index < words.length; index += 1) {
    const candidate = `${currentLine} ${words[index]}`;
    if (context.measureText(candidate).width <= maxWidth) {
      currentLine = candidate;
    } else {
      lines.push(currentLine);
      currentLine = words[index];
    }
  }

  lines.push(currentLine);
  return lines.slice(0, 3);
};

const drawTextBlock = (context, lines, x, y, lineHeight) => {
  const totalHeight = lineHeight * Math.max(lines.length - 1, 0);
  lines.forEach((line, index) => {
    context.fillText(line, x, y - totalHeight / 2 + index * lineHeight);
  });
};

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const drawDesignLayer = async ({
  context,
  canvasWidth,
  canvasHeight,
  uploadedImageUrl,
  customText,
  imageScale,
  imageOffsetX,
  imageOffsetY,
  textSize,
  textColor,
  textOffsetX,
  textOffsetY,
  designRotation,
}) => {
  context.clearRect(0, 0, canvasWidth, canvasHeight);
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = 'high';

  const printArea = {
    x: (PRINT_AREA.x / TEXTURE_WIDTH) * canvasWidth,
    y: (PRINT_AREA.y / TEXTURE_HEIGHT) * canvasHeight,
    width: (PRINT_AREA.width / TEXTURE_WIDTH) * canvasWidth,
    height: (PRINT_AREA.height / TEXTURE_HEIGHT) * canvasHeight,
    radius: (PRINT_AREA.radius / TEXTURE_WIDTH) * canvasWidth,
  };

  if (printArea.width <= 0 || printArea.height <= 0) {
    return;
  }

  const artworkArea = {
    width: printArea.width * FRONT_ARTWORK_AREA.widthRatio,
    height: printArea.height * FRONT_ARTWORK_AREA.heightRatio,
  };

  artworkArea.x = printArea.x + (printArea.width - artworkArea.width) / 2;
  artworkArea.y = printArea.y + printArea.height * FRONT_ARTWORK_AREA.topOffsetRatio;

  if (artworkArea.width <= 0 || artworkArea.height <= 0) {
    return;
  }

  context.save();
  drawRoundedRectPath(
    context,
    printArea.x,
    printArea.y,
    printArea.width,
    printArea.height,
    printArea.radius
  );
  context.clip();

  const safeImageScale = clamp(imageScale, 50, 220);
  const safeImageOffsetX = clamp(imageOffsetX, -60, 60);
  const safeImageOffsetY = clamp(imageOffsetY, -60, 60);
  const safeTextOffsetX = clamp(textOffsetX, -55, 55);
  const safeTextOffsetY = clamp(textOffsetY, -50, 50);
  
  const imageCenterX =
    artworkArea.x + artworkArea.width / 2 + (safeImageOffsetX / 100) * (artworkArea.width * 0.15);
  const imageCenterY =
    artworkArea.y + artworkArea.height / 2 + (safeImageOffsetY / 100) * (artworkArea.height * 0.15);
  const textCenterX =
    artworkArea.x + artworkArea.width / 2 + (safeTextOffsetX / 100) * (artworkArea.width * 0.15);
  const textCenterY =
    artworkArea.y +
    artworkArea.height * FRONT_ARTWORK_AREA.textBaselineRatio +
    (safeTextOffsetY / 100) * (artworkArea.height * 0.15);
  const rotationRadians = THREE.MathUtils.degToRad(designRotation);

  if (uploadedImageUrl) {
    try {
      const image = await loadImage(uploadedImageUrl);
      
      const baseScale = Math.min(
        artworkArea.width / image.width,
        artworkArea.height / image.height
      );
      const finalScale = baseScale * (safeImageScale / 100);
      const imageWidth = image.width * finalScale;
      const imageHeight = image.height * finalScale;

      if (isNaN(imageWidth) || isNaN(imageHeight) || imageWidth <= 0 || imageHeight <= 0) {
        return;
      }

      context.save();
      context.translate(imageCenterX, imageCenterY);
      context.rotate(rotationRadians);
      context.shadowColor = 'rgba(15, 23, 42, 0.14)';
      context.shadowBlur = 12;
      context.drawImage(image, -imageWidth / 2, -imageHeight / 2, imageWidth, imageHeight);
      context.restore();
    } catch {
      // Si la imagen falla, se omite solo el dibujo de la imagen.
    }
  }

  if (customText.trim()) {
    const visibleText = customText.trim();
    const fontSizePixels = Math.max(44, textSize * 4.2);
    const lineHeight = fontSizePixels * 1.08;

    context.save();
    context.translate(textCenterX, textCenterY);
    context.rotate(rotationRadians);
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillStyle = textColor;
    context.font = `800 ${fontSizePixels}px 'Montserrat', 'Poppins', sans-serif`;
    context.shadowColor = 'rgba(255, 255, 255, 0.84)';
    context.shadowBlur = 8;

    const lines = buildTextLines(context, visibleText, artworkArea.width * 0.9);
    drawTextBlock(context, lines, 0, 0, lineHeight);
    context.restore();
  }

  context.restore();
};

const useDesignSurface = ({
  uploadedImageUrl,
  customText,
  imageScale,
  imageOffsetX,
  imageOffsetY,
  textSize,
  textColor,
  textOffsetX,
  textOffsetY,
  designRotation,
}) => {
  const textureCanvasRef = React.useRef(null);
  const texture = React.useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = TEXTURE_WIDTH;
    canvas.height = TEXTURE_HEIGHT;
    textureCanvasRef.current = canvas;

    const canvasTexture = new THREE.CanvasTexture(canvas);
    canvasTexture.colorSpace = THREE.SRGBColorSpace;
    canvasTexture.minFilter = THREE.LinearMipmapLinearFilter;
    canvasTexture.magFilter = THREE.LinearFilter;
    canvasTexture.generateMipmaps = true;
    canvasTexture.flipY = false;
    canvasTexture.needsUpdate = true;
    return canvasTexture;
  }, []);

  React.useEffect(() => {
    let isCancelled = false;

    const renderSurfaces = async () => {
      if (!textureCanvasRef.current) {
        return;
      }

      await drawDesignLayer({
        context: textureCanvasRef.current.getContext('2d'),
        canvasWidth: TEXTURE_WIDTH,
        canvasHeight: TEXTURE_HEIGHT,
        uploadedImageUrl,
        customText,
        imageScale,
        imageOffsetX,
        imageOffsetY,
        textSize,
        textColor,
        textOffsetX,
        textOffsetY,
        designRotation,
      });

      if (isCancelled) {
        return;
      }

      texture.needsUpdate = true;
    };

    renderSurfaces();

    return () => {
      isCancelled = true;
    };
  }, [
    customText,
    designRotation,
    imageOffsetX,
    imageOffsetY,
    imageScale,
    textColor,
    textOffsetX,
    textOffsetY,
    textSize,
    texture,
    uploadedImageUrl,
  ]);

  return { texture };
};

function CameraRig({ viewMode, controlsRef }) {
  const { camera } = useThree();
  const desiredView = CAMERA_VIEWS[viewMode] || CAMERA_VIEWS.front;

  useFrame(() => {
    camera.position.lerp(desiredView.position, 0.12);
    controlsRef.current?.target.lerp(desiredView.target, 0.12);
    controlsRef.current?.update();
  });

  return null;
}

function MugModel({ designTexture }) {
  const { nodes } = useGLTF('/models/premium-mug.gltf');

  const bodyMaterial = React.useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#ffffff',
        roughness: 0.18,
        metalness: 0,
        clearcoat: 1,
        clearcoatRoughness: 0.03,
        envMapIntensity: 1.25,
      }),
    []
  );

  const innerMaterial = React.useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#f3f7fb',
        roughness: 0.24,
        metalness: 0,
        clearcoat: 0.95,
        clearcoatRoughness: 0.06,
        envMapIntensity: 1.1,
      }),
    []
  );

  const printMaterial = React.useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#ffffff',
        roughness: 0.16,
        metalness: 0,
        clearcoat: 1,
        clearcoatRoughness: 0.04,
        envMapIntensity: 1.2,
        map: designTexture,
        transparent: true,
        alphaTest: 0.02,
        depthWrite: false,
        polygonOffset: true,
        polygonOffsetFactor: -2,
        polygonOffsetUnits: -2,
      }),
    [designTexture]
  );

  React.useEffect(
    () => () => {
      bodyMaterial.dispose();
      innerMaterial.dispose();
      printMaterial.dispose();
    },
    [bodyMaterial, innerMaterial, printMaterial]
  );

  return (
    <group position={[-0.46, -0.08, 0]} rotation={[0, -0.18, 0]} scale={0.74}>
      <mesh geometry={nodes.MugBody.geometry} material={bodyMaterial} castShadow receiveShadow />
      <mesh geometry={nodes.MugHandle.geometry} material={bodyMaterial} castShadow receiveShadow />
      <mesh geometry={nodes.MugInner.geometry} material={innerMaterial} castShadow receiveShadow />
      <mesh
        geometry={nodes.MugPrintable.geometry}
        material={printMaterial}
        rotation={[0, Math.PI, 0]}
        renderOrder={2}
        receiveShadow
      />
    </group>
  );
}

const MugViewer = React.forwardRef(function MugViewer({ designTexture, viewMode }, ref) {
  const controlsRef = React.useRef(null);
  const glRef = React.useRef(null);

  React.useImperativeHandle(ref, () => ({
    exportImage: () => glRef.current?.domElement?.toDataURL('image/png') || '',
  }));

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
      onCreated={({ gl }) => {
        glRef.current = gl;
        gl.outputColorSpace = THREE.SRGBColorSpace;
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.1;
      }}
    >
      <PerspectiveCamera makeDefault position={[0.22, 0.32, 9.1]} fov={30} />

      <React.Suspense
        fallback={
          <Html center>
            <div className="rounded-full bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#56747b]">
              Cargando modelo 3D
            </div>
          </Html>
        }
      >
        <Environment resolution={256}>
          <Lightformer
            intensity={2.8}
            rotation-x={Math.PI / 2}
            position={[0, 4.5, -8]}
            scale={[14, 14, 1]}
          />
          <Lightformer intensity={1.8} position={[5, 1.8, 3]} scale={[4, 6, 1]} />
          <Lightformer intensity={1.1} position={[-4, 2.4, -2]} scale={[4, 5, 1]} />
        </Environment>

        <ambientLight intensity={0.35} />
        <directionalLight
          castShadow
          intensity={1.8}
          position={[4.6, 7, 6.4]}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-bias={-0.00008}
        />
        <spotLight
          castShadow
          intensity={28}
          angle={0.34}
          penumbra={0.85}
          position={[-5.6, 7.6, 4]}
          color="#f9efe1"
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />

        <MugModel designTexture={designTexture} />
        <CameraRig viewMode={viewMode} controlsRef={controlsRef} />
        <OrbitControls
          ref={controlsRef}
          enablePan={false}
          minDistance={6.8}
          maxDistance={12.5}
          minPolarAngle={0.75}
          maxPolarAngle={2.25}
          enableDamping
        />
        <ContactShadows
          position={[-0.32, -1.58, 0]}
          opacity={0.34}
          scale={10.4}
          blur={2.8}
          far={5.8}
          resolution={1024}
          color="#85a8ad"
        />
      </React.Suspense>
    </Canvas>
  );
});

export default function MugCustomizer3D({
  productSlug,
  uploadedImageUrl,
  customText,
  imageScale,
  imageOffsetX,
  imageOffsetY,
  textSize,
  textColor,
  textOffsetX,
  textOffsetY,
  designRotation,
  onFileChange,
  onTextChange,
  onImageScaleChange,
  onImageOffsetXChange,
  onImageOffsetYChange,
  onTextSizeChange,
  onTextColorChange,
  onTextOffsetXChange,
  onTextOffsetYChange,
  onDesignRotationChange,
  onReset,
}) {
  const viewerRef = React.useRef(null);
  const [viewMode, setViewMode] = React.useState('front');
  const { texture } = useDesignSurface({
    uploadedImageUrl,
    customText,
    imageScale,
    imageOffsetX,
    imageOffsetY,
    textSize,
    textColor,
    textOffsetX,
    textOffsetY,
    designRotation,
  });

  const handleExport = () => {
    const dataUrl = viewerRef.current?.exportImage();
    if (!dataUrl) {
      return;
    }

    const anchor = document.createElement('a');
    anchor.href = dataUrl;
    anchor.download = `${productSlug || 'taza-personalizada'}-preview.png`;
    anchor.click();
  };

  return (
    <div className="space-y-6">
      <div className="glass-card overflow-hidden p-5 md:p-6">
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => setViewMode('front')}
            className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] ${
              viewMode === 'front'
                ? 'bg-[#3f97d4] text-white'
                : 'border border-[rgba(63,151,212,0.18)] bg-white/85 text-[#56747b]'
            }`}
          >
            Frontal
          </button>
          <button
            type="button"
            onClick={() => setViewMode('angle')}
            className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] ${
              viewMode === 'angle'
                ? 'bg-[#3f97d4] text-white'
                : 'border border-[rgba(63,151,212,0.18)] bg-white/85 text-[#56747b]'
            }`}
          >
            Angulada
          </button>
        </div>

        <div className="mt-4 overflow-hidden rounded-[30px] border border-[rgba(63,151,212,0.12)] bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.98),rgba(232,246,244,0.94)_56%,rgba(255,244,229,0.9))]">
          <div className="h-[580px] w-full md:h-[640px]">
            <MugViewer ref={viewerRef} designTexture={texture} viewMode={viewMode} />
          </div>
        </div>

        <div className="hidden">
          <div className="rounded-[24px] border border-[rgba(63,151,212,0.12)] bg-white/78 p-4 text-sm leading-7 text-[#56747b]">
            <p className="inline-flex items-center gap-2 font-semibold text-[#184a53]">
              <FiImage className="text-[#3f97d4]" />
              Diseño directo
            </p>
            <p className="mt-2">
              El arte se ve aplicado directamente sobre la taza 3D mientras haces cambios.
            </p>
          </div>

          <div className="rounded-[24px] border border-[rgba(63,151,212,0.12)] bg-white/78 p-4 text-sm leading-7 text-[#56747b]">
            <p className="inline-flex items-center gap-2 font-semibold text-[#184a53]">
              <FiRotateCw className="text-[#3f97d4]" />
              Revisión completa
            </p>
            <p className="mt-2">
              Gira la taza y cambia entre vista frontal y angulada para revisar mejor el resultado.
            </p>
          </div>

          <div className="rounded-[24px] border border-[rgba(63,151,212,0.12)] bg-white/78 p-4 text-sm leading-7 text-[#56747b]">
            <p className="inline-flex items-center gap-2 font-semibold text-[#184a53]">
              <FiCamera className="text-[#3f97d4]" />
              Vista comercial
            </p>
            <p className="mt-2">
              La idea es que puedas ver una aproximacion clara de como quedara tu taza final.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <div className="glass-card space-y-4 p-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#3f97d4]">
              Contenido
            </p>
            <h4 className="mt-2 font-display text-xl font-black tracking-tight text-[#184a53]">
              Sube tu arte y define tu mensaje.
            </h4>
          </div>

          <label className="block space-y-2 text-sm font-medium text-[#28535b]">
            <span className="inline-flex items-center gap-2">
              <FiUploadCloud className="text-[#3f97d4]" />
              Logo o imagen
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={onFileChange}
              className="w-full rounded-2xl border border-[rgba(63,151,212,0.14)] bg-white/85 px-4 py-3 text-sm outline-none file:mr-3 file:rounded-full file:border-0 file:bg-[#3f97d4] file:px-3 file:py-2 file:text-xs file:font-semibold file:text-white"
            />
          </label>

          <label className="block space-y-2 text-sm font-medium text-[#28535b]">
            <span className="inline-flex items-center gap-2">
              <FiType className="text-[#3f97d4]" />
              Frase personalizada
            </span>
            <input
              value={customText}
              onChange={(event) => onTextChange(event.target.value)}
              className="w-full rounded-2xl border border-[rgba(63,151,212,0.14)] bg-white/85 px-4 py-3 text-sm outline-none transition focus:border-[rgba(63,151,212,0.34)]"
              placeholder="Ej: Tu marca aqui"
            />
          </label>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm text-[#56747b]">
              Tamano de frase
              <input
                type="range"
                min="14"
                max="42"
                value={textSize}
                onChange={(event) => onTextSizeChange(Number(event.target.value))}
                className="w-full accent-[#3f97d4]"
              />
            </label>
            <label className="space-y-2 text-sm text-[#56747b]">
              Color de frase
              <input
                type="color"
                value={textColor}
                onChange={(event) => onTextColorChange(event.target.value)}
                className="h-12 w-full rounded-2xl border border-[rgba(63,151,212,0.14)] bg-white p-2"
              />
            </label>
          </div>
        </div>

        <div className="glass-card space-y-4 p-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#3f97d4]">
              Ajustes
            </p>
            <h4 className="mt-2 font-display text-xl font-black tracking-tight text-[#184a53]">
              Mueve, escala y rota tu diseno.
            </h4>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm text-[#56747b]">
              Escala del arte
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="50"
                  max="220"
                  value={imageScale}
                  onChange={(event) => onImageScaleChange(Number(event.target.value))}
                  className="w-full accent-[#3f97d4]"
                />
                <span className="text-xs font-semibold text-[#184a53] min-w-fit">{imageScale}%</span>
              </div>
            </label>
            <label className="space-y-2 text-sm text-[#56747b]">
              Rotacion
              <input
                type="range"
                min="-180"
                max="180"
                value={designRotation}
                onChange={(event) => onDesignRotationChange(Number(event.target.value))}
                className="w-full accent-[#3f97d4]"
              />
            </label>
            <label className="space-y-2 text-sm text-[#56747b]">
              Arte horizontal
              <input
                type="range"
                min="-60"
                max="60"
                value={imageOffsetX}
                onChange={(event) => onImageOffsetXChange(Number(event.target.value))}
                className="w-full accent-[#3f97d4]"
              />
            </label>
            <label className="space-y-2 text-sm text-[#56747b]">
              Arte vertical
              <input
                type="range"
                min="-60"
                max="60"
                value={imageOffsetY}
                onChange={(event) => onImageOffsetYChange(Number(event.target.value))}
                className="w-full accent-[#3f97d4]"
              />
            </label>
            <label className="space-y-2 text-sm text-[#56747b]">
              Frase horizontal
              <input
                type="range"
                min="-55"
                max="55"
                value={textOffsetX}
                onChange={(event) => onTextOffsetXChange(Number(event.target.value))}
                className="w-full accent-[#3f97d4]"
              />
            </label>
            <label className="space-y-2 text-sm text-[#56747b]">
              Frase vertical
              <input
                type="range"
                min="-50"
                max="50"
                value={textOffsetY}
                onChange={(event) => onTextOffsetYChange(Number(event.target.value))}
                className="w-full accent-[#3f97d4]"
              />
            </label>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <button
              type="button"
              onClick={handleExport}
              className="brand-button-outline inline-flex items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold"
            >
              <FiDownload />
              Exportar vista
            </button>
            <button
              type="button"
              onClick={onReset}
              className="brand-button-outline inline-flex items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold"
            >
              <FiRefreshCw />
              Resetear
            </button>
          </div>

          {/* Sección de Validaciones y Diagnóstico */}
          <div className="space-y-3 rounded-[20px] border border-[rgba(63,151,212,0.16)] bg-gradient-to-br from-[#edf6ff] to-[#f8fbff] p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-[#245c88]">
              📋 Estado del Diseño
            </p>
            <div className="space-y-2 text-xs text-[#56747b]">
              <div className="flex items-center justify-between">
                <span>Imagen:</span>
                <span className={uploadedImageUrl ? 'text-[#245c88] font-semibold' : 'text-[#6b7f92]'}>
                  {uploadedImageUrl ? '✅ Cargada' : '❌ Sin imagen'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Texto:</span>
                <span className={customText.trim() ? 'text-[#245c88] font-semibold' : 'text-slate-500'}>
                  {customText.trim() ? '✅ ' + customText : 'ℹ️ Sin texto'}
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-[rgba(63,151,212,0.08)] pt-2">
                <span>Escala imagen:</span>
                <div className="flex items-center gap-1">
                  <span className="font-mono text-[#184a53]">{imageScale}%</span>
                  <span className="text-[9px] text-[#9ca3af]">(50-220)</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>Tamaño frase:</span>
                <span className="font-mono text-[#184a53]">{textSize}px</span>
              </div>
            </div>
            
            {uploadedImageUrl && (
              <div className="rounded-[12px] border border-[rgba(63,151,212,0.18)] bg-[rgba(63,151,212,0.06)] p-3">
                <p className="text-[10px] leading-relaxed text-[#245c88]">
                  <span className="font-bold">✓ Imagen detectada:</span> Ajusta con los sliders para que se vea completa. El área frontal ahora prioriza mostrar la imagen entera sin cortar en los costados de la taza.
                </p>
              </div>
            )}

            {!uploadedImageUrl && (
              <div className="rounded-[12px] border border-[rgba(148,163,184,0.22)] bg-[rgba(226,232,240,0.4)] p-3">
                <p className="text-[10px] leading-relaxed text-[#48606f]">
                  <span className="font-bold">⚠ Sin imagen:</span> Sube un logo o imagen para ver una vista previa realista de cómo se vería impreso.
                </p>
              </div>
            )}

            <details className="cursor-pointer">
              <summary className="text-[10px] font-semibold text-[#245c88] hover:text-[#184a53] select-none">
                Abre la consola (F12) para ver logs detallados ▾
              </summary>
              <p className="mt-1 text-[9px] leading-relaxed text-[#6b7280]">
                Si algo no se muestra correctamente, abre las herramientas de desarrollo (F12 o Ctrl+Shift+I) y revisa la pestaña Console para mensajes de diagnóstico.
              </p>
            </details>
          </div>

          <div className="hidden">
            <div className="rounded-[24px] border border-dashed border-[rgba(63,151,212,0.16)] bg-[#f8fbfb] p-4 text-sm leading-7 text-[#56747b]">
              <p className="inline-flex items-center gap-2 font-semibold text-[#184a53]">
                <FiCamera className="text-[#3f97d4]" />
                Vistas del producto
              </p>
              <p className="mt-2">
                Alterna entre vista frontal y angulada para revisar mejor el asa y la impresion.
              </p>
            </div>
            <div className="rounded-[24px] border border-dashed border-[rgba(63,151,212,0.16)] bg-[#f8fbfb] p-4 text-sm leading-7 text-[#56747b]">
              <p className="inline-flex items-center gap-2 font-semibold text-[#184a53]">
                <FiRotateCw className="text-[#3f97d4]" />
                Acabado premium
              </p>
              <p className="mt-2">
                El visor usa materiales ceramicos, luces suaves y sombras para una lectura mas real.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

useGLTF.preload('/models/premium-mug.gltf');
