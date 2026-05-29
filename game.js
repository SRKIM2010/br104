// ==========================================================================
// YESUNG STARS - Core Game Client (서버 강제 고정 버전)
// ==========================================================================

// Web Audio API Sound Synthesizer
class SoundSynth {
    constructor() {
        this.ctx = null;
        this.muted = false;
        
        // Sound toggle setup
        const btnSound = document.getElementById('btn-sound');
        if (btnSound) {
            btnSound.addEventListener('click', () => {
                this.muted = !this.muted;
                const icon = btnSound.querySelector('i');
                if (this.muted) {
                    icon.className = 'fa-solid fa-volume-xmark';
                    btnSound.style.borderColor = 'var(--neon-red)';
                } else {
                    icon.className = 'fa-solid fa-volume-high';
                    btnSound.style.borderColor = 'var(--border-color)';
                }
            });
        }
    }

    init() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    playShoot(type = 'default') {
        if (this.muted) return;
        this.init();
        const now = this.ctx.currentTime;
        
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);

        if (type === 'sniper') {
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(880, now);
            osc.frequency.exponentialRampToValueAtTime(110, now + 0.15);
            gain.gain.setValueAtTime(0.2, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
            osc.start(now);
            osc.stop(now + 0.15);
        } else if (type === 'shotgun' || type === 'melee') {
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(150, now);
            osc.frequency.linearRampToValueAtTime(40, now + 0.1);
            gain.gain.setValueAtTime(0.3, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
            osc.start(now);
            osc.stop(now + 0.1);
        } else if (type === 'thrower') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(300, now);
            osc.frequency.exponentialRampToValueAtTime(600, now + 0.2);
            gain.gain.setValueAtTime(0.15, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
            osc.start(now);
            osc.stop(now + 0.2);
        } else {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(440, now);
            osc.frequency.exponentialRampToValueAtTime(80, now + 0.12);
            gain.gain.setValueAtTime(0.2, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
            osc.start(now);
            osc.stop(now + 0.12);
        }
    }

    playHit() {
        if (this.muted) return;
        this.init();
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(120, now);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
    }

    playDeath() {
        if (this.muted) return;
        this.init();
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.linearRampToValueAtTime(50, now + 0.4);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
        osc.start(now);
        osc.stop(now + 0.4);
    }

    playSuper() {
        if (this.muted) return;
        this.init();
        const now = this.ctx.currentTime;
        
        const osc1 = this.ctx.createOscillator();
        const osc2 = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc1.type = 'sawtooth';
        osc1.frequency.setValueAtTime(180, now);
        osc1.frequency.linearRampToValueAtTime(700, now + 0.35);
        
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(220, now);
        osc2.frequency.linearRampToValueAtTime(800, now + 0.35);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(this.ctx.destination);
        
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
        
        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.35);
        osc2.stop(now + 0.35);
    }

    playPickup() {
        if (this.muted) return;
        this.init();
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.setValueAtTime(450, now + 0.08);
        osc.frequency.setValueAtTime(600, now + 0.16);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
    }

    playWin() {
        if (this.muted) return;
        this.init();
        const now = this.ctx.currentTime;
        const notes = [261.63, 329.63, 392.00, 523.25]; 
        notes.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, now + idx * 0.12);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            gain.gain.setValueAtTime(0.15, now + idx * 0.12);
            gain.gain.exponentialRampToValueAtTime(0.005, now + idx * 0.12 + 0.4);
            osc.start(now + idx * 0.12);
            osc.stop(now + idx * 0.12 + 0.4);
        });
    }
}

const sfx = new SoundSynth();

// ==========================================================================
// Brawler Configurations
// ==========================================================================
const BRAWLERS = {
    "윤태수": { id: "윤태수", role: "Shell Blaster", hp: 4000, speed: 5.0, reloadTime: 1.4, weapon: "Spread Shotgun", superName: "Super Blast", desc: "부채꼴 모양으로 5발의 산탄을 쏩니다. 가까이서 쏘면 치명적입니다.", superDesc: "지형지물을 파괴하는 강력한 탄환을 넓게 뿜어냅니다.", color: "#00bfff", mushroomHair: true, glasses: "round" },
    "박기덕": { id: "박기덕", role: "Sniper", hp: 3200, speed: 5.5, reloadTime: 1.7, weapon: "Laser Rifle", superName: "Piercing Laser", desc: "사거리가 매우 길고 강력한 레이저 탄환 1발을 발사합니다.", superDesc: "벽을 관통해 적을 저격하는 강력한 빔을 충전해 쏩니다.", color: "#bd00ff", baldingHair: true, glasses: "square" },
    "송창현": { id: "송창현", role: "Melee Tank", hp: 6000, speed: 6.0, reloadTime: 0.9, weapon: "Heavy Fists", superName: "Hedgehog Charge", desc: "매우 짧은 사거리지만 연사 속도가 무척 빠른 주먹을 내지릅니다.", superDesc: "빠른 속도로 전방으로 돌진하여 충돌한 적들을 크게 밀쳐냅니다.", color: "#ff3333", hedgehogHair: true, glasses: "round" },
    "이인석": { id: "이인석", role: "Grenadier", hp: 3000, speed: 4.8, reloadTime: 1.5, weapon: "Acid Flask", superName: "Toxic Pool", desc: "장벽을 넘겨 독병을 던집니다. 바닥에 깔린 독은 지속 피해를 줍니다.", superDesc: "엄청난 크기의 독병을 던져 넓은 구역에 치명적인 독 지대를 만듭니다.", color: "#ffaa00", roundHair: true, glasses: "round" },
    "김수교": { id: "김수교", role: "Support Healer", hp: 3800, speed: 5.0, reloadTime: 1.2, weapon: "Melody Wave", superName: "Healing Chord", desc: "적을 관통하는 넓은 음파를 발사합니다. 아군도 관통합니다.", superDesc: "즉시 자신과 일정 범위 안의 모든 플레이어 체력을 대폭 치유합니다.", color: "#00ff66", skinnyBody: true, glasses: "none", shortHair: true },
    "조은성": { id: "조은성", role: "Stealth Assassin", hp: 3400, speed: 6.2, reloadTime: 1.3, weapon: "Ninja Shurikens", superName: "Smoke Screen", desc: "빠르게 날아가는 4발의 수리검을 일렬로 던집니다.", superDesc: "6초 동안 은신하여 적의 눈에 보이지 않게 됩니다. 공격 시 풀립니다.", color: "#e066ff", chubbyBody: true, femaleHair: "brown", glasses: "round" },
    "김시량": { id: "김시량", role: "Summoner", hp: 3800, speed: 5.0, reloadTime: 1.25, weapon: "Earth Shockwave", superName: "Combat Drone", desc: "대지를 뒤흔드는 직진 충격파를 발사해 전방의 적들을 가격합니다.", superDesc: "주변의 적을 자동으로 추적해 공격하는 소형 로봇 드론을 소환합니다.", color: "#ffea00", handsomeHair: true, glasses: "stylish" },
    "유시온": { id: "유시온", role: "Poison Skirmisher", hp: 3000, speed: 6.2, reloadTime: 1.3, weapon: "Poison Daggers", superName: "Air Swoop", desc: "부채꼴로 독 단검 3발을 날립니다. 맞은 적은 독에 걸려 지속 피해를 줍니다.", superDesc: "공중으로 높이 점프한 후 착지 지점 주변에 무수한 독 단검을 날립니다.", color: "#00f0ff", richHair: true, female: true, glasses: "none" },
    "최종한": { id: "최종한", role: "Shield Defender", hp: 5500, speed: 4.8, reloadTime: 1.4, weapon: "Short Plasma", superName: "Energy Barrier", desc: "사거리가 다소 짧지만 묵직한 플라즈마 파동을 뿜어냅니다.", superDesc: "자신 앞에 모든 탄환을 막아주는 에너지 방벽(쉴드)을 5초 동안 켭니다.", color: "#ff8c00", squareFace: true, shortHair: true, glasses: "square" },
    "구본석": { id: "구본석", role: "Dash Slasher", hp: 3800, speed: 6.2, reloadTime: 1.8, weapon: "Shovel Dash", superName: "Bat Tempest", desc: "공격 방향으로 돌진하며 삽을 휘둘러 궤적 안의 적들에게 피해를 줍니다.", superDesc: "박쥐 떼를 날려 적들을 흡혈하고, 입힌 피해만큼 체력을 회복합니다.", color: "#d10034", chubbyBody: true, roundHair: true, glasses: "round" },
    "김예진": { id: "김예진", role: "Toxic Control", hp: 3600, speed: 5.0, reloadTime: 1.5, weapon: "Toxic Spray", superName: "Slowing Fog", desc: "일정 거리를 날아간 후 공중에 머물며 지속 피해를 주는 가스 구름을 뿜습니다.", superDesc: "자신을 중심으로 넓은 모래바람을 뿜어 영역 안의 적을 느리게 만들고 지속딜을 줍니다.", color: "#7cfc00", prettyGirl: true, female: true, glasses: "none" }
};

