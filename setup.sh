#!/bin/bash

# Script de inicialización rápida para EstampadosDigitalPro

echo "🎨 EstampadosDigitalPro - Inicializador Rápido"
echo "================================================"
echo ""

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado. Por favor instálalo primero."
    exit 1
fi

echo "✅ Node.js: $(node --version)"
echo "✅ npm: $(npm --version)"
echo ""

# Instalar dependencias
echo "📦 Instalando dependencias del proyecto..."
npm run install:all

echo ""
echo "✅ Setup completado!"
echo ""
echo "🚀 Para iniciar el desarrollo:"
echo "   npm run dev"
echo ""
echo "📍 Accesos:"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:5000"
echo ""
echo "📚 Documentación:"
echo "   - QUICK_START.md"
echo "   - INSTALLATION.md"
echo "   - TECHNICAL.md"
echo ""
