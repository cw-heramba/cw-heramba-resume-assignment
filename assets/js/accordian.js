var containers = document.getElementsByClassName('content-container');

for(i=0;i<containers.length;i++){
    containers[i].addEventListener("click",function(){
        this.classList.toggle('active');
        console.log("hello");
    })
}