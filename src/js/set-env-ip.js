// scripts/set-env-ip.js
const fs = require('fs');
const os = require('os');
const path = require('path');

// 현재 네트워크 인터페이스에서 IPv4 주소 찾기
function getLocalIp() {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
    return 'localhost';
}

const ip = getLocalIp();
const envPath = path.resolve(__dirname, '../../.env');
const apiUrl = `REACT_APP_API_BASE_URL=http://${ip}:8080/api\n`;

// 기존 .env 파일에 덮어쓰기 또는 추가
fs.writeFileSync(envPath, apiUrl);
console.log(`env 파일에 IP 주소 설정 완료: ${apiUrl.trim()}`);
