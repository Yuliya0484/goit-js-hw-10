import"./assets/modulepreload-polyfill-B5Qt9EMX.js";/* empty css                      */import{f,i as p}from"./assets/vendor-BbbuE1sJ.js";const d=document.querySelector("#datetime-picker"),n=document.querySelector("button[data-start]");d.setAttribute("placeholder","Choose a date");n.setAttribute("disabled","disabled");const y=document.createElement("button"),s=n.insertAdjacentElement("afterend",y);s.textContent="Reset";s.setAttribute("type","button");s.setAttribute("data-reset","");s.classList.add("is-hidden");const v={enableTime:!0,time_24hr:!0,defaultDate:null,minuteIncrement:1,onClose(t){const o=Date.now();t[0].getTime()<o?(p.warning({title:"Warning",message:"Please choose a date in the future"}),n.disabled=!0):n.removeAttribute("disabled")}};f("#datetime-picker",v);const e={getDays:document.querySelector("span[data-days]"),getHours:document.querySelector("span[data-hours]"),getMinutes:document.querySelector("span[data-minutes]"),getSeconds:document.querySelector("span[data-seconds]")};function C(t){const l=Math.floor(t/864e5),m=Math.floor(t%864e5/36e5),h=Math.floor(t%864e5%36e5/6e4),g=Math.floor(t%864e5%36e5%6e4/1e3);return{days:l,hours:m,minutes:h,seconds:g}}function r(t){return String(t).padStart(2,"0")}n.addEventListener("click",b);let i=null;function b(){i=setInterval(t,1e3);function t(){let o=new Date(d.value);const u=Date.now(),c=o.getTime()-u,a=C(c);if(isNaN(o)){Report.warning("Oops!","Please choose future date!","Try Again"),clearInterval(i);return}if(c<0){clearInterval(i),s.classList.add("is-hidden"),n.classList.remove("is-hidden"),d.value="";return}e.getDays.textContent=r(a.days),e.getHours.textContent=r(a.hours),e.getMinutes.textContent=r(a.minutes),e.getSeconds.textContent=r(a.seconds),n.classList.add("is-hidden"),s.classList.remove("is-hidden")}}s.addEventListener("click",S);function S(){clearInterval(i),e.getDays.textContent="00",e.getHours.textContent="00",e.getMinutes.textContent="00",e.getSeconds.textContent="00",d.value="",s.classList.add("is-hidden"),n.classList.remove("is-hidden")}
//# sourceMappingURL=1-timer.js.map