const Items = [

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

const Grid = document.getElementById("grid");
const Wrapper = document.getElementById("wrapper");
const Loader = document.getElementById("loader");

// Create all images
Items.forEach(name => {

  const item = document.createElement("div");
  item.className = "grid-item";

  const img = document.createElement("img");
  img.src = `images/${name}.webp`;
  img.alt = name;
  img.draggable = false;

  const span = document.createElement("span");
  span.textContent = name;
  span.title = name.toUpperCase(); 

  item.addEventListener("click", () => {

    item.classList.toggle("selected");

    if (HiddenMode) {
      
      const action = item.classList.contains("selected") ? "add" : "remove";

      item.classList[action]("hidden");

    };

  });
  
  item.append(img, span);
  Grid.appendChild(item);

});

///// FUNCS \\\\\

// Scales all the board.
function scaleBoard() {

  const width = (window.innerWidth * 0.95) / Grid.offsetWidth;
  const height = (window.innerHeight * 0.95) / Grid.offsetHeight;

  const scale = Math.min(width, height);

  Wrapper.style.transform = `scale(${scale})`;

};

// Waits for all images to be loaded.
function whenImagesReady() {

  const imgs = Array.from(Grid.querySelectorAll("img"));

  const promises = imgs.map(img => {

    if (img.complete && img.naturalWidth > 0) return Promise.resolve();

    return new Promise(resolve => {

      img.addEventListener("load", resolve, { once: true });
      img.addEventListener("error", resolve, { once: true });

    });

  });

  return Promise.all(promises);

};

// Inits the application.
async function init() {

  const fontsReady = (document.fonts && document.fonts.ready) ? document.fonts.ready : Promise.resolve();

  const imagesReady = whenImagesReady();

  await Promise.all([fontsReady, imagesReady]);

  scaleBoard();

  Loader.classList.add("ready");

  Loader.addEventListener("animationend", (event) => {

    if (event.animationName === "loaderFade") Loader.remove();

  }, { once: true });

};

window.addEventListener("resize", scaleBoard);
window.addEventListener("load", init);

// Hidden mode
let HiddenMode = false;

document.addEventListener("keydown", (event) => {

  if (event.key.toLowerCase() === "h") {

    HiddenMode = !HiddenMode;

    const selectedItems = document.querySelectorAll(".grid-item.selected");

    const callback = HiddenMode ? "add" : "remove";

    selectedItems.forEach(item => {

      item.classList[callback]("hidden");

    });

  };
  
});