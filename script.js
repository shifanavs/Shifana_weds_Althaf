window.addEventListener("load", () => {
  setTimeout(() => document.getElementById("loader")?.classList.add("hide"), 650);
});

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");
menuBtn?.addEventListener("click", () => navLinks.classList.toggle("open"));
document.querySelectorAll(".nav-links a").forEach(a => a.addEventListener("click", () => navLinks.classList.remove("open")));

const target = new Date("2026-10-04T11:30:00+05:30").getTime();

function updateCountdown() {
  const now = Date.now();
  let diff = target - now;
  if (diff < 0) diff = 0;
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}
updateCountdown();
setInterval(updateCountdown, 1000);

document.getElementById("calendarBtn")?.addEventListener("click", () => {
  const start = "20261004T060000Z"; // 11:30 AM IST
  const end = "20261004T073000Z";   // 1:00 PM IST placeholder end
  const event = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Shifana and Althaf//Wedding Invitation//EN",
    "BEGIN:VEVENT",
    `DTSTART:${start}`,
    `DTEND:${end}`,
    "SUMMARY:Shifana & Althaf — Nikkah",
    "LOCATION:Nainar Juma Masjid Auditorium, Karikode",
    "DESCRIPTION:Wedding ceremony of Shifana & Althaf Mohammed.",
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");
  const blob = new Blob([event], {type:"text/calendar;charset=utf-8"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "shifana-althaf-nikkah.ics";
  a.click();
  URL.revokeObjectURL(url);
});

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
document.querySelectorAll("[data-lightbox]").forEach(item => {
  item.addEventListener("click", () => {
    lightboxImage.src = item.dataset.lightbox;
    lightbox.classList.add("show");
    lightbox.setAttribute("aria-hidden", "false");
  });
});
document.getElementById("lightboxClose")?.addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", e => { if (e.target === lightbox) closeLightbox(); });
function closeLightbox() {
  lightbox.classList.remove("show");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
}
document.addEventListener("keydown", e => { if (e.key === "Escape") closeLightbox(); });
