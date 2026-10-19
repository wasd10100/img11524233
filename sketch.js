
let classifier;
let imageModelURL = 'https://wasd10100.github.io/img11524233/';

let video;
let label = "";

// 載入模型
function preload() {
  classifier = ml5.imageClassifier(
    imageModelURL + 'model.json'
  );
}

function setup() {
  createCanvas(320, 320);

  // 使用後置鏡頭
  const constraints = {
    audio: false,
    video: {
      facingMode: {
        exact: "environment"
      }
    }
  };

  video = createCapture(constraints);
  video.size(320, 320);
  video.hide();

  // 開始辨識
  classifyVideo();
}

function draw() {
  background(0);

  // 顯示攝影機畫面
  image(video, 0, 0, width, height);

  // 顯示辨識結果
  fill(255);
  textSize(16);
  textAlign(CENTER);
  text(label, width / 2, height - 4);
}

// 取得影像分類結果
function classifyVideo() {
  classifier.classify(video, gotResult);
}

// 接收辨識結果
function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }

  label = results[0].label;

  // 繼續辨識下一張影像
  classifyVideo();
}
