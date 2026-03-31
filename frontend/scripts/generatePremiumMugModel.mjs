import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputDirectory = path.resolve(__dirname, '../public/models');
const outputPath = path.join(outputDirectory, 'premium-mug.gltf');

if (!globalThis.FileReader) {
  globalThis.FileReader = class FileReader {
    constructor() {
      this.result = null;
      this.onloadend = null;
    }

    async readAsArrayBuffer(blob) {
      this.result = await blob.arrayBuffer();
      if (typeof this.onloadend === 'function') {
        this.onloadend();
      }
    }

    async readAsDataURL(blob) {
      const arrayBuffer = await blob.arrayBuffer();
      const base64 = Buffer.from(arrayBuffer).toString('base64');
      const type = blob.type || 'application/octet-stream';
      this.result = `data:${type};base64,${base64}`;
      if (typeof this.onloadend === 'function') {
        this.onloadend();
      }
    }
  };
}

if (!globalThis.Blob) {
  globalThis.Blob = Blob;
}

if (!globalThis.btoa) {
  globalThis.btoa = (value) => Buffer.from(value, 'binary').toString('base64');
}

const buildBodyGeometry = () => {
  const outerProfile = [
    [1.2, -1.88],
    [1.5, -1.86],
    [1.8, -1.82],
    [1.95, -1.7],
    [2.03, -1.28],
    [2.08, -0.52],
    [2.1, 0.42],
    [2.08, 1.18],
    [2.02, 1.66],
    [1.94, 1.92],
  ].map(([radius, y]) => new THREE.Vector2(radius, y));

  const shell = new THREE.LatheGeometry(outerProfile, 160);

  const lip = new THREE.TorusGeometry(1.95, 0.06, 20, 140);
  lip.rotateX(Math.PI / 2);
  lip.translate(0, 1.92, 0);

  const base = new THREE.CylinderGeometry(1.54, 1.66, 0.16, 160);
  base.translate(0, -1.9, 0);

  const foot = new THREE.TorusGeometry(1.48, 0.06, 18, 140);
  foot.rotateX(Math.PI / 2);
  foot.translate(0, -1.8, 0);

  return mergeGeometries([shell, lip, base, foot], false);
};

const buildInnerGeometry = () => {
  const innerProfile = [
    [1.82, 1.78],
    [1.8, 1.22],
    [1.78, 0.34],
    [1.76, -0.68],
    [1.72, -1.22],
    [1.58, -1.62],
  ].map(([radius, y]) => new THREE.Vector2(radius, y));

  const innerWall = new THREE.LatheGeometry(innerProfile, 160);
  const innerBottom = new THREE.CylinderGeometry(1.48, 1.54, 0.1, 120);
  innerBottom.translate(0, -1.64, 0);

  return mergeGeometries([innerWall, innerBottom], false);
};

const buildHandleGeometry = () => {
  const handleCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(1.84, 1.08, 0.04),
    new THREE.Vector3(2.52, 1.08, 0.2),
    new THREE.Vector3(2.9, 0.52, 0.28),
    new THREE.Vector3(2.96, -0.18, 0.24),
    new THREE.Vector3(2.58, -1.0, 0.08),
    new THREE.Vector3(1.88, -1.2, -0.04),
  ]);

  const handleTube = new THREE.TubeGeometry(handleCurve, 160, 0.18, 28, false);
  const upperJoint = new THREE.SphereGeometry(0.16, 22, 22);
  upperJoint.translate(1.84, 1.08, 0.04);
  const lowerJoint = new THREE.SphereGeometry(0.16, 22, 22);
  lowerJoint.translate(1.88, -1.2, -0.04);

  return mergeGeometries([handleTube, upperJoint, lowerJoint], false);
};

const buildPrintableGeometry = () => {
  const printableBand = new THREE.CylinderGeometry(1.96, 2.06, 2.9, 180, 1, true);
  printableBand.translate(0, -0.04, 0);
  return printableBand;
};

const buildScene = () => {
  const root = new THREE.Group();
  root.name = 'PremiumMug';

  const bodyMaterial = new THREE.MeshPhysicalMaterial({
    name: 'CeramicBody',
    color: '#ffffff',
    roughness: 0.28,
    metalness: 0,
    clearcoat: 1,
    clearcoatRoughness: 0.06,
    reflectivity: 0.62,
  });

  const innerMaterial = new THREE.MeshPhysicalMaterial({
    name: 'CeramicInner',
    color: '#f4f7fb',
    roughness: 0.34,
    metalness: 0,
    clearcoat: 0.85,
    clearcoatRoughness: 0.08,
  });

  const printableMaterial = new THREE.MeshPhysicalMaterial({
    name: 'PrintableSurface',
    color: '#ffffff',
    roughness: 0.24,
    metalness: 0,
    clearcoat: 1,
    clearcoatRoughness: 0.04,
    transparent: true,
  });

  const mugBody = new THREE.Mesh(buildBodyGeometry(), bodyMaterial);
  mugBody.name = 'MugBody';
  mugBody.castShadow = true;
  mugBody.receiveShadow = true;

  const mugInner = new THREE.Mesh(buildInnerGeometry(), innerMaterial);
  mugInner.name = 'MugInner';
  mugInner.castShadow = true;
  mugInner.receiveShadow = true;

  const mugHandle = new THREE.Mesh(buildHandleGeometry(), bodyMaterial.clone());
  mugHandle.name = 'MugHandle';
  mugHandle.castShadow = true;
  mugHandle.receiveShadow = true;

  const mugPrintable = new THREE.Mesh(buildPrintableGeometry(), printableMaterial);
  mugPrintable.name = 'MugPrintable';
  mugPrintable.castShadow = false;
  mugPrintable.receiveShadow = false;

  root.add(mugBody, mugInner, mugHandle, mugPrintable);
  return root;
};

const exporter = new GLTFExporter();
const scene = buildScene();

const gltf = await new Promise((resolve, reject) => {
  exporter.parse(
    scene,
    (result) => resolve(result),
    (error) => reject(error),
    {
      binary: false,
      onlyVisible: true,
      trs: false,
      maxTextureSize: 4096,
    }
  );
});

await fs.mkdir(outputDirectory, { recursive: true });
await fs.writeFile(outputPath, JSON.stringify(gltf, null, 2), 'utf8');
console.log(`Model written to ${outputPath}`);
