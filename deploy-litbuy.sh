#!/bin/bash
# ========================================
# LitBuy Spreadsheet (litbuyspreadsheet.xyz) — Deployment Script
# Server: 217.154.115.9
# App name: litbuyxyz (distinct from existing `litbuyspreadsheet` PM2 process)
# ========================================

set -e  # Exit on error

# --------------------------
# Configuration
# --------------------------
SSH_KEY="/Users/asiger/Desktop/RootKey"
SERVER_IP="217.154.115.9"
REMOTE_DIR="/var/www/litbuyxyz"
APP_NAME="litbuyxyz"
PORT=3031
DOMAIN="litbuyspreadsheet.xyz"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}🚀 LitBuy Spreadsheet Deployment${NC}"
echo -e "${GREEN}========================================${NC}"
echo -e "${CYAN}Server: ${SERVER_IP}${NC}"
echo -e "${CYAN}App: ${APP_NAME}${NC}"
echo -e "${CYAN}Port: ${PORT}${NC}"
echo -e "${CYAN}Domain: ${DOMAIN}${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

# --------------------------
# Validate SSH Key
# --------------------------
echo -e "${YELLOW}🔑 Step 1: Validating SSH key...${NC}"
if [ ! -f "$SSH_KEY" ]; then
  echo -e "${RED}Error: SSH key not found at $SSH_KEY${NC}"
  exit 1
fi

if ! ssh -i "$SSH_KEY" -o ConnectTimeout=5 -o BatchMode=yes root@"$SERVER_IP" echo "SSH OK" >/dev/null 2>&1; then
  echo -e "${RED}Error: Cannot connect to server via SSH${NC}"
  exit 1
fi

echo -e "${GREEN}✅ SSH connection verified${NC}"
echo ""

# --------------------------
# Step 2: Build locally
# --------------------------
echo -e "${YELLOW}📦 Step 2: Building project locally...${NC}"
NEXT_PUBLIC_SITE_URL="https://${DOMAIN}" npm run build
echo -e "${GREEN}✅ Build complete${NC}"
echo ""

# --------------------------
# Step 3: Prepare deployment files
# --------------------------
echo -e "${YELLOW}📋 Step 3: Preparing files for upload...${NC}"
TEMP_DIR=$(mktemp -d)
echo -e "${BLUE}Temp directory: $TEMP_DIR${NC}"

rsync -av --progress \
  --exclude 'node_modules' \
  --exclude '.git' \
  --exclude '.next/cache' \
  --exclude '.env.local' \
  --exclude '*.pem' \
  --exclude 'README.md' \
  --exclude '.DS_Store' \
  --exclude '*.log' \
  --exclude 'deploy*.sh' \
  --exclude 'kRoot*' \
  --exclude '*.key' \
  --exclude 'RootKey*' \
  --exclude 'SECURITY-*.md' \
  --exclude 'CLEANUP-*.md' \
  ./ "$TEMP_DIR"/

# Copy .env if exists and append NEXT_PUBLIC_SITE_URL override
if [ -f ".env" ]; then
  cp .env "$TEMP_DIR"/.env
  # Ensure NEXT_PUBLIC_SITE_URL is set on the server
  if ! grep -q "^NEXT_PUBLIC_SITE_URL=" "$TEMP_DIR"/.env; then
    echo "NEXT_PUBLIC_SITE_URL=https://${DOMAIN}" >> "$TEMP_DIR"/.env
  else
    # Override any existing value
    sed -i.bak "s|^NEXT_PUBLIC_SITE_URL=.*|NEXT_PUBLIC_SITE_URL=https://${DOMAIN}|" "$TEMP_DIR"/.env
    rm -f "$TEMP_DIR"/.env.bak
  fi
  echo -e "${GREEN}✅ Environment file prepared with NEXT_PUBLIC_SITE_URL=https://${DOMAIN}${NC}"
fi

echo -e "${GREEN}✅ Files prepared${NC}"
echo ""

