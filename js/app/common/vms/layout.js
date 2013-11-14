define(["text!app/common/views/metaDetails.html","text!app/common/views/header.html",
    "text!app/common/views/footer.html","bootstrap.min"],function(metaDetails,header,footer,bootstrap){
    var Layout=function(){
       var self=this;
       self.header=function(){
           return Hogan.compile(header);
       }
       self.footer=function(){
           return Hogan.compile(footer);
       }
       self.metaData=function(){
           return Hogan.compile(metaDetails)
       }
    }
    return new Layout();
})