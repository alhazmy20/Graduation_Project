"use strict";(self.webpackChunk_strapi_admin=self.webpackChunk_strapi_admin||[]).push([[3981],{83119:function(M,y){const o=()=>null;y.Z=o},12016:function(M,y,o){o.r(y),o.d(y,{default:function(){return de}});var e=o(32735),f=o(5636),c=o(83292),L=o(99357),H=o(5141),i=o(13478),n=o(39161),P=o.p+"7e9af4fb7e723fcebf1f.svg",w=o(8888),R=t=>Object.entries(t).every(([,r])=>Object.entries(r).every(([,a])=>a)),d=o(57269),G=o(60216),l=o.n(G),I=o(14317),j=o(78024),p=o(23678);const b=({type:t,title:r,number:a,content:s,hasLine:m})=>{const{formatMessage:h}=(0,f.useIntl)();return e.createElement(n.Box,null,e.createElement(n.Flex,null,e.createElement(n.Box,{minWidth:(0,i.pxToRem)(30),marginRight:5},e.createElement(I.Z,{type:t,number:a})),e.createElement(n.Typography,{variant:"delta",as:"h3"},h(r))),e.createElement(n.Flex,{alignItems:"flex-start"},e.createElement(n.Flex,{justifyContent:"center",minWidth:(0,i.pxToRem)(30),marginBottom:3,marginTop:3,marginRight:5},m&&e.createElement(j.Z,{type:t,minHeight:t===p.lW?(0,i.pxToRem)(85):(0,i.pxToRem)(65)})),e.createElement(n.Box,{marginTop:2},t===p.lW&&s)))};b.defaultProps={content:void 0,number:void 0,type:p.VM,hasLine:!0},b.propTypes={content:l().node,number:l().number,title:l().shape({id:l().string,defaultMessage:l().string}).isRequired,type:l().oneOf([p.lW,p.hx,p.VM]),hasLine:l().bool};var W=b;const F=(t,r)=>t===-1||r<t?p.hx:r>t?p.VM:p.lW,C=({sections:t,currentSectionKey:r})=>{const a=t.findIndex(s=>s.key===r);return e.createElement(n.Box,null,t.map((s,m)=>e.createElement(W,{key:s.key,title:s.title,content:s.content,number:m+1,type:F(a,m),hasLine:m!==t.length-1})))};C.defaultProps={currentSectionKey:void 0},C.propTypes={sections:l().arrayOf(l().shape({key:l().string.isRequired,title:l().shape({id:l().string,defaultMessage:l().string}).isRequired,content:l().node})).isRequired,currentSectionKey:l().string};var D=C,O=o(58107),A=()=>{const{guidedTourState:t,setSkipped:r}=(0,i.useGuidedTour)(),{formatMessage:a}=(0,f.useIntl)(),{trackUsage:s}=(0,i.useTracking)(),m=Object.entries(O.Z).map(([u,g])=>({key:u,title:g.home.title,content:e.createElement(i.LinkButton,{onClick:()=>s(g.home.trackingEvent),to:g.home.cta.target,endIcon:e.createElement(d.ArrowRight,null)},a(g.home.cta.title))})),B=m.map(u=>({isDone:Object.entries(t[u.key]).every(([,g])=>g),...u})).find(u=>!u.isDone)?.key,T=()=>{r(!0),s("didSkipGuidedtour")};return e.createElement(n.Box,{hasRadius:!0,shadow:"tableShadow",paddingTop:7,paddingRight:4,paddingLeft:7,paddingBottom:4,background:"neutral0"},e.createElement(n.Stack,{spacing:6},e.createElement(n.Typography,{variant:"beta",as:"h2"},a({id:"app.components.GuidedTour.title",defaultMessage:"3 steps to get started"})),e.createElement(D,{sections:m,currentSectionKey:B})),e.createElement(n.Flex,{justifyContent:"flex-end"},e.createElement(n.Button,{variant:"tertiary",onClick:T},a({id:"app.components.GuidedTour.skip",defaultMessage:"Skip the tour"}))))},Z=o(95489),x=o(41502);const z=(0,c.default)(d.Discord)`
  path {
    fill: #7289da !important;
  }
`,$=(0,c.default)(d.Reddit)`
  > path:first-child {
    fill: #ff4500;
  }
`,v=(0,c.default)(d.Strapi)`
  > path:first-child {
    fill: #4945ff;
  }
  > path:nth-child(2) {
    fill: #fff;
  }
  > path:nth-child(4) {
    fill: #9593ff;
  }
`,N=(0,c.default)(d.Twitter)`
  path {
    fill: #1da1f2 !important;
  }
`,V=(0,c.default)(d.Discourse)`
  > path:first-child {
    fill: #231f20;
  }
  > path:nth-child(2) {
    fill: #fff9ae;
  }
  > path:nth-child(3) {
    fill: #00aeef;
  }
  > path:nth-child(4) {
    fill: #00a94f;
  }
  > path:nth-child(5) {
    fill: #f15d22;
  }
  > path:nth-child(6) {
    fill: #e31b23;
  }
`,K=[{name:{id:"app.components.HomePage.community.links.github",defaultMessage:"Github"},link:"https://github.com/strapi/strapi/",icon:e.createElement(d.Github,{fill:"#7289DA"}),alt:"github"},{name:{id:"app.components.HomePage.community.links.discord",defaultMessage:"Discord"},link:"https://discord.strapi.io/",icon:e.createElement(z,null),alt:"discord"},{name:{id:"app.components.HomePage.community.links.reddit",defaultMessage:"Reddit"},link:"https://www.reddit.com/r/Strapi/",icon:e.createElement($,null),alt:"reddit"},{name:{id:"app.components.HomePage.community.links.twitter",defaultMessage:"Twitter"},link:"https://twitter.com/strapijs",icon:e.createElement(N,null),alt:"twitter"},{name:{id:"app.components.HomePage.community.links.forum",defaultMessage:"Forum"},link:"https://forum.strapi.io",icon:e.createElement(V,null),alt:"forum"},{name:{id:"app.components.HomePage.community.links.blog",defaultMessage:"Blog"},link:"https://strapi.io/blog?utm_source=referral&utm_medium=admin&utm_campaign=career%20page",icon:e.createElement(v,null),alt:"blog"},{name:{id:"app.components.HomePage.community.links.career",defaultMessage:"We are hiring!"},link:"https://strapi.io/careers?utm_source=referral&utm_medium=admin&utm_campaign=blog",icon:e.createElement(v,null),alt:"career"}],U=(0,c.default)(Z.Q)`
  display: flex;
  align-items: center;
  border: none;

  svg {
    width: ${({theme:t})=>t.spaces[6]};
    height: ${({theme:t})=>t.spaces[6]};
  }

  span {
    word-break: keep-all;
  }
`,J=(0,c.default)(n.Grid)`
  row-gap: ${({theme:t})=>t.spaces[2]};
  column-gap: ${({theme:t})=>t.spaces[4]};
`;var Q=()=>{const{formatMessage:t}=(0,f.useIntl)(),{communityEdition:r}=(0,i.useAppInfos)(),a=[...K,{icon:e.createElement(v,null),link:r?"https://discord.strapi.io":"https://support.strapi.io/support/home",name:{id:"Settings.application.get-help",defaultMessage:"Get help"}}];return e.createElement(n.Box,{as:"aside","aria-labelledby":"join-the-community",background:"neutral0",hasRadius:!0,paddingRight:5,paddingLeft:5,paddingTop:6,paddingBottom:6,shadow:"tableShadow"},e.createElement(n.Box,{paddingBottom:7},e.createElement(n.Stack,{spacing:5},e.createElement(n.Stack,{spacing:3},e.createElement(n.Typography,{variant:"delta",as:"h2",id:"join-the-community"},t({id:"app.components.HomePage.community",defaultMessage:"Join the community"})),e.createElement(n.Typography,{textColor:"neutral600"},t({id:"app.components.HomePage.community.content",defaultMessage:"Discuss with team members, contributors and developers on different channels"}))),e.createElement(x.r,{href:"https://feedback.strapi.io/",isExternal:!0,endIcon:e.createElement(d.ExternalLink,null)},t({id:"app.components.HomePage.roadmap",defaultMessage:"See our road map"})))),e.createElement(J,null,a.map(({icon:s,link:m,name:h})=>e.createElement(n.GridItem,{col:6,s:12,key:h},e.createElement(U,{size:"L",startIcon:s,variant:"tertiary",href:m,isExternal:!0},t(h))))))};const Y=(0,c.default)(n.Typography)`
  word-break: break-word;
`,X=(0,c.default)(n.Stack)`
  align-items: flex-start;
`,S=({hasCreatedContentType:t,onCreateCT:r})=>{const{formatMessage:a}=(0,f.useIntl)();return e.createElement("div",null,e.createElement(n.Box,{paddingLeft:6,paddingBottom:10},e.createElement(X,{spacing:5},e.createElement(n.Typography,{as:"h1",variant:"alpha"},a(t?{id:"app.components.HomePage.welcome.again",defaultMessage:"Welcome \u{1F44B}"}:{id:"app.components.HomePage.welcome",defaultMessage:"Welcome on board!"})),e.createElement(Y,{textColor:"neutral600",variant:"epsilon"},a(t?{id:"app.components.HomePage.welcomeBlock.content.again",defaultMessage:"We hope you are making progress on your project! Feel free to read the latest news about Strapi. We are giving our best to improve the product based on your feedback."}:{id:"app.components.HomePage.welcomeBlock.content",defaultMessage:"Congrats! You are logged as the first administrator. To discover the powerful features provided by Strapi, we recommend you to create your first Content type!"})),t?e.createElement(x.r,{isExternal:!0,href:"https://strapi.io/blog"},a({id:"app.components.HomePage.button.blog",defaultMessage:"See more on the blog"})):e.createElement(n.Button,{size:"L",onClick:r,endIcon:e.createElement(d.ArrowRight,null)},a({id:"app.components.HomePage.create",defaultMessage:"Create your first Content type"})))))};S.defaultProps={hasCreatedContentType:void 0,onCreateCT:void 0},S.propTypes={hasCreatedContentType:l().bool,onCreateCT:l().func};var q=S,_=o.p+"27d16aefee06412db90a.png",ee=o.p+"bb3108f7fd1e6179bde1.svg",te=o.p+"bb4d0d527bdfb161bc5a.svg";const ne=c.default.a`
  text-decoration: none;
`,oe=(0,c.default)(n.Box)`
  background-image: url(${({backgroundImage:t})=>t});
`,ae=(0,c.default)(n.Flex)`
  background: rgba(255, 255, 255, 0.3);
`;var re=()=>{const{formatMessage:t}=(0,f.useIntl)(),{trackUsage:r}=(0,i.useTracking)();return e.createElement(ne,{href:"https://cloud.strapi.io",target:"_blank",rel:"noopener noreferrer nofollow",onClick:()=>{r("didClickOnTryStrapiCloudSection")}},e.createElement(n.Flex,{shadow:"tableShadow",hasRadius:!0,padding:6,background:"neutral0",position:"relative",gap:6},e.createElement(oe,{backgroundImage:_,hasRadius:!0,padding:3},e.createElement(ae,{width:(0,i.pxToRem)(32),height:(0,i.pxToRem)(32),justifyContent:"center",hasRadius:!0,alignItems:"center"},e.createElement("img",{src:ee,alt:t({id:"app.components.BlockLink.cloud",defaultMessage:"Strapi Cloud"})}))),e.createElement(n.Flex,{gap:1,direction:"column",alignItems:"start"},e.createElement(n.Flex,null,e.createElement(n.Typography,{fontWeight:"semiBold",variant:"pi"},t({id:"app.components.BlockLink.cloud",defaultMessage:"Strapi Cloud"}))),e.createElement(n.Typography,{textColor:"neutral600"},t({id:"app.components.BlockLink.cloud.content",defaultMessage:"A fully composable, and collaborative platform to boost your team velocity."})),e.createElement(n.Box,{src:te,position:"absolute",top:0,right:0,as:"img"}))))};const E=c.default.a`
  text-decoration: none;
`;var ie=()=>{const{formatMessage:t}=(0,f.useIntl)(),{trackUsage:r}=(0,i.useTracking)(),a=s=>{r(s)};return e.createElement(n.Stack,{spacing:5},e.createElement(re,null),e.createElement(E,{href:"https://strapi.io/resource-center",target:"_blank",rel:"noopener noreferrer nofollow",onClick:()=>a("didClickonReadTheDocumentationSection")},e.createElement(i.ContentBox,{title:t({id:"global.documentation",defaultMessage:"Documentation"}),subtitle:t({id:"app.components.BlockLink.documentation.content",defaultMessage:"Discover the essential concepts, guides and instructions."}),icon:e.createElement(d.InformationSquare,null),iconBackground:"primary100"})),e.createElement(E,{href:"https://strapi.io/starters",target:"_blank",rel:"noopener noreferrer nofollow",onClick:()=>a("didClickonCodeExampleSection")},e.createElement(i.ContentBox,{title:t({id:"app.components.BlockLink.code",defaultMessage:"Code example"}),subtitle:t({id:"app.components.BlockLink.code.content",defaultMessage:"Learn by using ready-made starters for your projects."}),icon:e.createElement(d.CodeSquare,null),iconBackground:"warning100"})),e.createElement(E,{href:"https://strapi.io/blog/categories/tutorials",target:"_blank",rel:"noopener noreferrer nofollow",onClick:()=>a("didClickonTutorialSection")},e.createElement(i.ContentBox,{title:t({id:"app.components.BlockLink.tutorial",defaultMessage:"Tutorials"}),subtitle:t({id:"app.components.BlockLink.tutorial.content",defaultMessage:"Follow step-by-step instructions to use and customize Strapi."}),icon:e.createElement(d.PlaySquare,null),iconBackground:"secondary100"})),e.createElement(E,{href:"https://strapi.io/blog",target:"_blank",rel:"noopener noreferrer nofollow",onClick:()=>a("didClickonBlogSection")},e.createElement(i.ContentBox,{title:t({id:"app.components.BlockLink.blog",defaultMessage:"Blog"}),subtitle:t({id:"app.components.BlockLink.blog.content",defaultMessage:"Read the latest news about Strapi and the ecosystem."}),icon:e.createElement(d.FeatherSquare,null),iconBackground:"alternative100"})))};const le=(()=>window&&window.strapi&&window.strapi.isEE?o(21306).Z:o(83119).Z)(),se=(0,c.default)(n.Box).withConfig({displayName:"HomePage__LogoContainer",componentId:"sc-1md9zz4-0"})(["position:absolute;top:0;right:0;img{width:","rem;}"],150/16),ce=()=>{const{collectionTypes:t,singleTypes:r,isLoading:a}=(0,w.bP)(),{guidedTourState:s,isGuidedTourVisible:m,isSkipped:h}=(0,i.useGuidedTour)();le();const B=!R(s)&&m&&!h,{push:T}=(0,H.useHistory)(),u=k=>{k.preventDefault(),T("/plugins/content-type-builder/content-types/create-content-type")},g=(0,e.useMemo)(()=>{const k=me=>me.filter(pe=>pe.isDisplayed);return k(t).length>1||k(r).length>0},[t,r]);return a?e.createElement(i.LoadingIndicatorPage,null):e.createElement(n.Layout,null,e.createElement(f.FormattedMessage,{id:"HomePage.helmet.title",defaultMessage:"Homepage"},k=>e.createElement(L.Helmet,{title:k[0]})),e.createElement(n.Main,null,e.createElement(se,null,e.createElement("img",{alt:"","aria-hidden":!0,src:P})),e.createElement(n.Box,{padding:10},e.createElement(n.Grid,null,e.createElement(n.GridItem,{col:8,s:12},e.createElement(q,{onCreateCT:u,hasCreatedContentType:g}))),e.createElement(n.Grid,{gap:6},e.createElement(n.GridItem,{col:8,s:12},B?e.createElement(A,null):e.createElement(ie,null)),e.createElement(n.GridItem,{col:4,s:12},e.createElement(Q,null))))))};var de=(0,e.memo)(ce)}}]);
