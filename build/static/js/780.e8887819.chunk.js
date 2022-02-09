"use strict";(self.webpackChunkmy_app=self.webpackChunkmy_app||[]).push([[780],{3780:function(s,t,e){e.r(t),e.d(t,{default:function(){return $}});var a=e(1413),i=e(5671),o=e(3144),r=e(136),n=e(3668),u=e(2791),l={background:"Profile_background__v5xuG"},c=e(6596),d="ProfileInfo_name__nzLXx",p="ProfileInfo_aboutMe__l7xQO",f="ProfileInfo_job__4-3LH",h="ProfileInfo_description__u7GZ5",_="ProfileInfo_ava__Zv058",x="ProfileInfo_circle__rrF53",P=e(3560),m=e(885),j="ProfileStatus_status__-xoik",v="ProfileStatus_editStatus__eytKj",N=e(184),g=function(s){var t=(0,u.useState)(!1),e=(0,m.Z)(t,2),a=e[0],i=e[1],o=(0,u.useState)(s.status),r=(0,m.Z)(o,2),n=r[0],l=r[1];(0,u.useEffect)((function(){l(s.status)}),[s.status]);return(0,N.jsxs)("div",{children:[!a&&(0,N.jsx)("div",{className:j,children:(0,N.jsx)("p",{onDoubleClick:function(){i(!0)},children:s.status||"-----"})}),a&&(0,N.jsx)("div",{className:v,children:(0,N.jsx)("input",{autoFocus:!0,onBlur:function(){i(!1),s.updateStatus(n)},onChange:function(s){l(s.currentTarget.value)},value:n})})]})},w=function(s){var t=s.profile,e=s.status,a=s.updateStatus,i=s.isOwner,o=s.savePhoto;if(!t)return(0,N.jsx)(P.Z,{});return(0,N.jsxs)("div",{children:[(0,N.jsx)("div",{className:_,children:(0,N.jsx)("img",{src:null!=t.photos.small?t.photos.small:c,className:x,alt:"profilePicture"})}),(0,N.jsxs)("div",{className:h,children:[(0,N.jsx)("p",{className:d,children:t.fullName}),(0,N.jsx)(g,{status:e,updateStatus:a}),(0,N.jsx)("p",{className:p,children:t.aboutMe}),(0,N.jsx)("p",{className:f,children:t.lookingForAJobDescription}),i&&(0,N.jsx)("input",{onChange:function(s){s.target.files.length&&o(s.target.files[0])},type:"file"})]})]})},b="MyPosts_box__bfQAZ",k="MyPosts_title__Ln5To",y="MyPosts_form__hrebz",S="MyPosts_button__TKXtI",I="MyPosts_addPostInput__dAfsT",Z="MyPosts_postreq__U5tpU",M="NewPost_new__vThmF",C="NewPost_postBlock__COEfq",T="NewPost_text__eZLh5",U="NewPost_likes__y8GJW",L="NewPost_likesCount__198qo",O="NewPost_ava__4LY6w",A=e(7151),q=function(s){return(0,N.jsx)("div",{children:(0,N.jsx)("div",{className:M,children:(0,N.jsxs)("div",{className:C,children:[(0,N.jsx)("div",{className:O,children:(0,N.jsx)("img",{src:c,alt:"profilePicture"})}),(0,N.jsx)("p",{className:T,children:s.text}),(0,N.jsxs)("div",{className:U,children:[(0,N.jsx)("img",{src:A,alt:"finger"}),(0,N.jsxs)("p",{className:L,children:["Likes Count: ",s.likes]})]})]})})})},z=e(6864),D=e(4820),F=u.memo((function(s){var t=s.postText.map((function(s){return(0,N.jsx)(q,{text:s.text,likes:s.likes},s.id)}));return(0,N.jsx)("div",{children:(0,N.jsxs)("div",{className:b,children:[(0,N.jsx)("p",{className:k,children:"My Posts"}),(0,N.jsx)(G,{addPost:s.addPost}),t]})})})),G=function(s){return(0,N.jsx)(z.J9,{initialValues:{newPost:""},validationSchema:D.MR,onSubmit:function(t){s.addPost(t.newPost)},children:function(s){var t=s.errors,e=s.touched;return(0,N.jsxs)(z.l0,{className:y,children:[(0,N.jsxs)("div",{className:I,children:[(0,D.Gr)("New Post","newPost","text",D.MR),t.newPost&&e.newPost?(0,N.jsx)("p",{className:Z,children:t.newPost}):null]}),(0,N.jsx)("button",{className:S,type:"submit",children:"New Post"})]})}})},J=F,R=e(6508),B=e(364),E=(0,B.$j)((function(s){return{postText:s.profilePage.postText,newPostText:s.profilePage.newPostText}}),(function(s){return{addPost:function(t){s((0,R.Wl)(t))}}}))(J),K=function(s){return(0,N.jsxs)("div",{children:[(0,N.jsx)("div",{className:l.background,children:(0,N.jsx)("div",{className:l.center,children:(0,N.jsx)(w,{isOwner:s.isOwner,savePhoto:s.savePhoto,profile:s.profile,status:s.status,updateStatus:s.updateStatus})})}),(0,N.jsx)(E,{})]})},Q=e(1045),W=e(7781),X=function(s){(0,r.Z)(e,s);var t=(0,n.Z)(e);function e(){return(0,i.Z)(this,e),t.apply(this,arguments)}return(0,o.Z)(e,[{key:"refreshProfile",value:function(){var s=this.props.match.params.userId;s||(s=this.props.authorizedUserId)||this.props.history.push("/login"),this.props.getUserProfile(s),this.props.getStatus(s)}},{key:"componentDidMount",value:function(){this.refreshProfile()}},{key:"componentDidUpdate",value:function(s,t,e){this.props.match.params.userId!==s.match.params.userId&&this.refreshProfile()}},{key:"render",value:function(){return(0,N.jsx)(K,(0,a.Z)((0,a.Z)({},this.props),{},{isOwner:!this.props.match.params.userId,profile:this.props.profile,status:this.props.status,updateStatus:this.props.updateStatus,savePhoto:this.props.savePhoto}))}}]),e}(u.Component),$=(0,W.qC)((0,B.$j)((function(s){return{profile:s.profilePage.profile,status:s.profilePage.status,authorizedUserId:s.auth.userId,isAuth:s.auth.isAuth}}),{getUserProfile:R.et,getStatus:R.lR,updateStatus:R.Nf,savePhoto:R.Ju}),Q.withRouter)(X)},6596:function(s,t,e){s.exports=e.p+"static/media/avatar.cbb33afd2b42ae6acbbd.png"},7151:function(s,t,e){s.exports=e.p+"static/media/like.6dc22afeea1bdc9e9a32.png"}}]);
//# sourceMappingURL=780.e8887819.chunk.js.map