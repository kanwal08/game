let timerDisplay;
let timerInput;
let imageInput;
let imgNode;
let played;

window.addEventListener('load', function() {
	timerDisplay = document.getElementById("timer-display");
	timerInput = document.getElementById("timer");
	imageInput = document.getElementById("image-id");
	imgNode = document.getElementById("image");
	played = document.getElementById("played");

	model.init(images);
	model.start();

	const form = document.forms.play;
	form.onsubmit = function(e) {
	  const body = new FormData();
	  for (const element of form) {
	    body.append(element.name, element.value);
	  }
	  handleSubmit(form.action, body);
	  return false;
	};
});


const model = {
  images: [],
  timer: 10,
  imageID: 0,

  timerDisplay: null,
  timerInput: null,
  imageInput: null,
  imgNode: null,
  played: null,

  render: function() {
    timerDisplay.innerText = this.timer;
    timerInput.value = this.timer;
    const image = this.images[this.imageID];
    imageInput.value = image.id;
    imgNode.src = image.src;
  },
  tick: function() {
    let timer = this.timer - 1;
    if (timer < 1) timer = 10;
    this.timer = timer;

    this.imageID = (this.imageID + 1) % this.images.length;
    this.render();
  },
  init: function(images) {
    this.images = images;
  },
  start: function() {
    this.render();
    setInterval(() => this.tick(), 1000);
  }
};

async function handleSubmit(url, body) {
  const res = await fetch(url, {
    method: "post",
    body: body
  });
  if (!res.ok) {
    alert("error playing");
    return;
  }
  const timer = body.get("play[timer]");
  const imageID = parseInt(body.get("play[image_id]"));
  addRow(timer, imageID);
}

function addRow(timer, imageID) {
  const row = document.createElement("tr");
  const timerCell = document.createElement("td");
  timerCell.innerText = timer;
  row.appendChild(timerCell);

  const image = model.images.filter(image => image.id === imageID)[0];
  const imgCell = document.createElement("td");
  const img = document.createElement("img");
  img.src = image.src;
  imgCell.appendChild(img);
  row.appendChild(imgCell);

  if (played.children.length === 0) {
    played.appendChild(row);
  } else {
    played.insertBefore(row, played.children[0]);
  }
}