!function(){function e(e){o&&console.log(e)}function t(e){var t=Object.keys(e).length;MacGap.Dock.addBadge(t)}function s(){var s={detail:d.value};h.push(s);for(var a=h.length,n=0;a>n;n++)var i='<li class="task__item">'+h[n].detail+"</li>";f.innerHTML+=i,MacGap.File.write(u+"/ZenTasksList",h,"json"),e(h),d.value="",k.removeClass("show"),v.removeClass("clickable"),t(h)}function a(e,t){MacGap.notify({title:e,content:t})}function n(){var e=MacGap.File.read(u+"/ZenTasksList","json");JSON.stringify(e);var s=Object.keys(e).length;for(var a in e){h.push(e[a].detail);var n='<li class="task__item">'+e[a].detail+"</li>";f.innerHTML+=n}h.push(e),t(e)}function i(){MacGap.File.write(u+"/ZenTasksList",h,"json"),e("Created a new list!")}function l(){var e=MacGap.File.exists(u+"/ZenTasksList");0===e?i():1===e&&n()}function c(){d.addEventListener("keydown",function(e){var t=e.which||e.keyCode;d.value.length>1?(v.addClass("clickable"),v.addEventListener("click",s),13===t&&s()):v.removeClass("clickable")})}MacGap.Window.title("ZenTasks");var o=!0,r=Element.prototype;r.addClass=function(e){this.classList.add(e)},r.removeClass=function(e){this.classList.remove(e)},r.toggleClass=function(e){this.classList.toggle(e)},r.html=function(e){this.innerHTML=e};var u=MacGap.documentsPath,d=document.querySelector(".js-input--task"),v=document.querySelector(".js-btn--create-task"),f=document.querySelector(".js-task-list"),k=document.querySelector(".js-focus-overlay"),h=[];a("ZenTasks","App is running!"),l(),d.addEventListener("focus",c),d.addEventListener("blur",function(){k.removeClass("show")})}();