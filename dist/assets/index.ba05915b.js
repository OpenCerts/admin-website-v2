import{c as e,r as t,f as a,W as s,n as l,d as n,u as r,a as c}from"./vendor.8a390f04.js";!function(e=".",t="__import__"){try{self[t]=new Function("u","return import(u)")}catch(a){const s=new URL(e,location),l=e=>{URL.revokeObjectURL(e.src),e.remove()};self[t]=e=>new Promise(((a,n)=>{const r=new URL(e,s);if(self[t].moduleMap[r])return a(self[t].moduleMap[r]);const c=new Blob([`import * as m from '${r}';`,`${t}.moduleMap['${r}']=m;`],{type:"text/javascript"}),m=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(c),onerror(){n(new Error(`Failed to import: ${e}`)),l(m)},onload(){a(self[t].moduleMap[r]),l(m)}});document.head.appendChild(m)})),self[t].moduleMap={}}}("/assets/");const m=e`
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

`,o=({children:a,className:s,custom:l,dataTestId:n,onClick:r})=>t.createElement("button",{className:`${s} ${e(m,l)} focus:outline-none`,"data-testid":n,onClick:()=>{r()}},a),i=e`
color: white;
background-color: #ff6a33;
:hover{
  background-color: #DE8B38;
}
`,d=({children:e,className:a,dataTestId:s,onClick:l})=>t.createElement(o,{className:a,custom:i,dataTestId:s,onClick:()=>{l()}},e),u=e`
color: white;
background-color: #878787;
:hover{
  background-color: #616161;
}
`,p=({children:e,className:a,dataTestId:s,onClick:l})=>t.createElement(o,{className:a,custom:u,dataTestId:s,onClick:()=>{l()}},e);const w=async()=>(await(async()=>(await window.ethereum.enable(),new s(window.ethereum)))()).getSigner(),g=async()=>{const e=await w();return(await e.provider.getNetwork()).name},x=l.div`
  flex-basis: 100%;
`,f=()=>{const[e,s]=t.useState(!1),[l,n]=t.useState("-"),[r,c]=t.useState("-"),[m,o]=t.useState("-");t.useEffect((()=>{window.ethereum.on("accountsChanged",(function(e){e.length>0&&i()})),window.ethereum.on("chainChanged",(function(){i()})),window.ethereum.on("connect",(function(e){i()}))}));const i=async()=>{const e=await(async()=>{const e=await w();return{address:await e.getAddress(),balance:a(await e.getBalance()),network:(await e.provider.getNetwork()).name}})();n(e.address),c(e.network),o(e.balance),s(!0)};return window.ethereum.isConnected()&&i(),t.createElement("div",{className:"shadow-md flex flex-wrap items-center text-sm px-4 py-2 "},t.createElement("div",{className:"mx-auto my-4 lg:my-0"},t.createElement("a",{href:"https://admin.opencerts.io/"},t.createElement("img",{className:"img-fluid h-12",src:"/assets/logo.df95d683.svg",alt:"OpenCert"}))),t.createElement(x,{className:"lg:hidden"}),t.createElement("div",{className:"flex flex-wrap mx-auto items-center"},e&&t.createElement(t.Fragment,null,t.createElement("div",{className:"w-auto mb-4 lg:mb-0"},t.createElement("p",{className:"font-medium"},"Current Account"),t.createElement("p",{className:"break-all"},l)),t.createElement(x,{className:"md:hidden"}),t.createElement("div",{className:"w-auto md:ml-12 mb-4 lg:mb-0"},t.createElement("p",{className:"font-medium"},"Network"),t.createElement("p",{className:"capitalize"},r)),t.createElement(x,{className:"md:hidden"}),t.createElement("div",{className:"w-auto md:ml-12 mb-4 lg:mb-0"},t.createElement("p",{className:"font-medium"},"Account Balance"),t.createElement("p",null,m," ETH"))),!e&&t.createElement(d,{onClick:i,className:"text-sm font-medium",dataTestId:"connectToWallet"},"Connect Metamask")))},E=l.div`
  input {
    padding: 10px 20px;
    border-radius: 5px;
    border: 2px solid #848484;
  }

  .valid {
    border-color: #22b43a;
  }

  .invalid {
    border-color: #ed7c7c;
  }
`,h=({className:a,custom:s,placeHolder:l,onChange:n,value:r,dataTestId:c})=>t.createElement(E,null,t.createElement("input",{className:`${e(s)} ${a} `,placeholder:l,onChange:({target:{value:e}})=>n(""===e?"":e),value:r,"data-testid":c})),N=e`
  border-top-color: #3498db;
`,v=({className:a})=>t.createElement("div",{className:`animate-spin loader ease-linear rounded-full border-4 border-t-4 border-gray-200 ${a} ${e(N)}`}),b=({network:e})=>`https://${"Homestead"===e?"":`${e}.`}etherscan.io`,y=e=>/^0x[a-fA-F0-9]{64}$/.test(e),k=({documentStoreAddress:e})=>{const[a,s]=t.useState(!1),[l,r]=t.useState(""),[c,m]=t.useState(""),[o,i]=t.useState(""),[u,p]=t.useState(""),[x,f]=t.useState(""),E=async()=>{if(f(""),p(""),""!==c&&"valid"===l){s(!0);const t=await(async(e,t,a)=>{try{const s=await n.connect(e,await w());a&&a("Sending transaction to pool");const l=await s.issue(t);return a&&a(`Waiting for transaction ${t} to be mined`),l.wait()}catch(s){a&&a(s.message)}})(e,c,i);t&&(f(`Document/Document Batch with hash ${c} has been issued on ${e}`),i(`Find more details at ${b({network:await g()})}/tx/${t.transactionHash}`))}else p("*Please enter valid merkle root hash.");s(!1)};return t.createElement(t.Fragment,null,t.createElement("div",{className:"md:flex max-w-screen-lg px-4 mx-auto mt-12"},t.createElement("label",{className:"max-w-lg w-full text-left"},t.createElement("p",null,"Issue certificates with the Merkle Root Hash"),t.createElement(h,{className:`${l} w-full mt-3`,placeHolder:"0x...",onChange:e=>{""===e?r(""):y(e)?(m(e),r("valid")):(m(""),r("invalid"))},dataTestId:"issue-certificate"})),t.createElement("div",{className:"w-auto md:w-fit md:ml-auto mt-auto"},t.createElement(d,{onClick:()=>E(),className:"w-full inline-flex justify-center text-sm font-medium",dataTestId:"issue-certificate-btn"},a&&t.createElement(v,{className:"w-5 h-5 mr-2"}),t.createElement("span",null,"Issue Certificate Batch")))),t.createElement("div",{className:"max-w-screen-lg px-4 mx-auto"},t.createElement("p",{className:"text-red-600 break-all","data-testid":"error-message"},u),t.createElement("p",{className:"text-green-600 break-all","data-testid":"success-message"},x)),t.createElement("div",{className:"w-100 h-20 max-w-screen-lg px-4 mt-6 mx-auto "},t.createElement("p",{className:"my-2 text-sm text-gray-700"},"Status "),t.createElement("textarea",{className:"w-full h-16 bg-gray-100 p-2 text-sm resize-none overflow-scroll",disabled:!0,"data-testid":"issue-log",value:o})))},S=({documentStoreAddress:e})=>{const[a,s]=t.useState(!1),[l,r]=t.useState(""),[c,m]=t.useState(""),[o,i]=t.useState(""),[u,p]=t.useState(""),[x,f]=t.useState(""),E=async()=>{if(p(""),f(""),""!==c&&"valid"===l)if(confirm("Are you sure you want to revoke this hash?")){s(!0);const t=await(async(e,t,a)=>{try{const s=await n.connect(e,await w());a&&a("Sending transaction to pool");const l=await s.revoke(t);return a&&a(`Waiting for transaction ${t} to be mined`),l.wait()}catch(s){a&&a(s.message)}})(e,c,i);t&&(f(`Document/Document Batch with hash ${c} has been revoked on ${e}`),i(`Find more details at ${b({network:await g()})}/tx/${t.transactionHash}`))}else i("Revoke certificate hash cancelled.");else p("*Please enter valid merkle root hash.");s(!1)};return t.createElement(t.Fragment,null,t.createElement("div",{className:"md:flex max-w-screen-lg px-4 mx-auto mt-12"},t.createElement("label",{className:"max-w-lg w-full text-left"},t.createElement("p",null,"Certificate hash to revoke"),t.createElement(h,{className:`${l} w-full mt-3`,placeHolder:"0x...",dataTestId:"revoke-certificate",onChange:e=>{""===e?r(""):y(e)?(m(e),r("valid")):(m(""),r("invalid"))}})),t.createElement("div",{className:"w-auto md:w-fit md:ml-auto mt-auto"},t.createElement(d,{onClick:()=>E(),className:"tw-full inline-flex justify-center text-sm font-medium",dataTestId:"revoke-certificate-btn"},a&&t.createElement(v,{className:"w-5 h-5 mr-2"}),t.createElement("span",null,"Revoke")))),t.createElement("div",{className:"max-w-screen-lg px-4 mx-auto"},t.createElement("p",{className:"text-red-600 break-all","data-testid":"error-message"},u),t.createElement("p",{className:"text-green-600 break-all","data-testid":"success-message"},x)),t.createElement("div",{className:"w-100 h-20 max-w-screen-lg px-4 mt-6 mx-auto "},t.createElement("p",{className:"my-2 text-sm text-gray-700"},"Status "),t.createElement("textarea",{className:"w-full h-16 bg-gray-100 p-2 text-sm resize-none overflow-scroll",disabled:!0,"data-testid":"revoke-log",value:o})))},C=({toggleOpen:e,children:a})=>t.createElement("div",{className:"fixed z-10 inset-0 overflow-y-auto ease-in-out duration-700 opacity-0 "+(e?"opacity-100 visible":"invisible")},t.createElement("div",{className:"flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"},t.createElement("div",{className:"fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"}),t.createElement("span",{className:"hidden sm:inline-block sm:align-middle sm:h-screen","aria-hidden":"true"},"​"),t.createElement("div",{className:"flex self-center md:inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"},t.createElement("div",{className:"bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4"},a)))),$=({documentStoreAddress:e,setDocumentStoreAddress:a,setDocumentStoreStatus:s})=>{const[l,c]=t.useState(!1),[m,o]=t.useState(!1),[i,u]=t.useState(""),[x,f]=t.useState(""),[E,N]=t.useState(""),y=e=>{a(e),""===e?u(""):r.isAddress(e)?(s(!0),u("valid")):(s(!1),u("invalid"))};return t.createElement(t.Fragment,null,t.createElement("div",{className:"md:flex max-w-screen-lg px-4 mt-12 mx-auto"},t.createElement("label",{className:"max-w-lg w-full text-left"},t.createElement("p",null,"Store Address"),t.createElement(h,{className:`${i} w-full mt-3`,placeHolder:"Enter existing (0x…), or deploy new instance.",onChange:y,value:e,dataTestId:"document-store"})),t.createElement("p",{className:"text-center my-4 text-gray-400 md:hidden"},"Or"),t.createElement("div",{className:"md:ml-auto mt-auto"},t.createElement(d,{onClick:()=>{c(!0),f("")},className:"text-sm w-full font-medium"},t.createElement("span",null,"Deploy New Instance")))),t.createElement(C,{toggleOpen:l},t.createElement("div",{className:"sm:items-start w-full"},t.createElement("h3",{className:"text-lg leading-6 font-medium text-gray-900"},"Deploy Document Store"),t.createElement(h,{className:"w-full mt-3",onChange:e=>f(e),placeHolder:"Name of organisation.",value:x})),t.createElement("div",{className:"sm:flex pt-5"},t.createElement(p,{onClick:()=>c(!1),className:"w-full mr-5 text-sm font-medium"},"Cancel"),t.createElement(d,{onClick:async()=>{if(""!==x){o(!0);const e=await(async(e,t)=>{try{t&&t("Decrypting wallet");const a=await w();t&&t("Wallet successfully decrypted");const s=new n.DocumentStoreFactory(a);return t&&t(`Deploying document store ${e}`),(await s.deploy(e)).deployTransaction.wait()}catch(a){t&&t(a.message)}})(x,N);if(e){const t=await g();N(`Document Store Deployed. Find more details at ${b({network:t})}/address/${e.contractAddress}`),y(e.contractAddress),c(!1)}}o(!1)},className:"w-full inline-flex justify-center text-sm font-medium"},m&&t.createElement(v,{className:"w-5 h-5 mr-2"}),"Deploy")),t.createElement("div",{className:"w-100 mt-3 text-sm "},t.createElement("hr",null),t.createElement("p",{className:"my-2 text-gray-700"},"Status "),t.createElement("textarea",{className:"w-full h-16 bg-gray-100 p-2 resize-none overflow-scroll",disabled:!0,value:E}))))},A=l.div`
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
`;function D(){const[e,a]=t.useState(""),[s,l]=t.useState(!1),n=[{trigger:"issue",text:"Issue Certificates"},{trigger:"revoke",text:"Revoke Certificate"}],[r,c]=t.useState(n[0].trigger);return t.createElement("div",{className:"App"},t.createElement(f,null),t.createElement("div",{className:"container max-w-screen-lg px-4 md:mx-auto mt-16 text-center sm:text-left"},t.createElement("h2",null,"Administrator Portal")),t.createElement($,{documentStoreAddress:e,setDocumentStoreAddress:a,setDocumentStoreStatus:l}),t.createElement("hr",{className:"mt-16 max-w-screen-lg mx-auto px-4"}),s&&t.createElement(t.Fragment,null,t.createElement(A,{className:"container max-w-screen-lg mx-auto"},n.map((e=>t.createElement("a",{onClick:()=>{c(e.trigger)},"data-testid":`show-${e.trigger}-btn`,className:r===e.trigger?"active":""},e.text)))),"issue"===r&&t.createElement(k,{documentStoreAddress:e}),"revoke"===r&&t.createElement(S,{documentStoreAddress:e})),!s&&t.createElement("p",{className:"text-center mt-14 text-gray-700"},"Please enter valid document store address"))}c.render(t.createElement(t.StrictMode,null,t.createElement(D,null)),document.getElementById("root"));
