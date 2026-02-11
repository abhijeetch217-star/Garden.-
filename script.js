const colors=[
  ["#ff6b81","#ff4d6d"],
  ["#ff8fab","#fb6f92"],
  ["#c77dff","#9d4edd"],
  ["#4d96ff","#4361ee"],
  ["#ffb703","#f48c06"]
];

let autoInterval=null;

function random(arr){
  return arr[Math.floor(Math.random()*arr.length)];
}

function createFlower(x,y){

  const size=70+Math.random()*30;
  const colorPair=random(colors);

  const flower=document.createElement("div");
  flower.className="flower";
  flower.style.left=x+"px";
  flower.style.top=y+"px";
  flower.style.width=size+"px";
  flower.style.height=size+"px";

  // Create layered petals
  for(let layer=0;layer<2;layer++){
    for(let i=0;i<8;i++){
      let petal=document.createElement("div");
      petal.className="petal";

      let petalSize=size/(1.8-layer*0.3);

      petal.style.width=petalSize+"px";
      petal.style.height=petalSize+"px";
      petal.style.background=`radial-gradient(circle at 30% 30%, ${colorPair[0]}, ${colorPair[1]})`;
      petal.style.left=size/2-petalSize/2+"px";
      petal.style.top=size/2-petalSize/2+"px";
      petal.style.transform=`rotate(${i*45}deg) translateY(-${size/3-layer*10}px)`;

      flower.appendChild(petal);
    }
  }

  // Center
  const center=document.createElement("div");
  center.className="center";
  center.style.width=size/3+"px";
  center.style.height=size/3+"px";
  center.style.background="radial-gradient(#6d4c41,#3e2723)";
  center.style.left=size/2-size/6+"px";
  center.style.top=size/2-size/6+"px";
  flower.appendChild(center);

  // Stem
  const stem=document.createElement("div");
  stem.className="stem";
  flower.appendChild(stem);

  document.body.appendChild(flower);
}

document.addEventListener("click",(e)=>{
  createFlower(e.clientX,e.clientY);
});

document.getElementById("autoBtn").onclick=function(){
  if(autoInterval){
    clearInterval(autoInterval);
    autoInterval=null;
    this.textContent="Auto Bloom 🌷";
  }else{
    autoInterval=setInterval(()=>{
      createFlower(
        Math.random()*window.innerWidth,
        Math.random()*window.innerHeight
      );
    },600);
    this.textContent="Stop 🌸";
  }
};

document.getElementById("resetBtn").onclick=function(){
  document.querySelectorAll(".flower").forEach(f=>f.remove());
};
