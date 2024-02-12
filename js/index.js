

 const CLIENT_ID='e30a232b3a69237028cb';
 const CLIENT_SECRET ='9025619286a55edc7881ca87528f3171663a1586';

myProfile();
async function myProfile(){
   const myprofile= await fetch(`https://api.github.com/users/KyowChaing?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`);
   const profile= await myprofile.json()
    showProfile(profile);
}
 
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
    showProfile(profile);
});

//Show profile into UI dynamically

function showProfile(profile){
    document.querySelector('.profile').innerHTML=`
        <img
            src="${profile.avatar_url}"
            alt="${profile.name}"
          />
          <p class="name">${profile.name}</p>
          <p class="username login">${profile.login}</p>
          <p class="bio">
            ${profile.bio}
          </p>

          <div class="followers-stars">
            <p>
              <ion-icon name="people-outline"></ion-icon>
              <span class="followers"> ${profile.followers}</span> followers
            </p>
            <span class="dot">·</span>
            <p><span class="following"> ${profile.following}</span> following</p>
          </div>

          <p class="company">
            <ion-icon name="business-outline"></ion-icon>
            ${profile.company}
          </p>
          <p class="location">
            <ion-icon name="location-outline"></ion-icon>${profile.location}
          </p>`;

}
    