// ==========================================================================
// Drawing Helper Function
// ==========================================================================
function drawBrawlerFace(ctx, x, y, radius, brawlerId, angle = 0, isLobbyCard = false) {
    const config = BRAWLERS[brawlerId];
    if (!config) return;

    ctx.save();
    ctx.translate(x, y);
    if (!isLobbyCard) {
        ctx.rotate(angle);
    }

    let headRadius = radius;
    let isSquare = config.squareFace;
    
    if (config.skinnyBody) headRadius *= 0.88;
    if (config.chubbyBody) headRadius *= 1.12;

    ctx.fillStyle = "#ffdbac";
    ctx.strokeStyle = "#333";
    ctx.lineWidth = headRadius * 0.12;

    if (isSquare) {
        const size = headRadius * 1.8;
        ctx.beginPath();
        ctx.roundRect(-size/2, -size/2, size, size, headRadius * 0.4);
        ctx.fill();
        ctx.stroke();
    } else {
        ctx.beginPath();
        ctx.arc(0, 0, headRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    }

    ctx.fillStyle = "#332211";
    if (config.mushroomHair) {
        ctx.fillStyle = "#5c4033";
        ctx.beginPath();
        ctx.arc(0, -headRadius * 0.2, headRadius * 1.15, Math.PI, 0);
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.ellipse(-headRadius * 0.8, headRadius * 0.1, headRadius * 0.4, headRadius * 0.5, 0.2, 0, Math.PI * 2);
        ctx.ellipse(headRadius * 0.8, headRadius * 0.1, headRadius * 0.4, headRadius * 0.5, -0.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    } 
    else if (config.baldingHair) {
        ctx.fillStyle = "#888888";
        ctx.beginPath();
        ctx.arc(-headRadius * 0.9, headRadius * 0.2, headRadius * 0.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(headRadius * 0.9, headRadius * 0.2, headRadius * 0.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    } 
    else if (config.hedgehogHair) {
        ctx.fillStyle = "#1b1b1b";
        const spikeCount = 7;
        ctx.beginPath();
        for (let i = 0; i <= spikeCount; i++) {
            let theta = Math.PI + (i / spikeCount) * Math.PI;
            let sx = Math.cos(theta) * headRadius * 0.9;
            let sy = Math.sin(theta) * headRadius * 0.9;
            let px = Math.cos(theta) * headRadius * 1.35;
            let py = Math.sin(theta) * headRadius * 1.35;
            if (i === 0) ctx.moveTo(sx, sy);
            ctx.lineTo(px, py);
            let nextTheta = Math.PI + ((i + 0.5) / spikeCount) * Math.PI;
            ctx.lineTo(Math.cos(nextTheta) * headRadius * 0.9, Math.sin(nextTheta) * headRadius * 0.9);
        }
        ctx.fill();
        ctx.stroke();
    } 
    else if (config.roundHair) {
        ctx.fillStyle = "#222222";
        ctx.beginPath();
        ctx.arc(0, -headRadius * 0.2, headRadius * 1.05, Math.PI, 0);
        ctx.fill();
        ctx.stroke();
    } 
    else if (config.shortHair) {
        ctx.fillStyle = "#1a1a1a";
        ctx.beginPath();
        ctx.arc(0, -headRadius * 0.3, headRadius * 1.0, Math.PI * 1.1, Math.PI * 1.9);
        ctx.lineTo(0, -headRadius * 0.3);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }
    else if (config.femaleHair === "brown") {
        ctx.fillStyle = "#8a5a36";
        ctx.beginPath();
        ctx.arc(0, -headRadius * 0.2, headRadius * 1.1, Math.PI, 0);
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.roundRect(-headRadius * 1.1, -headRadius * 0.1, headRadius * 0.4, headRadius * 1.2, headRadius * 0.2);
        ctx.roundRect(headRadius * 0.7, -headRadius * 0.1, headRadius * 0.4, headRadius * 1.2, headRadius * 0.2);
        ctx.fill();
        ctx.stroke();
    } 
    else if (config.handsomeHair) {
        ctx.fillStyle = "#24334a";
        ctx.beginPath();
        ctx.arc(0, -headRadius * 0.25, headRadius * 1.05, Math.PI * 0.9, Math.PI * 2.1);
        ctx.lineTo(headRadius * 0.5, headRadius * 0.2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }
    else if (config.richHair) {
        ctx.fillStyle = "#d13bcf";
        ctx.beginPath();
        ctx.arc(0, -headRadius * 0.4, headRadius * 1.2, 0, Math.PI * 2);
        ctx.arc(-headRadius * 0.8, -headRadius * 0.1, headRadius * 0.8, 0, Math.PI * 2);
        ctx.arc(headRadius * 0.8, -headRadius * 0.1, headRadius * 0.8, 0, Math.PI * 2);
        ctx.arc(-headRadius * 0.9, headRadius * 0.5, headRadius * 0.6, 0, Math.PI * 2);
        ctx.arc(headRadius * 0.9, headRadius * 0.5, headRadius * 0.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        
        ctx.fillStyle = "#ffdbac";
        ctx.beginPath();
        ctx.arc(0, 0, headRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    } 
    else if (config.prettyGirl) {
        ctx.fillStyle = "#ffd83b";
        ctx.beginPath();
        ctx.arc(0, 0, headRadius * 1.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        
        ctx.fillStyle = "#ffdbac";
        ctx.beginPath();
        ctx.arc(0, 0, headRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        
        ctx.fillStyle = "#ffd83b";
        ctx.beginPath();
        ctx.arc(0, -headRadius * 0.4, headRadius * 1.05, Math.PI * 0.9, Math.PI * 2.1);
        ctx.lineTo(0, -headRadius * 0.1);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        
        ctx.fillStyle = "#ff5e97";
        ctx.beginPath();
        ctx.arc(-headRadius * 0.7, -headRadius * 0.7, headRadius * 0.3, 0, Math.PI * 2);
        ctx.arc(-headRadius * 0.9, -headRadius * 0.9, headRadius * 0.25, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    }

    ctx.fillStyle = "#222";
    let eyeSize = headRadius * 0.15;
    let eyeSpacing = headRadius * 0.35;
    let eyeY = -headRadius * 0.1;

    if (config.prettyGirl) {
        ctx.strokeStyle = "#222";
        ctx.lineWidth = headRadius * 0.08;
        ctx.beginPath(); ctx.arc(-eyeSpacing, eyeY, eyeSize * 1.2, Math.PI, 0); ctx.stroke();
        ctx.beginPath(); ctx.arc(eyeSpacing, eyeY, eyeSize * 1.2, Math.PI, 0); ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(-eyeSpacing - eyeSize, eyeY - eyeSize); ctx.lineTo(-eyeSpacing - eyeSize * 1.6, eyeY - eyeSize * 1.5);
        ctx.moveTo(eyeSpacing + eyeSize, eyeY - eyeSize); ctx.lineTo(eyeSpacing + eyeSize * 1.6, eyeY - eyeSize * 1.5);
        ctx.stroke();
    } else {
        ctx.beginPath();
        ctx.arc(-eyeSpacing, eyeY, eyeSize, 0, Math.PI * 2);
        ctx.arc(eyeSpacing, eyeY, eyeSize, 0, Math.PI * 2);
        ctx.fill();
    }

    if (config.glasses === "round") {
        ctx.strokeStyle = "#111111";
        ctx.lineWidth = headRadius * 0.1;
        ctx.beginPath(); ctx.arc(-eyeSpacing, eyeY, eyeSize * 1.8, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.arc(eyeSpacing, eyeY, eyeSize * 1.8, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(-eyeSpacing + eyeSize * 1.8, eyeY); ctx.lineTo(eyeSpacing - eyeSize * 1.8, eyeY); ctx.stroke();
    } 
    else if (config.glasses === "square") {
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = headRadius * 0.12;
        let gW = eyeSize * 3.2;
        let gH = eyeSize * 2.5;
        ctx.strokeRect(-eyeSpacing - gW/2, eyeY - gH/2, gW, gH);
        ctx.strokeRect(eyeSpacing - gW/2, eyeY - gH/2, gW, gH);
        ctx.beginPath(); ctx.moveTo(-eyeSpacing + gW/2, eyeY); ctx.lineTo(eyeSpacing - gW/2, eyeY); ctx.stroke();
    }
    else if (config.glasses === "stylish") {
        ctx.strokeStyle = "#00e5ff";
        ctx.lineWidth = headRadius * 0.08;
        let gW = eyeSize * 3.0;
        let gH = eyeSize * 1.5;
        ctx.strokeRect(-eyeSpacing - gW/2, eyeY - gH/2, gW, gH);
        ctx.strokeRect(eyeSpacing - gW/2, eyeY - gH/2, gW, gH);
        ctx.beginPath(); ctx.moveTo(-eyeSpacing + gW/2, eyeY); ctx.lineTo(eyeSpacing - gW/2, eyeY); ctx.stroke();
    }

    ctx.strokeStyle = "#333";
    ctx.lineWidth = headRadius * 0.08;
    ctx.lineCap = "round";
    ctx.beginPath();
    if (config.role.includes("Tank")) {
        ctx.moveTo(-headRadius * 0.25, headRadius * 0.35);
        ctx.lineTo(headRadius * 0.25, headRadius * 0.35);
    } else if (config.prettyGirl) {
        ctx.strokeStyle = "#ff4466";
        ctx.arc(0, headRadius * 0.2, headRadius * 0.2, 0, Math.PI);
    } else {
        ctx.arc(0, headRadius * 0.25, headRadius * 0.25, 0, Math.PI);
    }
    ctx.stroke();
    ctx.restore();
}

// ==========================================================================
// CLIENT GAME ENGINE STATE
// ==========================================================================
class GameEngine {
    constructor() {
        this.socket = null;
        this.myId = null;
        this.roomCode = "ROOM1";
        this.playerName = "선덕고학생";
        this.selectedBrawler = "윤태수";
        
        this.mapWidth = 2000;
        this.mapHeight = 2000;
        
        this.players = {};
        this.boxes = {};
        this.cubes = {};
        this.projectiles = [];
        this.particles = [];
        
        this.hp = 4000;
        this.maxHp = 4000;
        this.ammo = 3;
        this.maxAmmo = 3;
        this.reloadProgress = 0;
        this.superPercent = 0;
        this.isSuperToggled = false;
        
        this.x = 1000;
        this.y = 1000;
        this.angle = 0;
        this.moving = false;
        this.dead = false;
        
        this.keys = {};
        this.mouse = { x: 0, y: 0, screenX: 0, screenY: 0, down: false };
        
        this.canvas = document.getElementById("game-canvas");
        this.ctx = this.canvas.getContext("2d");
        
        this.walls = [
            { x: 900, y: 900, w: 200, h: 200, type: "wall" },
            { x: 300, y: 300, w: 150, h: 300, type: "wall" },
            { x: 1550, y: 300, w: 150, h: 300, type: "wall" },
            { x: 300, y: 1400, w: 150, h: 300, type: "wall" },
            { x: 1550, y: 1400, w: 150, h: 300, type: "wall" },
            { x: 700, y: 500, w: 600, h: 60, type: "wall" },
            { x: 700, y: 1440, w: 600, h: 60, type: "wall" }
        ];

        this.bushes = [
            { x: 500, y: 500, r: 120 },
            { x: 1500, y: 500, r: 120 },
            { x: 500, y: 1500, r: 120 },
            { x: 1500, y: 1500, r: 120 },
            { x: 1000, y: 650, r: 90 },
            { x: 1000, y: 1350, r: 90 },
            { x: 600, y: 1000, r: 110 },
            { x: 1400, y: 1000, r: 110 }
        ];

        this.setupLobby();
        this.setupEvents();
    }

    setupLobby() {
        const grid = document.getElementById("brawler-grid");
        if (!grid) return;
        grid.innerHTML = "";

        Object.keys(BRAWLERS).forEach((key, index) => {
            const b = BRAWLERS[key];
            const card = document.createElement("div");
            card.className = "brawler-card glassmorphism" + (key === this.selectedBrawler ? " selected-card" : "");
            card.dataset.brawler = key;
            
            card.innerHTML = `
                <div class="brawler-avatar-wrapper">
                    <canvas class="brawler-avatar-canvas" id="canvas-${index}"></canvas>
                </div>
                <div class="brawler-card-name">${b.id}</div>
                <div class="brawler-card-role">${b.role}</div>
                <div class="brawler-stats">
                    <div class="stat-row"><span class="stat-lbl">체력</span><span class="stat-val">${b.hp}</span></div>
                    <div class="stat-row"><span class="stat-lbl">무기</span><span class="stat-val">${b.weapon}</span></div>
                </div>
                <p class="brawler-desc">${b.desc}</p>
            `;

            grid.appendChild(card);
            
            setTimeout(() => {
                const c = document.getElementById(`canvas-${index}`);
                if (c) {
                    c.width = 100;
                    c.height = 100;
                    const pCtx = c.getContext("2d");
                    drawBrawlerFace(pCtx, 50, 50, 32, b.id, 0, true);
                }
            }, 50);

            card.addEventListener("click", () => {
                document.querySelectorAll(".brawler-card").forEach(c => c.classList.remove("selected-card"));
                card.classList.add("selected-card");
                this.selectedBrawler = key;
                sfx.playPickup();
            });
        });
    }

    setupEvents() {
        const btnJoin = document.getElementById("btn-join");
        if (btnJoin) {
            btnJoin.addEventListener("click", () => {
                const nameInput = document.getElementById("player-name");
                this.playerName = nameInput ? (nameInput.value.trim() || "학생") : "학생";
                
                // 1. 방 코드를 CLASS104로 완전 고정
                this.roomCode = "CLASS104";
                
                // 2. 서버 주소를 화면 입력값 상관없이 무조건 렌더 주소로 강제 고정!!
                const fixedServerUrl = "wss://yesung-server.onrender.com";
                
                this.connectServer(fixedServerUrl);
            });
        }

        const btnLeave = document.getElementById("btn-leave");
        if (btnLeave) {
            btnLeave.addEventListener("click", () => {
                if (this.socket) {
                    this.socket.close();
                }
                this.switchScreen("lobby-screen");
            });
        }

        const btnModalBack = document.getElementById("btn-modal-back");
        if (btnModalBack) {
            btnModalBack.addEventListener("click", () => {
                document.getElementById("game-over-modal").classList.add("hidden");
                this.switchScreen("lobby-screen");
            });
        }
        
        const btnModalRestart = document.getElementById("btn-modal-restart");
        if (btnModalRestart) {
            btnModalRestart.addEventListener("click", () => {
                document.getElementById("game-over-modal").classList.add("hidden");
                if (this.socket && this.socket.readyState === WebSocket.OPEN) {
                    this.socket.send(jsonMsg("restart"));
                }
            });
        }

        window.addEventListener("keydown", (e) => {
            this.keys[e.key.toLowerCase()] = true;
            if (e.key === " " || e.key === "Spacebar") {
                e.preventDefault();
                this.toggleSuper();
            }
        });

        window.addEventListener("keyup", (e) => {
            this.keys[e.key.toLowerCase()] = false;
        });

        if (this.canvas) {
            this.canvas.addEventListener("mousemove", (e) => {
                const rect = this.canvas.getBoundingClientRect();
                this.mouse.screenX = e.clientX - rect.left;
                this.mouse.screenY = e.clientY - rect.top;
            });

            this.canvas.addEventListener("mousedown", (e) => {
                if (e.button === 0 && !this.dead) {
                    this.fireWeapon();
                }
            });
        }

        const btnSuper = document.getElementById("btn-super");
        if (btnSuper) {
            btnSuper.addEventListener("click", () => {
                this.toggleSuper();
            });
        }

        window.addEventListener("resize", () => this.resizeCanvas());
        this.resizeCanvas();
    }

    resizeCanvas() {
        if (!this.canvas || !this.canvas.parentElement) return;
        this.canvas.width = this.canvas.parentElement.clientWidth;
        this.canvas.height = this.canvas.parentElement.clientHeight;
    }

    switchScreen(screenId) {
        document.getElementById("lobby-screen").className = "inactive-screen";
        document.getElementById("game-screen").className = "inactive-screen";
        document.getElementById(screenId).className = "active-screen";
        
        if (screenId === "game-screen") {
            this.resizeCanvas();
            this.resetLocalPlayer();
        }
    }

    resetLocalPlayer() {
        const b = BRAWLERS[this.selectedBrawler];
        this.hp = b.hp;
        this.maxHp = b.hp;
        this.ammo = 3;
        this.superPercent = 0;
        this.isSuperToggled = false;
        this.dead = false;
        
        this.updateHUD();
    }

    // 서버 연결 함수 (고정된 URL만 받습니다)
    connectServer(wsUrl) {
        const overlay = document.getElementById("loading-overlay");
        if(overlay) overlay.classList.remove("hidden");
        
        try {
            // 무조건 wsUrl(wss://yesung-server.onrender.com)로 바로 연결
            this.socket = new WebSocket(wsUrl);
            
            this.socket.onopen = () => {
                if(overlay) overlay.classList.add("hidden");
                this.switchScreen("game-screen");
                
                this.socket.send(jsonMsg("join", {
                    name: this.playerName,
                    brawler: this.selectedBrawler,
                    roomCode: this.roomCode,
                    maxHp: BRAWLERS[this.selectedBrawler].hp
                }));
            };
            
            this.socket.onmessage = (e) => {
                const data = JSON.parse(e.data);
                this.handleServerMessage(data);
            };
            
            this.socket.onclose = () => {
                if(overlay) overlay.classList.add("hidden");
                this.switchScreen("lobby-screen");
                this.appendSystemChat("서버와의 연결이 끊어졌습니다.");
            };
            
            this.socket.onerror = (err) => {
                if(overlay) overlay.classList.add("hidden");
                this.switchScreen("lobby-screen");
                alert("서버 접속 실패! (서버가 켜지는 중일 수 있습니다. 1분 뒤 다시 시도해주세요.)");
            };
            
        } catch (e) {
            if(overlay) overlay.classList.add("hidden");
            alert("서버 주소 오류 발생!");
        }
    }

    handleServerMessage(data) {
        const type = data.type;
        
        if (type === "init") {
            this.myId = data.id;
            this.mapWidth = data.mapWidth;
            this.mapHeight = data.mapHeight;
            const hudRoom = document.getElementById("hud-room-code");
            if (hudRoom) hudRoom.textContent = data.roomCode;
            this.appendSystemChat(`대기실 [${data.roomCode}]에 입장했습니다!`);
            
            if (!this.loopRunning) {
                this.loopRunning = true;
                requestAnimationFrame((t) => this.gameLoop(t));
            }
        } 
        else if (type === "state") {
            const serverPlayers = data.players;
            
            Object.keys(serverPlayers).forEach(id => {
                const sPlayer = serverPlayers[id];
                if (id === this.myId) {
                    this.hp = sPlayer.hp;
                    this.maxHp = sPlayer.maxHp;
                    this.dead = sPlayer.dead;
                    this.superPercent = sPlayer.superCharge;
                    
                    const hudCubes = document.getElementById("hud-cubes");
                    if (hudCubes) hudCubes.textContent = sPlayer.cubes;
                    const hudKills = document.getElementById("hud-kills");
                    if (hudKills) hudKills.textContent = sPlayer.kills;
                    
                    this.updateSuperButtonState();
                    
                    if (this.dead) {
                        this.isSuperToggled = false;
                    }
                } else {
                    if (!this.players[id]) {
                        this.players[id] = { ...sPlayer, tx: sPlayer.x, ty: sPlayer.y, tangle: sPlayer.angle };
                    } else {
                        const p = this.players[id];
                        p.tx = sPlayer.x;
                        p.ty = sPlayer.y;
                        p.tangle = sPlayer.angle;
                        p.moving = sPlayer.moving;
                        p.hp = sPlayer.hp;
                        p.maxHp = sPlayer.maxHp;
                        p.cubes = sPlayer.cubes;
                        p.kills = sPlayer.kills;
                        p.dead = sPlayer.dead;
                        p.isSuperActive = sPlayer.isSuperActive;
                        p.name = sPlayer.name;
                        p.brawler = sPlayer.brawler;
                    }
                }
            });
            
            Object.keys(this.players).forEach(id => {
                if (!serverPlayers[id]) {
                    delete this.players[id];
                }
            });
            
            this.boxes = data.boxes;
            this.cubes = data.cubes;
            
            const min = Math.floor(data.timer / 60).toString().padStart(2, "0");
            const sec = (data.timer % 60).toString().padStart(2, "0");
            const matchTimer = document.getElementById("match-timer");
            if(matchTimer) matchTimer.textContent = `${min}:${sec}`;
        }
        else if (type === "shoot") {
            if (data.playerId !== this.myId) {
                const shooter = this.players[data.playerId];
                const brawlerId = shooter ? shooter.brawler : "윤태수";
                this.spawnProjectileGraphics(data.x, data.y, data.targetX, data.targetY, brawlerId, data.isSuper, data.playerId);
            }
        }
        else if (type === "kill_feed") {
            this.appendKillNotification(data.killer, data.victim, data.killerBrawler, data.victimBrawler);
            if (data.victim === this.playerName) {
                sfx.playDeath();
            }
        }
        else if (type === "chat") {
            this.appendSystemChat(data.text);
        }
        else if (type === "effect") {
            if (data.effectType === "pickup") {
                sfx.playPickup();
                const p = data.playerId === this.myId ? this : this.players[data.playerId];
                if (p) {
                    this.spawnUpgradeParticles(p.x, p.y);
                }
            } else if (data.effectType === "super") {
                sfx.playSuper();
            }
        }
        else if (type === "game_over") {
            this.showLeaderboard(data.ranks);
            sfx.playWin();
        }
    }

    updateMovement(dt) {
        if (this.dead) return;

        const b = BRAWLERS[this.selectedBrawler];
        let moveSpeed = b.speed;
        
        let dx = 0;
        let dy = 0;
        
        if (this.keys["w"] || this.keys["arrowup"]) dy -= 1;
        if (this.keys["s"] || this.keys["arrowdown"]) dy += 1;
        if (this.keys["a"] || this.keys["arrowleft"]) dx -= 1;
        if (this.keys["d"] || this.keys["arrowright"]) dx += 1;
        
        this.moving = (dx !== 0 || dy !== 0);
        
        if (this.moving) {
            const length = Math.sqrt(dx * dx + dy * dy);
            dx /= length;
            dy /= length;
            
            let nextX = this.x + dx * moveSpeed * dt * 60;
            let nextY = this.y + dy * moveSpeed * dt * 60;
            
            nextX = Math.max(50, Math.min(this.mapWidth - 50, nextX));
            nextY = Math.max(50, Math.min(this.mapHeight - 50, nextY));
            
            const pRadius = 22;
            for (let wall of this.walls) {
                let closestX = Math.max(wall.x, Math.min(nextX, wall.x + wall.w));
                let closestY = Math.max(wall.y, Math.min(nextY, wall.y + wall.h));
                
                let dist = Math.hypot(nextX - closestX, nextY - closestY);
                if (dist < pRadius) {
                    let overlap = pRadius - dist;
                    let pushX = (nextX - closestX) / (dist || 1);
                    let pushY = (nextY - closestY) / (dist || 1);
                    
                    nextX += pushX * overlap;
                    nextY += pushY * overlap;
                }
            }
            
            this.x = nextX;
            this.y = nextY;
        }

        const screenCenterX = this.canvas.width / 2;
        const screenCenterY = this.canvas.height / 2;
        this.angle = Math.atan2(this.mouse.screenY - screenCenterY, this.mouse.screenX - screenCenterX);
        
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(jsonMsg("move", {
                x: this.x,
                y: this.y,
                angle: this.angle,
                moving: this.moving
            }));
        }

        Object.keys(this.cubes).forEach(id => {
            const cube = this.cubes[id];
            const dist = Math.hypot(this.x - cube.x, this.y - cube.y);
            if (dist < 40) {
                this.socket.send(jsonMsg("pickup_cube", { cubeId: id }));
            }
        });
    }

    toggleSuper() {
        if (this.superPercent >= 100 && !this.dead) {
            this.isSuperToggled = !this.isSuperToggled;
            const btn = document.getElementById("btn-super");
            if(btn) {
                if (this.isSuperToggled) {
                    btn.style.boxShadow = "0 0 30px #ffffff, 0 0 45px var(--neon-amber)";
                    sfx.playPickup();
                } else {
                    btn.style.boxShadow = "";
                }
            }
        }
    }

    fireWeapon() {
        if (this.ammo <= 0) return;
        
        const b = BRAWLERS[this.selectedBrawler];
        this.ammo--;
        
        const isSuper = this.isSuperToggled;
        if (isSuper) {
            this.isSuperToggled = false;
            this.superPercent = 0;
            this.socket.send(jsonMsg("super_active", { active: true }));
        }

        const mapMouseX = this.x + (this.mouse.screenX - this.canvas.width / 2);
        const mapMouseY = this.y + (this.mouse.screenY - this.canvas.height / 2);

        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(jsonMsg("shoot", {
                x: this.x,
                y: this.y,
                targetX: mapMouseX,
                targetY: mapMouseY,
                isSuper: isSuper
            }));
        }

        let soundType = 'default';
        if (this.selectedBrawler === "박기덕") soundType = 'sniper';
        else if (this.selectedBrawler === "송창현" || this.selectedBrawler === "구본석") soundType = 'melee';
        else if (this.selectedBrawler === "윤태수") soundType = 'shotgun';
        else if (this.selectedBrawler === "이인석") soundType = 'thrower';
        
        sfx.playShoot(soundType);

        this.spawnProjectileGraphics(this.x, this.y, mapMouseX, mapMouseY, this.selectedBrawler, isSuper, this.myId);
    }

    spawnProjectileGraphics(sx, sy, tx, ty, brawlerId, isSuper, shooterId) {
        const config = BRAWLERS[brawlerId];
        if(!config) return;
        let angle = Math.atan2(ty - sy, tx - sx);
        
        if (brawlerId === "윤태수") {
            const spread = 0.08;
            const count = isSuper ? 8 : 5;
            const startIdx = -Math.floor(count / 2);
            for (let i = 0; i < count; i++) {
                let offset = (startIdx + i) * spread;
                this.addBullet(sx, sy, angle + offset, 450, 14, 60, config.color, isSuper, shooterId, brawlerId);
            }
        } 
        else if (brawlerId === "박기덕") {
            this.addBullet(sx, sy, angle, 850, 24, 110, config.color, isSuper, shooterId, brawlerId);
        }
        else if (brawlerId === "송창현") {
            for (let i = -2; i <= 2; i++) {
                this.addBullet(sx, sy, angle + i * 0.12, 380, 8, 20, config.color, isSuper, shooterId, brawlerId);
            }
        }
        else if (brawlerId === "이인석") {
            const dist = Math.hypot(tx - sx, ty - sy);
            const maxThrowDist = isSuper ? 400 : 320;
            const finalDist = Math.min(dist, maxThrowDist);
            const targetX = sx + Math.cos(angle) * finalDist;
            const targetY = sy + Math.sin(angle) * finalDist;
            
            this.projectiles.push({
                type: "lobbed",
                shooterId,
                brawlerId,
                sx, sy,
                x: sx, y: sy,
                tx: targetX, ty: targetY,
                radius: 12,
                progress: 0,
                speed: 3.5,
                isSuper,
                color: config.color
            });
        }
        else if (brawlerId === "김수교") {
            this.projectiles.push({
                type: "wave",
                shooterId,
                brawlerId,
                x: sx, y: sy,
                angle,
                speed: 480,
                range: 300,
                travelled: 0,
                width: 40,
                maxWidth: 150,
                isSuper,
                color: config.color
            });
            if (isSuper && shooterId === this.myId) {
                this.hp = Math.min(this.maxHp, this.hp + 2000);
                this.socket.send(jsonMsg("damage", { targetId: this.myId, amount: -2000 }));
                this.spawnHealParticles(this.x, this.y);
            }
        }
        else if (brawlerId === "조은성") {
            if (shooterId === this.myId && isSuper) {
                this.socket.send(jsonMsg("super_active", { active: true }));
                this.isSuperActive = true;
                setTimeout(() => {
                    this.isSuperActive = false;
                    this.socket.send(jsonMsg("super_active", { active: false }));
                }, 6000);
            } else {
                for (let i = 0; i < 4; i++) {
                    setTimeout(() => {
                        this.addBullet(sx, sy, angle, 680, 10, 80, config.color, false, shooterId, brawlerId);
                    }, i * 100);
                }
            }
        }
        else if (brawlerId === "김시량") {
            this.addBullet(sx, sy, angle, 600, 16, 75, config.color, isSuper, shooterId, brawlerId);
            if (isSuper && shooterId === this.myId) {
                this.spawnDrone();
            }
        }
        else if (brawlerId === "유시온") {
            for (let i = -1; i <= 1; i++) {
                this.addBullet(sx, sy, angle + i * 0.15, 620, 10, 75, config.color, isSuper, shooterId, brawlerId);
            }
            if (isSuper) {
                this.spawnLeapEffect(sx, sy, tx, ty);
            }
        }
        else if (brawlerId === "최종한") {
            this.addBullet(sx, sy, angle, 500, 14, 45, config.color, isSuper, shooterId, brawlerId);
            if (isSuper) {
                const p = shooterId === this.myId ? this : this.players[shooterId];
                if (p) {
                    p.shieldActive = true;
                    p.shieldTimer = 5.0;
                }
            }
        }
        else if (brawlerId === "구본석") {
            const dashDist = 120;
            const targetX = sx + Math.cos(angle) * dashDist;
            const targetY = sy + Math.sin(angle) * dashDist;
            
            if (shooterId === this.myId) {
                this.x = Math.max(50, Math.min(this.mapWidth - 50, targetX));
                this.y = Math.max(50, Math.min(this.mapHeight - 50, targetY));
                this.calculateMeleeSwipe(sx, sy, targetX, targetY, 1200);
            }
            
            if (isSuper) {
                for (let i = 0; i < 6; i++) {
                    this.addBullet(sx, sy, angle + (i - 2.5) * 0.25, 450, 12, 70, "#ff0066", true, shooterId, brawlerId);
                }
            }
        }
        else if (brawlerId === "김예진") {
            const dist = 240;
            const targetX = sx + Math.cos(angle) * dist;
            const targetY = sy + Math.sin(angle) * dist;
            
            this.projectiles.push({
                type: "spray",
                shooterId,
                brawlerId,
                x: targetX, y: targetY,
                radius: 10,
                maxRadius: 80,
                duration: 1.5,
                timer: 0,
                damageTimer: 0,
                isSuper,
                color: config.color
            });
        }
    }

    addBullet(sx, sy, angle, speed, radius, range, color, isSuper, shooterId, brawlerId) {
        this.projectiles.push({
            type: "bullet",
            shooterId,
            brawlerId,
            x: sx,
            y: sy,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            radius,
            range,
            travelled: 0,
            color,
            isSuper
        });
    }

    spawnDrone() {
        this.appendSystemChat("전투 지원용 드론 소환!");
        this.drone = {
            x: this.x - 50,
            y: this.y - 50,
            hp: 2000,
            maxHp: 2000,
            speed: 4.2,
            targetId: null,
            shootCooldown: 0
        };
    }

    calculateMeleeSwipe(sx, sy, tx, ty, damage) {
        const swipeRadius = 50;
        
        Object.keys(this.boxes).forEach(id => {
            const b = this.boxes[id];
            if (this.lineCircleIntersect(sx, sy, tx, ty, b.x, b.y, swipeRadius + 30)) {
                this.socket.send(jsonMsg("box_damage", { boxId: id, amount: damage }));
                this.spawnHitParticles(b.x, b.y);
            }
        });

        Object.keys(this.players).forEach(id => {
            const p = this.players[id];
            if (!p.dead && this.lineCircleIntersect(sx, sy, tx, ty, p.x, p.y, swipeRadius + 22)) {
                this.socket.send(jsonMsg("damage", { targetId: id, amount: damage }));
                this.spawnHitParticles(p.x, p.y);
                sfx.playHit();
            }
        });
    }

    lineCircleIntersect(x1, y1, x2, y2, cx, cy, r) {
        const dx = x2 - x1;
        const dy = y2 - y1;
        const len = Math.hypot(dx, dy);
        const u = (((cx - x1) * dx) + ((cy - y1) * dy)) / (len * len || 1);
        
        const clampedU = Math.max(0, Math.min(1, u));
        const closestX = x1 + clampedU * dx;
        const closestY = y1 + clampedU * dy;
        
        const dist = Math.hypot(cx - closestX, cy - closestY);
        return dist <= r;
    }

    update(dt) {
        this.updateMovement(dt);
        this.updateProjectiles(dt);
        this.updateParticles(dt);
        this.updateHUDRecharge(dt);
        this.updateRemoteLerp(dt);
        this.updateSummons(dt);
    }

    updateRemoteLerp(dt) {
        Object.keys(this.players).forEach(id => {
            const p = this.players[id];
            p.x += (p.tx - p.x) * 0.25;
            p.y += (p.ty - p.y) * 0.25;
            
            let diff = p.tangle - p.angle;
            diff = Math.atan2(Math.sin(diff), Math.cos(diff));
            p.angle += diff * 0.3;
            
            if (p.shieldActive) {
                p.shieldTimer -= dt;
                if (p.shieldTimer <= 0) p.shieldActive = false;
            }
        });
    }

    updateSummons(dt) {
        if (!this.drone) return;
        
        let nearestId = null;
        let minDist = 800;
        
        Object.keys(this.players).forEach(id => {
            const p = this.players[id];
            if (!p.dead) {
                const d = Math.hypot(p.x - this.drone.x, p.y - this.drone.y);
                if (d < minDist) {
                    minDist = d;
                    nearestId = id;
                }
            }
        });

        if (nearestId) {
            const target = this.players[nearestId];
            const angle = Math.atan2(target.y - this.drone.y, target.x - this.drone.x);
            
            this.drone.x += Math.cos(angle) * this.drone.speed * dt * 60;
            this.drone.y += Math.sin(angle) * this.drone.speed * dt * 60;
            
            this.drone.shootCooldown -= dt;
            if (this.drone.shootCooldown <= 0 && minDist < 300) {
                this.drone.shootCooldown = 1.0;
                this.addBullet(this.drone.x, this.drone.y, angle, 400, 6, 40, "#ffff00", false, this.myId, "김시량");
                this.socket.send(jsonMsg("shoot", {
                    x: this.drone.x,
                    y: this.drone.y,
                    targetX: target.x,
                    targetY: target.y,
                    isSuper: false
                }));
            }
        } else {
            const angle = Math.atan2(this.y - this.drone.y, this.x - this.drone.x);
            const dist = Math.hypot(this.x - this.drone.x, this.y - this.drone.y);
            if (dist > 100) {
                this.drone.x += Math.cos(angle) * this.drone.speed * dt * 60;
                this.drone.y += Math.sin(angle) * this.drone.speed * dt * 60;
            }
        }
    }

    updateProjectiles(dt) {
        for (let i = this.projectiles.length - 1; i >= 0; i--) {
            const proj = this.projectiles[i];
            
            if (proj.type === "bullet") {
                const stepX = proj.vx * dt;
                const stepY = proj.vy * dt;
                proj.x += stepX;
                proj.y += stepY;
                proj.travelled += Math.hypot(stepX, stepY);
                
                let isDead = false;
                
                for (let wall of this.walls) {
                    if (proj.x > wall.x && proj.x < wall.x + wall.w &&
                        proj.y > wall.y && proj.y < wall.y + wall.h) {
                        if (proj.isSuper && proj.brawlerId === "윤태수") {
                            this.spawnHitParticles(proj.x, proj.y);
                        } else if (!proj.isSuper) {
                            isDead = true;
                            this.spawnHitParticles(proj.x, proj.y);
                        }
                    }
                }
                
                if (proj.travelled >= proj.range * 4.5) {
                    isDead = true;
                }
                
                if (proj.shooterId === this.myId) {
                    Object.keys(this.boxes).forEach(boxId => {
                        if (isDead) return;
                        const box = this.boxes[boxId];
                        const dist = Math.hypot(proj.x - box.x, proj.y - box.y);
                        if (dist < 32) {
                            let dmg = proj.isSuper ? 1600 : 800;
                            const cubeCount = parseInt(document.getElementById("hud-cubes").textContent) || 0;
                            dmg = Math.floor(dmg * (1.0 + cubeCount * 0.1));
                            
                            this.socket.send(jsonMsg("box_damage", { boxId, amount: dmg }));
                            this.spawnHitParticles(proj.x, proj.y);
                            isDead = true;
                            sfx.playHit();
                        }
                    });
                    
                    Object.keys(this.players).forEach(pId => {
                        if (isDead) return;
                        const target = this.players[pId];
                        if (target.dead) return;
                        
                        if (target.shieldActive) {
                            const dist = Math.hypot(proj.x - target.x, proj.y - target.y);
                            if (dist < 40) {
                                isDead = true;
                                this.spawnHitParticles(proj.x, proj.y);
                                return;
                            }
                        }

                        const dist = Math.hypot(proj.x - target.x, proj.y - target.y);
                        if (dist < 26) {
                            let dmg = proj.isSuper ? 1800 : 900;
                            if (proj.brawlerId === "유시온") {
                                this.triggerPoisonEffect(pId, 150, 4);
                            }
                            
                            const cubeCount = parseInt(document.getElementById("hud-cubes").textContent) || 0;
                            dmg = Math.floor(dmg * (1.0 + cubeCount * 0.15));
                            
                            this.socket.send(jsonMsg("damage", { targetId: pId, amount: dmg }));
                            this.spawnHitParticles(proj.x, proj.y);
                            
                            if (proj.brawlerId === "구본석" && proj.isSuper) {
                                this.hp = Math.min(this.maxHp, this.hp + dmg * 0.8);
                                this.socket.send(jsonMsg("damage", { targetId: this.myId, amount: -dmg * 0.8 }));
                                this.spawnHealParticles(this.x, this.y);
                            }
                            
                            isDead = true;
                            sfx.playHit();
                        }
                    });
                }
                
                if (isDead) {
                    this.projectiles.splice(i, 1);
                }
            } 
            else if (proj.type === "lobbed") {
                proj.progress += dt * proj.speed;
                if (proj.progress >= 1.0) {
                    this.spawnExplodePuddle(proj.tx, proj.ty, proj.isSuper, proj.shooterId);
                    this.projectiles.splice(i, 1);
                } else {
                    proj.x = proj.sx + (proj.tx - proj.sx) * proj.progress;
                    proj.y = proj.sy + (proj.ty - proj.sy) * proj.progress;
                }
            }
            else if (proj.type === "wave") {
                proj.travelled += proj.speed * dt;
                proj.width = proj.width + (proj.maxWidth - proj.width) * (proj.travelled / proj.range);
                
                proj.x += Math.cos(proj.angle) * proj.speed * dt;
                proj.y += Math.sin(proj.angle) * proj.speed * dt;
                
                if (proj.shooterId === this.myId) {
                    Object.keys(this.boxes).forEach(boxId => {
                        const box = this.boxes[boxId];
                        const dist = Math.hypot(proj.x - box.x, proj.y - box.y);
                        if (dist < proj.travelled && dist < proj.range) {
                            const targetAngle = Math.atan2(box.y - proj.y, box.x - proj.x);
                            let aDiff = Math.abs(targetAngle - proj.angle);
                            aDiff = Math.atan2(Math.sin(aDiff), Math.cos(aDiff));
                            if (Math.abs(aDiff) < 0.35 && !box.hitByWave) {
                                box.hitByWave = true;
                                this.socket.send(jsonMsg("box_damage", { boxId, amount: 600 }));
                                setTimeout(() => { box.hitByWave = false; }, 500);
                            }
                        }
                    });
                    
                    Object.keys(this.players).forEach(pId => {
                        const p = this.players[pId];
                        if (p.dead) return;
                        const dist = Math.hypot(p.x - proj.x, p.y - proj.y);
                        if (dist < 40 && !p.hitByWave) {
                            p.hitByWave = true;
                            this.socket.send(jsonMsg("damage", { targetId: pId, amount: 800 }));
                            setTimeout(() => { p.hitByWave = false; }, 500);
                        }
                    });
                }
                
                if (proj.travelled >= proj.range) {
                    this.projectiles.splice(i, 1);
                }
            }
            else if (proj.type === "spray") {
                proj.timer += dt;
                proj.radius = proj.radius + (proj.maxRadius - proj.radius) * (proj.timer / proj.duration);
                
                proj.damageTimer += dt;
                if (proj.damageTimer >= 0.4) {
                    proj.damageTimer = 0;
                    
                    if (proj.shooterId === this.myId) {
                        Object.keys(this.boxes).forEach(boxId => {
                            const b = this.boxes[boxId];
                            if (Math.hypot(b.x - proj.x, b.y - proj.y) < proj.radius + 20) {
                                this.socket.send(jsonMsg("box_damage", { boxId, amount: 350 }));
                            }
                        });
                        
                        Object.keys(this.players).forEach(pId => {
                            const p = this.players[pId];
                            if (!p.dead && Math.hypot(p.x - proj.x, p.y - proj.y) < proj.radius + 20) {
                                this.socket.send(jsonMsg("damage", { targetId: pId, amount: 450 }));
                            }
                        });
                    }
                }
                
                if (proj.timer >= proj.duration) {
                    this.projectiles.splice(i, 1);
                }
            }
        }
    }

    spawnExplodePuddle(x, y, isSuper, shooterId) {
        this.spawnExplodeParticles(x, y, isSuper ? 100 : 50);
        this.projectiles.push({
            type: "spray",
            shooterId,
            brawlerId: "이인석",
            x, y,
            radius: isSuper ? 40 : 25,
            maxRadius: isSuper ? 100 : 65,
            duration: isSuper ? 3.5 : 2.2,
            timer: 0,
            damageTimer: 0,
            isSuper,
            color: isSuper ? "#ff3300" : "#a2ff00"
        });
    }

    triggerPoisonEffect(targetId, dmgPerTick, durationSec) {
        let count = 0;
        const interval = setInterval(() => {
            if (this.players[targetId] && !this.players[targetId].dead && count < durationSec) {
                this.socket.send(jsonMsg("damage", { targetId, amount: dmgPerTick }));
                this.spawnHitParticles(this.players[targetId].x, this.players[targetId].y, "#7cfc00");
                count++;
            } else {
                clearInterval(interval);
            }
        }, 800);
    }

    updateParticles(dt) {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx * dt * 60;
            p.y += p.vy * dt * 60;
            p.life -= dt;
            if (p.life <= 0) {
                this.particles.splice(i, 1);
            }
        }
    }

    spawnHitParticles(x, y, color = "#fff") {
        for (let i = 0; i < 8; i++) {
            const angle = Math.random() * Math.PI * 2;
            const spd = Math.random() * 3 + 1;
            this.particles.push({
                x, y,
                vx: Math.cos(angle) * spd,
                vy: Math.sin(angle) * spd,
                color,
                radius: Math.random() * 3 + 2,
                life: 0.25
            });
        }
    }

    spawnHealParticles(x, y) {
        for (let i = 0; i < 15; i++) {
            this.particles.push({
                x: x + (Math.random() - 0.5) * 40,
                y: y + (Math.random() - 0.5) * 40,
                vx: 0,
                vy: -Math.random() * 2 - 1,
                color: "#39ff14",
                radius: Math.random() * 4 + 2,
                life: 0.5
            });
        }
    }

    spawnUpgradeParticles(x, y) {
        for (let i = 0; i < 20; i++) {
            const angle = Math.random() * Math.PI * 2;
            const spd = Math.random() * 4 + 2;
            this.particles.push({
                x, y,
                vx: Math.cos(angle) * spd,
                vy: Math.sin(angle) * spd,
                color: "#ffdd00",
                radius: Math.random() * 5 + 3,
                life: 0.6
            });
        }
    }

    spawnExplodeParticles(x, y, maxR) {
        for (let i = 0; i < 25; i++) {
            const angle = Math.random() * Math.PI * 2;
            const spd = Math.random() * (maxR / 12) + 2;
            this.particles.push({
                x, y,
                vx: Math.cos(angle) * spd,
                vy: Math.sin(angle) * spd,
                color: Math.random() > 0.5 ? "#ffaa00" : "#ff3300",
                radius: Math.random() * 6 + 3,
                life: 0.45
            });
        }
    }

    spawnLeapEffect(sx, sy, tx, ty) {
        for (let i = 0; i < 12; i++) {
            const a = Math.random() * Math.PI * 2;
            const s = Math.random() * 2 + 1;
            this.particles.push({
                x: sx, y: sy,
                vx: Math.cos(a) * s, vy: Math.sin(a) * s,
                color: "#00f0ff",
                radius: Math.random() * 4 + 2,
                life: 0.3
            });
        }
        
        this.x = Math.max(50, Math.min(this.mapWidth - 50, tx));
        this.y = Math.max(50, Math.min(this.mapHeight - 50, ty));
        
        for (let idx = 0; idx < 8; idx++) {
            const a = (idx / 8) * Math.PI * 2;
            this.addBullet(this.x, this.y, a, 550, 10, 60, "#00f0ff", false, this.myId, "유시온");
        }
    }

    updateHUDRecharge(dt) {
        const b = BRAWLERS[this.selectedBrawler];
        if(!b) return;
        if (this.ammo < this.maxAmmo) {
            this.reloadProgress += dt;
            if (this.reloadProgress >= b.reloadTime) {
                this.ammo++;
                this.reloadProgress = 0;
            }
        }
        this.updateHUD();
    }

    updateHUD() {
        const hpFill = document.getElementById("player-hp-fill");
        const hpText = document.getElementById("player-hp-text");
        if(hpFill && hpText) {
            const hpPercent = Math.max(0, (this.hp / this.maxHp) * 100);
            hpFill.style.width = `${hpPercent}%`;
            hpText.textContent = `${this.hp} / ${this.maxHp}`;
            
            if (this.dead) {
                hpFill.style.width = "0%";
                hpText.textContent = "부활 대기 중...";
            }
        }

        const ammoBars = document.querySelectorAll(".ammo-bar");
        ammoBars.forEach((bar, index) => {
            if (index < this.ammo) {
                bar.className = "ammo-bar active-ammo";
            } else {
                bar.className = "ammo-bar";
            }
        });

        const superPercentEl = document.getElementById("super-percent");
        if(superPercentEl) superPercentEl.textContent = `${this.superPercent}%`;
        this.updateSuperButtonState();
    }

    updateSuperButtonState() {
        const btn = document.getElementById("btn-super");
        if(!btn) return;
        if (this.superPercent >= 100) {
            btn.className = "super-btn ready-super";
            btn.disabled = false;
        } else {
            btn.className = "super-btn disabled-super";
            btn.disabled = true;
            btn.style.boxShadow = "";
        }
    }

    appendKillNotification(killer, victim, kBr, vBr) {
        const feed = document.getElementById("kill-feed");
        if(!feed) return;
        const item = document.createElement("div");
        item.className = "kill-item";
        
        item.innerHTML = `
            <span><strong class="killer-name">${killer}</strong> (${kBr})</span>
            <i class="fa-solid fa-crosshairs" style="color: #666; margin: 0 10px;"></i>
            <span><strong class="victim-name">${victim}</strong> (${vBr})</span>
        `;
        
        feed.appendChild(item);
        
        setTimeout(() => {
            item.remove();
        }, 4000);
    }

    appendSystemChat(text) {
        const chat = document.getElementById("system-chat");
        if(!chat) return;
        const msg = document.createElement("div");
        msg.className = "chat-msg";
        msg.textContent = text;
        
        chat.appendChild(msg);
        chat.scrollTop = chat.scrollHeight;
        
        setTimeout(() => {
            msg.remove();
        }, 6000);
    }

    showLeaderboard(ranks) {
        const modal = document.getElementById("game-over-modal");
        const tbody = document.getElementById("leaderboard-body");
        if(!modal || !tbody) return;
        tbody.innerHTML = "";
        
        ranks.forEach((row, idx) => {
            const tr = document.createElement("tr");
            tr.className = idx === 0 ? "rank-1" : idx === 1 ? "rank-2" : idx === 2 ? "rank-3" : "rank-other";
            
            const badgeClass = idx < 3 ? "rank-badge" : "rank-badge";
            
            tr.innerHTML = `
                <td><span class="${badgeClass}">${idx + 1}</span></td>
                <td><strong>${row.name}</strong> (${row.brawler})</td>
                <td>${row.kills}</td>
                <td><i class="fa-solid fa-gem cube-color" style="margin-right: 4px;"></i>${row.cubes}</td>
            `;
            tbody.appendChild(tr);
        });
        
        modal.classList.remove("hidden");
    }

    gameLoop(timestamp) {
        if (!this.loopRunning) return;
        
        if (!this.lastFrameTime) this.lastFrameTime = timestamp;
        let dt = (timestamp - this.lastFrameTime) / 1000;
        this.lastFrameTime = timestamp;
        
        if (dt > 0.1) dt = 0.1;

        this.update(dt);
        this.draw();
        
        requestAnimationFrame((t) => this.gameLoop(t));
    }

    draw() {
        const ctx = this.ctx;
        const canvas = this.canvas;
        if(!ctx || !canvas) return;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const camX = this.x - canvas.width / 2;
        const camY = this.y - canvas.height / 2;
        
        ctx.save();
        ctx.translate(-camX, -camY);
        
        ctx.fillStyle = "#1e2230";
        ctx.fillRect(0, 0, this.mapWidth, this.mapHeight);
        
        ctx.strokeStyle = "rgba(255,255,255,0.03)";
        ctx.lineWidth = 2;
        const gridGap = 80;
        for (let x = 0; x < this.mapWidth; x += gridGap) {
            ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, this.mapHeight); ctx.stroke();
        }
        for (let y = 0; y < this.mapHeight; y += gridGap) {
            ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(this.mapWidth, y); ctx.stroke();
        }
        
        ctx.strokeStyle = "#ff0066";
        ctx.lineWidth = 10;
        ctx.strokeRect(0, 0, this.mapWidth, this.mapHeight);

        ctx.fillStyle = "rgba(40, 167, 69, 0.4)";
        ctx.strokeStyle = "rgba(40, 167, 69, 0.6)";
        ctx.lineWidth = 4;
        this.bushes.forEach(bush => {
            ctx.beginPath();
            ctx.arc(bush.x, bush.y, bush.r, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
        });

        ctx.fillStyle = "#4a5568";
        ctx.strokeStyle = "#2d3748";
        ctx.lineWidth = 6;
        this.walls.forEach(wall => {
            ctx.beginPath();
            ctx.roundRect(wall.x, wall.y, wall.w, wall.h, 12);
            ctx.fill();
            ctx.stroke();
        });

        Object.keys(this.cubes).forEach(id => {
            const cube = this.cubes[id];
            
            ctx.save();
            ctx.translate(cube.x, cube.y + Math.sin(Date.now() / 150) * 4);
            
            ctx.fillStyle = "#39ff14";
            ctx.beginPath();
            ctx.moveTo(0, -14);
            ctx.lineTo(12, 0);
            ctx.lineTo(0, 14);
            ctx.lineTo(-12, 0);
            ctx.closePath();
            ctx.fill();
            
            ctx.strokeStyle = "#ffffff";
            ctx.lineWidth = 2;
            ctx.stroke();
            
            ctx.restore();
        });

        Object.keys(this.boxes).forEach(id => {
            const box = this.boxes[id];
            
            ctx.fillStyle = "#a87132";
            ctx.strokeStyle = "#5a3a14";
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.roundRect(box.x - 30, box.y - 30, 60, 60, 6);
            ctx.fill();
            ctx.stroke();
            
            if (box.hp < box.maxHp) {
                const barW = 50;
                const barH = 5;
                ctx.fillStyle = "rgba(0,0,0,0.5)";
                ctx.fillRect(box.x - barW/2, box.y - 42, barW, barH);
                
                ctx.fillStyle = "#00ff66";
                ctx.fillRect(box.x - barW/2, box.y - 42, barW * (box.hp / box.maxHp), barH);
            }
            
            ctx.strokeStyle = "rgba(0, 0, 0, 0.25)";
            ctx.lineWidth = 8;
            ctx.beginPath();
            ctx.moveTo(box.x - 16, box.y - 16);
            ctx.lineTo(box.x + 16, box.y + 16);
            ctx.moveTo(box.x + 16, box.y - 16);
            ctx.lineTo(box.x - 16, box.y + 16);
            ctx.stroke();
        });

        if (this.drone) {
            ctx.fillStyle = "#555";
            ctx.strokeStyle = "#00f0ff";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(this.drone.x, this.drone.y, 16, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            ctx.fillStyle = "#00f0ff";
            ctx.beginPath();
            ctx.arc(this.drone.x - 5, this.drone.y - 3, 2, 0, Math.PI * 2);
            ctx.arc(this.drone.x + 5, this.drone.y - 3, 2, 0, Math.PI * 2);
            ctx.fill();
        }

        const inBush = (px, py) => {
            for (let bush of this.bushes) {
                if (Math.hypot(px - bush.x, py - bush.y) < bush.r) {
                    return true;
                }
            }
            return false;
        };

        const localInBush = inBush(this.x, this.y);

        Object.keys(this.players).forEach(id => {
            const p = this.players[id];
            if (p.dead) return;
            
            const targetInBush = inBush(p.x, p.y);
            const isStealth = p.isSuperActive; 
            
            let shouldDraw = true;
            let opacity = 1.0;
            
            if (isStealth) {
                const d = Math.hypot(this.x - p.x, this.y - p.y);
                if (d > 140) {
                    shouldDraw = false;
                } else {
                    opacity = 0.35; 
                }
            }
            else if (targetInBush) {
                if (!localInBush) {
                    const d = Math.hypot(this.x - p.x, this.y - p.y);
                    if (d > 130) {
                        shouldDraw = false;
                    } else {
                        opacity = 0.5; 
                    }
                } else {
                    opacity = 0.6; 
                }
            }
            
            if (shouldDraw) {
                ctx.save();
                ctx.globalAlpha = opacity;
                this.drawPlayerCharacter(ctx, p);
                ctx.restore();
            }
        });

        if (!this.dead) {
            ctx.save();
            if (localInBush) {
                ctx.globalAlpha = 0.55; 
            }
            this.drawPlayerCharacter(ctx, this);
            ctx.restore();
        }

        this.projectiles.forEach(proj => {
            ctx.save();
            ctx.fillStyle = proj.color || "#ffffff";
            
            if (proj.type === "bullet") {
                ctx.beginPath();
                ctx.arc(proj.x, proj.y, proj.radius, 0, Math.PI * 2);
                ctx.fill();
                
                if (proj.isSuper) {
                    ctx.shadowBlur = 15;
                    ctx.shadowColor = proj.color;
                    ctx.strokeStyle = "#fff";
                    ctx.lineWidth = 2;
                    ctx.stroke();
                }
            } 
            else if (proj.type === "lobbed") {
                ctx.fillStyle = proj.color;
                ctx.beginPath();
                ctx.arc(proj.x, proj.y, proj.radius, 0, Math.PI * 2);
                ctx.fill();
                
                ctx.fillStyle = "rgba(0,0,0,0.3)";
                ctx.beginPath();
                ctx.arc(proj.x, proj.y + proj.progress * 15, proj.radius * 0.9, 0, Math.PI * 2);
                ctx.fill();
            }
            else if (proj.type === "wave") {
                ctx.strokeStyle = proj.color;
                ctx.lineWidth = 12;
                ctx.lineCap = "round";
                ctx.beginPath();
                const startAngle = proj.angle - 0.45;
                const endAngle = proj.angle + 0.45;
                ctx.arc(proj.x, proj.y, proj.travelled, startAngle, endAngle);
                ctx.stroke();
            }
            else if (proj.type === "spray") {
                ctx.globalAlpha = 0.35 * (1.0 - proj.timer / proj.duration);
                ctx.beginPath();
                ctx.arc(proj.x, proj.y, proj.radius, 0, Math.PI * 2);
                ctx.fill();
            }
            
            ctx.restore();
        });

        this.particles.forEach(p => {
            ctx.save();
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.life / 0.5;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        });

        ctx.restore(); 
    }

    drawPlayerCharacter(ctx, p) {
        const isLocal = (p.id === this.myId || !p.id);
        const bName = isLocal ? this.selectedBrawler : p.brawler;
        const config = BRAWLERS[bName];
        
        if (!config) return;

        if (isLocal) {
            ctx.save();
            ctx.strokeStyle = "rgba(255,255,255,0.18)";
            ctx.lineWidth = 4;
            ctx.setLineDash([8, 6]);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.x + Math.cos(p.angle) * 160, p.y + Math.sin(p.angle) * 160);
            ctx.stroke();
            ctx.restore();
        }

        if (p.shieldActive) {
            ctx.save();
            ctx.strokeStyle = "rgba(0, 240, 255, 0.7)";
            ctx.lineWidth = 8;
            ctx.shadowBlur = 10;
            ctx.shadowColor = "#00f0ff";
            ctx.beginPath();
            ctx.arc(p.x, p.y, 40, p.angle - 0.6, p.angle + 0.6);
            ctx.stroke();
            ctx.restore();
        }

        drawBrawlerFace(ctx, p.x, p.y, 22, bName, p.angle, false);

        ctx.fillStyle = "rgba(0, 0, 0, 0.45)";
        ctx.fillRect(p.x - 35, p.y - 48, 70, 6);
        
        ctx.fillStyle = isLocal ? "#39ff14" : "#ff3131";
        const hpPercent = Math.max(0, p.hp / p.maxHp);
        ctx.fillRect(p.x - 35, p.y - 48, 70 * hpPercent, 6);
        
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.strokeRect(p.x - 35, p.y - 48, 70, 6);

        ctx.font = "bold 11px Outfit, sans-serif";
        ctx.textAlign = "center";
        
        ctx.fillStyle = "white";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2.5;
        const nameText = isLocal ? this.playerName : p.name;
        ctx.strokeText(nameText, p.x, p.y - 56);
        ctx.fillText(nameText, p.x, p.y - 56);
        
        if (p.cubes > 0) {
            ctx.fillStyle = "#39ff14";
            ctx.font = "bold 10px Outfit";
            ctx.strokeText(`[${p.cubes}]`, p.x, p.y - 68);
            ctx.fillText(`[${p.cubes}]`, p.x, p.y - 68);
        }
    }
}

function jsonMsg(type, payload = {}) {
    return JSON.stringify({ type, ...payload });
}

window.addEventListener("load", () => {
    window.game = new GameEngine();
});
