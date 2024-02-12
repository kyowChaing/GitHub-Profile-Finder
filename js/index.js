//get information through api from github according search submit event
//api.github.com/users/{username}
//this api oly allow per houre max 60 call. to get more access need API key
//which allow max 5k call
//API Key generate->github_profile->settings->developer_settings->OAuth Apps->regiser_Newapplication
//Application Name+HomepageURL[http://127.0.0.1:5500/]+authorization callback URL[http://127.0.0.1:5500/]->register application
//then github will give a Clint ID and Client secrets which need to used as query string in api linnk
//id = e30a232b3a69237028cb
//secret=9025619286a55edc7881ca87528f3171663a1586
//https://api.github.com/users/KyowChaing?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}

//call api by fetch() methode which is asyncchronous function, it return promisses
// res.joson() use to get json data form res whice is read ablestring.
// fetch(`https://api.github.com/users/KyowChaing`)
// .then(response => response.json())
// .then((profile)=>console.log(profile));

 const CLIENT_ID='e30a232b3a69237028cb';
 const CLIENT_SECRET ='9025619286a55edc7881ca87528f3171663a1586';

async function getUser(name){
    const resposnse= await fetch(`https://api.github.com/users/${name}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`);
    const profile=await resposnse.json();
    return profile;
}

//fetch data according user search by from submit [add event listener]

document.querySelector('#search').addEventListener('submit', async (e)=>{
    e.preventDefault();
    const userName=document.querySelector('#findByUsername').value;
    const profile = await getUser(userName);

}
);
    
