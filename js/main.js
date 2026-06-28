  <script>
    // ── CURSOR ──
    const dot = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    document.querySelectorAll('a, button, .mix-card, .tag').forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('hover'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
    });
    function animCursor() {
      dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
      rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
      ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
      requestAnimationFrame(animCursor);
    }
    animCursor();

    // ── NAV SCROLL ──
    const nav = document.getElementById('mainNav');
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    });

    // ── HERO WAVEFORM ──
    const canvas = document.getElementById('waveCanvas');
    const ctx = canvas.getContext('2d');
    let wt = 0;
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = 70;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    function drawWave() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const W = canvas.width, H = canvas.height;
      const bars = Math.floor(W / 5);
      for (let i = 0; i < bars; i++) {
        const x = (i / bars) * W;
        const phase = (i / bars) * Math.PI * 8 + wt;
        const h = (Math.sin(phase) * 0.4 + Math.sin(phase * 1.7 + 1) * 0.35 + Math.sin(phase * 0.5) * 0.25) * (H * 0.45) + H * 0.45;
        const barH = Math.max(2, Math.abs(h - H * 0.5) * 1.4);
        const progress = i / bars;
        let r, g, b;
        if (progress < 0.5) {
          r = Math.round(0 + progress * 2 * 200);
          g = Math.round(200 - progress * 2 * 60);
          b = 255;
        } else {
          r = Math.round(200 + (progress - 0.5) * 2 * 55);
          g = Math.round(140 - (progress - 0.5) * 2 * 140);
          b = Math.round(255 - (progress - 0.5) * 2 * 255);
        }
        ctx.fillStyle = `rgba(${r},${g},${b},0.7)`;
        ctx.fillRect(x, H / 2 - barH / 2, 3, barH);
      }
      wt += 0.018;
      requestAnimationFrame(drawWave);
    }
    drawWave();

    // ── MIX BARS ──
    function makeBars(id, count) {
      const c = document.getElementById(id);
      if (!c) return;
      const heights = Array.from({length: count}, () => Math.random() * 60 + 15);
      c.innerHTML = heights.map(h =>
        `<div class="mix-bar" style="height:${h}%"></div>`
      ).join('');
    }
    makeBars('bars1', 18);
    makeBars('bars2', 18);
    makeBars('bars3', 18);

    // ── SCROLL REVEAL ──
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.12 });
    reveals.forEach(r => observer.observe(r));

    // ── FORM ──
async function handleForm(e) {
    e.preventDefault();

    const data = {
        name: document.getElementById("fname").value,
        email: document.getElementById("femail").value,
        type: document.getElementById("ftype").value,
        message: document.getElementById("fmsg").value
    };

    try {
        const response = await fetch("https://monaro-contact.vilkavonkadj.workers.dev/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            document.querySelector(".contact-form").style.display = "none";
            document.getElementById("formSuccess").style.display = "block";
        } else {
            alert("Failed to send message.");
        }
    } catch (err) {
        console.error(err);
        alert("Network error.");
    }
}
    // ── PHOTO EMBED ──
    // Replace the img src with your actual photo URL or base64
    // The photo will show as a dark gradient placeholder until updated
    const photo = document.getElementById('artistPhoto');
    photo.style.background = 'linear-gradient(160deg, #1A1A24 0%, #0A0A0F 100%)';
    photo.style.minHeight = '480px';
  </script>
