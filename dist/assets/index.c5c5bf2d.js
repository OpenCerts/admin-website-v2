import{c as e,r as t,f as a,W as l,n,d as s,u as c,a as r}from"./vendor.c76d113d.js";!function(e=".",t="__import__"){try{self[t]=new Function("u","return import(u)")}catch(a){const l=new URL(e,location),n=e=>{URL.revokeObjectURL(e.src),e.remove()};self[t]=e=>new Promise(((a,s)=>{const c=new URL(e,l);if(self[t].moduleMap[c])return a(self[t].moduleMap[c]);const r=new Blob([`import * as m from '${c}';`,`${t}.moduleMap['${c}']=m;`],{type:"text/javascript"}),m=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(r),onerror(){s(new Error(`Failed to import: ${e}`)),n(m)},onload(){a(self[t].moduleMap[c]),n(m)}});document.head.appendChild(m)})),self[t].moduleMap={}}}("/assets/");const m=e`
  cursor: pointer;
  border: none;
  padding: 10px 30px;
  user-select: none;
  text-decoration: none;
  min-width: 6rem;
  margin-top: 8px;
  margin-bottom: 8px;
  border-radius: 30px;
  background-color: white;
  color: black;
  -webkit-transition: background-color 0.3s ease-out;
  -moz-transition: background-color 0.3s ease-out;
  -o-transition: background-color 0.3s ease-out;
  transition: background-color 0.3s ease-out;

  :disabled,
  [disabled] {
    cursor: not-allowed;
    opacity: 0.5;
    filter: alpha(opacity=50);
  }

`,o=({children:a,className:l,custom:n,onClick:s})=>t.createElement("button",{className:`${l} ${e(m,n)} focus:outline-none`,onClick:()=>{s()}},a),i=e`
color: white;
background-color: #ff6a33;
:hover{
  background-color: #DE8B38;
}
`,d=({children:e,className:a,onClick:l})=>t.createElement(o,{className:a,custom:i,onClick:()=>{l()}},e),u=e`
color: white;
background-color: #878787;
:hover{
  background-color: #616161;
}
`,p=({children:e,className:a,onClick:l})=>t.createElement(o,{className:a,custom:u,onClick:()=>{l()}},e);const f=async()=>(await(async()=>(await window.ethereum.enable(),new l(window.ethereum)))()).getSigner(),w=n.div`
  flex-basis: 100%;
`,g=()=>{const[e,l]=t.useState(!1),[n,s]=t.useState("-"),[c,r]=t.useState("-"),[m,o]=t.useState("-");t.useEffect((()=>{window.ethereum.on("accountsChanged",(function(e){e.length>0&&i()}))}));const i=async()=>{const e=await(async()=>{const e=await f();return{address:await e.getAddress(),balance:a(await e.getBalance()),network:(await e.provider.getNetwork()).name}})();s(e.address),r(e.network),o(e.balance),l(!0)};return t.createElement("div",{className:"shadow-md"},t.createElement("div",{className:"container mx-auto px-4 py-2 flex flex-wrap items-center text-sm"},t.createElement("div",{className:"flex-shrink-0 mx-auto lg:mx-0 my-4 lg:my-0"},t.createElement("a",{href:"https://admin.opencerts.io/"},t.createElement("img",{className:"img-fluid h-12",src:"/assets/logo.df95d683.svg",alt:"OpenCert"}))),t.createElement(w,{className:"lg:hidden"}),t.createElement("div",{className:"mx-auto lg:mx-0 lg:ml-auto "},t.createElement("div",{className:"flex flex-wrap h-full items-center"},e&&t.createElement(t.Fragment,null,t.createElement("div",{className:"w-auto md:w-auto mb-4 lg:mb-0 lg:my-auto"},t.createElement("p",{className:"font-medium"},"Current Account"),t.createElement("a",{href:""},t.createElement("p",{className:" break-all"},n))),t.createElement(w,{className:"md:hidden"}),t.createElement("div",{className:"w-auto md:ml-12 mb-4 lg:mb-0 lg:my-auto"},t.createElement("p",{className:"font-medium"},"Network"),t.createElement("p",{className:"capitalize"},c)),t.createElement(w,{className:"md:hidden"}),t.createElement("div",{className:"w-auto md:ml-12 mb-4 lg:mb-0 lg:my-auto"},t.createElement("p",{className:"font-medium"},"Account Balance"),t.createElement("p",null,m," ETH"))),!e&&t.createElement("div",{className:"w-auto"},t.createElement(d,{onClick:i,className:"text-sm font-medium"},"Connect Metamask"))))))},E=e`
  padding: 10px 20px;
  border-radius: 5px;
  border: 2px solid #848484;
`,x=n.div`
  .valid {
    border-color: #22b43a;
  }

  .invalid {
    border-color: #ed7c7c;
  }
`,N=({className:a,custom:l,placeHolder:n,onChange:s,value:c})=>t.createElement(x,null,t.createElement("input",{className:`${e(E,l)} ${a} `,placeholder:n,onChange:({target:{value:e}})=>s(""===e?"":e),value:c})),b=({documentStoreAddress:e})=>{const[a,l]=t.useState(""),[n,r]=t.useState("");t.useState("");const m=async()=>{""!==a&&"valid"===n&&await(async(e,t)=>{const a=await s.connect(e,await f());return(await a.issue(t)).wait()})(e,a)};return t.createElement(t.Fragment,null,t.createElement("div",{className:"container md:flex max-w-screen-lg px-4 md:mx-auto mt-12"},t.createElement("label",{className:"block md:flex-grow md:max-w-lg md:mr-10 text-left"},t.createElement("p",null,"Issue certificates with the Merkle Root Hash"),t.createElement(N,{className:`${n} w-full mt-3`,placeHolder:"Enter existing (0x…), or deploy new instance.",onChange:e=>{""===e?r(""):c.isAddress(e)?(l(e),r("valid")):r("invalid")}})),t.createElement("div",{className:"w-auto md:w-fit md:ml-auto mt-auto"},t.createElement(d,{onClick:()=>m(),className:"text-sm w-full font-medium"},t.createElement("span",null,"Issue Certificate Batch")))))},v=({toggleOpen:e,children:a})=>t.createElement("div",{className:"fixed z-10 inset-0 overflow-y-auto ease-in-out duration-700 opacity-0 "+(e?"opacity-100 visible":"invisible")},t.createElement("div",{className:"flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"},t.createElement("div",{className:"fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"}),t.createElement("span",{className:"hidden sm:inline-block sm:align-middle sm:h-screen","aria-hidden":"true"},"​"),t.createElement("div",{className:"flex self-center md:inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"},t.createElement("div",{className:"bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4"},a)))),h=e`
  border-top-color: #3498db;
`,y=({className:a})=>t.createElement("div",{className:`animate-spin loader ease-linear rounded-full border-4 border-t-4 border-gray-200 ${a} ${e(h)}`}),k=({documentStoreAddress:e,setDocumentStoreAddress:a})=>{const[l,n]=t.useState(""),[r,m]=t.useState(!1),[o,i]=t.useState(""),[u,w]=t.useState(!1),[g,E]=t.useState(""),x=e=>{if(""!=e){E(`-${g}\n-${e} `)}else E("")};return t.createElement(t.Fragment,null,t.createElement("div",{className:"container md:flex max-w-screen-lg px-4 md:mx-auto mt-12"},t.createElement("label",{className:"block md:flex-grow md:max-w-lg md:mr-10 text-left"},t.createElement("p",null,"Store Address"),t.createElement(N,{className:`${l} w-full mt-3`,placeHolder:"Enter existing (0x…), or deploy new instance.",onChange:e=>{""===e?n(""):c.isAddress(e)?n("valid"):n("invalid"),a(e)},value:e})),t.createElement("p",{className:"text-center my-4 text-gray-400 md:hidden"},"Or"),t.createElement("div",{className:"w-auto md:w-fit md:ml-auto mt-auto"},t.createElement(d,{onClick:()=>m(!0),className:"text-sm w-full font-medium"},t.createElement("span",null,"Deploy New Instance")))),t.createElement(v,{toggleOpen:r},t.createElement("div",{className:"sm:flex sm:items-start w-100 "},t.createElement("div",{className:"w-full mt-3 sm:mt-0 sm:text-left"},t.createElement("h3",{className:"text-lg leading-6 font-medium text-gray-900"},"Deploy Document Store"),t.createElement("div",{className:"w-full mt-10"},t.createElement(N,{className:"w-full",onChange:e=>{i(e)},placeHolder:"Name of organisation.",value:o})))),t.createElement("div",{className:"px-4 pt-5 md:pt-10 pb-3 sm:px-6 sm:flex sm:flex-row-reverse"},t.createElement(d,{onClick:async()=>{if(""!=o){w(!0);const e=await(async(e,t)=>{try{console.log(t),t&&t("Decrypting wallet");const a=await f();t&&t("Wallet successfully decrypted");const l=new s.DocumentStoreFactory(a);return t&&t(`Deploying document store ${e}`),(await l.deploy(e)).deployTransaction.wait()}catch(a){console.log(a.message),t&&t(a)}})(o,x);if(e){const t=await(async()=>{const e=await f();return(await e.provider.getNetwork()).name})();x(`- Find more details at ${(({network:e})=>`https://${"mainnet"===e?"":`${e}.`}etherscan.io`)({network:t})}/address/${e.contractAddress}`),a(e.contractAddress)}}},className:"w-full inline-flex justify-center text-sm font-medium "},t.createElement(y,{className:"w-5 h-5 mr-2"}),"Deploy"),t.createElement(p,{onClick:()=>m(!1),className:"w-full text-sm font-medium mr-5"},"Cancel")),t.createElement("div",{className:"my-3 w-100 h-56"},t.createElement("hr",null),t.createElement("p",{className:"my-2 text-sm text-gray-700"},"Logging "),t.createElement("textarea",{className:"w-full h-48 bg-gray-100 p-2 text-sm resize-none overflow-scroll",disabled:!0,value:g}))))},C=n.div`
  a {
    font-size: 14px;
    font-weight: 500;
    color: #000000;
    margin-left: 20px;

    .active {
      color: #ff9933;
      border-bottom: 2px solid #ff9933;
    }
  }
`;function S(){const[e,a]=t.useState(""),[l,n]=t.useState("");return t.createElement("div",{className:"App"},t.createElement(g,null),t.createElement("div",{className:"container max-w-screen-lg px-4 md:mx-auto mt-16 text-center sm:text-left"},t.createElement("h2",null,"Administrator Portal")),t.createElement(k,{documentStoreAddress:e,setDocumentStoreAddress:a}),t.createElement("hr",{className:"mt-16 max-w-screen-lg mx-auto px-4"}),t.createElement(C,null,t.createElement("a",{onClick:()=>{n("issue")},className:"issue"===l?"active":""},"Issue Certificates"),t.createElement("a",{onClick:()=>{n("revoke")},className:"issue"===l?"active":""},"Revoke Certificate")),"issue"===l&&t.createElement(b,{documentStoreAddress:e}))}r.render(t.createElement(t.StrictMode,null,t.createElement(S,null)),document.getElementById("root"));
