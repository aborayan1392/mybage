(()=>{
  const files=['payload-1.txt','payload-2.txt','payload-3.txt','payload-4.txt','payload-5.txt'];
  (async()=>{
    try{
      const DATA=(await Promise.all(files.map(f=>fetch(f).then(r=>{if(!r.ok)throw new Error(r.status);return r.text()})))).join('');
      const bytes=Uint8Array.from(atob(DATA),c=>c.charCodeAt(0));
      const stream=new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'));
      const html=await new Response(stream).text();
      document.open();document.write(html);document.close();
    }catch(e){document.body.innerHTML='<main style="font-family:system-ui;text-align:center;padding:40px;direction:rtl"><h2>تعذّر فتح التطبيق</h2><p>تأكد من الاتصال بالإنترنت وحدّث المتصفح ثم أعد المحاولة.</p></main>';}
  })();
})();
