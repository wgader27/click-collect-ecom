(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function n(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(a){if(a.ep)return;a.ep=!0;const r=n(a);fetch(a.href,r)}})();class xe{constructor(t,n={}){let s=document.getElementById(t);s||(s=document.createElement("div"),console.warn(`Element with id "${t}" not found. Creating a new div as root.`),document.body.appendChild(s)),this.root=s,this.routes=[],this.layouts={},this.currentRoute=null,this.isAuthenticated=!1,this.loginPath=n.loginPath||"/login",this.basePath=n.basePath||"/",this.basePath!=="/"&&!this.basePath.endsWith("/")&&(this.basePath+="/"),window.addEventListener("popstate",()=>this.handleRoute()),document.addEventListener("click",a=>{const r=a.target.closest("[data-link]");if(r){a.preventDefault();const o=r.getAttribute("href");this.navigate(o)}})}setAuth(t){this.isAuthenticated=t}addLayout(t,n){return this.layouts[t]=n,this}findLayout(t){let n=null,s=0;for(const[a,r]of Object.entries(this.layouts))t.startsWith(a)&&a.length>s&&(n=r,s=a.length);return n}addRoute(t,n,s={}){const a=this.pathToRegex(t),r=this.extractParams(t);return this.routes.push({path:t,regex:a,keys:r,handler:n,requireAuth:s.requireAuth||!1,useLayout:s.useLayout!==!1}),this}pathToRegex(t){if(t==="*")return/.*/;const n=t.replace(/\//g,"\\/").replace(/:(\w+)/g,"([^\\/]+)").replace(/\*/g,".*");return new RegExp("^"+n+"$")}extractParams(t){const n=[],s=t.matchAll(/:(\w+)/g);for(const a of s)n.push(a[1]);return n}getParams(t,n){const s=n.match(t.regex);if(!s)return{};const a={};return t.keys.forEach((r,o)=>{a[r]=s[o+1]}),a}navigate(t){let n=t;if(this.basePath!=="/"){const s=t.startsWith("/")?t.substring(1):t;n=this.basePath+s}window.history.pushState(null,null,n),this.handleRoute()}handleRoute(){let t=window.location.pathname;this.basePath!=="/"&&t.startsWith(this.basePath)?t=t.substring(this.basePath.length-1):this.basePath!=="/"&&t+"/"===this.basePath&&(t="/");for(const s of this.routes)if(s.regex.test(t)){if(s.requireAuth&&!this.isAuthenticated){sessionStorage.setItem("redirectAfterLogin",t),this.navigate(this.loginPath);return}this.currentRoute=t;const a=this.getParams(s,t),r=s.handler(a);r instanceof Promise?r.then(o=>{this.renderContent(o,s,t)}):this.renderContent(r,s,t);return}const n=this.routes.find(s=>s.path==="*");if(n){const s=n.handler({});this.root.innerHTML=s}}renderContent(t,n,s){const a=t instanceof DocumentFragment;if(n.useLayout){const r=this.findLayout(s);if(r){const o=r(),l=o.querySelector("slot");if(l)if(a)l.replaceWith(t);else{const f=document.createElement("template");f.innerHTML=t,l.replaceWith(f.content)}else console.warn("Layout does not contain a <slot> element. Content will not be inserted.");this.root.innerHTML="",this.root.appendChild(o)}else a?(this.root.innerHTML="",this.root.appendChild(t)):this.root.innerHTML=t}else a?(this.root.innerHTML="",this.root.appendChild(t)):this.root.innerHTML=t;this.attachEventListeners(s)}attachEventListeners(t){const n=document.getElementById("loginBtn");n&&n.addEventListener("click",()=>{this.login()});const s=document.getElementById("logoutBtn");s&&s.addEventListener("click",()=>{this.logout()})}login(){this.setAuth(!0);const t=sessionStorage.getItem("redirectAfterLogin");sessionStorage.removeItem("redirectAfterLogin"),this.navigate(t||"/dashboard")}logout(){this.setAuth(!1),this.navigate(this.loginPath)}start(){this.handleRoute()}}const ye=`<div class="mx-auto max-w-4xl p-6">
  <h1 class="mb-6 text-4xl font-bold text-gray-900">À propos</h1>
  <p class="mb-6 text-lg text-gray-700">
    Base de code pour la SAE 3.01. Octobre 2025</p>
<p class="mb-6 text-lg text-gray-700">
    Se référer à la documentation pour comprendre comment l'utiliser
    </p>
   
</div>`;function ve(){return ye}let I=function(e,t){let n=e;for(let s in t)n=n.replaceAll("{{"+s+"}}",t[s]);return n};function i(e){const t=document.createElement("template");return t.innerHTML=e.trim(),t.content}const we=`<main class="font-body text-text">
  <!-- Hero Section -->
  <section class="relative h-[70vh] min-h-[31.25rem] overflow-hidden bg-text">
    <img 
      src="/click-collect-ecom/assets/images/brands/hero.jpg" 
      alt="Collection exclusive" 
      class="absolute inset-0 h-full w-full object-cover opacity-60"
    />
    <header class="absolute inset-0 bg-gradient-to-t from-text/70 to-transparent"></header>
    
    <article class="relative mx-auto flex h-full max-w-[75rem] flex-col items-center justify-center px-4 text-center text-bg">
      <h1 class="mb-4 font-display text-4xl leading-tight md:text-5xl lg:text-6xl">Bienvenue</h1>
      <p class="mb-8 max-w-[37.5rem] text-base text-bg/90 md:text-lg">
        Découvrez notre sélection exclusive de produits.
      </p>
      <a href="/products#" data-link 
         class="w-full rounded-[var(--radius-btn)] bg-bg px-5 py-3 text-center font-display tracking-wide uppercase text-text text-base cursor-pointer transition-all hover:bg-bg/90 md:text-lg md:w-auto">
        Découvrir la collection
      </a>
    </article>
  </section>

  <!-- Introduction -->
  <section class="mx-auto max-w-[75rem] px-4 py-12 text-center md:py-20">
    <h2 class="mb-4 font-display text-3xl md:text-4xl">L'excellence à portée de clic</h2>
    <p class="mx-auto max-w-[43.75rem] text-description text-base md:text-lg">
      Notre service Click & Collect vous offre une expérience d'achat raffinée et personnalisée. 
      Commandez en ligne, retirez en boutique, et profitez de notre expertise.
    </p>
  </section>

  <!-- Catégories en vedette -->
  <section class="mx-auto max-w-[75rem] px-4 pb-12 md:pb-20">
    <h2 class="mb-8 text-center font-display text-2xl md:mb-12 md:text-3xl">Nos univers</h2>
    
    <nav class="grid grid-cols-1 gap-6 md:grid-cols-3">
      <!-- Catégorie 1 -->
      <a href="/category/1" data-link class="group relative overflow-hidden">
        <figure class="aspect-[3/4] overflow-hidden bg-description/10">
          <img 
            src="/click-collect-ecom/assets/images/brands/category-vetement.jpg" 
            alt="Mode Femme" 
            class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </figure>
        <header class="absolute inset-0 bg-gradient-to-t from-text/60 to-transparent"></header>
        <figcaption class="absolute bottom-0 left-0 right-0 p-6 text-bg">
          <h3 class="mb-2 font-display text-2xl">Vêtements</h3>
          <p class="text-sm text-bg/80">Élégance & raffinement</p>
        </figcaption>
      </a>

      <!-- Catégorie 2 -->
      <a href="/category/2" data-link class="group relative overflow-hidden">
        <figure class="aspect-[3/4] overflow-hidden bg-description/10">
          <img 
            src="/click-collect-ecom/assets/images/brands/category-chaussure.jpg" 
            alt="Mode Homme" 
            class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </figure>
        <header class="absolute inset-0 bg-gradient-to-t from-text/60 to-transparent"></header>
        <figcaption class="absolute bottom-0 left-0 right-0 p-6 text-bg">
          <h3 class="mb-2 font-display text-2xl">Chaussures</h3>
          <p class="text-sm text-bg/80">Style & caractère</p>
        </figcaption>
      </a>

      <!-- Catégorie 3 -->
      <a href="/category/3" data-link class="group relative overflow-hidden">
        <figure class="aspect-[3/4] overflow-hidden bg-description/10">
          <img 
            src="/click-collect-ecom/assets/images/brands/category-accessoire.jpg" 
            alt="Accessoires" 
            class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </figure>
        <header class="absolute inset-0 bg-gradient-to-t from-text/60 to-transparent"></header>
        <figcaption class="absolute bottom-0 left-0 right-0 p-6 text-bg">
          <h3 class="mb-2 font-display text-2xl">Accessoires</h3>
          <p class="text-sm text-bg/80">Détails précieux</p>
        </figcaption>
      </a>
    </nav>
  </section>

  <!-- Services -->
  <section class="bg-description/5 py-12 md:py-16">
    <article class="mx-auto max-w-[75rem] px-4">
      <h2 class="mb-8 text-center font-display text-2xl md:mb-12 md:text-3xl">Nos services</h2>
      
      <ul class="grid grid-cols-1 gap-8 md:grid-cols-3">
        <li class="text-center">
          <figure class="mb-4 flex justify-center">
            <img src="/click-collect-ecom/assets/images/icons/check-badge.svg" alt="" class="h-12 w-12" />
          </figure>
          <h3 class="mb-2 font-display text-lg">Click & Collect</h3>
          <p class="text-sm text-description">Commandez en ligne, retirez en boutique sous 2h</p>
        </li>

        <li class="text-center">
          <figure class="mb-4 flex justify-center">
            <img src="/click-collect-ecom/assets/images/icons/gift.svg" alt="" class="h-12 w-12" />
          </figure>
          <h3 class="mb-2 font-display text-lg">Conseils personnalisés</h3>
          <p class="text-sm text-description">Notre équipe à votre écoute pour vous guider</p>
        </li>

        <li class="text-center">
          <figure class="mb-4 flex justify-center">
            <img src="/click-collect-ecom/assets/images/icons/shield.svg" alt="" class="h-12 w-12" />
          </figure>
          <h3 class="mb-2 font-display text-lg">Qualité garantie</h3>
          <p class="text-sm text-description">Sélection rigoureuse de produits d'exception</p>
        </li>
      </ul>
    </article>
  </section>

  <!-- CTA Final -->
  <section class="mx-auto max-w-[75rem] px-4 py-12 text-center md:py-20">
    <h2 class="mb-4 font-display text-3xl md:text-4xl">Prêt à découvrir notre collection ?</h2>
    <p class="mb-8 text-description text-base md:text-lg">
      Explorez nos produits et profitez de votre expérience Click & Collect
    </p>
    <a href="/products#" data-link 
       class="w-full rounded-[var(--radius-btn)] bg-btn-primary-bg px-5 py-3 text-center font-display uppercase text-btn-primary-fg text-base cursor-pointer transition-all hover:bg-btn-primary-bg/90 md:text-lg md:w-auto">
      Voir tous les produits
    </a>
  </section>
</main>

`;let D="https://wwW.w-gader.mmi-limoges.fr/api-ecom/",A=async function(e){let t={method:"GET",credentials:"include"};try{var n=await fetch(D+e,t)}catch(a){return console.error("Echec de la requête : "+a),!1}return n.status!=200?(console.error("Erreur de requête : "+n.status),!1):await n.json()},se=async function(e,t){let n={credentials:"include",method:"POST",header:{"Content-Type":"multipart/form-data"},body:t};try{var s=await fetch(D+e,n)}catch(r){return console.error("Echec de la requête : "+r),!1}let a=await s.json();return s.status!=200&&console.error("Erreur de requête : "+s.status,a),a},ke=async function(e,t){let n={method:"POST",header:{"Content-Type":"application/json"},body:t};try{var s=await fetch(D+e,n)}catch(r){return console.error("Echec de la requête : "+r),!1}let a=await s.json();return s.status!=200&&console.error("Erreur de requête : "+s.status,a),a},ae=async function(e){let t={method:"DELETE",credentials:"include"};try{var n=await fetch(D+e,t)}catch(a){return console.error("Echec de la requête : "+a),!1}return n.status!=200?(console.error("Erreur de requête : "+n.status),!1):await n.json()},re=async function(e,t){let n={method:"PATCH",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)};try{var s=await fetch(D+e,n)}catch(r){return console.error("Echec de la requête : "+r),!1}let a=await s.json();return s.status!=200&&console.error("Erreur de requête : "+s.status,a),a},c={};c.login=async function(e){const t=await se("auth",JSON.stringify(e));return console.log("Login response:",t),t};c.signup=async function(e){const t=await ke("users",JSON.stringify(e));return console.log("Signup response:",t),t};c.getCurrentUser=async function(){return await A("auth")};c.logout=async function(){return await ae("auth")};c.updateProfile=async function(e){const t=await re("auth",e);return console.log("Update profile response:",t),t};c.changePassword=async function(e,t){const n=await re("auth/password",{current_password:e,new_password:t});return console.log("Change password response:",n),n};c.deleteAccount=async function(){const e=await c.getCurrentUser();if(!e||!e.authenticated||!e.user)return{success:!1,error:"Utilisateur non connecté"};const t=e.user.id,n=await ae(`users/${t}`);return console.log("Delete account response:",n),n&&await c.logout(),n};const oe={};oe.init=async function(){const e=i(we);try{const t=await c.getCurrentUser();if(t&&t.authenticated&&t.user){const s=t.user.firstname||"",a=e.querySelector("h1");a&&s&&(a.textContent=`Ravie de vous revoir ${s}`)}}catch(t){console.error("Erreur lors de la récupération de l'utilisateur:",t)}return e};async function Ce(){return await oe.init()}let S={},X=[{id:1,name:"Marteau",description:"Un marteau est un outil utilisé pour enfoncer des clous dans du bois ou d'autres matériaux. Il se compose d'une tête lourde en métal fixée à un manche en bois ou en fibre de verre.",price:9.99},{id:2,name:"Tournevis",description:"Un tournevis est un outil utilisé pour visser ou dévisser des vis. Il se compose d'une tige en métal avec une tête qui s'adapte à la fente de la vis.",price:5.99},{id:3,name:"Clé à molette",description:"Une clé à molette est un outil utilisé pour serrer ou desserrer des écrous et des boulons. Elle se compose d'une mâchoire réglable qui s'adapte à différentes tailles d'écrous.",price:12.99},{id:4,name:"Pince",description:"Une pince est un outil utilisé pour saisir, tenir ou plier des objets. Elle se compose de deux bras articulés qui se rejoignent en un point de pivot.",price:7.99},{id:5,name:"Scie",description:"Une scie est un outil utilisé pour couper des matériaux, généralement en bois. Elle se compose d'une lame dentée fixée à un manche.",price:14.99},{id:6,name:"Perceuse",description:"Une perceuse est un outil utilisé pour percer des trous dans divers matériaux. Elle se compose d'un moteur qui fait tourner une mèche.",price:49.99},{id:7,name:"Ponceuse",description:"Une ponceuse est un outil utilisé pour lisser des surfaces en bois ou en métal. Elle se compose d'un moteur qui fait vibrer ou tourner un abrasif.",price:79.99},{id:8,name:"Mètre",description:"Un mètre est un outil utilisé pour mesurer des distances. Il se compose d'une bande graduée en métal ou en plastique.",price:19.99},{id:9,name:"Niveau à bulle",description:"Un niveau à bulle est un outil utilisé pour vérifier l'horizontalité ou la verticalité d'une surface. Il se compose d'un tube rempli de liquide avec une bulle d'air à l'intérieur.",price:9.99}];S.fetch=async function(e){let t=await A("products/"+e);return t==!1?X.pop():[t]};S.fetchAll=async function(){let e=await A("products");return e==!1?X:e};S.fetchAllByCategory=async function(e){let t=await A(`products?category=${e}`);return t==!1?X:t};let u={},p=[];function Le(){let e=localStorage.getItem("cart");e&&(p=JSON.parse(e))}function W(){localStorage.setItem("cart",JSON.stringify(p))}function qe(){let e=0;for(let t of p)e+=t.price*t.quantity;return{total:e}}u.addItem=function(e){const t=p.find(n=>n.id===e.id);return t?t.quantity<5&&t.quantity++:p.push({id:e.id,name:e.name||"Produit",description:e.description||"",image:e.image||"default.png",price:e.price||0,quantity:1}),W(),!0};u.updateQuantity=function(e,t){let n=p.find(s=>s.id===e);n&&(n.quantity=t,W())};u.removeItem=function(e){p=p.filter(t=>t.id!==e),W()};u.clear=function(){p=[],W()};u.getItems=function(){return p};u.getItemCount=function(){let e=0;for(let t of p)e+=t.quantity;return e};u.isEmpty=function(){return p.length===0};u.getState=function(){let e=qe();return{items:p,itemCount:u.getItemCount(),total:e.total,isEmpty:p.length===0}};Le();const Y=`<header class="bg-white text-black border-b border-black/10 font-body">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
  <div class="h-16 flex items-center justify-between">
      <!-- Burger -->
      <button id="navBtn" type="button" class="p-2 -ml-2 md:hidden">
        <img id="iconOpen"  src="/click-collect-ecom/assets/images/icons/burger.svg" alt="Ouvrir le menu" class="h-6 w-6">
        <img id="iconClose" src="/click-collect-ecom/assets/images/icons/close.svg"  alt="Fermer le menu" class="h-6 w-6 hidden">
      </button>

      <!-- Logo -->
      <a href="/click-collect-ecom/" class="flex-1 md:flex-none flex justify-center md:justify-start">
        <img src="/click-collect-ecom/assets/images/brands/logo.svg" alt="Galeries Lafayette" class="h-7 w-auto">
      </a>

      <!-- Nav desktop -->
      <nav class="hidden md:block flex-1">
        <ul class="flex justify-center gap-12 text-sm font-medium">
          <li><a href="/products"   data-link class="pb-5 border-b-2 border-transparent hover:border-black transition-colors duration-300 px-1">TOUT</a></li>
          <li><a href="/category/1" data-link class="pb-5 border-b-2 border-transparent hover:border-black transition-colors duration-300 px-1">VÊTEMENTS</a></li>
          <li><a href="/category/2" data-link class="pb-5 border-b-2 border-transparent hover:border-black transition-colors duration-300 px-1">CHAUSSURES</a></li>
          <li><a href="/category/3" data-link class="pb-5 border-b-2 border-transparent hover:border-black transition-colors duration-300 px-1">ACCESSOIRES</a></li>
        </ul>
      </nav>

      <div class="w-8 md:hidden"></div>

      <!-- Actions : Panier + Profil -->
      <div class="flex items-center gap-10">
        <!-- Panier avec badge -->
        <a href="/cart" data-link class="relative">
          <img src="/click-collect-ecom/assets/images/icons/shopping-bag.svg" alt="Mon panier" class="h-6 w-6">
          <span id="cart-badge" class="absolute -top-2 -right-2 bg-notif text-white text-xs font-semibold rounded-full h-5 w-5 items-center justify-center hidden">0</span>
        </a>

        <!-- Profil -->
        <a href="/my-account/dashboard" data-link>
          <img src="/click-collect-ecom/assets/images/icons/profile.svg" alt="Mon compte" class="h-6 w-6">
        </a>
      </div>

    </div>
  </div>

  <!-- Mobile -->
  <div id="drawer" class="fixed inset-0 z-50 hidden md:hidden">
    <div id="backdrop" class="absolute inset-0 bg-black/25"></div>
    <nav class="absolute left-0 top-0 h-full w-72 max-w-[85vw] bg-white border-r border-black/10 p-6">
      <ul class="mt-10 mb-8 text-base font-medium">
        <li>
          <a href="/products" data-link class="flex items-center justify-between">
            <span>PRODUITS</span><img src="/click-collect-ecom/assets/images/icons/chevron-right.svg" alt="Voir" class="h-4 w-4">
          </a>
          <span class="block mt-2 w-12 h-[0.125rem] bg-black"></span>
        </li>
        <li><a href="/category/1" data-link class="flex items-center justify-between"><span>VÊTEMENTS</span><img src="/click-collect-ecom/assets/images/icons/chevron-right.svg" alt="Voir" class="h-4 w-4"></a></li>
        <li><a href="/category/2" data-link class="flex items-center justify-between"><span>CHAUSSURES</span><img src="/click-collect-ecom/assets/images/icons/chevron-right.svg" alt="Voir" class="h-4 w-4"></a></li>
        <li><a href="/category/3" data-link class="flex items-center justify-between"><span>ACCESSOIRES</span><img src="/click-collect-ecom/assets/images/icons/chevron-right.svg" alt="Voir" class="h-4 w-4"></a></li>
      </ul>
    </nav>
    <a href="/signin">
        <img src="/click-collect-ecom/assets/images/icons/profile.svg" alt="Se connecter" class="h-auto">
    </a>
  </div>
</header>`;let j={html:function(){return Y},dom:function(){let e=i(Y);const t=e.querySelector("#navBtn"),n=e.querySelector("#drawer"),s=e.querySelector("#backdrop"),a=e.querySelector("#iconOpen"),r=e.querySelector("#iconClose");t&&n&&s&&(t.onclick=()=>{n.classList.toggle("hidden"),a.classList.toggle("hidden"),r.classList.toggle("hidden")},s.onclick=()=>{n.classList.add("hidden"),a.classList.remove("hidden"),r.classList.add("hidden")});const o=window.location.pathname;return e.querySelectorAll("a[data-link]").forEach(f=>f.classList.remove("active")),o==="/products"?e.querySelector('a[href="/products"]').classList.add("active"):o.startsWith("/category/1")?e.querySelector('a[href="/category/1"]').classList.add("active"):o.startsWith("/category/2")?e.querySelector('a[href="/category/2"]').classList.add("active"):o.startsWith("/category/3")&&e.querySelector('a[href="/category/3"]').classList.add("active"),j.updateCartBadge(e),e},updateCartBadge:function(e=document){const t=e.querySelector("#cart-badge");if(!t)return;const n=u.getItemCount();t.textContent=n,n>0?(t.classList.remove("hidden"),t.classList.add("flex")):(t.classList.add("hidden"),t.classList.remove("flex"))}};const Se=`<article class="relative">
  <a href="/products/{{id}}/{{name}}" data-link class="block">
    <figure>
      <img src="/click-collect-ecom/assets/images/products/{{id}}/{{image}}" alt="{{name}}"
        class="w-full aspect-[4/5] object-cover bg-white">
      <figcaption class="pt-1 pl-1 md:p-4 lg:p-4">
        <p class="font-display text-base font-bold text-text uppercase">
          {{name}}
        </p>
        <p class="mt-1 text-sm md:text-base lg:text-base font-body text-description">
          {{descriptionShort}}
        </p>
        <p class="mt-4 text-sm md:text-base lg:text-base font-body font-bold text-text">
          {{price}} €
        </p>
      </figcaption>
    </figure>
  </a>

  <button type="button" data-buy="{{id}}"
    class="absolute bottom-2 right-2 bg-text text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-text/90 transition-colors shadow-lg cursor-pointer">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  </button>
</article>`;let ie={html:function(e){let t='<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">';for(let n of e)n.image=n.images&&n.images.length>0?n.images[0]:"default.png",n.descriptionShort=n.desription&&n.description.length>30?n.description.substring(0,30)+"...":n.description,t+=I(Se,n);return t+"</div>"},dom:function(e){return i(ie.html(e))}};const Ee=`<div class="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-4">
  <h1 class="font-display text-2xl md:text-3xl text-black mb-2">Nos produits</h1>
  <p id="nbrproduct" class="font-body text-sm text-gray mb-8"></p>
  <slot name="products"></slot>
</div>`;let B={products:[]},Z={};Z.handler_clickOnProduct=function(e){const t=e.target.closest("[data-buy]");if(t&&t.dataset.buy!==void 0){let n=parseInt(t.dataset.buy);const s=B.products.find(a=>a.id===n);if(s&&u.addItem({id:s.id,name:s.name,description:s.description||s.descriptionShort,image:s.image,price:s.price})){j.updateCartBadge(document);const r=t.innerHTML;t.innerHTML="✓",t.disabled=!0,setTimeout(()=>{t.innerHTML=r,t.disabled=!1},2e3)}}};Z.init=async function(e){return e&&e.id?B.products=await S.fetchAllByCategory(e.id):B.products=await S.fetchAll(),k.init(B.products)};let k={};k.init=function(e){let t=k.createPageFragment(e);return k.attachEvents(t),t};k.createPageFragment=function(e){let t=i(Ee);console.log("Creating page fragment with data:",e);const n=t.querySelector("#nbrproduct");n.textContent=`${e.length} produit${e.length>1?"s":""}`;let s=ie.dom(e);return t.querySelector('slot[name="products"]').replaceWith(s),t};k.attachEvents=function(e){return e.firstElementChild.addEventListener("click",Z.handler_clickOnProduct),e};function le(e){return console.log("ProductsPage",e),Z.init(e)}const Pe=`<article class="mx-auto max-w-[75rem] bg-white text-text font-body">
  <div class="grid grid-cols-1 gap-6 lg:grid-cols-12 mt-4">

    <!-- Galerie (desktop) -->
    <aside class="hidden lg:block lg:col-span-2">
      <ul id="p-thumbs" class="flex flex-col  gap-4 mb-4 sticky top-20">
        <!-- thumbnails seront insérés dynamiquement -->
      </ul>
    </aside>

    <!-- Image principale -->
    <figure class="lg:col-span-7">
  <img id="p-main" src="/click-collect-ecom/assets/images/products/{{id}}/{{image}}" alt="{{name}}"
           class="w-full aspect-[4/5] lg:h-[35rem] lg:w-auto lg:aspect-auto object-cover object-top bg-white">
      <figcaption class="mt-3 flex items-center justify-center gap-2 lg:hidden" id="p-dots">
        <!-- dots générés dynamiquement -->
      </figcaption>
    </figure>

    <!-- Infos -->
    <section class="lg:col-span-3">
      <header class="mb-4">
        <h1 class="font-display text-3xl md:text-4xl">{{name}}</h1>
        <p class="mt-1 text-description">{{description}}</p>
        <a href="#details" class="mt-2 inline-block text-sm underline">Description détaillée</a>
      </header>

      <p class="text-lg font-bold mb-6">{{price}} €</p>

      <button
        data-buy="{{id}}"
        class="w-full md:w-auto rounded-full bg-text text-white cursor-pointer
               px-6 py-3 text-base font-display uppercase
               lg:px-12 lg:py-4"
      >
        Ajouter au panier
      </button>

      <details id="details" class="mt-12">
        <summary class="cursor-pointer flex items-center justify-between text-xl font-display">
          <span>Détails et composition</span>
          <img src="/click-collect-ecom/assets/images/icons/chevron-right.svg" alt="Ouvrir" class="h-4 w-4">
        </summary>
        <div class="mt-6 pt-6 border-t">
          <p class="text-sm md:text-base">{{details}}</p>
        </div>
      </details>
    </section>
  </div>
</article>`;let ce={html:function(e){return I(Pe,e)},dom:function(e){let t=i(ce.html(e));const n=t.querySelector("#p-main"),s=t.querySelector("#p-thumbs"),a=t.querySelector("#p-dots");var r=["default.png"];if(e&&e.images&&Array.isArray(e.images)&&e.images.length?r=e.images:e&&e.image&&(r=[e.image]),n&&e&&e.id&&(n.src="/assets/images/products/"+e.id+"/"+r[0],n.alt=e.name||""),s){s.innerHTML="";for(var o=0;o<r.length;o++){var l=r[o],f=document.createElement("li"),x=document.createElement("button");x.type="button",x.style="border:none; background:none; padding:0; margin:0;",x.setAttribute("data-src","/assets/images/products/"+e.id+"/"+l),x.className=o===0?"bullets":"bullets-grey";var V=document.createElement("img");V.src="/assets/images/products/"+e.id+"/"+l,V.alt=e.name||"Image produit",V.style="width:70%; aspect-ratio:4/5; object-fit:cover; cursor: pointer;",x.appendChild(V),(function(v,w){w.addEventListener("click",function(){n&&(n.src=w.getAttribute("data-src"));for(var h=s.querySelectorAll("button"),b=0;b<h.length;b++)b===v?h[b].className="bullets":h[b].className="bullets-grey";if(a)for(var y=a.querySelectorAll("button"),F=0;F<y.length;F++)y[F].style.opacity=F===v?"1":".3"})})(o,x),f.appendChild(x),s.appendChild(f)}}if(a){a.innerHTML="";for(var O=0;O<r.length;O++){var R=document.createElement("button");R.type="button",R.className="h-2 w-2 rounded-full bg-black",R.style.opacity=O===0?"1":".3",(function(v){R.addEventListener("click",function(){if(n&&(n.src="/assets/images/products/"+e.id+"/"+r[v]),s)for(var w=s.querySelectorAll("button"),h=0;h<w.length;h++)h===v?w[h].className="bullets":w[h].className="bullets-grey";for(var b=a.querySelectorAll("button"),y=0;y<b.length;y++)b[y].style.opacity=y===v?"1":".3"})})(O),a.appendChild(R)}}return t}};const Ie=`<div class="px-4 md:px-6 lg:px-8 py-4">
   <a href="/products" data-link class="inline-flex items-center gap-2 text-sm">
     <img src="/click-collect-ecom/assets/images/icons/chevron-right.svg" alt="Retour" class="h-4 w-4 rotate-180" />
     <span class="hidden md:inline">Retour</span>
   </a>
 
   <slot name="detail"></slot>
 </div>
 `;let $={products:[]};$.getProductById=function(e){return $.products.find(t=>t.id==e)};let Q={};Q.handler_clickOnProduct=function(e){if(e.target.dataset.buy!==void 0){let t=parseInt(e.target.dataset.buy);const n=$.getProductById(t);if(n&&u.addItem({id:n.id,name:n.name,description:n.description||n.descriptionShort,image:n.image,price:n.price})){j.updateCartBadge(document);const a=e.target,r=a.textContent;a.textContent="✓ Ajouté au panier",a.disabled=!0,setTimeout(()=>{a.textContent=r,a.disabled=!1},2e3)}}};Q.init=async function(e){const t=e.id;$.products=await S.fetchAll();let n=$.getProductById(t);return console.log("Product loaded:",n),n&&(n.image=n.images&&Array.isArray(n.images)&&n.images.length?n.images[0]:n.image||"default.png"),C.init(n)};let C={};C.init=function(e){let t=C.createPageFragment(e);return C.attachEvents(t),t};C.createPageFragment=function(e){let t=i(Ie),n=ce.dom(e);return t.querySelector('slot[name="detail"]').replaceWith(n),t};C.attachEvents=function(e){return e.querySelector("[data-buy]").addEventListener("click",Q.handler_clickOnProduct),e};function Ae(e){return console.log("ProductDetailPage",e),Q.init(e)}const je=`<main class="px-4 md:px-6 lg:px-8 py-6">
  <a href="/products" data-link class="inline-flex items-center gap-2 text-sm mb-6">
    <img src="/click-collect-ecom/assets/images/icons/chevron-right.svg" alt="Retour" class="h-4 w-4 rotate-180">
    <span class="hidden md:inline">Retour</span>
  </a>

  <header class="mb-8">
    <h1 class="font-display text-3xl md:text-5xl">Bonjour {{name}}</h1>
  </header>

  <!-- ICI on insère les cartes du dashboard via page.js -->
  <slot name="dashboard-cards"></slot>

  <footer class="mt-10">
    <button id="logout-btn"
      class="px-6 py-2 md:px-10 md:py-3 font-display uppercase border border-black rounded-[var(--radius-btn)] cursor-pointer">
      Se déconnecter
    </button>
  </footer>
</main>
`,ee=`<section class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-5xl">
  <a href="/my-account/orders" data-link class="block border border-black/20 p-4 md:p-10">
    <article class="flex items-start justify-between">
      <figure class="flex items-start gap-3">
        <img src="/click-collect-ecom/assets/images/icons/orders.svg" alt="Icône commandes" class="h-5 w-5 mt-0.5">
        <figcaption>
          <h2 class="font-display text-base md:text-lg">Vos commandes</h2>
          <p class="font-body text-description text-sm mt-2">
            Suivre l’historique et les détails de vos commandes ou effectuer un retour.
          </p>
        </figcaption>
      </figure>
      <img src="/click-collect-ecom/assets/images/icons/chevron-right.svg" alt="Voir" class="h-4 w-4 mt-1">
    </article>
  </a>

  <a href="/my-account/profile" data-link class="block border border-black/20 p-4 md:p-10">
    <article class="flex items-start justify-between">
      <figure class="flex items-start gap-3">
        <img src="/click-collect-ecom/assets/images/icons/profile.svg" alt="Icône profil" class="h-5 w-5 mt-0.5">
        <figcaption>
          <h2 class="font-display text-base md:text-lg">Vos informations personnelles</h2>
          <p class="font-body text-description text-sm mt-2">
            Modifier vos données personnelles ou votre mot de passe.
          </p>
        </figcaption>
      </figure>
      <img src="/click-collect-ecom/assets/images/icons/chevron-right.svg" alt="Voir" class="h-4 w-4 mt-1">
    </article>
  </a>
</section>
`;let Re={html:function(){return ee},dom:function(){return i(ee)}},de={};de.render=function(e){let t=je.replace("{{name}}",e.firstname);const n=i(t),s=n.querySelector('slot[name="dashboard-cards"]');s&&s.replaceWith(Re.dom());const a=n.querySelector("#logout-btn");return a&&a.addEventListener("click",async()=>{await c.logout(),window.location.href="/signin"}),n};async function Me(){const e=await c.getCurrentUser();if(!e||!e.authenticated){window.location.href="/signin";return}return de.render(e.user)}const $e=`<main class="px-4 md:px-6 lg:px-8 py-6">
  <a href="/products" data-link class="inline-flex items-center gap-2 text-sm mb-6">
    <img src="/click-collect-ecom/assets/images/icons/arrow-left.svg" alt="Retour" class="h-4 w-4">
    <span class="hidden md:inline">Retour</span>
  </a>

  <header class="mb-6">
    <h1 class="font-display text-3xl md:text-5xl">Panier</h1>
  </header>

  <slot name="cart-content"></slot>
</main>
`,Te=`<section class="font-body text-text py-12 text-center">
  <figure class="mb-6">
    <img src="/click-collect-ecom/assets/images/icons/shopping-bag.svg" alt="Panier vide" class="h-20 w-20 mx-auto opacity-30">
  </figure>
  
  <h2 class="font-display text-2xl mb-2">Votre panier est vide</h2>
  <p class="text-description mb-8">Découvrez nos collections et ajoutez vos articles préférés</p>
  
  <a href="/products" data-link
     class="inline-flex items-center justify-center px-6 py-3 font-display uppercase
            bg-black text-white rounded-[var(--radius-btn)] hover:bg-black/90 transition-colors">
    Découvrir nos produits
  </a>
</section>
`,De=`<!-- Grille principale : liste (gauche) + récap (droite) -->
<section class="grid grid-cols-1 lg:grid-cols-3 gap-6 font-body text-text">
  <!-- Liste articles -->
  <section class="lg:col-span-2 space-y-6">
    <ul id="cart-list" class="space-y-6">
      <!-- items injectés -->
      <slot name="items"></slot>
    </ul>
  </section>

  <!-- Récapitulatif -->
  <aside class="lg:col-span-1">
    <section class="border border-black/20 p-4 md:p-6">
      <h2 class="font-display text-2xl mb-4">Récapitulatif</h2>

      <section class="mb-2">
        <p class="flex items-center justify-between py-3 mb-4">
          <span class="text-black/70">{{itemsCount}} {{itemsCountLabel}}</span>
          <span class="font-display text-2xl">{{total}} €</span>
        </p>

        <p class="text-xs text-black/60">
          <span class="inline-block w-2 h-2 bg-success rounded-full mr-2"></span>
          Click & Collect - Retrait gratuit
        </p>
      </section>

      <a href="/checkout" data-link
         class="mt-6 inline-flex w-full items-center justify-center px-6 py-3 font-display uppercase
                bg-black text-white rounded-[var(--radius-btn)]">
        Continuer
      </a>
    </section>
  </aside>
</section>
`,Ve=`<li>
  <article class="border border-black/20">
    <section class="p-4 md:p-6 grid grid-cols-[96px_1fr_auto] md:grid-cols-[120px_1fr_auto] gap-4 md:gap-6 items-start">
      <!-- Image produit -->
      <figure class="w-24 md:w-30">
        <img src="/click-collect-ecom/assets/images/products/{{id}}/{{image}}" alt="{{name}}" class="w-full h-auto object-cover">
      </figure>

      <!-- Infos -->
      <section class="space-y-2 pl-5">
        <h3 class="font-display text-base md:text-lg">{{name}}</h3>
        <p class="text-sm text-description">{{description}}</p>
        <p class="text-xs text-description">Prix unitaire : <span class="font-medium">{{unitPrice}} €</span></p>
      </section>

      <!-- Supprimer -->
      <section>
        <button type="button" data-remove="{{id}}"
                class="rounded-full border border-black/30 w-8 h-8 inline-flex items-center justify-center cursor-pointer">
          <img src="/click-collect-ecom/assets/images/icons/trash.svg" alt="Supprimer l'article" class="h-4 w-4">
        </button>
      </section>
    </section>

    <!-- Quantité + Total ligne -->
    <footer class="px-4 md:px-6 pb-4 md:pb-6 flex items-center justify-between">
      <section>
        <p class="text-xs text-description mb-2">Quantité</p>
        <label class="relative inline-flex">
          <select name="qty" data-qty="{{id}}"
                  class="appearance-none border border-text/20 px-3 pr-8 py-2 text-sm rounded-none cursor-pointer">
            <option{{q1}}>1</option>
            <option{{q2}}>2</option>
            <option{{q3}}>3</option>
            <option{{q4}}>4</option>
            <option{{q5}}>5</option>
          </select>
          <img src="/click-collect-ecom/assets/images/icons/chevron-down.svg" alt="Ouvrir le menu" class="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4">
        </label>
      </section>

      <p class="font-medium">{{lineTotal}} €</p>
    </footer>
  </article>
</li>
`;let E={cart:{}},P={};P.handleQuantityChange=function(e){const t=e.target,n=parseInt(t.dataset.qty),s=parseInt(t.value);u.updateQuantity(n,s),m.refreshCartContent(),j.updateCartBadge(document)};P.handleRemoveItem=function(e){const t=e.target.closest("button[data-remove]");if(!t)return;const n=parseInt(t.dataset.remove);confirm("Voulez-vous retirer cet article du panier ?")&&(u.removeItem(n),m.refreshCartContent(),j.updateCartBadge(document))};P.init=async function(){return E.cart=u.getState(),m.init()};let m={};m.init=function(){const e=i($e),t=e.querySelector('slot[name="cart-content"]');if(E.cart.isEmpty)t.replaceWith(i(Te));else{const n=m.createCartContent();t.replaceWith(n),m.attachEvents(e)}return e};m.createCartContent=function(){const e=E.cart.itemCount,t=e>1?"articles":"article",n={itemsCount:e,itemsCountLabel:t,total:E.cart.total.toFixed(2)};let s=I(De,n);const a=i(s),r=a.querySelector('slot[name="items"]'),o=m.createItemsList();return r.replaceWith(o),a};m.createItemsList=function(){const e=document.createDocumentFragment();return E.cart.items.forEach(t=>{const n=m.createItemDOM(t);e.appendChild(n)}),e};m.createItemDOM=function(e){let t=Ve;t=t.replace(/{{id}}/g,e.id||""),t=t.replace(/{{image}}/g,e.image||"default.png"),t=t.replace(/{{name}}/g,e.name||"Produit"),t=t.replace(/{{description}}/g,e.description||""),t=t.replace(/{{unitPrice}}/g,(e.price||0).toFixed(2));const n=((e.price||0)*(e.quantity||1)).toFixed(2);t=t.replace(/{{lineTotal}}/g,n);for(let s=1;s<=5;s++){const a=e.quantity===s?" selected":"";t=t.replace(`{{q${s}}}`,a)}return i(t).firstElementChild};m.attachEvents=function(e){e.querySelectorAll("select[data-qty]").forEach(s=>{s.addEventListener("change",P.handleQuantityChange)}),e.querySelectorAll("button[data-remove]").forEach(s=>{s.addEventListener("click",P.handleRemoveItem)})};m.refreshCartContent=function(){E.cart=u.getState();const e=document.querySelector("main");if(!e)return;for(;e.firstChild;)e.removeChild(e.firstChild);const t=m.init();e.appendChild(t)};function Oe(){return P.init()}const Fe=`<section class="px-4 md:px-6 lg:px-8 py-6">
  <header class="mb-6">
    <h1 class="font-display text-3xl md:text-5xl">Finaliser la commande</h1>
  </header>

  <slot id="checkout-summary" class="max-w-md"></slot>
</section>
`,Be=`<article class="bg-white border border-black/20 rounded-lg p-8 shadow-sm md:mr-50 md:my-10">
  <h2 class="font-display text-2xl mb-6">Récapitulatif de la commande</h2>

  <section class="mb-6">
    <p class="flex items-center justify-between py-3 mb-4">
      <span class="text-black/70">{{cart-count}} article(s)</span>
      <span class="font-display text-2xl">{{cart-total}} €</span>
    </p>

    <p class="text-sm text-black/60">
      <span class="inline-block w-2 h-2 bg-success rounded-full mr-2"></span>
      Click & Collect - Retrait en magasin gratuit
    </p>
  </section>

  <button id="validate-order" 
          class="w-full px-6 py-4 font-display text-lg uppercase bg-black text-white rounded-[var(--radius-btn)] hover:bg-black/90 transition-all cursor-pointer mb-4">
    Valider la commande
  </button>

  <a href="/cart" data-link class="block text-center text-sm text-black/60 hover:text-black underline cursor-pointer">
    Retour au panier
  </a>
</article>
</article>
`;let ue={html:function(e){const t=e.reduce((s,a)=>s+a.price*a.quantity,0),n={"cart-count":e.length,"cart-total":t.toFixed(2)};return I(Be,n)},dom:function(e){return i(ue.html(e))}},T={cart:{}},G={};G.handleValidate=async function(){const e=await c.getCurrentUser();if(!e||!e.authenticated){window.location.href="/signin";return}const t={user_id:e.user.id,total:T.cart.total,items:T.cart.items.map(s=>({product_id:s.id,quantity:s.quantity,unit_price:s.price}))};console.log("Envoi commande:",t);const n=await se("orders",JSON.stringify(t));console.log("Réponse complète:",n),console.log("order.id:",n?n.id:"order est null"),console.log("Type de order.id:",typeof(n?n.id:null)),n&&n.id?(localStorage.setItem("lastOrderId",n.id),u.clear(),window.location.href="/order-confirmation"):(console.error("Pas d'ID dans la réponse!",n),alert("Erreur lors de la validation"))};G.init=async function(){if(T.cart=u.getState(),T.cart.isEmpty){window.location.href="/cart";return}return me.init()};let me={};me.init=function(){const e=i(Fe);return e.getElementById("checkout-summary").appendChild(ue.dom(T.cart.items)),e.getElementById("validate-order").addEventListener("click",G.handleValidate),e};function ze(){return G.init()}const pe=`<main class="px-4 md:px-6 lg:px-8 py-6">
  <div class="max-w-2xl mx-auto text-center">
    <div class="mb-8">
      <svg class="w-24 h-24 mx-auto text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
    </div>

    <h1 class="font-display text-3xl md:text-5xl mb-4">Commande confirmée !</h1>
    <p class="text-lg text-black/60 mb-8">Merci pour votre commande.</p>

    <section id="order-detail" class="mb-8"></section>

    <div class="flex gap-4 justify-center">
      <a href="/click-collect-ecom/" data-link 
         class="px-6 py-3 font-display uppercase bg-black text-white rounded-[var(--radius-btn)] hover:bg-black/90 cursor-pointer">
        Retour à l'accueil
      </a>
      <a href="/products" data-link 
         class="px-6 py-3 font-display uppercase border border-black rounded-[var(--radius-btn)] hover:bg-black/5 cursor-pointer">
        Continuer mes achats
      </a>
    </div>
  </div>
</main>
`,Ue=`<article class="border border-black/20 p-6 mb-8 text-left">
  <h2 class="font-display text-xl mb-4">Détails</h2>
  
  <section class="mb-2 text-sm">
    <p class="flex justify-between py-2">
      <span>Numéro</span>
      <span class="font-semibold">{{order-number}}</span>
    </p>
    <p class="flex justify-between py-2">
      <span>Date</span>
      <span class="font-semibold">{{order-date}}</span>
    </p>
    <p class="flex justify-between py-2">
      <span>Statut</span>
      <span class="font-semibold">{{order-status}}</span>
    </p>
    <p class="flex justify-between py-2">
      <span>Total</span>
      <span class="font-semibold">{{order-total}} €</span>
    </p>
  </section>

  <section class="mt-6">
    <h3 class="font-display text-lg mb-3">Articles</h3>
    <section id="order-items">
      <!-- slot -->
    </section>
  </section>
</article>
`;let fe={html:function(e){const t=new Date(e.created_at),n=parseFloat(e.total).toFixed(2);let s="";e.items&&e.items.length>0&&(s=e.items.map(f=>`
                <p class="flex justify-between py-2 border-t border-black/10">
                    <span>${f.product_name||"Produit"} x ${f.quantity}</span>
                    <span class="font-semibold">${parseFloat(f.unit_price).toFixed(2)} €</span>
                </p>
            `).join(""));const a={"order-number":e.id,"order-date":t.toLocaleDateString("fr-FR"),"order-status":e.status,"order-total":n};let r=I(Ue,a);const o=i(r),l=o.querySelector('section[id="order-items"]');return l&&s&&(l.innerHTML=s),o.innerHTML||r},dom:function(e){return i(fe.html(e))}},K={order:null},ge={};ge.init=async function(e){const t=localStorage.getItem("lastOrderId");return!t||(K.order=await A("orders/"+t),localStorage.removeItem("lastOrderId"),!K.order)?M.initError():M.init()};let M={};M.init=function(){const e=i(pe);return e.getElementById("order-detail").appendChild(fe.dom(K.order)),e};M.initError=function(){const e=i(pe),t=e.getElementById("order-detail");return t.innerHTML='<p class="text-error">Commande introuvable</p>',e};function _e(e){return ge.init(e)}const he=`<main class="px-4 md:px-6 lg:px-8 py-6">
  <header class="mb-6">
    <h1 class="font-display text-3xl md:text-5xl">Mes commandes</h1>
  </header>

  <section id="orders-list" class="flex flex-col max-w-4xl mx-auto gap-4 font-body">
    <!-- slot -->
  </section>

  <div id="no-orders" class="hidden text-center py-12">
    <p class="text-lg text-black/60 mb-4">Vous n'avez pas encore de commande.</p>
    <a href="/products" data-link 
       class="inline-block px-6 py-3 font-display uppercase bg-black text-white rounded-[var(--radius-btn)] hover:bg-black/90">
      Découvrir nos produits
    </a>
  </div>
</main>
`,Ne=`<article class="order-card border border-black/20 p-6 cursor-pointer" data-order-id="{{order-id}}">
  <div class="flex justify-between items-start mb-4">
    <div>
      <h2 class="font-display text-xl">Commande #{{order-number}}</h2>
      <p class="text-sm text-black/60">{{order-date}}</p>
    </div>
    <div class="text-right">
      <p class="font-semibold text-lg">{{order-total}} €</p>
      <span class="order-status font-body inline-block mt-2 px-3 py-1 text-sm rounded">{{order-status}}</span>
    </div>
  </div>
</article>
`;let be={html:function(e){const t=new Date(e.created_at),n=parseFloat(e.total).toFixed(2),s={"order-id":e.id,"order-number":e.id,"order-date":t.toLocaleDateString("fr-FR"),"order-total":n,"order-status":e.status};return I(Ne,s)},dom:function(e){const t=i(be.html(e)),n=t.querySelector(".order-card");if(n){let s="";e.status==="En Cours"?s="background-color: var(--clr-purple); color: var(--clr-white);":e.status==="Validé"?s="background-color: var(--clr-green); color: var(--clr-white);":e.status==="Annulé"&&(s="background-color: var(--clr-red); color: var(--clr-white);");const a=n.querySelector(".order-status");a&&s&&a.setAttribute("style",s)}return t}},z={orders:[]},J={};J.init=async function(e){const t=await c.getCurrentUser();if(!t||!t.authenticated){window.location.href="/signin";return}return z.orders=await A("orders?user_id="+t.user.id),!z.orders||z.orders.length===0?U.initEmpty():U.init()};J.handleOrderClick=function(e){const t=e.currentTarget.dataset.orderId;localStorage.setItem("lastOrderId",t),window.location.href="/order-confirmation"};let U={};U.init=function(){const e=i(he),t=e.getElementById("orders-list");return z.orders.forEach(n=>{t.appendChild(be.dom(n))}),t.querySelectorAll(".order-card").forEach(n=>{n.addEventListener("click",J.handleOrderClick)}),e};U.initEmpty=function(){const e=i(he);return e.getElementById("orders-list").classList.add("hidden"),e.getElementById("no-orders").classList.remove("hidden"),e};function He(e){return J.init(e)}const We=`<div class="min-h-screen flex flex-col">
    <slot name="header"></slot>
    <main class="flex-1">
        <slot></slot>
    </main>
    <slot name="footer"></slot>
</div>
    `,te=`<footer class="border-t border-text/10 bg-bg font-body text-text">
  <!-- Footer principal -->
  <section class="mx-auto max-w-[75rem] px-4 py-12 md:py-16">
    <nav class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
      
      <!-- Colonne 1: À propos -->
      <article>
        <h3 class="mb-4 font-display text-lg uppercase tracking-wide">À propos</h3>
        <ul class="space-y-2 text-sm text-description">
          <li><a href="/about" data-link class="hover:text-text transition-colors">Notre histoire</a></li>
          <li><a href="#" class="hover:text-text transition-colors">Nos engagements</a></li>
          <li><a href="#" class="hover:text-text transition-colors">Nos boutiques</a></li>
          <li><a href="#" class="hover:text-text transition-colors">Recrutement</a></li>
        </ul>
      </article>

      <!-- Colonne 2: Service client -->
      <article>
        <h3 class="mb-4 font-display text-lg uppercase tracking-wide">Service client</h3>
        <ul class="space-y-2 text-sm text-description">
          <li><a href="#" class="hover:text-text transition-colors">Click & Collect</a></li>
          <li><a href="#" class="hover:text-text transition-colors">Retours & Échanges</a></li>
          <li><a href="#" class="hover:text-text transition-colors">Livraison</a></li>
          <li><a href="#" class="hover:text-text transition-colors">Nous contacter</a></li>
        </ul>
      </article>

      <!-- Colonne 3: Informations légales -->
      <article>
        <h3 class="mb-4 font-display text-lg uppercase tracking-wide">Informations</h3>
        <ul class="space-y-2 text-sm text-description">
          <li><a href="#" class="hover:text-text transition-colors">Mentions légales</a></li>
          <li><a href="#" class="hover:text-text transition-colors">CGV</a></li>
          <li><a href="#" class="hover:text-text transition-colors">Politique de confidentialité</a></li>
          <li><a href="#" class="hover:text-text transition-colors">Cookies</a></li>
        </ul>
      </article>

      <!-- Colonne 4: Newsletter -->
      <article>
        <h3 class="mb-4 font-display text-lg uppercase tracking-wide">Restez informé</h3>
        <p class="mb-4 text-sm text-description">
          Recevez nos dernières actualités et offres exclusives
        </p>
        <form class="flex gap-2">
          <input 
            type="email" 
            placeholder="Votre email" 
            class="flex-1 border border-text/20 bg-bg px-3 py-2 text-sm outline-none focus:border-text"
          />
          <button type="submit" class="rounded-[var(--radius-btn)] bg-btn-primary-bg px-4 py-2 font-display text-sm uppercase text-btn-primary-fg cursor-pointer">
            OK
          </button>
        </form>
        
        <!-- Réseaux sociaux -->
        <aside class="mt-6">
          <h4 class="mb-3 text-sm font-display uppercase tracking-wide">Suivez-nous</h4>
          <nav class="flex gap-4">
            <a href="#" class="text-description hover:text-text transition-colors" aria-label="Facebook">
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="#" class="text-description hover:text-text transition-colors" aria-label="Instagram">
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="#" class="text-description hover:text-text transition-colors" aria-label="Twitter">
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
          </nav>
        </aside>
      </article>
    </nav>
  </section>

  <!-- Footer bottom -->
  <aside class="border-t border-text/10 bg-description/5 py-4">
    <section class="mx-auto max-w-[75rem] px-4">
      <address class="flex flex-col items-center justify-between gap-4 text-sm text-description not-italic md:flex-row">
        <p>&copy; Wahel Gader - 2025 . Tous droits réservés.</p>
        <nav class="flex gap-4" aria-label="Moyens de paiement">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/200px-Visa_Inc._logo.svg.png" alt="Visa" class="h-6 opacity-60" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/200px-MasterCard_Logo.svg.png" alt="Mastercard" class="h-6 opacity-60" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/200px-American_Express_logo_%282018%29.svg.png" alt="American Express" class="h-6 opacity-60" />
        </nav>
      </address>
    </section>
  </aside>
</footer>
`;let Ze={html:function(){return te},dom:function(){return i(te)}};function Qe(){let e=i(We),t=j.dom(),n=Ze.dom();return e.querySelector('slot[name="header"]').replaceWith(t),e.querySelector('slot[name="footer"]').replaceWith(n),e}const Ge=` <section>
    <h1>404 - Page non trouvée</h1>
        <p>Cette page n'existe pas</p>
    <nav>
        <a href="/click-collect-ecom/" data-link>Retour à l'accueil</a>
    </nav>
</section>`;function Je(){return Ge}const Ke=`<main class="mx-auto w-full max-w-[22.5rem] px-3 pt-3 pb-10 md:max-w-[26.25rem] md:px-4 font-body text-text">
  <h1 class="font-display text-4xl md:text-5xl">Inscription</h1>

  <nav class="mt-2">
    <a href="/signin" data-link class="inline-flex items-center gap-2 underline text-sm md:text-base">
      Vous avez déjà un compte ?
      <img src="/click-collect-ecom/assets/images/icons/chevron-right.svg" alt="Flèche vers la droite" class="h-4 w-4" />
    </a>
  </nav>

  <form action="#" method="post" class="mt-6">
    <!-- Message d'erreur -->
    <p id="error-message" class="hidden mb-4 pt-3 text-error text-sm">
    </p>
    
    <fieldset class="flex items-center gap-5 text-base border-0 p-0 m-0">
      <legend class="hidden">Civilité</legend>
      <label class="inline-flex items-center gap-2">
        <input type="radio" name="civ" value="madame" class="h-4 w-4 border-text/30 text-text focus:ring-0" />
        Madame
      </label>
      <label class="inline-flex items-center gap-2">
        <input type="radio" name="civ" value="monsieur" checked class="h-4 w-4 border-text/30 text-text focus:ring-0" />
        Monsieur
      </label>
    </fieldset>

    <section class="mt-5">
      <label for="sn-lastname" class="block text-sm text-description mb-2">Nom</label>
      <input id="sn-lastname" name="lastname" type="text" autocomplete="family-name"
        required
        minlength="2"
        maxlength="50"
        pattern="[A-Za-zÀ-ÿ\\s\\-']+"
        title="Le nom doit contenir uniquement des lettres"
        class="w-full box-border border border-text/20 px-3 py-[0.625rem]
               h-11 text-base font-body
               rounded-none outline-none appearance-none
               placeholder:text-description focus:border-text" />
    </section>

    <section class="mt-4">
      <label for="sn-firstname" class="block text-sm text-description mb-2">Prénom</label>
      <input id="sn-firstname" name="firstname" type="text" autocomplete="given-name"
        required
        minlength="2"
        maxlength="50"
        pattern="[A-Za-zÀ-ÿ\\s\\-']+"
        title="Le prénom doit contenir uniquement des lettres"
        class="w-full box-border border border-text/20 px-3 py-[0.625rem]
               h-11 text-base font-body
               rounded-none outline-none appearance-none
               placeholder:text-description focus:border-text" />
    </section>

    <section class="mt-4">
      <label for="sn-email" class="block text-sm text-description mb-2">Email</label>
      <input id="sn-email" name="email" type="email" inputmode="email" autocomplete="email"
        required
        pattern="[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}"
        title="Veuillez entrer une adresse email valide"
        class="w-full box-border border border-text/20 px-3 py-[0.625rem]
               h-11 text-base font-body
               rounded-none outline-none appearance-none
               placeholder:text-description focus:border-text" />
    </section>

    <section class="mt-4">
      <label for="sn-pass" class="block text-sm text-description mb-2">Mot de passe</label>
      <span class="relative block">
        <input id="sn-pass" name="password" type="password" autocomplete="new-password"
          required
          minlength="12"
          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*(),.?&quot;:{}|&lt;&gt;]).{12,}$"
          title="Le mot de passe doit contenir au moins 12 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial"
          class="w-full box-border border border-text/20 px-3 py-[0.625rem] pr-12
                 h-11 text-base font-body
                 rounded-none outline-none appearance-none
                 placeholder:text-description focus:border-text" />
        <button type="button" id="toggle-password" aria-label="Afficher/masquer le mot de passe" class="absolute right-3 top-1/2 -translate-y-1/2 text-description hover:text-text">
          <img id="eye-closed" src="/click-collect-ecom/assets/images/icons/eye-closed.svg" alt="Mot de passe masqué" class="eye-icon" />
          <img id="eye-open" src="/click-collect-ecom/assets/images/icons/eye-open.svg" alt="Mot de passe visible" class="eye-icon hidden" />
        </button>
      </span>
    </section>

    <ul class="mt-3 grid grid-cols-1 gap-2 text-xs md:grid-cols-2">
      <li id="rule-length" class="inline-flex items-center gap-2 password-rule-invalid">
        <img src="/click-collect-ecom/assets/images/icons/check-circle.svg" alt="Règle validée" class="h-4 w-4 flex-shrink-0" />
        12&nbsp;caractères minimum
      </li>
      <li id="rule-uppercase" class="inline-flex items-center gap-2 password-rule-invalid">
        <img src="/click-collect-ecom/assets/images/icons/check-circle.svg" alt="Règle validée" class="h-4 w-4 flex-shrink-0" />
        Un caractère en majuscule
      </li>
      <li id="rule-lowercase" class="inline-flex items-center gap-2 password-rule-invalid">
        <img src="/click-collect-ecom/assets/images/icons/check-circle.svg" alt="Règle validée" class="h-4 w-4 flex-shrink-0" />
        Un caractère en minuscule
      </li>
      <li id="rule-special" class="inline-flex items-center gap-2 password-rule-invalid">
        <img src="/click-collect-ecom/assets/images/icons/check-circle.svg" alt="Règle validée" class="h-4 w-4 flex-shrink-0" />
        Un caractère spécial
      </li>
      <li id="rule-number" class="inline-flex items-center gap-2 md:col-span-2 password-rule-invalid">
        <img src="/click-collect-ecom/assets/images/icons/check-circle.svg" alt="Règle validée" class="h-4 w-4 flex-shrink-0" />
        Un chiffre
      </li>
    </ul>

    <p class="mt-5">
      <button type="submit"
        class="w-full rounded-[var(--radius-btn)] bg-btn-primary-bg px-5 py-3 text-center font-display uppercase text-btn-primary-fg text-base cursor-pointer md:text-lg">
        Continuer
      </button>
    </p>
  </form>
</main>
`,Xe={dom(){return i(Ke)}},Ye=`<div class="px-4 md:px-6 lg:px-8 py-4">
   <a href="/products" data-link class="inline-flex items-center gap-2 text-sm">
     <img src="/click-collect-ecom/assets/images/icons/chevron-right.svg" alt="Retour" class="h-4 w-4 rotate-180" />
     <span class="hidden md:inline">Retour</span>
   </a>
 
   <slot name="form"></slot>
 </div>
 `;let L={};L.handleFormSubmit=async function(e){e.preventDefault(),e.stopPropagation();const t=e.target,n=t.querySelector("#error-message");n.classList.add("hidden"),n.textContent="";const s=t.password.value;if(s.length<12){n.textContent="Le mot de passe doit contenir au moins 12 caractères",n.classList.remove("hidden");return}if(!/[A-Z]/.test(s)){n.textContent="Le mot de passe doit contenir au moins une majuscule",n.classList.remove("hidden");return}if(!/[a-z]/.test(s)){n.textContent="Le mot de passe doit contenir au moins une minuscule",n.classList.remove("hidden");return}if(!/[0-9]/.test(s)){n.textContent="Le mot de passe doit contenir au moins un chiffre",n.classList.remove("hidden");return}if(!/[!@#$%^&*(),.?":{}|<>]/.test(s)){n.textContent="Le mot de passe doit contenir au moins un caractère spécial",n.classList.remove("hidden");return}let a=new FormData(t);const r={firstname:a.get("firstname"),lastname:a.get("lastname"),civ:a.get("civ"),email:a.get("email"),password:a.get("password")},o=await c.signup(r);o&&o.id?window.location.href="/signin":o&&o.error?(n.textContent=o.error,n.classList.remove("hidden")):(n.textContent="Erreur lors de la création du compte",n.classList.remove("hidden"))};L.handlePasswordInput=function(e){const t=e.target.value,n=e.target.closest("form"),s=n.querySelector("#rule-length"),a=n.querySelector("#rule-uppercase"),r=n.querySelector("#rule-lowercase"),o=n.querySelector("#rule-number"),l=n.querySelector("#rule-special");t.length>=12?(s.classList.add("password-rule-valid"),s.classList.remove("password-rule-invalid")):(s.classList.remove("password-rule-valid"),s.classList.add("password-rule-invalid")),/[A-Z]/.test(t)?(a.classList.add("password-rule-valid"),a.classList.remove("password-rule-invalid")):(a.classList.remove("password-rule-valid"),a.classList.add("password-rule-invalid")),/[a-z]/.test(t)?(r.classList.add("password-rule-valid"),r.classList.remove("password-rule-invalid")):(r.classList.remove("password-rule-valid"),r.classList.add("password-rule-invalid")),/[0-9]/.test(t)?(o.classList.add("password-rule-valid"),o.classList.remove("password-rule-invalid")):(o.classList.remove("password-rule-valid"),o.classList.add("password-rule-invalid")),/[!@#$%^&*(),.?":{}|<>]/.test(t)?(l.classList.add("password-rule-valid"),l.classList.remove("password-rule-invalid")):(l.classList.remove("password-rule-valid"),l.classList.add("password-rule-invalid"))};L.togglePassword=function(e){const t=e.currentTarget,n=t.closest(".relative").querySelector("input"),s=t.querySelector("#eye-closed"),a=t.querySelector("#eye-open");n.type==="password"?(n.type="text",s.classList.add("hidden"),a.classList.remove("hidden")):(n.type="password",s.classList.remove("hidden"),a.classList.add("hidden"))};let _={};_.attachEvents=function(e){const t=e.querySelector("form"),n=e.querySelector("#sn-pass"),s=e.querySelector("#toggle-password");t&&t.addEventListener("submit",L.handleFormSubmit),n&&n.addEventListener("input",L.handlePasswordInput),s&&s.addEventListener("click",L.togglePassword)};_.init=function(){const e=i(Ye),t=Xe.dom();return e.querySelector('slot[name="form"]').replaceWith(t),_.attachEvents(e),e};function et(){return _.init()}const tt=`<main class="mx-auto w-full max-w-[22.5rem] px-3 pt-3 pb-10 md:max-w-[26.25rem] md:px-4 font-body text-text">
  <h1 class="font-display text-4xl md:text-5xl">Connexion</h1>

  <nav class="mt-2">
    <a href="/signup" data-link class="inline-flex items-center gap-2 underline text-sm md:text-base">
      Vous n’avez pas de compte ?
      <img src="/click-collect-ecom/assets/images/icons/chevron-right.svg" alt="" class="h-4 w-4" />
    </a>
  </nav>

  <form action="#" method="post" class="mt-6">
    <!-- Message d'erreur -->
    <p id="error-message" class="hidden mb-4 pt-3  text-error text-sm">
    </p>

    <fieldset class="mb-2 border-0 p-0">
      <label for="login-email" class="block text-sm text-description mb-2">Email</label>
      <input id="login-email" name="email" type="email" inputmode="email" autocomplete="email" required
        pattern="[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}" title="Veuillez entrer une adresse email valide"
        class="w-full box-border border border-text/20 px-3 py-[0.625rem]
               h-11 text-base font-body
               rounded-none outline-none appearance-none
               placeholder:text-description focus:border-text" />
    </fieldset>

    <fieldset class="mt-4 border-0 p-0">
      <label for="login-pass" class="block text-sm text-description mb-2">Mot de passe</label>
      <span class="relative block">
        <input id="login-pass" name="password" type="password" autocomplete="current-password" required minlength="12"
          title="Le mot de passe doit contenir au moins 12 caractères" class="w-full box-border border border-text/20 px-3 py-[0.625rem] pr-12
                 h-11 text-base font-body
                 rounded-none outline-none appearance-none
                 placeholder:text-description focus:border-text" />
        <button type="button" id="toggle-password" aria-label="Afficher/masquer le mot de passe"
          class="absolute right-3 top-1/2 -translate-y-1/2 text-description hover:text-text">
          <img id="eye-closed" src="/click-collect-ecom/assets/images/icons/eye-closed.svg" alt="Masquer le mot de passe" class="eye-icon" />
          <img id="eye-open" src="/click-collect-ecom/assets/images/icons/eye-open.svg" alt="Afficher le mot de passe" class="eye-icon hidden" />
        </button>
      </span>
    </fieldset>

    <nav class="mt-3">
      <a href="/forgot-password" data-link class="underline text-sm">Mot de passe oublié ?</a>
    </nav>

    <p class="mt-5">
      <button type="submit"
        class="w-full rounded-[var(--radius-btn)] bg-btn-primary-bg px-5 py-3 text-center font-display uppercase text-btn-primary-fg text-base cursor-pointer md:text-lg">
        Continuer
      </button>
    </p>
  </form>
</main>`,nt={dom(){return i(tt)}},st=`<main class="px-4 py-4 md:px-6 lg:px-8">
  <nav class="inline-flex items-center gap-2 text-sm">
    <a href="/click-collect-ecom/" data-link class="inline-flex items-center gap-2">
      <img src="/click-collect-ecom/assets/images/icons/chevron-right.svg" alt="Retour" class="h-4 w-4 rotate-180" />
      <span class="hidden md:inline">Retour</span>
    </a>
  </nav>

  <slot name="form"></slot>
</main>
`;let N={};N.handleFormSubmit=async function(e){e.preventDefault(),e.stopPropagation();const t=e.target,n=t.querySelector("#error-message");if(!n)return;n.classList.add("hidden"),n.textContent="";let s=new FormData(t);const a={email:s.get("email"),password:s.get("password")},r=await c.login(a);r&&r.success?window.location.href="/":r&&r.error?(n.textContent=r.error,n.classList.remove("hidden")):(n.textContent="Erreur de connexion",n.classList.remove("hidden"))};N.togglePassword=function(e){const t=e.currentTarget,n=t.closest(".relative").querySelector("input"),s=t.querySelector("#eye-closed"),a=t.querySelector("#eye-open");n.type==="password"?(n.type="text",s.classList.add("hidden"),a.classList.remove("hidden")):(n.type="password",s.classList.remove("hidden"),a.classList.add("hidden"))};let H={};H.attachEvents=function(e){const t=e.querySelector("form"),n=e.querySelector("#toggle-password");t&&t.addEventListener("submit",N.handleFormSubmit),n&&n.addEventListener("click",N.togglePassword)};H.init=function(){const e=i(st),t=nt.dom();return e.querySelector('slot[name="form"]').replaceWith(t),H.attachEvents(e),e};function at(){return H.init()}const rt=`<main class="px-4 py-4 md:px-6 lg:px-8">
  <nav class="inline-flex items-center gap-2 text-sm mb-6">
    <a href="/my-account/dashboard" data-link class="inline-flex items-center gap-2">
      <img src="/click-collect-ecom/assets/images/icons/chevron-right.svg" alt="Retour" class="h-4 w-4 rotate-180" />
      <span class="hidden md:inline">Retour</span>
    </a>
  </nav>

  <slot name="form"></slot>
</main>
`,ot=`<section class="mx-auto w-full max-w-[72rem] font-body text-text">
    <header class="mb-6">
        <h1 class="font-display text-3xl md:text-5xl">Vos informations personnelles</h1>
        <p class="text-description text-sm mt-2">Les champs marqués d’un astérisque (*) sont obligatoires</p>
    </header>

    <section class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">

        <!-- FORM INFOS (gauche) -->
        <form id="form-profile-info" action="#" method="post" class="border border-black/20 p-4 md:p-6 h-full">
            <h2 class="font-display text-xl mb-4">Informations de base</h2>

            <!-- Civilité -->
            <section class="mb-6">
                <p class="block text-sm text-description mb-2">Civilité *</p>
                <ul class="flex items-center gap-5">
                    <li>
                        <label class="inline-flex items-center gap-2">
                            <input type="radio" name="civ" value="madame"
                                class="h-4 w-4 border-text/30 text-text focus:ring-0">
                            <span>Madame</span>
                        </label>
                    </li>
                    <li>
                        <label class="inline-flex items-center gap-2">
                            <input type="radio" name="civ" value="monsieur" checked
                                class="h-4 w-4 border-text/30 text-text focus:ring-0">
                            <span>Monsieur</span>
                        </label>
                    </li>
                </ul>
            </section>

            <!-- Nom -->
            <label for="lastname" class="block text-sm text-description mb-2">Nom *</label>
            <input id="lastname" name="lastname" type="text" autocomplete="family-name" required
                class="w-full mb-4 box-border border border-text/20 px-3 py-[0.625rem] h-11 text-base rounded-none outline-none focus:border-text">

            <!-- Prénom -->
            <label for="firstname" class="block text-sm text-description mb-2">Prénom *</label>
            <input id="firstname" name="firstname" type="text" autocomplete="given-name" required
                class="w-full mb-4 box-border border border-text/20 px-3 py-[0.625rem] h-11 text-base rounded-none outline-none focus:border-text">

            <!-- Email -->
            <label for="email" class="block text-sm text-description mb-2">Email *</label>
            <input id="email" name="email" type="email" inputmode="email" autocomplete="email" required
                class="w-full mb-6 box-border border border-text/20 px-3 py-[0.625rem] h-11 text-base rounded-none outline-none focus:border-text">

            <!-- Button infos -->
            <section class="flex items-center gap-3 pt-2">
                <button type="submit"
                    class="px-6 py-2 md:px-10 md:py-3 font-display uppercase bg-black text-white rounded-[var(--radius-btn)] cursor-pointer">
                    Modifier
                </button>
                <a href="/my-account/dashboard" data-link
                    class="px-6 py-2 md:px-10 md:py-3 font-display uppercase border border-black text-black rounded-[var(--radius-btn)] cursor-pointer">
                    Annuler
                </a>
            </section>
        </form>

        <!-- FORM MDP (droite) -->
        <form id="form-profile-password" action="#" method="post" class="border border-black/20 p-4 md:p-6 h-full">
            <h2 class="font-display text-xl mb-4">Sécurité</h2>

            <!-- Mot de passe actuel -->
            <label for="current_password" class="block text-sm text-description mb-2">Mot de passe actuel *</label>
            <section class="relative mb-6">
                <input id="current_password" name="current_password" type="password" autocomplete="current-password"
                    required minlength="12"
                    class="w-full box-border border border-text/20 px-3 py-[0.625rem] pr-12 h-11 text-base rounded-none outline-none focus:border-text">
                <button id="toggle-current-password" type="button"
                    class="absolute right-3 top-1/2 -translate-y-1/2 text-description hover:text-text cursor-pointer"
                    aria-label="Afficher/masquer le mot de passe actuel">
                    <img src="/click-collect-ecom/assets/images/icons/eye-closed.svg" alt="Afficher le mot de passe" class="eye-icon">
                    <img src="/click-collect-ecom/assets/images/icons/eye-open.svg" alt="Masquer le mot de passe" class="eye-icon hidden">
                </button>
            </section>

            <!-- Nouveau mot de passe -->
            <label for="new-password" class="block text-sm text-description mb-2">Nouveau mot de passe *</label>
            <section class="relative">
                <input id="new-password" name="new_password" type="password" autocomplete="new-password" required
                    minlength="12"
                    class="w-full box-border border border-text/20 px-3 py-[0.625rem] pr-12 h-11 text-base rounded-none outline-none focus:border-text">
                <button id="toggle-new-password" type="button"
                    class="absolute right-3 top-1/2 -translate-y-1/2 text-description hover:text-text cursor-pointer"
                    aria-label="Afficher/masquer le nouveau mot de passe">
                    <img src="/click-collect-ecom/assets/images/icons/eye-closed.svg" alt="Afficher le mot de passe" class="eye-icon">
                    <img src="/click-collect-ecom/assets/images/icons/eye-open.svg" alt="Masquer le mot de passe" class="eye-icon hidden">
                </button>
            </section>

            <ul class="mt-3 grid grid-cols-1 gap-2 text-xs md:grid-cols-2">
                <li id="rule-length" class="inline-flex items-center gap-2 password-rule-invalid">
                    <img src="/click-collect-ecom/assets/images/icons/check-circle.svg" alt="" class="h-4 w-4 flex-shrink-0" />
                    12&nbsp;caractères minimum
                </li>
                <li id="rule-uppercase" class="inline-flex items-center gap-2 password-rule-invalid">
                    <img src="/click-collect-ecom/assets/images/icons/check-circle.svg" alt="" class="h-4 w-4 flex-shrink-0" />
                    Un caractère en majuscule
                </li>
                <li id="rule-lowercase" class="inline-flex items-center gap-2 password-rule-invalid">
                    <img src="/click-collect-ecom/assets/images/icons/check-circle.svg" alt="" class="h-4 w-4 flex-shrink-0" />
                    Un caractère en minuscule
                </li>
                <li id="rule-special" class="inline-flex items-center gap-2 password-rule-invalid">
                    <img src="/click-collect-ecom/assets/images/icons/check-circle.svg" alt="" class="h-4 w-4 flex-shrink-0" />
                    Un caractère spécial
                </li>
                <li id="rule-number" class="inline-flex items-center gap-2 md:col-span-2 password-rule-invalid">
                    <img src="/click-collect-ecom/assets/images/icons/check-circle.svg" alt="" class="h-4 w-4 flex-shrink-0" />
                    Un chiffre
                </li>
            </ul>

            <!-- Bouton dédié au MDP -->
            <section class="mt-6">
                <button type="submit"
                    class="px-6 py-2 md:px-10 md:py-3 font-display uppercase bg-black text-white rounded-[var(--radius-btn)] cursor-pointer">
                    Modifier le mot de passe
                </button>
            </section>
        </form>
    </section>

    <!-- SUPPRESSION COMPTE -->
    <article class="mt-6 border border-black/20 bg-white">
        <header class="px-4 pt-4">
            <h3 class="text-sm text-description">Suppression de votre compte</h3>
        </header>
        <section class="px-4 py-6 md:px-6">
            <p class="text-[var(--color-warning)] text-sm md:text-base">
                Vous perdrez vos données personnelles ainsi que votre compte fidélité et les avantages associés
            </p>
            <footer class="mt-5">
                <button id="delete-account" type="button"
                    class="px-6 py-2 md:px-10 md:py-3 font-display uppercase bg-white text-black border border-black rounded-[var(--radius-btn)] cursor-pointer">
                    Supprimer votre compte
                </button>
            </footer>
        </section>
    </article>
</section>`,it={dom(){return i(ot)}},g={};g.handleInfoFormSubmit=async function(e){e.preventDefault(),e.stopPropagation();const t=e.target,n=new FormData(t),s={civ:n.get("civ"),lastname:n.get("lastname"),firstname:n.get("firstname"),email:n.get("email")};let a;try{a=await c.updateProfile(s)}catch(r){console.error("Erreur:",r),alert("Erreur réseau");return}if(a&&a.success)alert("Profil mis à jour avec succès !");else{const r=a&&a.error?a.error:"Impossible de mettre à jour le profil";alert(r)}};g.handlePasswordFormSubmit=async function(e){e.preventDefault(),e.stopPropagation();const t=e.target,n=new FormData(t),s=n.get("current_password"),a=n.get("new_password");let r;try{r=await c.changePassword(s,a)}catch(o){console.error("Erreur:",o),alert("Erreur réseau");return}if(r&&r.success)alert("Mot de passe changé avec succès !"),t.reset(),t.querySelectorAll('[id^="rule-"]').forEach(l=>{l.classList.remove("password-rule-valid"),l.classList.add("password-rule-invalid")});else{const o=r&&r.error?r.error:"Impossible de changer le mot de passe";alert(o)}};g.handleDeleteAccount=async function(e){if(e.preventDefault(),!confirm("Êtes-vous sûr de vouloir supprimer définitivement votre compte ?"))return;let n;try{n=await c.deleteAccount()}catch(s){console.error("Erreur:",s),alert("Erreur réseau lors de la suppression du compte");return}n?(alert("Votre compte a été supprimé avec succès"),window.location.href="/"):alert("Erreur lors de la suppression du compte")};g.togglePassword=function(e){const t=e.currentTarget,n=t.closest(".relative"),s=n?n.querySelector("input[type='password'], input[type='text']"):null,a=t.querySelector(".eye-icon:not(.hidden)"),r=t.querySelector(".eye-icon.hidden");s&&(s.type==="password"?(s.type="text",a&&a.classList.add("hidden"),r&&r.classList.remove("hidden")):(s.type="password",r&&r.classList.add("hidden"),a&&a.classList.remove("hidden")))};g.handlePasswordInput=function(e){const t=e.target.value,n=e.target.closest("form"),s=n.querySelector("#rule-length"),a=n.querySelector("#rule-uppercase"),r=n.querySelector("#rule-lowercase"),o=n.querySelector("#rule-number"),l=n.querySelector("#rule-special");t.length>=12?(s.classList.add("password-rule-valid"),s.classList.remove("password-rule-invalid")):(s.classList.remove("password-rule-valid"),s.classList.add("password-rule-invalid")),/[A-Z]/.test(t)?(a.classList.add("password-rule-valid"),a.classList.remove("password-rule-invalid")):(a.classList.remove("password-rule-valid"),a.classList.add("password-rule-invalid")),/[a-z]/.test(t)?(r.classList.add("password-rule-valid"),r.classList.remove("password-rule-invalid")):(r.classList.remove("password-rule-valid"),r.classList.add("password-rule-invalid")),/[0-9]/.test(t)?(o.classList.add("password-rule-valid"),o.classList.remove("password-rule-invalid")):(o.classList.remove("password-rule-valid"),o.classList.add("password-rule-invalid")),/[!@#$%^&*(),.?":{}|<>]/.test(t)?(l.classList.add("password-rule-valid"),l.classList.remove("password-rule-invalid")):(l.classList.remove("password-rule-valid"),l.classList.add("password-rule-invalid"))};const q={};q.loadUserData=async function(e){try{const t=await c.getCurrentUser();if(!t||!t.authenticated||!t.user){console.error("Utilisateur non connecté"),window.location.href="/signin";return}const n=t.user,s=e.querySelector(`input[name="civ"][value="${n.civ}"]`);s&&(s.checked=!0);const a=e.querySelector("#lastname");a&&(a.value=n.lastname||"");const r=e.querySelector("#firstname");r&&(r.value=n.firstname||"");const o=e.querySelector("#email");o&&(o.value=n.email||"")}catch(t){console.error("Erreur lors du chargement des données:",t)}};q.attachEvents=function(e){const t=e.querySelector("#form-profile-info");t&&t.addEventListener("submit",g.handleInfoFormSubmit);const n=e.querySelector("#form-profile-password");n&&n.addEventListener("submit",g.handlePasswordFormSubmit);const s=e.querySelector("#toggle-current-password");s&&s.addEventListener("click",g.togglePassword);const a=e.querySelector("#toggle-new-password");a&&a.addEventListener("click",g.togglePassword);const r=e.querySelector("#new-password");r&&r.addEventListener("input",g.handlePasswordInput);const o=e.querySelector("#delete-account");o&&o.addEventListener("click",g.handleDeleteAccount)};q.init=async function(){const e=i(rt),t=e.querySelector('slot[name="form"]');return t&&t.replaceWith(it.dom()),await q.loadUserData(e),q.attachEvents(e),e};async function lt(){return await q.init()}const d=new xe("app",{loginPath:"/signin",basePath:"/click-collect-ecom/"});window.router=d;const ne=await c.getCurrentUser();ne&&ne.authenticated?d.setAuth(!0):d.setAuth(!1);d.addLayout("/",Qe);d.addRoute("/",Ce);d.addRoute("/about",ve);d.addRoute("/products",le);d.addRoute("/category/:id",le);d.addRoute("/products/:id/:slug",Ae);d.addRoute("/cart",Oe);d.addRoute("/checkout",ze,{requireAuth:!0});d.addRoute("/order-confirmation",_e,{requireAuth:!0});d.addRoute("/signin",at,{useLayout:!1});d.addRoute("/signup",et,{useLayout:!1});d.addRoute("/my-account/dashboard",Me,{requireAuth:!0});d.addRoute("/my-account/orders",He,{requireAuth:!0});d.addRoute("/my-account/profile",lt,{requireAuth:!0});d.addRoute("*",Je);d.start();
