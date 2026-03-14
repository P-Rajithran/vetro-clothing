const endpoints = ['http://localhost:4000/','http://localhost:4000/api/product','http://localhost:4000/api/user','http://localhost:4000/api/cart','http://localhost:4000/api/order'];

(async ()=>{
  for(const url of endpoints){
    try{
      const res = await fetch(url, {method:'GET'});
      const text = await res.text();
      console.log('URL:', url);
      console.log('Status:', res.status);
      console.log('Body (first 400 chars):', text.slice(0,400));
      console.log('---');
    }catch(err){
      console.log('URL:', url);
      console.log('ERROR:', err.message);
      console.log('---');
    }
  }
})();
