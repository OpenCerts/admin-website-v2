import{c as e,r as t,f as a,W as n,a as s}from"./vendor.fd21f7b4.js";!function(e=".",t="__import__"){try{self[t]=new Function("u","return import(u)")}catch(a){const n=new URL(e,location),s=e=>{URL.revokeObjectURL(e.src),e.remove()};self[t]=e=>new Promise(((a,l)=>{const c=new URL(e,n);if(self[t].moduleMap[c])return a(self[t].moduleMap[c]);const r=new Blob([`import * as m from '${c}';`,`${t}.moduleMap['${c}']=m;`],{type:"text/javascript"}),m=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(r),onerror(){l(new Error(`Failed to import: ${e}`)),s(m)},onload(){a(self[t].moduleMap[c]),s(m)}});document.head.appendChild(m)})),self[t].moduleMap={}}}("/assets/");const l=e`
  cursor: pointer;
  border: none;
  padding: 10px 30px;
  user-select: none;
  text-decoration: none;
  color: white;
  background-color: #ff6a33;
  min-width: 10rem;
  margin: 8px;
  border-radius: 30px;

  :disabled,
  [disabled] {
    cursor: not-allowed;
    opacity: 0.5;
    filter: alpha(opacity=50);
  }
`,c=({children:a,className:n,custom:s,onClick:c})=>t.createElement("button",{className:`${n} ${e(l,s)}`,onClick:()=>{c()}},a);const r=async()=>(await(async()=>(await window.ethereum.enable(),new n(window.ethereum)))()).getSigner(),m=()=>{const[e,n]=t.useState(!1),[s,l]=t.useState("-"),[m,o]=t.useState("-"),[i,d]=t.useState("-");t.useEffect((()=>{window.ethereum.on("accountsChanged",(function(e){e.length>0&&u()}))}));const u=async()=>{const e=await(async()=>{const e=await r();return{address:await e.getAddress(),balance:a(await e.getBalance()),network:(await e.provider.getNetwork()).name}})();l(e.address),o(e.network),d(e.balance),n(!0)};return t.createElement("div",{className:"shadow-md"},t.createElement("div",{className:"container mx-auto py-2 relative flex items-center justify-between h-16"},t.createElement("div",{className:"flex-shrink-0"},t.createElement("a",{href:"https://admin.opencerts.io/"},t.createElement("img",{className:"img-fluid h-12",src:"/assets/logo.df95d683.svg",alt:"OpenCert"}))),t.createElement("div",{className:"lg:relative lg:ml-auto"},t.createElement("div",{className:"flex h-full items-center"},e&&t.createElement(t.Fragment,null,t.createElement("div",{className:"w-auto text-left"},t.createElement("p",{className:"text-sm font-medium"},"Current Account"),t.createElement("a",{href:""},t.createElement("p",{className:"text-sm"},s))),t.createElement("div",{className:"w-auto ml-12"},t.createElement("p",{className:"text-sm font-medium"},"Network"),t.createElement("p",{className:"text-sm capitalize"},m)),t.createElement("div",{className:"w-auto ml-12"},t.createElement("p",{className:"text-sm font-medium"},"Account Balance"),t.createElement("p",{className:"text-sm"},i," ETH"))),!e&&t.createElement("div",{className:"w-auto"},t.createElement(c,{onClick:u,className:"text-sm font-medium"},"Connect Metamask"))))))},o=()=>t.createElement("div",{className:"container mx-auto py-2 relative flex items-center justify-between"},t.createElement("label",{className:"block"},t.createElement("span",{className:"text-gray-700"},"Name"),t.createElement("input",{type:"text",placeholder:"Default focus style"})));function i(){return t.useState(0),t.createElement("div",{className:"App"},t.createElement(m,null),t.createElement(o,null))}s.render(t.createElement(t.StrictMode,null,t.createElement(i,null)),document.getElementById("root"));
