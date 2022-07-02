"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[799],{3744:(e,t)=>{t.Z=(e,t)=>{const o=e.__vccOpts||e;for(const[e,r]of t)o[e]=r;return o}},799:(e,t,o)=>{o.r(t),o.d(t,{default:()=>y});var r=o(821),a={class:"addProduct"},n={class:"side"},l={class:"input-group"},c={for:"productname"},i=["placeholder"],d={class:"input-group"},u={for:"details"},s=["placeholder"],p={class:"input-group"},m={for:"price"},f=["placeholder"],h={class:"input-group"},g={for:"code"},v={class:"input-group"},N={for:"thumbnail"},V=["value"],E=(0,r.createElementVNode)("br",null,null,-1);const b={components:{Sidebar:function(){return o.e(404).then(o.bind(o,9404))}},data:function(){return{user:JSON.parse(localStorage.getItem("wiresPOSUser")),cats:[],form:{productName:"",productDetails:"",productPrice:null,category:this.$route.params.cat_id,code:"",store:JSON.parse(localStorage.getItem("wiresPOSUser")).store,thumbnail:null}}},mounted:function(){var e=this;this.form.code=(new Date).getTime(),axios.get("/api/categories").then((function(t){e.cats=t.data})).catch((function(e){return console.log(e)}))},methods:{onFileChange:function(e){var t=e.target.files||e.dataTransfer.files;t.length&&(this.form.thumbnail=t[0])},addProduct:function(){var e=new FormData;e.append("thumbnail",this.form.thumbnail,this.form.thumbnail.name);var t=JSON.stringify({productName:this.form.productName,productDetails:this.form.productDetails,productPrice:this.form.productPrice,category:this.form.category,code:this.form.code,store:this.form.store});e.append("data",t);var o={headers:{"content-type":"multipart/form-data",token:this.user.token}};axios.post("/api/add-product",e,o).then((function(e){alert("Done"),location.reload()})).catch((function(e){console.log(e)}))}}};const y=(0,o(3744).Z)(b,[["render",function(e,t,o,b,y,D){var S=(0,r.resolveComponent)("Sidebar");return(0,r.openBlock)(),(0,r.createElementBlock)("div",{class:(0,r.normalizeClass)("app-".concat(e.$i18n.locale))},[(0,r.createElementVNode)("div",a,[(0,r.createVNode)(S),(0,r.createElementVNode)("div",n,[(0,r.createElementVNode)("h3",null,(0,r.toDisplayString)(e.$t("new-product")),1),(0,r.createElementVNode)("form",{method:"POST",onSubmit:t[5]||(t[5]=(0,r.withModifiers)((function(){return D.addProduct&&D.addProduct.apply(D,arguments)}),["prevent"]))},[(0,r.createElementVNode)("div",l,[(0,r.createElementVNode)("label",c,(0,r.toDisplayString)(e.$t("product-name")),1),(0,r.withDirectives)((0,r.createElementVNode)("input",{type:"text",placeholder:e.$t("product-name"),id:"productname","onUpdate:modelValue":t[0]||(t[0]=function(e){return y.form.productName=e})},null,8,i),[[r.vModelText,y.form.productName]])]),(0,r.createElementVNode)("div",d,[(0,r.createElementVNode)("label",u,(0,r.toDisplayString)(e.$t("product-details")),1),(0,r.withDirectives)((0,r.createElementVNode)("textarea",{placeholder:e.$t("product-details"),id:"details",rows:"7","onUpdate:modelValue":t[1]||(t[1]=function(e){return y.form.productDetails=e})},null,8,s),[[r.vModelText,y.form.productDetails]])]),(0,r.createElementVNode)("div",p,[(0,r.createElementVNode)("label",m,(0,r.toDisplayString)(e.$t("price")),1),(0,r.withDirectives)((0,r.createElementVNode)("input",{type:"number",step:"0.1",min:"1",placeholder:e.$t("price"),id:"price","onUpdate:modelValue":t[2]||(t[2]=function(e){return y.form.productPrice=e}),autocomplete:"off"},null,8,f),[[r.vModelText,y.form.productPrice]])]),(0,r.createElementVNode)("div",h,[(0,r.createElementVNode)("label",g,(0,r.toDisplayString)(e.$t("code")),1),(0,r.withDirectives)((0,r.createElementVNode)("input",{type:"text",id:"code",placeholder:"Code","onUpdate:modelValue":t[3]||(t[3]=function(e){return y.form.code=e})},null,512),[[r.vModelText,y.form.code]])]),(0,r.createElementVNode)("div",v,[(0,r.createElementVNode)("label",N,(0,r.toDisplayString)(e.$t("image")),1),(0,r.createElementVNode)("input",{type:"file",id:"thumbnail",onChange:t[4]||(t[4]=function(){return D.onFileChange&&D.onFileChange.apply(D,arguments)})},null,32)]),(0,r.createElementVNode)("input",{type:"submit",class:"save",value:e.$t("save-changes")},null,8,V)],32),E])])],2)}]])}}]);