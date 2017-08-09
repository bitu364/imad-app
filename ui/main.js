console.log('Loaded!');

var button= document.getElemenById('counter');
var counter=0;
button.onclick=function(){
    counter=counter+1;
    var span=document.getElementById('count');
    spab.innerHTML=counter.toString();
};