# --------------------------
# Step 4: Upload to server
# --------------------------
echo -e "${YELLOW}📤 Step 4: Uploading to server...${NC}"
ssh -i "$SSH_KEY" root@"$SERVER_IP" "mkdir -p $REMOTE_DIR"

rsync -avz --progress -e "ssh -i $SSH_KEY" \
  --delete \
  --exclude 'public/uploads' \
  "$TEMP_DIR"/ root@"$SERVER_IP":"$REMOTE_DIR"/

rm -rf "$TEMP_DIR"
echo -e "${GREEN}✅ Upload complete${NC}"
echo ""

# --------------------------
# Step 5: Setup & run on server
# --------------------------
echo -e "${YELLOW}🔧 Step 5: Setting up server environment...${NC}"

ssh -t -i "$SSH_KEY" root@"$SERVER_IP" bash <<ENDSSH
set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

REMOTE_DIR="$REMOTE_DIR"
APP_NAME="$APP_NAME"
PORT=$PORT

echo -e "\${GREEN}========================================\${NC}"
echo -e "\${GREEN}🖥️  Server Setup - \$APP_NAME\${NC}"
echo -e "\${GREEN}========================================\${NC}"

# Load NVM
export NVM_DIR="\$HOME/.nvm"
[ -s "\$NVM_DIR/nvm.sh" ] && source "\$NVM_DIR/nvm.sh"

# --------------------------
# Install Production Dependencies
# --------------------------
cd "\$REMOTE_DIR"
echo -e "\${BLUE}📦 Installing production dependencies...\${NC}"
npm install
echo -e "\${GREEN}✅ Dependencies installed\${NC}"

# --------------------------
# Create PM2 Ecosystem Config
# --------------------------
echo -e "\${BLUE}📝 Creating PM2 configuration...\${NC}"
mkdir -p logs

cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: '$APP_NAME',
    script: 'node_modules/next/dist/bin/next',
    args: 'start -p $PORT',
    cwd: '$REMOTE_DIR',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: $PORT
    },
    error_file: './logs/pm2-error.log',
    out_file: './logs/pm2-out.log',
    log_file: './logs/pm2-combined.log',
    time: true
  }]
};
EOF

echo -e "\${GREEN}✅ PM2 config created\${NC}"

# --------------------------
# Start Application with PM2
# --------------------------
echo -e "\${BLUE}🚀 Starting application...\${NC}"

# Stop old instance if exists
pm2 stop "\$APP_NAME" 2>/dev/null || true
pm2 delete "\$APP_NAME" 2>/dev/null || true

# Start new instance
pm2 start ecosystem.config.js

# Save PM2 process list
pm2 save

echo -e "\${GREEN}✅ Application started with PM2\${NC}"

# --------------------------
# Final Status
# --------------------------
echo -e "\${GREEN}========================================\${NC}"
echo -e "\${GREEN}✅ Deployment Complete!\${NC}"
echo -e "\${GREEN}========================================\${NC}"
echo ""
echo -e "\${CYAN}Application Status:\${NC}"
pm2 info \$APP_NAME | head -20
echo ""
echo -e "\${CYAN}Server Information:\${NC}"
echo -e "  App: \$APP_NAME"
echo -e "  Port: \$PORT"
echo -e "  Directory: \$REMOTE_DIR"
echo ""
echo -e "\${CYAN}Useful Commands:\${NC}"
echo -e "  View logs: pm2 logs \$APP_NAME"
echo -e "  Restart app: pm2 restart \$APP_NAME"
echo -e "  Stop app: pm2 stop \$APP_NAME"
echo ""
echo -e "\${GREEN}========================================\${NC}"

ENDSSH

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}🎉 Deployment Complete!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${CYAN}Direct access (before nginx):${NC}"
echo -e "  ${YELLOW}http://${SERVER_IP}:${PORT}${NC}"
echo -e "${CYAN}Via nginx once configured:${NC}"
echo -e "  ${YELLOW}http://${DOMAIN}${NC}"
echo ""
