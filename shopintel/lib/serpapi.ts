export async function serp(params:Record<string,string>){
 const key=process.env.SERPAPI_KEY;if(!key) throw new Error('Missing SERPAPI_KEY');
 const qs=new URLSearchParams({...params,api_key:key,output:'json'});
 const r=await fetch(`https://serpapi.com/search.json?${qs}`,{cache:'no-store'});
 if(!r.ok) throw new Error(`SerpApi ${r.status}`); return r.json();
}
