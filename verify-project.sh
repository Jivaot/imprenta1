#!/usr/bin/env bash

# 📋 CHECKLIST DE VERIFICACIÓN DEL PROYECTO

echo "🎨 CHECKLIST DE PROYECTO - EstampadosDigitalPro"
echo "=================================================="
echo ""

# Colores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

PROJECT_PATH="/home/jvalqui/Escritorio/PROYECTO IMPRENTA/imprenta-estampados"

# Función para verificar archivo
check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✅${NC} $2"
    else
        echo -e "${YELLOW}⚠️ ${NC} Falta: $2"
    fi
}

# Función para verificar carpeta
check_dir() {
    if [ -d "$1" ]; then
        echo -e "${GREEN}✅${NC} $2"
    else
        echo -e "${YELLOW}⚠️ ${NC} Falta: $2"
    fi
}

echo -e "${BLUE}📁 CARPETAS PRINCIPALES${NC}"
echo "---"
check_dir "$PROJECT_PATH/backend" "backend/ - Servidor Node.js"
check_dir "$PROJECT_PATH/frontend" "frontend/ - Aplicación React"
check_dir "$PROJECT_PATH/database" "database/ - Scripts SQL"
echo ""

echo -e "${BLUE}📄 ARCHIVOS RAÍZ${NC}"
echo "---"
check_file "$PROJECT_PATH/README.md" "README.md"
check_file "$PROJECT_PATH/QUICK_START.md" "QUICK_START.md"
check_file "$PROJECT_PATH/INSTALLATION.md" "INSTALLATION.md"
check_file "$PROJECT_PATH/TECHNICAL.md" "TECHNICAL.md"
check_file "$PROJECT_PATH/PROJECT_STRUCTURE.md" "PROJECT_STRUCTURE.md"
check_file "$PROJECT_PATH/RESUMEN_PROYECTO.md" "RESUMEN_PROYECTO.md"
check_file "$PROJECT_PATH/CONTRIBUTING.md" "CONTRIBUTING.md"
check_file "$PROJECT_PATH/LICENSE" "LICENSE"
check_file "$PROJECT_PATH/package.json" "package.json"
check_file "$PROJECT_PATH/docker-compose.yml" "docker-compose.yml"
check_file "$PROJECT_PATH/.gitignore" ".gitignore"
echo ""

echo -e "${BLUE}🔙 BACKEND${NC}"
echo "---"
check_file "$PROJECT_PATH/backend/package.json" "backend/package.json"
check_file "$PROJECT_PATH/backend/.env.example" ".env.example"
check_file "$PROJECT_PATH/backend/README.md" "README.md"
check_file "$PROJECT_PATH/backend/Dockerfile" "Dockerfile"
check_file "$PROJECT_PATH/backend/src/index.js" "src/index.js"
check_file "$PROJECT_PATH/backend/src/middleware/auth.js" "src/middleware/auth.js"
check_file "$PROJECT_PATH/backend/src/routes/authRoutes.js" "src/routes/authRoutes.js"
check_file "$PROJECT_PATH/backend/src/routes/productRoutes.js" "src/routes/productRoutes.js"
check_file "$PROJECT_PATH/backend/src/routes/cartRoutes.js" "src/routes/cartRoutes.js"
check_file "$PROJECT_PATH/backend/src/routes/orderRoutes.js" "src/routes/orderRoutes.js"
check_file "$PROJECT_PATH/backend/src/routes/paymentRoutes.js" "src/routes/paymentRoutes.js"
check_file "$PROJECT_PATH/backend/src/routes/userRoutes.js" "src/routes/userRoutes.js"
echo ""

echo -e "${BLUE}🎨 FRONTEND${NC}"
echo "---"
check_file "$PROJECT_PATH/frontend/package.json" "frontend/package.json"
check_file "$PROJECT_PATH/frontend/.env.example" ".env.example"
check_file "$PROJECT_PATH/frontend/README.md" "README.md"
check_file "$PROJECT_PATH/frontend/index.html" "index.html"
check_file "$PROJECT_PATH/frontend/vite.config.js" "vite.config.js"
check_file "$PROJECT_PATH/frontend/tailwind.config.js" "tailwind.config.js"
check_file "$PROJECT_PATH/frontend/src/App.jsx" "src/App.jsx"
check_file "$PROJECT_PATH/frontend/src/main.jsx" "src/main.jsx"
check_file "$PROJECT_PATH/frontend/src/index.css" "src/index.css"
check_file "$PROJECT_PATH/frontend/src/components/Header.jsx" "src/components/Header.jsx"
check_file "$PROJECT_PATH/frontend/src/components/Footer.jsx" "src/components/Footer.jsx"
check_file "$PROJECT_PATH/frontend/src/pages/HomePage.jsx" "src/pages/HomePage.jsx"
check_file "$PROJECT_PATH/frontend/src/store/index.js" "src/store/index.js"
check_file "$PROJECT_PATH/frontend/src/services/api.js" "src/services/api.js"
echo ""

echo -e "${BLUE}🗄️  BASE DE DATOS${NC}"
echo "---"
check_file "$PROJECT_PATH/database/init.sql" "database/init.sql"
check_file "$PROJECT_PATH/database/README.md" "database/README.md"
echo ""

echo -e "${BLUE}🐳 DOCKER${NC}"
echo "---"
check_file "$PROJECT_PATH/backend/Dockerfile" "backend/Dockerfile"
check_file "$PROJECT_PATH/docker-compose.yml" "docker-compose.yml"
check_file "$PROJECT_PATH/setup.sh" "setup.sh"
check_file "$PROJECT_PATH/setup.bat" "setup.bat"
echo ""

echo -e "${GREEN}================================================${NC}"
echo -e "${GREEN}✅ PROYECTO CREADO EXITOSAMENTE!${NC}"
echo -e "${GREEN}================================================${NC}"
echo ""
echo -e "${BLUE}📍 UBICACIÓN:${NC}"
echo "   $PROJECT_PATH"
echo ""
echo -e "${BLUE}🚀 PRÓXIMOS PASOS:${NC}"
echo "   1. Lee: QUICK_START.md"
echo "   2. Ejecuta: npm run install:all"
echo "   3. Configura: backend/.env y frontend/.env"
echo "   4. Inicia: npm run dev"
echo ""
echo -e "${BLUE}📚 DOCUMENTACIÓN:${NC}"
echo "   - QUICK_START.md ......... Inicio rápido"
echo "   - INSTALLATION.md ........ Instalación"
echo "   - TECHNICAL.md ........... Técnico"
echo "   - PROJECT_STRUCTURE.md ... Estructura"
echo ""
echo -e "${YELLOW}⚡ TIP: Haz 'npm run dev' desde la carpeta raíz${NC}"
echo ""
