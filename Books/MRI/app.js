const P = [
    // FRONT MATTER
    {
        title: "Cover",
        src: "pages/page-001.webp"
    },
    {
        title: "Contents",
        src: "pages/page-002.webp"
    },

    // CHAPTER 1
    {
        title: "Chapter 1 — What Exactly Is MRI?",
        src: "pages/page-003.webp"
    },
    {
        title: "No camera. No X-rays.",
        src: "pages/page-004.webp"
    },
    {
        title: "Let's start with us.",
        src: "pages/page-005.webp"
    },
    {
        title: "And inside water…",
        src: "pages/page-006.webp"
    },
    {
        title: "Every proton has a magnetic moment.",
        src: "pages/page-007.webp"
    },
    {
        title: "But together, they cancel out.",
        src: "pages/page-008.webp"
    },
    {
        title: "Inside a strong magnetic field",
        src: "pages/page-009.webp"
    },
    {
        title: "The protons aren't standing still.",
        src: "pages/page-010.webp"
    },
    {
        title: "Every field has a rhythm.",
        src: "pages/page-011.webp"
    },
    {
        title: "Resonance",
        src: "pages/page-012.webp"
    },
    {
        title: "Excitation",
        src: "pages/page-013.webp"
    },
    {
        title: "Start the clock.",
        src: "pages/page-014.webp"
    },
    {
        title: "Same nucleus. Different surroundings.",
        src: "pages/page-015.webp"
    },
    {
        title: "What if we measure the difference?",
        src: "pages/page-016.webp"
    },
    {
        title: "What we haven't told you…",
        src: "pages/page-017.webp"
    },
    {
        title: "T1 & T2 — Two clocks",
        src: "pages/page-018.webp"
    },

    // CHAPTER 2
    {
        title: "Chapter 2 — The Two Clocks of MRI",
        src: "pages/page-019.webp"
    },
    {
        title: "Two clocks start together.",
        src: "pages/page-020.webp"
    },
    {
        title: "T1 — What comes back?",
        src: "pages/page-021.webp"
    },
    {
        title: "How does T1 recovery happen?",
        src: "pages/page-022.webp"
    },
    {
        title: "What does a T1 value actually mean?",
        src: "pages/page-023.webp"
    },
    {
        title: "Different tissues. Different T1.",
        src: "pages/page-024.webp"
    },
    {
        title: "T2 — What fades away?",
        src: "pages/page-025.webp"
    },
    {
        title: "Why do the spins fall out of step?",
        src: "pages/page-026.webp"
    },
    {
        title: "What does a T2 value actually mean?",
        src: "pages/page-027.webp"
    },
    {
        title: "Different tissues. Different T2.",
        src: "pages/page-028.webp"
    },
    {
        title: "Two clocks. One tissue. One moment.",
        src: "pages/page-029.webp"
    },
    {
        title: "When should we look?",
        src: "pages/page-030.webp"
    }
];


let c = 0;
let b = 0;

const q = x => document.querySelector(x);
const sheet = q("#sheet");
const toc = q("#toc");


/* -----------------------------
   BUILD TABLE OF CONTENTS
----------------------------- */

P.forEach((p, i) => {

    // Chapter labels
    if (i === 2) {
        const heading = document.createElement("div");
        heading.className = "chapter-heading";
        heading.textContent = "CHAPTER 1";
        toc.append(heading);
    }

    if (i === 18) {
        const heading = document.createElement("div");
        heading.className = "chapter-heading";
        heading.textContent = "CHAPTER 2";
        toc.append(heading);
    }

    const x = document.createElement("button");

    x.textContent = p.title;
    x.dataset.i = i;

    x.onclick = () => go(i);

    toc.append(x);
});


/* -----------------------------
   DRAW CURRENT PAGE
----------------------------- */

function draw() {

    q("#page").src = P[c].src;

    q("#cap").textContent = P[c].title;

    q("#jump").value = c + 1;


    // Highlight active TOC item
    document.querySelectorAll("nav button").forEach(x => {
        x.classList.toggle(
            "active",
            +x.dataset.i === c
        );
    });


    // Build page-number navigation
    q("#nums").innerHTML = "";

    let s = Math.max(
        0,
        Math.min(c - 3, P.length - 7)
    );

    for (
        let i = s;
        i < Math.min(P.length, s + 7);
        i++
    ) {

        let x = document.createElement("button");

        x.textContent = i + 1;

        x.className =
            i === c ? "active" : "";

        x.onclick = () => go(i);

        q("#nums").append(x);
    }


    // Update URL
    location.hash = "page-" + (c + 1);
}


/* -----------------------------
   CHANGE PAGE
----------------------------- */

function go(n) {

    n = Math.max(
        0,
        Math.min(P.length - 1, n)
    );

    if (n === c || b) return;

    b = 1;

    sheet.className =
        n > c ? "forward" : "back";

    setTimeout(() => {

        c = n;

        draw();

        sheet.className = "";

        b = 0;

    }, 170);
}


/* -----------------------------
   BUTTON CONTROLS
----------------------------- */

q("#prev").onclick =
q("#pt").onclick =
    () => go(c - 1);

q("#next").onclick =
q("#nt").onclick =
    () => go(c + 1);


/* -----------------------------
   PAGE NUMBER JUMP
----------------------------- */

q("#jump").onchange = () => {

    const page =
        +q("#jump").value || 1;

    go(page - 1);
};


/* -----------------------------
   KEYBOARD CONTROLS
----------------------------- */

document.onkeydown = e => {

    if (e.key === "ArrowRight")
        go(c + 1);

    if (e.key === "ArrowLeft")
        go(c - 1);
};


/* -----------------------------
   MOBILE SWIPE
----------------------------- */

let sx = 0;

sheet.ontouchstart = e => {
    sx = e.touches[0].clientX;
};

sheet.ontouchend = e => {

    const d =
        e.changedTouches[0].clientX - sx;

    if (Math.abs(d) > 50) {
        go(c + (d < 0 ? 1 : -1));
    }
};


/* -----------------------------
   MOBILE MENU
----------------------------- */

q("#menu").onclick = () => {
    q("aside").classList.toggle("open");
};


/* -----------------------------
   OPEN DIRECT PAGE LINKS
   e.g. #page-25
----------------------------- */

const m =
    location.hash.match(/page-(\d+)/);

if (m) {

    c = Math.min(
        P.length - 1,
        Math.max(0, +m[1] - 1)
    );
}


/* -----------------------------
   INITIAL RENDER
----------------------------- */

draw();