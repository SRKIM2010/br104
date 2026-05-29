// ==========================================================================
// YESUNG STARS - Core Game Client
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
            // High pitch sharp shot
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(880, now);
            osc.frequency.exponentialRampToValueAtTime(110, now + 0.15);
            gain.gain.setValueAtTime(0.2, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
            osc.start(now);
            osc.stop(now + 0.15);
        } else if (type === 'shotgun' || type === 'melee') {
            // Noise-like low blast
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(150, now);
            osc.frequency.linearRampToValueAtTime(40, now + 0.1);
            gain.gain.setValueAtTime(0.3, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
            osc.start(now);
            osc.stop(now + 0.1);
        } else if (type === 'thrower') {
            // Swoosh up
            osc.type = 'sine';
            osc.frequency.setValueAtTime(300, now);
            osc.frequency.exponentialRampToValueAtTime(600, now + 0.2);
            gain.gain.setValueAtTime(0.15, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
            osc.start(now);
            osc.stop(now + 0.2);
        } else {
            // Default laser
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
        
        // Power charge sound (multiple oscillators)
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
        const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5
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
// Brawler Configurations and Rendering Data
// ==========================================================================
const BRAWLERS = {
    "윤태수": {
        id: "윤태수",
        role: "Shell Blaster",
        hp: 4000,
        speed: 5.0,
        reloadTime: 1.4, // seconds
        weapon: "Spread Shotgun",
        superName: "Super Blast",
        desc: "부채꼴 모양으로 5발의 산탄을 쏩니다. 가까이서 쏘면 치명적입니다.",
        superDesc: "지형지물을 파괴하는 강력한 탄환을 넓게 뿜어냅니다.",
        color: "#00bfff",
        // Visual custom settings
        mushroomHair: true,
        glasses: "round"
    },
    "박기덕": {
        id: "박기덕",
        role: "Sniper",
        hp: 3200,
        speed: 5.5,
        reloadTime: 1.7,
        weapon: "Laser Rifle",
        superName: "Piercing Laser",
        desc: "사거리가 매우 길고 강력한 레이저 탄환 1발을 발사합니다.",
        superDesc: "벽을 관통해 적을 저격하는 강력한 빔을 충전해 쏩니다.",
        color: "#bd00ff",
        baldingHair: true,
        glasses: "square"
    },
    "송창현": {
        id: "송창현",
        role: "Melee Tank",
        hp: 6000,
        speed: 6.0,
        reloadTime: 0.9,
        weapon: "Heavy Fists",
        superName: "Hedgehog Charge",
        desc: "매우 짧은 사거리지만 연사 속도가 무척 빠른 주먹을 내지릅니다.",
        superDesc: "빠른 속도로 전방으로 돌진하여 충돌한 적들을 크게 밀쳐냅니다.",
        color: "#ff3333",
        hedgehogHair: true,
        glasses: "round"
    },
    "이인석": {
        id: "이인석",
        role: "Grenadier",
        hp: 3000,
        speed: 4.8,
        reloadTime: 1.5,
        weapon: "Acid Flask",
        superName: "Toxic Pool",
        desc: "장벽을 넘겨 독병을 던집니다. 바닥에 깔린 독은 지속 피해를 줍니다.",
        superDesc: "엄청난 크기의 독병을 던져 넓은 구역에 치명적인 독 지대를 만듭니다.",
        color: "#ffaa00",
        roundHair: true,
        glasses: "round"
    },
    "김수교": {
        id: "김수교",
        role: "Support Healer",
        hp: 3800,
        speed: 5.0,
        reloadTime: 1.2,
        weapon: "Melody Wave",
        superName: "Healing Chord",
        desc: "적을 관통하는 넓은 음파를 발사합니다. 아군도 관통합니다.",
        superDesc: "즉시 자신과 일정 범위 안의 모든 플레이어 체력을 대폭 치유합니다.",
        color: "#00ff66",
        skinnyBody: true,
        glasses: "none",
        shortHair: true
    },
    "조은성": {
        id: "조은성",
        role: "Stealth Assassin",
        hp: 3400,
        speed: 6.2,
        reloadTime: 1.3,
        weapon: "Ninja Shurikens",
        superName: "Smoke Screen",
        desc: "빠르게 날아가는 4발의 수리검을 일렬로 던집니다.",
        superDesc: "6초 동안 은신하여 적의 눈에 보이지 않게 됩니다. 공격 시 풀립니다.",
        color: "#e066ff",
        chubbyBody: true,
        femaleHair: "brown",
        glasses: "round"
    },
    "김시량": {
        id: "김시량",
        role: "Summoner",
        hp: 3800,
        speed: 5.0,
        reloadTime: 1.25,
        weapon: "Earth Shockwave",
        superName: "Combat Drone",
        desc: "대지를 뒤흔드는 직진 충격파를 발사해 전방의 적들을 가격합니다.",
        superDesc: "주변의 적을 자동으로 추적해 공격하는 소형 로봇 드론을 소환합니다.",
        color: "#ffea00",
        handsomeHair: true,
        glasses: "stylish"
    },
    "유시온": {
        id: "유시온",
        role: "Poison Skirmisher",
        hp: 3000,
        speed: 6.2,
        reloadTime: 1.3,
        weapon: "Poison Daggers",
        superName: "Air Swoop",
        desc: "부채꼴로 독 단검 3발을 날립니다. 맞은 적은 독에 걸려 지속 피해를 줍니다.",
        superDesc: "공중으로 높이 점프한 후 착지 지점 주변에 무수한 독 단검을 날립니다.",
        color: "#00f0ff",
        richHair: true,
        female: true,
        glasses: "none"
    },
    "최종한": {
        id: "최종한",
        role: "Shield Defender",
        hp: 5500,
        speed: 4.8,
        reloadTime: 1.4,
        weapon: "Short Plasma",
        superName: "Energy Barrier",
        desc: "사거리가 다소 짧지만 묵직한 플라즈마 파동을 뿜어냅니다.",
        superDesc: "자신 앞에 모든 탄환을 막아주는 에너지 방벽(쉴드)을 5초 동안 켭니다.",
        color: "#ff8c00",
        squareFace: true,
        shortHair: true,
        glasses: "square"
    },
    "구본석": {
        id: "구본석",
        role: "Dash Slasher",
        hp: 3800,
        speed: 6.2,
        reloadTime: 1.8,
        weapon: "Shovel Dash",
        superName: "Bat Tempest",
        desc: "공격 방향으로 돌진하며 삽을 휘둘러 궤적 안의 적들에게 피해를 줍니다.",
        superDesc: "박쥐 떼를 날려 적들을 흡혈하고, 입힌 피해만큼 체력을 회복합니다.",
        color: "#d10034",
        chubbyBody: true,
        roundHair: true,
        glasses: "round"
    },
    "김예진": {
        id: "김예진",
        role: "Toxic Control",
        hp: 3600,
        speed: 5.0,
        reloadTime: 1.5,
        weapon: "Toxic Spray",
        superName: "Slowing Fog",
        desc: "일정 거리를 날아간 후 공중에 머물며 지속 피해를 주는 가스 구름을 뿜습니다.",
        superDesc: "자신을 중심으로 넓은 모래바람을 뿜어 영역 안의 적을 느리게 만들고 지속딜을 줍니다.",
        color: "#7cfc00",
        prettyGirl: true,
        female: true,
        glasses: "none"
    }
};

// Drawing helper function for avatars & game sprites
function drawBrawlerFace(ctx, x, y, radius, brawlerId, angle = 0, isLobbyCard = false) {
    const config = BRAWLERS[brawlerId];
    if (!config) return;

    ctx.save();
    ctx.translate(x, y);
    if (!isLobbyCard) {
        ctx.rotate(angle);
    }

    // Determine Head shape and size
    let headRadius = radius;
    let isSquare = config.squareFace;
    
    if (config.skinnyBody) headRadius *= 0.88;
    if (config.chubbyBody) headRadius *= 1.12;

    // 1. Draw Head Skin
    ctx.fillStyle = "#ffdbac"; // Skin tone
    ctx.strokeStyle = "#333";
    ctx.lineWidth = headRadius * 0.12;

    if (isSquare) {
        // Draw square face (rounded rectangle)
        const size = headRadius * 1.8;
        ctx.beginPath();
        ctx.roundRect(-size/2, -size/2, size, size, headRadius * 0.4);
        ctx.fill();
        ctx.stroke();
    } else {
        // Circle face
        ctx.beginPath();
        ctx.arc(0, 0, headRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    }

    // 2. Draw Hair
    ctx.fillStyle = "#332211"; // default hair color
    if (config.color) {
        // Color match hair sometimes or keep natural
    }

    if (config.mushroomHair) {
        // Mushroom Hair: big cap on top
        ctx.fillStyle = "#5c4033"; // Mushroom brown
        ctx.beginPath();
        ctx.arc(0, -headRadius * 0.2, headRadius * 1.15, Math.PI, 0);
        ctx.fill();
        ctx.stroke();
        // side bangs
        ctx.beginPath();
        ctx.ellipse(-headRadius * 0.8, headRadius * 0.1, headRadius * 0.4, headRadius * 0.5, 0.2, 0, Math.PI * 2);
        ctx.ellipse(headRadius * 0.8, headRadius * 0.1, headRadius * 0.4, headRadius * 0.5, -0.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    } 
    else if (config.baldingHair) {
        // Balding top: hair only on left and right side arcs
        ctx.fillStyle = "#888888"; // Grey hair
        // Left hair
        ctx.beginPath();
        ctx.arc(-headRadius * 0.9, headRadius * 0.2, headRadius * 0.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        // Right hair
        ctx.beginPath();
        ctx.arc(headRadius * 0.9, headRadius * 0.2, headRadius * 0.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    } 
    else if (config.hedgehogHair) {
        // Hedgehog spiky hair: triangles pointing outwards
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
        // Round hair: perfectly round black cap
        ctx.fillStyle = "#222222";
        ctx.beginPath();
        ctx.arc(0, -headRadius * 0.2, headRadius * 1.05, Math.PI, 0);
        ctx.fill();
        ctx.stroke();
    } 
    else if (config.shortHair) {
        // Short hair
        ctx.fillStyle = "#1a1a1a";
        ctx.beginPath();
        ctx.arc(0, -headRadius * 0.3, headRadius * 1.0, Math.PI * 1.1, Math.PI * 1.9);
        ctx.lineTo(0, -headRadius * 0.3);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }
    else if (config.femaleHair === "brown") {
        // Long hair for chubby girl (Eun-seong)
        ctx.fillStyle = "#8a5a36";
        ctx.beginPath();
        ctx.arc(0, -headRadius * 0.2, headRadius * 1.1, Math.PI, 0);
        ctx.fill();
        ctx.stroke();
        // side hair tails
        ctx.beginPath();
        ctx.roundRect(-headRadius * 1.1, -headRadius * 0.1, headRadius * 0.4, headRadius * 1.2, headRadius * 0.2);
        ctx.roundRect(headRadius * 0.7, -headRadius * 0.1, headRadius * 0.4, headRadius * 1.2, headRadius * 0.2);
        ctx.fill();
        ctx.stroke();
    } 
    else if (config.handsomeHair) {
        // Cool side-swept hair
        ctx.fillStyle = "#24334a"; // stylish dark blue-grey
        ctx.beginPath();
        ctx.arc(0, -headRadius * 0.25, headRadius * 1.05, Math.PI * 0.9, Math.PI * 2.1);
        ctx.lineTo(headRadius * 0.5, headRadius * 0.2); // sweep line
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }
    else if (config.richHair) {
        // Very voluminous long hair
        ctx.fillStyle = "#d13bcf"; // purple pink fluffy cloud hair
        ctx.beginPath();
        ctx.arc(0, -headRadius * 0.4, headRadius * 1.2, 0, Math.PI * 2);
        ctx.arc(-headRadius * 0.8, -headRadius * 0.1, headRadius * 0.8, 0, Math.PI * 2);
        ctx.arc(headRadius * 0.8, -headRadius * 0.1, headRadius * 0.8, 0, Math.PI * 2);
        ctx.arc(-headRadius * 0.9, headRadius * 0.5, headRadius * 0.6, 0, Math.PI * 2);
        ctx.arc(headRadius * 0.9, headRadius * 0.5, headRadius * 0.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        // face skin overlay redraw to show face inside the big hair
        ctx.fillStyle = "#ffdbac";
        ctx.beginPath();
        ctx.arc(0, 0, headRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    } 
    else if (config.prettyGirl) {
        // Pretty girl blonde flowing hair
        ctx.fillStyle = "#ffd83b";
        // Back hair first
        ctx.beginPath();
        ctx.arc(0, 0, headRadius * 1.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        // face skin overlay
        ctx.fillStyle = "#ffdbac";
        ctx.beginPath();
        ctx.arc(0, 0, headRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        // bangs/front hair
        ctx.fillStyle = "#ffd83b";
        ctx.beginPath();
        ctx.arc(0, -headRadius * 0.4, headRadius * 1.05, Math.PI * 0.9, Math.PI * 2.1);
        ctx.lineTo(0, -headRadius * 0.1);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        
        // Hair ribbon/flower
        ctx.fillStyle = "#ff5e97";
        ctx.beginPath();
        ctx.arc(-headRadius * 0.7, -headRadius * 0.7, headRadius * 0.3, 0, Math.PI * 2);
        ctx.arc(-headRadius * 0.9, -headRadius * 0.9, headRadius * 0.25, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    }

    // 3. Draw Eyes / Eyelashes
    ctx.fillStyle = "#222";
    let eyeSize = headRadius * 0.15;
    let eyeSpacing = headRadius * 0.35;
    let eyeY = -headRadius * 0.1;

    if (config.prettyGirl) {
        // Pretty sparkling eyes with eyelashes
        ctx.strokeStyle = "#222";
        ctx.lineWidth = headRadius * 0.08;
        // Left Eye Arc
        ctx.beginPath();
        ctx.arc(-eyeSpacing, eyeY, eyeSize * 1.2, Math.PI, 0);
        ctx.stroke();
        // Right Eye Arc
        ctx.beginPath();
        ctx.arc(eyeSpacing, eyeY, eyeSize * 1.2, Math.PI, 0);
        ctx.stroke();
        // Eyelash ticks
        ctx.beginPath();
        ctx.moveTo(-eyeSpacing - eyeSize, eyeY - eyeSize);
        ctx.lineTo(-eyeSpacing - eyeSize * 1.6, eyeY - eyeSize * 1.5);
        ctx.moveTo(eyeSpacing + eyeSize, eyeY - eyeSize);
        ctx.lineTo(eyeSpacing + eyeSize * 1.6, eyeY - eyeSize * 1.5);
        ctx.stroke();
    } else {
        // Normal eyes
        ctx.beginPath();
        ctx.arc(-eyeSpacing, eyeY, eyeSize, 0, Math.PI * 2);
        ctx.arc(eyeSpacing, eyeY, eyeSize, 0, Math.PI * 2);
        ctx.fill();
    }

    // 4. Draw Glasses
    if (config.glasses === "round") {
        ctx.strokeStyle = "#111111";
        ctx.lineWidth = headRadius * 0.1;
        // Left lens
        ctx.beginPath();
        ctx.arc(-eyeSpacing, eyeY, eyeSize * 1.8, 0, Math.PI * 2);
        ctx.stroke();
        // Right lens
        ctx.beginPath();
        ctx.arc(eyeSpacing, eyeY, eyeSize * 1.8, 0, Math.PI * 2);
        ctx.stroke();
        // Bridge
        ctx.beginPath();
        ctx.moveTo(-eyeSpacing + eyeSize * 1.8, eyeY);
        ctx.lineTo(eyeSpacing - eyeSize * 1.8, eyeY);
        ctx.stroke();
    } 
    else if (config.glasses === "square") {
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = headRadius * 0.12;
        let gW = eyeSize * 3.2;
        let gH = eyeSize * 2.5;
        // Left lens square
        ctx.strokeRect(-eyeSpacing - gW/2, eyeY - gH/2, gW, gH);
        // Right lens square
        ctx.strokeRect(eyeSpacing - gW/2, eyeY - gH/2, gW, gH);
        // Bridge
        ctx.beginPath();
        ctx.moveTo(-eyeSpacing + gW/2, eyeY);
        ctx.lineTo(eyeSpacing - gW/2, eyeY);
        ctx.stroke();
    }
    else if (config.glasses === "stylish") {
        // Sleek cyan/silver spectacles
        ctx.strokeStyle = "#00e5ff";
        ctx.lineWidth = headRadius * 0.08;
        let gW = eyeSize * 3.0;
        let gH = eyeSize * 1.5;
        // Draw thin hexagonal/rectangular shapes
        ctx.strokeRect(-eyeSpacing - gW/2, eyeY - gH/2, gW, gH);
        ctx.strokeRect(eyeSpacing - gW/2, eyeY - gH/2, gW, gH);
        ctx.beginPath();
        ctx.moveTo(-eyeSpacing + gW/2, eyeY);
        ctx.lineTo(eyeSpacing - gW/2, eyeY);
        ctx.stroke();
    }

    // 5. Draw Mouth
    ctx.strokeStyle = "#333";
    ctx.lineWidth = headRadius * 0.08;
    ctx.lineCap = "round";
    ctx.beginPath();
    if (config.role.includes("Tank")) {
        // Angry grin
        ctx.moveTo(-headRadius * 0.25, headRadius * 0.35);
        ctx.lineTo(headRadius * 0.25, headRadius * 0.35);
    } else if (config.prettyGirl) {
        // Cute pink lips/smile
        ctx.strokeStyle = "#ff4466";
        ctx.arc(0, headRadius * 0.2, headRadius * 0.2, 0, Math.PI);
    } else {
        // Simple smile
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
        
        // Map elements
        this.mapWidth = 2000;
        this.mapHeight = 2000;
        
        // Dynamic Game Entities
        this.players = {};
        this.boxes = {};
        this.cubes = {};
        this.projectiles = [];
        this.particles = [];
        
        // Local Player HUD & mechanics
        this.hp = 4000;
        this.maxHp = 4000;
        this.ammo = 3;
        this.maxAmmo = 3;
        this.reloadProgress = 0;
        this.superPercent = 0;
        this.isSuperToggled = false;
        
        // Local Player coordinates
        this.x = 1000;
        this.y = 1000;
        this.angle = 0;
        this.moving = false;
        this.dead = false;
        
        // Input details
        this.keys = {};
        this.mouse = { x: 0, y: 0, screenX: 0, screenY: 0, down: false };
        
        // Canvas Setup
        this.canvas = document.getElementById("game-canvas");
        this.ctx = this.canvas.getContext("2d");
        
        // Map barriers (walls)
        this.walls = [
            // Center barriers
            { x: 900, y: 900, w: 200, h: 200, type: "wall" },
            // Corner blocks
            { x: 300, y: 300, w: 150, h: 300, type: "wall" },
            { x: 1550, y: 300, w: 150, h: 300, type: "wall" },
            { x: 300, y: 1400, w: 150, h: 300, type: "wall" },
            { x: 1550, y: 1400, w: 150, h: 300, type: "wall" },
            // Mid corridors
            { x: 700, y: 500, w: 600, h: 60, type: "wall" },
            { x: 700, y: 1440, w: 600, h: 60, type: "wall" }
        ];

        // Bushes clusters (drawn under player, hides player)
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
        grid.innerHTML = "";

        // Populate the brawlers cards
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
            
            // Draw portrait canvas
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
        // Connect button
        document.getElementById("btn-join").addEventListener("click", () => {
            this.playerName = document.getElementById("player-name").value.trim() || "학생";
            this.roomCode = document.getElementById("room-code").value.trim().toUpperCase() || "CLASS104";
            
            // 서버 주소를 하드코딩하여 학생들이 임의로 바꿀 수 없도록 고정합니다.
            const serverIp = "yesung-server.onrender.com";
            
            this.connectServer(serverIp);
        });

        // Leave button
        document.getElementById("btn-leave").addEventListener("click", () => {
            if (this.socket) {
                this.socket.close();
            }
            this.switchScreen("lobby-screen");
        });

        // Game Over buttons
        document.getElementById("btn-modal-back").addEventListener("click", () => {
            document.getElementById("game-over-modal").classList.add("hidden");
            this.switchScreen("lobby-screen");
        });
        
        document.getElementById("btn-modal-restart").addEventListener("click", () => {
            document.getElementById("game-over-modal").classList.add("hidden");
            if (this.socket && this.socket.readyState === WebSocket.OPEN) {
                this.socket.send(jsonMsg("restart"));
            }
        });

        // Keyboard Controls
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

        // Mouse Controls
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

        // Super button click on screen (for mobile/mouse helper)
        document.getElementById("btn-super").addEventListener("click", () => {
            this.toggleSuper();
        });

        // Resize Canvas
        window.addEventListener("resize", () => this.resizeCanvas());
        this.resizeCanvas();
    }

    resizeCanvas() {
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

    connectServer(address) {
        const overlay = document.getElementById("loading-overlay");
        overlay.classList.remove("hidden");
        
        let wsUrl = "";
        if (address.startsWith("ws://") || address.startsWith("wss://")) {
            wsUrl = address;
        } else {
            // Render 서버일 경우 무조건 wss (보안 웹소켓)를 사용하도록 강제합니다.
            const protocol = (address.includes("onrender.com") || window.location.protocol === "https:") ? "wss:" : "ws:";
            wsUrl = `${protocol}//${address}`;
        }
        
        try {
            this.socket = new WebSocket(wsUrl);
            
            this.socket.onopen = () => {
                overlay.classList.add("hidden");
                this.switchScreen("game-screen");
                
                // Join Room
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
                overlay.classList.add("hidden");
                this.switchScreen("lobby-screen");
                this.appendSystemChat("서버와의 연결이 끊어졌습니다.");
            };
            
            this.socket.onerror = (err) => {
                overlay.classList.add("hidden");
                this.switchScreen("lobby-screen");
                alert("서버 연결에 실패했습니다. IP 주소와 서버 구동 여부를 확인하세요.");
            };
            
        } catch (e) {
            overlay.classList.add("hidden");
            alert("잘못된 서버 주소 형식입니다.");
        }
    }

    handleServerMessage(data) {
        const type = data.type;
        
        if (type === "init") {
            this.myId = data.id;
            this.mapWidth = data.mapWidth;
            this.mapHeight = data.mapHeight;
            document.getElementById("hud-room-code").textContent = data.roomCode;
            this.appendSystemChat(`대기실 [${data.roomCode}]에 입장했습니다!`);
            
            // Start local animation loop if not running
            if (!this.loopRunning) {
                this.loopRunning = true;
                requestAnimationFrame((t) => this.gameLoop(t));
            }
        } 
        else if (type === "state") {
            // Apply network interpolation / syncing
            const serverPlayers = data.players;
            
            // Sync current list
            Object.keys(serverPlayers).forEach(id => {
                const sPlayer = serverPlayers[id];
                if (id === this.myId) {
                    // Update local details from server checks
                    this.hp = sPlayer.hp;
                    this.maxHp = sPlayer.maxHp;
                    this.dead = sPlayer.dead;
                    this.superPercent = sPlayer.superCharge;
                    
                    document.getElementById("hud-cubes").textContent = sPlayer.cubes;
                    document.getElementById("hud-kills").textContent = sPlayer.kills;
                    
                    // Force update ultimate button state
                    this.updateSuperButtonState();
                    
                    if (this.dead) {
                        this.isSuperToggled = false;
                    }
                } else {
                    // Lerp other players
                    if (!this.players[id]) {
                        // Spawn new player instance locally
                        this.players[id] = { ...sPlayer, tx: sPlayer.x, ty: sPlayer.y, tangle: sPlayer.angle };
                    } else {
                        // Store target coordinates for interpolation
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
            
            // Clean up removed players
            Object.keys(this.players).forEach(id => {
                if (!serverPlayers[id]) {
                    delete this.players[id];
                }
            });
            
            // Sync boxes (Crates)
            this.boxes = data.boxes;
            
            // Sync power cubes drops
            this.cubes = data.cubes;
            
            // Update Timer display
            const min = Math.floor(data.timer / 60).toString().padStart(2, "0");
            const sec = (data.timer % 60).toString().padStart(2, "0");
            document.getElementById("match-timer").textContent = `${min}:${sec}`;
        }
        else if (type === "shoot") {
            // Trigger projectile graphics on all screens
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

    // Input Movement update
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
            // Normalize
            const length = Math.sqrt(dx * dx + dy * dy);
            dx /= length;
            dy /= length;
            
            // Predict new position
            let nextX = this.x + dx * moveSpeed * dt * 60;
            let nextY = this.y + dy * moveSpeed * dt * 60;
            
            // Map boundaries collision
            nextX = Math.max(50, Math.min(this.mapWidth - 50, nextX));
            nextY = Math.max(50, Math.min(this.mapHeight - 50, nextY));
            
            // Obstacles collision (Radius ~22 player size)
            const pRadius = 22;
            for (let wall of this.walls) {
                // Find closest point on rectangle to player circle
                let closestX = Math.max(wall.x, Math.min(nextX, wall.x + wall.w));
                let closestY = Math.max(wall.y, Math.min(nextY, wall.y + wall.h));
                
                let dist = Math.hypot(nextX - closestX, nextY - closestY);
                if (dist < pRadius) {
                    // Collision resolved - slide along wall
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

        // Aim angle towards mouse crosshair relative to local player screen coordinate
        const screenCenterX = this.canvas.width / 2;
        const screenCenterY = this.canvas.height / 2;
        this.angle = Math.atan2(this.mouse.screenY - screenCenterY, this.mouse.screenX - screenCenterX);
        
        // Send state to server
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(jsonMsg("move", {
                x: this.x,
                y: this.y,
                angle: this.angle,
                moving: this.moving
            }));
        }

        // Check power-up cube pickups locally
        Object.keys(this.cubes).forEach(id => {
            const cube = this.cubes[id];
            const dist = Math.hypot(this.x - cube.x, this.y - cube.y);
            if (dist < 40) { // Pickup radius
                this.socket.send(jsonMsg("pickup_cube", { cubeId: id }));
            }
        });
    }

    // Toggle Super mode
    toggleSuper() {
        if (this.superPercent >= 100 && !this.dead) {
            this.isSuperToggled = !this.isSuperToggled;
            const btn = document.getElementById("btn-super");
            if (this.isSuperToggled) {
                btn.style.boxShadow = "0 0 30px #ffffff, 0 0 45px var(--neon-amber)";
                sfx.playPickup(); // little chime
            } else {
                btn.style.boxShadow = "";
            }
        }
    }

    // Fire Brawler weapon
    fireWeapon() {
        if (this.ammo <= 0) return;
        
        const b = BRAWLERS[this.selectedBrawler];
        this.ammo--;
        
        // Super execution trigger
        const isSuper = this.isSuperToggled;
        if (isSuper) {
            this.isSuperToggled = false;
            this.superPercent = 0;
            // Notify server that super was activated (triggers sound broadcast)
            this.socket.send(jsonMsg("super_active", { active: true }));
        }

        // Translate mouse to map coords
        const mapMouseX = this.x + (this.mouse.screenX - this.canvas.width / 2);
        const mapMouseY = this.y + (this.mouse.screenY - this.canvas.height / 2);

        // Tell server we shot
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(jsonMsg("shoot", {
                x: this.x,
                y: this.y,
                targetX: mapMouseX,
                targetY: mapMouseY,
                isSuper: isSuper
            }));
        }

        // Sound effect
        let soundType = 'default';
        if (this.selectedBrawler === "박기덕") soundType = 'sniper';
        else if (this.selectedBrawler === "송창현" || this.selectedBrawler === "구본석") soundType = 'melee';
        else if (this.selectedBrawler === "윤태수") soundType = 'shotgun';
        else if (this.selectedBrawler === "이인석") soundType = 'thrower';
        
        sfx.playShoot(soundType);

        // Spawns local bullet trajectories and hit calculation
        this.spawnProjectileGraphics(this.x, this.y, mapMouseX, mapMouseY, this.selectedBrawler, isSuper, this.myId);
    }

    // Generate local projectiles shapes & speeds
    spawnProjectileGraphics(sx, sy, tx, ty, brawlerId, isSuper, shooterId) {
        const config = BRAWLERS[brawlerId];
        let angle = Math.atan2(ty - sy, tx - sx);
        
        // Spawn bullet based on characters weapon configurations
        if (brawlerId === "윤태수") {
            // Shelly shotgun: spread 5 bullets
            const spread = 0.08; // spacing
            const count = isSuper ? 8 : 5;
            const startIdx = -Math.floor(count / 2);
            for (let i = 0; i < count; i++) {
                let offset = (startIdx + i) * spread;
                this.addBullet(sx, sy, angle + offset, 450, 14, 60, config.color, isSuper, shooterId, brawlerId);
            }
        } 
        else if (brawlerId === "박기덕") {
            // Colt sniper laser bullet
            this.addBullet(sx, sy, angle, 850, 24, 110, config.color, isSuper, shooterId, brawlerId);
        }
        else if (brawlerId === "송창현") {
            // Bull punches (wide melee blast)
            const count = 4;
            for (let i = -2; i <= 2; i++) {
                this.addBullet(sx, sy, angle + i * 0.12, 380, 8, 20, config.color, isSuper, shooterId, brawlerId);
            }
        }
        else if (brawlerId === "이인석") {
            // Dynamike lobbed bottle - does not hit immediately, moves to destination
            const dist = Math.hypot(tx - sx, ty - sy);
            const maxThrowDist = isSuper ? 400 : 320;
            const finalDist = Math.min(dist, maxThrowDist);
            const targetX = sx + Math.cos(angle) * finalDist;
            const targetY = sy + Math.sin(angle) * finalDist;
            
            // Create lobbed projectile
            this.projectiles.push({
                type: "lobbed",
                shooterId,
                brawlerId,
                sx, sy,
                x: sx, y: sy,
                tx: targetX, ty: targetY,
                radius: 12,
                progress: 0,
                speed: 3.5, // arc speed
                isSuper,
                color: config.color
            });
        }
        else if (brawlerId === "김수교") {
            // Music wave: wide, slow, pierces enemies
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
            // Healing Super chord heals self instantly
            if (isSuper && shooterId === this.myId) {
                this.hp = Math.min(this.maxHp, this.hp + 2000);
                this.socket.send(jsonMsg("damage", { targetId: this.myId, amount: -2000 }));
                this.spawnHealParticles(this.x, this.y);
            }
        }
        else if (brawlerId === "조은성") {
            // Shurikens (colt style straight 4 bullets sequential)
            if (shooterId === this.myId && isSuper) {
                // invisibility
                this.socket.send(jsonMsg("super_active", { active: true }));
                this.isSuperActive = true;
                setTimeout(() => {
                    this.isSuperActive = false;
                    this.socket.send(jsonMsg("super_active", { active: false }));
                }, 6000);
            } else {
                // Sequential fire shurikens
                for (let i = 0; i < 4; i++) {
                    setTimeout(() => {
                        this.addBullet(sx, sy, angle, 680, 10, 80, config.color, false, shooterId, brawlerId);
                    }, i * 100);
                }
            }
        }
        else if (brawlerId === "김시량") {
            // Shockwave
            this.addBullet(sx, sy, angle, 600, 16, 75, config.color, isSuper, shooterId, brawlerId);
            if (isSuper && shooterId === this.myId) {
                this.spawnDrone();
            }
        }
        else if (brawlerId === "유시온") {
            // 3 Poison daggers
            const count = 3;
            for (let i = -1; i <= 1; i++) {
                this.addBullet(sx, sy, angle + i * 0.15, 620, 10, 75, config.color, isSuper, shooterId, brawlerId);
            }
            if (isSuper) {
                // leaping escape particle triggers
                this.spawnLeapEffect(sx, sy, tx, ty);
            }
        }
        else if (brawlerId === "최종한") {
            // Shield protector Short laser blast
            this.addBullet(sx, sy, angle, 500, 14, 45, config.color, isSuper, shooterId, brawlerId);
            if (isSuper) {
                // Spawns Front Shield
                const p = shooterId === this.myId ? this : this.players[shooterId];
                if (p) {
                    p.shieldActive = true;
                    p.shieldTimer = 5.0;
                }
            }
        }
        else if (brawlerId === "구본석") {
            // Mortis dash strike
            const dashDist = 120;
            const targetX = sx + Math.cos(angle) * dashDist;
            const targetY = sy + Math.sin(angle) * dashDist;
            
            // Dash player model forward
            if (shooterId === this.myId) {
                this.x = Math.max(50, Math.min(this.mapWidth - 50, targetX));
                this.y = Math.max(50, Math.min(this.mapHeight - 50, targetY));
                
                // Deal melee dash hit damage around the trajectory
                this.calculateMeleeSwipe(sx, sy, targetX, targetY, 1200);
            }
            
            // Bat tempest super
            if (isSuper) {
                for (let i = 0; i < 6; i++) {
                    this.addBullet(sx, sy, angle + (i - 2.5) * 0.25, 450, 12, 70, "#ff0066", true, shooterId, brawlerId);
                }
            }
        }
        else if (brawlerId === "김예진") {
            // Gas spray lingers in air
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

    // Summons robot helper
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
        // Simple line segment circle collisions
        const swipeRadius = 50;
        
        // Boxes
        Object.keys(this.boxes).forEach(id => {
            const b = this.boxes[id];
            if (this.lineCircleIntersect(sx, sy, tx, ty, b.x, b.y, swipeRadius + 30)) {
                this.socket.send(jsonMsg("box_damage", { boxId: id, amount: damage }));
                this.spawnHitParticles(b.x, b.y);
            }
        });

        // Remote players
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

    // Core Frame Update logic
    update(dt) {
        this.updateMovement(dt);
        this.updateProjectiles(dt);
        this.updateParticles(dt);
        this.updateHUDRecharge(dt);
        this.updateRemoteLerp(dt);
        this.updateSummons(dt);
    }

    // Smooth other players network positions
    updateRemoteLerp(dt) {
        Object.keys(this.players).forEach(id => {
            const p = this.players[id];
            // Linear interpolate coordinates
            p.x += (p.tx - p.x) * 0.25;
            p.y += (p.ty - p.y) * 0.25;
            
            // Angle interpolation
            let diff = p.tangle - p.angle;
            // wrap angle
            diff = Math.atan2(Math.sin(diff), Math.cos(diff));
            p.angle += diff * 0.3;
            
            // Decrement shields
            if (p.shieldActive) {
                p.shieldTimer -= dt;
                if (p.shieldTimer <= 0) p.shieldActive = false;
            }
        });
    }

    // AI companion actions
    updateSummons(dt) {
        if (!this.drone) return;
        
        // Find nearest remote player
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
            
            // Move toward target
            this.drone.x += Math.cos(angle) * this.drone.speed * dt * 60;
            this.drone.y += Math.sin(angle) * this.drone.speed * dt * 60;
            
            // Attack Cooldown
            this.drone.shootCooldown -= dt;
            if (this.drone.shootCooldown <= 0 && minDist < 300) {
                this.drone.shootCooldown = 1.0;
                // Shoot a small helper bullet
                this.addBullet(this.drone.x, this.drone.y, angle, 400, 6, 40, "#ffff00", false, this.myId, "김시량");
                // Notify socket to draw bullet
                this.socket.send(jsonMsg("shoot", {
                    x: this.drone.x,
                    y: this.drone.y,
                    targetX: target.x,
                    targetY: target.y,
                    isSuper: false
                }));
            }
        } else {
            // Follow player
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
                // Normal bullet physics
                const stepX = proj.vx * dt;
                const stepY = proj.vy * dt;
                proj.x += stepX;
                proj.y += stepY;
                proj.travelled += Math.hypot(stepX, stepY);
                
                let isDead = false;
                
                // check wall collision
                for (let wall of this.walls) {
                    if (proj.x > wall.x && proj.x < wall.x + wall.w &&
                        proj.y > wall.y && proj.y < wall.y + wall.h) {
                        // Collided with wall
                        if (proj.isSuper && proj.brawlerId === "윤태수") {
                            // destroy walls!
                            // (We keep walls persistent in basic clients but can spawn wall shards particles)
                            this.spawnHitParticles(proj.x, proj.y);
                        } else if (!proj.isSuper) {
                            isDead = true;
                            this.spawnHitParticles(proj.x, proj.y);
                        }
                    }
                }
                
                // Bullet range exceeded
                if (proj.travelled >= proj.range * 4.5) { // offset scaling for canvas coords
                    isDead = true;
                }
                
                // Hits Calculation (Only calculated by the shooter to avoid double registers)
                if (proj.shooterId === this.myId) {
                    // Check hitting crates
                    Object.keys(this.boxes).forEach(boxId => {
                        if (isDead) return;
                        const box = this.boxes[boxId];
                        const dist = Math.hypot(proj.x - box.x, proj.y - box.y);
                        if (dist < 32) {
                            let dmg = proj.isSuper ? 1600 : 800;
                            // apply power cube multiplier
                            const pData = BRAWLERS[this.selectedBrawler];
                            const cubeCount = parseInt(document.getElementById("hud-cubes").textContent) || 0;
                            dmg = Math.floor(dmg * (1.0 + cubeCount * 0.1));
                            
                            this.socket.send(jsonMsg("box_damage", { boxId, amount: dmg }));
                            this.spawnHitParticles(proj.x, proj.y);
                            isDead = true;
                            sfx.playHit();
                        }
                    });
                    
                    // Check hitting remote players
                    Object.keys(this.players).forEach(pId => {
                        if (isDead) return;
                        const target = this.players[pId];
                        if (target.dead) return;
                        
                        // Check if shield blocks bullet
                        if (target.shieldActive) {
                            // calculate angle of bullet relative to shield front
                            const dist = Math.hypot(proj.x - target.x, proj.y - target.y);
                            if (dist < 40) {
                                isDead = true; // Shield blocks bullet!
                                this.spawnHitParticles(proj.x, proj.y);
                                return;
                            }
                        }

                        const dist = Math.hypot(proj.x - target.x, proj.y - target.y);
                        if (dist < 26) {
                            let dmg = proj.isSuper ? 1800 : 900;
                            // Apply poisons
                            if (proj.brawlerId === "유시온") {
                                this.triggerPoisonEffect(pId, 150, 4);
                            }
                            
                            const cubeCount = parseInt(document.getElementById("hud-cubes").textContent) || 0;
                            dmg = Math.floor(dmg * (1.0 + cubeCount * 0.15));
                            
                            this.socket.send(jsonMsg("damage", { targetId: pId, amount: dmg }));
                            this.spawnHitParticles(proj.x, proj.y);
                            
                            // Health absorption for 구본석 (Bon-seok)
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
                // Thrower flask projectile trajectory
                proj.progress += dt * proj.speed;
                if (proj.progress >= 1.0) {
                    // Explodes at destination!
                    this.spawnExplodePuddle(proj.tx, proj.ty, proj.isSuper, proj.shooterId);
                    this.projectiles.splice(i, 1);
                } else {
                    // Parabolic arc interpolation
                    proj.x = proj.sx + (proj.tx - proj.sx) * proj.progress;
                    proj.y = proj.sy + (proj.ty - proj.sy) * proj.progress;
                }
            }
            
            else if (proj.type === "wave") {
                // Wide wave movement
                proj.travelled += proj.speed * dt;
                proj.width = proj.width + (proj.maxWidth - proj.width) * (proj.travelled / proj.range);
                
                // update wave coordinate along angle
                proj.x += Math.cos(proj.angle) * proj.speed * dt;
                proj.y += Math.sin(proj.angle) * proj.speed * dt;
                
                // Hit checks on enemies
                if (proj.shooterId === this.myId) {
                    // Crate check
                    Object.keys(this.boxes).forEach(boxId => {
                        const box = this.boxes[boxId];
                        const dist = Math.hypot(proj.x - box.x, proj.y - box.y);
                        // Check box inside the wave sector
                        if (dist < proj.travelled && dist < proj.range) {
                            // verify angle boundary
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
                    
                    // Players check
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
                // Gas cloud spray lingers
                proj.timer += dt;
                proj.radius = proj.radius + (proj.maxRadius - proj.radius) * (proj.timer / proj.duration);
                
                // Periodic ticks damage (every 0.5s)
                proj.damageTimer += dt;
                if (proj.damageTimer >= 0.4) {
                    proj.damageTimer = 0;
                    
                    if (proj.shooterId === this.myId) {
                        // Check boxes
                        Object.keys(this.boxes).forEach(boxId => {
                            const b = this.boxes[boxId];
                            if (Math.hypot(b.x - proj.x, b.y - proj.y) < proj.radius + 20) {
                                this.socket.send(jsonMsg("box_damage", { boxId, amount: 350 }));
                            }
                        });
                        
                        // Check players
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

    // Explosive bottles damage logic
    spawnExplodePuddle(x, y, isSuper, shooterId) {
        // Visual explosion ring
        this.spawnExplodeParticles(x, y, isSuper ? 100 : 50);
        
        // Spawn lingering puddle projectile
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

    // Visual Particle animations
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
        // jump circles
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
        
        // teleport player coordinates immediately (dash/leap mechanic)
        this.x = Math.max(50, Math.min(this.mapWidth - 50, tx));
        this.y = Math.max(50, Math.min(this.mapHeight - 50, ty));
        
        // throw daggers in 8 directions around destination
        for (let idx = 0; idx < 8; idx++) {
            const a = (idx / 8) * Math.PI * 2;
            this.addBullet(this.x, this.y, a, 550, 10, 60, "#00f0ff", false, this.myId, "유시온");
        }
    }

    // Recharge ammo slots
    updateHUDRecharge(dt) {
        const b = BRAWLERS[this.selectedBrawler];
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
        // Update HP fill and Text
        const hpFill = document.getElementById("player-hp-fill");
        const hpText = document.getElementById("player-hp-text");
        
        const hpPercent = Math.max(0, (this.hp / this.maxHp) * 100);
        hpFill.style.width = `${hpPercent}%`;
        hpText.textContent = `${this.hp} / ${this.maxHp}`;
        
        if (this.dead) {
            hpFill.style.width = "0%";
            hpText.textContent = "부활 대기 중...";
        }

        // Ammo bars
        const ammoBars = document.querySelectorAll(".ammo-bar");
        ammoBars.forEach((bar, index) => {
            if (index < this.ammo) {
                bar.className = "ammo-bar active-ammo";
            } else {
                bar.className = "ammo-bar";
            }
        });

        // Superpercent
        document.getElementById("super-percent").textContent = `${this.superPercent}%`;
        this.updateSuperButtonState();
    }

    updateSuperButtonState() {
        const btn = document.getElementById("btn-super");
        if (this.superPercent >= 100) {
            btn.className = "super-btn ready-super";
            btn.disabled = false;
        } else {
            btn.className = "super-btn disabled-super";
            btn.disabled = true;
            btn.style.boxShadow = "";
        }
    }

    // Append items to kill logs
    appendKillNotification(killer, victim, kBr, vBr) {
        const feed = document.getElementById("kill-feed");
        const item = document.createElement("div");
        item.className = "kill-item";
        
        item.innerHTML = `
            <span><strong class="killer-name">${killer}</strong> (${kBr})</span>
            <i class="fa-solid fa-crosshairs" style="color: #666; margin: 0 10px;"></i>
            <span><strong class="victim-name">${victim}</strong> (${vBr})</span>
        `;
        
        feed.appendChild(item);
        
        // Remove after 4 seconds
        setTimeout(() => {
            item.remove();
        }, 4000);
    }

    appendSystemChat(text) {
        const chat = document.getElementById("system-chat");
        const msg = document.createElement("div");
        msg.className = "chat-msg";
        msg.textContent = text;
        
        chat.appendChild(msg);
        
        // Keep scroll at bottom
        chat.scrollTop = chat.scrollHeight;
        
        // Clean up msg after 6 seconds
        setTimeout(() => {
            msg.remove();
        }, 6000);
    }

    // Renders scoreboard table
    showLeaderboard(ranks) {
        const modal = document.getElementById("game-over-modal");
        const tbody = document.getElementById("leaderboard-body");
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

    // ==========================================================================
    // CANVAS RENDER RENDERING SYSTEM
    // ==========================================================================
    gameLoop(timestamp) {
        if (!this.loopRunning) return;
        
        if (!this.lastFrameTime) this.lastFrameTime = timestamp;
        let dt = (timestamp - this.lastFrameTime) / 1000;
        this.lastFrameTime = timestamp;
        
        // Clamp delta time to avoid huge leaps
        if (dt > 0.1) dt = 0.1;

        this.update(dt);
        this.draw();
        
        requestAnimationFrame((t) => this.gameLoop(t));
    }

    draw() {
        const ctx = this.ctx;
        const canvas = this.canvas;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Camera math: center camera on local player coordinates
        const camX = this.x - canvas.width / 2;
        const camY = this.y - canvas.height / 2;
        
        ctx.save();
        ctx.translate(-camX, -camY);
        
        // 1. Draw Map background boundaries & grid lines
        ctx.fillStyle = "#1e2230";
        ctx.fillRect(0, 0, this.mapWidth, this.mapHeight);
        
        // Grid pattern
        ctx.strokeStyle = "rgba(255,255,255,0.03)";
        ctx.lineWidth = 2;
        const gridGap = 80;
        for (let x = 0; x < this.mapWidth; x += gridGap) {
            ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, this.mapHeight); ctx.stroke();
        }
        for (let y = 0; y < this.mapHeight; y += gridGap) {
            ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(this.mapWidth, y); ctx.stroke();
        }
        
        // Outer boundary warning line
        ctx.strokeStyle = "#ff0066";
        ctx.lineWidth = 10;
        ctx.strokeRect(0, 0, this.mapWidth, this.mapHeight);

        // 2. Draw Bushes
        ctx.fillStyle = "rgba(40, 167, 69, 0.4)";
        ctx.strokeStyle = "rgba(40, 167, 69, 0.6)";
        ctx.lineWidth = 4;
        this.bushes.forEach(bush => {
            ctx.beginPath();
            ctx.arc(bush.x, bush.y, bush.r, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
        });

        // 3. Draw Map barriers (Walls)
        ctx.fillStyle = "#4a5568";
        ctx.strokeStyle = "#2d3748";
        ctx.lineWidth = 6;
        this.walls.forEach(wall => {
            ctx.beginPath();
            ctx.roundRect(wall.x, wall.y, wall.w, wall.h, 12);
            ctx.fill();
            ctx.stroke();
        });

        // 4. Draw Power Cubes drops
        Object.keys(this.cubes).forEach(id => {
            const cube = this.cubes[id];
            
            // Draw floating gem
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
            
            // Glowing neon borders
            ctx.strokeStyle = "#ffffff";
            ctx.lineWidth = 2;
            ctx.stroke();
            
            ctx.restore();
        });

        // 5. Draw Breakable Crates (Boxes)
        Object.keys(this.boxes).forEach(id => {
            const box = this.boxes[id];
            
            ctx.fillStyle = "#a87132";
            ctx.strokeStyle = "#5a3a14";
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.roundRect(box.x - 30, box.y - 30, 60, 60, 6);
            ctx.fill();
            ctx.stroke();
            
            // Draw health bar on boxes
            if (box.hp < box.maxHp) {
                const barW = 50;
                const barH = 5;
                ctx.fillStyle = "rgba(0,0,0,0.5)";
                ctx.fillRect(box.x - barW/2, box.y - 42, barW, barH);
                
                ctx.fillStyle = "#00ff66";
                ctx.fillRect(box.x - barW/2, box.y - 42, barW * (box.hp / box.maxHp), barH);
            }
            
            // Draw big "X" on crate
            ctx.strokeStyle = "rgba(0, 0, 0, 0.25)";
            ctx.lineWidth = 8;
            ctx.beginPath();
            ctx.moveTo(box.x - 16, box.y - 16);
            ctx.lineTo(box.x + 16, box.y + 16);
            ctx.moveTo(box.x + 16, box.y - 16);
            ctx.lineTo(box.x - 16, box.y + 16);
            ctx.stroke();
        });

        // 6. Draw Summoned Combat Drone (김시량's drone)
        if (this.drone) {
            ctx.fillStyle = "#555";
            ctx.strokeStyle = "#00f0ff";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(this.drone.x, this.drone.y, 16, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            // glowing eyes
            ctx.fillStyle = "#00f0ff";
            ctx.beginPath();
            ctx.arc(this.drone.x - 5, this.drone.y - 3, 2, 0, Math.PI * 2);
            ctx.arc(this.drone.x + 5, this.drone.y - 3, 2, 0, Math.PI * 2);
            ctx.fill();
        }

        // Helper check: is a coordinate inside any bush?
        const inBush = (px, py) => {
            for (let bush of this.bushes) {
                if (Math.hypot(px - bush.x, py - bush.y) < bush.r) {
                    return true;
                }
            }
            return false;
        };

        const localInBush = inBush(this.x, this.y);

        // 7. Draw Remote Players
        Object.keys(this.players).forEach(id => {
            const p = this.players[id];
            if (p.dead) return;
            
            // Invisibility logic (e.g. stealth or hiding in bushes)
            const targetInBush = inBush(p.x, p.y);
            const isStealth = p.isSuperActive; // 조은성 invisibility
            
            let shouldDraw = true;
            let opacity = 1.0;
            
            if (isStealth) {
                // Assassin invisibility: only show if very close
                const d = Math.hypot(this.x - p.x, this.y - p.y);
                if (d > 140) {
                    shouldDraw = false;
                } else {
                    opacity = 0.35; // semi-transparent close up
                }
            }
            else if (targetInBush) {
                // If enemy is in bush, hide them unless local player is in the same bush or close
                if (!localInBush) {
                    const d = Math.hypot(this.x - p.x, this.y - p.y);
                    if (d > 130) {
                        shouldDraw = false;
                    } else {
                        opacity = 0.5; // faint outline if close
                    }
                } else {
                    opacity = 0.6; // slightly faint if we are both in bushes
                }
            }
            
            if (shouldDraw) {
                ctx.save();
                ctx.globalAlpha = opacity;
                this.drawPlayerCharacter(ctx, p);
                ctx.restore();
            }
        });

        // 8. Draw Local Player
        if (!this.dead) {
            ctx.save();
            if (localInBush) {
                ctx.globalAlpha = 0.55; // local player is semi-transparent inside bushes to signify they are hidden
            }
            this.drawPlayerCharacter(ctx, this);
            ctx.restore();
        }

        // 9. Draw Projectiles (Bullets & spray clouds)
        this.projectiles.forEach(proj => {
            ctx.save();
            ctx.fillStyle = proj.color || "#ffffff";
            
            if (proj.type === "bullet") {
                ctx.beginPath();
                ctx.arc(proj.x, proj.y, proj.radius, 0, Math.PI * 2);
                ctx.fill();
                
                // Add minor glow if super bullet
                if (proj.isSuper) {
                    ctx.shadowBlur = 15;
                    ctx.shadowColor = proj.color;
                    ctx.strokeStyle = "#fff";
                    ctx.lineWidth = 2;
                    ctx.stroke();
                }
            } 
            else if (proj.type === "lobbed") {
                // Draw flying bottle
                ctx.fillStyle = proj.color;
                ctx.beginPath();
                ctx.arc(proj.x, proj.y, proj.radius, 0, Math.PI * 2);
                ctx.fill();
                
                // Draw shadow underneath on the floor
                ctx.fillStyle = "rgba(0,0,0,0.3)";
                ctx.beginPath();
                ctx.arc(proj.x, proj.y + proj.progress * 15, proj.radius * 0.9, 0, Math.PI * 2);
                ctx.fill();
            }
            else if (proj.type === "wave") {
                // Music note wave arc
                ctx.strokeStyle = proj.color;
                ctx.lineWidth = 12;
                ctx.lineCap = "round";
                ctx.beginPath();
                // draw crescent shape pointing towards direction
                const startAngle = proj.angle - 0.45;
                const endAngle = proj.angle + 0.45;
                ctx.arc(proj.x, proj.y, proj.travelled, startAngle, endAngle);
                ctx.stroke();
            }
            else if (proj.type === "spray") {
                // Chemical or gas spray lingering clouds
                ctx.globalAlpha = 0.35 * (1.0 - proj.timer / proj.duration);
                ctx.beginPath();
                ctx.arc(proj.x, proj.y, proj.radius, 0, Math.PI * 2);
                ctx.fill();
            }
            
            ctx.restore();
        });

        // 10. Draw Particles
        this.particles.forEach(p => {
            ctx.save();
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.life / 0.5;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        });

        ctx.restore(); // camera view restore
    }

    drawPlayerCharacter(ctx, p) {
        const isLocal = (p.id === this.myId || !p.id);
        const bName = isLocal ? this.selectedBrawler : p.brawler;
        const config = BRAWLERS[bName];
        
        if (!config) return;

        // A. Draw aiming indicator barrel (only draw for current local player)
        if (isLocal) {
            ctx.save();
            ctx.strokeStyle = "rgba(255,255,255,0.18)";
            ctx.lineWidth = 4;
            ctx.setLineDash([8, 6]);
            // Draw line towards aim direction
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.x + Math.cos(p.angle) * 160, p.y + Math.sin(p.angle) * 160);
            ctx.stroke();
            ctx.restore();
        }

        // B. Front energy Shield (최종한 brawler defender super)
        if (p.shieldActive) {
            ctx.save();
            ctx.strokeStyle = "rgba(0, 240, 255, 0.7)";
            ctx.lineWidth = 8;
            ctx.shadowBlur = 10;
            ctx.shadowColor = "#00f0ff";
            ctx.beginPath();
            // Draw arc shield facing angle direction
            ctx.arc(p.x, p.y, 40, p.angle - 0.6, p.angle + 0.6);
            ctx.stroke();
            ctx.restore();
        }

        // C. Draw avatar face
        drawBrawlerFace(ctx, p.x, p.y, 22, bName, p.angle, false);

        // D. Draw overlay UI (health bar, nickname, and cube count above player)
        ctx.fillStyle = "rgba(0, 0, 0, 0.45)";
        ctx.fillRect(p.x - 35, p.y - 48, 70, 6);
        
        // HP fill (Green if friendly, red if enemy)
        ctx.fillStyle = isLocal ? "#39ff14" : "#ff3131";
        const hpPercent = Math.max(0, p.hp / p.maxHp);
        ctx.fillRect(p.x - 35, p.y - 48, 70 * hpPercent, 6);
        
        // Borders
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.strokeRect(p.x - 35, p.y - 48, 70, 6);

        // Text details
        ctx.font = "bold 11px Outfit, sans-serif";
        ctx.textAlign = "center";
        
        // Name tag
        ctx.fillStyle = "white";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2.5;
        const nameText = isLocal ? this.playerName : p.name;
        ctx.strokeText(nameText, p.x, p.y - 56);
        ctx.fillText(nameText, p.x, p.y - 56);
        
        // Cube counts
        if (p.cubes > 0) {
            ctx.fillStyle = "#39ff14";
            ctx.font = "bold 10px Outfit";
            ctx.strokeText(`[${p.cubes}]`, p.x, p.y - 68);
            ctx.fillText(`[${p.cubes}]`, p.x, p.y - 68);
        }
    }
}

// Global utilities helper
function jsonMsg(type, payload = {}) {
    return JSON.stringify({ type, ...payload });
}

// Initialize on page load
window.addEventListener("load", () => {
    window.game = new GameEngine();
});
