const items = [
  "nene creative","stake","rxii","lethamyr",
  "rosdri","dualview","robleis","amustycow",
  "sunlesskhan","maktuf","jakze","pulse mk",
  "aeroh","jzr","muiricles","pulse fire",
  "evample","faith","m0nkey m00n","atomik",
  "stizzy","crr","zen","leoro",
  "torres8232","rw9","kileerrz","electrozz",
  "team nixus","team vitality","pulse clan","karmine corp",
  "redshyft","gen.g","nrg","leogaben"
];

const grid = document.getElementById("grid");
const wrapper = document.getElementById("wrapper");
// ahora si no?
items.forEach(name => {
  const item = document.createElement("div");
  item.className = "grid-item";

  const img = document.createElement("img");
  img.src = `images/${name}.png`;
  img.alt = name;
  img.draggable = false;

  const span = document.createElement("span");
  span.textContent = name;

  item.append(img, span);
  item.addEventListener("click", () => item.classList.toggle("selected"));

  grid.appendChild(item);
});

function scaleBoard() {
  const scale = Math.min(
    (window.innerWidth * 0.95) / grid.offsetWidth,
    (window.innerHeight * 0.95) / grid.offsetHeight
  );
  wrapper.style.transform = `scale(${scale})`;
}

window.addEventListener("resize", scaleBoard);
window.addEventListener("load", scaleBoard);