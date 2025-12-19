const items = [
  "nene creative", "stake", "rxii", "lethamyr",
  "rosdri", "dualview", "robleis", "amustycow",
  "sunlesskhan", "maktuf", "jakze", "pulse mk",
  "aeroh", "jzr", "muiricles", "pulse fire",
  "evample", "faith", "m0nkey m00n", "atomik",
  "stizzy", "crr", "zen", "leoro",
  "torres8232", "rw9", "kileerrz", "electrozz",
  "team nixus", "team vitality", "pulse clan", "karmine corp",
  "redshyft", "gen.g", "nrg", "leogaben"
];

const grid = document.getElementById("grid");
const wrapper = document.getElementById("wrapper");
const loader = document.getElementById("loader");

items.forEach(name => {
  const item = document.createElement("div");
  item.className = "grid-item";

  const img = document.createElement("img");
  img.src = `images/${name}.webp`;
  img.alt = name;
  img.draggable = false;

  const span = document.createElement("span");
  span.textContent = name;
  span.title = name; 

  item.addEventListener("click", () => {
    item.classList.toggle("selected");

    if (hiddenMode) {
      if (item.classList.contains("selected")) {
        item.classList.add("hidden");
      } else {
        item.classList.remove("hidden");
      }
    }
  });
  
  item.append(img, span);
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

function whenImagesReady() {
  const imgs = Array.from(grid.querySelectorAll("img"));
  const promises = imgs.map(img => {
    if (img.complete && img.naturalWidth > 0) return Promise.resolve();
    return new Promise(resolve => {
      img.addEventListener("load", resolve, { once: true });
      img.addEventListener("error", resolve, { once: true });
    });
  });
  return Promise.all(promises);
}

async function init() {
  const fontsReady = (document.fonts && document.fonts.ready) ? document.fonts.ready : Promise.resolve();

  const imagesReady = whenImagesReady();

  await Promise.all([fontsReady, imagesReady]);

  scaleBoard();

  loader.classList.add("ready");

  loader.addEventListener("animationend", (e) => {
    if (e.animationName === "loaderFade") {
      loader.remove();
    }
  }, { once: true });
}

window.addEventListener("load", init);

// Hidden mode
let hiddenMode = false;

document.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "h") {
    hiddenMode = !hiddenMode;

    const selectedItems = document.querySelectorAll(".grid-item.selected");

    selectedItems.forEach(item => {
      if (hiddenMode) item.classList.add("hidden");
      else item.classList.remove("hidden");
    });
  }
});