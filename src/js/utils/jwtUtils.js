export function getRemainingTime(token) {
    if (!token) return null;

    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp; // 초 단위
    const now = Math.floor(Date.now() / 1000);

    const remaining = exp - now;
    return remaining > 0 ? remaining : 0;
}