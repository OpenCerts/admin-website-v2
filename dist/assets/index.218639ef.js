import{c as e,r as t,f as a,W as n,n as l,d as s,u as r,a as m}from"./vendor.8a390f04.js";!function(e=".",t="__import__"){try{self[t]=new Function("u","return import(u)")}catch(a){const n=new URL(e,location),l=e=>{URL.revokeObjectURL(e.src),e.remove()};self[t]=e=>new Promise(((a,s)=>{const r=new URL(e,n);if(self[t].moduleMap[r])return a(self[t].moduleMap[r]);const m=new Blob([`import * as m from '${r}';`,`${t}.moduleMap['${r}']=m;`],{type:"text/javascript"}),c=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(m),onerror(){s(new Error(`Failed to import: ${e}`)),l(c)},onload(){a(self[t].moduleMap[r]),l(c)}});document.head.appendChild(c)})),self[t].moduleMap={}}}("/assets/");const c=e`
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

`,o=({children:a,className:n,custom:l,onClick:s})=>t.createElement("button",{className:`${n} ${e(c,l)} focus:outline-none`,onClick:()=>{s()}},a),i=e`
color: white;
background-color: #ff6a33;
:hover{
  background-color: #DE8B38;
}
`,d=({children:e,className:a,onClick:n})=>t.createElement(o,{className:a,custom:i,onClick:()=>{n()}},e),u=e`
color: white;
background-color: #878787;
:hover{
  background-color: #616161;
}
`,p=({children:e,className:a,onClick:n})=>t.createElement(o,{className:a,custom:u,onClick:()=>{n()}},e);const w=async()=>(await(async()=>(await window.ethereum.enable(),new n(window.ethereum)))()).getSigner(),x=async()=>{const e=await w();return(await e.provider.getNetwork()).name},g=l.div`
  flex-basis: 100%;
`,f=()=>{const[e,n]=t.useState(!1),[l,s]=t.useState("-"),[r,m]=t.useState("-"),[c,o]=t.useState("-");t.useEffect((()=>{window.ethereum.on("accountsChanged",(function(e){e.length>0&&i()})),window.ethereum.on("chainChanged",(function(){i()})),window.ethereum.on("connect",(function(e){i()}))}));const i=async()=>{const e=await(async()=>{const e=await w();return{address:await e.getAddress(),balance:a(await e.getBalance()),network:(await e.provider.getNetwork()).name}})();s(e.address),m(e.network),o(e.balance),n(!0)};return window.ethereum.isConnected()&&i(),t.createElement("div",{className:"shadow-md flex flex-wrap items-center text-sm px-4 py-2 "},t.createElement("div",{className:"mx-auto my-4 lg:my-0"},t.createElement("a",{href:"https://admin.opencerts.io/"},t.createElement("img",{className:"img-fluid h-12",src:"/assets/logo.df95d683.svg",alt:"OpenCert"}))),t.createElement(g,{className:"lg:hidden"}),t.createElement("div",{className:"flex flex-wrap mx-auto items-center"},e&&t.createElement(t.Fragment,null,t.createElement("div",{className:"w-auto mb-4 lg:mb-0"},t.createElement("p",{className:"font-medium"},"Current Account"),t.createElement("p",{className:" break-all"},l)),t.createElement(g,{className:"md:hidden"}),t.createElement("div",{className:"w-auto md:ml-12 mb-4 lg:mb-0"},t.createElement("p",{className:"font-medium"},"Network"),t.createElement("p",{className:"capitalize"},r)),t.createElement(g,{className:"md:hidden"}),t.createElement("div",{className:"w-auto md:ml-12 mb-4 lg:mb-0"},t.createElement("p",{className:"font-medium"},"Account Balance"),t.createElement("p",null,c," ETH"))),!e&&t.createElement(d,{onClick:i,className:"font-medium"},"Connect Metamask")))},E=e`
  padding: 10px 20px;
  border-radius: 5px;
  border: 2px solid #848484;
`,h=l.div`
  .valid {
    border-color: #22b43a;
  }

  .invalid {
    border-color: #ed7c7c;
  }
`,N=({className:a,custom:n,placeHolder:l,onChange:s,value:r})=>t.createElement(h,null,t.createElement("input",{className:`${e(E,n)} ${a} `,placeholder:l,onChange:({target:{value:e}})=>s(""===e?"":e),value:r})),v=e`
  border-top-color: #3498db;
`,b=({className:a})=>t.createElement("div",{className:`animate-spin loader ease-linear rounded-full border-4 border-t-4 border-gray-200 ${a} ${e(v)}`}),y=({network:e})=>`https://${"mainnet"===e?"":`${e}.`}etherscan.io`,k=e=>/^0x[a-fA-F0-9]{64}$/.test(e),S=({documentStoreAddress:e})=>{const[a,n]=t.useState(""),[l,r]=t.useState(""),[m,c]=t.useState(!1),[o,i]=t.useState(""),[u,p]=t.useState(""),[g,f]=t.useState(""),E=async()=>{if(""!==a&&"valid"===l){c(!0);const t=await(async(e,t,a)=>{try{const n=await s.connect(e,await w());a&&a("Sending transaction to pool");const l=await n.issue(t);return a&&a(`Waiting for transaction ${t} to be mined`),l.wait()}catch(n){a&&a(n.message)}})(e,a,i);t&&(f(`Document/Document Batch with hash ${a} has been issued on ${e}`),i(`Find more details at ${y({network:await x()})}/tx/${t.transactionHash}`)),p(""),c(!1)}else p("*Please enter valid merkle root hash."),f("")};return t.createElement(t.Fragment,null,t.createElement("div",{className:"container md:flex max-w-screen-lg px-4 md:mx-auto mt-12"},t.createElement("label",{className:"block md:flex-grow md:max-w-lg md:mr-10 text-left"},t.createElement("p",null,"Issue certificates with the Merkle Root Hash"),t.createElement(N,{className:`${l} w-full mt-3`,placeHolder:"0x...",onChange:e=>{""===e?r(""):k(e)?(n(e),r("valid")):(n(""),r("invalid"))}})),t.createElement("div",{className:"w-auto md:w-fit md:ml-auto mt-auto"},t.createElement(d,{onClick:()=>E(),className:"tw-full inline-flex justify-center text-sm font-medium"},m&&t.createElement(b,{className:"w-5 h-5 mr-2"}),t.createElement("span",null,"Issue Certificate Batch")))),t.createElement("div",{className:"container max-w-screen-lg px-4 md:mx-auto"},t.createElement("p",{className:"text-red-600"},u),t.createElement("p",{className:"text-green-600"},g)),t.createElement("div",{className:"w-100 h-20 max-w-screen-lg px-4 mt-6 mx-auto "},t.createElement("p",{className:"my-2 text-sm text-gray-700"},"Status "),t.createElement("textarea",{className:"w-full h-16 bg-gray-100 p-2 text-sm resize-none overflow-scroll",disabled:!0,value:o})))},C=({documentStoreAddress:e})=>{const[a,n]=t.useState(""),[l,r]=t.useState(""),[m,c]=t.useState(!1),[o,i]=t.useState(""),[u,p]=t.useState(""),[g,f]=t.useState(""),E=async()=>{if(""!==a&&"valid"===l&&confirm("Are you sure you want to revoke this hash?")){c(!0);const t=await(async(e,t,a)=>{try{const n=await s.connect(e,await w());a&&a("Sending transaction to pool");const l=await n.revoke(t);return a&&a(`Waiting for transaction ${t} to be mined`),l.wait()}catch(n){a&&a(n.message)}})(e,a,i);t&&(f(`Document/Document Batch with hash ${a} has been revoked on ${e}`),i(`Find more details at ${y({network:await x()})}/tx/${t.transactionHash}`)),p(""),c(!1)}else p("*Please enter valid merkle root hash."),f("")};return t.createElement(t.Fragment,null,t.createElement("div",{className:"container md:flex max-w-screen-lg px-4 md:mx-auto mt-12"},t.createElement("label",{className:"block md:flex-grow md:max-w-lg md:mr-10 text-left"},t.createElement("p",null,"Certificate hash to revoke"),t.createElement(N,{className:`${l} w-full mt-3`,placeHolder:"0x...",onChange:e=>{""===e?r(""):k(e)?(n(e),r("valid")):(n(""),r("invalid"))}})),t.createElement("div",{className:"w-auto md:w-fit md:ml-auto mt-auto"},t.createElement(d,{onClick:()=>E(),className:"tw-full inline-flex justify-center text-sm font-medium"},m&&t.createElement(b,{className:"w-5 h-5 mr-2"}),t.createElement("span",null,"Revoke")))),t.createElement("div",{className:"container max-w-screen-lg px-4 md:mx-auto"},t.createElement("p",{className:"text-red-600"},u),t.createElement("p",{className:"text-green-600"},g)),t.createElement("div",{className:"w-100 h-20 max-w-screen-lg px-4 mt-6 mx-auto "},t.createElement("p",{className:"my-2 text-sm text-gray-700"},"Status "),t.createElement("textarea",{className:"w-full h-16 bg-gray-100 p-2 text-sm resize-none overflow-scroll",disabled:!0,value:o})))},$=({toggleOpen:e,children:a})=>t.createElement("div",{className:"fixed z-10 inset-0 overflow-y-auto ease-in-out duration-700 opacity-0 "+(e?"opacity-100 visible":"invisible")},t.createElement("div",{className:"flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"},t.createElement("div",{className:"fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"}),t.createElement("span",{className:"hidden sm:inline-block sm:align-middle sm:h-screen","aria-hidden":"true"},"​"),t.createElement("div",{className:"flex self-center md:inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"},t.createElement("div",{className:"bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4"},a)))),A=({documentStoreAddress:e,setDocumentStoreAddress:a,setDocumentStoreStatus:n})=>{const[l,m]=t.useState(!1),[c,o]=t.useState(!1),[i,u]=t.useState(""),[g,f]=t.useState(""),[E,h]=t.useState(""),v=e=>{""===e?u(""):r.isAddress(e)?(n(!0),u("valid")):(n(!1),u("invalid")),a(e)};return t.createElement(t.Fragment,null,t.createElement("div",{className:"container md:flex max-w-screen-lg px-4 md:mx-auto mt-12"},t.createElement("label",{className:"block md:flex-grow md:max-w-lg md:mr-10 text-left"},t.createElement("p",null,"Store Address"),t.createElement(N,{className:`${i} w-full mt-3`,placeHolder:"Enter existing (0x…), or deploy new instance.",onChange:v,value:e})),t.createElement("p",{className:"text-center my-4 text-gray-400 md:hidden"},"Or"),t.createElement("div",{className:"w-auto md:w-fit md:ml-auto mt-auto"},t.createElement(d,{onClick:()=>{m(!0),h(""),f("")},className:"text-sm w-full font-medium"},t.createElement("span",null,"Deploy New Instance")))),t.createElement($,{toggleOpen:l},t.createElement("div",{className:"sm:flex sm:items-start w-100 "},t.createElement("div",{className:"w-full mt-3 sm:mt-0 sm:text-left"},t.createElement("h3",{className:"text-lg leading-6 font-medium text-gray-900"},"Deploy Document Store"),t.createElement("div",{className:"w-full mt-10"},t.createElement(N,{className:"w-full",onChange:e=>{f(e)},placeHolder:"Name of organisation.",value:g})))),t.createElement("div",{className:"px-4 pt-5 md:pt-6 pb-3 sm:px-6 sm:flex sm:flex-row-reverse"},t.createElement(d,{onClick:async()=>{if(""!=g){o(!0);const e=await(async(e,t)=>{try{t&&t("Decrypting wallet");const a=await w();t&&t("Wallet successfully decrypted");const n=new s.DocumentStoreFactory(a);return t&&t(`Deploying document store ${e}`),(await n.deploy(e)).deployTransaction.wait()}catch(a){t&&t(a.message)}})(g,h);if(e){const t=await x();h(`Document Store Deployed. Find more details at ${y({network:t})}/address/${e.contractAddress}`),o(!1),a(e.contractAddress),v(e.contractAddress)}else o(!1)}else o(!1)},className:"w-full inline-flex justify-center text-sm font-medium "},c&&t.createElement(b,{className:"w-5 h-5 mr-2"}),"Deploy"),t.createElement(p,{onClick:()=>m(!1),className:"w-full text-sm font-medium mr-5"},"Cancel")),t.createElement("div",{className:"my-3 w-100 h-20"},t.createElement("hr",null),t.createElement("p",{className:"my-2 text-sm text-gray-700"},"Status "),t.createElement("textarea",{className:"w-full h-16 bg-gray-100 p-2 text-sm resize-none overflow-scroll",disabled:!0,value:E}))))},D=l.div`
  margin-top: 20px;

  a {
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
    color: #000000;
    margin-left: 20px;

    &.active {
      color: #ff9933;
      padding-bottom: 5px;
      border-bottom: 2px solid #ff9933;
    }
  }
`;function F(){const[e,a]=t.useState(""),[n,l]=t.useState(!1),s=[{trigger:"issue",text:"Issue Certificates"},{trigger:"revoke",text:"Revoke Certificate"}],[r,m]=t.useState(s[0].trigger);return t.createElement("div",{className:"App"},t.createElement(f,null),t.createElement("div",{className:"container max-w-screen-lg px-4 md:mx-auto mt-16 text-center sm:text-left"},t.createElement("h2",null,"Administrator Portal")),t.createElement(A,{documentStoreAddress:e,setDocumentStoreAddress:a,setDocumentStoreStatus:l}),t.createElement("hr",{className:"mt-16 max-w-screen-lg mx-auto px-4"}),n&&t.createElement(t.Fragment,null,t.createElement(D,{className:"container max-w-screen-lg mx-auto"},s.map((e=>t.createElement("a",{onClick:()=>{m(e.trigger)},className:r===e.trigger?"active":""},e.text)))),"issue"===r&&t.createElement(S,{documentStoreAddress:e}),"revoke"===r&&t.createElement(C,{documentStoreAddress:e})),!n&&t.createElement("p",{className:"text-center mt-14 text-gray-700"},"Please enter valid document store address"))}m.render(t.createElement(t.StrictMode,null,t.createElement(F,null)),document.getElementById("root"));
