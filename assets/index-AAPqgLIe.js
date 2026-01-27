(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function s(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(a){if(a.ep)return;a.ep=!0;const r=s(a);fetch(a.href,r)}})();class ye{constructor(t,s={}){let n=document.getElementById(t);n||(n=document.createElement("div"),console.warn(`Element with id "${t}" not found. Creating a new div as root.`),document.body.appendChild(n)),this.root=n,this.routes=[],this.layouts={},this.currentRoute=null,this.isAuthenticated=!1,this.loginPath=s.loginPath||"/login",this.basePath=s.basePath||"/",this.basePath!=="/"&&!this.basePath.endsWith("/")&&(this.basePath+="/"),window.addEventListener("popstate",()=>this.handleRoute()),document.addEventListener("click",a=>{const r=a.target.closest("[data-link]");if(r){a.preventDefault();const o=r.getAttribute("href");this.navigate(o)}})}setAuth(t){this.isAuthenticated=t}addLayout(t,s){return this.layouts[t]=s,this}findLayout(t){let s=null,n=0;for(const[a,r]of Object.entries(this.layouts))t.startsWith(a)&&a.length>n&&(s=r,n=a.length);return s}addRoute(t,s,n={}){const a=this.pathToRegex(t),r=this.extractParams(t);return this.routes.push({path:t,regex:a,keys:r,handler:s,requireAuth:n.requireAuth||!1,useLayout:n.useLayout!==!1}),this}pathToRegex(t){if(t==="*")return/.*/;const s=t.replace(/\//g,"\\/").replace(/:(\w+)/g,"([^\\/]+)").replace(/\*/g,".*");return new RegExp("^"+s+"$")}extractParams(t){const s=[],n=t.matchAll(/:(\w+)/g);for(const a of n)s.push(a[1]);return s}getParams(t,s){const n=s.match(t.regex);if(!n)return{};const a={};return t.keys.forEach((r,o)=>{a[r]=n[o+1]}),a}navigate(t){let s=t;if(this.basePath!=="/"&&!s.startsWith(this.basePath)){const n=t.startsWith("/")?t.substring(1):t;s=this.basePath+n}window.history.pushState(null,null,s),this.handleRoute()}handleRoute(){let t=window.location.pathname;this.basePath!=="/"&&t.startsWith(this.basePath)?t=t.substring(this.basePath.length-1):this.basePath!=="/"&&t+"/"===this.basePath&&(t="/");for(const n of this.routes)if(n.regex.test(t)){if(n.requireAuth&&!this.isAuthenticated){sessionStorage.setItem("redirectAfterLogin",t),this.navigate(this.loginPath);return}this.currentRoute=t;const a=this.getParams(n,t),r=n.handler(a);r instanceof Promise?r.then(o=>{this.renderContent(o,n,t)}):this.renderContent(r,n,t);return}const s=this.routes.find(n=>n.path==="*");if(s){const n=s.handler({});this.root.innerHTML=n}}renderContent(t,s,n){const a=t instanceof DocumentFragment;if(s.useLayout){const r=this.findLayout(n);if(r){const o=r(),l=o.querySelector("slot");if(l)if(a)l.replaceWith(t);else{const f=document.createElement("template");f.innerHTML=t,l.replaceWith(f.content)}else console.warn("Layout does not contain a <slot> element. Content will not be inserted.");this.root.innerHTML="",this.root.appendChild(o)}else a?(this.root.innerHTML="",this.root.appendChild(t)):this.root.innerHTML=t}else a?(this.root.innerHTML="",this.root.appendChild(t)):this.root.innerHTML=t;this.attachEventListeners(n)}attachEventListeners(t){const s=document.getElementById("loginBtn");s&&s.addEventListener("click",()=>{this.login()});const n=document.getElementById("logoutBtn");n&&n.addEventListener("click",()=>{this.logout()})}login(){this.setAuth(!0);const t=sessionStorage.getItem("redirectAfterLogin");sessionStorage.removeItem("redirectAfterLogin"),this.navigate(t||"/dashboard")}logout(){this.setAuth(!1),this.navigate(this.loginPath)}start(){this.handleRoute()}}const ve=`<div class="mx-auto max-w-4xl p-6">
  <h1 class="mb-6 text-4xl font-bold text-gray-900">À propos</h1>
  <p class="mb-6 text-lg text-gray-700">
    Base de code pour la SAE 3.01. Octobre 2025</p>
<p class="mb-6 text-lg text-gray-700">
    Se référer à la documentation pour comprendre comment l'utiliser
    </p>
   
</div>`;function we(){return ve}let P=function(e,t){let s=e;for(let n in t)s=s.replaceAll("{{"+n+"}}",t[n]);return s};function i(e){const t=document.createElement("template");return t.innerHTML=e.trim(),t.content}const ke=`<main class="font-body text-text">
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

`;let T="https://www.w-gader.mmi-limoges.fr/api-ecom/",I=async function(e){let t={method:"GET",credentials:"include"};try{var s=await fetch(T+e,t)}catch(a){return console.error("Echec de la requête : "+a),!1}return s.status!=200?(console.error("Erreur de requête : "+s.status),!1):await s.json()},ae=async function(e,t){let s={credentials:"include",method:"POST",header:{"Content-Type":"multipart/form-data"},body:t};try{var n=await fetch(T+e,s)}catch(r){return console.error("Echec de la requête : "+r),!1}let a=await n.json();return n.status!=200&&console.error("Erreur de requête : "+n.status,a),a},Se=async function(e,t){let s={method:"POST",header:{"Content-Type":"application/json"},body:t};try{var n=await fetch(T+e,s)}catch(r){return console.error("Echec de la requête : "+r),!1}let a=await n.json();return n.status!=200&&console.error("Erreur de requête : "+n.status,a),a},re=async function(e){let t={method:"DELETE",credentials:"include"};try{var s=await fetch(T+e,t)}catch(a){return console.error("Echec de la requête : "+a),!1}return s.status!=200?(console.error("Erreur de requête : "+s.status),!1):await s.json()},oe=async function(e,t){let s={method:"PATCH",credentials:"include",header:{"Content-Type":"application/json"},body:JSON.stringify(t)};try{var n=await fetch(T+e,s)}catch(r){return console.error("Echec de la requête : "+r),!1}let a=await n.json();return n.status!=200&&console.error("Erreur de requête : "+n.status,a),a},c={};c.login=async function(e){try{const t=await ae("auth",JSON.stringify(e));if(t&&t.success)return sessionStorage.setItem("auth_user",JSON.stringify(t.user)),t;if(t)return t;throw new Error("No response")}catch{return console.warn("API Login failed (likely CORS), using MOCK fallback."),sessionStorage.setItem("mock_auth","true"),{success:!0,user:{id:1,email:"mock@user.com",firstname:"Mock",lastname:"User"}}}};c.signup=async function(e){try{const t=await Se("users",JSON.stringify(e));if(t)return t;throw new Error("No response")}catch{return console.warn("API Signup failed, using MOCK fallback."),sessionStorage.setItem("mock_auth","true"),{id:1,email:e.email}}};c.getCurrentUser=async function(){try{const e=await I("auth");if(e&&e.authenticated)return e;const t=sessionStorage.getItem("auth_user");if(t)return{authenticated:!0,user:JSON.parse(t)};throw new Error("No auth")}catch{const t=sessionStorage.getItem("auth_user");return t?{authenticated:!0,user:JSON.parse(t)}:sessionStorage.getItem("mock_auth")==="true"?{authenticated:!0,user:{id:1,firstname:"Mock",lastname:"User",email:"mock@user.com"}}:{authenticated:!1}}};c.logout=async function(){return sessionStorage.removeItem("mock_auth"),sessionStorage.removeItem("auth_user"),await re("auth")};c.updateProfile=async function(e){try{const t=sessionStorage.getItem("auth_user");let s={...e};if(t)try{const a=JSON.parse(t);a.id&&(s.id=a.id)}catch{}const n=await oe("auth",s);if(console.log("Update profile response:",n),n){if(n.success||n.id&&!n.error&&!n.message){const r=sessionStorage.getItem("auth_user");if(r){const l={...JSON.parse(r),...e};sessionStorage.setItem("auth_user",JSON.stringify(l))}return n}console.warn("API returned error or failure, using local fallback if available. Response:",n);const a=sessionStorage.getItem("auth_user");if(a){const o={...JSON.parse(a),...e};return sessionStorage.setItem("auth_user",JSON.stringify(o)),{success:!0,user:o}}}return n}catch(t){console.warn("API Update failed (CORS?), updating local cache anyway for this session.");const s=sessionStorage.getItem("auth_user");if(s){const a={...JSON.parse(s),...e};return sessionStorage.setItem("auth_user",JSON.stringify(a)),{success:!0,user:a}}throw t}};c.changePassword=async function(e,t){const s=await oe("auth/password",{current_password:e,new_password:t});return console.log("Change password response:",s),s};c.deleteAccount=async function(){const e=await c.getCurrentUser();if(!e||!e.authenticated||!e.user)return{success:!1,error:"Utilisateur non connecté"};const t=e.user.id,s=await re(`users/${t}`);return console.log("Delete account response:",s),s&&await c.logout(),s};const ie={};ie.init=async function(){const e=i(ke);try{const t=await c.getCurrentUser();if(t&&t.authenticated&&t.user){const n=t.user.firstname||"",a=e.querySelector("h1");a&&n&&(a.textContent=`Ravie de vous revoir ${n}`)}}catch(t){console.error("Erreur lors de la récupération de l'utilisateur:",t)}return e};async function Ce(){return await ie.init()}let L={},X=[{id:1,name:"Marteau",description:"Un marteau est un outil utilisé pour enfoncer des clous dans du bois ou d'autres matériaux. Il se compose d'une tête lourde en métal fixée à un manche en bois ou en fibre de verre.",price:9.99},{id:2,name:"Tournevis",description:"Un tournevis est un outil utilisé pour visser ou dévisser des vis. Il se compose d'une tige en métal avec une tête qui s'adapte à la fente de la vis.",price:5.99},{id:3,name:"Clé à molette",description:"Une clé à molette est un outil utilisé pour serrer ou desserrer des écrous et des boulons. Elle se compose d'une mâchoire réglable qui s'adapte à différentes tailles d'écrous.",price:12.99},{id:4,name:"Pince",description:"Une pince est un outil utilisé pour saisir, tenir ou plier des objets. Elle se compose de deux bras articulés qui se rejoignent en un point de pivot.",price:7.99},{id:5,name:"Scie",description:"Une scie est un outil utilisé pour couper des matériaux, généralement en bois. Elle se compose d'une lame dentée fixée à un manche.",price:14.99},{id:6,name:"Perceuse",description:"Une perceuse est un outil utilisé pour percer des trous dans divers matériaux. Elle se compose d'un moteur qui fait tourner une mèche.",price:49.99},{id:7,name:"Ponceuse",description:"Une ponceuse est un outil utilisé pour lisser des surfaces en bois ou en métal. Elle se compose d'un moteur qui fait vibrer ou tourner un abrasif.",price:79.99},{id:8,name:"Mètre",description:"Un mètre est un outil utilisé pour mesurer des distances. Il se compose d'une bande graduée en métal ou en plastique.",price:19.99},{id:9,name:"Niveau à bulle",description:"Un niveau à bulle est un outil utilisé pour vérifier l'horizontalité ou la verticalité d'une surface. Il se compose d'un tube rempli de liquide avec une bulle d'air à l'intérieur.",price:9.99}];L.fetch=async function(e){let t=await I("products/"+e);return t==!1?X.pop():[t]};L.fetchAll=async function(){let e=await I("products");return e==!1?X:e};L.fetchAllByCategory=async function(e){let t=await I(`products?category=${e}`);return t==!1?X:t};let u={},p=[];function Le(){let e=localStorage.getItem("cart");e&&(p=JSON.parse(e))}function W(){localStorage.setItem("cart",JSON.stringify(p))}function qe(){let e=0;for(let t of p)e+=t.price*t.quantity;return{total:e}}u.addItem=function(e){const t=p.find(s=>s.id===e.id);return t?t.quantity<5&&t.quantity++:p.push({id:e.id,name:e.name||"Produit",description:e.description||"",image:e.image||"default.png",price:e.price||0,quantity:1}),W(),!0};u.updateQuantity=function(e,t){let s=p.find(n=>n.id===e);s&&(s.quantity=t,W())};u.removeItem=function(e){p=p.filter(t=>t.id!==e),W()};u.clear=function(){p=[],W()};u.getItems=function(){return p};u.getItemCount=function(){let e=0;for(let t of p)e+=t.quantity;return e};u.isEmpty=function(){return p.length===0};u.getState=function(){let e=qe();return{items:p,itemCount:u.getItemCount(),total:e.total,isEmpty:p.length===0}};Le();const ee=`<header class="bg-white text-black border-b border-black/10 font-body">
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
</header>`;let A={html:function(){return ee},dom:function(){let e=i(ee);const t=e.querySelector("#navBtn"),s=e.querySelector("#drawer"),n=e.querySelector("#backdrop"),a=e.querySelector("#iconOpen"),r=e.querySelector("#iconClose");t&&s&&n&&(t.onclick=()=>{s.classList.toggle("hidden"),a.classList.toggle("hidden"),r.classList.toggle("hidden")},n.onclick=()=>{s.classList.add("hidden"),a.classList.remove("hidden"),r.classList.add("hidden")});const o=window.location.pathname;return e.querySelectorAll("a[data-link]").forEach(f=>f.classList.remove("active")),o==="/products"?e.querySelector('a[href="/products"]').classList.add("active"):o.startsWith("/category/1")?e.querySelector('a[href="/category/1"]').classList.add("active"):o.startsWith("/category/2")?e.querySelector('a[href="/category/2"]').classList.add("active"):o.startsWith("/category/3")&&e.querySelector('a[href="/category/3"]').classList.add("active"),A.updateCartBadge(e),e},updateCartBadge:function(e=document){const t=e.querySelector("#cart-badge");if(!t)return;const s=u.getItemCount();t.textContent=s,s>0?(t.classList.remove("hidden"),t.classList.add("flex")):(t.classList.add("hidden"),t.classList.remove("flex"))}};const Ee=`<article class="relative">
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
</article>`;let le={html:function(e){let t='<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">';for(let s of e)s.image=s.images&&s.images.length>0?s.images[0]:"default.png",s.descriptionShort=s.desription&&s.description.length>30?s.description.substring(0,30)+"...":s.description,t+=P(Ee,s);return t+"</div>"},dom:function(e){return i(le.html(e))}};const Pe=`<div class="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-4">
  <h1 class="font-display text-2xl md:text-3xl text-black mb-2">Nos produits</h1>
  <p id="nbrproduct" class="font-body text-sm text-gray mb-8"></p>
  <slot name="products"></slot>
</div>`;let N={products:[]},J={};J.handler_clickOnProduct=function(e){const t=e.target.closest("[data-buy]");if(t&&t.dataset.buy!==void 0){let s=parseInt(t.dataset.buy);const n=N.products.find(a=>a.id===s);if(n&&u.addItem({id:n.id,name:n.name,description:n.description||n.descriptionShort,image:n.image,price:n.price})){A.updateCartBadge(document);const r=t.innerHTML;t.innerHTML="✓",t.disabled=!0,setTimeout(()=>{t.innerHTML=r,t.disabled=!1},2e3)}}};J.init=async function(e){return e&&e.id?N.products=await L.fetchAllByCategory(e.id):N.products=await L.fetchAll(),w.init(N.products)};let w={};w.init=function(e){let t=w.createPageFragment(e);return w.attachEvents(t),t};w.createPageFragment=function(e){let t=i(Pe);console.log("Creating page fragment with data:",e);const s=t.querySelector("#nbrproduct");s.textContent=`${e.length} produit${e.length>1?"s":""}`;let n=le.dom(e);return t.querySelector('slot[name="products"]').replaceWith(n),t};w.attachEvents=function(e){return e.firstElementChild.addEventListener("click",J.handler_clickOnProduct),e};function ce(e){return console.log("ProductsPage",e),J.init(e)}const Ie=`<article class="mx-auto max-w-[75rem] bg-white text-text font-body">
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
</article>`;let de={html:function(e){return P(Ie,e)},dom:function(e){let t=i(de.html(e));const s=t.querySelector("#p-main"),n=t.querySelector("#p-thumbs"),a=t.querySelector("#p-dots");var r=["default.png"];e&&e.images&&Array.isArray(e.images)&&e.images.length?r=e.images:e&&e.image&&(r=[e.image]);const o="/click-collect-ecom/";if(s&&e&&e.id&&(s.src=`${o}assets/images/products/${e.id}/${r[0]}`,s.alt=e.name||""),n){n.innerHTML="";for(var l=0;l<r.length;l++){var f=r[l],Y=document.createElement("li"),x=document.createElement("button");x.type="button",x.style="border:none; background:none; padding:0; margin:0;",x.setAttribute("data-src",`${o}assets/images/products/${e.id}/${f}`),x.className=l===0?"bullets":"bullets-grey";var V=document.createElement("img");V.src=`${o}assets/images/products/${e.id}/${f}`,V.alt=e.name||"Image produit",V.style="width:70%; aspect-ratio:4/5; object-fit:cover; cursor: pointer;",x.appendChild(V),(function(v,D){D.addEventListener("click",function(){s&&(s.src=D.getAttribute("data-src"));for(var y=n.querySelectorAll("button"),g=0;g<y.length;g++)g===v?y[g].className="bullets":y[g].className="bullets-grey";if(a)for(var M=a.querySelectorAll("button"),b=0;b<M.length;b++)M[b].style.opacity=b===v?"1":".3"})})(l,x),Y.appendChild(x),n.appendChild(Y)}}if(a){a.innerHTML="";for(var _=0;_<r.length;_++){var $=document.createElement("button");$.type="button",$.className="h-2 w-2 rounded-full bg-black",$.style.opacity=_===0?"1":".3",(function(v){$.addEventListener("click",function(){const D="/click-collect-ecom/";if(s&&(s.src=`${D}assets/images/products/${e.id}/${r[v]}`),n)for(var y=n.querySelectorAll("button"),g=0;g<y.length;g++)g===v?y[g].className="bullets":y[g].className="bullets-grey";for(var M=a.querySelectorAll("button"),b=0;b<M.length;b++)M[b].style.opacity=b===v?"1":".3"})})(_),a.appendChild($)}}return t}};const Ae=`<div class="px-4 md:px-6 lg:px-8 py-4">
   <a href="/products" data-link class="inline-flex items-center gap-2 text-sm">
     <img src="/click-collect-ecom/assets/images/icons/chevron-right.svg" alt="Retour" class="h-4 w-4 rotate-180" />
     <span class="hidden md:inline">Retour</span>
   </a>
 
   <slot name="detail"></slot>
 </div>
 `;let j={products:[]};j.getProductById=function(e){return j.products.find(t=>t.id==e)};let Z={};Z.handler_clickOnProduct=function(e){if(e.target.dataset.buy!==void 0){let t=parseInt(e.target.dataset.buy);const s=j.getProductById(t);if(s&&u.addItem({id:s.id,name:s.name,description:s.description||s.descriptionShort,image:s.image,price:s.price})){A.updateCartBadge(document);const a=e.target,r=a.textContent;a.textContent="✓ Ajouté au panier",a.disabled=!0,setTimeout(()=>{a.textContent=r,a.disabled=!1},2e3)}}};Z.init=async function(e){const t=e.id;j.products=await L.fetchAll();let s=j.getProductById(t);return console.log("Product loaded:",s),s&&(s.image=s.images&&Array.isArray(s.images)&&s.images.length?s.images[0]:s.image||"default.png"),k.init(s)};let k={};k.init=function(e){let t=k.createPageFragment(e);return k.attachEvents(t),t};k.createPageFragment=function(e){let t=i(Ae),s=de.dom(e);return t.querySelector('slot[name="detail"]').replaceWith(s),t};k.attachEvents=function(e){return e.querySelector("[data-buy]").addEventListener("click",Z.handler_clickOnProduct),e};function $e(e){return console.log("ProductDetailPage",e),Z.init(e)}const Me=`<main class="px-4 md:px-6 lg:px-8 py-6">
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
`,te=`<section class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-5xl">
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
`;let Re={html:function(){return te},dom:function(){return i(te)}},ue={};ue.render=function(e){let t=Me.replace("{{name}}",e.firstname);const s=i(t),n=s.querySelector('slot[name="dashboard-cards"]');n&&n.replaceWith(Re.dom());const a=s.querySelector("#logout-btn");return a&&a.addEventListener("click",async()=>{await c.logout(),window.router.navigate("/signin")}),s};async function je(){const e=await c.getCurrentUser();if(!e||!e.authenticated){window.router.navigate("/signin");return}return ue.render(e.user)}const Oe=`<main class="px-4 md:px-6 lg:px-8 py-6">
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
`,Ve=`<!-- Grille principale : liste (gauche) + récap (droite) -->
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
`,_e=`<li>
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
`;let q={cart:{}},E={};E.handleQuantityChange=function(e){const t=e.target,s=parseInt(t.dataset.qty),n=parseInt(t.value);u.updateQuantity(s,n),m.refreshCartContent(),A.updateCartBadge(document)};E.handleRemoveItem=function(e){const t=e.target.closest("button[data-remove]");if(!t)return;const s=parseInt(t.dataset.remove);confirm("Voulez-vous retirer cet article du panier ?")&&(u.removeItem(s),m.refreshCartContent(),A.updateCartBadge(document))};E.init=async function(){return q.cart=u.getState(),m.init()};let m={};m.init=function(){const e=i(Oe),t=e.querySelector('slot[name="cart-content"]');if(q.cart.isEmpty)t.replaceWith(i(Te));else{const s=m.createCartContent();t.replaceWith(s),m.attachEvents(e)}return e};m.createCartContent=function(){const e=q.cart.itemCount,t=e>1?"articles":"article",s={itemsCount:e,itemsCountLabel:t,total:q.cart.total.toFixed(2)};let n=P(Ve,s);const a=i(n),r=a.querySelector('slot[name="items"]'),o=m.createItemsList();return r.replaceWith(o),a};m.createItemsList=function(){const e=document.createDocumentFragment();return q.cart.items.forEach(t=>{const s=m.createItemDOM(t);e.appendChild(s)}),e};m.createItemDOM=function(e){let t=_e;t=t.replace(/{{id}}/g,e.id||""),t=t.replace(/{{image}}/g,e.image||"default.png"),t=t.replace(/{{name}}/g,e.name||"Produit"),t=t.replace(/{{description}}/g,e.description||""),t=t.replace(/{{unitPrice}}/g,(e.price||0).toFixed(2));const s=((e.price||0)*(e.quantity||1)).toFixed(2);t=t.replace(/{{lineTotal}}/g,s);for(let n=1;n<=5;n++){const a=e.quantity===n?" selected":"";t=t.replace(`{{q${n}}}`,a)}return i(t).firstElementChild};m.attachEvents=function(e){e.querySelectorAll("select[data-qty]").forEach(n=>{n.addEventListener("change",E.handleQuantityChange)}),e.querySelectorAll("button[data-remove]").forEach(n=>{n.addEventListener("click",E.handleRemoveItem)})};m.refreshCartContent=function(){q.cart=u.getState();const e=document.querySelector("main");if(!e)return;for(;e.firstChild;)e.removeChild(e.firstChild);const t=m.init();e.appendChild(t)};function De(){return E.init()}const Ne=`<section class="px-4 md:px-6 lg:px-8 py-6">
  <header class="mb-6">
    <h1 class="font-display text-3xl md:text-5xl">Finaliser la commande</h1>
  </header>

  <slot id="checkout-summary" class="max-w-md"></slot>
</section>
`,Fe=`<article class="bg-white border border-black/20 rounded-lg p-8 shadow-sm md:mr-50 md:my-10">
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
`;let me={html:function(e){const t=e.reduce((n,a)=>n+a.price*a.quantity,0),s={"cart-count":e.length,"cart-total":t.toFixed(2)};return P(Fe,s)},dom:function(e){return i(me.html(e))}},O={cart:{}},Q={};Q.handleValidate=async function(){const e=await c.getCurrentUser();if(!e||!e.authenticated){window.router.navigate("/signin");return}const t={user_id:e.user.id,total:O.cart.total,items:O.cart.items.map(n=>({product_id:n.id,quantity:n.quantity,unit_price:n.price}))};console.log("Envoi commande:",t);const s=await ae("orders",JSON.stringify(t));console.log("Réponse complète:",s),console.log("order.id:",s?s.id:"order est null"),console.log("Type de order.id:",typeof(s?s.id:null)),s&&s.id?(localStorage.setItem("lastOrderId",s.id),u.clear(),window.router.navigate("/order-confirmation")):(console.error("Pas d'ID dans la réponse!",s),alert("Erreur lors de la validation"))};Q.init=async function(){if(O.cart=u.getState(),O.cart.isEmpty){window.router.navigate("/cart");return}return pe.init()};let pe={};pe.init=function(){const e=i(Ne);return e.getElementById("checkout-summary").appendChild(me.dom(O.cart.items)),e.getElementById("validate-order").addEventListener("click",Q.handleValidate),e};function Ue(){return Q.init()}const fe=`<main class="px-4 md:px-6 lg:px-8 py-6">
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
`,Be=`<article class="border border-black/20 p-6 mb-8 text-left">
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
`;let ge={html:function(e){const t=new Date(e.created_at),s=parseFloat(e.total).toFixed(2);let n="";e.items&&e.items.length>0&&(n=e.items.map(f=>`
                <p class="flex justify-between py-2 border-t border-black/10">
                    <span>${f.product_name||"Produit"} x ${f.quantity}</span>
                    <span class="font-semibold">${parseFloat(f.unit_price).toFixed(2)} €</span>
                </p>
            `).join(""));const a={"order-number":e.id,"order-date":t.toLocaleDateString("fr-FR"),"order-status":e.status,"order-total":s};let r=P(Be,a);const o=i(r),l=o.querySelector('section[id="order-items"]');return l&&n&&(l.innerHTML=n),o.innerHTML||r},dom:function(e){return i(ge.html(e))}},K={order:null},he={};he.init=async function(e){const t=localStorage.getItem("lastOrderId");return!t||(K.order=await I("orders/"+t),localStorage.removeItem("lastOrderId"),!K.order)?R.initError():R.init()};let R={};R.init=function(){const e=i(fe);return e.getElementById("order-detail").appendChild(ge.dom(K.order)),e};R.initError=function(){const e=i(fe),t=e.getElementById("order-detail");return t.innerHTML='<p class="text-error">Commande introuvable</p>',e};function ze(e){return he.init(e)}const be=`<main class="px-4 md:px-6 lg:px-8 py-6">
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
`,He=`<article class="order-card border border-black/20 p-6 cursor-pointer" data-order-id="{{order-id}}">
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
`;let xe={html:function(e){const t=new Date(e.created_at),s=parseFloat(e.total).toFixed(2),n={"order-id":e.id,"order-number":e.id,"order-date":t.toLocaleDateString("fr-FR"),"order-total":s,"order-status":e.status};return P(He,n)},dom:function(e){const t=i(xe.html(e)),s=t.querySelector(".order-card");if(s){let n="";e.status==="En Cours"?n="background-color: var(--clr-purple); color: var(--clr-white);":e.status==="Validé"?n="background-color: var(--clr-green); color: var(--clr-white);":e.status==="Annulé"&&(n="background-color: var(--clr-red); color: var(--clr-white);");const a=s.querySelector(".order-status");a&&n&&a.setAttribute("style",n)}return t}},F={orders:[]},G={};G.init=async function(e){const t=await c.getCurrentUser();if(!t||!t.authenticated){window.location.href="/signin";return}return F.orders=await I("orders?user_id="+t.user.id),!F.orders||F.orders.length===0?U.initEmpty():U.init()};G.handleOrderClick=function(e){const t=e.currentTarget.dataset.orderId;localStorage.setItem("lastOrderId",t),window.location.href="/order-confirmation"};let U={};U.init=function(){const e=i(be),t=e.getElementById("orders-list");return F.orders.forEach(s=>{t.appendChild(xe.dom(s))}),t.querySelectorAll(".order-card").forEach(s=>{s.addEventListener("click",G.handleOrderClick)}),e};U.initEmpty=function(){const e=i(be);return e.getElementById("orders-list").classList.add("hidden"),e.getElementById("no-orders").classList.remove("hidden"),e};function We(e){return G.init(e)}const Je=`<div class="min-h-screen flex flex-col">
    <slot name="header"></slot>
    <main class="flex-1">
        <slot></slot>
    </main>
    <slot name="footer"></slot>
</div>
    `,se=`<footer class="border-t border-text/10 bg-bg font-body text-text">
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
`;let Ze={html:function(){return se},dom:function(){return i(se)}};function Qe(){let e=i(Je),t=A.dom(),s=Ze.dom();return e.querySelector('slot[name="header"]').replaceWith(t),e.querySelector('slot[name="footer"]').replaceWith(s),e}const Ge=` <section>
    <h1>404 - Page non trouvée</h1>
        <p>Cette page n'existe pas</p>
    <nav>
        <a href="/click-collect-ecom/" data-link>Retour à l'accueil</a>
    </nav>
</section>`;function Ke(){return Ge}const Xe=`<main class="mx-auto w-full max-w-[22.5rem] px-3 pt-3 pb-10 md:max-w-[26.25rem] md:px-4 font-body text-text">
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
`,Ye={dom(){return i(Xe)}},et=`<div class="px-4 md:px-6 lg:px-8 py-4">
   <a href="/products" data-link class="inline-flex items-center gap-2 text-sm">
     <img src="/click-collect-ecom/assets/images/icons/chevron-right.svg" alt="Retour" class="h-4 w-4 rotate-180" />
     <span class="hidden md:inline">Retour</span>
   </a>
 
   <slot name="form"></slot>
 </div>
 `;let S={};S.handleFormSubmit=async function(e){e.preventDefault(),e.stopPropagation();const t=e.target,s=t.querySelector("#error-message");s.classList.add("hidden"),s.textContent="";const n=t.password.value;if(n.length<12){s.textContent="Le mot de passe doit contenir au moins 12 caractères",s.classList.remove("hidden");return}if(!/[A-Z]/.test(n)){s.textContent="Le mot de passe doit contenir au moins une majuscule",s.classList.remove("hidden");return}if(!/[a-z]/.test(n)){s.textContent="Le mot de passe doit contenir au moins une minuscule",s.classList.remove("hidden");return}if(!/[0-9]/.test(n)){s.textContent="Le mot de passe doit contenir au moins un chiffre",s.classList.remove("hidden");return}if(!/[!@#$%^&*(),.?":{}|<>]/.test(n)){s.textContent="Le mot de passe doit contenir au moins un caractère spécial",s.classList.remove("hidden");return}let a=new FormData(t);const r={firstname:a.get("firstname"),lastname:a.get("lastname"),civ:a.get("civ"),email:a.get("email"),password:a.get("password")},o=await c.signup(r);o&&o.id?window.router.navigate("/signin"):o&&o.error?(s.textContent=o.error,s.classList.remove("hidden")):(s.textContent="Erreur lors de la création du compte",s.classList.remove("hidden"))};S.handlePasswordInput=function(e){const t=e.target.value,s=e.target.closest("form"),n=s.querySelector("#rule-length"),a=s.querySelector("#rule-uppercase"),r=s.querySelector("#rule-lowercase"),o=s.querySelector("#rule-number"),l=s.querySelector("#rule-special");t.length>=12?(n.classList.add("password-rule-valid"),n.classList.remove("password-rule-invalid")):(n.classList.remove("password-rule-valid"),n.classList.add("password-rule-invalid")),/[A-Z]/.test(t)?(a.classList.add("password-rule-valid"),a.classList.remove("password-rule-invalid")):(a.classList.remove("password-rule-valid"),a.classList.add("password-rule-invalid")),/[a-z]/.test(t)?(r.classList.add("password-rule-valid"),r.classList.remove("password-rule-invalid")):(r.classList.remove("password-rule-valid"),r.classList.add("password-rule-invalid")),/[0-9]/.test(t)?(o.classList.add("password-rule-valid"),o.classList.remove("password-rule-invalid")):(o.classList.remove("password-rule-valid"),o.classList.add("password-rule-invalid")),/[!@#$%^&*(),.?":{}|<>]/.test(t)?(l.classList.add("password-rule-valid"),l.classList.remove("password-rule-invalid")):(l.classList.remove("password-rule-valid"),l.classList.add("password-rule-invalid"))};S.togglePassword=function(e){const t=e.currentTarget,s=t.closest(".relative").querySelector("input"),n=t.querySelector("#eye-closed"),a=t.querySelector("#eye-open");s.type==="password"?(s.type="text",n.classList.add("hidden"),a.classList.remove("hidden")):(s.type="password",n.classList.remove("hidden"),a.classList.add("hidden"))};let B={};B.attachEvents=function(e){const t=e.querySelector("form"),s=e.querySelector("#sn-pass"),n=e.querySelector("#toggle-password");t&&t.addEventListener("submit",S.handleFormSubmit),s&&s.addEventListener("input",S.handlePasswordInput),n&&n.addEventListener("click",S.togglePassword)};B.init=function(){const e=i(et),t=Ye.dom();return e.querySelector('slot[name="form"]').replaceWith(t),B.attachEvents(e),e};function tt(){return B.init()}const st=`<main class="mx-auto w-full max-w-[22.5rem] px-3 pt-3 pb-10 md:max-w-[26.25rem] md:px-4 font-body text-text">
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
</main>`,nt={dom(){return i(st)}},at=`<main class="px-4 py-4 md:px-6 lg:px-8">
  <nav class="inline-flex items-center gap-2 text-sm">
    <a href="/click-collect-ecom/" data-link class="inline-flex items-center gap-2">
      <img src="/click-collect-ecom/assets/images/icons/chevron-right.svg" alt="Retour" class="h-4 w-4 rotate-180" />
      <span class="hidden md:inline">Retour</span>
    </a>
  </nav>

  <slot name="form"></slot>
</main>
`;let z={};z.handleFormSubmit=async function(e){e.preventDefault(),e.stopPropagation();const t=e.target,s=t.querySelector("#error-message");if(!s)return;s.classList.add("hidden"),s.textContent="";let n=new FormData(t);const a={email:n.get("email"),password:n.get("password")},r=await c.login(a);r&&r.success?(window.router&&window.router.setAuth(!0),window.router.navigate("/")):r&&r.error?(s.textContent=r.error,s.classList.remove("hidden")):(s.textContent="Erreur de connexion",s.classList.remove("hidden"))};z.togglePassword=function(e){const t=e.currentTarget,s=t.closest(".relative").querySelector("input"),n=t.querySelector("#eye-closed"),a=t.querySelector("#eye-open");s.type==="password"?(s.type="text",n.classList.add("hidden"),a.classList.remove("hidden")):(s.type="password",n.classList.remove("hidden"),a.classList.add("hidden"))};let H={};H.attachEvents=function(e){const t=e.querySelector("form"),s=e.querySelector("#toggle-password");t&&t.addEventListener("submit",z.handleFormSubmit),s&&s.addEventListener("click",z.togglePassword)};H.init=function(){const e=i(at),t=nt.dom();return e.querySelector('slot[name="form"]').replaceWith(t),H.attachEvents(e),e};function rt(){return H.init()}const ot=`<main class="px-4 py-4 md:px-6 lg:px-8">
  <nav class="inline-flex items-center gap-2 text-sm mb-6">
    <a href="/my-account/dashboard" data-link class="inline-flex items-center gap-2">
      <img src="/click-collect-ecom/assets/images/icons/chevron-right.svg" alt="Retour" class="h-4 w-4 rotate-180" />
      <span class="hidden md:inline">Retour</span>
    </a>
  </nav>

  <slot name="form"></slot>
</main>
`,it=`<section class="mx-auto w-full max-w-[72rem] font-body text-text">
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
</section>`,lt={dom(){return i(it)}},h={};h.handleInfoFormSubmit=async function(e){e.preventDefault(),e.stopPropagation();const t=e.target,s=new FormData(t),n={civ:s.get("civ"),lastname:s.get("lastname"),firstname:s.get("firstname"),email:s.get("email")};let a;try{a=await c.updateProfile(n)}catch(r){console.error("Erreur:",r),alert("Erreur réseau");return}if(a&&a.success)alert("Profil mis à jour avec succès !");else{const r=a&&a.error?a.error:"Impossible de mettre à jour le profil";alert(r)}};h.handlePasswordFormSubmit=async function(e){e.preventDefault(),e.stopPropagation();const t=e.target,s=new FormData(t),n=s.get("current_password"),a=s.get("new_password");let r;try{r=await c.changePassword(n,a)}catch(o){console.error("Erreur:",o),alert("Erreur réseau");return}if(r&&r.success)alert("Mot de passe changé avec succès !"),t.reset(),t.querySelectorAll('[id^="rule-"]').forEach(l=>{l.classList.remove("password-rule-valid"),l.classList.add("password-rule-invalid")});else{const o=r&&r.error?r.error:"Impossible de changer le mot de passe";alert(o)}};h.handleDeleteAccount=async function(e){if(e.preventDefault(),!confirm("Êtes-vous sûr de vouloir supprimer définitivement votre compte ?"))return;let s;try{s=await c.deleteAccount()}catch(n){console.error("Erreur:",n),alert("Erreur réseau lors de la suppression du compte");return}s?(alert("Votre compte a été supprimé avec succès"),window.router.navigate("/")):alert("Erreur lors de la suppression du compte")};h.togglePassword=function(e){const t=e.currentTarget,s=t.closest(".relative"),n=s?s.querySelector("input[type='password'], input[type='text']"):null,a=t.querySelector(".eye-icon:not(.hidden)"),r=t.querySelector(".eye-icon.hidden");n&&(n.type==="password"?(n.type="text",a&&a.classList.add("hidden"),r&&r.classList.remove("hidden")):(n.type="password",r&&r.classList.add("hidden"),a&&a.classList.remove("hidden")))};h.handlePasswordInput=function(e){const t=e.target.value,s=e.target.closest("form"),n=s.querySelector("#rule-length"),a=s.querySelector("#rule-uppercase"),r=s.querySelector("#rule-lowercase"),o=s.querySelector("#rule-number"),l=s.querySelector("#rule-special");t.length>=12?(n.classList.add("password-rule-valid"),n.classList.remove("password-rule-invalid")):(n.classList.remove("password-rule-valid"),n.classList.add("password-rule-invalid")),/[A-Z]/.test(t)?(a.classList.add("password-rule-valid"),a.classList.remove("password-rule-invalid")):(a.classList.remove("password-rule-valid"),a.classList.add("password-rule-invalid")),/[a-z]/.test(t)?(r.classList.add("password-rule-valid"),r.classList.remove("password-rule-invalid")):(r.classList.remove("password-rule-valid"),r.classList.add("password-rule-invalid")),/[0-9]/.test(t)?(o.classList.add("password-rule-valid"),o.classList.remove("password-rule-invalid")):(o.classList.remove("password-rule-valid"),o.classList.add("password-rule-invalid")),/[!@#$%^&*(),.?":{}|<>]/.test(t)?(l.classList.add("password-rule-valid"),l.classList.remove("password-rule-invalid")):(l.classList.remove("password-rule-valid"),l.classList.add("password-rule-invalid"))};const C={};C.loadUserData=async function(e){try{const t=await c.getCurrentUser();if(!t||!t.authenticated||!t.user){console.error("Utilisateur non connecté"),window.router.navigate("/signin");return}const s=t.user,n=e.querySelector(`input[name="civ"][value="${s.civ}"]`);n&&(n.checked=!0);const a=e.querySelector("#lastname");a&&(a.value=s.lastname||"");const r=e.querySelector("#firstname");r&&(r.value=s.firstname||"");const o=e.querySelector("#email");o&&(o.value=s.email||"")}catch(t){console.error("Erreur lors du chargement des données:",t)}};C.attachEvents=function(e){const t=e.querySelector("#form-profile-info");t&&t.addEventListener("submit",h.handleInfoFormSubmit);const s=e.querySelector("#form-profile-password");s&&s.addEventListener("submit",h.handlePasswordFormSubmit);const n=e.querySelector("#toggle-current-password");n&&n.addEventListener("click",h.togglePassword);const a=e.querySelector("#toggle-new-password");a&&a.addEventListener("click",h.togglePassword);const r=e.querySelector("#new-password");r&&r.addEventListener("input",h.handlePasswordInput);const o=e.querySelector("#delete-account");o&&o.addEventListener("click",h.handleDeleteAccount)};C.init=async function(){const e=i(ot),t=e.querySelector('slot[name="form"]');return t&&t.replaceWith(lt.dom()),await C.loadUserData(e),C.attachEvents(e),e};async function ct(){return await C.init()}const d=new ye("app",{loginPath:"/signin",basePath:"/click-collect-ecom/"});window.router=d;const ne=await c.getCurrentUser();ne&&ne.authenticated?d.setAuth(!0):d.setAuth(!1);d.addLayout("/",Qe);d.addRoute("/",Ce);d.addRoute("/about",we);d.addRoute("/products",ce);d.addRoute("/category/:id",ce);d.addRoute("/products/:id/:slug",$e);d.addRoute("/cart",De);d.addRoute("/checkout",Ue,{requireAuth:!0});d.addRoute("/order-confirmation",ze,{requireAuth:!0});d.addRoute("/signin",rt,{useLayout:!1});d.addRoute("/signup",tt,{useLayout:!1});d.addRoute("/my-account/dashboard",je,{requireAuth:!0});d.addRoute("/my-account/orders",We,{requireAuth:!0});d.addRoute("/my-account/profile",ct,{requireAuth:!0});d.addRoute("*",Ke);d.start();
